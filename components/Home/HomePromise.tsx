import Image from "next/image"
import Link from "next/link"
import { CheckCircle, Shield, Award, Droplet, Sparkles } from "lucide-react"

export default function HomePromise() {
  // JSON-LD برای سئو (اختیاری)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "شیرآلات بارش",
    description: "شیرآلات بارش با ترکیب زیبایی، عملکرد و دوام، برای زندگی مدرن و نیازهای صنعتی طراحی و تولید می‌شوند.",
    brand: {
      "@type": "Brand",
      name: "بارش صنعتی"
    },
    slogan: "کیفیت در هر قطره"
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section
        className="container mx-auto my-16 md:my-24 px-4 md:px-8 lg:px-12"
        aria-labelledby="promise-heading"
      >
        {/* هدر بخش */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-sky-400 bg-sky-500/10 border border-sky-500/20 px-4 py-1.5 rounded-full mb-4">
            <Sparkles className="w-3 h-3" />
            تعهد ما
          </div>
          <h2
            id="promise-heading"
            className="text-white/90 text-2xl md:text-3xl lg:text-4xl font-bold leading-snug"
          >
            تعهد شرکت شیرآلات بارش
          </h2>
          <div className="mt-4 w-12 h-0.5 bg-linear-to-r from-transparent via-sky-500 to-transparent" />
          <p className="mt-4 text-sm text-white/40 max-w-md">
            کیفیت، زیبایی و دوام در هر محصول
          </p>
        </div>

        {/* کارت اصلی */}
        <div className="relative overflow-hidden border border-sky-500/15 rounded-3xl bg-linear-to-br from-sky-500/5 via-sky-500/5 to-transparent backdrop-blur-sm grid grid-cols-1 md:grid-cols-2 group">
          {/* خط نورانی روی کارت */}
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          {/* ====== سمت تصویر ====== */}
          <div className="relative min-h-64 sm:min-h-80 lg:min-h-96 bg-linear-to-br from-sky-500/5 to-transparent flex items-center justify-center overflow-hidden">
            <Image
              src="/images/pormir.webp"
              alt="شیرآلات بارش - محصول با کیفیت و زیبا"
              fill
              className=" scale-105 rounded-3xl"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* ====== سمت متن ====== */}
          <div className="flex flex-col justify-center gap-5 px-6 sm:px-8 lg:px-12 py-8 sm:py-10 lg:py-14 text-right">
            <div className="space-y-3">
              <h3 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug">
                کیفیت در هر قطره
              </h3>
              <div className="flex items-center gap-2">
                <div className="h-px w-8 bg-sky-500/30" />
                <span className="text-xs text-sky-400/60">از ۱۳۸۲</span>
              </div>
            </div>

            <p className="text-white/50 text-sm leading-8 max-w-md">
              شیرآلات بارش با ترکیب زیبایی، عملکرد و دوام، برای زندگی مدرن و
              نیازهای صنعتی طراحی و تولید می‌شوند — چون هر قطره آب ارزش دارد.
            </p>

            {/* مزایا */}
            <div className="flex flex-wrap gap-3 mt-2">
              {[
                { text: "ضمانت ۱۸ ماهه", icon: Shield },
                { text: "کیفیت تضمینی", icon: Award },
                { text: "مقاوم در برابر رسوب", icon: Droplet },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-[10px] text-white/40 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                  <CheckCircle className="w-3 h-3 text-sky-400" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* دکمه */}
            <div className="mt-2">
              <Link
                href="/about-us"
                className="group relative inline-flex items-center justify-center gap-2 w-full sm:w-auto text-center border border-sky-500/30 text-sky-300 text-sm px-7 py-3 rounded-xl transition-all duration-300 hover:bg-sky-500/15 hover:border-sky-400/50 hover:text-white hover:-translate-y-0.5"
              >
                <span>بیشتر بدانید</span>
                <span className="group-hover:translate-x-1 transition-transform">←</span>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}