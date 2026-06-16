export const dynamic = 'force-dynamic'
export const revalidate = 3600;
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { getProductsApi } from "@/services/Product/productServices"
import { IProduct } from "@/types/ProductDto"

export const metadata: Metadata = {
  title: "محصولات",
  description: "مشاهده کامل محصولات بارش صنعتی شامل شیرآلات صنعتی، خانگی، اتصالات و پمپ‌ها. کیفیت بین‌المللی، گارانتی ۲ ساله.",
  openGraph: {
    title: "محصولات",
    description: "شیرآلات صنعتی و خانگی با کیفیت بین‌المللی.",
    type: "website",
  },
}

export default async function Products() {
  const products = await getProductsApi()

  return (
    <main dir="rtl" className="text-white mt-20">
      <section className="container mx-auto pt-24 pb-24 px-4 md:px-8 lg:px-12">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-sky-400 bg-sky-500/10 border border-sky-500/20 px-4 py-1.5 rounded-full mb-4">
            محصولات ما
          </span>
          <h1 className="text-2xl md:text-3xl font-semibold mb-3">
            شیرآلات بهداشتی بارش
          </h1>
          <p className="text-sm text-white/50 max-w-sm mx-auto leading-7">
            مجموعه کاملی از شیرآلات صنعتی و خانگی با استانداردهای بین‌المللی
          </p>
          <div className="mt-5 w-10 h-px bg-sky-500/40" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-12">
          {products?.map((product: IProduct) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="relative overflow-hidden flex flex-col border border-sky-500/15 rounded-2xl bg-sky-500/5 backdrop-blur-sm transition-all duration-300 hover:bg-sky-500/10 hover:border-sky-400/30 hover:-translate-y-1 group"
            >
              {/* image */}
              <div className="relative w-full aspect-square overflow-hidden rounded-t-2xl bg-sky-500/5">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0a0f1a]/40 to-transparent" />
                <span className="absolute bottom-3 right-3 text-sky-300 text-xs bg-sky-500/15 backdrop-blur-sm px-3 py-1 rounded-full border border-sky-500/20">
                  {product.category}
                </span>
              </div>

              {/* info */}
              <div className="flex flex-col items-center gap-2.5 px-5 py-5 text-center">
                <div className="w-8 h-px bg-sky-500/30 transition-all duration-300 group-hover:w-14 group-hover:bg-sky-400" />
                <h2 className="text-white/85 text-sm font-semibold leading-snug">
                  {product.title}
                </h2>
              </div>
            </Link>
          ))}
        </div>

      </section>
    </main>
  )
}