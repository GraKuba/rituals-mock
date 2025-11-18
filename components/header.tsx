'use client'

import { Search, User, ShoppingBag, Menu } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="w-full bg-white border-b border-border">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4 text-center text-xs tracking-wider">
        Delivery time 1 - 3 working days
      </div>

      {/* Main Header */}
      <div className="max-w-full px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-serif font-bold">RITUALS...</div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-8 text-sm font-sans absolute left-1/2 transform -translate-x-1/2">
            <a href="#" className="text-foreground hover:text-primary transition">New</a>
            <a href="#" className="text-foreground hover:text-primary transition">Body</a>
            <a href="#" className="text-foreground hover:text-primary transition">Home</a>
            <a href="#" className="text-foreground hover:text-primary transition">Beauty</a>
            <a href="#" className="text-foreground hover:text-primary transition">Gifts</a>
            <a href="#" className="text-foreground hover:text-primary transition">Men</a>
            <a href="#" className="text-foreground hover:text-primary transition">Collections</a>
            <a href="#" className="text-foreground hover:text-primary transition">Advent</a>
            <a href="#" className="text-foreground hover:text-primary transition">Online Outlet</a>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-secondary px-3 py-2 rounded-none text-sm">
              <input
                type="text"
                placeholder="I'm looking for..."
                className="bg-transparent outline-none w-32 placeholder-muted-foreground"
              />
              <Search className="w-4 h-4 text-muted-foreground" />
            </div>
            <button className="text-foreground hover:text-primary">
              <User className="w-5 h-5" />
            </button>
            <button className="text-foreground hover:text-primary">
              <ShoppingBag className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-foreground"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="lg:hidden mt-4 flex flex-col gap-3 text-sm">
            <a href="#" className="text-foreground hover:text-primary">New</a>
            <a href="#" className="text-foreground hover:text-primary">Body</a>
            <a href="#" className="text-foreground hover:text-primary">Home</a>
            <a href="#" className="text-foreground hover:text-primary">Beauty</a>
            <a href="#" className="text-foreground hover:text-primary">Gifts</a>
            <a href="#" className="text-foreground hover:text-primary">Men</a>
            <a href="#" className="text-foreground hover:text-primary">Collections</a>
            <a href="#" className="text-foreground hover:text-primary">Advent</a>
            <a href="#" className="text-foreground hover:text-primary">Online Outlet</a>
          </nav>
        )}
      </div>
    </header>
  )
}
