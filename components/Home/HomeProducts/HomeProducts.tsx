import { getHomeDataApi } from "@/services/homeServices"
import HomeProductItem from "./HomeProductItem"
import { Product } from "@prisma/client"

export default async function HomeProducts() {
  const { products } = await getHomeDataApi()

  return (
    <section className="container mx-auto my-24 px-4 md:px-8 lg:px-12">

      <div className="flex flex-col items-center text-center mb-12">
        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-sky-400 bg-sky-500/10 border border-sky-500/20 px-4 py-1.5 rounded-full mb-4">
          محصولات ما
        </span>
        <h2 className="text-white/90 text-2xl md:text-3xl font-semibold leading-snug">
          جدیدترین محصولات بارش
        </h2>
        <div className="mt-4 w-10 h-px bg-sky-500/40" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
        {products.map((product: Product) => (
          <HomeProductItem key={product.title} {...product} />
        ))}
      </div>

    </section>
  )
}