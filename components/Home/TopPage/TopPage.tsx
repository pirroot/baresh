import HeroSlider from "@/components/Home/TopPage/HeroSlider";
import TypeitHome from "@/components/Home/Typeit/Typeit-Home";
import { getHomeDataApi } from "@/services/homeServices";
import Link from "next/link";

export default async function () {
  const { sliders } = await getHomeDataApi();
  const { siteInfo } = await getHomeDataApi();
  return (
    <section className="container mx-auto grid lg:grid-cols-2 items-center gap-20 mt-50 mb-20 text-white">

      <div className="space-y-10 max-sm:text-center">
        <div className="">
          <span className="text-red-600 font-bold tracking-widest uppercase text-sm">
            بارش | نوآوری در جریان
          </span>

          <h1 className="text-6xl  font-extrabold leading-tight">
            شرکت صنعتی شیرآلات <br /><span className="text-red-500">بارش؛ </span><br />
            <span className="text-5xl text-transparent bg-clip-text bg-linear-to-r from-red-500 to-red-300">
              <TypeitHome />
            </span>
          </h1>
        </div>

        <p className="text-gray-400 text-lg leading-10 text-justify max-sm:px-5">{siteInfo?.homePageText}</p>

        <div className="flex gap-5 max-sm:justify-around">
          <Link href={'/products'} title="نمایش محصولات بارش" className="bg-linear-700 from-red-400 bg-red-950 hover:bg-red-800 text-white px-8 py-4 rounded-xl font-medium transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)]">
            مشاهده محصولات بارش
          </Link>
          <Link href={'/contact-us'} title="نمایش محصولات بارش" className="bg-linear-700 border-2 border-white/80 text-white px-8 py-4 rounded-xl font-medium transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)]">
            تماس با ما
          </Link>
        </div>
      </div>

      <div className="relative flex justify-center">
        <div className="absolute inset-1 bg-red-600/15 blur-[120px] rounded-full" />
        <HeroSlider slides={sliders} />
      </div>
    </section >)
}