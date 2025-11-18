'use client'

import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')

  return (
    <section className="w-full bg-secondary py-12 px-4">
      <div className="w-full text-center">
        <p className="text-[10px] tracking-[0.2em] text-muted-foreground mb-3 font-sans">
          STAY IN THE LOOP
        </p>
        <h2 className="text-2xl font-serif text-foreground mb-4">
          Join our community
        </h2>
        <p className="text-sm text-muted-foreground font-sans mb-6 leading-relaxed">
          Discover exclusive offers, new collections, and wellness tips delivered straight to your inbox.
        </p>

        <form className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-white text-foreground placeholder-muted-foreground outline-none border border-border focus:border-primary transition text-sm"
          />
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-3 text-xs tracking-widest hover:bg-primary/90 transition font-sans"
          >
            SUBSCRIBE
          </button>
        </form>
      </div>
    </section>
  )
}
