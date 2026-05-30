'use client'

import { createFaq, deleteFaq, getFaq } from '@/services/admin/faqServices'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

type FAQ = {
  id: string
  question: string
  answer: string
}

export default function FAQPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const { register, handleSubmit, reset } = useForm<FAQ>()

  useEffect(() => {
    getFaq().then(setFaqs)
  }, [])

  const closeModal = () => {
    setIsModalOpen(false)
    reset()
  }

  const onSubmit = async (data: FAQ) => {
    await createFaq(data)
    const updated = await getFaq()
    setFaqs(updated)
    closeModal()
  }

  const handleDelete = async (id: string) => {
    await deleteFaq(id)
    setFaqs(prev => prev.filter(f => f.id !== id))
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-4 py-10 sm:px-6 lg:px-10">
      <div className="">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-blue-400/80">سوالات متداول</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-100 sm:text-4xl">ایجاد سوالات مشتری</h1>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center rounded-2xl bg-blue-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            اضافه کردن سوال
          </button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {faqs.map((faq: FAQ) => (
            <article key={faq.id} className="rounded-3xl border border-blue-800/40 bg-slate-700/90 p-5 shadow-lg transition hover:-translate-y-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-100">{faq.question}</h2>
                  <p className="mt-3 text-slate-400">{faq.answer}</p>
                </div>
                <button
                  onClick={() => handleDelete(faq.id)}
                  className="rounded-2xl bg-red-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-500"
                >
                  حذف
                </button>
              </div>
            </article>
          ))}
          {faqs.length === 0 && (
            <div className="col-span-full rounded-3xl border border-blue-800/40 bg-slate-950/90 p-8 text-center text-slate-400">
              سوالی نیست
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-3xl border border-blue-800/70 bg-slate-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-slate-100">اضافه کردن سوال</h2>
                <p className="mt-2 text-sm text-slate-400">سوال جدید را وارد کنید</p>
              </div>
              <button onClick={closeModal} className="rounded-full bg-slate-800 p-2 text-slate-300 hover:bg-slate-700">✕</button>
            </div>

            {/* ✅ دکمه submit داخل form */}
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
              <label className="block">
                <span className="text-sm font-medium text-slate-200">سوال</span>
                <input
                  {...register('question', { required: true })}
                  className="mt-2 w-full rounded-2xl border border-blue-800/60 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-blue-500"
                  placeholder="سوال را وارد کنید"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-200">پاسخ</span>
                <textarea
                  {...register('answer', { required: true })}
                  className="mt-2 min-h-[120] w-full rounded-2xl border border-blue-800/60 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-blue-500"
                  placeholder="پاسخ را وارد کنید"
                />
              </label>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="w-full rounded-2xl border border-blue-800/70 px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-blue-800/20 sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full rounded-2xl bg-blue-800 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto"
                >
                  ذخیره سوال
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}