'use client'

export default function MagazineScreen() {
  const topics = [
    {
      title: 'Masterclasses',
      image: '/photos/rituals-10.webp',
    },
    {
      title: 'Meditation & Breathwork',
      image: '/photos/rituals-2.webp',
    },
    {
      title: 'Recipes',
      image: '/photos/rituals-15.webp',
    },
  ]

  const recommendations = [
    {
      title: 'How to use a gua sha',
      category: 'Read',
      tag: 'Body',
      image: '/photos/rituals-11.webp',
    },
    {
      title: '9 chic dining table styles',
      category: 'Read',
      tag: 'Energy',
      image: '/photos/rituals-16.webp',
    },
    {
      title: 'The power of morning rituals',
      category: 'Read',
      tag: 'Mind',
      image: '/photos/rituals-3.webp',
    },
    {
      title: 'Creating your sanctuary',
      category: 'Watch',
      tag: 'Home',
      image: '/photos/rituals-8.webp',
    },
  ]

  return (
    <div className="bg-primary text-primary-foreground min-h-screen p-4">
      {/* Hero Section */}
      <div className="mb-8 pt-4">
        <p className="text-xs tracking-widest text-primary-foreground/60 mb-3 mt-6">
          RITUALS MAGAZINE
        </p>
        <h1 className="text-2xl font-serif font-bold mb-4 text-balance">
          The Art of Soulful Living
        </h1>
        <p className="text-xs text-primary-foreground/80 leading-relaxed">
          Our expert-guided tips and tools will balance body, mind and soul for ultimate wellbeing. Scroll to explore our ever-evolving magazine.
        </p>
      </div>

      {/* Topics Section */}
      <div className="mb-12">
        <h2 className="text-lg font-serif font-bold mb-6">Topics</h2>
        <div className="grid grid-cols-3 gap-2">
          {topics.map((topic) => (
            <div key={topic.title} className="group cursor-pointer">
              <div className="relative h-24 rounded-lg overflow-hidden mb-2">
                <img
                  src={topic.image || "/placeholder.svg"}
                  alt={topic.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
              </div>
              <h3 className="text-xs font-serif font-bold text-center text-primary-foreground">
                {topic.title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended For You Section */}
      <div className="mb-12">
        <h2 className="text-lg font-serif font-bold mb-6">Recommended For You</h2>
        <div className="grid grid-cols-2 gap-4">
          {recommendations.map((item) => (
            <div key={item.title} className="group cursor-pointer">
              <div className="relative h-40 rounded-xl overflow-hidden mb-3">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
              </div>
              <h3 className="text-sm font-serif font-bold mb-2 text-primary-foreground leading-tight">
                {item.title}
              </h3>
              <p className="text-xs text-primary-foreground/60">
                {item.category} • {item.tag}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="mb-8">
        <h2 className="text-lg font-serif font-bold mb-6">Categories</h2>
        <div className="flex flex-wrap gap-2">
          {['Body', 'Mind', 'Soul', 'Home', 'Energy'].map((category) => (
            <button
              key={category}
              className="px-4 py-2 rounded-full border border-primary-foreground/20 text-xs hover:bg-primary-foreground/10 transition"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
