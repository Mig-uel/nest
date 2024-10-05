import mongoose from 'mongoose'

let connected = false
const URI = process.env.DB_URI as string

export const connectDB = async () => {
  // only fields specified in our schema will be saved to the database
  mongoose.set('strictQuery', true)

  // if the database is already connected, don't connect again
  if (connected)
    console.log(`MONGODB IS ALREADY CONNECTED: ${mongoose.connection.name}`)

  // connect to mongodb

  try {
    await mongoose.connect(URI)

    connected = true
  } catch (error) {
    console.log(error)
  }
}
