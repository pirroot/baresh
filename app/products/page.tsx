export const dynamic = 'force-dynamic'
export const revalidate = 3600;
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { getProductsApi } from "@/services/Product/productServices"
import { IProduct } from "@/types/ProductDto"
import HomeProductItem from "@/components/Home/HomeProducts/HomeProductItem";

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
            <HomeProductItem key={product.id} {...product} />
          ))}
        </div>

      </section>
    </main>
  )
}