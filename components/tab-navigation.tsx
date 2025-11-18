'use client'

import { Home, Search, BookOpen, User, Palette } from 'lucide-react'

interface TabNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs = [
    { id: 'home', label: 'HOME', icon: Home },
    { id: 'shop', label: 'SHOP', icon: Search },
    { id: 'magazine', label: 'MAGAZINE', icon: BookOpen },
    { id: 'mood', label: 'MOOD', icon: Palette },
    { id: 'account', label: 'ACCOUNT', icon: User },
  ]

  return (
    <nav className="bg-primary border-t border-border flex items-center justify-around py-4 px-4 shadow-lg">
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = activeTab === tab.id

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="flex flex-col items-center gap-1.5 text-xs font-sans transition-colors cursor-pointer"
          >
            <Icon
              className={`w-6 h-6 ${
                isActive ? 'text-primary-foreground' : 'text-muted-foreground'
              }`}
            />
            <span
              className={`tracking-wider text-xs ${
                isActive ? 'text-primary-foreground font-semibold' : 'text-foreground/40'
              }`}
            >
              {tab.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
