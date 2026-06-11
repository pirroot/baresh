import Image from "next/image";
import Link from "next/link";
import { FiCoffee, FiExternalLink } from "react-icons/fi";

const links = [
  { href: "https://bareshstore.com/", title: "سایت فروشگاهی بارش", label: "فروشگاه آنلاین", external: true },
  { href: "/licenses", title: "مدارک معتبر بارش", label: "گواهی‌نامه‌ها" },
  { href: "/faq", title: "سوالات متداول", label: "پرسش‌های متداول" },
  { href: "/contact-us", title: "تماس با ما", label: "ارتباط با ما" },
]

export default function Footer() {
  return (
    <footer className="container mx-auto mt-12 mb-6 px-4 md:px-8 lg:px-12">
      <div className="rounded-2xl border border-sky-500/15 bg-[#0a0f1a]/80 backdrop-blur-xl p-8 shadow-2xl shadow-sky-950/30">

        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-white/8">
          <Link href="/" aria-label="صفحه اصلی شیرآلات بارش" className="group shrink-0">
            <Image
              src="/images/logo-footer.webp"
              alt="لوگو شیرآلات بهداشتی بارش"
              width={120}
              height={45}
              className="opacity-70 group-hover:opacity-100 transition-opacity duration-300"
            />
          </Link>

          <nav aria-label="لینک‌های پایین صفحه">
            <ul className="flex flex-wrap justify-center gap-1.5">
              {links.map(({ href, title, label, external }) => (
                <li key={href}>
                  <Link
                    href={href}
                    title={title}
                    {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                    className="flex items-center gap-1.5 text-sm text-white/50 hover:text-sky-300 px-4 py-2 rounded-full hover:bg-sky-500/10 border border-transparent hover:border-sky-500/20 transition-all duration-300"
                  >
                    {label}
                    {external && <FiExternalLink size={11} className="opacity-60" />}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4 pt-6 text-xs text-white/35">
          <p>
            <span>&copy; {new Date().getFullYear()} تمامی حقوق محفوظ است.{" "}</span>
            <span className="text-white/70 font-medium">گروه بهداشتی بارش</span>
          </p>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/8 border border-sky-500/15">
            <span>طراحی و اجرا:</span>
            <Link
              href="https://pirroot.top"
              className="flex items-center gap-1.5 text-sky-400 hover:text-sky-300 transition-colors font-medium"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="گیتهاب سینا پیرزاده"
            >
              سینا پیرزاده
              <FiCoffee size={13} />
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}