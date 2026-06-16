import type { Metadata } from "next"
import Link from "next/link"
import { AlertTriangle, Home, LayoutGrid, Search, MessageCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "۴۰۴ — صفحه مورد نظر یافت نشد | بارش صنعتی",
  description: "صفحه‌ای که به دنبال آن بودید در سایت بارش صنعتی وجود ندارد.",
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* پس‌زمینه */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.06),transparent_50%)]" />

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* ۴۰۴ */}
        <div className="mb-6">
          <h1 className="text-[100px] md:text-[140px] font-black leading-none">
            <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
              ۴۰۴
            </span>
          </h1>

          <div className="flex items-center justify-center gap-2 mt-4">
            <AlertTriangle size={18} className="text-amber-400" />
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-amber-400/80">
              صفحه پیدا نشد
            </span>
          </div>
        </div>

        {/* متن */}
        <h2 className="text-xl font-bold text-white/90 mb-3">
          متأسفیم! مسیر مورد نظر موجود نیست
        </h2>
        <p className="mx-auto max-w-sm text-sm leading-7 text-white/50">
          صفحه‌ای که به دنبال آن هستید ممکن است حذف شده یا نام آن تغییر کرده باشد.
        </p>

        {/* دکمه‌ها */}
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 px-8 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-1 shadow-lg shadow-sky-900/40"
          >
            <Home size={16} />
            بازگشت به خانه
          </Link>
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-medium text-white/80 transition-all hover:border-white/20 hover:bg-white/10"
          >
            <MessageCircle size={16} />
            گزارش مشکل
          </Link>
        </div>

        {/* لینک‌های سریع */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 border-t border-white/5 pt-8">
          {[
            { label: "محصولات", href: "/products", icon: LayoutGrid },
            { label: "جستجو", href: "/search", icon: Search },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex items-center gap-2 rounded-xl border border-white/5 bg-white/5 px-4 py-2.5 text-xs text-white/40 transition-all hover:border-white/20 hover:text-white"
            >
              <link.icon size={14} />
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}