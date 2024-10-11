'use server'

import { revalidatePath } from 'next/cache'
import { connectDB } from '@/config/database'
import User from '@/models/user.model'
import Message from '@/models/message.model'
import { HydratedDocument, Types } from 'mongoose'
import { getSessionUser } from '@/utils/getSessionUser'

import type { IProperty, IUser, IMessage } from '@/types'

export async function addMessage(formData: FormData) {
  // session helper function
  const session = await getSessionUser()

  if (!session || !session.user) throw new Error('User ID is required')

  // session user id
  const { id } = session

  // connect to mongodb
  await connectDB()

  const recipientId = Types.ObjectId.createFromHexString(
    formData.get('recipient') as string
  )
  const propertyId = Types.ObjectId.createFromHexString(
    formData.get('propertyId') as string
  )

  // add this in page instead of backend (i.e. disable or hide messaging feature)
  if (id === recipientId.toString()) {
    return { error: 'You cannot send a message to yourself' }
  }

  const messageObject: IMessage = {
    sender: Types.ObjectId.createFromHexString(id),
    recipient: recipientId,
    property: propertyId,
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    body: formData.get('body') as string,
    phone: formData.get('phone') as string,
  }

  await Message.create(messageObject)

  return {
    message: 'Message sent!',
  }
}
