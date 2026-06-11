"use client"

import { useState } from "react"
import { HiChevronDown } from "react-icons/hi2"

interface IFaqItemDto {
  question: string
  answer: string
}

function FaqItem({ question, answer }: IFaqItemDto) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="border-b border-sky-500/15 last:border-0"
      itemScope
      itemProp="mainEntity"
      itemType="https://schema.org/Question"
    >
      <meta itemProp="name" content={question} />
      <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
        <meta itemProp="text" content={answer} />
      </div>

      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 py-5 text-right transition-colors duration-200 hover:text-sky-300 text-white/80 group"
      >
        <span className="text-sm font-medium leading-snug">{question}</span>
        <HiChevronDown
          size={18}
          className={`shrink-0 text-sky-400/50 transition-transform duration-300 group-hover:text-sky-400 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-60 opacity-100 mb-5" : "max-h-0 opacity-0"}`}>
        <p className="text-white/55 text-sm leading-7 pr-1">{answer}</p>
      </div>
    </div>
  )
}

export default function FaqList({ faqs }: { faqs: IFaqItemDto[] }) {
  return (
    <>
      {faqs.map((item) => (
        <FaqItem key={item.question} question={item.question} answer={item.answer} />
      ))}
    </>
  )
}