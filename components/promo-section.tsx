export default function PromoSection() {
  return (
    <section className="w-full bg-primary text-primary-foreground py-8 px-4">
      <div className="w-full space-y-6">
        {/* Member Gift Promo */}
        <div
          className="h-[400px] overflow-hidden relative bg-cover bg-center"
          style={{
            backgroundImage:
              'url(/photos/rituals-15.webp)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            <p className="text-white text-[10px] tracking-[0.2em] mb-2 font-sans">
              EXCLUSIVELY FOR MEMBERS
            </p>
            <h3 className="text-white text-2xl font-serif mb-4 leading-tight">
              Your gift this month
            </h3>
            <p className="text-white text-xs mb-6 leading-relaxed opacity-90">
              There's a lot to be grateful for and these Gratitude Mini Fragrance Sticks are one of them. Yours when you spend €50.*
            </p>
            <button className="border-2 border-white text-white px-8 py-3 text-xs tracking-widest hover:bg-white hover:text-black transition w-fit font-sans">
              GET YOURS NOW
            </button>
          </div>
        </div>

        {/* Highlights Section Header */}
        <div className="text-center pt-4">
          <p className="text-[10px] tracking-[0.2em] text-primary-foreground/60 font-sans">
            OUR HIGHLIGHTS
          </p>
        </div>
      </div>
    </section>
  )
}
