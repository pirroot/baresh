import { getFaq } from "@/services/admin/faqServices"
import FaqList from "./FaqList"

export default async function AboutFaq() {
  const faqs = await getFaq()

  return (
    <div className="border border-sky-500/15 rounded-2xl mx-auto w-full bg-sky-500/5 backdrop-blur-sm px-8 py-2">
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-sky-400 bg-sky-500/10 border border-sky-500/20 px-4 py-1.5 rounded-full mb-4">
          پشتیبانی
        </span>
        <h2 className="text-2xl font-semibold text-white/90">سوالات متداول</h2>
        <div className="mt-4 w-10 h-px bg-sky-500/40 mx-auto" />
      </div>

      <FaqList faqs={faqs} />
    </div>
  )
}