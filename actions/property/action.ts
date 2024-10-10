'use server'

import { IProperty } from '@/types'

export async function addProperty(formData: FormData) {
  // images
  const images = formData.getAll('images').filter((image) => {
    if (image instanceof File) return image.name !== ''
  }) as File[]

  // property
  const property: IProperty = {
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

    // @ts-ignore
    images: images,
  }

  console.log(property)
}
