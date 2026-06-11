"use client"

import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { IProduct } from "@/types/ProductDto"
import {
  updateProductAdminApi,
  uploadProductImage,
  uploadProductPdf,
} from "@/services/admin/adminServices"
import { useMemo, useState } from "react"
import { MdClose, MdOutlineImage, MdPictureAsPdf } from "react-icons/md"

const inputClass =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-all focus:border-sky-400 focus:ring-4 focus:ring-sky-100"

const labelClass = "mb-2 block text-xs font-medium text-slate-500"

export default function EditProductModal({
  product,
  onClose,
}: {
  product: IProduct
  onClose: () => void
}) {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [pdf, setPdf] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)

  const { register, handleSubmit } = useForm<IProduct>({
    defaultValues: {
      ...product,
      features: Array.isArray(product.features)
        ? product.features.join(", ")
        : product.features,
      keywords: Array.isArray(product.keywords)
        ? product.keywords.join(", ")
        : product.keywords,
    },
  })

  const toArray = (val: unknown): string[] => {
    if (Array.isArray(val)) return val
    if (typeof val === "string") {
      return val
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean)
    }
    return []
  }

  const currentImage = useMemo(() => {
    if (file) return URL.createObjectURL(file)
    return product.image
  }, [file, product.image])

  const currentPdfName = pdf?.name || product.catalogPdf?.split("/").pop() || "فایلی ثبت نشده"

  const onSubmit = async (data: IProduct) => {
    try {
      setSaving(true)

      let imagePath = product.image
      let pdfPath = product.catalogPdf

      if (file) {
        const uploaded = await uploadProductImage(file)
        imagePath = uploaded.image
      }

      if (pdf) {
        const uploaded = await uploadProductPdf(pdf)
        pdfPath = uploaded.pdf
      }

      await updateProductAdminApi(product.id, {
        ...data,
        features: toArray(data.features),
        keywords: toArray(data.keywords),
        image: imagePath,
        catalogPdf: pdfPath,
      })

      onClose()
      router.refresh()
    } finally {
      setSaving(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative mx-4 w-full max-w-3xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/95 px-6 py-5 backdrop-blur">
          <div>
            <p className="text-xs font-medium text-sky-600">مدیریت محصولات</p>
            <h2 className="mt-1 text-lg font-bold text-slate-900">ویرایش محصول</h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-700"
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
                مشخصات پایه محصول را ویرایش کنید.
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
              <label className={labelClass}>توضیح کامل</label>
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
                تصویر محصول و فایل کاتالوگ را در صورت نیاز بروزرسانی کنید.
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
                />

                <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-3">
                  <div className="mb-3 flex items-center gap-2 text-xs text-slate-500">
                    <MdOutlineImage size={16} />
                    <span>پیش‌نمایش تصویر</span>
                  </div>

                  {currentImage ? (
                    <img
                      src={currentImage}
                      alt={product.title}
                      className="h-44 w-full rounded-2xl object-cover border border-slate-200 bg-slate-100"
                    />
                  ) : (
                    <div className="flex h-44 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-400">
                      تصویری ثبت نشده است
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
                      <p className="text-xs text-slate-400">فایل فعلی</p>
                      <p className="truncate text-sm font-medium text-slate-700">
                        {currentPdfName}
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
                برای بهینه‌سازی نمایش محصول در موتورهای جستجو.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className={labelClass}>ویژگی‌ها</label>
                <input
                  type="text"
                  {...register("features")}
                  placeholder="با کاما جدا کنید"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>کلمات کلیدی</label>
                <input
                  type="text"
                  {...register("keywords")}
                  placeholder="با کاما جدا کنید"
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
                  placeholder="عنوان مناسب برای موتور جستجو"
                />
              </div>

              <div>
                <label className={labelClass}>توضیح SEO</label>
                <input
                  type="text"
                  {...register("seoDescription")}
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
              onClick={onClose}
              className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50"
            >
              انصراف
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-2xl bg-gradient-to-l from-sky-500 to-indigo-500 px-5 py-3 text-sm font-medium text-white shadow-sm transition-all hover:shadow-md disabled:cursor-not-allowed disabled:opacity-70"
            >
              {saving ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
