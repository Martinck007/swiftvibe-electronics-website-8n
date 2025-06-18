import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { FeaturedProducts } from "@/components/featured-products"
import { SwapSection } from "@/components/swap-section"
import { RecycleSection } from "@/components/recycle-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <FeaturedProducts />
      <SwapSection />
      <RecycleSection />
      <Footer />
    </main>
  )
}
