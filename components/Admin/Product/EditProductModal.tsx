"use client"

import dynamic from "next/dynamic"
import "react-quill-new/dist/quill.snow.css"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import {
  MdAdd,
  MdClose,
  MdDeleteOutline,
  MdOutlineImage,
  MdPictureAsPdf,
} from "react-icons/md"
import {
  updateProductAdminApi,
  uploadProductImage,
  uploadProductPdf,
} from "@/services/admin/adminServices"
import { modules } from "@/lib/reactQuillSetting"
import Image from "next/image"
// ✅ تغییر این خط
import { IProduct } from "@/types/ProductDto"  // جایگزین Product از prisma
import { ProductFormValues } from "@/types/ProductValueForm"

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
})

const inputClass =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-all focus:border-sky-400 focus:ring-4 focus:ring-sky-100"

const textareaClass =
  "w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-all focus:border-sky-400 focus:ring-4 focus:ring-sky-100"

const labelClass = "mb-2 block text-xs font-medium text-slate-500"

type FaqItem = {
  question: string
  answer: string
}

export interface EditProductModalProps {
  product: IProduct  // ✅ تغییر به IProduct
  onClose: () => void
}

const normalizeFeatures = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [""]

  const features = value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean)

  return features.length > 0 ? features : [""]
}

const normalizeFaq = (value: unknown): FaqItem[] => {
  if (!Array.isArray(value)) return [{ question: "", answer: "" }]

  const faqItems = value
    .filter(
      (item): item is FaqItem =>
        typeof item === "object" &&
        item !== null &&
        "question" in item &&
        "answer" in item &&
        typeof item.question === "string" &&
        typeof item.answer === "string",
    )
    .map((item) => ({
      question: item.question,
      answer: item.answer,
    }))

  return faqItems.length > 0 ? faqItems : [{ question: "", answer: "" }]
}

