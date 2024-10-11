'use server'

import { connectDB } from '@/config/database'
import Message from '@/models/message.model'
import { HydratedDocument, Types } from 'mongoose'
import { getSessionUser } from '@/utils/getSessionUser'

import type { IMessage } from '@/types'
import { revalidatePath } from 'next/cache'

/**
 * Add Message Action
 * @param prevState
 * @param formData
 * @returns
 */
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

/**
 * Mark Message Read Action
 * @param prevState
 * @param formData
 * @returns
 */
export async function markMessageAsRead(prevState: any, formData: FormData) {
  try {
    // session helper function
    const session = await getSessionUser()

    if (!session || !session.user) throw new Error('User ID is required')

    // session user id
    const { id } = session

    // connect to mongodb
    await connectDB()

    const messageId = formData.get('messageId')

    const message = await Message.findById<HydratedDocument<IMessage>>(
      messageId
    )

    if (!message) throw new Error('Message not found')

    // verify ownership of message
    if (message.recipient.toString() !== id) throw new Error('Unauthorized')

    message.read = !message.read

    await message.save()

    revalidatePath('/messages')

    return {
      message: message.read
        ? 'Message marked as unread'
        : 'Message marked as read',
    }
  } catch (error) {
    return {
      message: (error as Error).message,
    }
  }
}

/**
 * Delete Message Read Action
 * @param prevState
 * @param formData
 * @returns
 */
export async function deleteMessage(prevState: any, formData: FormData) {
  try {
    // session helper function
    const session = await getSessionUser()

    if (!session || !session.user) throw new Error('User ID is required')

    // session user id
    const { id } = session

    // connect to mongodb
    await connectDB()

    const messageId = formData.get('messageId')

    const message = await Message.findById<HydratedDocument<IMessage>>(
      messageId
    )

    if (!message) throw new Error('Message not found')

    // verify ownership of message
    if (message.recipient.toString() !== id) throw new Error('Unauthorized')

    await message.deleteOne()

    revalidatePath('/messages')

    return {
      message: 'Delete message',
    }
  } catch (error) {
    return {
      message: (error as Error).message,
    }
  }
}
