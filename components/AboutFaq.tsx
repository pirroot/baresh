"use client"

import { useState } from "react"
import { HiChevronDown } from "react-icons/hi2"

interface IFaqItemDto {
  question: string
  answer: string
}

const FaqList: IFaqItemDto[] = [
  {
    question: "محصولات بارش صنعتی چه استانداردهایی دارند؟",
    answer:
      "تمام محصولات بارش صنعتی دارای گواهینامه ISO 9001 بوده و با استانداردهای بین‌المللی ASME، DIN و BS تطابق دارند. هر محصول پیش از عرضه از آزمون‌های فشار، دما و دوام عبور می‌کند.",
  },
  {
    question: "آیا امکان سفارش محصول سفارشی (Custom) وجود دارد؟",
    answer:
      "بله، تیم مهندسی بارش صنعتی آماده طراحی و تولید شیرآلات سفارشی بر اساس نیاز پروژه شما است. کافی است مشخصات فنی مورد نظر را از طریق فرم تماس ارسال کنید تا کارشناسان ما در اسرع وقت با شما هماهنگ کنند.",
  },
  {
    question: "گارانتی محصولات بارش صنعتی چند سال است؟",
    answer:
      "تمام محصولات بارش صنعتی دارای گارانتی ۲ ساله و خدمات پس از فروش ۵ ساله هستند. در صورت بروز هرگونه مشکل، تیم پشتیبانی ۲۴ ساعته ما آماده پاسخگویی است.",
  },
  {
    question: "آیا بارش صنعتی صادرات دارد؟",
    answer:
      "بله، بارش صنعتی در حال حاضر به ۱۲ کشور از جمله عراق، افغانستان، ترکیه، امارات، عمان و چند کشور آسیای مرکزی صادرات دارد. برای استعلام قیمت صادراتی با واحد بازرگانی بین‌الملل ما تماس بگیرید.",
  },
  {
    question: "حداقل میزان سفارش چقدر است؟",
    answer:
      "حداقل میزان سفارش بسته به نوع محصول متفاوت است. برای محصولات استاندارد حداقل سفارش ۱۰ عدد و برای محصولات سفارشی این مقدار با توجه به پیچیدگی طراحی تعیین می‌شود.",
  },
  {
    question: "مدت زمان تحویل محصولات چقدر است؟",
    answer:
      "محصولات موجود در انبار ظرف ۲ تا ۵ روز کاری ارسال می‌شوند. محصولات سفارشی بسته به پیچیدگی بین ۲ تا ۸ هفته زمان نیاز دارند. زمان دقیق پس از تأیید سفارش اعلام خواهد شد.",
  },
]

function FaqItem({ question, answer }: IFaqItemDto) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-white/15 last:border-0">
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="
          w-full flex items-center justify-between gap-4
          py-5 text-right
          transition-colors duration-200
          hover:text-white text-white/80
          group
        "
      >
        <span className="text-sm font-medium leading-snug">{question}</span>
        <HiChevronDown
          size={18}
          className={`shrink-0 text-white/40 transition-transform duration-300 ${open ? "rotate-180" : ""
            }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-60 opacity-100 mb-5" : "max-h-0 opacity-0"
          }`}
      >
        <p className="text-white/55 text-sm leading-7 pr-1">{answer}</p>
      </div>
    </div>
  )
}

export default function AboutFaq() {
  return (
    <div
      className="border border-white/20 rounded-2xl bg-white/10 backdrop-blur-sm px-8 py-2"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <div className="text-center mb-10">
        <p className="text-white/40 text-xs tracking-widest uppercase mb-3">پشتیبانی</p>
        <h2 id="faq-heading" className="text-2xl font-semibold">
          سوالات متداول
        </h2>
        <div className="mt-4 w-10 h-px bg-white/30 mx-auto" />
      </div>
      {FaqList.map((item) => (
        <div
          key={item.question}
          itemScope
          itemProp="mainEntity"
          itemType="https://schema.org/Question"
        >
          <meta itemProp="name" content={item.question} />
          <div
            itemScope
            itemProp="acceptedAnswer"
            itemType="https://schema.org/Answer"
          >
            <meta itemProp="text" content={item.answer} />
          </div>
          <FaqItem question={item.question} answer={item.answer} />
        </div>
      ))}
    </div>
  )
}