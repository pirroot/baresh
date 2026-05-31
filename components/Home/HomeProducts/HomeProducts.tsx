import { getHomeDataApi } from "@/services/homeServices"
import HomeProductItem from "./HomeProductItem"

interface IHomeProductDto {
  image: string
  title: string
  slug: string
}


export default async function HomeProducts() {
  const { products } = await getHomeDataApi()
  return (
    <section className="container mx-auto my-30">
      <div className="flex flex-col items-center text-center mb-10">
        <p className="text-white/40 text-xs tracking-widest uppercase mb-3">
          محصولات ما
        </p>
        <h2 className="text-white/90 text-2xl font-semibold leading-snug">
          جدیدترین محصولات بارش
        </h2>
        <div className="mt-4 w-10 h-px bg-white/30" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <HomeProductItem key={product.title} {...product} />
        ))}
      </div>
    </section>
  )
}