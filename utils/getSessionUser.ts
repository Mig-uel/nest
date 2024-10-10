import { getServerSession } from 'next-auth/next'
import { authOptions } from './authOptions'

export const getSessionUser = async () => {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) return null

    return {
      user: session.user,
    }
  } catch (error) {
    console.error(error)
    return null
  }
}
