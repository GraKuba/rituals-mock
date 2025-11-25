'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import LoginScreen from './login-screen'

export default function AccountScreen() {
  const [activeTab, setActiveTab] = useState('membership')
  const [showLogin, setShowLogin] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()

  if (showLogin) {
    return (
      <LoginScreen
        onBack={() => setShowLogin(false)}
        onSuccess={() => setShowLogin(false)}
      />
    )
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-4 px-4">
        <h1 className="text-xl font-serif mt-6">Account</h1>
      </div>

      {/* Tab Toggle */}
      <div className="flex gap-2 p-4 bg-background">
        <button
          onClick={() => setActiveTab('membership')}
          className={`flex-1 py-2.5 px-4 font-sans text-xs tracking-[0.15em] transition ${
            activeTab === 'membership'
              ? 'bg-secondary text-foreground border border-foreground'
              : 'bg-background text-foreground border border-border'
          }`}
        >
          MEMBERSHIP
        </button>
        <button
          onClick={() => setActiveTab('account')}
          className={`flex-1 py-2.5 px-4 font-sans text-xs tracking-[0.15em] transition ${
            activeTab === 'account'
              ? 'bg-secondary text-foreground border border-foreground'
              : 'bg-background text-foreground border border-border'
          }`}
        >
          ACCOUNT
        </button>
      </div>

      {/* Content */}
      <div className="px-4 pb-6">
        {activeTab === 'membership' && (
          <div className="space-y-6">
            {/* Diamond Logo */}
            <div className="text-center mb-6 mt-8">
              <div className="flex justify-center mb-4">
                <svg width="80" height="24" viewBox="0 0 120 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M30 12L40 2H50L60 12L50 22H40L30 12Z" fill="currentColor" opacity="0.3"/>
                  <path d="M40 12L50 2H60L70 12L60 22H50L40 12Z" fill="currentColor" opacity="0.6"/>
                  <path d="M50 12L60 2H70L80 12L70 22H60L50 12Z" fill="currentColor"/>
                </svg>
              </div>
              <p className="text-[10px] tracking-[0.2em] text-muted-foreground mb-3 font-sans">
                MY RITUALS
              </p>
              {isAuthenticated ? (
                <>
                  <h2 className="text-xl font-serif text-foreground mb-2 leading-tight px-4">
                    Welcome, {user?.name}
                  </h2>
                  <p className="text-sm text-muted-foreground capitalize">
                    {user?.membershipTier} Member
                  </p>
                </>
              ) : (
                <h2 className="text-xl font-serif text-foreground mb-2 leading-tight px-4">
                  Get your benefits now and become a Soulmate
                </h2>
              )}
            </div>

            {/* Meditation Image */}
            <div className="w-full aspect-[4/3] overflow-hidden mb-4">
              <img
                src="/photos/rituals-2.webp"
                alt="Meditation and wellness"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Benefits Section */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-serif text-foreground mb-2">
                  Unlock exclusive member rewards
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  With each qualifying purchase, enjoy increasingly exclusive gifts, member benefits, experiences & more
                </p>
              </div>

              {/* Horizontal scroll cards preview */}
              <div className="overflow-x-auto -mx-4 px-4 pb-4">
                <div className="flex gap-3 w-max">
                  <div className="w-48 bg-secondary p-4 border border-border">
                    <div className="text-sm font-serif mb-2">Discover exclusive well-being</div>
                    <p className="text-xs text-muted-foreground">
                      From birth to endless birthdays: guaranteed to support your well-being.
                    </p>
                  </div>
                  <div className="w-48 bg-secondary p-4 border border-border">
                    <div className="text-sm font-serif mb-2">Free gifts & special treats</div>
                    <p className="text-xs text-muted-foreground">
                      Unlock rewards with every purchase and celebrate your journey.
                    </p>
                  </div>
                  <div className="w-48 bg-secondary p-4 border border-border">
                    <div className="text-sm font-serif mb-2">Exclusive experiences</div>
                    <p className="text-xs text-muted-foreground">
                      Access to members-only events and wellness workshops.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full bg-primary text-primary-foreground py-3 font-sans text-xs tracking-widest hover:bg-primary/90 transition">
              CONTINUE
            </button>
          </div>
        )}

        {activeTab === 'account' && (
          <div className="py-8 space-y-4">
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
                {isAuthenticated ? (
                  <span className="text-2xl font-serif text-foreground">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                ) : (
                  <svg className="w-10 h-10 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                )}
              </div>
              {isAuthenticated ? (
                <>
                  <h3 className="text-lg font-serif text-foreground mb-2">Hello, {user?.name}</h3>
                  <p className="text-sm text-muted-foreground capitalize">{user?.membershipTier} Member</p>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-serif text-foreground mb-2">Welcome back</h3>
                  <p className="text-sm text-muted-foreground">Sign in to access your account</p>
                </>
              )}
            </div>

            {!isAuthenticated ? (
              <div className="space-y-3">
                <button
                  onClick={() => setShowLogin(true)}
                  className="w-full border border-foreground text-foreground py-3 font-sans text-xs tracking-widest hover:bg-foreground hover:text-background transition"
                >
                  SIGN IN
                </button>
                <button className="w-full bg-primary text-primary-foreground py-3 font-sans text-xs tracking-widest hover:bg-primary/90 transition">
                  CREATE ACCOUNT
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* User Preferences Summary */}
                <div className="bg-secondary p-4 border border-border">
                  <h4 className="text-sm font-serif mb-3">Your Preferences</h4>
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <p><span className="text-foreground">Skin Type:</span> {user?.preferences.skinType || 'Not set'}</p>
                    <p><span className="text-foreground">Favorite Scents:</span> {user?.preferences.favoriteScents?.join(', ') || 'Not set'}</p>
                    <p><span className="text-foreground">Wellness Goals:</span> {user?.preferences.wellnessGoals?.join(', ') || 'Not set'}</p>
                  </div>
                </div>

                {/* Recent Journal Entries */}
                {user?.journalEntries && user.journalEntries.length > 0 && (
                  <div className="bg-secondary p-4 border border-border">
                    <h4 className="text-sm font-serif mb-3">Recent Journal Entries</h4>
                    <div className="space-y-3">
                      {user.journalEntries.slice(0, 2).map((entry) => (
                        <div key={entry.id} className="text-xs">
                          <div className="flex justify-between text-muted-foreground mb-1">
                            <span>{entry.date}</span>
                            <span className="capitalize">{entry.mood}</span>
                          </div>
                          <p className="text-foreground">{entry.notes}</p>
                          {entry.ritualCompleted && (
                            <p className="text-muted-foreground mt-1">✓ {entry.ritualCompleted}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={logout}
                  className="w-full border border-foreground text-foreground py-3 font-sans text-xs tracking-widest hover:bg-foreground hover:text-background transition"
                >
                  SIGN OUT
                </button>
              </div>
            )}

            <div className="pt-8 space-y-4">
              <div className="border-t border-border pt-4">
                <button className="w-full text-left py-3 flex items-center justify-between text-sm">
                  <span className="font-sans">Order History</span>
                  <span className="text-muted-foreground">›</span>
                </button>
              </div>
              <div className="border-t border-border pt-4">
                <button className="w-full text-left py-3 flex items-center justify-between text-sm">
                  <span className="font-sans">Saved Addresses</span>
                  <span className="text-muted-foreground">›</span>
                </button>
              </div>
              <div className="border-t border-border pt-4">
                <button className="w-full text-left py-3 flex items-center justify-between text-sm">
                  <span className="font-sans">Payment Methods</span>
                  <span className="text-muted-foreground">›</span>
                </button>
              </div>
              <div className="border-t border-border pt-4">
                <button className="w-full text-left py-3 flex items-center justify-between text-sm">
                  <span className="font-sans">Settings</span>
                  <span className="text-muted-foreground">›</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
