'use client'

import { useState } from 'react'
import { Music, ShoppingBag, Camera, History } from 'lucide-react'

const MOOD_DATA = {
  stressed: {
    video: {
      title: '2-min Breathwork',
      description: 'Calm your nervous system',
      duration: '2:00',
      thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop'
    },
    playlist: { title: 'Stress Relief', artist: 'Spotify', songs: 12 },
    product: {
      name: 'The Ritual of Jing',
      price: '€29.90',
      description: 'Sacred Lotus & Jujube',
      image: 'https://images.unsplash.com/photo-1602874801006-87294e47572e?w=300&h=300&fit=crop'
    },
    recommendedProducts: [
      {
        name: 'Jing Body Cream',
        price: '€19.90',
        description: 'Deeply nourishing formula with Sacred Lotus',
        image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=300&h=300&fit=crop'
      },
      {
        name: 'Calming Ritual Set',
        price: '€44.90',
        description: 'Complete relaxation experience',
        image: 'https://images.unsplash.com/photo-1600428650421-273c8145484c?w=300&h=300&fit=crop'
      },
      {
        name: 'Sleep Mist',
        price: '€14.90',
        description: 'Lavender & chamomile pillow spray',
        image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=300&h=300&fit=crop'
      }
    ]
  },
  low_energy: {
    video: {
      title: 'Morning Energizer',
      description: 'Invigorate your spirit',
      duration: '5:00',
      thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop'
    },
    playlist: { title: 'Rise & Shine', artist: 'Spotify', songs: 18 },
    product: {
      name: 'The Ritual of Mehr',
      price: '€24.90',
      description: 'Sweet Orange & Cedar Wood',
      image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=300&h=300&fit=crop'
    },
    recommendedProducts: [
      {
        name: 'Energy Boost Shower',
        price: '€17.90',
        description: 'Citrus & ginger energizing gel',
        image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=300&h=300&fit=crop'
      },
      {
        name: 'Morning Ritual Kit',
        price: '€39.90',
        description: 'Awakening body care essentials',
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&h=300&fit=crop'
      },
      {
        name: 'Vitality Scrub',
        price: '€22.90',
        description: 'Exfoliating body polish with sweet orange',
        image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=300&h=300&fit=crop'
      }
    ]
  },
  joyful: {
    video: {
      title: 'Celebration Flow',
      description: 'Embrace the moment',
      duration: '3:30',
      thumbnail: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400&h=300&fit=crop'
    },
    playlist: { title: 'Feel Good Vibes', artist: 'Spotify', songs: 25 },
    product: {
      name: 'Ritual of Happiness',
      price: '€34.90',
      description: 'Neroli & Sandalwood Gift Set',
      image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=300&h=300&fit=crop'
    },
    recommendedProducts: [
      {
        name: 'Happy Buddha Body Mist',
        price: '€16.90',
        description: 'Uplifting neroli & sandalwood spray',
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=300&fit=crop'
      },
      {
        name: 'Joy Collection',
        price: '€49.90',
        description: 'Celebration essentials gift set',
        image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300&h=300&fit=crop'
      },
      {
        name: 'Happiness Hand Balm',
        price: '€9.90',
        description: 'Nourishing hand cream with uplifting scents',
        image: 'https://images.unsplash.com/photo-1585652757173-57de5e9fab42?w=300&h=300&fit=crop'
      }
    ]
  }
}

const TIER_CONTENT = {
  explorer: { levels: ['video'], label: 'Tier 1 - Explorer' },
  lover: { levels: ['video', 'playlist'], label: 'Tier 2 - Lover' },
  soulpartner: { levels: ['video', 'playlist', 'product'], label: 'Tier 3 - Soul Partner' }
}

