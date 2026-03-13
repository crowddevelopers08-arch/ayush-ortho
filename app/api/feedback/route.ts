// app/api/leads/route.ts
import { NextResponse } from 'next/server'

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
}

/**
 * Send lead data to TeleCRM
 */
async function sendToTeleCRM(leadData: LeadData) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15000) // 15s timeout

  const endpoint = process.env.TELECRM_API_URL

  if (!endpoint) {
    throw new Error('TELECRM_API_URL environment variable is not set')
  }

  try {
    // Prepare the TeleCRM payload according to their API structure
    const telecrmPayload = {
      fields: {
        Id: "", // Leave empty for new leads
        name: leadData.name,
        email: leadData.email || "",
        phone: leadData.phone.replace(/\D/g, ''), // Only digits
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
        "PageName": leadData.source || "feedback-form",
        "State": "",
        "Age": leadData.age || "",
        "Area_of_Pain": leadData.areaOfPain || "",
        "Treatment_Plan": leadData.treatmentPlan || ""
      },
      actions: [
        {
          "type": "SYSTEM_NOTE",
          "text": `Lead Source: ${leadData.source || 'feedback-form'}`
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

    // Handle empty responses
    if (response.status === 204) {
      clearTimeout(timeout)
      return { status: 'success', message: 'Lead created (204 No Content)' }
    }

    const responseText = await response.text()

    // Skip HTML responses
    if (
      responseText.trim().startsWith('<!DOCTYPE') ||
      responseText.trim().startsWith('<html') ||
      responseText.includes('<!DOCTYPE html>')
    ) {
      console.warn(`HTML response from ${endpoint}`, {
        status: response.status,
        headers: Object.fromEntries(response.headers.entries()),
        bodyPreview: responseText.slice(0, 200),
      })
      throw new Error('TeleCRM returned HTML response instead of JSON')
    }

    // Parse JSON
    try {
      const data = responseText ? JSON.parse(responseText) : {}
      if (!response.ok) {
        throw new Error(data.message || `HTTP ${response.status} from ${endpoint}`)
      }
      clearTimeout(timeout)
      return data
    } catch {
      throw new Error(`Invalid JSON from ${endpoint}: ${responseText.slice(0, 100)}...`)
    }
  } catch (error) {
    clearTimeout(timeout)
    throw error instanceof Error ? error : new Error(String(error))
  }
}

/**
 * Handle POST request
 */
export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.name || !data.phone) {
      return NextResponse.json(
        { error: 'Missing required fields: name, phone' },
        { status: 400 }
      )
    }

    // Attempt TeleCRM submission
    const telecrmResponse = await sendToTeleCRM(data)

    return NextResponse.json(
      {
        success: true,
        telecrmResponse,
        timestamp: new Date().toISOString(),
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('TeleCRM submission error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to submit to TeleCRM',
        details: error instanceof Error ? error.message : 'Unknown error',
        referenceId: `ERR-${Date.now()}`,
      },
      { status: 500 }
    )
  }
}