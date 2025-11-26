'use client'

import { useState, useEffect } from 'react'
import { Music, ShoppingBag, Camera, History } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

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

// Male-specific products (Ritual of Samurai, Ritual of Homme collections)
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

const TIER_CONTENT = {
  explorer: { levels: ['video', 'playlist', 'product'], label: 'Tier 1 - Explorer' },
  lover: { levels: ['video', 'playlist', 'product'], label: 'Tier 2 - Lover' },
  soulpartner: { levels: ['video', 'playlist', 'product'], label: 'Tier 3 - Soul Partner' }
}

export default function MoodBoardScreen() {
  const { user, isAuthenticated } = useAuth()
  const [apiKey, setApiKey] = useState('')
  const [showApiInput, setShowApiInput] = useState(false)
  const [view, setView] = useState<'scan' | 'journal'>('scan')
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [currentMood, setCurrentMood] = useState<'stressed' | 'low_energy' | 'joyful' | null>(null)
  const [loading, setLoading] = useState(false)

  // Get tier from authenticated user, default to explorer
  const tier: 'explorer' | 'lover' | 'soulpartner' = isAuthenticated && user?.membershipTier
    ? user.membershipTier
    : 'explorer'

  // Check if user is soul partner for journal access
  const isSoulPartner = tier === 'soulpartner'

  // Select mood data based on user gender (male gets Samurai/Homme collections)
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

  // Reset to scan view if user is not soulpartner
  useEffect(() => {
    if (!isSoulPartner && view === 'journal') {
      setView('scan')
    }
  }, [isSoulPartner, view])

  const analyzeMood = async (imageSrc: string) => {
    if (!apiKey) {
      alert('Please enter your Gemini API key in Settings')
      setShowApiInput(true)
      return
    }

    setLoading(true)
    console.log('🔍 Starting mood analysis...')
    console.log('🔑 Using API key:', apiKey.substring(0, 10) + '...')

    try {
      const base64Image = imageSrc.split(',')[1]
      if (!base64Image) {
        throw new Error('Failed to process image data')
      }

      console.log('📤 Sending request to Gemini API...')
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

      console.log('📥 Response status:', response.status, response.statusText)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('❌ API Error Response:', errorText)
        let errorMessage = `API request failed: ${response.status} ${response.statusText}`

        try {
          const errorJson = JSON.parse(errorText)
          console.error('❌ Parsed Error:', JSON.stringify(errorJson, null, 2))
          errorMessage = errorJson.error?.message || errorMessage
        } catch (e) {
          // Error response wasn't JSON
        }

        throw new Error(errorMessage)
      }

      const data = await response.json()
      console.log('✅ Full API Response:', JSON.stringify(data, null, 2))

      const text = data.candidates?.[0]?.content?.parts?.[0]?.text

      if (!text) {
        console.error('❌ No text found in response:', data)
        throw new Error('No text content in API response')
      }

      console.log('📝 Extracted text:', text)

      const cleanJson = text.replace(/```json|```/g, '').trim()
      console.log('🧹 Cleaned JSON:', cleanJson)

      const parsed = JSON.parse(cleanJson)
      console.log('✨ Parsed mood:', parsed.mood)

      if (!['stressed', 'low_energy', 'joyful'].includes(parsed.mood)) {
        console.error('❌ Invalid mood detected:', parsed.mood)
        throw new Error(`Invalid mood value: ${parsed.mood}`)
      }

      setCurrentMood(parsed.mood)
      setStep(3)
      console.log('🎉 Mood analysis complete!')

    } catch (error) {
      console.error('❌ Gemini Analysis Failed:', error)

      if (error instanceof Error) {
        console.error('Error message:', error.message)
        console.error('Error stack:', error.stack)
      }

      // Fallback to random mood
      const moods: Array<'stressed' | 'low_energy' | 'joyful'> = ['stressed', 'low_energy', 'joyful']
      const fallbackMood = moods[Math.floor(Math.random() * moods.length)]
      console.log('🎲 Using fallback mood:', fallbackMood)

      setCurrentMood(fallbackMood)
      setStep(3)

      alert(`Mood analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}. Using random mood.`)
    } finally {
      setLoading(false)
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

  // Render Scan View
  if (view === 'scan') {
    return (
      <div className="bg-primary text-primary-foreground min-h-full flex flex-col">
        {/* Header Section */}
        <div className="px-6 pt-8 pb-4 bg-primary border-b border-primary-foreground/20">
          <div className="flex justify-between items-center mb-6">
            <h1 className="font-serif text-2xl text-primary-foreground tracking-wide">Mood Mirror</h1>
            <button
              onClick={() => setShowApiInput(!showApiInput)}
              className="text-xs text-primary-foreground/60 tracking-wider hover:text-primary-foreground transition uppercase font-sans cursor-pointer"
            >
              Settings
            </button>
          </div>

          {/* API Key Input */}
          {showApiInput && (
            <div className="mb-4 p-4 bg-primary-foreground/10 border border-primary-foreground/20">
              <label className="text-xs font-sans text-primary-foreground/60 tracking-widest uppercase mb-2 block">
                Gemini API Key
              </label>
              <input
                type="password"
                placeholder="Enter your API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder-primary-foreground/40 text-sm font-sans focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
          )}

          {/* Tab Selector */}
          <div className="flex gap-6 border-b border-primary-foreground/20 -mb-4">
            <button
              onClick={() => setView('scan')}
              className="pb-4 font-sans text-xs tracking-[0.15em] uppercase transition text-primary-foreground border-b-2 border-[#d4af37] font-semibold"
            >
              Scan
            </button>
            {isSoulPartner && (
              <button
                onClick={() => setView('journal')}
                className="pb-4 font-sans text-xs tracking-[0.15em] uppercase transition text-primary-foreground/60 hover:text-primary-foreground"
              >
                Journal
              </button>
            )}
          </div>
        </div>

        {/* Scan Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          {step === 1 && (
            <div className="flex flex-col items-center gap-8 max-w-md w-full">
              <div className="w-40 h-40 rounded-full border border-primary-foreground/20 flex items-center justify-center bg-primary-foreground/10 shadow-sm">
                <Camera className="w-16 h-16 text-[#d4af37]" />
              </div>
              <div className="text-center">
                <h2 className="font-serif text-2xl text-primary-foreground mb-2">How are you feeling today?</h2>
                <p className="text-sm text-primary-foreground/80 font-sans">Let us help you find the perfect ritual</p>
              </div>
              <button
                onClick={() => {
                  if (apiKey) {
                    handleCapture()
                  } else {
                    setShowApiInput(true)
                  }
                }}
                className="px-12 py-3 bg-[#d4af37] text-white font-sans font-semibold hover:opacity-90 transition text-xs tracking-widest uppercase"
              >
                {apiKey ? 'Activate Mood Mirror' : 'Add API Key'}
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col items-center gap-6 max-w-md w-full">
              <div className="w-40 h-40 rounded-full border border-[#d4af37] flex items-center justify-center bg-primary-foreground/10 relative overflow-hidden shadow-lg">
                {/* Rotating spinner */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 border-4 border-[#d4af37]/20 border-t-[#d4af37] rounded-full animate-spin"></div>
                </div>
                {/* Pulsing background */}
                <div className="absolute inset-0 animate-pulse bg-[#d4af37]/5"></div>
                {/* Scanning icon */}
                <div className="relative">
                  <Camera className="w-16 h-16 text-[#d4af37] animate-pulse" />
                </div>
              </div>
              <div className="text-center">
                <p className="font-serif text-xl text-primary-foreground mb-2">Analyzing your mood...</p>
                <p className="text-sm text-primary-foreground/80 font-sans tracking-wide">Reading micro-expressions</p>
              </div>
              {/* Loading dots */}
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
              </div>
            </div>
          )}

          {step === 3 && currentMood && (
            <div className="w-full px-6 py-8">
              <div className="text-center mb-8">
                <p className="text-[10px] font-sans text-primary-foreground/60 tracking-[0.2em] uppercase mb-2">
                  We detected
                </p>
                <h2 className="font-serif text-3xl text-primary-foreground mb-3 capitalize">
                  {currentMood.replace('_', ' ')}
                </h2>
                <p className="text-sm text-primary-foreground/80 font-sans tracking-wide">Your Personal Ritual</p>
              </div>

              {/* Content Based on Tier */}
              <div className="w-full space-y-6 max-w-2xl mx-auto">
                {/* Video */}
                {TIER_CONTENT[tier].levels.includes('video') && (
                  <div className="bg-card border border-border overflow-hidden shadow-sm">
                    <div className="relative h-48 bg-linear-to-br from-accent/10 to-accent/5">
                      <img
                        src={moodData[currentMood].video.thumbnail}
                        alt={moodData[currentMood].video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center hover:scale-105 transition cursor-pointer">
                          <span className="text-2xl text-[#d4af37] ml-1">▶</span>
                        </div>
                      </div>
                      <div className="absolute bottom-3 right-3 bg-black/80 text-white text-[10px] px-2 py-1 font-sans tracking-wider">
                        {moodData[currentMood].video.duration}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-serif text-lg text-foreground mb-2">{moodData[currentMood].video.title}</h3>
                      <p className="text-sm text-muted-foreground font-sans">{moodData[currentMood].video.description}</p>
                    </div>
                  </div>
                )}

                {/* Playlist */}
                {TIER_CONTENT[tier].levels.includes('playlist') && (
                  <div className="bg-card border border-border p-5 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center shrink-0">
                        <Music className="w-6 h-6 text-[#d4af37]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-serif text-lg text-foreground mb-1">{moodData[currentMood].playlist.title}</h3>
                        <p className="text-sm text-muted-foreground font-sans">{moodData[currentMood].playlist.songs} songs curated for you</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Product */}
                {TIER_CONTENT[tier].levels.includes('product') && (
                  <div className="bg-card border border-border overflow-hidden shadow-sm">
                    <div className="relative h-64 bg-linear-to-br from-accent/5 to-background">
                      <img
                        src={isMale ? '/photos/male-recommended.jpeg' : '/photos/female-recommended.jpeg'}
                        alt={moodData[currentMood].products[tier].main.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-serif text-lg text-foreground flex-1 pr-3">{moodData[currentMood].products[tier].main.name}</h3>
                        <span className="text-base font-semibold text-foreground whitespace-nowrap">{moodData[currentMood].products[tier].main.price}</span>
                      </div>
                      <p className="text-sm text-muted-foreground font-sans mb-5">{moodData[currentMood].products[tier].main.description}</p>
                      <button className="w-full py-3 bg-[#d4af37] text-white font-sans font-semibold hover:opacity-90 transition text-xs tracking-widest uppercase flex items-center justify-center gap-2">
                        <ShoppingBag className="w-4 h-4" />
                        Add to Bag
                      </button>
                    </div>
                  </div>
                )}

                {/* Recommended Products - Shows for all users */}
                <div className="mt-8">
                  <h3 className="font-serif text-2xl text-foreground mb-4 text-center">Recommended For You</h3>
                  <p className="text-sm text-muted-foreground font-sans text-center mb-6">Curated products to match your mood</p>

                  <div className="grid grid-cols-1 gap-4">
                    {/* Meditation Rituals Card */}
                    <div className="bg-card border border-border overflow-hidden shadow-sm">
                      <div className="flex gap-4 p-4">
                        <div className="w-24 h-24 shrink-0 bg-linear-to-br from-accent/5 to-background rounded overflow-hidden">
                          <img
                            src="/photos/meditation-rituals.jpeg"
                            alt="Meditation Rituals"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 flex flex-col">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-serif text-base text-foreground flex-1 pr-2">Meditation Rituals</h4>
                            <span className="text-sm font-semibold text-foreground whitespace-nowrap">€24.90</span>
                          </div>
                          <p className="text-xs text-muted-foreground font-sans mb-3 flex-1">Complete meditation and mindfulness essentials</p>
                          <button className="self-start px-4 py-1.5 bg-[#d4af37] text-white font-sans font-semibold hover:opacity-90 transition text-xs tracking-widest uppercase flex items-center gap-1.5">
                            <ShoppingBag className="w-3.5 h-3.5" />
                            Add to Bag
                          </button>
                        </div>
                      </div>
                    </div>

                    {moodData[currentMood].products[tier].recommended.map((product, index) => (
                      <div key={index} className="bg-card border border-border overflow-hidden shadow-sm">
                        <div className="flex gap-4 p-4">
                          <div className="w-24 h-24 shrink-0 bg-linear-to-br from-accent/5 to-background rounded overflow-hidden">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 flex flex-col">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-serif text-base text-foreground flex-1 pr-2">{product.name}</h4>
                              <span className="text-sm font-semibold text-foreground whitespace-nowrap">{product.price}</span>
                            </div>
                            <p className="text-xs text-muted-foreground font-sans mb-3 flex-1">{product.description}</p>
                            <button className="self-start px-6 py-2 bg-[#d4af37] text-white font-sans font-semibold hover:opacity-90 transition text-[10px] tracking-widest uppercase flex items-center gap-2">
                              <ShoppingBag className="w-3 h-3" />
                              Add to Bag
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-center mt-8">
                <button
                  onClick={handleReset}
                  className="px-12 py-3 bg-primary-foreground/10 text-primary-foreground font-sans font-semibold hover:bg-primary-foreground/20 transition text-xs tracking-widest uppercase border border-primary-foreground/20"
                >
                  Scan Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Journal View
  return (
    <div className="bg-primary text-primary-foreground min-h-full flex flex-col">
      {/* Header Section - Same as Scan */}
      <div className="px-6 pt-8 pb-4 bg-primary border-b border-primary-foreground/20">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-serif text-2xl text-primary-foreground tracking-wide">Mood Mirror</h1>
          <button
            onClick={() => setShowApiInput(!showApiInput)}
            className="text-xs text-primary-foreground/60 tracking-wider hover:text-primary-foreground transition uppercase font-sans cursor-pointer"
          >
            Settings
          </button>
        </div>

        {/* API Key Input */}
        {showApiInput && (
          <div className="mb-4 p-4 bg-primary-foreground/10 border border-primary-foreground/20">
            <label className="text-xs font-sans text-primary-foreground/60 tracking-widest uppercase mb-2 block">
              Gemini API Key
            </label>
            <input
              type="password"
              placeholder="Enter your API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder-primary-foreground/40 text-sm font-sans focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
        )}

        {/* Tab Selector */}
        <div className="flex gap-6 border-b border-primary-foreground/20 -mb-4">
          <button
            onClick={() => setView('scan')}
            className="pb-4 font-sans text-xs tracking-[0.15em] uppercase transition text-primary-foreground/60 hover:text-primary-foreground"
          >
            Scan
          </button>
          {isSoulPartner && (
            <button
              onClick={() => setView('journal')}
              className="pb-4 font-sans text-xs tracking-[0.15em] uppercase transition text-primary-foreground border-b-2 border-[#d4af37] font-semibold"
            >
              Journal
            </button>
          )}
        </div>
      </div>

      {/* Journal Content */}
      <div className="px-6 py-8">
        {/* Mood Trends Chart based on user journal entries */}
        <div className="mb-10">
          <h3 className="font-serif text-2xl text-primary-foreground mb-6">Mood Trends</h3>
          <div className="bg-primary-foreground/10 border border-primary-foreground/20 p-6 shadow-sm">
            <div className="flex items-end gap-3 h-32">
              {(user?.journalEntries || []).slice(0, 7).map((entry, i) => {
                const moodHeight = { great: 4, good: 3, okay: 2, low: 1 }[entry.mood] || 2
                return (
                  <div key={entry.id} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full bg-[#d4af37] transition-all hover:opacity-80"
                      style={{ height: `${moodHeight * 25}px` }}
                      title={`${entry.date}: ${entry.mood}`}
                    ></div>
                    <span className="text-xs text-primary-foreground/60 font-sans tracking-wider">
                      {new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short' }).charAt(0)}
                    </span>
                  </div>
                )
              })}
              {/* Fill remaining slots if less than 7 entries */}
              {Array.from({ length: Math.max(0, 7 - (user?.journalEntries?.length || 0)) }).map((_, i) => (
                <div key={`empty-${i}`} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-primary-foreground/20 transition-all" style={{ height: '25px' }}></div>
                  <span className="text-xs text-primary-foreground/60 font-sans tracking-wider">-</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Journal Entries from user data */}
        <div>
          <h3 className="font-serif text-2xl text-primary-foreground mb-6 flex items-center gap-3">
            <History className="w-6 h-6 text-[#d4af37]" />
            Journal Entries
          </h3>
          <div className="space-y-4">
            {user?.journalEntries && user.journalEntries.length > 0 ? (
              user.journalEntries.map((entry) => (
                <div key={entry.id} className="bg-primary-foreground/10 border border-primary-foreground/20 p-5 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-serif text-lg text-primary-foreground mb-1 capitalize">{entry.mood}</p>
                      <p className="text-sm text-primary-foreground/60 font-sans tracking-wide">{entry.date}</p>
                    </div>
                    <span className="text-[10px] bg-[#d4af37] text-white px-3 py-1.5 font-sans font-semibold tracking-widest uppercase">
                      {entry.mood}
                    </span>
                  </div>
                  {entry.notes && (
                    <p className="text-sm text-primary-foreground/80 font-sans mb-2">{entry.notes}</p>
                  )}
                  {entry.ritualCompleted && (
                    <p className="text-xs text-primary-foreground/60 font-sans">
                      ✓ {entry.ritualCompleted}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <div className="bg-primary-foreground/10 border border-primary-foreground/20 p-5 shadow-sm text-center">
                <p className="text-sm text-primary-foreground/60 font-sans">No journal entries yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
