import Image from "next/image"
import Link from "next/link"

export default function HomePromise() {
  return (
    <section className="container mx-auto my-16 md:my-24 px-4 md:px-8 lg:px-12">

      {/* Section header */}
      <div className="flex flex-col items-center text-center mb-10">
        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-sky-400 bg-sky-500/10 border border-sky-500/20 px-4 py-1.5 rounded-full mb-4">
          تعهد ما
        </span>
        <h2 className="text-white/90 text-2xl md:text-3xl font-semibold leading-snug">
          تعهد شرکت شیرآلات بارش
        </h2>
        <div className="mt-4 w-10 h-px bg-sky-500/40" />
      </div>

      {/* Card */}
      <div className="relative overflow-hidden border border-sky-500/15 rounded-2xl bg-sky-500/5 backdrop-blur-sm grid grid-cols-1 md:grid-cols-2">

        {/* glow */}
        <div className="pointer-events-none absolute -top-20 -left-20 w-72 h-72 bg-sky-500/8 blur-[90px] rounded-full" />

        {/* Image side */}
        <div className="relative min-h-64 sm:min-h-72 bg-sky-500/5 flex items-center justify-center overflow-hidden">
          <Image
            src="/images/products/p1.webp"
            alt="شیرآلات بارش"
            fill
            className="object-contain p-6 sm:p-10 opacity-85"
            priority
          />
          <div className="absolute inset-y-0 right-0 w-24 bg-linear-to-l from-[#0a0f1a] to-transparent" />
        </div>

        {/* Text side */}
        <div className="flex flex-col justify-center gap-5 px-6 sm:px-8 lg:px-12 py-8 sm:py-10 text-right">
          <h3 className="text-white text-2xl sm:text-3xl font-bold leading-snug">
            کیفیت در هر قطره
          </h3>
          <p className="text-white/50 text-sm leading-8">
            شیرآلات بارش با ترکیب زیبایی، عملکرد و دوام، برای زندگی مدرن و
            نیازهای صنعتی طراحی و تولید می‌شوند — چون هر قطره آب ارزش دارد.
          </p>
          <div>
            <Link
              href="/about"
              className="inline-block w-full sm:w-auto text-center border border-sky-500/30 text-sky-300 text-sm px-7 py-3 rounded-xl transition-all duration-300 hover:bg-sky-500/15 hover:border-sky-400/50 hover:text-white"
            >
              بیشتر بدانید
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}