export default function Wishlist() {
  return (
    <section className="w-full bg-white py-8 px-4">
      <div className="w-full">
        {/* Content */}
        <div className="mb-6">
          <p className="text-[10px] tracking-[0.2em] text-muted-foreground mb-3 font-sans">
            WISHLIST, SORTED
          </p>
          <h2 className="text-2xl font-serif mb-4 text-foreground">
            Gifts with meaning
          </h2>
        </div>

        {/* Images Grid - 2 columns for mobile */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="aspect-square bg-secondary overflow-hidden">
            <img
              src="/photos/rituals-8.webp"
              alt="Gift set"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-square bg-secondary overflow-hidden flex items-center justify-center">
            <img
              src="/photos/rituals-9.webp"
              alt="Advent calendar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <p className="text-sm text-muted-foreground font-sans mb-6 leading-relaxed">
          Order before 7 PM on weekdays for next day delivery
        </p>

        <button className="w-full border border-foreground text-foreground py-3 text-xs tracking-widest hover:bg-foreground hover:text-white transition font-sans">
          SHOP GIFTS
        </button>
      </div>
    </section>
  )
}
