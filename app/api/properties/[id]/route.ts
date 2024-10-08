import { connectDB } from '@/config/database'
import Property from '@/models/property.model'
import { type NextRequest, NextResponse } from 'next/server'

// fetch single property
export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB()

    const property = await Property.findById(params.id)

    if (!property)
      return NextResponse.json(
        { message: 'Property not found' },
        { status: 404 }
      )

    return NextResponse.json(property)
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}
