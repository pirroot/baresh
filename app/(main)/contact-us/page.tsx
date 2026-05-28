'use client'

import NeshanMap from "@neshan-maps-platform/react-openlayers"
import { ImLocation, ImPhone } from "react-icons/im"
import {
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaTelegram,
} from "react-icons/fa6"
import Link from "next/link"

const phones = [
  { value: "0912-302-3349", href: "tel:+989123023349" },
  { value: "0993-957-5399", href: "tel:+989939575399" },
]

const socials = [
  {
    icon: FaInstagram,
    label: "اینستاگرام",
    handle: "@baresh.industrial",
    href: "https://instagram.com/baresh.industrial",
    color: "hover:border-pink-400/50 hover:bg-pink-500/10",
  },
  {
    icon: FaTelegram,
    label: "تلگرام",
    handle: "@baresh_ir",
    href: "https://t.me/baresh_ir",
    color: "hover:border-sky-400/50 hover:bg-sky-500/10",
  },
  {
    icon: FaWhatsapp,
    label: "واتس‌اپ",
    handle: "0912-302-3349",
    href: "https://wa.me/989123023349",
    color: "hover:border-green-400/50 hover:bg-green-500/10",
  },
  {
    icon: FaLinkedin,
    label: "لینکدین",
    handle: "Baresh Industrial",
    href: "https://linkedin.com/company/baresh",
    color: "hover:border-blue-400/50 hover:bg-blue-500/10",
  },
]

export default function Contact() {
  return (
    <main dir="rtl" className="text-white my-20">
      <section className="container mx-auto pt-24 pb-24">

        {/* هدر */}
        <div className="text-center mb-12">
          <p className="text-white/40 text-xs tracking-widest uppercase mb-3">
            ارتباط با ما
          </p>
          <h1 className="text-2xl font-semibold mb-3">تماس با ما</h1>
          <p className="text-sm text-white/50 max-w-sm mx-auto leading-7">
            برای ارتباط با شرکت بارش می‌توانید از اطلاعات زیر استفاده کنید.
          </p>
          <div className="mt-5 w-10 h-px bg-white/30 mx-auto" />
        </div>

        {/* اطلاعات تماس + نقشه */}
        <div className="
          border border-white/20 rounded-2xl
          bg-white/10 backdrop-blur-sm
          grid grid-cols-1 md:grid-cols-2
          overflow-hidden mb-5
        ">
          {/* اطلاعات */}
          <div className="flex flex-col justify-center gap-8 px-10 py-12">

            {/* تلفن‌ها */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-white/40 text-xs tracking-widest uppercase">
                <ImPhone size={14} />
                شماره تماس
              </div>
              <div className="flex flex-col gap-2 pr-1">
                {phones.map(({ value, href }) => (
                  <a
                    key={value}
                    href={href}
                    className="
                      text-white/85 text-lg font-semibold tracking-wide
                      transition-colors duration-200 hover:text-white
                      w-fit
                    "
                  >
                    {value}
                  </a>
                ))}
              </div>
            </div>

            <div className="w-full h-px bg-white/10" />

            {/* آدرس */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-white/40 text-xs tracking-widest uppercase">
                <ImLocation size={14} />
                آدرس کارخانه
              </div>
              <address className="not-italic text-white/75 text-sm leading-7 pr-1">
                اردبیل — شهرستان گرمی<br />
                شهرک صنعتی — شیرآلات بارش
              </address>
            </div>

          </div>

          {/* نقشه */}
          <div className="min-h-80 overflow-hidden">
            <NeshanMap
              mapKey="web.ae5f9aa20aac4f64845ed2667787e1a9"
              center={{ latitude: 37.909, longitude: 47.812 }}
              zoom={13}
              className="w-full h-full"
            />
          </div>
        </div>

        {/* شبکه‌های اجتماعی */}
        <div className="border border-white/20 rounded-2xl bg-white/10 backdrop-blur-sm px-10 py-8">
          <div className="flex flex-col items-center text-center mb-7">
            <p className="text-white/40 text-xs tracking-widest uppercase mb-2">
              شبکه‌های اجتماعی
            </p>
            <h2 className="text-base font-semibold">ما را دنبال کنید</h2>
            <div className="mt-3 w-8 h-px bg-white/30" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {socials.map(({ icon: Icon, label, handle, href, color }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`
                  flex flex-col items-center text-center gap-3
                  border border-white/15 rounded-2xl px-5 py-6
                  bg-white/5
                  transition-all duration-300
                  hover:-translate-y-1 group ${color}
                `}
              >
                <Icon size={26} className="text-white/60 group-hover:text-white transition-colors duration-300" />
                <div>
                  <p className="text-white/90 text-sm font-semibold">{label}</p>
                  <p className="text-white/35 text-xs mt-1">{handle}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </section>
    </main>
  )
}