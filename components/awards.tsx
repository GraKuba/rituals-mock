export default function Awards() {
  const awards = [
    {
      name: 'The Sunday Times Style\nBeauty Awards 2024',
      image: '/photos/rituals-7.webp',
    },
    {
      name: 'Global Green Beauty Awards\n2024',
      image: '/photos/rituals-6.webp',
    },
    {
      name: 'Vogue Beauty Awards 2024',
      image: '/photos/rituals-5.webp',
    },
    {
      name: 'Care and Impact Initiative:\nDanish Beauty Awards 2025',
      image: '/photos/rituals-4.webp',
    },
  ]

  return (
    <section className="w-full bg-primary text-primary-foreground py-8 px-4">
      <div className="w-full">
        <div className="text-center mb-8">
          <p className="text-[10px] tracking-[0.2em] text-primary-foreground/60 mb-3 font-sans">
            SIMPLY THE BEST
          </p>
          <h2 className="text-2xl font-serif text-primary-foreground">
            Award-Winning Products
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {awards.map((award, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-primary-foreground/10 flex items-center justify-center mb-3 overflow-hidden">
                <img
                  src={award.image || "/placeholder.svg"}
                  alt={award.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs font-serif text-primary-foreground whitespace-pre-line">
                {award.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
