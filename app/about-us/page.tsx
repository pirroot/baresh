export const dynamic = 'force-dynamic'
import AboutFaq from "@/components/AboutFaq"
import HomeCategories from "@/components/Home/HomeCategories"
import HomeStats from "@/components/Home/HomeStats"
import { getHomeDataApi } from "@/services/homeServices"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "درباره ما | بارش صنعتی — تولیدکننده شیرآلات صنعتی",
  description:
    "بارش صنعتی با بیش از ۲۰ سال سابقه در تولید شیرآلات صنعتی، پیشرو در کیفیت و نوآوری است. با تیم ما، ارزش‌ها و مسیر رشدمان آشنا شوید.",
  openGraph: {
    title: "درباره ما | بارش صنعتی",
    description:
      "بیش از ۲۰ سال تجربه در تولید شیرآلات صنعتی با استانداردهای بین‌المللی.",
    type: "website",
  },
}

const timeline = [
  { year: "۱۳۸۲", event: "تأسیس شرکت بارش صنعتی در تهران" },
  { year: "۱۳۸۷", event: "دریافت گواهینامه ISO 9001 و راه‌اندازی خط تولید دوم" },
  { year: "۱۳۹۲", event: "آغاز صادرات به کشورهای همسایه و حوزه خلیج فارس" },
  { year: "۱۳۹۷", event: "افتتاح مرکز تحقیق و توسعه و ثبت ۱۵ اختراع صنعتی" },
  { year: "۱۴۰۱", event: "رسیدن به ۵۰۰۰ محصول تحویل‌داده‌شده و حضور در ۱۲ کشور" },
]

export default async function AboutPage() {
  const { siteInfo } = await getHomeDataApi()
  return (
    <main className="text-white" dir="rtl">

      <section className="container mx-auto pt-24 pb-16 mt-30">
        <div className="
          relative overflow-hidden
          rounded-2xl border border-white/20
          bg-white/10 backdrop-blur-sm
          grid grid-cols-1 md:grid-cols-2
        ">
          <div className="flex flex-col justify-center gap-6 px-12 py-16">
            <p className="text-white/40 text-xs tracking-widest uppercase">
              درباره بارش صنعتی
            </p>
            <h1 className="text-4xl font-bold leading-tight">
              {siteInfo?.aboutTitle}
            </h1>
            <p className="text-white/55 text-sm leading-7 max-w-md">
              {siteInfo?.aboutText}
            </p>
            <div className="flex gap-4">
              <Link
                href="/products"
                className="
                  bg-white text-black text-sm font-semibold
                  px-6 py-3 rounded-xl
                  transition-all duration-200 hover:bg-white/80
                "
              >
                محصولات ما
              </Link>
              <Link
                href="/contact-us"
                className="
                  border border-white/30 text-white text-sm
                  px-6 py-3 rounded-xl
                  transition-all duration-200 hover:bg-white/10 hover:border-white/60
                "
              >
                تماس با ما
              </Link>
            </div>
          </div>

          <div className="relative min-h-80 bg-white/5 hidden md:block">
            <Image
              src={siteInfo?.aboutImage || "/images/about/factory.webp"}
              alt={siteInfo?.aboutTitle || "بارش صنعتی"}
              fill
              className="object-cover opacity-60"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-r from-black/30 to-transparent" />
          </div>
        </div>
      </section>


      <section className="container mx-auto py-16" aria-labelledby="values-heading">
        <div className="text-center mb-10">
          <p className="text-white/40 text-xs tracking-widest uppercase mb-3">ارزش‌های ما</p>
          <h2 id="values-heading" className="text-2xl font-semibold">
            چرا بارش صنعتی؟
          </h2>
          <div className="mt-4 w-10 h-px bg-white/30 mx-auto" />
        </div>
        <HomeStats />
        <HomeCategories />
      </section>

      <section className="flex flex-col lg:flex-row justify-between gap-10 container mx-auto py-16 px-4">
        <div className="relative border border-white/20 rounded-2xl bg-white/10 backdrop-blur-sm px-6 md:px-10 py-10 w-full lg:w-auto">
          <div className="text-center mb-10">
            <p className="text-white/40 text-xs tracking-widest uppercase mb-3">مسیر ما</p>
            <h2 id="timeline-heading" className="text-2xl font-semibold">
              تاریخچه بارش صنعتی
            </h2>
            <div className="mt-4 w-10 h-px bg-white/30 mx-auto" />
          </div>
          <div className="flex flex-col gap-0">
            {timeline.map(({ year, event }, index) => (
              <div key={year} className="flex gap-8 group">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full border-2 border-white/50 bg-white/20
              group-hover:border-white group-hover:bg-white/50 transition-all duration-300 mt-1 shrink-0" />
                  {index < timeline.length - 1 && (
                    <div className="w-px flex-1 bg-white/15 my-1" />
                  )}
                </div>
                <div className="pb-8">
                  <span className="text-white/40 text-xs font-mono">{year}</span>
                  <p className="text-white/80 text-sm mt-1 leading-6">{event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <AboutFaq />
      </section>
    </main >
  )
}