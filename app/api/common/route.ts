import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

interface LeadData {
  name: string
  phone: string
  email?: string
  age?: string
  areaOfPain?: string
  treatmentPlan?: string
  city?: string
  consent?: boolean
  source?: string
  formName?: string
}

/**
 * Generate comprehensive form data string with all user details (for system notes)
 */
function generateFormDataString(leadData: LeadData): string {
  const details = [];

  // Add all available fields with their values
  if (leadData.name) details.push(`Name: ${leadData.name}`);
  if (leadData.phone) details.push(`Phone: ${leadData.phone}`);
  if (leadData.email) details.push(`Email: ${leadData.email}`);
  if (leadData.age) details.push(`Age: ${leadData.age}`);
  if (leadData.areaOfPain) details.push(`Area of Pain: ${leadData.areaOfPain}`);
  if (leadData.treatmentPlan) details.push(`Treatment Plan: ${leadData.treatmentPlan}`);
  if (leadData.city) details.push(`City: ${leadData.city}`);
  if (leadData.source) details.push(`Source URL: ${leadData.source}`);
  
  // Always include consent status
  details.push(`Consent: ${leadData.consent ? 'Yes' : 'No'}`);

  // Join all details with " | " separator
  return details.join(' | ');
}

/**
 * Send lead data to TeleCRM with URL
 */
