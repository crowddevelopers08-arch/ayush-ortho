import { NextResponse } from 'next/server'

/**
 * Send lead data to TeleCRM
 */
async function sendToTeleCRM(leadData: Record<string, any>) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15000) // 15s timeout

  // Use API URL from .env, fallback to custom endpoint if provided
  const endpoints = [
    process.env.TELECRM_CUSTOM_ENDPOINT,
    process.env.TELECRM_API_URL, // Always include official API URL
  ].filter(Boolean)

  let lastError: Error | null = null

  for (const endpoint of endpoints) {
    try {
      // Prepare the TeleCRM payload according to their API structure
      const telecrmPayload = {
        fields: {
          Id: "", // Leave empty for new leads
          name: leadData.name,
          email: leadData.email || "",
          phone: leadData.phone.replace(/\D/g, ''), // Only digits
          city_1: leadData.city || "",
          preferredtime: leadData.preferredtime,
          preferreddae: leadData.preferreddae,
          message: leadData.message,
          select_the_procedure: leadData.procedure,
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
          "PageName": "website-form",
          "State": ""
        },
        actions: [
          {
            "type": "SYSTEM_NOTE",
            "text": `Lead Source: website-form`
          },
          {
            "type": "SYSTEM_NOTE",
            "text": `Procedure: ${leadData.procedure || 'Not specified'}`
          },
          {
            "type": "SYSTEM_NOTE",
            "text": `Preferred Date: ${leadData.date || 'Not specified'}`
          },
          {
            "type": "SYSTEM_NOTE",
            "text": `Preferred Time: ${leadData.time || 'Not specified'}`
          }
        ]
      }

      const response = await fetch(endpoint!, {
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
        continue
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
      lastError = error instanceof Error ? error : new Error(String(error))
      console.warn(`Endpoint ${endpoint} failed:`, lastError.message)
      continue
    }
  }

  clearTimeout(timeout)
  throw lastError || new Error(
    'All TeleCRM endpoints failed. Please:\n' +
    '1. Contact TeleCRM support for correct endpoint\n' +
    '2. Verify your API key\n' +
    '3. Check if your IP needs whitelisting'
  )
}

/**
 * Handle POST request
 */
export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.name || !data.phone || !data.procedure) {
      return NextResponse.json(
        { error: 'Missing required fields: name, phone, procedure' },
        { status: 400 }
      )
    }

    // Attempt TeleCRM submission
    const telecrmResponse = await sendToTeleCRM({
      name: data.name,
      phone: data.phone,
      email: data.email || '',
      procedure: data.procedure,
      date: data.date,
      time: data.time,
      message: data.message || '',
      city: data.city || ''
    })

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