"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { MdAdd, MdClose, MdOutlineImage, MdPictureAsPdf } from "react-icons/md"
import { IProduct } from "@/types/ProductDto"
import {
  createProductAdminApi,
  uploadProductImage,
  uploadProductPdf,
} from "@/services/admin/adminServices"

const inputClass =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-all focus:border-sky-400 focus:ring-4 focus:ring-sky-100"

const labelClass = "mb-2 block text-xs font-medium text-slate-500"

const AddProductModal = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [pdf, setPdf] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)
  const [imagePreview, setImagePreview] = useState<string>("")

  const { register, handleSubmit, reset } = useForm<IProduct>()

  useEffect(() => {
    if (!file) {
      setImagePreview("")
      return
    }

    const objectUrl = URL.createObjectURL(file)
    setImagePreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [file])

  const pdfName = useMemo(() => {
    return pdf?.name || "فایلی انتخاب نشده"
  }, [pdf])

  const toArray = (value: unknown): string[] => {
    if (Array.isArray(value)) return value
    if (typeof value === "string") {
      return value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    }
    return []
  }

  const titleToSlug = (title: string) => {
    return (
      title
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9\u0600-\u06FF-]/g, "")
        .slice(0, 60) + `-${Math.floor(Math.random() * 10000)}`
    )
  }

  const closeModal = () => {
    if (saving) return
    setOpen(false)
  }

  const onSubmit = async (data: IProduct) => {
    try {
      setSaving(true)

      let imagePath = ""
      let pdfPath = ""

      if (file) {
        const uploaded = await uploadProductImage(file)
        imagePath = uploaded.image
      }

      if (pdf) {
        const uploadedPdf = await uploadProductPdf(pdf)
        pdfPath = uploadedPdf.pdf
      }

      await createProductAdminApi({
        ...data,
        seoTitle: data.seoTitle || data.title,
        slug: titleToSlug(data.title),
        features: toArray(data.features),
        keywords: toArray(data.keywords),
        image: imagePath,
        catalogPdf: pdfPath,
      })

      reset()
      setFile(null)
      setPdf(null)
      setOpen(false)
      router.refresh()
    } finally {
      setSaving(false)
    }
  }

  return (
    <div dir="rtl">
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-l from-sky-500 to-indigo-500 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:shadow-md"
        onClick={() => setOpen(true)}
      >
        <MdAdd size={18} />
        محصول جدید
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative mx-4 w-full max-w-3xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/95 px-6 py-5 backdrop-blur">
              <div>
                <p className="text-xs font-medium text-sky-600">مدیریت محصولات</p>
                <h2 className="mt-1 text-lg font-bold text-slate-900">افزودن محصول جدید</h2>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="rounded-xl p-2 text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
                title="بستن"
              >
                <MdClose size={22} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="max-h-[80vh] space-y-6 overflow-y-auto px-6 py-6"
            >
              {/* Basic Info */}
              <section className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-slate-800">اطلاعات اصلی</h3>
                  <p className="mt-1 text-xs text-slate-400">
                    مشخصات پایه محصول را وارد کنید.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className={labelClass}>عنوان محصول</label>
                    <input
                      type="text"
                      {...register("title", { required: true })}
                      className={inputClass}
                      placeholder="مثلاً دستگاه تصفیه آب صنعتی"
                    />
                  </div>

                  <div>
                    <label className={labelClass}>دسته‌بندی</label>
                    <input
                      type="text"
                      {...register("category", { required: true })}
                      className={inputClass}
                      placeholder="مثلاً تجهیزات صنعتی"
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>توضیح کوتاه</label>
                  <input
                    type="text"
                    {...register("description", { required: true })}
                    className={inputClass}
                    placeholder="خلاصه‌ای کوتاه از محصول"
                  />
                </div>

                <div>
                  <label className={labelClass}>توضیح کامل محصول</label>
                  <textarea
                    {...register("product_description", { required: true })}
                    rows={5}
                    className={`${inputClass} resize-none`}
                    placeholder="توضیحات کامل محصول را وارد کنید"
                  />
                </div>
              </section>

              {/* Media */}
              <section className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-slate-800">رسانه و فایل‌ها</h3>
                  <p className="mt-1 text-xs text-slate-400">
                    تصویر محصول و فایل کاتالوگ را بارگذاری کنید.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <label className={labelClass}>عکس محصول</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                      className="block w-full text-sm text-slate-500 file:ml-4 file:rounded-xl file:border-0 file:bg-sky-100 file:px-4 file:py-2 file:text-sm file:font-medium file:text-sky-700 hover:file:bg-sky-200"
                      required
                    />

                    <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-3">
                      <div className="mb-3 flex items-center gap-2 text-xs text-slate-500">
                        <MdOutlineImage size={16} />
                        <span>پیش‌نمایش تصویر</span>
                      </div>

                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="preview"
                          className="h-44 w-full rounded-2xl border border-slate-200 bg-slate-100 object-cover"
                        />
                      ) : (
                        <div className="flex h-44 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-400">
                          هنوز تصویری انتخاب نشده است
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <label className={labelClass}>کاتالوگ PDF</label>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setPdf(e.target.files?.[0] ?? null)}
                      className="block w-full text-sm text-slate-500 file:ml-4 file:rounded-xl file:border-0 file:bg-rose-100 file:px-4 file:py-2 file:text-sm file:font-medium file:text-rose-700 hover:file:bg-rose-200"
                    />

                    <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
                          <MdPictureAsPdf size={24} />
                        </div>

                        <div className="min-w-0">
                          <p className="text-xs text-slate-400">وضعیت فایل</p>
                          <p className="truncate text-sm font-medium text-slate-700">
                            {pdfName}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* SEO */}
              <section className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-slate-800">سئو و متادیتا</h3>
                  <p className="mt-1 text-xs text-slate-400">
                    اطلاعات مربوط به جستجو و ساختار محتوا.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className={labelClass}>ویژگی‌ها</label>
                    <input
                      type="text"
                      {...register("features", { required: true })}
                      placeholder="مثلاً ضدزنگ, کم‌مصرف, صنعتی"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>کلمات کلیدی</label>
                    <input
                      type="text"
                      {...register("keywords", { required: true })}
                      placeholder="مثلاً شیرآلات, صنعتی, استیل"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className={labelClass}>عنوان SEO</label>
                    <input
                      type="text"
                      {...register("seoTitle")}
                      className={inputClass}
                      placeholder="در صورت خالی بودن، از عنوان محصول استفاده می‌شود"
                    />
                  </div>

                  <div>
                    <label className={labelClass}>توضیح SEO</label>
                    <input
                      type="text"
                      {...register("seoDescription", { required: true })}
                      className={inputClass}
                      placeholder="توضیح کوتاه برای نتایج جستجو"
                    />
                  </div>
                </div>
              </section>

              {/* Actions */}
              <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-slate-200 bg-white pt-5">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  انصراف
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-2xl bg-gradient-to-l from-sky-500 to-indigo-500 px-5 py-3 text-sm font-medium text-white shadow-sm transition-all hover:shadow-md disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {saving ? "در حال ذخیره..." : "ذخیره محصول"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddProductModal
