import { getProductBySlug } from "@/services/Product/productServices"
import { ChevronDown, FileDown, Phone } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface IProductDetailProps {
  params: Promise<{ slug: string }>
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function getProduct(params: IProductDetailProps["params"]) {
  const { slug } = await params
  return getProductBySlug(decodeURIComponent(slug))
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata(
  { params }: IProductDetailProps
): Promise<Metadata> {
  const product = await getProduct(params)

  if (!product) return { title: "محصول پیدا نشد" }

  return {
    title: product.seoTitle || `${product.title} | صنایع بارش`,
    description: product.seoDescription || product.description,
    keywords: product.keywords,
    alternates: {
      canonical: `/products/${(await params).slug}`,
    },
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

// ─── Sub-components ───────────────────────────────────────────────────────────

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 bg-white/5 border border-white/5 rounded-xl p-4">
      <div className="w-2 h-2 rounded-full bg-white/30 shrink-0" aria-hidden />
      <span className="text-sm text-white/80">{text}</span>
    </div>
  )
}

function ProductActions({
  catalogPdf,
}: {
  catalogPdf?: string | null
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-4">
      {catalogPdf && (
        <Link
          href={catalogPdf}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-white text-black py-4 rounded-xl font-bold hover:bg-white/90 transition-all active:scale-95 shadow-lg shadow-white/5"
        >
          <FileDown className="w-4 h-4" aria-hidden />
          دریافت کاتالوگ فنی (PDF)
        </Link>
      )}
      <Link
        href="tel:+989123023349"
        className="flex-1 inline-flex items-center justify-center gap-2 border border-white/20 py-4 rounded-xl font-bold hover:bg-white/10 transition-all active:scale-95"
      >
        <Phone className="w-4 h-4" aria-hidden />
        استعلام قیمت و مشاوره
      </Link>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ProductDetail({ params }: IProductDetailProps) {
  const product = await getProduct(params)

  if (!product) notFound()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.seoDescription || product.description,
    image: product.image,
    brand: {
      "@type": "Organization",
      name: "صنایع بارش",
    },
    ...(product.keywords && { keywords: product.keywords }),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main dir="rtl" className="text-white mt-20 min-h-screen">
        <section className="container mx-auto pt-24 pb-24 px-4">

          {/* Breadcrumb */}
          <nav
            aria-label="breadcrumb"
            className="flex items-center gap-2 text-xs text-white/40 mb-8 overflow-x-auto whitespace-nowrap"
          >
            <Link href="/" className="hover:text-white transition-colors">صفحه اصلی</Link>
            <span aria-hidden>/</span>
            <Link href="/products" className="hover:text-white transition-colors">محصولات</Link>
            <span aria-hidden>/</span>
            <span className="text-white/80" aria-current="page">{product.title}</span>
          </nav>

          {/* Main grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Image */}
            <div className="relative group">
              <div
                className="absolute -inset-1 bg-linear-to-r from-white/10 to-white/5 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"
                aria-hidden
              />
              <div className="relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden aspect-square flex items-center justify-center backdrop-blur-sm">
                <Image
                  src={product.image}
                  alt={`تصویر محصول ${product.title}`}
                  width={800}
                  height={800}
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-10 transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-8">
              <div>
                <span className="text-xs font-medium tracking-widest text-white/40 uppercase mb-2 block">
                  {product.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.title}</h1>
                <div className="w-12 h-1 bg-white/20 rounded-full mb-6" aria-hidden />
                <p className="text-white/60 leading-8 text-justify lg:text-lg whitespace-pre-line">
                  {product.description}
                </p>
              </div>

              {product.features?.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <details className="mt-10 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md overflow-hidden group">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none select-none">
                <h2 className="text-lg font-semibold text-white/90">
                  <span className="text-gray-300">توضیحات محصول: </span>
                  {product.title}
                </h2>
                <ChevronDown
                  className="w-5 h-5 text-white/60 transition-transform duration-300 group-open:rotate-180 shrink-0 mr-2"
                  aria-hidden
                />
              </summary>
              <p className="px-6 pb-6 leading-8 text-justify text-white/80">
                {product.product_description}
              </p>
            </details>
          )}

        </section>
      </main>
    </>
  )
}