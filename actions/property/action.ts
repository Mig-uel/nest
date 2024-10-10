'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { connectDB } from '@/config/database'
import Property from '@/models/property.model'
import { Types } from 'mongoose'
import { getSessionUser } from '@/utils/getSessionUser'

import type { IProperty } from '@/types'

export async function addProperty(formData: FormData) {
  // connect to mongodb
  await connectDB()

  // session helper function
  const session = await getSessionUser()

  if (!session || !session.user) throw new Error('User ID is required')

  // session user id
  const { id } = session

  // images
  const images = formData
    .getAll('images')
    .filter((image) => {
      if (image instanceof File) return image.name !== ''
    })
    .map((image) => {
      if (image instanceof File) return image.name
    }) as string[]

  // property
  const propertyObject: IProperty = {
    type: formData.get('type') as string,
    name: formData.get('name') as string,
    description: formData.get('description') as string,

    location: {
      state: formData.get('location.state') as string,
      city: formData.get('location.city') as string,
      zipcode: formData.get('location.zipcode') as string,
      street: formData.get('location.street') as string,
    },

    beds: Number(formData.get('beds')),
    baths: Number(formData.get('baths')),
    square_feet: Number(formData.get('square_feet')),

    amenities: formData.getAll('amenities') as string[],

    rates: {
      nightly: Number(formData.get('rates.nightly')) || undefined,
      weekly: Number(formData.get('rates.weekly')) || undefined,
      monthly: Number(formData.get('rates.monthly')) || undefined,
    },

    seller_info: {
      name: formData.get('seller_info.name') as string,
      email: formData.get('seller_info.email') as string,
      phone: formData.get('seller_info.phone') as string,
    },

    images: images,

    owner: Types.ObjectId.createFromHexString(id),
  }

  const property = await Property.create(propertyObject)

  revalidatePath('/', 'layout')

  redirect(`/properties/${property._id}`)
}
