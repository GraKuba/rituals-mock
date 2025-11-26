'use client'

import { useState, useEffect } from 'react'
import { Music, ShoppingBag, Camera, ArrowLeft, User, History, LogOut } from 'lucide-react'
import Link from 'next/link'
import { WebAuthProvider, useWebAuth } from '@/lib/web-auth-context'

const MOOD_DATA = {
  stressed: {
    video: {
      title: '2-min Breathwork',
      description: 'Calm your nervous system',
      duration: '2:00',
      thumbnail: '/photos/rituals-2.webp'
    },
    playlist: { title: 'Stress Relief', artist: 'Spotify', songs: 12 },
    products: {
      explorer: {
        main: {
          name: 'The Ritual of Jing - Starter',
          price: '€19.90',
          description: 'Sacred Lotus Body Mist',
          image: '/photos/rituals-11.webp'
        },
        recommended: [
          {
            name: 'Jing Hand Balm',
            price: '€9.90',
            description: 'Calming hand cream with Sacred Lotus',
            image: '/photos/rituals-12.webp'
          },
          {
            name: 'Mini Sleep Mist',
            price: '€12.90',
            description: 'Travel-size lavender pillow spray',
            image: '/photos/rituals-19.webp'
          }
        ]
      },
      lover: {
        main: {
          name: 'The Ritual of Jing',
          price: '€29.90',
          description: 'Sacred Lotus & Jujube Body Cream',
          image: '/photos/rituals-17.webp'
        },
        recommended: [
          {
            name: 'Jing Body Cream',
            price: '€19.90',
            description: 'Deeply nourishing formula with Sacred Lotus',
            image: '/photos/rituals-18.webp'
          },
          {
            name: 'Calming Ritual Set',
            price: '€44.90',
            description: 'Complete relaxation experience',
            image: '/photos/rituals-20.webp'
          },
          {
            name: 'Sleep Mist',
            price: '€14.90',
            description: 'Lavender & chamomile pillow spray',
            image: '/photos/rituals-21.webp'
          }
        ]
      },
      soulpartner: {
        main: {
          name: 'The Ritual of Jing - Luxury Collection',
          price: '€89.90',
          description: 'Complete Sacred Lotus & Jujube Ritual Set',
          image: '/photos/rituals-10.webp'
        },
        recommended: [
          {
            name: 'Jing Foaming Shower Gel',
            price: '€29.90',
            description: 'Luxurious foaming gel with Sacred Lotus',
            image: '/photos/rituals-22.webp'
          },
          {
            name: 'Premium Calming Ritual Set',
            price: '€74.90',
            description: 'Exclusive relaxation experience with silk pouch',
            image: '/photos/rituals-23.webp'
          },
          {
            name: 'Jing Scented Candle',
            price: '€24.90',
            description: 'Hand-poured candle with Sacred Lotus essence',
            image: '/photos/rituals-8.webp'
          }
        ]
      }
    }
  },
  low_energy: {
    video: {
      title: 'Morning Energizer',
      description: 'Invigorate your spirit',
      duration: '5:00',
      thumbnail: '/photos/rituals-2.webp'
    },
    playlist: { title: 'Rise & Shine', artist: 'Spotify', songs: 18 },
    products: {
      explorer: {
        main: {
          name: 'The Ritual of Mehr - Starter',
          price: '€16.90',
          description: 'Sweet Orange Body Mist',
          image: '/photos/rituals-1.webp'
        },
        recommended: [
          {
            name: 'Energy Boost Mini',
            price: '€11.90',
            description: 'Travel-size citrus shower gel',
            image: '/photos/rituals-9.webp'
          },
          {
            name: 'Ginger Hand Scrub',
            price: '€13.90',
            description: 'Energizing hand exfoliator',
            image: '/photos/rituals-13.webp'
          }
        ]
      },
      lover: {
        main: {
          name: 'The Ritual of Mehr',
          price: '€24.90',
          description: 'Sweet Orange & Cedar Wood Body Oil',
          image: '/photos/rituals-14.webp'
        },
        recommended: [
          {
            name: 'Energy Boost Shower',
            price: '€17.90',
            description: 'Citrus & ginger energizing gel',
            image: '/photos/rituals-15.webp'
          },
          {
            name: 'Morning Ritual Kit',
            price: '€39.90',
            description: 'Awakening body care essentials',
            image: '/photos/rituals-16.webp'
          },
          {
            name: 'Vitality Scrub',
            price: '€22.90',
            description: 'Exfoliating body polish with sweet orange',
            image: '/photos/rituals-3.webp'
          }
        ]
      },
      soulpartner: {
        main: {
          name: 'The Ritual of Mehr - Deluxe Collection',
          price: '€79.90',
          description: 'Complete Energizing Ritual Set',
          image: '/photos/rituals-23.webp'
        },
        recommended: [
          {
            name: 'Mehr Luxury Shower Oil',
            price: '€34.90',
            description: 'Premium energizing shower oil',
            image: '/photos/rituals-8.webp'
          },
          {
            name: 'Deluxe Morning Ritual Set',
            price: '€69.90',
            description: 'Complete awakening collection with gift box',
            image: '/photos/rituals-10.webp'
          },
          {
            name: 'Vitality Massage Oil',
            price: '€32.90',
            description: 'Invigorating massage oil with cedar wood',
            image: '/photos/rituals-22.webp'
          }
        ]
      }
    }
  },
  joyful: {
    video: {
      title: 'Celebration Flow',
      description: 'Embrace the moment',
      duration: '3:30',
      thumbnail: '/photos/rituals-2.webp'
    },
    playlist: { title: 'Feel Good Vibes', artist: 'Spotify', songs: 25 },
    products: {
      explorer: {
        main: {
          name: 'Ritual of Happiness - Starter',
          price: '€18.90',
          description: 'Neroli Body Mist',
          image: '/photos/rituals-11.webp'
        },
        recommended: [
          {
            name: 'Happiness Hand Balm',
            price: '€9.90',
            description: 'Nourishing hand cream with uplifting scents',
            image: '/photos/rituals-12.webp'
          },
          {
            name: 'Mini Buddha Mist',
            price: '€11.90',
            description: 'Travel-size uplifting body spray',
            image: '/photos/rituals-19.webp'
          }
        ]
      },
      lover: {
        main: {
          name: 'Ritual of Happiness',
          price: '€34.90',
          description: 'Neroli & Sandalwood Gift Set',
          image: '/photos/rituals-17.webp'
        },
        recommended: [
          {
            name: 'Happy Buddha Body Mist',
            price: '€16.90',
            description: 'Uplifting neroli & sandalwood spray',
            image: '/photos/rituals-18.webp'
          },
          {
            name: 'Joy Collection',
            price: '€49.90',
            description: 'Celebration essentials gift set',
            image: '/photos/rituals-20.webp'
          },
          {
            name: 'Happiness Hand Balm',
            price: '€9.90',
            description: 'Nourishing hand cream with uplifting scents',
            image: '/photos/rituals-21.webp'
          }
        ]
      },
      soulpartner: {
        main: {
          name: 'Ritual of Happiness - Premium Collection',
          price: '€99.90',
          description: 'Complete Neroli & Sandalwood Luxury Set',
          image: '/photos/rituals-1.webp'
        },
        recommended: [
          {
            name: 'Deluxe Happy Buddha Set',
            price: '€39.90',
            description: 'Premium uplifting ritual collection',
            image: '/photos/rituals-9.webp'
          },
          {
            name: 'Joy Luxury Collection',
            price: '€89.90',
            description: 'Exclusive celebration set with silk wrapping',
            image: '/photos/rituals-13.webp'
          },
          {
            name: 'Happiness Scented Candle',
            price: '€27.90',
            description: 'Hand-poured candle with neroli essence',
            image: '/photos/rituals-14.webp'
          }
        ]
      }
    }
  }
}

