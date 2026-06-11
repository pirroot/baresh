import {
  HiSparkles,
  HiBeaker,
  HiShieldCheck,
  HiMiniPhone,
} from "react-icons/hi2"
import type { ComponentType } from "react"
import { HiArchive } from "react-icons/hi"

interface IHomeCategoryDto {
  icon: ComponentType<{ size?: number; className?: string }>
  title: string
  description: string
}

const HomeCategoryList: IHomeCategoryDto[] = [
  {
    icon: HiSparkles,
    title: "کیفیت ممتاز",
    description: "بهره‌گیری از برترین متریال و تکنولوژی‌های پیشرفته",
  },
  {
    icon: HiArchive,
    title: "بهینه‌سازی مصرف آب",
    description: "جریان‌سنجی بهینه برای حداکثر بازدهی",
  },
  {
    icon: HiBeaker,
    title: "مهندسی دقیق",
    description: "طراحی‌شده با دقت فوق‌العاده",
  },
  {
    icon: HiShieldCheck,
    title: "پایدار و با دوام بالا",
    description: "عمر مفید طولانی با ساختار مستحکم",
  },
  {
    icon: HiMiniPhone,
    title: "خدمات پس از فروش",
    description: "پشتیبانی حرفه‌ای و قابل اطمینان ۲۴ ساعته",
  },
]

export default function HomeCategories() {
  return (
    <section className="container mx-auto px-4 md:px-8 lg:px-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-5 text-white">
        {HomeCategoryList.map(({ icon: Icon, title, description }, index) => (
          <div
            key={title}
            className="relative overflow-hidden flex flex-col items-center justify-center text-center border border-sky-500/15 rounded-2xl px-5 py-8 bg-sky-500/5 backdrop-blur-sm transition-all duration-300 ease-out hover:bg-sky-500/10 hover:border-sky-400/30 md:hover:scale-[1.03] md:hover:-translate-y-1 group cursor-default"
          >
            {/* background index number */}
            <span className="absolute -bottom-3 -right-1 text-7xl sm:text-8xl font-black text-sky-400/5 select-none pointer-events-none transition-all duration-300 group-hover:text-sky-400/10">
              {index + 1}
            </span>

            {/* icon */}
            <div className="relative mb-4 flex flex-col items-center">
              <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 transition-all duration-300 group-hover:bg-sky-500/20 group-hover:border-sky-400/40 group-hover:shadow-lg group-hover:shadow-sky-500/15">
                <Icon size={32} className="text-sky-300 md:size-[36]" />
              </div>
              <div className="mt-2.5 h-px w-8 bg-sky-500/40 transition-all duration-300 group-hover:w-14 group-hover:bg-sky-400" />
            </div>

            <h3 className="text-sm md:text-base font-semibold mb-2 leading-snug text-white">
              {title}
            </h3>
            <p className="text-white/45 text-[11px] md:text-xs leading-relaxed">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}