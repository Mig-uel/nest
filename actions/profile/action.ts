'use server'

import cloudinary from '@/config/cloudinary'
import { connectDB } from '@/config/database'
import Property from '@/models/property.model'
import { getSessionUser } from '@/utils/getSessionUser'
import type { Types } from 'mongoose'
import { revalidatePath } from 'next/cache'

export async function deleteProperty(propertyId: Types.ObjectId) {
  const session = await getSessionUser()

  if (!session || !session.user) throw new Error('Invalid session')

  await connectDB()

  const { id } = session

  const property = await Property.findById(propertyId)

  if (!property) throw new Error('Property not found')

  // verify ownership
  if (property.owner.toString() !== id) throw new Error('Unauthorized!')

  // extract public id from image urls
  const publicIds: string[] = property.images.map((url: string) => {
    const parts = url.split('/')

    return parts[parts.length - 1].split('.')[0]
  })

  // delete image from cloudinary
  if (publicIds.length > 0) {
    await Promise.all(
      publicIds.map((publicId) => {
        cloudinary.uploader.destroy(`Nest/${publicId}`, {
          invalidate: true,
        })
      })
    )
  }

  await property.deleteOne()

  revalidatePath('/', 'layout')
}
