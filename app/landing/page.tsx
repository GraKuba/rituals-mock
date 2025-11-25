'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed inset-0 z-[9999] bg-[#f5f3f0] overflow-y-auto">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-light tracking-widest text-gray-800">RITUALS</div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#mood-mirror" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Mood Mirror</a>
            <a href="#journal" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Journal</a>
            <a href="#features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Features</a>
          </div>
          <Link
            href="/"
            className="px-6 py-2 bg-gray-900 text-white text-sm rounded-full hover:bg-[#d4af37] transition-colors duration-300 cursor-pointer"
          >
            Try App
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-6 tracking-tight">
            Your Daily
            <span className="block text-gray-500">Wellness Companion</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Transform your emotional well-being with our Mood Mirror and AI-powered journaling.
            Discover patterns, gain insights, and nurture your inner peace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/mood"
              className="px-8 py-4 bg-gray-900 text-white rounded-full text-lg hover:bg-[#d4af37] transition-colors duration-300 cursor-pointer"
            >
              Start Your Journey
            </Link>
            <a
              href="#mood-mirror"
              className="px-8 py-4 border border-gray-300 text-gray-700 rounded-full text-lg hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-colors duration-300 cursor-pointer"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Mood Mirror Section */}
      <section id="mood-mirror" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm text-gray-500 uppercase tracking-widest mb-4 block">Mood Mirror</span>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
                See Your Emotions Reflected
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our Mood Mirror creates a beautiful visual representation of your emotional state.
                Track your feelings over time and discover patterns that help you understand yourself better.
              </p>
              <ul className="space-y-4">
                {['Visual mood tracking', 'Pattern recognition', 'Weekly insights', 'Personalized recommendations'].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-gray-700">
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-amber-100 via-rose-100 to-violet-100 rounded-3xl shadow-2xl flex items-center justify-center">
                <div className="w-3/4 h-3/4 bg-white/60 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🪞</div>
                    <p className="text-gray-600 font-light">Mood Mirror Preview</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journal Section */}
      <section id="journal" className="py-24 px-6 bg-[#f5f3f0]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 relative">
              <div className="aspect-[4/5] bg-white rounded-3xl shadow-2xl p-8 flex flex-col">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-100 rounded w-full"></div>
                  <div className="h-4 bg-gray-100 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-100 rounded w-2/3"></div>
                  <div className="mt-8 p-4 bg-amber-50 rounded-xl">
                    <p className="text-sm text-amber-800 font-medium">AI Insight</p>
                    <p className="text-xs text-amber-600 mt-1">Your writing shows increased positivity this week...</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <span className="text-sm text-gray-500 uppercase tracking-widest mb-4 block">AI Journal</span>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
                Write. Reflect. Grow.
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our AI-powered journal helps you process your thoughts and emotions.
                Get personalized prompts, gentle insights, and track your personal growth journey.
              </p>
              <ul className="space-y-4">
                {['AI-powered prompts', 'Sentiment analysis', 'Growth tracking', 'Private & secure'].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-gray-700">
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm text-gray-500 uppercase tracking-widest mb-4 block">Features</span>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900">
              Everything You Need
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎯',
                title: 'Daily Check-ins',
                description: 'Quick mood tracking that takes less than a minute'
              },
              {
                icon: '📊',
                title: 'Analytics',
                description: 'Visualize your emotional patterns over time'
              },
              {
                icon: '🤖',
                title: 'AI Insights',
                description: 'Get personalized recommendations based on your data'
              },
              {
                icon: '🔒',
                title: 'Private & Secure',
                description: 'Your data stays private and encrypted'
              },
              {
                icon: '🌙',
                title: 'Sleep Tracking',
                description: 'Connect sleep quality with emotional well-being'
              },
              {
                icon: '🎁',
                title: 'Rituals Products',
                description: 'Discover products that match your wellness goals'
              }
            ].map((feature) => (
              <div key={feature.title} className="p-8 bg-[#f5f3f0] rounded-2xl hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
            Begin Your Wellness Journey
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Join thousands who have transformed their daily routines into meaningful rituals.
          </p>
          <Link
            href="/mood"
            className="inline-block px-10 py-4 bg-white text-gray-900 rounded-full text-lg font-medium hover:bg-[#d4af37] hover:text-white transition-colors duration-300 cursor-pointer"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-xl font-light tracking-widest text-white">RITUALS</div>
            <div className="flex items-center gap-8">
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Contact</a>
            </div>
            <p className="text-sm text-gray-500">© 2024 Rituals. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
