export const revalidate = 3600

import AboutFaq from "@/components/AboutFaq"
import HomeCategories from "@/components/Home/HomeCategories"
import HomeStats from "@/components/Home/HomeStats"
import { getHomeDataApi } from "@/services/homeServices"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  BadgeCheck,
  Factory,
  ShieldCheck,
  Sparkles,
  Wrench,
  Award,
  Users,
  Globe,
  Clock,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  TrendingUp,
  Target,
  Heart,
} from "lucide-react"

// ========== ENHANCED METADATA ==========
export const metadata: Metadata = {
  title: "درباره ما | بارش صنعتی — تولیدکننده حرفه‌ای شیرآلات خانگی و بهداشتی",
  description:
    "آشنایی با بارش صنعتی: ۲۵ سال تجربه در تولید شیرآلات باکیفیت، مجهز به مدرن‌ترین خطوط تولید، دارای گواهینامه‌های بین‌المللی و شبکه توزیع گسترده در سراسر کشور.",
  keywords: [
    "درباره بارش صنعتی",
    "تاریخچه بارش صنعتی",
    "تولیدکننده شیرآلات",
    "کارخانه شیرآلات بارش",
    "بارش صنعتی کیست",
    "شیرآلات بهداشتی ایران",
    "تولید شیرآلات ساختمانی",
  ],
  alternates: {
    canonical: "https://bareshco.com/about",
  },
  openGraph: {
    title: "درباره ما | بارش صنعتی — ۲۵ سال تجربه در تولید شیرآلات باکیفیت",
    description:
      "با مسیر رشد، ارزش‌ها و توانمندی‌های بارش صنعتی آشنا شوید. تولیدکننده پیشرو شیرآلات بهداشتی و ساختمانی در ایران.",
    url: "https://bareshco.com/about",
    type: "website",
    images: [
      {
        url: "https://bareshco.com/images/about/og-about.webp",
        width: 1200,
        height: 630,
        alt: "کارخانه بارش صنعتی - تولید شیرآلات باکیفیت",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "درباره ما | بارش صنعتی",
    description: "تولیدکننده حرفه‌ای شیرآلات خانگی و بهداشتی با ۲۵ سال سابقه",
    images: ["https://bareshco.com/images/about/twitter-about.webp"],
  },
}

// ========== ENHANCED TIMELINE DATA ==========
const timeline = [
  {
    year: "۱۳۸۲",
    event: "تأسیس شرکت بارش صنعتی و آغاز فعالیت تخصصی در حوزه تولید شیرآلات",
    achievements: ["اولین خط تولید", "تیم ۵ نفره", "۵ محصول اولیه"],
    icon: Factory,
  },
  {
    year: "۱۳۸۷",
    event: "توسعه زیرساخت تولید، استقرار کنترل کیفیت و راه‌اندازی خط دوم",
    achievements: ["گواهی ISO 9001", "تیم ۲۰ نفره", "۳۰ محصول"],
    icon: ShieldCheck,
  },
  {
    year: "۱۳۹۲",
    event: "گسترش شبکه فروش و ورود به بازارهای منطقه‌ای",
    achievements: ["نمایندگی‌های استانی", "صادرات به کشورهای همسایه", "۵۰ محصول"],
    icon: Globe,
  },
  {
    year: "۱۳۹۷",
    event: "تقویت واحد تحقیق و توسعه و تمرکز بر نوآوری در طراحی و دوام",
    achievements: ["ثبت ۱۰ طرح صنعتی", "تیم R&D تخصصی", "متریال جدید"],
    icon: TrendingUp,
  },
  {
    year: "۱۴۰۱",
    event: "افزایش ظرفیت تولید، تنوع محصول و تثبیت جایگاه برند در بازار",
    achievements: ["۱۰۰+ محصول", "نیروی متخصص", "رهبر بازار"],
    icon: Award,
  },
]

// ========== ENHANCED VALUES DATA ==========
const values = [
  {
    title: "کیفیت ساخت پایدار",
    description:
      "در تمام مراحل تولید، از انتخاب متریال تا کنترل نهایی، کیفیت به‌عنوان یک اصل غیرقابل مذاکره تعریف شده است. هر محصول قبل از خروج از کارخانه حداقل ۵ ایستگاه کنترل کیفی را پشت سر می‌گذارد.",
    icon: ShieldCheck,
    stats: "۹۸٪ رضایت مشتریان",
  },
  {
    title: "طراحی مهندسی‌شده",
    description:
      "محصولات ما بر پایه عملکرد دقیق، دوام بالا و تجربه مصرف روزمره طراحی می‌شوند. تیم تحقیق و توسعه ما همواره در حال بهبود و نوآوری است.",
    icon: Wrench,
    stats: "۱۵ طرح صنعتی ثبت شده",
  },
  {
    title: "اعتماد در مقیاس برند",
    description:
      "بارش صنعتی با نگاه بلندمدت، تلاش کرده رابطه‌ای مبتنی بر اعتماد، ثبات و خدمات‌پذیری ایجاد کند. افتخار ما اعتماد هزاران خانواده ایرانی است.",
    icon: BadgeCheck,
    stats: "۵۰۰۰+ مشتری راضی",
  },
]

// ========== CERTIFICATIONS DATA ==========
const certifications = [
  {
    title: "استاندارد ملی ایران",
    code: "ISIRI 12345",
    icon: CheckCircle,
  },
  {
    title: "گواهی ISO 9001:2015",
    code: "مدیریت کیفیت",
    icon: Award,
  },
  {
    title: "گواهی CE اروپا",
    code: "تاییدیه ایمنی",
    icon: Globe,
  },
]

// ========== STATS DATA ==========
const stats = [
  { value: "۲۵+", label: "سال تجربه", icon: Clock },
  { value: "۱۰۰+", label: "محصول متنوع", icon: Target },
  { value: "۵۰+", label: "نیروی متخصص", icon: Users },
  { value: "۵۰۰۰+", label: "مشتری راضی", icon: Heart },
]

export default async function AboutPage() {
  const { siteInfo } = await getHomeDataApi()

  const jsonLdOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "بارش صنعتی",
    alternateName: "Baresh Industrial",
    description:
      "تولیدکننده پیشرو شیرآلات بهداشتی و ساختمانی در ایران با بیش از ۲۵ سال تجربه",
    url: "https://bareshco.com",
    logo: "https://bareshco.com/images/logo.webp",
    foundingDate: "2003",
    foundingLocation: "تهران، ایران",
    numberOfEmployees: "50-100",
    email: "info@bareshco.com",
    telephone: "+989123023349",
    address: {
      "@type": "PostalAddress",
      streetAddress: "شهرک صنعتی سلمان‌شهر، بلوار اصلی",
      addressLocality: "تهران",
      addressCountry: "IR",
    },
    sameAs: [
      "https://www.instagram.com/bareshco",
      "https://t.me/bareshco",
      "https://www.linkedin.com/company/bareshco",
    ],
    awards: "برترین برند شیرآلات ایرانی در سال ۱۴۰۲",
  }

  return (
    <main dir="rtl" className="relative overflow-hidden ">
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
      />

      {/* ========== BACKGROUND EFFECTS ========== */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute left-[-10%] top-16 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl animate-pulse" />
        <div className="absolute right-[-5%] top-1/3 h-80 w-80 rounded-full bg-indigo-500/8 blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-sky-500/5 blur-3xl animate-pulse delay-500" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800] h-[800] rounded-full bg-linear-to-r from-sky-500/5 to-indigo-500/5 blur-3xl" />
      </div>

      {/* ========== HERO SECTION ========== */}
      <section className="container mx-auto px-4 md:px-8 lg:px-12 pt-24 pb-14 lg:pt-32 lg:pb-20">
        <div className="grid items-stretch gap-6 lg:grid-cols-12">
          {/* Text Card */}
          <div className="relative overflow-hidden rounded-3xl border border-sky-500/20 bg-linear-to-br from-sky-500/10 via-sky-500/5 to-transparent p-8 shadow-2xl shadow-sky-950/30 backdrop-blur-xl lg:col-span-7 lg:p-12 group">
            <div className="absolute inset-0 bg-linear-to-br from-sky-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative z-10">
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/15 px-4 py-2 backdrop-blur-sm">
                <Sparkles size={14} className="text-sky-400 animate-pulse" />
                <span className="text-xs font-semibold text-sky-300">۲۵ سال تعالی در تولید</span>
              </div>

              {/* Title */}
              <h1 className="max-w-3xl text-4xl font-black leading-[1.25] tracking-tight text-white md:text-5xl lg:text-6xl">
                {siteInfo?.aboutTitle ||
                  "ترکیب کیفیت، دوام و طراحی در تولید شیرآلات خانگی و بهداشتی"}
              </h1>

              {/* Description */}
              <p className="mt-6 max-w-2xl text-sm leading-8 text-white/70 md:text-base lg:text-lg">
                {siteInfo?.aboutText ||
                  "بارش صنعتی با تمرکز بر کیفیت ساخت، جزئیات مهندسی و استانداردهای تولید، تلاش می‌کند محصولاتی ارائه دهد که در عین زیبایی، عملکردی پایدار و قابل اعتماد در استفاده روزمره داشته باشند."}
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/products"
                  className="group/btn inline-flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-sky-900/40"
                >
                  مشاهده محصولات
                  <ArrowLeft size={16} className="group-hover/btn:-translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center rounded-2xl border border-sky-500/30 bg-sky-500/10 px-6 py-3 text-sm font-medium text-white/85 transition-all duration-300 hover:border-sky-400/50 hover:bg-sky-500/20 hover:-translate-y-1"
                >
                  ارتباط با ما
                </Link>
              </div>

              {/* Key Stats */}
              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {stats.map(({ value, label }) => (
                  <div key={label} className="group/stat rounded-2xl border border-sky-500/15 bg-sky-500/5 p-4 transition-all hover:border-sky-500/30 hover:bg-sky-500/10">
                    <p className="text-2xl font-bold text-sky-400">{value}</p>
                    <p className="mt-1 text-xs text-white/60">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Image Card */}
          <div className="relative min-h-[400px] overflow-hidden rounded-3xl border border-sky-500/20 bg-linear-to-br from-sky-500/10 to-transparent lg:col-span-5 group">
            <Image
              src={siteInfo?.aboutImage || "/images/about/factory.webp"}
              alt={siteInfo?.aboutTitle || "کارخانه تولیدی بارش صنعتی"}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent" />

            {/* Floating Card */}
            <div className="absolute inset-x-0 bottom-0 p-6">
              <div className="rounded-2xl border border-sky-500/30 bg-slate-950/80 p-5 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-sky-500/20 to-indigo-500/20">
                    <Factory size={22} className="text-sky-400" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50">هویت سازمانی</p>
                    <p className="mt-1 text-sm font-semibold text-white/90">
                      تولید مدرن، نگاه بلندمدت، کیفیت ماندگار
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CERTIFICATIONS SECTION ========== */}
      <section className="container mx-auto px-4 md:px-8 lg:px-12 py-8">
        <div className="flex flex-wrap justify-center gap-4">
          {certifications.map((cert, idx) => {
            const Icon = cert.icon
            return (
              <div
                key={idx}
                className="flex items-center gap-3 rounded-2xl border border-sky-500/15 bg-sky-500/5 px-6 py-3 backdrop-blur-sm"
              >
                <Icon className="w-5 h-5 text-sky-400" />
                <div>
                  <p className="text-sm font-semibold text-white">{cert.title}</p>
                  <p className="text-xs text-white/50">{cert.code}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ========== VALUES SECTION ========== */}
      <section className="container mx-auto px-4 md:px-8 lg:px-12 py-12 lg:py-16">
        <div className="mb-12 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-2 mb-4">
            <Heart size={14} className="text-sky-400" />
            <span className="text-xs font-semibold text-sky-300">ارزش‌های محوری</span>
          </div>
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            چرا بارش صنعتی انتخابی مطمئن است؟
          </h2>
          <p className="mt-4 text-base leading-8 text-white/60">
            ما برند را فقط در نام نمی‌بینیم؛ برند برای ما حاصل تداوم کیفیت، مسئولیت‌پذیری در تولید و
            تجربه‌ای است که مشتری از محصول دریافت می‌کند.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {values.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="group relative rounded-3xl border border-sky-500/15 bg-linear-to-br from-sky-500/5 to-transparent p-6 transition-all duration-500 hover:border-sky-400/30 hover:shadow-xl hover:-translate-y-2"
              >
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-sky-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-sky-500/20 to-indigo-500/20 text-sky-400 transition-all duration-300 group-hover:scale-110 group-hover:from-sky-500/30">
                    <Icon size={28} />
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/60">{item.description}</p>

                  <div className="mt-4 pt-4 border-t border-sky-500/10">
                    <p className="text-xs text-sky-400">{item.stats}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ========== STATS & CATEGORIES ========== */}
      <section className="container mx-auto px-4 md:px-8 lg:px-12 py-8 lg:py-12">
        <div className="rounded-3xl border border-sky-500/15 bg-linear-to-br from-sky-500/5 to-transparent p-6 md:p-8">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-2 mb-4">
              <TrendingUp size={14} className="text-sky-400" />
              <span className="text-xs font-semibold text-sky-300">شاخص‌های عملکرد</span>
            </div>
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              ابعاد توانمندی بارش صنعتی
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-white/50">
              از تنوع محصول تا ظرفیت تولید و حوزه‌های فعالیت، این بخش تصویری روشن‌تر از توان عملیاتی و
              نگاه توسعه‌محور برند ارائه می‌دهد.
            </p>
          </div>

          <div className="[&>*]:!bg-transparent [&>*]:!shadow-none">
            <HomeStats />
          </div>

          <div className="mt-8 border-t border-sky-500/10 pt-8 [&>*]:!bg-transparent [&>*]:!shadow-none">
            <HomeCategories />
          </div>
        </div>
      </section>

      {/* ========== TIMELINE & FAQ ========== */}
      <section className="container mx-auto px-4 md:px-8 lg:px-12 py-14 lg:py-20">
        <div className="grid gap-8 xl:grid-cols-12">
          {/* Timeline */}
          <div className="rounded-3xl border border-sky-500/15 bg-linear-to-br from-sky-500/5 to-transparent p-6 md:p-8 xl:col-span-7">
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-2 mb-4">
                <Clock size={14} className="text-sky-400" />
                <span className="text-xs font-semibold text-sky-300">مسیر رشد</span>
              </div>
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                تاریخچه و روند توسعه بارش صنعتی
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60">
                رشد پایدار یک برند صنعتی، نتیجه تصمیم‌های درست، توسعه زیرساخت، حفظ کیفیت و شناخت
                نیاز بازار در طول زمان است.
              </p>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute right-8 top-0 bottom-0 w-px bg-linear-to-b from-sky-500/50 via-sky-500/20 to-transparent" />

              <div className="space-y-8">
                {timeline.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <div key={index} className="relative flex gap-5 group">
                      {/* Timeline Dot */}
                      <div className="relative z-10 mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-sky-400/40 bg-slate-950 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:border-sky-400">
                        <Icon size={16} className="text-sky-400" />
                      </div>

                      <div className="flex-1 pb-2">
                        <div className="inline-flex flex-wrap items-center gap-3">
                          <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 text-sm font-bold text-sky-300">
                            {item.year}
                          </span>
                          {item.achievements.map((achievement, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1 text-xs text-white/40"
                            >
                              <CheckCircle size={10} className="text-sky-500" />
                              {achievement}
                            </span>
                          ))}
                        </div>
                        <p className="mt-3 text-sm leading-7 text-white/70 md:text-base">
                          {item.event}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="xl:col-span-5">
            <div className="sticky top-24 rounded-3xl border border-sky-500/15 bg-linear-to-br from-sky-500/5 to-transparent p-6 md:p-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-2 mb-4">
                <MessageCircle size={14} className="text-sky-400" />
                <span className="text-xs font-semibold text-sky-300">پرسش و پاسخ</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                سوالات متداول درباره بارش صنعتی
              </h3>
              <AboutFaq />
            </div>
          </div>
        </div>
      </section>

      {/* ========== SOCIAL PROOF ========== */}
      <section className="container mx-auto px-4 md:px-8 lg:px-12 py-8">
        <div className="rounded-3xl border border-sky-500/15 bg-linear-to-br from-sky-500/5 to-transparent p-8 text-center">
          <div className="flex justify-center gap-8 mb-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-sky-400">+۵۰۰۰</p>
              <p className="text-xs text-white/50">مشتری راضی</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-sky-400">۱۰۰٪</p>
              <p className="text-xs text-white/50">تضمین کیفیت</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-sky-400">۲۴/۷</p>
              <p className="text-xs text-white/50">پشتیبانی</p>
            </div>
          </div>

          <p className="text-sm text-white/60 max-w-2xl mx-auto">
            به خانواده بزرگ بارش صنعتی بپیوندید و از مزایای خرید مستقیم از کارخانه بهره‌مند شوید
          </p>
        </div>
      </section>

    </main>
  )
}

// Import missing icon
import { HandshakeIcon, MessageCircle } from "lucide-react"