import { Schema, model, models } from 'mongoose'
import type { IUser } from '@/types'

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Email already exists'],
    },

    username: {
      type: String,
      required: [true, 'Username is required'],
    },

    image: {
      type: String,
    },

    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Property',
      },
    ],
  },
  {
    timestamps: true,
  }
)

// either export the existing user model or create a new user model
export default models.User || model<IUser>('User', UserSchema)
