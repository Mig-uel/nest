import { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

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
      // check if user exists
      // create user
      // return true to allow sign in
    },

    // session callback function that modifies the session object
    async session({ session }) {
      // get user from db
      // assign user id from session
      // return session
    },
  },
}
