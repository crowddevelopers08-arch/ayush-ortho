import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { branches, painConcerns, painDurations } from "@/components/paid-lp/data";

const FORM_NAME = "paid-lp";
const DEFAULT_SOURCE = "https://www.ayushortho.in/paid-lp";
const branchNames = branches.map((b) => b.name);

interface PaidLeadData {
  name: string;
  phone: string;
  painConcern: string;
  duration: string;
  branch: string;
  source: string;
}

async function sendToTeleCRM(lead: PaidLeadData) {
  const endpoint = process.env.TELECRM_API_URL;
  if (!endpoint) throw new Error("TELECRM_API_URL environment variable is not set");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  const payload = {
    fields: {
      Id: "",
      name: lead.name,
      email: "",
      phone: lead.phone,
      city_1: lead.branch,
      Country: "",
      LeadID: "",
      CreatedOn: new Date().toLocaleString("en-US", {
        month: "short", day: "numeric", year: "numeric",
        hour: "numeric", minute: "2-digit", hour12: true,
      }),
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
        text: `Complete Form Data: Name: ${lead.name} | Phone: ${lead.phone} | Pain Concern: ${lead.painConcern} | Duration: ${lead.duration} | Branch: ${lead.branch} | Source URL: ${lead.source}`,
      },
      { type: "SYSTEM_NOTE", text: `Lead Source URL: ${lead.source}` },
      { type: "SYSTEM_NOTE", text: `Area of Pain: ${lead.painConcern}` },
      { type: "SYSTEM_NOTE", text: `Pain Duration: ${lead.duration}` },
      { type: "SYSTEM_NOTE", text: `Preferred Branch: ${lead.branch}` },
    ],
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TELECRM_API_KEY}`,
        "X-Client-ID": "nextjs-website-integration",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (response.status === 204) return { synced: true };

    const responseText = await response.text();
    if (!response.ok) {
      throw new Error(`TeleCRM returned HTTP ${response.status}: ${responseText.slice(0, 200)}`);
    }
    if (!responseText) return { synced: true };
    if (responseText.trim().startsWith("<")) throw new Error("TeleCRM returned an HTML response");
    return { ...JSON.parse(responseText), synced: true };
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<Record<keyof PaidLeadData, unknown>>;
    const readField = (key: keyof PaidLeadData) => {
      const value = body[key];
      return typeof value === "string" ? value.trim() : "";
    };

    const leadData: PaidLeadData = {
      name: readField("name"),
      phone: readField("phone").replace(/\D/g, ""),
      painConcern: readField("painConcern"),
      duration: readField("duration"),
      branch: readField("branch"),
      source: readField("source") || request.headers.get("referer") || DEFAULT_SOURCE,
    };

    if (!leadData.name || !/^[6-9]\d{9}$/.test(leadData.phone)) {
      return NextResponse.json({ error: "Valid name and 10-digit mobile number are required" }, { status: 400 });
    }
    if (
      !painConcerns.includes(leadData.painConcern) ||
      !painDurations.includes(leadData.duration) ||
      !branchNames.includes(leadData.branch)
    ) {
      return NextResponse.json({ error: "Please select your pain concern, duration and branch" }, { status: 400 });
    }

    const savedLead = await prisma.lead.create({
      data: {
        name: leadData.name,
        phone: leadData.phone,
        email: "",
        age: "",
        areaOfPain: leadData.painConcern,
        treatmentPlan: `Pain duration: ${leadData.duration}`,
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
      console.error("Paid LP lead TeleCRM sync failed:", telecrmError);
    }

    return NextResponse.json({
      success: true,
      leadId: savedLead.id,
      formName: FORM_NAME,
      telecrmSynced: !telecrmError,
    });
  } catch (error) {
    console.error("Paid LP lead submission failed:", error);
    return NextResponse.json(
      { error: "Unable to submit your request. Please try again." },
      { status: 500 },
    );
  }
}
