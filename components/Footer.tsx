import Image from "next/image";
import Link from "next/link";
import {
  FiCoffee,
  FiExternalLink,
  FiMapPin,
  FiPhone,
  FiMail,
  FiInstagram,
  FiYoutube,
  FiLinkedin
} from "react-icons/fi";
import { FaTelegram } from "react-icons/fa";

// ===== لینک‌ها =====
const quickLinks = [
  { href: "/products", label: "محصولات" },
  { href: "/about-us", label: "درباره ما" },
  { href: "/blog", label: "مقالات" },
  { href: "/contact-us", label: "تماس با ما" },
];

const services = [
  { href: "/guarantee", label: "گارانتی" },
  { href: "/faq", label: "سوالات متداول" },
  { href: "/catalog", label: "کاتالوگ" },
  { href: "https://bareshstore.com/", label: "فروشگاه آنلاین", external: true },
];
// ===== فوتر =====
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="container mx-auto mt-12 mb-6 px-4 md:px-8 lg:px-12">
      <div className="rounded-2xl border border-sky-500/15 bg-sky-500/5 backdrop-blur-xl p-6 md:p-8 shadow-2xl shadow-sky-950/30">

        {/* ===== گرید اصلی ===== */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-white/8">

          {/* لوگو و اطلاعات تماس */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo-footer.webp"
                alt="لوگو شیرآلات بارش"
                width={130}
                height={48}
                className="opacity-80 hover:opacity-100 transition-opacity"
              />
            </Link>

            {/* اطلاعات تماس */}
            <div className="space-y-2 text-sm text-white/40">
              <div className="flex items-center gap-3">
                <FiPhone className="text-sky-400/60 w-4 h-4" />
                <a href="tel:+989123023349" className="hover:text-sky-400 transition">
                  ۰۹۱۲-۳۰۲-۳۳۴۹
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FiMapPin className="text-sky-400/60 w-4 h-4" />
                <span>اردبیل — شهرستان گرمی — شهرک صنعتی — شیرآلات بارش</span>
              </div>
              <div className="flex items-center gap-3">
                <FiMail className="text-sky-400/60 w-4 h-4" />
                <a href="mailto:info@bareshco.com" className="hover:text-sky-400 transition">
                  info@bareshco.com
                </a>
              </div>
            </div>
          </div>

          {/* لینک‌های سریع */}
          <div className="md:col-span-3">
            <h3 className="text-sm font-semibold text-white/80 mb-4">دسترسی سریع</h3>
            <ul className="space-y-2.5">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/40 hover:text-sky-400 transition-colors hover:pr-2"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* خدمات و شبکه‌های اجتماعی */}
          <div className="md:col-span-4">
            <h3 className="text-sm font-semibold text-white/80 mb-4">خدمات</h3>
            <ul className="space-y-2.5 mb-4">
              {services.map(({ href, label, external }) => (
                <li key={href}>
                  <Link
                    href={href}
                    {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                    className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-sky-400 transition-colors hover:pr-2"
                  >
                    {label}
                    {external && <FiExternalLink size={10} className="opacity-50" />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ===== پایین فوتر ===== */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4 pt-6 text-xs text-white/35">
          <p>
            <span>&copy; {currentYear} </span>
            <span className="text-white/70 font-medium">گروه بهداشتی بارش</span>
            <span> | تمامی حقوق محفوظ است.</span>
          </p>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/8 border border-sky-500/15">
            <span className="text-white/40">طراحی و اجرا:</span>
            <Link
              href="https://pirroot.top"
              className="flex items-center gap-1.5 text-sky-400 hover:text-sky-300 transition-colors font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              سینا پیرزاده
              <FiCoffee size={13} className="text-amber-400/60" />
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}