async function sendToTeleCRM(leadData: LeadData) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15000)

  const endpoint = process.env.TELECRM_API_URL

  if (!endpoint) {
    throw new Error('TELECRM_API_URL environment variable is not set')
  }

  try {
    // Log the received source URL for debugging
    console.log('TeleCRM - Received source URL:', leadData.source);
    
    // Use the exact source URL from the lead data, with fallback
    const sourceURL = leadData.source || 'https://www.ayushortho.in';
    const pageName = leadData.source || 'https://www.ayushortho.in';
    const formName = leadData.formName || 'common';

    console.log('TeleCRM - Using source URL:', sourceURL);

    // Generate comprehensive form data string for system notes
    const formDataString = generateFormDataString(leadData);

    const telecrmPayload = {
      fields: {
        Id: "",
        name: leadData.name,
        email: leadData.email || "",
        phone: leadData.phone.replace(/\D/g, ''),
        city_1: leadData.city || "",
        Country: "",
        LeadID: "",
        "CreatedOn": new Date().toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        }),
        "Lead Stage": "",
        "Lead Status": "new",
        "Lead Request Type": "consultation",
        "PageName": pageName,
        "Source_URL": sourceURL, // Added source URL field with underscore
        "State": "",
        "Age": leadData.age || "",
        "Area_of_Pain": leadData.areaOfPain || "",
        "Treatment_Plan": leadData.treatmentPlan || "",
        "FormName": formName,
        "Lead_Source": sourceURL, // Additional source field
        "Source": sourceURL // Keep original source field
      },
      actions: [
        {
          "type": "SYSTEM_NOTE",
          "text": `Form Name: ${formName}`
        },
        {
          "type": "SYSTEM_NOTE",
          "text": `Complete Form Data: ${formDataString}`
        },
        {
          "type": "SYSTEM_NOTE",
          "text": `Lead Source URL: ${sourceURL}`
        },
        {
          "type": "SYSTEM_NOTE",
          "text": `Page URL: ${pageName}`
        },
        {
          "type": "SYSTEM_NOTE",
          "text": `Age: ${leadData.age || 'Not specified'}`
        },
        {
          "type": "SYSTEM_NOTE",
          "text": `Area of Pain: ${leadData.areaOfPain || 'Not specified'}`
        },
        {
          "type": "SYSTEM_NOTE",
          "text": `Treatment Plan: ${leadData.treatmentPlan || 'Not specified'}`
        },
        {
          "type": "SYSTEM_NOTE",
          "text": `City: ${leadData.city || 'Not specified'}`
        },
        {
          "type": "SYSTEM_NOTE",
          "text": `Consent Given: ${leadData.consent ? 'Yes' : 'No'}`
        }
      ]
    }

    // Log the complete payload for debugging
    console.log('TeleCRM Payload:', JSON.stringify(telecrmPayload, null, 2));

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.TELECRM_API_KEY}`,
        'X-Client-ID': 'nextjs-website-integration',
        'Accept': 'application/json',
      },
      body: JSON.stringify(telecrmPayload),
      signal: controller.signal,
    })

    if (response.status === 204) {
      clearTimeout(timeout)
      console.log('TeleCRM - Success (204 No Content)');
      return { 
        status: 'success', 
        message: 'Lead created (204 No Content)',
        synced: true
      }
    }

    const responseText = await response.text()
    console.log('TeleCRM Response:', { status: response.status, body: responseText });

    if (
      responseText.trim().startsWith('<!DOCTYPE') ||
      responseText.trim().startsWith('<html') ||
      responseText.includes('<!DOCTYPE html>')
    ) {
      console.warn(`HTML response from ${endpoint}`)
      throw new Error('TeleCRM returned HTML response instead of JSON')
    }

    try {
      const data = responseText ? JSON.parse(responseText) : {}
      if (!response.ok) {
        throw new Error(data.message || `HTTP ${response.status} from ${endpoint}`)
      }
      clearTimeout(timeout)
      console.log('TeleCRM - Success with data:', data);
      return {
        ...data,
        synced: true
      }
    } catch {
      throw new Error(`Invalid JSON from ${endpoint}: ${responseText.slice(0, 100)}...`)
    }
  } catch (error) {
    clearTimeout(timeout)
    console.error('TeleCRM Error:', error);
    throw error instanceof Error ? error : new Error(String(error))
  }
}

/**
 * Save lead to database using Prisma
 */
async function saveToDatabase(leadData: LeadData) {
  try {
    const lead = await prisma.lead.create({
      data: {
        name: leadData.name,
        email: leadData.email || '',
        phone: leadData.phone,
        age: leadData.age || '',
        areaOfPain: leadData.areaOfPain || '',
        treatmentPlan: leadData.treatmentPlan || '',
        city: leadData.city || '',
        source: leadData.source || 'https://www.ayushortho.in',
        formName: leadData.formName || 'common',
        consent: leadData.consent || false,
        status: 'NEW',
        telecrmSynced: false
      }
    });
    console.log('Database - Lead saved with source:', lead.source);
    return lead;
  } catch (error) {
    console.error('Database save error:', error);
    throw new Error('Failed to save lead to database');
  }
}

/**
 * Update lead with TeleCRM sync status
 */
async function updateLeadTelecrmStatus(leadId: string, telecrmId?: string, error?: string) {
  try {
    await prisma.lead.update({
      where: { id: leadId },
      data: {
        telecrmSynced: !error,
        telecrmId: telecrmId || null,
        syncedAt: new Date(),
        error: error || null,
        status: error ? 'ERROR' : 'NEW'
      }
    });
  } catch (error) {
    console.error('Update lead status error:', error);
  }
}

export async function POST(request: NextRequest) {
  let data: LeadData;
  let savedLead: any = null;

  try {
    data = await request.json()
    
    // Log the entire received data
    console.log('API - Received request data:', JSON.stringify(data, null, 2));
    
    const {
      name,
      email,
      phone,
      age,
      areaOfPain,
      treatmentPlan,
      city,
      source,
      consent,
      formName
    } = data

    // Validate required fields
    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Name and phone are required' },
        { status: 400 }
      )
    }

    // Log the source URL specifically
    console.log('API - Source URL from request:', source);
    
    // Set form name
    const finalFormName = formName || 'common';
    
    // Prepare lead data with defaults - PRESERVE THE EXACT SOURCE URL
    const leadData: LeadData = {
      name,
      email,
      phone,
      age,
      areaOfPain,
      treatmentPlan,
      city,
      consent: consent || false,
      source: source || 'https://www.ayushortho.in',
      formName: finalFormName
    };

    console.log('API - Final lead data source:', leadData.source);

    // Step 1: Save to database first
    savedLead = await saveToDatabase(leadData);
    console.log('Lead saved to database:', { 
      id: savedLead.id, 
      formName: finalFormName,
      source: savedLead.source 
    });

    // Step 2: Send to TeleCRM
    let telecrmResponse = null;
    let telecrmError = null;
    let telecrmId = null;

    try {
      telecrmResponse = await sendToTeleCRM(leadData);
      console.log('Lead sent to TeleCRM successfully:', { 
        formName: finalFormName,
        sourceURL: leadData.source 
      });

      telecrmId = telecrmResponse?.id || telecrmResponse?.leadId || null;

      // Update database with TeleCRM sync status
      if (savedLead) {
        await updateLeadTelecrmStatus(savedLead.id, telecrmId);
      }
    } catch (error) {
      telecrmError = error;
      console.error('TeleCRM submission failed:', { 
        formName: finalFormName, 
        error: error instanceof Error ? error.message : String(error),
        sourceURL: leadData.source
      });
      
      // Update database with TeleCRM error status
      if (savedLead) {
        await updateLeadTelecrmStatus(
          savedLead.id, 
          undefined, 
          error instanceof Error ? error.message : String(error)
        );
      }
    }

    return NextResponse.json({ 
      success: true, 
      lead: savedLead,
      telecrmResponse,
      telecrmSynced: !telecrmError,
      telecrmId,
      sourceURL: leadData.source,
      message: telecrmError 
        ? 'Consultation request submitted successfully but TeleCRM sync failed' 
        : 'Consultation request submitted successfully' 
    })
  } catch (error) {
    const formName = data?.formName || 'common';
    const sourceURL = data?.source || 'https://www.ayushortho.in';

    console.error('Common form submission error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
      formName,
      sourceURL,
      databaseSaved: !!savedLead,
      receivedData: data
    })

    // If database save failed but we have data, try to save with error status
    if (!savedLead && data) {
      try {
        const errorLead = await prisma.lead.create({
          data: {
            name: data.name,
            email: data.email || '',
            phone: data.phone,
            age: data.age || '',
            areaOfPain: data.areaOfPain || '',
            treatmentPlan: data.treatmentPlan || '',
            city: data.city || '',
            source: data.source || 'https://www.ayushortho.in',
            formName: 'common',
            consent: data.consent || false,
            status: 'ERROR',
            error: error instanceof Error ? error.message : 'Unknown error',
            telecrmSynced: false
          }
        });
        console.log('Error lead saved to database:', errorLead.id);
      } catch (dbError) {
        console.error('Failed to save error lead to database:', dbError);
      }
    }

    return NextResponse.json(
      { 
        error: 'Internal server error',
        referenceId: `ERR-${Date.now()}`,
        sourceURL: sourceURL
      },
      { status: 500 }
    )
  }
}