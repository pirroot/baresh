import Image from "next/image";
import Link from "next/link";
import { FiCoffee } from "react-icons/fi";

const links = [
  { href: "https://bareshstore.com/", title: "سایت فروشگاهی بارش", label: "فروشگاه بارش", external: true },
  { href: "/licenses", title: "مدارک معتبر بارش", label: "مدارک معتبر بارش" },
  { href: "/about-us", title: "سوالات متداول", label: "سوالات متداول؟" },
  { href: "/contact-us", title: "تماس با ما", label: "تماس با ما" },
]

export default function Footer() {
  return (
    <footer className="container mx-auto rounded-2xl border border-white/15 text-white bg-white/5 backdrop-blur-md p-6 my-6">

      {/* Top row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-5 border-b border-white/10">
        <Link href="/" className="shrink-0 opacity-90 hover:opacity-100 transition-opacity">
          <Image
            src="/images/logo-footer.webp"
            alt="لوگو شیرآلات بارش"
            title="لوگو شیرآلات بارش"
            width={130}
            height={180}
          />
        </Link>

        <ul className="flex flex-wrap justify-center gap-1">
          {links.map(({ href, title, label, external }) => (
            <li key={href}>
              <Link
                href={href}
                title={title}
                {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                className="text-sm text-white/60 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/10 transition-all duration-200"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom row */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-4 text-xs text-white/40">
        <p>
          &copy; 2026 تمامی حقوق برای سایت{" "}
          <Link href="/" className="text-white/70 font-semibold hover:text-white transition-colors">
            بارش
          </Link>{" "}
          محفوظ است.
        </p>

        <p className="flex items-center gap-2">
          طراحی و اجرا توسط{" "}
          <Link
            href="https://github.com/pirroot"
            className="text-white/70 font-semibold hover:text-white transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            سینا پیرزاده
          </Link>
          <FiCoffee size={16} className="text-white/50" />
        </p>
      </div>

    </footer>
  );
}