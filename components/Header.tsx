'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BsExclamationSquare } from 'react-icons/bs'
import { FiFileText } from 'react-icons/fi'
import {
  HiBars3,
  HiOutlineHome,
  HiOutlineSquare3Stack3D,
  HiOutlineXMark,
} from 'react-icons/hi2'
import { PiPhoneBold } from 'react-icons/pi'
import { getHomeDataApi } from '@/services/homeServices'

const NAV_LINKS = [
  { href: '/', label: 'صفحه اصلی', icon: HiOutlineHome },
  { href: '/products', label: 'محصولات', icon: HiOutlineSquare3Stack3D },
  { href: '/blog', label: 'وبلاگ', icon: FiFileText },
  { href: '/about-us', label: 'درباره ما', icon: BsExclamationSquare },
  { href: '/contact-us', label: 'تماس با ما', icon: PiPhoneBold },
] as const

export default function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [phone, setPhone] = useState('+989123023349')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    let ignore = false
    getHomeDataApi()
      .then((data) => {
        if (ignore) return
        const nextPhone = data?.siteInfo?.phone?.trim()
        if (nextPhone) setPhone(nextPhone)
      })
      .catch(() => { })
    return () => { ignore = true }
  }, [])

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = ''
      return
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <>
      <header
        dir="rtl"
        className="fixed inset-x-0 top-0 z-20 px-4 pt-4 md:px-8 lg:px-12"
      >
        <div
          className={[
            'mx-auto max-w-7xl rounded-2xl border transition-all duration-300',
            scrolled
              ? 'border-sky-500/20 bg-[#0a0f1a]/80 shadow-2xl shadow-sky-950/40 backdrop-blur-xl'
              : 'border-white/8 bg-[#0a0f1a]/55 backdrop-blur-md',
          ].join(' ')}
        >
          <nav className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="flex shrink-0 items-center"
              aria-label="صفحه اصلی بارش"
            >
              <Image
                src="/images/logo-footer.webp"
                alt="لوگو شیرآلات بارش"
                width={132}
                height={52}
                priority
                className="h-auto w-[112px] sm:w-[124px] lg:w-[132px]"
              />
            </Link>

            <ul className="hidden items-center gap-1 lg:flex">
              {NAV_LINKS.map(({ href, label }) => {
                const active = isActive(href)
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={[
                        'group relative flex items-center rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-200',
                        active
                          ? 'bg-sky-500/15 text-sky-300'
                          : 'text-white/65 hover:bg-white/5 hover:text-white',
                      ].join(' ')}
                    >
                      <span>{label}</span>
                      <span
                        className={[
                          'absolute bottom-1.5 right-4 h-[2px] rounded-full bg-sky-400 transition-all duration-300',
                          active
                            ? 'w-[calc(100%-2rem)] opacity-100'
                            : 'w-0 opacity-0 group-hover:w-[calc(100%-2rem)] group-hover:opacity-60',
                        ].join(' ')}
                      />
                    </Link>
                  </li>
                )
              })}
            </ul>

            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href={`tel:${phone}`}
                className="hidden items-center gap-3 rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-900/40 transition-all duration-300 hover:scale-[1.02] hover:bg-sky-500 lg:flex"
              >
                <span>مشاوره رایگان</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-500/40">
                  <PiPhoneBold size={18} />
                </span>
              </Link>

              <button
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label={menuOpen ? 'بستن منو' : 'باز کردن منو'}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-sky-500/20 bg-sky-500/10 text-sky-300 transition hover:bg-sky-500/20 lg:hidden"
              >
                {menuOpen ? <HiOutlineXMark size={26} /> : <HiBars3 size={26} />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      <div
        className={[
          'fixed inset-0 z-60 lg:hidden transition-all duration-300',
          menuOpen ? 'visible opacity-100' : 'invisible opacity-0',
        ].join(' ')}
      >
        <button
          type="button"
          aria-label="بستن منو"
          onClick={() => setMenuOpen(false)}
          className="absolute inset-0 bg-[#0a0f1a]/80 backdrop-blur-sm"
        />

        <aside
          id="mobile-menu"
          dir="rtl"
          className={[
            'absolute right-0 top-0 h-full w-full max-w-sm border-l border-sky-500/15 bg-[#0a0f1a] p-5 shadow-2xl shadow-sky-950/60 transition-transform duration-300',
            menuOpen ? 'translate-x-0' : 'translate-x-full',
          ].join(' ')}
        >
          <div className="mb-6 flex items-center justify-between border-b border-white/8 pb-4">
            <Link
              href="/"
              className="flex items-center"
              onClick={() => setMenuOpen(false)}
            >
              <Image
                src="/images/logo-footer.webp"
                alt="لوگو شیرآلات بارش"
                width={118}
                height={46}
                className="h-auto w-[118px]"
              />
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="بستن"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/8 text-white/70 transition hover:bg-white/15 hover:text-white"
            >
              <HiOutlineXMark size={24} />
            </button>
          </div>

          <div className="space-y-1.5">
            {NAV_LINKS.map(({ href, label, icon: Icon }) => {
              const active = isActive(href)
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={[
                    'flex items-center gap-3 rounded-2xl px-4 py-3.5 text-base font-medium transition-all duration-200',
                    active
                      ? 'bg-sky-500/20 text-sky-300 ring-1 ring-sky-500/30'
                      : 'text-white/70 hover:bg-white/8 hover:text-white',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'flex h-10 w-10 items-center justify-center rounded-xl',
                      active ? 'bg-sky-500/25 text-sky-300' : 'bg-white/8 text-white/60',
                    ].join(' ')}
                  >
                    <Icon size={20} />
                  </span>
                  <span>{label}</span>
                </Link>
              )
            })}
          </div>

          <div className="mt-6 border-t border-white/8 pt-6">
            <Link
              href={`tel:${phone}`}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between rounded-2xl bg-sky-600 px-4 py-4 text-white shadow-lg shadow-sky-900/50 transition hover:bg-sky-500"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                  <PiPhoneBold size={20} />
                </span>
                <div className="flex flex-col">
                  <span className="text-sm text-white/75">پشتیبانی و مشاوره</span>
                  <span className="text-sm font-semibold">تماس سریع</span>
                </div>
              </div>
              <span className="text-sm font-semibold" dir="ltr">{phone}</span>
            </Link>
          </div>
        </aside>
      </div>
    </>
  )
}