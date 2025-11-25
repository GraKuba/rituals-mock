'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { WebAuthProvider, useWebAuth } from '@/lib/web-auth-context'
import { mockUsers } from '@/lib/mock-users'

function LoginForm() {
  const router = useRouter()
  const { login, isAuthenticated, user } = useWebAuth()
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const result = login(name, password)
    if (result.success) {
      router.push('/mood')
    } else {
      setError(result.error || 'Login failed')
    }
  }

  // If already authenticated, show logged in state
  if (isAuthenticated && user) {
    return (
      <div className="text-center">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#d4af37]/20 flex items-center justify-center">
          <span className="text-4xl">👋</span>
        </div>
        <h2 className="text-2xl font-light text-[#f5f3f0] mb-2">Welcome back, {user.name}!</h2>
        <p className="text-[#f5f3f0]/60 mb-6">You're logged in as a {user.membershipTier}</p>
        <div className="space-y-3">
          <Link
            href="/mood"
            className="block w-full py-4 bg-[#d4af37] text-white text-center rounded-full hover:bg-[#f5f3f0] hover:text-[#2d2926] transition-colors duration-300 cursor-pointer text-sm tracking-widest uppercase"
          >
            Go to Mood Mirror
          </Link>
          <button
            onClick={() => {
              const { logout } = useWebAuth()
              logout()
            }}
            className="block w-full py-4 bg-[#f5f3f0]/10 text-[#f5f3f0] rounded-full hover:bg-[#d4af37] hover:border-[#d4af37] transition-colors duration-300 cursor-pointer text-sm tracking-widest uppercase border border-[#f5f3f0]/20"
          >
            Sign Out
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="text-xs text-[#f5f3f0]/60 tracking-widest uppercase mb-2 block">
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="w-full px-4 py-4 bg-[#f5f3f0]/10 border border-[#f5f3f0]/20 text-[#f5f3f0] placeholder-[#f5f3f0]/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition"
          required
        />
      </div>

      <div>
        <label className="text-xs text-[#f5f3f0]/60 tracking-widest uppercase mb-2 block">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-4 py-4 bg-[#f5f3f0]/10 border border-[#f5f3f0]/20 text-[#f5f3f0] placeholder-[#f5f3f0]/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition pr-12"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#f5f3f0]/40 hover:text-[#f5f3f0] transition-colors duration-300 cursor-pointer"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        className="w-full py-4 bg-[#d4af37] text-white rounded-full hover:bg-[#f5f3f0] hover:text-[#2d2926] transition-colors duration-300 cursor-pointer text-sm tracking-widest uppercase"
      >
        Sign In
      </button>

      {/* Demo accounts hint */}
      <div className="mt-8 p-4 bg-[#f5f3f0]/5 border border-[#f5f3f0]/10 rounded-lg">
        <p className="text-xs text-[#f5f3f0]/60 tracking-widest uppercase mb-3">Demo Accounts</p>
        <div className="space-y-2">
          {mockUsers.slice(0, 4).map((u) => (
            <button
              key={u.id}
              type="button"
              onClick={() => {
                setName(u.name)
                setPassword(u.password)
              }}
              className="w-full flex items-center justify-between p-3 bg-[#f5f3f0]/5 hover:bg-[#d4af37]/20 rounded-lg transition-colors duration-300 cursor-pointer text-left"
            >
              <div>
                <span className="text-[#f5f3f0] text-sm">{u.name}</span>
                <span className="text-[#f5f3f0]/40 text-xs ml-2">({u.gender})</span>
              </div>
              <span className="text-xs text-[#d4af37] uppercase tracking-wider">{u.membershipTier}</span>
            </button>
          ))}
        </div>
        <p className="text-xs text-[#f5f3f0]/40 mt-3">Password for all: password123</p>
      </div>
    </form>
  )
}

export default function LoginPage() {
  return (
    <WebAuthProvider>
      <div className="fixed inset-0 z-[9999] bg-[#2d2926] overflow-y-auto">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#2d2926]/95 backdrop-blur-md border-b border-[#f5f3f0]/10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/landing" className="flex items-center gap-3 text-[#f5f3f0]/60 hover:text-[#f5f3f0] transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm tracking-wider">Back</span>
            </Link>
            <div className="text-2xl font-light tracking-widest text-[#f5f3f0]">RITUALS</div>
            <div className="w-20"></div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="pt-20 min-h-screen flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-light text-[#f5f3f0] mb-4 tracking-tight">
                Welcome Back
              </h1>
              <p className="text-[#f5f3f0]/60">
                Sign in to access your personalized Mood Mirror experience
              </p>
            </div>

            <LoginForm />
          </div>
        </div>
      </div>
    </WebAuthProvider>
  )
}