// Male-specific products
const MOOD_DATA_MALE = {
  stressed: {
    video: {
      title: '2-min Breathwork',
      description: 'Calm your nervous system',
      duration: '2:00',
      thumbnail: '/photos/rituals-2.webp'
    },
    playlist: { title: 'Stress Relief', artist: 'Spotify', songs: 12 },
    products: {
      explorer: {
        main: {
          name: 'The Ritual of Samurai - Starter',
          price: '€19.90',
          description: 'Bamboo & Mint Shower Gel',
          image: '/photos/rituals-11.webp'
        },
        recommended: [
          {
            name: 'Samurai Face Wash',
            price: '€14.90',
            description: 'Refreshing bamboo face cleanser for men',
            image: '/photos/rituals-12.webp'
          },
          {
            name: 'Mini Shave Cream',
            price: '€9.90',
            description: 'Travel-size cooling shave cream',
            image: '/photos/rituals-19.webp'
          }
        ]
      },
      lover: {
        main: {
          name: 'The Ritual of Samurai',
          price: '€29.90',
          description: 'Bamboo & Mint Body Care Set',
          image: '/photos/rituals-17.webp'
        },
        recommended: [
          {
            name: 'Samurai Body Cream',
            price: '€19.90',
            description: 'Fast-absorbing body moisturizer for men',
            image: '/photos/rituals-18.webp'
          },
          {
            name: 'Samurai Sport Shower Gel',
            price: '€12.90',
            description: 'Invigorating shower gel with cooling mint',
            image: '/photos/rituals-20.webp'
          },
          {
            name: 'Anti-Fatigue Eye Balm',
            price: '€24.90',
            description: 'Energizing eye treatment for tired eyes',
            image: '/photos/rituals-21.webp'
          }
        ]
      },
      soulpartner: {
        main: {
          name: 'The Ritual of Samurai - Luxury Collection',
          price: '€89.90',
          description: 'Complete Bamboo & Mint Grooming Set',
          image: '/photos/rituals-10.webp'
        },
        recommended: [
          {
            name: 'Samurai Premium Shave Set',
            price: '€49.90',
            description: 'Luxury shaving kit with brush and stand',
            image: '/photos/rituals-22.webp'
          },
          {
            name: 'Samurai Face Collection',
            price: '€74.90',
            description: 'Complete face care routine for men',
            image: '/photos/rituals-23.webp'
          },
          {
            name: 'Samurai Eau de Parfum',
            price: '€54.90',
            description: 'Sophisticated woody fragrance for men',
            image: '/photos/rituals-8.webp'
          }
        ]
      }
    }
  },
  low_energy: {
    video: {
      title: 'Morning Energizer',
      description: 'Invigorate your spirit',
      duration: '5:00',
      thumbnail: '/photos/rituals-2.webp'
    },
    playlist: { title: 'Rise & Shine', artist: 'Spotify', songs: 18 },
    products: {
      explorer: {
        main: {
          name: 'Homme Collection - Starter',
          price: '€16.90',
          description: 'Energizing Shower Foam',
          image: '/photos/rituals-1.webp'
        },
        recommended: [
          {
            name: 'Wake-Up Shower Gel',
            price: '€11.90',
            description: 'Invigorating morning shower gel for men',
            image: '/photos/rituals-9.webp'
          },
          {
            name: 'Sport Deodorant',
            price: '€9.90',
            description: '24h protection deodorant spray',
            image: '/photos/rituals-13.webp'
          }
        ]
      },
      lover: {
        main: {
          name: 'Homme Vitality Collection',
          price: '€34.90',
          description: 'Energizing Body Care Set for Men',
          image: '/photos/rituals-14.webp'
        },
        recommended: [
          {
            name: 'Homme 2-in-1 Shampoo',
            price: '€14.90',
            description: 'Hair & body wash with energizing scent',
            image: '/photos/rituals-15.webp'
          },
          {
            name: 'Charcoal Face Scrub',
            price: '€17.90',
            description: 'Deep cleansing face exfoliator',
            image: '/photos/rituals-16.webp'
          },
          {
            name: 'Sport Shower Foam',
            price: '€12.90',
            description: 'Post-workout refreshing shower foam',
            image: '/photos/rituals-3.webp'
          }
        ]
      },
      soulpartner: {
        main: {
          name: 'Homme - Deluxe Collection',
          price: '€79.90',
          description: 'Complete Men\'s Grooming Experience',
          image: '/photos/rituals-23.webp'
        },
        recommended: [
          {
            name: 'Homme Luxury Gift Set',
            price: '€59.90',
            description: 'Premium grooming essentials in gift box',
            image: '/photos/rituals-8.webp'
          },
          {
            name: 'Anti-Ageing Face Cream',
            price: '€44.90',
            description: 'Advanced anti-wrinkle formula for men',
            image: '/photos/rituals-10.webp'
          },
          {
            name: 'Homme Eau de Parfum',
            price: '€49.90',
            description: 'Bold and sophisticated men\'s fragrance',
            image: '/photos/rituals-22.webp'
          }
        ]
      }
    }
  },
  joyful: {
    video: {
      title: 'Celebration Flow',
      description: 'Embrace the moment',
      duration: '3:30',
      thumbnail: '/photos/rituals-2.webp'
    },
    playlist: { title: 'Feel Good Vibes', artist: 'Spotify', songs: 25 },
    products: {
      explorer: {
        main: {
          name: 'Samurai Sport - Starter',
          price: '€18.90',
          description: 'Refreshing Body Mist for Men',
          image: '/photos/rituals-11.webp'
        },
        recommended: [
          {
            name: 'Sport Shower Gel',
            price: '€9.90',
            description: 'Quick-rinse energizing shower gel',
            image: '/photos/rituals-12.webp'
          },
          {
            name: 'Mini Body Spray',
            price: '€11.90',
            description: 'Travel-size refreshing body spray',
            image: '/photos/rituals-19.webp'
          }
        ]
      },
      lover: {
        main: {
          name: 'Samurai Sport Collection',
          price: '€34.90',
          description: 'Active Lifestyle Set for Men',
          image: '/photos/rituals-17.webp'
        },
        recommended: [
          {
            name: 'Sport Body Lotion',
            price: '€16.90',
            description: 'Fast-absorbing post-workout moisturizer',
            image: '/photos/rituals-18.webp'
          },
          {
            name: 'Muscle Relief Gel',
            price: '€19.90',
            description: 'Cooling gel for tired muscles',
            image: '/photos/rituals-20.webp'
          },
          {
            name: 'Sport Deodorant Stick',
            price: '€12.90',
            description: 'Long-lasting protection for active men',
            image: '/photos/rituals-21.webp'
          }
        ]
      },
      soulpartner: {
        main: {
          name: 'Samurai - Premium Collection',
          price: '€99.90',
          description: 'Complete Luxury Men\'s Ritual Set',
          image: '/photos/rituals-1.webp'
        },
        recommended: [
          {
            name: 'Samurai Ultimate Gift Set',
            price: '€69.90',
            description: 'Premium collection in wooden gift box',
            image: '/photos/rituals-9.webp'
          },
          {
            name: 'Homme Signature Set',
            price: '€89.90',
            description: 'Exclusive grooming collection for men',
            image: '/photos/rituals-13.webp'
          },
          {
            name: 'Samurai Limited Edition',
            price: '€64.90',
            description: 'Special edition fragrance and body care',
            image: '/photos/rituals-14.webp'
          }
        ]
      }
    }
  }
}

