export default function Featured() {
  const featured = [
    {
      title: 'Velvet Oudh: rich and seductive',
      cta: 'DISCOVER NOW',
      image: '/photos/rituals-16.webp',
    },
    {
      title: 'Private Collection: New fragrances',
      cta: 'SHOP NOW',
      image: '/photos/rituals-8.webp',
    },
  ]

  return (
    <section className="w-full bg-white py-8 px-4">
      <div className="w-full space-y-6">
        {/* Featured Collections */}
        {featured.map((item, index) => (
          <div
            key={index}
            className="h-64 overflow-hidden relative bg-cover bg-center"
            style={{
              backgroundImage: `url(${item.image})`,
            }}
          >
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex flex-col justify-center p-6">
              <h3 className="text-white text-xl font-serif mb-4 leading-tight">
                {item.title}
              </h3>
              <button className="border border-white text-white px-6 py-3 text-xs tracking-widest hover:bg-white hover:text-black transition w-fit font-sans">
                {item.cta}
              </button>
            </div>
          </div>
        ))}

        {/* Our Fan Favorites */}
        <div className="pt-4">
          <div className="mb-6">
            <p className="text-[10px] tracking-[0.2em] text-muted-foreground mb-3 font-sans">
              DISCOVER
            </p>
            <h2 className="text-2xl font-serif text-foreground mb-4">
              Our Fan Favorites
            </h2>
            <p className="text-sm text-muted-foreground font-sans leading-relaxed">
              From body creams and serums to luxurious home fragrances, these trending products deserve a place in your home.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fan-favorite-1-VSwCe4NLHs4ExfMbzNZ1ihKVBWPw7e.webp',
              'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fan-favorite-2-zpzlniqdkY3GdM74SEa421fZHZf3Uy.webp',
              'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fan-favorite-3-uUkrXDMajrHxgMu95yuZ2xZNJmJ9BA.webp',
              'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fan-favorite-4-nC1Kl4NoKmh1ORXI08IQVQtUOPlciW.webp',
            ].map((image, index) => (
              <div
                key={index}
                className="aspect-square bg-secondary overflow-hidden cursor-pointer"
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Product ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
