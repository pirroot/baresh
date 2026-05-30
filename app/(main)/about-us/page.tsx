import AboutFaq from "@/components/AboutFaq"
import HomeCategories from "@/components/Home/HomeCategories"
import HomeStats from "@/components/Home/HomeStats"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  HiSparkles,
  HiShieldCheck,
  HiBeaker,
  HiGlobeAlt,
} from "react-icons/hi2"

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

const values = [
  {
    icon: HiSparkles,
    title: "کیفیت بی‌타협",
    description:
      "هر محصول بارش از سخت‌گیرانه‌ترین استانداردهای کیفی عبور می‌کند تا طول عمر و عملکرد بهینه تضمین شود.",
  },
  {
    icon: HiBeaker,
    title: "نوآوری مستمر",
    description:
      "تیم تحقیق و توسعه ما پیوسته در حال بهبود فرمول‌ها، متریال‌ها و فرایندهای تولید است.",
  },
  {
    icon: HiShieldCheck,
    title: "پایداری و دوام",
    description:
      "محصولات ما برای سخت‌ترین شرایط صنعتی طراحی شده‌اند و دوام طولانی‌مدت را تضمین می‌کنند.",
  },
  {
    icon: HiGlobeAlt,
    title: "حضور جهانی",
    description:
      "با صادرات به ۱۲ کشور، بارش صنعتی نامی آشنا در بازارهای بین‌المللی شیرآلات است.",
  },
]

const timeline = [
  { year: "۱۳۸۲", event: "تأسیس شرکت بارش صنعتی در تهران" },
  { year: "۱۳۸۷", event: "دریافت گواهینامه ISO 9001 و راه‌اندازی خط تولید دوم" },
  { year: "۱۳۹۲", event: "آغاز صادرات به کشورهای همسایه و حوزه خلیج فارس" },
  { year: "۱۳۹۷", event: "افتتاح مرکز تحقیق و توسعه و ثبت ۱۵ اختراع صنعتی" },
  { year: "۱۴۰۱", event: "رسیدن به ۵۰۰۰ محصول تحویل‌داده‌شده و حضور در ۱۲ کشور" },
]

export default function AboutPage() {
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
              بیست سال تعهد به <br />
              <span className="text-white/60">کیفیت در هر قطره</span>
            </h1>
            <p className="text-white/55 text-sm leading-7 max-w-md">
              بارش صنعتی از سال ۱۳۸۲ با هدف تولید شیرآلات صنعتی با استانداردهای
              بین‌المللی فعالیت می‌کند. امروز با بیش از ۳۰۰ مشتری معتمد در ۱۲
              کشور، پیشرو در صنعت شیرآلات ایران هستیم.
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
                href="/contact"
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
              src="/images/about/factory.webp"
              alt="کارخانه تولید شیرآلات بارش صنعتی"
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

      <div className="flex justify-between gap-10 container mx-auto py-16">

        <div className="relative border border-white/20 rounded-2xl bg-white/10 backdrop-blur-sm px-10 py-10">
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
                {/* خط عمودی */}
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full border-2 border-white/50 bg-white/20
                    group-hover:border-white group-hover:bg-white/50 transition-all duration-300 mt-1 shrink-0" />
                  {index < timeline.length - 1 && (
                    <div className="w-px flex-1 bg-white/15 my-1" />
                  )}
                </div>
                {/* محتوا */}
                <div className="pb-8">
                  <span className="text-white/40 text-xs font-mono">{year}</span>
                  <p className="text-white/80 text-sm mt-1 leading-6">{event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <AboutFaq />
      </div>
    </main >
  )
}