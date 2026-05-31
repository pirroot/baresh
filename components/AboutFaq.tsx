import { getFaq } from "@/services/admin/faqServices"
import FaqList from "./FaqList"

export default async function AboutFaq() {
  const faqs = await getFaq()

  return (
    <div
      className="border border-white/20 rounded-2xl mx-auto w-full bg-white/10 backdrop-blur-sm px-8 py-2"
    >
      <div className="text-center mb-10">
        <p className="text-white/40 text-xs tracking-widest uppercase mb-3">پشتیبانی</p>
        <h2 className="text-2xl font-semibold">سوالات متداول</h2>
        <div className="mt-4 w-10 h-px bg-white/30 mx-auto" />
      </div>

      <FaqList faqs={faqs} />
    </div>
  )
}