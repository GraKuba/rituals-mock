'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { UserProfile, authenticateUser } from './mock-users'

interface AuthContextType {
  user: UserProfile | null
  isAuthenticated: boolean
  login: (name: string, password: string) => { success: boolean; error?: string }
  logout: () => void
  updateJournalEntry: (entry: UserProfile['journalEntries'][0]) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)

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
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        updateJournalEntry,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
