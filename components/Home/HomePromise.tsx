import Image from "next/image"
import Link from "next/link"

export default function HomePromise() {
  return (
    <section
      className="
        container mx-auto
        my-16 md:my-24 lg:my-30
        px-4 sm:px-6 lg:px-12 xl:px-16
        grid gap-8 md:gap-12
      "
    >
      <div className="text-center mb-2">
        <div className="text-white/40 text-xs tracking-widest uppercase">
          تعهد ما
        </div>

        <h2 className="mt-2 text-white/90 text-2xl md:text-3xl font-semibold leading-snug">
          تعهد شرکت شیرآلات بارش
        </h2>
      </div>

      <div
        className="
          relative overflow-hidden
          border border-white/20 rounded-2xl
          bg-white/10 backdrop-blur-sm
          grid grid-cols-1 md:grid-cols-2
        "
      >
        <div className="relative min-h-64 sm:min-h-72 bg-white/5 flex items-center justify-center overflow-hidden">
          <Image
            src="/images/products/p1.webp"
            alt="شیرآلات بارش"
            fill
            className="object-contain p-6 sm:p-10 opacity-80"
            priority
          />
          <div className="absolute inset-y-0 right-0 w-24 bg-linear-to-l from-white/10 to-transparent" />
        </div>

        <div className="flex flex-col justify-center gap-4 sm:gap-5 px-5 sm:px-8 lg:px-12 py-6 sm:py-10 text-right">
          <h2 className="text-white text-2xl sm:text-3xl font-bold leading-snug">
            کیفیت در هر قطره
          </h2>

          <p className="text-white/55 text-sm leading-7">
            شیرآلات بارش با ترکیب زیبایی، عملکرد و دوام، برای زندگی مدرن و
            نیازهای صنعتی طراحی و تولید می‌شوند — چون هر قطره آب ارزش دارد.
          </p>

          <div>
            <Link
              href="/about"
              className="
                inline-block
                w-full sm:w-auto
                text-center
                border border-white/40 text-white text-sm
                px-6 sm:px-7 py-3 rounded-xl
                transition-all duration-300
                hover:bg-white hover:text-black hover:border-white
              "
            >
              بیشتر بدانید
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
