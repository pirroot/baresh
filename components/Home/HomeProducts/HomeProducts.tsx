import { getHomeDataApi } from "@/services/homeServices"
import HomeProductItem from "./HomeProductItem"
import { Product } from "@prisma/client"
import Link from "next/link"
import { ArrowLeft, Sparkles } from "lucide-react"

export default async function HomeProducts() {
  const { products } = await getHomeDataApi()

  // اگر محصولی نبود
  if (!products || products.length === 0) {
    return null
  }

  // فقط ۸ محصول اول رو نشون بده (اختیاری)
  const displayProducts = products.slice(0, 8)

  return (
    <section
      className="container mx-auto my-16 md:my-24 px-4 md:px-8 lg:px-12"
      aria-labelledby="products-heading"
    >
      {/* ===== هدر ===== */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-sky-400 bg-sky-500/10 border border-sky-500/20 px-4 py-1.5 rounded-full mb-4">
          <Sparkles className="w-3 h-3" />
          محصولات ما
        </div>
        <h2
          id="products-heading"
          className="text-white/90 text-2xl md:text-3xl lg:text-4xl font-bold leading-snug"
        >
          جدیدترین محصولات بارش
        </h2>
        <div className="mt-4 w-12 h-0.5 bg-linear-to-r from-transparent via-sky-500 to-transparent" />
        <p className="mt-4 text-sm text-white/40 max-w-md">
          محصولات با کیفیت و طراحی مدرن برای زندگی بهتر
        </p>
      </div>

      {/* ===== گرید محصولات ===== */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
        {displayProducts.map((product: Product) => (
          <HomeProductItem key={product.id} {...product} />
        ))}
      </div>

      {/* ===== دکمه مشاهده همه ===== */}
      {products.length > 8 && (
        <div className="flex justify-center mt-12">
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 border border-sky-500/30 text-sky-300 hover:text-white hover:bg-sky-500/10 hover:border-sky-400/50 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:-translate-y-0.5"
          >
            <span>مشاهده همه محصولات</span>
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>
      )}
    </section>
  )
}