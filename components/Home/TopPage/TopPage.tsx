import HeroSlider, { Slide } from "@/components/Home/TopPage/HeroSlider";
import TypeitHome from "@/components/Home/Typeit/Typeit-Home";
import Link from "next/link";

const sliderList: Slide[] = [
  {
    id: 1,
    image: "/images/products/p1.webp",
    title: "ظرفشویی فنری بارش",
    subtitle: "شاوری بارش مدل ونوس تک کاره رنگ سفید طلایی",
    href: "#",
  },
  {
    id: 2,
    image: "/images/products/p2.webp",
    title: "شیر روشویی مدل لاوندر",
    subtitle: "تنه و قطعات تماما برنجی",
    href: "#",
  },
  {
    id: 3,
    image: "/images/products/p3.webp",
    title: "علم دوش دو کاره",
    subtitle: "دکمه ای مکانیزم آب و هوا درجه",
    href: "#",
  },
  {
    id: 4,
    image: "/images/products/p4.webp",
    title: "شیر روشویی مدل ایلیا",
    subtitle: "وزن ششصد گرم (تنه بدون قطعات)",
    href: "#",
  },
  {
    id: 5,
    image: "/images/products/p5.webp",
    title: "شیر دوش مدل لاوندر",
    subtitle: "تنه و قطعات تماما برنجی",
    href: "#",
  },
];


export default function () {
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

        <p className="text-gray-400 text-lg leading-10 text-justify max-sm:px-5">
          ما در «بارش» با بهره‌گیری از تکنولوژی‌های پیشرفته تولید و متریال‌های استاندارد، نسل جدیدی از شیرآلات ساختمانی را با طراحی‌های مدرن و ارگونومیک ارائه می‌دهیم. محصولات ما، ترکیبی دقیق از دوام صنعتی و زیبایی‌شناسی هنری برای پروژه‌های معماری و مسکونی هستند. با نوآوری‌های بارش، استانداردهای جدیدی را در کیفیت جریان آب و تجهیزات بهداشتی ساختمان تجربه کنید. انتخاب بارش، یعنی انتخاب اصالت و دقت در هر قطره.
        </p>

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
        {/* <Image
          src="/images/products/p1.webp"
          alt="شیرآلات هوشمند بارش"
          width={900}
          height={900}
          className="relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-700"
          priority
        /> */}
        <HeroSlider slides={sliderList} />
      </div>
    </section >)
}