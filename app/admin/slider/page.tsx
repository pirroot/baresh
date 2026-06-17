'use client'

import { useState, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import {
  ImagePlus,
  Pencil,
  Trash2,
  X,
  Check,
  Image as ImageIcon,
  LayoutTemplate,
  Loader2,
  TriangleAlert,
  FileText,
  Tag,
} from 'lucide-react'
import { ISlider } from '@/types/SliderDto'
import {
  getSliderAdminApi,
  createSliderAdminApi,
  updateSliderAdminApi,
  deleteSliderAdminApi,
  uploadSliderImage,
} from '@/services/admin/sliderServices'
import Image from 'next/image'

const inputClass =
  'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-all focus:border-sky-400 focus:ring-4 focus:ring-sky-100'

const labelClass = 'mb-2 block text-xs font-medium text-slate-500'

const sectionClass =
  'rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'

export default function AdminSliderPage() {
  const [sliders, setSliders] = useState<ISlider[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const { register, handleSubmit, reset } = useForm<ISlider>()

  const fetchSliders = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getSliderAdminApi()
      setSliders(data.result ?? [])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSliders()
  }, [fetchSliders])

  useEffect(() => {
    if (!imageFile) return

    const objectUrl = URL.createObjectURL(imageFile)
    setImagePreview(objectUrl)

    return () => {
      URL.revokeObjectURL(objectUrl)
    }
  }, [imageFile])

  const closeModal = () => {
    if (saving) return
    setModalOpen(false)
    setEditingId(null)
    setImageFile(null)
    setImagePreview(null)
    reset({
      title: '',
      alt: '',
      short_description: '',
      image: '',
    })
  }

  const openCreate = () => {
    setEditingId(null)
    setImageFile(null)
    setImagePreview(null)
    reset({
      title: '',
      alt: '',
      short_description: '',
      image: '',
    })
    setModalOpen(true)
  }

  const openEdit = (slider: ISlider) => {
    setEditingId(slider.id ?? null)
    setImageFile(null)
    setImagePreview(slider.image ?? null)
    reset({
      ...slider,
      title: slider.title ?? '',
      alt: slider.alt ?? '',
      short_description: slider.short_description ?? '',
      image: slider.image ?? '',
    })
    setModalOpen(true)
  }

  const onSubmit = async (data: ISlider) => {
    setSaving(true)
    try {
      let image = data.image

      if (imageFile) {
        const uploaded = await uploadSliderImage(imageFile)
        image = uploaded.image
      }

      const payload = {
        ...data,
        image,
      }

      if (editingId) {
        await updateSliderAdminApi(editingId, payload)
      } else {
        await createSliderAdminApi(payload)
      }

      closeModal()
      await fetchSliders()
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    setDeleting(true)
    try {
      await deleteSliderAdminApi(id)
      setDeleteId(null)
      await fetchSliders()
    } finally {
      setDeleting(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8" dir="rtl">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-medium tracking-[0.3em] text-sky-600">
              مدیریت اسلایدر
            </p>
            <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
              اسلایدهای صفحه اصلی
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              {sliders.length.toLocaleString('fa-IR')} اسلاید در مجموع ثبت شده است
            </p>
          </div>

          <button
            onClick={openCreate}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-linear-to-l from-sky-500 to-indigo-500 px-5 py-3 text-sm font-medium text-white shadow-sm transition-all hover:shadow-md"
          >
            <ImagePlus size={18} />
            اسلاید جدید
          </button>
        </div>

        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <Loader2 size={18} className="animate-spin" />
              در حال بارگذاری اسلایدرها...
            </div>
          </div>
        ) : sliders.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <LayoutTemplate size={28} />
            </div>
            <h2 className="mt-4 text-lg font-semibold text-slate-900">
              هنوز اسلایدی ثبت نشده
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              برای شروع، اولین اسلاید صفحه اصلی را ایجاد کنید.
            </p>
            <button
              onClick={openCreate}
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-linear-to-l from-sky-500 to-indigo-500 px-5 py-3 text-sm font-medium text-white shadow-sm transition-all hover:shadow-md"
            >
              <ImagePlus size={18} />
              ایجاد اسلاید
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {sliders.map((slider) => (
              <article
                key={slider.id}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="relative aspect-video overflow-hidden bg-slate-100">
                  {slider.image ? (
                    <Image
                      src={slider.image}
                      alt={slider.alt || slider.title || 'slider image'}
                      width={1000}
                      height={1000}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-300">
                      <ImageIcon size={36} />
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <div className="mb-3 flex items-center gap-2 text-sky-600">
                    <Tag size={16} />
                    <span className="text-xs font-medium">عنوان اسلاید</span>
                  </div>

                  <h2 className="line-clamp-1 text-base font-semibold text-slate-900">
                    {slider.title || 'بدون عنوان'}
                  </h2>

                  <div className="mt-4 flex items-center gap-2 text-indigo-600">
                    <FileText size={16} />
                    <span className="text-xs font-medium">توضیح کوتاه</span>
                  </div>

                  <p className="mt-2 line-clamp-3 min-h-[72px] text-sm leading-6 text-slate-600">
                    {slider.short_description || 'توضیحی برای این اسلاید ثبت نشده است.'}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                    <div className="rounded-xl bg-slate-50 px-3 py-1.5 text-xs text-slate-500">
                      Alt: {slider.alt || '-'}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEdit(slider)}
                        className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 transition-all hover:bg-slate-200"
                      >
                        <Pencil size={16} />
                        ویرایش
                      </button>

                      <button
                        onClick={() => setDeleteId(slider.id!)}
                        className="inline-flex items-center gap-2 rounded-xl bg-rose-50 px-3 py-2 text-sm font-medium text-rose-600 transition-all hover:bg-rose-100"
                      >
                        <Trash2 size={16} />
                        حذف
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/95 px-6 py-5 backdrop-blur">
              <div>
                <p className="text-xs font-medium text-sky-600">مدیریت اسلایدر</p>
                <h2 className="mt-1 text-lg font-bold text-slate-900">
                  {editingId ? 'ویرایش اسلاید' : 'ایجاد اسلاید جدید'}
                </h2>
              </div>

              <button
                onClick={closeModal}
                disabled={saving}
                className="rounded-xl p-2 text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
              <section className={sectionClass}>
                <h3 className="mb-5 text-sm font-semibold text-slate-800">
                  اطلاعات اصلی
                </h3>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label className={labelClass}>عنوان *</label>
                    <input
                      type="text"
                      {...register('title', { required: true })}
                      className={inputClass}
                      placeholder="عنوان اسلاید"
                    />
                  </div>

                  <div>
                    <label className={labelClass}>متن Alt تصویر *</label>
                    <input
                      type="text"
                      {...register('alt', { required: true })}
                      className={inputClass}
                      placeholder="توضیح تصویر برای SEO"
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label className={labelClass}>توضیح کوتاه</label>
                  <textarea
                    {...register('short_description')}
                    rows={4}
                    className={`${inputClass} resize-none`}
                    placeholder="توضیح کوتاه اسلاید..."
                  />
                </div>
              </section>

              <section className={sectionClass}>
                <h3 className="mb-5 text-sm font-semibold text-slate-800">
                  تصویر اسلاید
                </h3>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <div>
                    <label className={labelClass}>آپلود تصویر *</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0] ?? null
                        setImageFile(file)
                      }}
                      className={inputClass}
                    />
                    <p className="mt-2 text-xs text-slate-400">
                      بهتر است از تصویر با کیفیت و نسبت مناسب برای اسلایدر استفاده شود.
                    </p>
                  </div>

                  <div>
                    <label className={labelClass}>پیش‌نمایش</label>
                    <div className="flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-dashed border-slate-200 bg-slate-50">
                      {imagePreview ? (
                        <Image
                          src={imagePreview}
                          alt="preview"
                          width={1000}
                          height={1000}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-slate-400">
                          <ImageIcon size={28} />
                          <span className="text-xs">پیش‌نمایش تصویر</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="w-full rounded-2xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 disabled:opacity-60 sm:w-auto"
                >
                  انصراف
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-l from-sky-500 to-indigo-500 px-5 py-3 text-sm font-medium text-white shadow-sm transition-all hover:shadow-md disabled:opacity-60 sm:w-auto"
                >
                  {saving ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      در حال ذخیره...
                    </>
                  ) : (
                    <>
                      <Check size={16} />
                      ذخیره اسلاید
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
                <TriangleAlert size={22} />
              </div>

              <div className="flex-1">
                <h3 className="text-base font-bold text-slate-900">حذف اسلاید</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  آیا از حذف این اسلاید مطمئن هستید؟ این عملیات قابل بازگشت نیست.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                onClick={() => setDeleteId(null)}
                disabled={deleting}
                className="w-full rounded-2xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 disabled:opacity-60 sm:w-auto"
              >
                انصراف
              </button>

              <button
                onClick={() => handleDelete(deleteId)}
                disabled={deleting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-rose-600 px-5 py-3 text-sm font-medium text-white transition-all hover:bg-rose-700 disabled:opacity-60 sm:w-auto"
              >
                {deleting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    در حال حذف...
                  </>
                ) : (
                  <>
                    <Trash2 size={16} />
                    حذف اسلاید
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
