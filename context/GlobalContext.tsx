'use client'

import { createContext, SetStateAction, useContext, useState } from 'react'

// create context
const GlobalContext = createContext({})

// create context provider
export function GlobalProvider({ children }: { children: React.ReactNode }) {
  const [unreadCount, setUnreadCount] = useState(0)

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
