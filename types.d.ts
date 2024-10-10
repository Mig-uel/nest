import { Types } from 'mongoose'

type IProperty = {
  _id?: Types.ObjectId
  owner: Types.ObjectId
  name: string
  type: string
  description: string
  location: {
    street: string
    city: string
    state: string
    zipcode: string
  }
  beds: number
  baths: number
  square_feet: number
  amenities: string[]
  rates: {
    weekly?: number
    monthly?: number
    nightly?: number
  }
  seller_info: {
    name: string
    email: string
    phone: string
  }
  images: string[]
  is_featured?: boolean
  createdAt?: string
  updatedAt?: string
}

type IUser = {
  _id?: Types.ObjectId
  email: string | undefined
  username: string
  image: string
  bookmarks: Types.ObjectId[]
}
