import { connectDB } from '@/config/database'
import Property from '@/models/property.model'
import { NextResponse } from 'next/server'

// fetch all properties
export const GET = async () => {
  try {
    await connectDB()

    const properties = await Property.find({})

    return NextResponse.json(properties, { status: 200 })
  } catch (error) {
    return new Response('Something went wrong', { status: 500 })
  }
}