export default function MoodBoardScreen() {
  const [apiKey, setApiKey] = useState(process.env.EXPO_PUBLIC_GEMINI_API_KEY || '')
  const [showApiInput, setShowApiInput] = useState(false)
  const [tier, setTier] = useState<'explorer' | 'lover' | 'soulpartner'>('explorer')
  const [view, setView] = useState<'scan' | 'journal'>('scan')
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [currentMood, setCurrentMood] = useState<'stressed' | 'low_energy' | 'joyful' | null>(null)
  const [loading, setLoading] = useState(false)
  const [moodHistory, setMoodHistory] = useState<Array<{date: string, mood: string, rituals: number}>>([
    { date: 'Monday', mood: 'Stressed', rituals: 2 },
    { date: 'Tuesday', mood: 'Joyful', rituals: 3 },
    { date: 'Wednesday', mood: 'Low Energy', rituals: 1 },
  ])

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
      <div className="bg-background min-h-full flex flex-col">
        {/* Header Section */}
        <div className="px-6 pt-8 pb-4 bg-secondary border-b border-border">
          <div className="flex justify-between items-center mb-6">
            <h1 className="font-serif text-2xl text-foreground tracking-wide">Mood Mirror</h1>
            <button
              onClick={() => setShowApiInput(!showApiInput)}
              className="text-xs text-muted-foreground tracking-wider hover:text-foreground transition uppercase font-sans cursor-pointer"
            >
              Settings
            </button>
          </div>

          {/* API Key Input */}
          {showApiInput && (
            <div className="mb-4 p-4 bg-background border border-border">
              <label className="text-xs font-sans text-muted-foreground tracking-widest uppercase mb-2 block">
                Gemini API Key
              </label>
              <input
                type="password"
                placeholder="Enter your API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-4 py-3 bg-input border border-border text-foreground text-sm font-sans focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
          )}

          {/* Tier Selector */}
          <div className="mb-4">
            <p className="text-[10px] font-sans text-muted-foreground tracking-[0.2em] uppercase mb-2">
              Select Your Tier
            </p>
            <div className="flex gap-2">
              {Object.entries(TIER_CONTENT).map(([key, { label }]) => (
                <button
                  key={key}
                  onClick={() => setTier(key as any)}
                  className={`flex-1 text-[10px] px-4 py-2 tracking-[0.15em] uppercase font-sans transition ${
                    tier === key
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-background text-foreground border border-border hover:border-accent'
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Selector */}
          <div className="flex gap-6 border-b border-border -mb-4">
            <button
              onClick={() => setView('scan')}
              className={`pb-4 font-sans text-xs tracking-[0.15em] uppercase transition ${
                view === 'scan'
                  ? 'text-foreground border-b-2 border-accent font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Scan
            </button>
            <button
              onClick={() => setView('journal')}
              className={`pb-4 font-sans text-xs tracking-[0.15em] uppercase transition ${
                view === 'journal'
                  ? 'text-foreground border-b-2 border-accent font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Journal
            </button>
          </div>
        </div>

        {/* Scan Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          {step === 1 && (
            <div className="flex flex-col items-center gap-8 max-w-md w-full">
              <div className="w-40 h-40 rounded-full border border-border flex items-center justify-center bg-secondary shadow-sm">
                <Camera className="w-16 h-16 text-accent" />
              </div>
              <div className="text-center">
                <h2 className="font-serif text-2xl text-foreground mb-2">How are you feeling today?</h2>
                <p className="text-sm text-muted-foreground font-sans">Let us help you find the perfect ritual</p>
              </div>
              <button
                onClick={handleCapture}
                className="px-12 py-3 bg-accent text-accent-foreground font-sans font-semibold hover:opacity-90 transition text-xs tracking-widest uppercase"
              >
                {apiKey ? 'Activate Mood Mirror' : 'Add API Key'}
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col items-center gap-6 max-w-md w-full">
              <div className="w-40 h-40 rounded-full border border-accent flex items-center justify-center bg-secondary relative overflow-hidden shadow-lg">
                {/* Rotating spinner */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 border-4 border-accent/20 border-t-accent rounded-full animate-spin"></div>
                </div>
                {/* Pulsing background */}
                <div className="absolute inset-0 animate-pulse bg-accent/5"></div>
                {/* Scanning icon */}
                <div className="relative">
                  <Camera className="w-16 h-16 text-accent animate-pulse" />
                </div>
              </div>
              <div className="text-center">
                <p className="font-serif text-xl text-foreground mb-2">Analyzing your mood...</p>
                <p className="text-sm text-muted-foreground font-sans tracking-wide">Reading micro-expressions</p>
              </div>
              {/* Loading dots */}
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
              </div>
            </div>
          )}

          {step === 3 && currentMood && (
            <div className="w-full px-6 py-8">
              <div className="text-center mb-8">
                <p className="text-[10px] font-sans text-muted-foreground tracking-[0.2em] uppercase mb-2">
                  We detected
                </p>
                <h2 className="font-serif text-3xl text-foreground mb-3 capitalize">
                  {currentMood.replace('_', ' ')}
                </h2>
                <p className="text-sm text-muted-foreground font-sans tracking-wide">Your Personal Ritual</p>
              </div>

              {/* Content Based on Tier */}
              <div className="w-full space-y-6 max-w-2xl mx-auto">
                {/* Video */}
                {TIER_CONTENT[tier].levels.includes('video') && (
                  <div className="bg-card border border-border overflow-hidden shadow-sm">
                    <div className="relative h-48 bg-linear-to-br from-accent/10 to-accent/5">
                      <img
                        src={MOOD_DATA[currentMood].video.thumbnail}
                        alt={MOOD_DATA[currentMood].video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center hover:scale-105 transition cursor-pointer">
                          <span className="text-2xl text-accent ml-1">▶</span>
                        </div>
                      </div>
                      <div className="absolute bottom-3 right-3 bg-black/80 text-white text-[10px] px-2 py-1 font-sans tracking-wider">
                        {MOOD_DATA[currentMood].video.duration}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-serif text-lg text-foreground mb-2">{MOOD_DATA[currentMood].video.title}</h3>
                      <p className="text-sm text-muted-foreground font-sans">{MOOD_DATA[currentMood].video.description}</p>
                    </div>
                  </div>
                )}

                {/* Playlist */}
                {TIER_CONTENT[tier].levels.includes('playlist') && (
                  <div className="bg-card border border-border p-5 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                        <Music className="w-6 h-6 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-serif text-lg text-foreground mb-1">{MOOD_DATA[currentMood].playlist.title}</h3>
                        <p className="text-sm text-muted-foreground font-sans">{MOOD_DATA[currentMood].playlist.songs} songs curated for you</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Product */}
                {TIER_CONTENT[tier].levels.includes('product') && (
                  <div className="bg-card border border-border overflow-hidden shadow-sm">
                    <div className="relative h-64 bg-linear-to-br from-accent/5 to-background">
                      <img
                        src={MOOD_DATA[currentMood].product.image}
                        alt={MOOD_DATA[currentMood].product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-serif text-lg text-foreground flex-1 pr-3">{MOOD_DATA[currentMood].product.name}</h3>
                        <span className="text-base font-semibold text-foreground whitespace-nowrap">{MOOD_DATA[currentMood].product.price}</span>
                      </div>
                      <p className="text-sm text-muted-foreground font-sans mb-5">{MOOD_DATA[currentMood].product.description}</p>
                      <button className="w-full py-3 bg-accent text-accent-foreground font-sans font-semibold hover:opacity-90 transition text-xs tracking-widest uppercase flex items-center justify-center gap-2">
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
                    {MOOD_DATA[currentMood].recommendedProducts.map((product, index) => (
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
                            <button className="self-start px-6 py-2 bg-accent text-accent-foreground font-sans font-semibold hover:opacity-90 transition text-[10px] tracking-widest uppercase flex items-center gap-2">
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
                  className="px-12 py-3 bg-background text-foreground font-sans font-semibold hover:bg-secondary transition text-xs tracking-widest uppercase border border-border"
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
    <div className="bg-background min-h-full flex flex-col">
      {/* Header Section - Same as Scan */}
      <div className="px-6 pt-8 pb-4 bg-secondary border-b border-border">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-serif text-2xl text-foreground tracking-wide">Mood Mirror</h1>
          <button
            onClick={() => setShowApiInput(!showApiInput)}
            className="text-xs text-muted-foreground tracking-wider hover:text-foreground transition uppercase font-sans cursor-pointer"
          >
            Settings
          </button>
        </div>

        {/* API Key Input */}
        {showApiInput && (
          <div className="mb-4 p-4 bg-background border border-border">
            <label className="text-xs font-sans text-muted-foreground tracking-widest uppercase mb-2 block">
              Gemini API Key
            </label>
            <input
              type="password"
              placeholder="Enter your API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-4 py-3 bg-input border border-border text-foreground text-sm font-sans focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
        )}

        {/* Tier Selector */}
        <div className="mb-4">
          <p className="text-[10px] font-sans text-muted-foreground tracking-[0.2em] uppercase mb-2">
            Select Your Tier
          </p>
          <div className="flex gap-2">
            {Object.entries(TIER_CONTENT).map(([key]) => (
              <button
                key={key}
                onClick={() => setTier(key as any)}
                className={`flex-1 text-[10px] px-4 py-2 tracking-[0.15em] uppercase font-sans transition ${
                  tier === key
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-background text-foreground border border-border hover:border-accent'
                }`}
              >
                {key}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex gap-6 border-b border-border -mb-4">
          <button
            onClick={() => setView('scan')}
            className={`pb-4 font-sans text-xs tracking-[0.15em] uppercase transition ${
              view === 'scan'
                ? 'text-foreground border-b-2 border-accent font-semibold'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Scan
          </button>
          <button
            onClick={() => setView('journal')}
            className={`pb-4 font-sans text-xs tracking-[0.15em] uppercase transition ${
              view === 'journal'
                ? 'text-foreground border-b-2 border-accent font-semibold'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Journal
          </button>
        </div>
      </div>

      {/* Journal Content */}
      <div className="px-6 py-8">
        {/* Chart */}
        <div className="mb-10">
          <h3 className="font-serif text-2xl text-foreground mb-6">Mood Trends</h3>
          <div className="bg-card border border-border p-6 shadow-sm">
            <div className="flex items-end gap-3 h-32">
              {[3, 2, 1, 4, 2, 3, 2].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-accent transition-all hover:opacity-80" style={{height: `${height * 25}px`}}></div>
                  <span className="text-xs text-muted-foreground font-sans tracking-wider">
                    {['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* History */}
        <div>
          <h3 className="font-serif text-2xl text-foreground mb-6 flex items-center gap-3">
            <History className="w-6 h-6 text-accent" />
            Rituals Completed
          </h3>
          <div className="space-y-4">
            {moodHistory.map((entry, i) => (
              <div key={i} className="bg-card border border-border p-5 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-serif text-lg text-foreground mb-1">{entry.mood}</p>
                    <p className="text-sm text-muted-foreground font-sans tracking-wide">{entry.date}</p>
                  </div>
                  <span className="text-[10px] bg-accent text-accent-foreground px-3 py-1.5 font-sans font-semibold tracking-widest uppercase">
                    {entry.rituals} rituals
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
