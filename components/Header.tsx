'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BsExclamationSquare } from 'react-icons/bs';
import { FiFileText } from 'react-icons/fi';
import {
  HiOutlineHome,
  HiOutlineSquare3Stack3D,
  HiOutlineXMark,
  HiBars3,
} from 'react-icons/hi2';
import { PiPhoneBold } from 'react-icons/pi';
import { getHomeDataApi } from '@/services/homeServices';

const NAV_LINKS = [
  { href: '/', title: 'صفحه اصلی', label: 'صفحه اصلی', icon: HiOutlineHome },
  { href: '/products', title: 'محصولات بارش', label: 'محصولات', icon: HiOutlineSquare3Stack3D },
  { href: '/blog', title: 'مقالات سایت', label: 'وبلاگ', icon: FiFileText },
  { href: '/about-us', title: 'درباره ما', label: 'درباره ما', icon: BsExclamationSquare },
  { href: '/contact-us', title: 'تماس با ما', label: 'تماس با ما', icon: PiPhoneBold },
] as const;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [phone, setPhone] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    getHomeDataApi().then((data) => {
      if (data.siteInfo?.phone) setPhone(data.siteInfo.phone);
    });
  }, []);

  return (
    <header
      dir="rtl"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-20 ${scrolled ? 'py-3' : 'py-6'}`}
    >
      <div className={`container mx-auto rounded-2xl transition-all duration-300 border border-white/20 shadow-2xl ${scrolled ? 'bg-white/30 backdrop-blur-md py-2 shadow-brand/5' : 'bg-white/30 backdrop-blur-sm py-4'}`}>
        <nav className="flex items-center justify-between px-6">

          <Link href="/" className="group flex items-center gap-3">
            <Image
              src="/images/logo-footer.webp"
              alt="لوگو شیرآلات بارش"
              title="لوگو شیرآلات بارش"
              width={150}
              height={200}
            />
          </Link>

          <ul className="hidden lg:flex items-center gap-2">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="relative text-lg px-4 py-2 font-medium text-zinc-100 transition-colors hover:text-brand group"
                >
                  {label}
                  <span className="absolute inset-x-4 bottom-0 h-0.5 bg-brand scale-x-0 group-hover:scale-x-100 transition-transform origin-right" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <Link
              href={`tel:${phone ?? '+989123023349'}`}
              className="hidden md:flex items-center gap-3 bg-zinc-900 hover:bg-brand text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-[0_10px_20px_-10px_rgba(220,38,38,0.5)] group"
            >
              <span className="border-l border-white/20 pl-3">مشاوره رایگان</span>
              <PiPhoneBold size={18} className="group-hover:rotate-12 transition-transform" />
            </Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 text-zinc-900 hover:bg-zinc-100 rounded-lg transition"
            >
              {menuOpen ? <HiOutlineXMark size={28} /> : <HiBars3 size={28} />}
            </button>
          </div>
        </nav>
      </div>

      <div className={`lg:hidden absolute left-6 right-6 mt-2 transition-all duration-300 origin-top ${menuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}`}>
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-2xl border border-zinc-100 overflow-hidden">
          {NAV_LINKS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-4 px-6 py-4 text-zinc-700 hover:bg-brand/5 hover:text-brand transition-colors"
            >
              <Icon size={20} />
              <span className="font-medium">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}