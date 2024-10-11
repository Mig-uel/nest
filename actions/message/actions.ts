'use server'

import { connectDB } from '@/config/database'
import Message from '@/models/message.model'
import { Types } from 'mongoose'
import { getSessionUser } from '@/utils/getSessionUser'

import type { IMessage } from '@/types'

export async function addMessage(prevState: any, formData: FormData) {
  try {
    // session helper function
    const session = await getSessionUser()

    if (!session || !session.user) throw new Error('User ID is required')

    // session user id
    const { id } = session

    // connect to mongodb
    await connectDB()

    const recipientId = Types.ObjectId.createFromHexString(
      formData.get('recipientId') as string
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
      submitted: true,
    }
  } catch (error) {
    return {
      message: 'Something went wrong',
    }
  }
}
