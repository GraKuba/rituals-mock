'use client'

import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { useState } from 'react'

export default function ProductCarousel() {
  const [scrollPosition, setScrollPosition] = useState(0)

  const products = [
    {
      name: 'Gift Set L',
      description: 'The Ritual of Sakura, gift set L',
      price: '€59.90',
      value: '€90.50',
      tag: 'New',
      image: '/photos/rituals-17.webp',
    },
    {
      name: 'Classic Advent Calendar',
      description: 'The Ritual of Advent, advent calendar',
      price: '€89.90',
      value: '€150.90',
      tag: 'New design',
      image: '/photos/rituals-14.webp',
    },
    {
      name: 'Gift Set S',
      description: 'The Ritual of Jing, gift set S',
      price: '€25.90',
      value: '€29.60',
      tag: 'New',
      image: '/photos/rituals-11.webp',
    },
    {
      name: 'Home Collection',
      description: 'The Ritual of Home, premium collection',
      price: '€35.90',
      value: '€45.00',
      tag: 'New',
      image: '/photos/rituals-10.webp',
    },
  ]

  return (
    <section className="w-full bg-white py-8 px-4">
      <div className="w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-serif text-foreground">
            New Arrivals
          </h2>
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-full border border-border hover:border-foreground transition">
              <ChevronLeft className="w-4 h-4 mx-auto" />
            </button>
            <button className="w-8 h-8 rounded-full border border-border hover:border-foreground transition">
              <ChevronRight className="w-4 h-4 mx-auto" />
            </button>
          </div>
        </div>

        {/* Product Grid - 2 columns for mobile */}
        <div className="grid grid-cols-2 gap-4">
          {products.map((product, index) => (
            <div key={index} className="group">
              <div className="relative bg-secondary overflow-hidden mb-3 aspect-square flex items-center justify-center">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 text-[10px] text-muted-foreground font-sans">
                  {product.tag}
                </span>
                <button className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white text-foreground flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <h3 className="text-sm font-serif text-foreground mb-1">
                {product.name}
              </h3>
              <p className="text-xs text-muted-foreground font-sans mb-2 line-clamp-2">
                {product.description}
              </p>
              <div className="flex flex-col gap-0.5">
                <span className="text-base font-serif text-foreground">
                  {product.price}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  Value {product.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
