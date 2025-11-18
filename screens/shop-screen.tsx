'use client'

import { Search, Sliders } from 'lucide-react'

export default function ShopScreen() {
  const categories = [
    'New',
    'Body',
    'Home',
    'Beauty',
    'Gifts',
    'Men',
    'Collections',
    'Advent',
    'Online Outlet',
  ]

  return (
    <div className="bg-primary text-primary-foreground min-h-screen p-4">
      <h1 className="text-2xl font-serif font-bold mb-6 mt-6">Shop</h1>

      {/* Search Bar */}
      <div className="flex gap-2 mb-8">
        <div className="flex-1 flex items-center bg-secondary/20 border border-primary-foreground/30 rounded-full px-3 py-2 gap-2">
          <Search className="w-4 h-4 text-primary-foreground/50" />
          <input
            type="text"
            placeholder="I'm looking for..."
            className="bg-transparent outline-none text-sm text-primary-foreground placeholder-primary-foreground/50 w-full"
          />
        </div>
        <button className="bg-secondary/20 border border-primary-foreground/30 rounded-full p-2 hover:bg-secondary/30 transition cursor-pointer">
          <Sliders className="w-4 h-4 text-primary-foreground" />
        </button>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        {categories.map((category) => (
          <div
            key={category}
            className="flex items-center justify-between cursor-pointer group"
          >
            <h2 className="text-lg font-serif font-bold group-hover:text-accent transition">
              {category}
            </h2>
            <span className="text-xl text-primary-foreground/50 group-hover:text-primary-foreground transition">
              ›
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
