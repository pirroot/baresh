'use client'

import { createFaq, deleteFaq, getFaq } from '@/services/admin/faqServices'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { CircleHelp, MessageSquareText, Plus, Trash2, X } from 'lucide-react'

type FAQ = {
  id: string
  question: string
  answer: string
}

const inputClass =
  'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-all focus:border-sky-400 focus:ring-4 focus:ring-sky-100'

const labelClass = 'mb-2 block text-xs font-medium text-slate-500'

export default function FAQPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const { register, handleSubmit, reset } = useForm<FAQ>()

  useEffect(() => {
    getFaq().then(setFaqs)
  }, [])

  const closeModal = () => {
    if (loading) return
    setIsModalOpen(false)
    reset()
  }

  const onSubmit = async (data: FAQ) => {
    setLoading(true)
    try {
      await createFaq(data)
      const updated = await getFaq()
      setFaqs(updated)
      closeModal()
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    try {
      await deleteFaq(id)
      setFaqs((prev) => prev.filter((f) => f.id !== id))
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <main className="min-h-screen  px-4 py-10 sm:px-6 lg:px-10" dir="rtl">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-medium tracking-[0.3em] text-sky-600">سوالات متداول</p>
            <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
              مدیریت سوالات مشتریان
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              ایجاد، مشاهده و حذف سوالات متداول سایت
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-linear-to-l from-sky-500 to-indigo-500 px-5 py-3 text-sm font-medium text-white shadow-sm transition-all hover:shadow-md"
          >
            <Plus size={18} />
            اضافه کردن سوال
          </button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {faqs.map((faq: FAQ) => (
            <article
              key={faq.id}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="mb-3 flex items-center gap-2 text-sky-600">
                    <CircleHelp size={18} />
                    <span className="text-xs font-medium">سوال</span>
                  </div>
                  <h2 className="text-base font-semibold leading-7 text-slate-900">
                    {faq.question}
                  </h2>

                  <div className="mt-5 flex items-center gap-2 text-emerald-600">
                    <MessageSquareText size={18} />
                    <span className="text-xs font-medium">پاسخ</span>
                  </div>
                  <p className="mt-2 whitespace-pre-line text-sm leading-7 text-slate-600">
                    {faq.answer}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(faq.id)}
                  disabled={deletingId === faq.id}
                  className="inline-flex items-center gap-2 rounded-2xl bg-rose-50 px-3 py-2 text-sm font-medium text-rose-600 transition-all hover:bg-rose-100 disabled:opacity-60"
                >
                  <Trash2 size={16} />
                  {deletingId === faq.id ? '...' : 'حذف'}
                </button>
              </div>
            </article>
          ))}

          {faqs.length === 0 && (
            <div className="col-span-full rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <CircleHelp size={24} />
              </div>
              <h3 className="mt-4 text-base font-semibold text-slate-800">هنوز سوالی ثبت نشده</h3>
              <p className="mt-2 text-sm text-slate-500">اولین سوال متداول را اضافه کنید</p>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white/95 px-6 py-5 backdrop-blur">
              <div>
                <p className="text-xs font-medium text-sky-600">مدیریت سوالات</p>
                <h2 className="mt-1 text-lg font-bold text-slate-900">اضافه کردن سوال</h2>
              </div>

              <button
                onClick={closeModal}
                disabled={loading}
                className="rounded-xl p-2 text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 px-6 py-6">
              <div>
                <label className={labelClass}>سوال</label>
                <input
                  {...register('question', { required: true })}
                  className={inputClass}
                  placeholder="سوال را وارد کنید"
                />
              </div>

              <div>
                <label className={labelClass}>پاسخ</label>
                <textarea
                  {...register('answer', { required: true })}
                  rows={5}
                  className={`${inputClass} resize - none`}
                  placeholder="پاسخ را وارد کنید"
                />
              </div>

              <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={loading}
                  className="w-full rounded-2xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 disabled:opacity-60 sm:w-auto"
                >
                  انصراف
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl bg-linear-to-l from-sky-500 to-indigo-500 px-5 py-3 text-sm font-medium text-white shadow-sm transition-all hover:shadow-md disabled:opacity-60 sm:w-auto"
                >
                  {loading ? 'در حال ذخیره...' : 'ذخیره سوال'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}
