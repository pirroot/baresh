import { ImLocation, ImPhone } from "react-icons/im"
import { getHomeDataApi } from "@/services/homeServices"
import Socials from "@/components/Socials"
import NeshanMapClient from "@/components/NeshanMapClient"
import Link from "next/link"
export const revalidate = 3600;

export default async function Contact() {
  const { siteInfo } = await getHomeDataApi()

  return (
    <main dir="rtl" className="text-white my-20">
      <section className="container mx-auto px-4 md:px-8 lg:px-12 pt-16 pb-24">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-sky-400 bg-sky-500/10 border border-sky-500/20 px-4 py-1.5 rounded-full mb-4">
            ارتباط با ما
          </span>
          <h1 className="text-2xl md:text-3xl font-semibold mb-3">تماس با ما</h1>
          <p className="text-sm text-white/50 max-w-sm mx-auto leading-7">
            برای ارتباط با شرکت بارش می‌توانید از اطلاعات زیر استفاده کنید.
          </p>
          <div className="mt-5 w-10 h-px bg-sky-500/40" />
        </div>

        {/* Card */}
        <div className="border border-sky-500/15 rounded-2xl bg-sky-500/5 backdrop-blur-sm grid grid-cols-1 md:grid-cols-2 overflow-hidden mb-5">

          {/* Info side */}
          <div className="flex flex-col justify-center gap-8 px-6 md:px-10 py-10 md:py-12">

            {/* Phone */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sky-400/70 text-xs font-semibold tracking-widest uppercase">
                <ImPhone size={13} />
                شماره تماس
              </div>

              <Link href={siteInfo?.phone ? `tel:+98${siteInfo.phone}` : "#"}
                className="text-white/85 text-lg font-semibold tracking-wide transition-colors duration-200 hover:text-sky-300 w-fit pr-1"
                dir="ltr"
              >
                {siteInfo?.phone?.replace(/(\d{4})(\d{3})(\d{4})/, "$1-$2-$3") || "نامشخص"}
              </Link>
            </div>

            <div className="w-full h-px bg-sky-500/15" />

            {/* Address */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sky-400/70 text-xs font-semibold tracking-widest uppercase">
                <ImLocation size={13} />
                آدرس کارخانه
              </div>
              <address className="not-italic text-white/60 text-sm leading-7 pr-1">
                {siteInfo?.factoryAddress}
              </address>
            </div>

          </div>

          {/* Map side */}
          <div className="min-h-64 md:min-h-80 overflow-hidden bg-sky-500/5 border-r border-sky-500/10 flex items-center justify-center">
            <NeshanMapClient />
          </div>

        </div>

        <Socials />
      </section>
    </main >
  )
}