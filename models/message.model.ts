import { IMessage } from '@/types'
import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema<IMessage>(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: String,

    body: String,

    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

export default mongoose.models.Message ||
  mongoose.model<IMessage>('Message', MessageSchema)
