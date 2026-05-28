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
    <section className="container mx-auto px-4 sm:px-6 lg:px-12">
      <div className="
        grid 
        grid-cols-1      
        sm:grid-cols-2   
        lg:grid-cols-3   
        xl:grid-cols-5   
        gap-4 md:gap-6 
        text-white
      ">
        {HomeCategoryList.map(({ icon: Icon, title, description }, index) => (
          <div
            key={title}
            className="
              relative overflow-hidden
              flex flex-col items-center justify-center text-center
              border border-white/30 rounded-2xl px-5 py-8
              bg-white/10 backdrop-blur-sm
              transition-all duration-300 ease-out
              hover:bg-white/20 hover:border-white/60 
              md:hover:scale-105 md:hover:-translate-y-1 /* در موبایل معمولا scale اذیت میکنه، محدودش کردیم به دسکتاپ */
              group cursor-default
            "
          >
            {/* Background Number Index */}
            <span className="
              absolute -bottom-3 -right-1
              text-7xl sm:text-8xl font-black text-white/5 select-none pointer-events-none
              transition-all duration-300 group-hover:text-white/10
            ">
              {index + 1}
            </span>

            <div className="relative mb-4 flex flex-col items-center">
              <div className="
                p-3 rounded-xl bg-white/10 border border-white/20
                transition-all duration-300
                group-hover:bg-white/20 group-hover:border-white/40 group-hover:shadow-lg group-hover:shadow-white/10
              ">
                <Icon size={32} className="md:size-[36]" />
              </div>
              <div className="
                mt-2 h-px w-8 bg-white/40
                transition-all duration-300
                group-hover:w-16 group-hover:bg-white/80
              " />
            </div>

            <h3 className="text-sm md:text-base font-semibold mb-2 leading-snug">
              {title}
            </h3>
            <p className="text-white/55 text-[11px] md:text-xs leading-relaxed max-w-[200] md:max-w-none">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
