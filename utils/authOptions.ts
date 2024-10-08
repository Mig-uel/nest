import User from '@/models/user.model'
import { connectDB } from '@/config/database'
import GoogleProvider from 'next-auth/providers/google'

import type { IUser } from '@/types'
import type { AuthOptions } from 'next-auth'

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID! as string,
      clientSecret: process.env.CLIENT_SECRET! as string,
      authorization: {
        params: {
          prompt: 'consent',
          response_type: 'code',
          access_type: 'offline',
        },
      },
    }),
  ],

  callbacks: {
    // invoke on successful sign in
    async signIn({ profile }) {
      // connect to database
      await connectDB()

      // check if user exists
      const userExists = await User.findOne({ email: profile?.email })

      // if not, create user
      if (!userExists) {
        // truncate username if too long
        const username = profile?.name?.slice(0, 20)

        await User.create({
          email: profile?.email,
          username,
          image: profile?.image,
        })
      }

      // return true to allow sign in
      return true
    },

    // session callback function that modifies the session object
    async session({ session }) {
      // get user from db
      // assign user id from session
      // return session
    },
  },
}
