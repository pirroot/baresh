import HeroSlider from "@/components/Home/TopPage/HeroSlider";
import TypeitHome from "@/components/Home/Typeit/Typeit-Home";
import { getHomeDataApi } from "@/services/homeServices";
import Link from "next/link";

export default async function TopPage() {
  const { sliders, siteInfo } = await getHomeDataApi();

  return (
    <section className="container mx-auto grid lg:grid-cols-2 items-center gap-16 mt-48 mb-20 text-white px-4 md:px-8 lg:px-12">

      {/* Text side */}
      <div className="space-y-8 max-sm:text-center">

        <div className="space-y-4">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-sky-400 bg-sky-500/10 border border-sky-500/20 px-4 py-1.5 rounded-full">
            بارش | نوآوری در جریان
          </span>

          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">
            شرکت شیرآلات خانگی
            <br />
            <span className="text-sky-400">بارش؛</span>
            <br />
            <span className="text-4xl lg:text-5xl text-transparent bg-clip-text bg-linear-to-l from-sky-300 to-sky-500">
              <TypeitHome />
            </span>
          </h1>
        </div>

        <p className="text-white/55 text-base lg:text-lg leading-9 text-justify max-sm:px-4">
          {siteInfo?.homePageText}
        </p>

        <div className="flex gap-4 max-sm:justify-around">
          <Link
            href="/products"
            title="نمایش محصولات بارش"
            className="bg-sky-600 hover:bg-sky-500 text-white px-8 py-3.5 rounded-xl font-medium transition-all duration-300 shadow-lg shadow-sky-900/40 hover:shadow-sky-800/50 hover:scale-[1.02]"
          >
            مشاهده محصولات
          </Link>
          <Link
            href="/contact-us"
            title="تماس با ما"
            className="border border-sky-500/30 text-white/80 hover:text-white hover:border-sky-400/60 hover:bg-sky-500/10 px-8 py-3.5 rounded-xl font-medium transition-all duration-300"
          >
            تماس با ما
          </Link>
        </div>

      </div>

      {/* Slider side */}
      <div className="relative flex justify-center">
        <div className="absolute inset-4 bg-sky-500/10 blur-[100px] rounded-full pointer-events-none" />
        <HeroSlider slides={sliders} />
      </div>

    </section>
  );
}