function MoodMirrorContent() {
  const { user, isAuthenticated, logout } = useWebAuth()
  const [apiKey, setApiKey] = useState('')
  const [showApiInput, setShowApiInput] = useState(false)
  const [view, setView] = useState<'scan' | 'journal'>('scan')
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [currentMood, setCurrentMood] = useState<'stressed' | 'low_energy' | 'joyful' | null>(null)

  // Get tier from authenticated user, default to explorer
  const tier: 'explorer' | 'lover' | 'soulpartner' = isAuthenticated && user?.membershipTier
    ? user.membershipTier
    : 'explorer'

  // Check if user is soul partner for journal access
  const isSoulPartner = tier === 'soulpartner'

  // Select mood data based on user gender
  const isMale = isAuthenticated && user?.gender === 'male'
  const moodData = isMale ? MOOD_DATA_MALE : MOOD_DATA

  // Load API key from localStorage on mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem('gemini_api_key')
    if (savedApiKey) {
      setApiKey(savedApiKey)
    } else if (process.env.EXPO_PUBLIC_GEMINI_API_KEY) {
      setApiKey(process.env.EXPO_PUBLIC_GEMINI_API_KEY)
    }
  }, [])

  // Save API key to localStorage whenever it changes
  useEffect(() => {
    if (apiKey) {
      localStorage.setItem('gemini_api_key', apiKey)
    }
  }, [apiKey])

  const analyzeMood = async (imageSrc: string) => {
    if (!apiKey) {
      alert('Please enter your Gemini API key in Settings')
      setShowApiInput(true)
      return
    }

    try {
      const base64Image = imageSrc.split(',')[1]
      if (!base64Image) {
        throw new Error('Failed to process image data')
      }

      const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              {
                text: 'Analyze the facial expression in this image. Detect the emotional state. Return strictly a JSON object with the structure { "mood": "mood_key" } where mood_key is exactly one of: "stressed", "low_energy", "joyful". Do not use markdown code blocks.'
              },
              {
                inlineData: {
                  mimeType: 'image/jpeg',
                  data: base64Image
                }
              }
            ]
          }]
        })
      })

      if (!response.ok) {
        const errorText = await response.text()
        let errorMessage = `API request failed: ${response.status} ${response.statusText}`
        try {
          const errorJson = JSON.parse(errorText)
          errorMessage = errorJson.error?.message || errorMessage
        } catch (e) {}
        throw new Error(errorMessage)
      }

      const data = await response.json()
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text

      if (!text) {
        throw new Error('No text content in API response')
      }

      const cleanJson = text.replace(/```json|```/g, '').trim()
      const parsed = JSON.parse(cleanJson)

      if (!['stressed', 'low_energy', 'joyful'].includes(parsed.mood)) {
        throw new Error(`Invalid mood value: ${parsed.mood}`)
      }

      setCurrentMood(parsed.mood)
      setStep(3)

    } catch (error) {
      const moods: Array<'stressed' | 'low_energy' | 'joyful'> = ['stressed', 'low_energy', 'joyful']
      const fallbackMood = moods[Math.floor(Math.random() * moods.length)]
      setCurrentMood(fallbackMood)
      setStep(3)
      alert(`Mood analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}. Using random mood.`)
    }
  }

  const handleCapture = async () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async (e: any) => {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (event: any) => {
        setStep(2)
        setTimeout(() => analyzeMood(event.target.result), 1000)
      }
      reader.readAsDataURL(file)
    }
    input.click()
  }

  const handleReset = () => {
    setStep(1)
    setCurrentMood(null)
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-[#2d2926] text-[#f5f3f0] overflow-y-auto">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#2d2926]/95 backdrop-blur-md border-b border-[#f5f3f0]/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/landing" className="flex items-center gap-3 text-[#f5f3f0]/60 hover:text-[#f5f3f0] transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm tracking-wider">Back</span>
          </Link>
          <div className="text-2xl font-light tracking-widest text-[#f5f3f0]">RITUALS</div>
          <div className="flex items-center gap-4">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-[#f5f3f0]/60">{user.name}</span>
                <span className="text-xs text-[#d4af37] uppercase tracking-wider">{tier}</span>
                <button
                  onClick={logout}
                  className="text-[#f5f3f0]/60 hover:text-[#f5f3f0] transition"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 text-sm text-[#f5f3f0]/60 hover:text-[#f5f3f0] transition"
              >
                <User className="w-4 h-4" />
                <span>Sign In</span>
              </Link>
            )}
            <button
              onClick={() => setShowApiInput(!showApiInput)}
              className="text-xs text-[#f5f3f0]/60 tracking-wider hover:text-[#f5f3f0] transition uppercase"
            >
              Settings
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 min-h-screen">
        {/* API Key Input */}
        {showApiInput && (
          <div className="max-w-md mx-auto px-6 py-4">
            <div className="p-4 bg-[#f5f3f0]/10 border border-[#f5f3f0]/20 rounded-lg">
              <label className="text-xs text-[#f5f3f0]/60 tracking-widest uppercase mb-2 block">
                Gemini API Key
              </label>
              <input
                type="password"
                placeholder="Enter your API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-4 py-3 bg-[#f5f3f0]/10 border border-[#f5f3f0]/20 text-[#f5f3f0] placeholder-[#f5f3f0]/40 text-sm rounded focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
              />
            </div>
          </div>
        )}

        {/* Tab Navigation for Soul Partners */}
        {isSoulPartner && (
          <div className="max-w-4xl mx-auto px-6 pt-6">
            <div className="flex gap-8 border-b border-[#f5f3f0]/20">
              <button
                onClick={() => setView('scan')}
                className={`pb-4 text-sm tracking-[0.15em] uppercase transition ${
                  view === 'scan'
                    ? 'text-[#f5f3f0] border-b-2 border-[#d4af37] font-semibold'
                    : 'text-[#f5f3f0]/60 hover:text-[#f5f3f0]'
                }`}
              >
                Scan
              </button>
              <button
                onClick={() => setView('journal')}
                className={`pb-4 text-sm tracking-[0.15em] uppercase transition ${
                  view === 'journal'
                    ? 'text-[#f5f3f0] border-b-2 border-[#d4af37] font-semibold'
                    : 'text-[#f5f3f0]/60 hover:text-[#f5f3f0]'
                }`}
              >
                Journal
              </button>
            </div>
          </div>
        )}

        {/* Journal View */}
        {view === 'journal' && isSoulPartner && user && (
          <div className="max-w-4xl mx-auto px-6 py-12">
            {/* Mood Trends */}
            <div className="mb-12">
              <h3 className="text-3xl font-light text-[#f5f3f0] mb-6">Mood Trends</h3>
              <div className="bg-[#f5f3f0]/5 border border-[#f5f3f0]/10 rounded-2xl p-8">
                <div className="flex items-end gap-4 h-40">
                  {(user.journalEntries || []).slice(0, 7).map((entry, i) => {
                    const moodHeight = { great: 4, good: 3, okay: 2, low: 1 }[entry.mood] || 2
                    return (
                      <div key={entry.id} className="flex-1 flex flex-col items-center gap-3">
                        <div
                          className="w-full bg-[#d4af37] rounded-t transition-all hover:opacity-80"
                          style={{ height: `${moodHeight * 30}px` }}
                          title={`${entry.date}: ${entry.mood}`}
                        ></div>
                        <span className="text-xs text-[#f5f3f0]/60 tracking-wider">
                          {new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short' }).charAt(0)}
                        </span>
                      </div>
                    )
                  })}
                  {Array.from({ length: Math.max(0, 7 - (user.journalEntries?.length || 0)) }).map((_, i) => (
                    <div key={`empty-${i}`} className="flex-1 flex flex-col items-center gap-3">
                      <div className="w-full bg-[#f5f3f0]/20 rounded-t" style={{ height: '30px' }}></div>
                      <span className="text-xs text-[#f5f3f0]/60 tracking-wider">-</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Journal Entries */}
            <div>
              <h3 className="text-3xl font-light text-[#f5f3f0] mb-6 flex items-center gap-4">
                <History className="w-8 h-8 text-[#d4af37]" />
                Journal Entries
              </h3>
              <div className="space-y-4">
                {user.journalEntries && user.journalEntries.length > 0 ? (
                  user.journalEntries.map((entry) => (
                    <div key={entry.id} className="bg-[#f5f3f0]/5 border border-[#f5f3f0]/10 rounded-2xl p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-xl font-light text-[#f5f3f0] mb-1 capitalize">{entry.mood}</p>
                          <p className="text-sm text-[#f5f3f0]/60">{entry.date}</p>
                        </div>
                        <span className="text-xs bg-[#d4af37] text-white px-4 py-2 rounded-full font-semibold tracking-widest uppercase">
                          {entry.mood}
                        </span>
                      </div>
                      {entry.notes && (
                        <p className="text-[#f5f3f0]/80 mb-3">{entry.notes}</p>
                      )}
                      {entry.ritualCompleted && (
                        <p className="text-sm text-[#f5f3f0]/60">
                          ✓ {entry.ritualCompleted}
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="bg-[#f5f3f0]/5 border border-[#f5f3f0]/10 rounded-2xl p-8 text-center">
                    <p className="text-[#f5f3f0]/60">No journal entries yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Scan View */}
        {view === 'scan' && (
          <>
            {/* Step 1: Initial State */}
            {step === 1 && (
              <div className="flex flex-col items-center justify-center min-h-[80vh] px-6">
                <div className="max-w-2xl mx-auto text-center">
                  <div className="w-48 h-48 mx-auto mb-8 rounded-full border border-[#f5f3f0]/20 flex items-center justify-center bg-[#f5f3f0]/5">
                    <Camera className="w-20 h-20 text-[#d4af37]" />
                  </div>
                  <h1 className="text-4xl md:text-5xl font-light text-[#f5f3f0] mb-4 tracking-tight">
                    Mood Mirror
                  </h1>
                  <p className="text-xl text-[#f5f3f0]/70 mb-4 leading-relaxed">
                    Discover your emotional state and receive personalized ritual recommendations
                  </p>
                  {isAuthenticated && user && (
                    <p className="text-sm text-[#d4af37] mb-6">
                      Personalized for {user.name} • {tier.charAt(0).toUpperCase() + tier.slice(1)} tier
                    </p>
                  )}
                  <button
                    onClick={() => {
                      if (apiKey) {
                        handleCapture()
                      } else {
                        setShowApiInput(true)
                      }
                    }}
                    className="px-12 py-4 bg-[#d4af37] text-white text-lg rounded-full hover:bg-[#f5f3f0] hover:text-[#2d2926] transition-colors duration-300 cursor-pointer tracking-wide"
                  >
                    {apiKey ? 'Activate Mood Mirror' : 'Add API Key to Start'}
                  </button>
                  {!isAuthenticated && (
                    <p className="text-sm text-[#f5f3f0]/50 mt-6">
                      <Link href="/login" className="text-[#d4af37] hover:underline">Sign in</Link> for personalized recommendations based on your tier and preferences
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Analyzing */}
            {step === 2 && (
              <div className="flex flex-col items-center justify-center min-h-[80vh] px-6">
                <div className="max-w-md mx-auto text-center">
                  <div className="w-48 h-48 mx-auto mb-8 rounded-full border border-[#d4af37] flex items-center justify-center bg-[#f5f3f0]/5 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-40 h-40 border-4 border-[#d4af37]/20 border-t-[#d4af37] rounded-full animate-spin"></div>
                    </div>
                    <div className="absolute inset-0 animate-pulse bg-[#d4af37]/5"></div>
                    <Camera className="w-20 h-20 text-[#d4af37] relative animate-pulse" />
                  </div>
                  <h2 className="text-3xl font-light text-[#f5f3f0] mb-4">Analyzing your mood...</h2>
                  <p className="text-lg text-[#f5f3f0]/70">Reading micro-expressions</p>
                  <div className="flex gap-2 justify-center mt-8">
                    <div className="w-3 h-3 bg-[#d4af37] rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                    <div className="w-3 h-3 bg-[#d4af37] rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                    <div className="w-3 h-3 bg-[#d4af37] rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Results */}
            {step === 3 && currentMood && (
              <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="text-center mb-12">
                  <p className="text-sm text-[#f5f3f0]/60 tracking-[0.2em] uppercase mb-3">
                    We detected
                  </p>
                  <h2 className="text-5xl font-light text-[#f5f3f0] mb-4 capitalize">
                    {currentMood.replace('_', ' ')}
                  </h2>
                  <p className="text-xl text-[#f5f3f0]/70">Your Personal Ritual</p>
                  {isAuthenticated && (
                    <p className="text-sm text-[#d4af37] mt-2">
                      {tier.charAt(0).toUpperCase() + tier.slice(1)} tier recommendations
                    </p>
                  )}
                </div>

                <div className="space-y-8">
                  {/* Video Card */}
                  <div className="bg-[#f5f3f0]/5 border border-[#f5f3f0]/10 rounded-2xl overflow-hidden">
                    <div className="relative h-64 md:h-80">
                      <img
                        src={moodData[currentMood].video.thumbnail}
                        alt={moodData[currentMood].video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center hover:scale-105 transition cursor-pointer">
                          <span className="text-4xl text-[#d4af37] ml-1">▶</span>
                        </div>
                      </div>
                      <div className="absolute bottom-4 right-4 bg-black/80 text-white text-sm px-3 py-1 rounded">
                        {moodData[currentMood].video.duration}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-light text-[#f5f3f0] mb-2">{moodData[currentMood].video.title}</h3>
                      <p className="text-[#f5f3f0]/70">{moodData[currentMood].video.description}</p>
                    </div>
                  </div>

                  {/* Playlist Card */}
                  <div className="bg-[#f5f3f0]/5 border border-[#f5f3f0]/10 rounded-2xl p-6">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-full bg-[#d4af37]/10 flex items-center justify-center shrink-0">
                        <Music className="w-8 h-8 text-[#d4af37]" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-light text-[#f5f3f0] mb-1">{moodData[currentMood].playlist.title}</h3>
                        <p className="text-[#f5f3f0]/70">{moodData[currentMood].playlist.songs} songs curated for you</p>
                      </div>
                    </div>
                  </div>

                  {/* Main Product Card */}
                  <div className="bg-[#f5f3f0]/5 border border-[#f5f3f0]/10 rounded-2xl overflow-hidden">
                    <div className="relative h-80">
                      <img
                        src={isMale ? '/photos/male-recommended.jpeg' : '/photos/female-recommended.jpeg'}
                        alt={moodData[currentMood].products[tier].main.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-2xl font-light text-[#f5f3f0] flex-1 pr-4">{moodData[currentMood].products[tier].main.name}</h3>
                        <span className="text-xl font-semibold text-[#f5f3f0]">{moodData[currentMood].products[tier].main.price}</span>
                      </div>
                      <p className="text-[#f5f3f0]/70 mb-6">{moodData[currentMood].products[tier].main.description}</p>
                      <button className="w-full py-4 bg-[#d4af37] text-white rounded-full hover:bg-[#f5f3f0] hover:text-[#2d2926] transition-colors duration-300 cursor-pointer text-sm tracking-widest uppercase flex items-center justify-center gap-2">
                        <ShoppingBag className="w-5 h-5" />
                        Add to Bag
                      </button>
                    </div>
                  </div>

                  {/* Recommended Products */}
                  <div className="mt-12">
                    <h3 className="text-3xl font-light text-[#f5f3f0] mb-4 text-center">Recommended For You</h3>
                    <p className="text-[#f5f3f0]/70 text-center mb-8">Curated products to match your mood</p>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Meditation Rituals Card */}
                      <div className="bg-[#f5f3f0]/5 border border-[#f5f3f0]/10 rounded-2xl overflow-hidden">
                        <div className="flex gap-4 p-4">
                          <div className="w-28 h-28 shrink-0 rounded-xl overflow-hidden">
                            <img
                              src="/photos/meditation-rituals.jpeg"
                              alt="Meditation Rituals"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 flex flex-col">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="text-lg font-light text-[#f5f3f0] flex-1 pr-2">Meditation Rituals</h4>
                              <span className="text-base font-semibold text-[#f5f3f0]">€24.90</span>
                            </div>
                            <p className="text-sm text-[#f5f3f0]/70 mb-3 flex-1">Complete meditation and mindfulness essentials</p>
                            <button className="self-start px-6 py-2 bg-[#d4af37] text-white rounded-full hover:bg-[#f5f3f0] hover:text-[#2d2926] transition-colors duration-300 cursor-pointer text-xs tracking-widest uppercase flex items-center gap-2">
                              <ShoppingBag className="w-4 h-4" />
                              Add to Bag
                            </button>
                          </div>
                        </div>
                      </div>

                      {moodData[currentMood].products[tier].recommended.map((product, index) => (
                        <div key={index} className="bg-[#f5f3f0]/5 border border-[#f5f3f0]/10 rounded-2xl overflow-hidden">
                          <div className="flex gap-4 p-4">
                            <div className="w-28 h-28 shrink-0 rounded-xl overflow-hidden">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 flex flex-col">
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="text-lg font-light text-[#f5f3f0] flex-1 pr-2">{product.name}</h4>
                                <span className="text-base font-semibold text-[#f5f3f0]">{product.price}</span>
                              </div>
                              <p className="text-sm text-[#f5f3f0]/70 mb-3 flex-1">{product.description}</p>
                              <button className="self-start px-6 py-2 bg-[#d4af37] text-white rounded-full hover:bg-[#f5f3f0] hover:text-[#2d2926] transition-colors duration-300 cursor-pointer text-xs tracking-widest uppercase flex items-center gap-2">
                                <ShoppingBag className="w-4 h-4" />
                                Add to Bag
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Reset Button */}
                <div className="text-center mt-12">
                  <button
                    onClick={handleReset}
                    className="px-12 py-4 bg-[#f5f3f0]/10 text-[#f5f3f0] rounded-full hover:bg-[#d4af37] hover:border-[#d4af37] transition-colors duration-300 cursor-pointer text-sm tracking-widest uppercase border border-[#f5f3f0]/20"
                  >
                    Scan Again
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default function MoodPage() {
  return (
    <WebAuthProvider>
      <MoodMirrorContent />
    </WebAuthProvider>
  )
}
