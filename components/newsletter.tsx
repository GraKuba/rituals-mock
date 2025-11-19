'use client'

import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')

  return (
    <section className="w-full bg-primary text-primary-foreground py-12 px-4 border-t border-primary-foreground/20">
      <div className="w-full text-center">
        <p className="text-[10px] tracking-[0.2em] text-primary-foreground/60 mb-3 font-sans">
          STAY IN THE LOOP
        </p>
        <h2 className="text-2xl font-serif text-primary-foreground mb-4">
          Join our community
        </h2>
        <p className="text-sm text-primary-foreground/80 font-sans mb-6 leading-relaxed">
          Discover exclusive offers, new collections, and wellness tips delivered straight to your inbox.
        </p>

        <form className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-primary-foreground/10 text-primary-foreground placeholder-primary-foreground/40 outline-none border border-primary-foreground/20 focus:border-primary-foreground/60 transition text-sm"
          />
          <button
            type="submit"
            className="w-full bg-primary-foreground text-primary py-3 text-xs tracking-widest hover:bg-primary-foreground/90 transition font-sans"
          >
            SUBSCRIBE
          </button>
        </form>
      </div>
    </section>
  )
}
