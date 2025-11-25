'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'

interface LoginScreenProps {
  onBack: () => void
  onSuccess: () => void
}

export default function LoginScreen({ onBack, onSuccess }: LoginScreenProps) {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isShaking, setIsShaking] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [successName, setSuccessName] = useState('')
  const { login } = useAuth()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name.trim() || !password.trim()) {
      setError('Please enter both name and password')
      triggerShake()
      return
    }

    const result = login(name, password)
    if (result.success) {
      setSuccessName(name)
      setShowSuccess(true)
      setTimeout(() => {
        onSuccess()
      }, 1500)
    } else {
      setError(result.error || 'Login failed')
      triggerShake()
    }
  }

  const triggerShake = () => {
    setIsShaking(true)
    setTimeout(() => setIsShaking(false), 500)
  }

  if (showSuccess) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="w-24 h-24 rounded-full bg-amber-100 mx-auto mb-6 flex items-center justify-center animate-scale-in">
            <svg
              className="w-12 h-12 text-amber-600 animate-check"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-xl font-serif text-foreground mb-2 animate-slide-up">
            Welcome, {successName}!
          </h2>
          <p className="text-sm text-muted-foreground animate-slide-up-delay">
            Signing you in...
          </p>
        </div>

        <style jsx>{`
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes scale-in {
            from { transform: scale(0); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          @keyframes check {
            from { stroke-dashoffset: 24; }
            to { stroke-dashoffset: 0; }
          }
          @keyframes slide-up {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          .animate-fade-in {
            animation: fade-in 0.3s ease-out;
          }
          .animate-scale-in {
            animation: scale-in 0.4s ease-out;
          }
          .animate-check {
            stroke-dasharray: 24;
            animation: check 0.4s ease-out 0.2s forwards;
            stroke-dashoffset: 24;
          }
          .animate-slide-up {
            animation: slide-up 0.4s ease-out 0.3s forwards;
            opacity: 0;
          }
          .animate-slide-up-delay {
            animation: slide-up 0.4s ease-out 0.4s forwards;
            opacity: 0;
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-4 px-4">
        <div className="flex items-center gap-4 mt-6">
          <button onClick={onBack} className="text-primary-foreground">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-serif">Sign In</h1>
        </div>
      </div>

      {/* Login Form */}
      <div className="px-4 py-8">
        <div className="text-center mb-8">
          <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center transition-colors duration-300 ${
            error ? 'bg-red-100' : 'bg-secondary'
          }`}>
            <svg
              className={`w-10 h-10 transition-colors duration-300 ${
                error ? 'text-red-500' : 'text-muted-foreground'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-lg font-serif text-foreground mb-2">Welcome back</h2>
          <p className="text-sm text-muted-foreground">Enter your credentials to continue</p>
        </div>

        <form onSubmit={handleSubmit} className={`space-y-4 ${isShaking ? 'animate-shake' : ''}`}>
          <div>
            <label htmlFor="name" className="block text-xs font-sans tracking-widest text-muted-foreground mb-2">
              NAME
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (error) setError('')
              }}
              className={`w-full border bg-background px-4 py-3 text-sm focus:outline-none transition ${
                error ? 'border-red-400 focus:border-red-500' : 'border-border focus:border-foreground'
              }`}
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-sans tracking-widest text-muted-foreground mb-2">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (error) setError('')
              }}
              className={`w-full border bg-background px-4 py-3 text-sm focus:outline-none transition ${
                error ? 'border-red-400 focus:border-red-500' : 'border-border focus:border-foreground'
              }`}
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 text-sm justify-center animate-error-appear">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-3 font-sans text-xs tracking-widest hover:bg-primary/90 transition mt-6"
          >
            SIGN IN
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground text-center mb-4">
            Available test accounts:
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs text-center text-muted-foreground">
            <span>Berny</span>
            <span>Thania</span>
            <span>Anna</span>
            <span>Rio</span>
            <span>Claudia</span>
            <span>Aurora</span>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Password: password123
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        @keyframes error-appear {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        .animate-error-appear {
          animation: error-appear 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
