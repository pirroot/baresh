import type { Metadata } from "next"
import Link from "next/link"
import { AlertTriangle, ArrowRight, Home, LayoutGrid, Search } from "lucide-react"

export const metadata: Metadata = {
  title: "۴۰۴ — مسیر یافت نشد | بارش صنعتی",
}

export default function NotFound() {
  return (
    <main
      dir="rtl"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 text-white"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.08),transparent_50%)]" />

      <div className="container mx-auto px-6 text-center">

        {/* Diagnostic Code Section */}
        <div className="relative mx-auto mb-10 flex max-w-md flex-col items-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-sky-500/20 bg-sky-500/5 text-sky-400">
            <AlertTriangle size={36} strokeWidth={1.5} />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-sky-400/80">
              Diagnostic Code: 404
            </span>
            <h1 className="text-5xl font-black tracking-tight text-white md:text-6xl">
              مسیر پیدا نشد
            </h1>
          </div>
        </div>

        {/* Message */}
        <p className="mx-auto max-w-sm text-sm leading-7 text-white/50">
          داده‌ای در این آدرس وجود ندارد یا مسیر به دلیل تغییرات ساختاری سیستم تغییر کرده است.
        </p>

        {/* Actions */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-2xl bg-white px-8 py-3.5 text-sm font-bold text-slate-950 transition-all hover:bg-sky-50"
          >
            <Home size={16} />
            بازگشت به خانه
          </Link>
          <Link
            href="/contact-us"
            className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-medium text-white transition-all hover:border-white/20 hover:bg-white/10"
          >
            گزارش مشکل
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="mt-16 grid grid-cols-2 gap-4 border-t border-white/5 pt-8 sm:grid-cols-3 md:max-w-xl md:mx-auto">
          {[
            { label: "محصولات", href: "/products", icon: LayoutGrid },
            { label: "جستجو", href: "/search", icon: Search },
            { label: "درباره ما", href: "/about", icon: ArrowRight },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/5 bg-white/5 py-3 text-xs text-white/40 transition-all hover:border-white/20 hover:text-white"
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
