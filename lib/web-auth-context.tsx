'use client'

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react'
import { UserProfile, authenticateUser } from './mock-users'

interface WebAuthContextType {
  user: UserProfile | null
  isAuthenticated: boolean
  login: (name: string, password: string) => { success: boolean; error?: string }
  logout: () => void
  updateJournalEntry: (entry: UserProfile['journalEntries'][0]) => void
}

const WebAuthContext = createContext<WebAuthContextType | undefined>(undefined)

const STORAGE_KEY = 'rituals_web_user'

export function WebAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem(STORAGE_KEY)
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
    setIsHydrated(true)
  }, [])

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (isHydrated) {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
      } else {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  }, [user, isHydrated])

  const login = useCallback((name: string, password: string) => {
    const authenticatedUser = authenticateUser(name, password)
    if (authenticatedUser) {
      setUser(authenticatedUser)
      return { success: true }
    }
    return { success: false, error: 'Invalid name or password' }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  const updateJournalEntry = useCallback((entry: UserProfile['journalEntries'][0]) => {
    if (!user) return
    setUser((prev) => {
      if (!prev) return prev
      const existingIndex = prev.journalEntries.findIndex((e) => e.id === entry.id)
      const updatedEntries =
        existingIndex >= 0
          ? prev.journalEntries.map((e, i) => (i === existingIndex ? entry : e))
          : [entry, ...prev.journalEntries]
      return { ...prev, journalEntries: updatedEntries }
    })
  }, [user])

  return (
    <WebAuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        updateJournalEntry,
      }}
    >
      {children}
    </WebAuthContext.Provider>
  )
}

export function useWebAuth() {
  const context = useContext(WebAuthContext)
  if (context === undefined) {
    throw new Error('useWebAuth must be used within a WebAuthProvider')
  }
  return context
}
