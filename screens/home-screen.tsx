import Hero from '@/components/hero'
import Wishlist from '@/components/wishlist'
import ProductCarousel from '@/components/product-carousel'
import PromoSection from '@/components/promo-section'
import Awards from '@/components/awards'
import Featured from '@/components/featured'
import Newsletter from '@/components/newsletter'

export default function HomeScreen() {
  return (
    <main className="w-full">
      <Hero />
      <Wishlist />
      <ProductCarousel />
      <PromoSection />
      <Awards />
      <Featured />
      <Newsletter />
    </main>
  )
}
