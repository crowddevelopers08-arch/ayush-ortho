import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createdOnStamp, postToTeleCRM } from "@/lib/telecrm";
import { branches, painConcerns } from "@/components/treatments/data";

const FORM_NAME = "treatments";
const DEFAULT_SOURCE = "https://www.ayushortho.in/treatments";
const branchNames = branches.map((b) => b.name);
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface TreatmentsLeadData {
  name: string;
  email: string;
  phone: string;
  painConcern: string;
  branch: string;
  source: string;
}

async function sendToTeleCRM(lead: TreatmentsLeadData) {
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
    const body = (await request.json()) as Partial<Record<keyof TreatmentsLeadData, unknown>>;
    const readField = (key: keyof TreatmentsLeadData) => {
      const value = body[key];
      return typeof value === "string" ? value.trim() : "";
    };

    const leadData: TreatmentsLeadData = {
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

    let telecrmError: string | null = null;

    try {
      const telecrmResponse = await sendToTeleCRM(leadData);
      const telecrmId = String(telecrmResponse?.id || telecrmResponse?.leadId || "") || null;
      await prisma.lead.update({
        where: { id: savedLead.id },
        data: { telecrmSynced: true, telecrmId },
      });
    } catch (error) {
      telecrmError = error instanceof Error ? error.message : String(error);
      console.error("Treatments lead TeleCRM sync failed:", telecrmError);
    }

    return NextResponse.json({
      success: true,
      leadId: savedLead.id,
      formName: FORM_NAME,
      telecrmSynced: !telecrmError,
    });
  } catch (error) {
    console.error("Treatments lead submission failed:", error);
    return NextResponse.json(
      { error: "Unable to submit your request. Please try again." },
      { status: 500 },
    );
  }
}