const EditProductModal = ({ product, onClose }: EditProductModalProps) => {
  const router = useRouter()

  const [file, setFile] = useState<File | null>(null)
  const [pdf, setPdf] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)
  const [imagePreview, setImagePreview] = useState("")

  const [features, setFeatures] = useState<string[]>([])
  const [faq, setFaq] = useState<FaqItem[]>([])

  const { register, handleSubmit, watch, setValue, reset } = useForm<ProductFormValues>()

  const watchedTitle = watch("title")
  const product_description = watch("product_description")

  // ✅ useEffect برای مقداردهی اولیه - یکبار
  useEffect(() => {
    if (!product) return

    reset({
      title: product.title,
      slug: product.slug ?? "",
      category: product.category,
      description: product.description ?? "",
      product_description: product.product_description ?? "",

      brand: product.brand ?? "",
      model: product.model ?? "",
      color: product.color ?? "",
      material: product.material ?? "",
      size: product.size ?? "",
      weight: product.weight ?? "",

      seoTitle: product.seoTitle ?? "",
      seoDescription: product.seoDescription ?? "",
      canonicalUrl: product.canonicalUrl ?? "",

      searchTags: Array.isArray(product.searchTags)
        ? product.searchTags.join(", ")
        : "",

      semanticKeywords: Array.isArray(product.semanticKeywords)
        ? product.semanticKeywords.join(", ")
        : "",
    })

    setFeatures(normalizeFeatures(product.features))
    setFaq(normalizeFaq(product.faq))
  }, [product, reset])

  // ✅ useEffect برای عکس
  useEffect(() => {
    if (!file) {
      setImagePreview("")
      return
    }

    const objectUrl = URL.createObjectURL(file)
    setImagePreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [file])

  // ✅ useEffect برای اسلاگ
  useEffect(() => {
    if (!watchedTitle) return

    const slug = titleToSlug(watchedTitle, false)
    setValue("slug", slug)
    setValue("canonicalUrl", `/products/${slug}`)
  }, [watchedTitle, setValue])

  const pdfName = useMemo(() => {
    if (pdf) return pdf.name
    if (product?.catalogPdf) {
      return product.catalogPdf.split("/").pop() || "فایل PDF"
    }
    return "فایلی انتخاب نشده"
  }, [pdf, product])

  const toArray = (value: unknown): string[] => {
    if (Array.isArray(value)) return value.filter(Boolean)
    if (typeof value === "string") {
      return value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    }
    return []
  }

  const titleToSlug = (title: string, withRandom = true) => {
    const base = title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\u0600-\u06FF-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 70)

    return withRandom ? `${base}-${Math.floor(Math.random() * 10000)}` : base
  }

  const cleanFeatures = () => {
    return features.map((item) => item.trim()).filter(Boolean)
  }

  const cleanFaq = () => {
    return faq
      .map((item) => ({
        question: item.question.trim(),
        answer: item.answer.trim(),
      }))
      .filter((item) => item.question && item.answer)
  }

  const addFeature = () => {
    setFeatures((prev) => [...prev, ""])
  }

  const removeFeature = (index: number) => {
    setFeatures((prev) => prev.filter((_, i) => i !== index))
  }

  const updateFeature = (index: number, value: string) => {
    setFeatures((prev) => {
      const copy = [...prev]
      copy[index] = value
      return copy
    })
  }

  const addFaq = () => {
    setFaq((prev) => [...prev, { question: "", answer: "" }])
  }

  const removeFaq = (index: number) => {
    setFaq((prev) => prev.filter((_, i) => i !== index))
  }

  const updateFaq = (index: number, key: keyof FaqItem, value: string) => {
    setFaq((prev) => {
      const copy = [...prev]
      copy[index] = {
        ...copy[index],
        [key]: value,
      }
      return copy
    })
  }

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setSaving(true)

      let imagePath = product.image
      // ✅ تغییر این خط برای هندل کردن undefined
      let pdfPath = product.catalogPdf ?? null

      if (file) {
        const uploaded = await uploadProductImage(file)
        imagePath = uploaded.image
      }

      if (pdf) {
        const uploadedPdf = await uploadProductPdf(pdf)
        pdfPath = uploadedPdf.pdf
      }

      const slug = data.slug || titleToSlug(data.title)

      await updateProductAdminApi(product.id, {
        ...data,

        slug,
        image: imagePath,
        catalogPdf: pdfPath,

        seoTitle: data.seoTitle || data.title,
        seoDescription: data.seoDescription || data.description,
        canonicalUrl: data.canonicalUrl || `/products/${slug}`,

        features: cleanFeatures(),
        faq: cleanFaq(),

        searchTags: toArray(data.searchTags),
        semanticKeywords: toArray(data.semanticKeywords),

        brand: data.brand || "شیرآلات بارشی",
        model: data.model || null,
        color: data.color || null,
        material: data.material || null,
        size: data.size || null,
        weight: data.weight || null,
      })

      onClose()
      router.refresh()
    } finally {
      setSaving(false)
    }
  }

  return (
    <div dir="rtl">
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/95 px-6 py-5 backdrop-blur">
            <div>
              <p className="text-xs font-medium text-sky-600">مدیریت محصولات</p>
              <h2 className="mt-1 text-lg font-bold text-slate-900">
                ویرایش محصول
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded-xl p-2 text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
              title="بستن"
            >
              <MdClose size={22} />
            </button>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-h-[82vh] space-y-7 overflow-y-auto px-6 py-6"
          >
            {/* اطلاعات اصلی */}
            <section className="rounded-3xl border border-slate-200 bg-slate-50/60 p-5">
              <div className="mb-5">
                <h3 className="text-sm font-semibold text-slate-800">
                  اطلاعات اصلی
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  اطلاعات پایه محصول را وارد کن.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className={labelClass}>عنوان محصول</label>
                  <input
                    type="text"
                    {...register("title", { required: true })}
                    className={inputClass}
                    placeholder="مثلاً شیرآلات بارشی مدل کلاسیک"
                  />
                </div>

                <div>
                  <label className={labelClass}>دسته‌بندی</label>
                  <input
                    type="text"
                    {...register("category", { required: true })}
                    className={inputClass}
                    placeholder="مثلاً شیرآلات حمام"
                  />
                </div>

                <div>
                  <label className={labelClass}>اسلاگ</label>
                  <input
                    type="text"
                    {...register("slug")}
                    className={inputClass}
                    placeholder="product-slug"
                  />
                </div>

                <div>
                  <label className={labelClass}>برند</label>
                  <input
                    type="text"
                    {...register("brand")}
                    className={inputClass}
                    placeholder="شیرآلات بارشی"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className={labelClass}>توضیح کوتاه</label>
                <textarea
                  {...register("description")}
                  rows={3}
                  className={textareaClass}
                  placeholder="توضیحات کامل محصول را وارد کن"
                />
              </div>

              <div className="mt-4">
                <label className={labelClass}>توضیح کامل محصول</label>
                <ReactQuill
                  theme="snow"
                  value={product_description || ""}
                  onChange={(val) =>
                    setValue("product_description", val, {
                      shouldValidate: true,
                    })
                  }
                  className="bg-amber-100/20 rtl-editor"
                  modules={modules}
                />
              </div>
            </section>

            {/* مشخصات محصول */}
            <section className="rounded-3xl border border-slate-200 bg-white p-5">
              <div className="mb-5">
                <h3 className="text-sm font-semibold text-slate-800">
                  مشخصات محصول
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  این بخش برای نمایش بهتر در صفحه محصول و سئو هم کمک می‌کند.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <label className={labelClass}>مدل</label>
                  <input
                    type="text"
                    {...register("model")}
                    className={inputClass}
                    placeholder="مثلاً B-120"
                  />
                </div>

                <div>
                  <label className={labelClass}>رنگ</label>
                  <input
                    type="text"
                    {...register("color")}
                    className={inputClass}
                    placeholder="کروم، مشکی، طلایی"
                  />
                </div>

                <div>
                  <label className={labelClass}>متریال</label>
                  <input
                    type="text"
                    {...register("material")}
                    className={inputClass}
                    placeholder="استیل، برنج، ABS"
                  />
                </div>

                <div>
                  <label className={labelClass}>سایز</label>
                  <input
                    type="text"
                    {...register("size")}
                    className={inputClass}
                    placeholder="مثلاً ۳۰ سانتی‌متر"
                  />
                </div>

                <div>
                  <label className={labelClass}>وزن</label>
                  <input
                    type="text"
                    {...register("weight")}
                    className={inputClass}
                    placeholder="مثلاً ۲ کیلوگرم"
                  />
                </div>
              </div>
            </section>

            {/* ویژگی‌های محصول */}
            <section className="rounded-3xl border border-slate-200 bg-slate-50/60 p-5">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-slate-800">
                    ویژگی‌های محصول
                  </h3>
                  <p className="mt-1 text-xs text-slate-400">
                    هر ویژگی را جدا وارد کن.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={addFeature}
                  className="inline-flex items-center gap-2 rounded-2xl bg-sky-50 px-4 py-2 text-xs font-medium text-sky-700 transition-all hover:bg-sky-100"
                >
                  <MdAdd size={17} />
                  افزودن ویژگی
                </button>
              </div>

              <div className="space-y-3">
                {features.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      className={inputClass}
                      placeholder="مثلاً مقاوم در برابر رسوب"
                    />

                    {features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 transition-all hover:bg-rose-100"
                      >
                        <MdDeleteOutline size={20} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* رسانه و فایل‌ها */}
            <section className="rounded-3xl border border-slate-200 bg-white p-5">
              <div className="mb-5">
                <h3 className="text-sm font-semibold text-slate-800">
                  رسانه و فایل‌ها
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  تصویر محصول و فایل کاتالوگ را بارگذاری کن.
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

                    {(imagePreview || product?.image) && (
                      <Image
                        src={imagePreview || product.image}
                        alt="preview"
                        width={600}
                        height={300}
                        className="h-44 w-full rounded-2xl border border-slate-200 object-cover"
                      />
                    )}

                    {!imagePreview && !product?.image && (
                      <div className="flex h-44 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-400">
                        هنوز تصویری انتخاب نشده
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

            {/* سئو و متادیتا */}
            <section className="rounded-3xl border border-slate-200 bg-slate-50/60 p-5">
              <div className="mb-5">
                <h3 className="text-sm font-semibold text-slate-800">
                  سئو و متادیتا
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  اینجا دقیق بچینیمش، صفحه محصول خوشگل‌تر توی گوگل می‌شینه 😌
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className={labelClass}>عنوان SEO</label>
                  <input
                    type="text"
                    {...register("seoTitle")}
                    className={inputClass}
                    placeholder="در صورت خالی بودن، عنوان محصول استفاده می‌شود"
                  />
                </div>

                <div>
                  <label className={labelClass}>Canonical URL</label>
                  <input
                    type="text"
                    {...register("canonicalUrl")}
                    className={inputClass}
                    placeholder="/products/product-slug"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className={labelClass}>توضیح SEO</label>
                <textarea
                  {...register("seoDescription")}
                  rows={3}
                  className={textareaClass}
                  placeholder="توضیح مناسب برای نتایج جستجو"
                />
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className={labelClass}>Search Tags</label>
                  <input
                    type="text"
                    {...register("searchTags")}
                    className={inputClass}
                    placeholder="شیرآلات, دوش بارانی, شیر حمام"
                  />
                  <p className="mt-2 text-[11px] text-slate-400">
                    با کاما جدا کن.
                  </p>
                </div>

                <div>
                  <label className={labelClass}>Semantic Keywords</label>
                  <input
                    type="text"
                    {...register("semanticKeywords")}
                    className={inputClass}
                    placeholder="حمام مدرن, تجهیزات سرویس بهداشتی, دوش لوکس"
                  />
                  <p className="mt-2 text-[11px] text-slate-400">
                    کلمات معنایی مرتبط با محصول.
                  </p>
                </div>
              </div>
            </section>

            {/* سوالات متداول */}
            <section className="rounded-3xl border border-slate-200 bg-white p-5">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-slate-800">
                    سوالات متداول محصول
                  </h3>
                  <p className="mt-1 text-xs text-slate-400">
                    برای FAQ Schema و تجربه کاربری محصول خیلی خوبه.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={addFaq}
                  className="inline-flex items-center gap-2 rounded-2xl bg-indigo-50 px-4 py-2 text-xs font-medium text-indigo-700 transition-all hover:bg-indigo-100"
                >
                  <MdAdd size={17} />
                  افزودن سوال
                </button>
              </div>

              <div className="space-y-4">
                {faq.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-xs font-medium text-slate-500">
                        سوال {index + 1}
                      </p>

                      {faq.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFaq(index)}
                          className="inline-flex items-center gap-1 rounded-xl bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-600 transition-all hover:bg-rose-100"
                        >
                          <MdDeleteOutline size={17} />
                          حذف
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      <input
                        type="text"
                        value={item.question}
                        onChange={(e) =>
                          updateFaq(index, "question", e.target.value)
                        }
                        className={inputClass}
                        placeholder="سوال"
                      />

                      <input
                        type="text"
                        value={item.answer}
                        onChange={(e) =>
                          updateFaq(index, "answer", e.target.value)
                        }
                        className={inputClass}
                        placeholder="جواب"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* دکمه‌های پایین */}
            <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-slate-200 bg-white/95 pt-5 backdrop-blur">
              <button
                type="button"
                onClick={onClose}
                disabled={saving}
                className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                انصراف
              </button>

              <button
                type="submit"
                disabled={saving}
                className="rounded-2xl bg-linear-to-l from-sky-500 to-indigo-500 px-5 py-3 text-sm font-medium text-white shadow-sm transition-all hover:shadow-md disabled:cursor-not-allowed disabled:opacity-70"
              >
                {saving ? "در حال ذخیره..." : "ذخیره تغییرات"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditProductModal