export const revalidate = 3600;
// force-dynamic و revalidate با هم تضاد دارن — force-dynamic حذف شد

import AboutFaq from "@/components/AboutFaq"
import HomeCategories from "@/components/Home/HomeCategories"
import HomeStats from "@/components/Home/HomeStats"
import { getHomeDataApi } from "@/services/homeServices"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, BadgeCheck, Factory, ShieldCheck, Sparkles, Wrench } from "lucide-react"

export const metadata: Metadata = {
  title: "درباره ما | بارش صنعتی — تولیدکننده شیرآلات خانگی و بهداشتی",
  description:
    "بارش صنعتی با تکیه بر کیفیت ساخت، طراحی مهندسی و تجربه تولید، در حوزه شیرآلات خانگی و بهداشتی حضوری حرفه‌ای و قابل اعتماد دارد.",
  alternates: { canonical: "https://bareshco.com/about" },
  openGraph: {
    title: "درباره ما | بارش صنعتی",
    description:
      "آشنایی با مسیر رشد، ارزش‌ها و توانمندی‌های بارش صنعتی در تولید شیرآلات خانگی و بهداشتی.",
    url: "https://bareshco.com/about",
    type: "website",
  },
}

const timeline = [
  { year: "۱۳۸۲", event: "تأسیس شرکت بارش صنعتی و آغاز فعالیت تخصصی در حوزه تولید شیرآلات" },
  { year: "۱۳۸۷", event: "توسعه زیرساخت تولید، استقرار کنترل کیفیت و راه‌اندازی خط دوم" },
  { year: "۱۳۹۲", event: "گسترش شبکه فروش و ورود به بازارهای منطقه‌ای" },
  { year: "۱۳۹۷", event: "تقویت واحد تحقیق و توسعه و تمرکز بر نوآوری در طراحی و دوام" },
  { year: "۱۴۰۱", event: "افزایش ظرفیت تولید، تنوع محصول و تثبیت جایگاه برند در بازار" },
]

const values = [
  {
    title: "کیفیت ساخت پایدار",
    description:
      "در تمام مراحل تولید، از انتخاب متریال تا کنترل نهایی، کیفیت به‌عنوان یک اصل غیرقابل مذاکره تعریف شده است.",
    icon: ShieldCheck,
  },
  {
    title: "طراحی مهندسی‌شده",
    description:
      "محصولات ما بر پایه عملکرد دقیق، دوام بالا و تجربه مصرف روزمره طراحی می‌شوند؛ نه صرفاً ظاهر.",
    icon: Wrench,
  },
  {
    title: "اعتماد در مقیاس برند",
    description:
      "بارش صنعتی با نگاه بلندمدت، تلاش کرده رابطه‌ای مبتنی بر اعتماد، ثبات و خدمات‌پذیری ایجاد کند.",
    icon: BadgeCheck,
  },
]

export default async function AboutPage() {
  const { siteInfo } = await getHomeDataApi()

  return (
    <main dir="rtl" className="relative overflow-hidden text-white bg-[#0a0f1a]">

      {/* ambient glows */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute left-[-10%] top-16 h-72 w-72 rounded-full bg-sky-500/8 blur-3xl" />
        <div className="absolute right-[-5%] top-1/3 h-80 w-80 rounded-full bg-sky-400/6 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-sky-500/5 blur-3xl" />
      </div>

      {/* ── Hero ── */}
      <section className="container mx-auto px-4 md:px-8 lg:px-12 pt-24 pb-14 lg:pt-32 lg:pb-20">
        <div className="grid items-stretch gap-6 lg:grid-cols-12">

          {/* text card */}
          <div className="relative overflow-hidden rounded-3xl border border-sky-500/15 bg-sky-500/5 p-8 shadow-2xl shadow-sky-950/30 backdrop-blur-xl lg:col-span-7 lg:p-12">
            <div className="absolute inset-0 bg-linear-to-br from-sky-500/5 via-transparent to-transparent pointer-events-none" aria-hidden="true" />
            <div className="relative z-10">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-4 py-2 text-xs text-sky-300/80">
                <Sparkles size={14} className="text-sky-400" aria-hidden="true" />
                درباره برند بارش صنعتی
              </div>

              <h1 className="max-w-3xl text-4xl font-black leading-[1.25] tracking-tight text-white md:text-5xl">
                {siteInfo?.aboutTitle || "ترکیب کیفیت، دوام و طراحی در تولید شیرآلات خانگی و بهداشتی"}
              </h1>

              <p className="mt-6 max-w-2xl text-sm leading-8 text-white/60 md:text-base">
                {siteInfo?.aboutText ||
                  "بارش صنعتی با تمرکز بر کیفیت ساخت، جزئیات مهندسی و استانداردهای تولید، تلاش می‌کند محصولاتی ارائه دهد که در عین زیبایی، عملکردی پایدار و قابل اعتماد در استفاده روزمره داشته باشند."}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-600 hover:bg-sky-500 px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-px shadow-lg shadow-sky-900/40"
                >
                  مشاهده محصولات
                  <ArrowLeft size={16} aria-hidden="true" />
                </Link>
                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center rounded-2xl border border-sky-500/25 bg-sky-500/8 px-6 py-3 text-sm font-medium text-white/85 transition-all duration-300 hover:border-sky-400/40 hover:bg-sky-500/15"
                >
                  ارتباط با ما
                </Link>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {[
                  { label: "تمرکز برند", value: "کیفیت و دوام محصول" },
                  { label: "رویکرد تولید", value: "مهندسی، دقیق و استاندارد" },
                  { label: "جایگاه برند", value: "قابل اعتماد و حرفه‌ای" },
                ].map(({ label, value }) => (
                  <div key={label} className="rounded-2xl border border-sky-500/15 bg-sky-500/5 p-4">
                    <p className="text-xs text-white/40">{label}</p>
                    <p className="mt-2 text-sm font-semibold text-white/85">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* image card */}
          <div className="relative min-h-[360px] overflow-hidden rounded-3xl border border-sky-500/15 bg-sky-500/5 lg:col-span-5">
            <Image
              src={siteInfo?.aboutImage || "/images/about/factory.webp"}
              alt={siteInfo?.aboutTitle || "کارخانه تولیدی بارش صنعتی"}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#0a0f1a]/75 via-[#0a0f1a]/10 to-transparent" aria-hidden="true" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <div className="rounded-2xl border border-sky-500/20 bg-[#0a0f1a]/60 p-5 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/15 text-sky-300" aria-hidden="true">
                    <Factory size={22} />
                  </div>
                  <div>
                    <p className="text-xs text-white/45">هویت سازمانی</p>
                    <p className="mt-1 text-sm font-semibold text-white/85">
                      تولید مدرن، نگاه بلندمدت، کیفیت ماندگار
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Values ── */}
      <section className="container mx-auto px-4 md:px-8 lg:px-12 py-12 lg:py-16" aria-labelledby="values-heading">
        <div className="mb-10 max-w-2xl">
          <span className="inline-flex items-center text-xs font-semibold tracking-widest uppercase text-sky-400 bg-sky-500/10 border border-sky-500/20 px-4 py-1.5 rounded-full mb-4">
            ارزش‌های برند
          </span>
          <h2 id="values-heading" className="text-2xl font-bold text-white md:text-3xl mt-2">
            چرا بارش صنعتی انتخابی مطمئن است؟
          </h2>
          <p className="mt-4 text-sm leading-7 text-white/55">
            ما برند را فقط در نام نمی‌بینیم؛ برند برای ما حاصل تداوم کیفیت، مسئولیت‌پذیری در تولید و
            تجربه‌ای است که مشتری از محصول دریافت می‌کند.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {values.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="group rounded-3xl border border-sky-500/15 bg-sky-500/5 p-6 transition-all duration-300 hover:border-sky-400/25 hover:bg-sky-500/8"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-300 transition-all duration-300 group-hover:bg-sky-500/20" aria-hidden="true">
                  <Icon size={24} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/55">{item.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── Stats & Categories ── */}
      <section className="container mx-auto px-4 md:px-8 lg:px-12 py-8 lg:py-12" aria-labelledby="stats-heading">
        <div className="rounded-3xl border border-sky-500/15 bg-sky-500/5 p-5 md:p-8">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="inline-flex items-center text-xs font-semibold tracking-widest uppercase text-sky-400 bg-sky-500/10 border border-sky-500/20 px-4 py-1.5 rounded-full mb-4">
                شاخص‌های برند
              </span>
              <h2 id="stats-heading" className="text-2xl font-bold text-white md:text-3xl mt-2">
                ابعاد توانمندی بارش صنعتی
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-white/50">
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

      {/* ── Timeline & FAQ ── */}
      <section className="container mx-auto px-4 md:px-8 lg:px-12 py-14 lg:py-20" aria-labelledby="timeline-heading">
        <div className="grid gap-6 xl:grid-cols-12">

          {/* timeline */}
          <div className="rounded-3xl border border-sky-500/15 bg-sky-500/5 p-6 md:p-8 xl:col-span-7">
            <div className="mb-10">
              <span className="inline-flex items-center text-xs font-semibold tracking-widest uppercase text-sky-400 bg-sky-500/10 border border-sky-500/20 px-4 py-1.5 rounded-full mb-4">
                مسیر رشد
              </span>
              <h2 id="timeline-heading" className="text-2xl font-bold text-white md:text-3xl mt-2">
                تاریخچه و روند توسعه بارش صنعتی
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/55">
                رشد پایدار یک برند صنعتی، نتیجه تصمیم‌های درست، توسعه زیرساخت، حفظ کیفیت و شناخت
                نیاز بازار در طول زمان است.
              </p>
            </div>

            <ol className="relative" aria-label="تاریخچه بارش صنعتی">
              <div className="absolute right-[11px] top-0 h-full w-px bg-sky-500/15" aria-hidden="true" />
              <div className="space-y-8">
                {timeline.map(({ year, event }, index) => (
                  <li key={year + index} className="relative flex gap-5">
                    <div className="relative z-10 mt-1 h-6 w-6 shrink-0 rounded-full border border-sky-400/40 bg-[#0a0f1a] shadow-[0_0_0_6px_rgba(10,15,26,0.9)]" aria-hidden="true">
                      <div className="absolute inset-1 rounded-full bg-sky-400/80" />
                    </div>
                    <div className="pb-2">
                      <time className="inline-block rounded-full border border-sky-500/20 bg-sky-500/8 px-3 py-1 text-xs text-sky-300/70">
                        {year}
                      </time>
                      <p className="mt-3 text-sm leading-7 text-white/70 md:text-base">
                        {event}
                      </p>
                    </div>
                  </li>
                ))}
              </div>
            </ol>
          </div>

          {/* FAQ */}
          <div className="xl:col-span-5">
            <div className="rounded-3xl border border-sky-500/15 bg-sky-500/5 p-2">
              <AboutFaq />
            </div>
          </div>

        </div>
      </section>

      {/* ── CTA ── */}
      <section className="container mx-auto px-4 md:px-8 lg:px-12 pb-20" aria-labelledby="cta-heading">
        <div className="relative overflow-hidden rounded-3xl border border-sky-500/20 bg-sky-500/8 p-8 md:p-10">
          <div className="pointer-events-none absolute left-0 top-0 h-48 w-48 rounded-full bg-sky-400/10 blur-3xl" aria-hidden="true" />
          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="inline-flex items-center text-xs font-semibold tracking-widest uppercase text-sky-400 bg-sky-500/10 border border-sky-500/20 px-4 py-1.5 rounded-full mb-4">
                همکاری با بارش صنعتی
              </span>
              <h2 id="cta-heading" className="mt-2 text-2xl font-bold text-white md:text-3xl">
                برای آشنایی بیشتر با محصولات و ظرفیت همکاری، با ما در تماس باشید
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60">
                اگه به‌دنبال یک برند قابل اعتماد در حوزه شیرآلات خانگی و بهداشتی هستید، تیم بارش صنعتی
                آماده پاسخ‌گویی و ارائه اطلاعات تکمیلی به شماست.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row shrink-0">
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center rounded-2xl bg-sky-600 hover:bg-sky-500 px-6 py-3 text-sm font-bold text-white transition-all duration-300 shadow-lg shadow-sky-900/40"
              >
                تماس با ما
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-2xl border border-sky-500/25 bg-sky-500/8 px-6 py-3 text-sm font-medium text-white/85 transition-all hover:bg-sky-500/15 hover:border-sky-400/40"
              >
                مشاهده محصولات
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}