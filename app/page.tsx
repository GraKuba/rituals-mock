'use client'

import { useState } from 'react'
import TabNavigation from '@/components/tab-navigation'
import HomeScreen from '@/screens/home-screen'
import ShopScreen from '@/screens/shop-screen'
import MagazineScreen from '@/screens/magazine-screen'
import AccountScreen from '@/screens/account-screen'
import MoodBoardScreen from '@/screens/mood-board-screen'

export default function Home() {
  const [activeTab, setActiveTab] = useState('home')

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />
      case 'shop':
        return <ShopScreen />
      case 'magazine':
        return <MagazineScreen />
      case 'account':
        return <AccountScreen />
      case 'mood':
        return <MoodBoardScreen />
      default:
        return <HomeScreen />
    }
  }

  return (
    <div className="relative flex flex-col h-full bg-background">
      <div className={`flex-1 pb-20 ${activeTab === 'shop' ? 'overflow-y-hidden' : 'overflow-y-auto'}`}>
        {renderScreen()}
      </div>
      <div className="absolute bottom-0 left-0 right-0 w-full z-40">
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  )
}
