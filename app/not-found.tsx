import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "۴۰۴ — صفحه پیدا نشد | بارش صنعتی",
}

export default function NotFound() {
  return (
    <main
      dir="rtl"
      className="min-h-screen flex items-center justify-center text-white"
    >
      <div className="container mx-auto flex flex-col items-center text-center gap-6">

        {/* عدد ۴۰۴ */}
        <div className="relative select-none">
          <span className="text-[12rem] font-black leading-none text-white/5">
            ۴۰۴
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-px bg-white/30" />
              <span className="text-white/50 text-sm tracking-widest uppercase">
                Page Not Found
              </span>
              <div className="w-16 h-px bg-white/30" />
            </div>
          </div>
        </div>

        {/* متن */}
        <div className="flex flex-col items-center gap-3 -mt-6">
          <h1 className="text-2xl font-semibold text-white/90">
            صفحه مورد نظر پیدا نشد
          </h1>
          <p className="text-white/45 text-sm leading-7 max-w-sm">
            شاید آدرس اشتباه وارد شده یا این صفحه دیگر وجود ندارد.
            از لینک‌های زیر برای بازگشت استفاده کنید.
          </p>
        </div>

        {/* دکمه‌ها */}
        <div className="flex gap-4 mt-2">
          <Link
            href="/"
            className="
              bg-white text-black text-sm font-semibold
              px-6 py-3 rounded-xl
              transition-all duration-200 hover:bg-white/80
            "
          >
            بازگشت به خانه
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

        {/* لینک‌های مفید */}
        <div className="
          mt-4 flex gap-6
          border-t border-white/10 pt-6
          text-white/35 text-xs
        ">
          {[
            { label: "محصولات", href: "/products" },
            { label: "مقالات", href: "/articles" },
            { label: "درباره ما", href: "/about" },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="hover:text-white/70 transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </div>

      </div>
    </main>
  )
}