import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const FORM_NAME = "influecners-leads";

interface InfluencerLeadData {
  name: string;
  phone: string;
  email?: string;
  areaOfPain?: string;
  source?: string;
  consent?: boolean;
}

async function sendToTeleCRM(lead: InfluencerLeadData) {
  const endpoint = process.env.TELECRM_API_URL;
  if (!endpoint) throw new Error("TELECRM_API_URL environment variable is not set");

  const source = lead.source || "https://www.ayushortho.in/ayush-influecners";
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  const payload = {
    fields: {
      Id: "",
      name: lead.name,
      email: lead.email || "",
      phone: lead.phone.replace(/\D/g, ""),
      city_1: "",
      Country: "",
      LeadID: "",
      CreatedOn: new Date().toLocaleString("en-US", {
        month: "short", day: "numeric", year: "numeric",
        hour: "numeric", minute: "2-digit", hour12: true,
      }),
      "Lead Stage": "",
      "Lead Status": "new",
      "Lead Request Type": "consultation",
      PageName: source,
      Source_URL: source,
      State: "",
      Age: "",
      Area_of_Pain: lead.areaOfPain || "",
      Treatment_Plan: "",
      FormName: FORM_NAME,
      Lead_Source: source,
      Source: source,
    },
    actions: [
      { type: "SYSTEM_NOTE", text: `Form Name: ${FORM_NAME}` },
      {
        type: "SYSTEM_NOTE",
        text: `Complete Form Data: Name: ${lead.name} | Phone: ${lead.phone} | Email: ${lead.email || "Not provided"} | Concern: ${lead.areaOfPain || "Not specified"} | Source URL: ${source} | Consent: ${lead.consent ? "Yes" : "No"}`,
      },
      { type: "SYSTEM_NOTE", text: `Lead Source URL: ${source}` },
      { type: "SYSTEM_NOTE", text: `Area of Pain: ${lead.areaOfPain || "Not specified"}` },
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
  const contentType = request.headers.get("content-type") || "";
  const isNativeForm = contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data");

  try {
    const body = isNativeForm
      ? Object.fromEntries(await request.formData()) as Partial<Record<keyof InfluencerLeadData, FormDataEntryValue>>
      : await request.json() as Partial<InfluencerLeadData>;
    const readField = (key: keyof InfluencerLeadData) => {
      const value = body[key];
      return typeof value === "string" ? value.trim() : "";
    };
    const name = readField("name");
    const phone = readField("phone");

    if (!name || !phone) {
      return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
    }

    const leadData: InfluencerLeadData = {
      name,
      phone,
      email: readField("email"),
      areaOfPain: readField("areaOfPain"),
      source: readField("source") || request.headers.get("referer") || "https://www.ayushortho.in/ayush-influecners",
      consent: body.consent === true || readField("consent") === "true",
    };

    const savedLead = await prisma.lead.create({
      data: {
        name: leadData.name,
        phone: leadData.phone,
        email: leadData.email || "",
        age: "",
        areaOfPain: leadData.areaOfPain || "",
        treatmentPlan: "",
        city: "",
        source: leadData.source,
        formName: FORM_NAME,
        consent: leadData.consent || false,
        status: "NEW",
        telecrmSynced: false,
      },
    });

    let telecrmResponse: Record<string, unknown> | null = null;
    let telecrmError: string | null = null;

    try {
      telecrmResponse = await sendToTeleCRM(leadData);
      const telecrmId = String(telecrmResponse?.id || telecrmResponse?.leadId || "") || null;
      await prisma.lead.update({
        where: { id: savedLead.id },
        data: { telecrmSynced: true, telecrmId },
      });
    } catch (error) {
      telecrmError = error instanceof Error ? error.message : String(error);
      console.error("Influencer lead TeleCRM sync failed:", telecrmError);
    }

    if (isNativeForm) {
      return NextResponse.redirect(new URL("/ayush-influecners/thank-you", request.url), 303);
    }

    return NextResponse.json({
      success: true,
      leadId: savedLead.id,
      formName: FORM_NAME,
      telecrmSynced: !telecrmError,
      telecrmError,
      message: telecrmError
        ? "Lead saved successfully, but TeleCRM sync failed"
        : "Lead saved and synced successfully",
    });
  } catch (error) {
    console.error("Influencer lead submission failed:", error);
    return NextResponse.json(
      { error: "Unable to submit your request. Please try again." },
      { status: 500 },
    );
  }
}
