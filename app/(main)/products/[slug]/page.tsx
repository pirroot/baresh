import { getProductBySlug } from "@/services/Product/productServices"
import { ChevronDown } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface IProductDetailProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: IProductDetailProps
): Promise<Metadata> {
  const product = await getProductBySlug(decodeURIComponent((await params).slug))

  return {
    title: product.seoTitle || `${product.title} | صنایع بارش`,
    description: product.seoDescription || product.description,
    keywords: product.keywords,
    openGraph: {
      title: product.seoTitle || product.title,
      description: product.seoDescription || product.description,
      images: [product.image],
    },
  }
}

export default async function ProductDetail({ params }: IProductDetailProps) {
  const product = await getProductBySlug(decodeURIComponent((await params).slug))

  if (!product) notFound()

  return (
    <main dir="rtl" className="text-white mt-20 min-h-screen">
      <section className="container mx-auto pt-24 pb-24 px-4">
        <nav className="flex items-center gap-2 text-xs text-white/40 mb-8 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-white transition-colors">صفحه اصلی</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-white transition-colors">محصولات</Link>
          <span>/</span>
          <span className="text-white/80">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-white/10 to-white/5 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden aspect-square flex items-center justify-center backdrop-blur-sm">
              <Image
                src={product.image}
                alt={`تصویر محصول ${product.title}`}
                width={800}
                height={800}
                priority
                className="object-contain p-10 transform transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div>
              <span className="text-xs font-medium tracking-widest text-white/40 uppercase mb-2 block">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.title}</h1>
              <div className="w-12 h-1 bg-white/20 rounded-full mb-6" />
              <p className="text-white/60 leading-8 text-justify lg:text-lg whitespace-pre-line">
                {product.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.features.map((feature: string, index: number) => (
                <div key={index} className="flex items-center gap-3 bg-white/5 border border-white/5 rounded-xl p-4">
                  <div className="w-2 h-2 rounded-full bg-white/30" />
                  <span className="text-sm text-white/80">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              {product.catalogPdf && (
                <Link href={product.catalogPdf} className="flex-1 text-center bg-white text-black py-4 rounded-xl font-bold hover:bg-white/90 transition-all active:scale-95 shadow-lg shadow-white/5">
                  دریافت کاتالوگ فنی (PDF)
                </Link>
              )}
              <Link href={"tel:+989123023349"} className="flex-1 border text-center border-white/20 py-4 rounded-xl font-bold hover:bg-white/10 transition-all active:scale-95">
                استعلام قیمت و مشاوره
              </Link>
            </div>
          </div>
        </div>

        {product.product_description && (
          <details className="mt-10 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md overflow-hidden group">

            <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
              <h3 className="text-lg font-semibold text-white/90">
                <span className="text-gray-300">توضیحات محصول : </span>{product.title}
              </h3>
              <ChevronDown className="w-5 h-5 text-white/60 transition-transform duration-300 group-open:rotate-180 shrink-0 mr-2" />
            </summary>

            <p className="px-6 pb-6 leading-8 text-justify text-white/80">
              {product.product_description}
            </p>

          </details>
        )}
      </section>
    </main>
  )
}
