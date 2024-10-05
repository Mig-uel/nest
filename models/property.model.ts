import { Schema, model, models } from 'mongoose'
import type { IProperty } from '@/types'

const PropertySchema = new Schema<IProperty>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },

    name: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    location: {
      street: String,
      city: String,
      state: String,
      zipcode: String,
    },

    beds: {
      type: Number,
      required: true,
    },

    baths: {
      type: Number,
      required: true,
    },

    square_feet: {
      type: Number,
      required: true,
    },

    amenities: [
      {
        type: String,
      },
    ],

    rates: {
      nightly: String,
      weekly: String,
      monthly: String,
    },

    seller_info: {
      name: String,
      email: String,
      phone: String,
    },

    images: [
      {
        type: String,
      },
    ],

    is_featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

export default models.Property || model<IProperty>('Property', PropertySchema)
