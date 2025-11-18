'use client'

import { ChevronLeft, ChevronRight, Radio } from 'lucide-react'
import { useState } from 'react'

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0)

  const slides = [
    {
      image: '/photos/rituals-14.webp',
      tagline: 'SO BEAUTIFUL THAT IT BELONGS INSIDE',
      title: 'Christmas Wreath\nAdvent Calendar',
      cta: 'SHOP NOW',
    },
    {
      image: '/photos/rituals-13.webp',
      tagline: 'ELEVATE YOUR ROUTINE',
      title: 'Premium\nGift Sets',
      cta: 'DISCOVER',
    },
    {
      image: '/photos/rituals-2.webp',
      tagline: 'TRANSFORM YOUR MOMENTS',
      title: 'Daily Rituals\nCollection',
      cta: 'EXPLORE',
    },
  ]

  return (
    <section className="relative w-full h-[75vh] bg-secondary overflow-hidden">
      {/* Slides */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === activeSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 px-6">
          <p className="text-white text-[10px] tracking-[0.2em] mb-3 font-sans">
            {slides[activeSlide].tagline}
          </p>
          <h1 className="text-white text-3xl font-serif text-center whitespace-pre-line mb-6 leading-tight">
            {slides[activeSlide].title}
          </h1>
          <button className="bg-white text-foreground px-12 py-3 text-xs font-sans tracking-widest hover:bg-gray-200 transition">
            {slides[activeSlide].cta}
          </button>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className={`${
              index === activeSlide
                ? 'w-6 h-1.5 bg-white'
                : 'w-1.5 h-1.5 bg-white/50'
            } rounded-full transition-all`}
          />
        ))}
      </div>

      {/* Arrow Navigation - Hidden on mobile for cleaner look */}
      <div className="absolute bottom-6 right-6 hidden md:flex gap-3 z-10">
        <button
          onClick={() =>
            setActiveSlide((prev) =>
              prev === 0 ? slides.length - 1 : prev - 1
            )
          }
          className="w-10 h-10 rounded-full border border-white text-white hover:bg-white hover:text-black transition flex items-center justify-center"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => setActiveSlide((prev) => (prev + 1) % slides.length)}
          className="w-10 h-10 rounded-full border border-white text-white hover:bg-white hover:text-black transition flex items-center justify-center"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  )
}
