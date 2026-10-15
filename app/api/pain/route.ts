import { NextRequest, NextResponse, after } from "next/server";
import prisma from "@/lib/prisma";
import { createdOnStamp, postToTeleCRM } from "@/lib/telecrm";
import { branches, painConcerns } from "@/components/pain/data";

const FORM_NAME = "pain";
const DEFAULT_SOURCE = "https://www.ayushortho.in/pain";
const branchNames = branches.map((b) => b.name);
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface PainLeadData {
  name: string;
  email: string;
  phone: string;
  painConcern: string;
  branch: string;
  source: string;
}

async function sendToTeleCRM(lead: PainLeadData) {
  const payload = {
    fields: {
      Id: "",
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      city_1: lead.branch,
      Country: "",
      LeadID: "",
      CreatedOn: createdOnStamp(),
      "Lead Stage": "",
      "Lead Status": "new",
      "Lead Request Type": "consultation",
      PageName: lead.source,
      Source_URL: lead.source,
      State: "",
      Age: "",
      Area_of_Pain: lead.painConcern,
      Treatment_Plan: "",
      FormName: FORM_NAME,
      Lead_Source: lead.source,
      Source: lead.source,
    },
    actions: [
      { type: "SYSTEM_NOTE", text: `Form Name: ${FORM_NAME}` },
      {
        type: "SYSTEM_NOTE",
        text: `Complete Form Data: Name: ${lead.name} | Email: ${lead.email} | Phone: ${lead.phone} | Pain Concern: ${lead.painConcern} | Branch: ${lead.branch} | Source URL: ${lead.source}`,
      },
      { type: "SYSTEM_NOTE", text: `Lead Source URL: ${lead.source}` },
      { type: "SYSTEM_NOTE", text: `Area of Pain: ${lead.painConcern}` },
      { type: "SYSTEM_NOTE", text: `Email: ${lead.email}` },
      { type: "SYSTEM_NOTE", text: `Preferred Branch: ${lead.branch}` },
    ],
  };

  return postToTeleCRM(payload);
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<Record<keyof PainLeadData, unknown>>;
    const readField = (key: keyof PainLeadData) => {
      const value = body[key];
      return typeof value === "string" ? value.trim() : "";
    };

    const leadData: PainLeadData = {
      name: readField("name"),
      email: readField("email").toLowerCase().slice(0, 120),
      phone: readField("phone").replace(/\D/g, ""),
      painConcern: readField("painConcern"),
      branch: readField("branch"),
      source: readField("source") || request.headers.get("referer") || DEFAULT_SOURCE,
    };

    if (!leadData.name || !/^[6-9]\d{9}$/.test(leadData.phone)) {
      return NextResponse.json({ error: "Valid name and 10-digit mobile number are required" }, { status: 400 });
    }
    if (!EMAIL_PATTERN.test(leadData.email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
    }
    if (!painConcerns.includes(leadData.painConcern) || !branchNames.includes(leadData.branch)) {
      return NextResponse.json({ error: "Please select your pain concern and branch" }, { status: 400 });
    }

    const savedLead = await prisma.lead.create({
      data: {
        name: leadData.name,
        phone: leadData.phone,
        email: leadData.email,
        age: "",
        areaOfPain: leadData.painConcern,
        treatmentPlan: "",
        // The leads table has no branch column; `city` holds the preferred branch.
        city: leadData.branch,
        source: leadData.source,
        formName: FORM_NAME,
        consent: false,
        status: "NEW",
        telecrmSynced: false,
      },
    });

    // Reply as soon as the lead is safely in the database; TeleCRM can take several
    // seconds, so sync it after the response. `after()` keeps this running on Vercel.
    // If it fails, the lead stays `telecrmSynced: false` in the dashboard.
    after(async () => {
      try {
        const telecrmResponse = await sendToTeleCRM(leadData);
        const telecrmId = String(telecrmResponse?.id || telecrmResponse?.leadId || "") || null;
        await prisma.lead.update({
          where: { id: savedLead.id },
          data: { telecrmSynced: true, telecrmId },
        });
      } catch (error) {
        console.error("Pain lead TeleCRM sync failed:", error instanceof Error ? error.message : error);
      }
    });

    return NextResponse.json({
      success: true,
      leadId: savedLead.id,
      formName: FORM_NAME,
    });
  } catch (error) {
    console.error("Pain lead submission failed:", error);
    return NextResponse.json(
      { error: "Unable to submit your request. Please try again." },
      { status: 500 },
    );
  }
}
