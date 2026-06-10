import { ImLocation, ImPhone } from "react-icons/im"
import { getHomeDataApi } from "@/services/homeServices"
import Socials from "@/components/Socials"
import NeshanMapClient from "@/components/NeshanMapClient"

export default async function Contact() {
  const { siteInfo } = await getHomeDataApi()

  return (
    <main dir="rtl" className="text-white my-20">
      <section className="container mx-auto px-4 pt-16 pb-24">

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

        <div className="
          border border-white/20 rounded-2xl
          bg-white/10 backdrop-blur-sm
          grid grid-cols-1 md:grid-cols-2
          overflow-hidden mb-5
        ">
          <div className="flex flex-col justify-center gap-8 px-6 md:px-10 py-10 md:py-12">

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-white/40 text-xs tracking-widest uppercase">
                <ImPhone size={14} />
                شماره تماس
              </div>

              <a href={siteInfo?.phone ? `tel:+98${siteInfo.phone}` : "#"}
                className="text-white/85 text-lg font-semibold tracking-wide transition-colors duration-200 hover:text-white w-fit pr-1"
              >
                {siteInfo?.phone?.replace(/(\d{4})(\d{3})(\d{4})/, "$1-$2-$3") || "نامشخص"}
              </a>
            </div>

            <div className="w-full h-px bg-white/10" />

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-white/40 text-xs tracking-widest uppercase">
                <ImLocation size={14} />
                آدرس کارخانه
              </div>
              <address className="not-italic text-white/75 text-sm leading-7 pr-1">
                {siteInfo?.factoryAddress}
              </address>
            </div>
          </div>

          <div className="min-h-64 md:min-h-80 overflow-hidden bg-white/5 flex items-center justify-center">
            <NeshanMapClient />
          </div>
        </div>

        <Socials />
      </section>
    </main >
  )
}