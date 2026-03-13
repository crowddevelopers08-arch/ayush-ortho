import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    
    const leads = await prisma.lead.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      where: status && status !== 'all' ? { status: status as any } : undefined
    })

    return NextResponse.json({ leads })
  } catch (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
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
    } = body

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone are required' },
        { status: 400 }
      )
    }

    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        age: age || '',
        areaOfPain: areaOfPain || '',
        treatmentPlan: treatmentPlan || '',
        city: city || '',
        source: source || 'direct',
        formName: formName || 'unknown',
        consent: consent || false,
        status: 'NEW',
        telecrmSynced: false
      }
    })

    return NextResponse.json({ 
      success: true, 
      lead,
      message: 'Lead created successfully' 
    })
  } catch (error) {
    console.error('Error creating lead:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}