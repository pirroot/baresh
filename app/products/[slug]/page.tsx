import ProductComments from "@/components/Product/ProductComments"
import { getProductBySlug } from "@/services/Product/productServices"
import {
  FileDown,
  Phone,
  CheckCircle,
  Ruler,
  Palette,
  Weight,
  Gem,
  Shield,
  Truck,
  Clock,
  Award,
  Star,
  Zap,
  Info,
  ChevronDown
} from "lucide-react"
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
  if (!product) return { title: "محصول پیدا نشد | صنایع بارش" }

  return {
    title: product.seoTitle || `${product.title} | صنایع بارش`,
    description: product.seoDescription || product.description,
    keywords: product.keywords,
    alternates: { canonical: `/products/${(await params).slug}` },
    openGraph: {
      title: product.seoTitle || product.title,
      description: product.seoDescription || product.description,
      type: "website",
      images: [{ url: product.image, width: 1200, height: 1200, alt: product.title }],
    },
  }
}

interface IIconProp {
  icon: React.ElementType;
  label: string;
  value: string | null;
}

function SpecItem({ icon: Icon, label, value }: IIconProp) {
  if (!value) return null
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-sky-500/5 border border-sky-500/10">
      <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <p className="text-[11px] text-white/40">{label}</p>
        <p className="text-sm text-white/80 font-medium">{value}</p>
      </div>
    </div>
  )
}

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
      <CheckCircle className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
      <span className="text-sm text-white/80">{text}</span>
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
    brand: { "@type": "Brand", name: product.brand || "صنایع بارش" },
    ...(product.model && { model: product.model }),
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "IRR",
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main dir="rtl" className="min-h-screen bg-lindear-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="container mx-auto pt-32 pb-20 px-4 md:px-8 lg:px-12">

          {/* مسیر یابی */}
          <nav className="flex items-center gap-2 text-xs text-white/30 mb-10">
            <Link href="/" className="hover:text-sky-400 transition">خانه</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-sky-400 transition">محصولات</Link>
            <span>/</span>
            <span className="text-sky-400">{product.title}</span>
          </nav>

          {/* گرید اصلی */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* تصویر */}
            <div className="relative group">
              <div className="absolute -inset-1 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />
              <div className="relative bg-sky-500/5 border border-sky-500/15 rounded-3xl overflow-hidden">
                <div className="aspect-square flex items-center justify-center p-10">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={600}
                    height={600}
                    priority
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-amber-500/90 text-white text-xs px-3 py-1 rounded-full font-bold">
                    {product.brand || "بارش"}
                  </span>
                </div>
              </div>
            </div>

            {/* اطلاعات محصول */}
            <div className="flex flex-col gap-6">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-4">
                  <span className="text-xs font-bold text-sky-400 bg-sky-500/15 border border-sky-500/25 px-4 py-1.5 rounded-full">
                    {product.category}
                  </span>
                  {product.model && (
                    <span className="text-xs text-white/40 bg-white/5 px-3 py-1.5 rounded-full">
                      مدل: {product.model}
                    </span>
                  )}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.title}</h1>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-sky-400 text-sky-400" />
                    ))}
                    <span className="text-xs text-white/40 mr-2">(۱۲۷ نظر)</span>
                  </div>
                  <div className="h-4 w-px bg-white/10" />
                  <div className="flex items-center gap-2 text-xs text-white/40">
                    <Zap className="w-3 h-3 text-sky-400" />
                    <span>موجود در انبار</span>
                  </div>
                </div>

                <p className="text-white/60 leading-8 text-justify">
                  {product.description}
                </p>
              </div>

              {/* مشخصات فنی */}
              {(product.model || product.color || product.material || product.size || product.weight) && (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <h2 className="text-sm font-bold text-white/70 mb-3 flex items-center gap-2">
                    <Info className="w-4 h-4 text-sky-400" />
                    مشخصات فنی
                  </h2>
                  <div className="grid grid-cols-2 gap-2">
                    <SpecItem icon={Gem} label="مدل" value={product.model} />
                    <SpecItem icon={Palette} label="رنگ" value={product.color} />
                    <SpecItem icon={Shield} label="متریال" value={product.material} />
                    <SpecItem icon={Ruler} label="سایز" value={product.size} />
                    <SpecItem icon={Weight} label="وزن" value={product.weight} />
                  </div>
                </div>
              )}

              {/* ویژگی‌ها */}
              {product.features?.length > 0 && (
                <div>
                  <h2 className="text-sm font-bold text-white/70 mb-3">ویژگی‌های کلیدی</h2>
                  <div className="grid grid-cols-1 gap-2">
                    {product.features.map((feature: string, index: number) => (
                      <FeatureItem key={index} text={feature} />
                    ))}
                  </div>
                </div>
              )}

              {/* دکمه‌های اقدام */}
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                {product.catalogPdf && (
                  <Link
                    href={product.catalogPdf}
                    target="_blank"
                    className="flex-1 flex items-center justify-center gap-2 bg-lineaer-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 text-white py-4 rounded-xl font-bold transition shadow-lg shadow-sky-900/40"
                  >
                    <FileDown className="w-4 h-4" />
                    دریافت کاتالوگ (PDF)
                  </Link>
                )}
                <Link
                  href="tel:+989123023349"
                  className="flex-1 flex items-center justify-center gap-2 border-2 border-sky-500/30 text-sky-300 hover:text-white hover:border-sky-400/60 hover:bg-sky-500/10 py-4 rounded-xl font-bold transition"
                >
                  <Phone className="w-4 h-4" />
                  استعلام قیمت
                </Link>
              </div>

              {/* مزایا */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
                {[
                  { icon: Truck, text: "ارسال سریع", desc: "۲۴ ساعته" },
                  { icon: Shield, text: "ضمانت اصالت", desc: "کالا" },
                  { icon: Clock, text: "گارانتی", desc: "۱۸ ماهه" },
                  { icon: Award, text: "کیفیت عالی", desc: "استاندارد" },
                ].map((item, idx) => (
                  <div key={idx} className="text-center p-2 rounded-lg bg-white/5 border border-white/10">
                    <item.icon className="w-5 h-5 text-sky-400 mx-auto mb-1" />
                    <p className="text-xs font-semibold text-white/80">{item.text}</p>
                    <p className="text-[10px] text-white/40">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* توضیحات کامل (در صورت وجود) */}
          {/* Expandable description */}
          {product.product_description && (
            <details className="mt-10 bg-sky-500/5 border border-sky-500/15 rounded-2xl backdrop-blur-md overflow-hidden group">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none select-none hover:bg-sky-500/5 transition-colors duration-200">
                <h2 className="text-lg font-semibold text-white/90">
                  <span className="text-sky-400/70">توضیحات محصول : </span>
                  {product.title}
                </h2>
                <ChevronDown
                  className="w-5 h-5 text-sky-400/60 transition-transform duration-300 group-open:rotate-180 shrink-0 mr-2"
                  aria-hidden
                />
              </summary>
              <div className="px-6 pb-6 border-t border-sky-500/10 pt-5">
                <div
                  className="leading-8 text-justify text-white/65 prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: product.product_description }}
                />
              </div>
            </details>
          )}

          {product.faq && product.faq.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-bold mb-6">سوالات متداول</h2>
              <div className="space-y-4">
                {product.faq.map((item: { question: string; answer: string }, idx: number) => (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="font-bold text-white/90 mb-2">❓ {item.question}</p>
                    <p className="text-white/60 text-sm">✅ {item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="mt-16">
            <ProductComments productId={product.id} />
          </div>
        </div>
      </main>
    </>
  )
}