'use client'

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useSession } from 'next-auth/react'
import { getUnreadMessageCount } from '@/actions/message/actions'

// create context
const GlobalContext = createContext<{
  unreadCount: number
  setUnreadCount?: Dispatch<SetStateAction<number>>
}>({
  unreadCount: 0,
})

// create context provider
export function GlobalProvider({ children }: { children: React.ReactNode }) {
  const [unreadCount, setUnreadCount] = useState(0)

  const { data: session } = useSession()

  useEffect(() => {
    if (!session) return

    getUnreadMessageCount().then((res) => {
      if (res.count) setUnreadCount(res.count)
    })
  })

  return (
    <GlobalContext.Provider value={{ unreadCount, setUnreadCount }}>
      {children}
    </GlobalContext.Provider>
  )
}

// context hook
export function useGlobalContext() {
  return useContext(GlobalContext)
}
