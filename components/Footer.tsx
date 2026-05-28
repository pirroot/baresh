import Image from "next/image";
import Link from "next/link";
import { FiCoffee } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="container mx-auto rounded-lg border text-white border-white/20 backdrop-blur-sm bg-white/30 p-5 my-5">
      <div className="border-b-2 mb-4 border-white/50 flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-3">
          <Image
            src="/images/logo-footer.webp"
            alt="لوگو شیرآلات بارش"
            title="لوگو شیرآلات بارش"
            width={150}
            height={200}
          />
        </Link>
        <ul className="flex gap-10">
          {[
            { href: "https://bareshstore.com/", title: "سایت فروشگاهی بارش", label: "فروشگاه بارش", external: true },
            { href: "/licenses", title: "مدارک معتبر بارش", label: "مدارک معتبر بارش" },
            { href: "/about-us", title: "FAQ", label: "سوالات متداول؟" },
            { href: "/contact-us", title: "تماس با ما", label: "تماس با ما" },
          ].map(({ href, title, label, external }) => (
            <li key={href} className="text-sm text-white/80 hover:scale-105 p-2 transition-transform">
              <Link href={href} title={title} {...(external && { target: "_blank", rel: "noopener noreferrer" })}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-sm text-white flex justify-between  max-lg:flex-col max-lg:gap-3 items-center">
        <p>
          &copy; 2026 تمامی حقوق برای سایت{" "}
          <Link href="/" className="text-cos-hi font-bold hover:underline transition-colors">
            بارش
          </Link>{" "}
          محفوظ است.
        </p>
        <p className="flex gap-2 items-center">
          طراحی و اجرا توسط{" "}
          <Link
            href="https://github.com/pirroot"
            className="text-cos-hi font-bold hover:underline transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            سینا پیرزاده
          </Link>
          <FiCoffee size={25} className="text-cos-hi" />
        </p>
      </div>
    </footer>
  );
}