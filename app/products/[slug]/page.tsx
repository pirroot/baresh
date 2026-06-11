import { getProductBySlug } from "@/services/Product/productServices"
import { ChevronDown, FileDown, Phone } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface IProductDetailProps {
  params: Promise<{ slug: string }>
}

async function getProduct(params: IProductDetailProps["params"]) {
  const { slug } = await params
  return getProductBySlug(decodeURIComponent(slug))
}

export async function generateMetadata({ params }: IProductDetailProps): Promise<Metadata> {
  const product = await getProduct(params)
  if (!product) return { title: "محصول پیدا نشد" }
  return {
    title: product.seoTitle || `${product.title} | صنایع بارش`,
    description: product.seoDescription || product.description,
    keywords: product.keywords,
    alternates: { canonical: `/products/${(await params).slug}` },
    openGraph: {
      title: product.seoTitle || product.title,
      description: product.seoDescription || product.description,
      type: "website",
      images: [{ url: product.image, width: 800, height: 800, alt: product.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: product.seoTitle || product.title,
      description: product.seoDescription || product.description,
      images: [product.image],
    },
  }
}

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 bg-sky-500/5 border border-sky-500/15 rounded-xl p-4">
      <div className="w-2 h-2 rounded-full bg-sky-400/50 shrink-0" aria-hidden />
      <span className="text-sm text-white/75">{text}</span>
    </div>
  )
}

function ProductActions({ catalogPdf }: { catalogPdf?: string | null }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mt-4">
      {catalogPdf && (
        <Link
          href={catalogPdf}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-500 text-white py-4 rounded-xl font-bold transition-all duration-300 active:scale-95 shadow-lg shadow-sky-900/40"
        >
          <FileDown className="w-4 h-4" aria-hidden />
          دریافت کاتالوگ فنی (PDF)
        </Link>
      )}
      <Link
        href="tel:+989123023349"
        className="flex-1 inline-flex items-center justify-center gap-2 border border-sky-500/25 text-sky-300/80 hover:text-white hover:border-sky-400/50 hover:bg-sky-500/10 py-4 rounded-xl font-bold transition-all duration-300 active:scale-95"
      >
        <Phone className="w-4 h-4" aria-hidden />
        استعلام قیمت و مشاوره
      </Link>
    </div>
  )
}

export default async function ProductDetail({ params }: IProductDetailProps) {
  const product = await getProduct(params)
  if (!product) notFound()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.seoDescription || product.description,
    image: product.image,
    brand: { "@type": "Organization", name: "صنایع بارش" },
    ...(product.keywords && { keywords: product.keywords }),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main dir="rtl" className="text-white mt-20 min-h-screen">
        <section className="container mx-auto pt-24 pb-24 px-4 md:px-8 lg:px-12">

          {/* Breadcrumb */}
          <nav
            aria-label="breadcrumb"
            className="flex items-center gap-2 text-xs text-white/35 mb-10 overflow-x-auto whitespace-nowrap"
          >
            <Link href="/" className="hover:text-sky-300 transition-colors">صفحه اصلی</Link>
            <span aria-hidden className="text-white/20">/</span>
            <Link href="/products" className="hover:text-sky-300 transition-colors">محصولات</Link>
            <span aria-hidden className="text-white/20">/</span>
            <span className="text-sky-300/80" aria-current="page">{product.title}</span>
          </nav>

          {/* Main grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Image */}
            <div className="relative group">
              <div
                className="absolute -inset-1 bg-sky-500/8 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition duration-700"
                aria-hidden
              />
              <div className="relative bg-sky-500/5 border border-sky-500/15 rounded-3xl overflow-hidden aspect-square flex items-center justify-center backdrop-blur-sm">
                <Image
                  src={product.image}
                  alt={`تصویر محصول ${product.title}`}
                  width={800}
                  height={800}
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-10 transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-8">
              <div>
                <span className="inline-flex items-center text-xs font-semibold tracking-widest uppercase text-sky-400 bg-sky-500/10 border border-sky-500/20 px-4 py-1.5 rounded-full mb-4">
                  {product.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold mb-4 mt-2">{product.title}</h1>
                <div className="w-10 h-px bg-sky-500/40 rounded-full mb-6" aria-hidden />
                <p className="text-white/55 leading-8 text-justify lg:text-lg whitespace-pre-line">
                  {product.description}
                </p>
              </div>

              {product.features?.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {product.features.map((feature: string, index: number) => (
                    <FeatureItem key={index} text={feature} />
                  ))}
                </div>
              )}

              <ProductActions catalogPdf={product.catalogPdf} />
            </div>
          </div>

          {/* Expandable description */}
          {product.product_description && (
            <details className="mt-10 bg-sky-500/5 border border-sky-500/15 rounded-2xl backdrop-blur-md overflow-hidden group">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none select-none hover:bg-sky-500/5 transition-colors duration-200">
                <h2 className="text-lg font-semibold text-white/90">
                  <span className="text-sky-400/70">توضیحات محصول: </span>
                  {product.title}
                </h2>
                <ChevronDown
                  className="w-5 h-5 text-sky-400/60 transition-transform duration-300 group-open:rotate-180 shrink-0 mr-2"
                  aria-hidden
                />
              </summary>
              <div className="px-6 pb-6 border-t border-sky-500/10 pt-5">
                <p className="leading-8 text-justify text-white/65">
                  {product.product_description}
                </p>
              </div>
            </details>
          )}

        </section>
      </main>
    </>
  )
}