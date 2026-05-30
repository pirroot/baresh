"use client"

import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { IProduct } from "@/types/ProductDto"
import { updateProductAdminApi, uploadProductImage, uploadProductPdf } from "@/services/admin/adminServices"
import { useState } from "react"

const inputClass = `
  w-full px-3 py-2.5 rounded-lg border border-gray-200
  bg-blue-400/20 text-white text-sm placeholder-white/80
  outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100
  transition-all duration-150
`
const labelClass = "block text-sm text-gray-500 mb-1"

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
    if (typeof val === "string") return val.split(",").map((k) => k.trim()).filter(Boolean)
    return []
  }


  const onSubmit = async (data: IProduct) => {
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


    // ...
    await updateProductAdminApi(product.id, {
      ...data,
      features: toArray(data.features),
      keywords: toArray(data.keywords),
      image: imagePath,
      catalogPdf: pdfPath,
    })

    onClose()
    router.refresh()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl mx-4 bg-zinc-700/40 text-white rounded-2xl shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold">ویرایش محصول</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>عنوان محصول</label>
              <input type="text" {...register("title", { required: true })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>دسته‌بندی</label>
              <input type="text" {...register("category", { required: true })} className={inputClass} />
            </div>
          </div>

          <div>
            <label className={labelClass}>توضیح کوتاه</label>
            <input type="text" {...register("description", { required: true })} className={inputClass} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>عکس محصول (اختیاری)</label>
              <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>کاتالوگ (اختیاری)</label>
              <input type="file" accept="application/pdf" onChange={(e) => setPdf(e.target.files?.[0] ?? null)} className={inputClass} />
            </div>
          </div>

          <div>
            <label className={labelClass}>توضیح کامل</label>
            <textarea {...register("product_description", { required: true })} rows={3} className={`${inputClass} resize-none`} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>ویژگی‌ها</label>
              <input type="text" {...register("features")} placeholder="با کاما جدا کنید" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>کلمات کلیدی</label>
              <input type="text" {...register("keywords")} placeholder="با کاما جدا کنید" className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>عنوان SEO</label>
              <input type="text" {...register("seoTitle")} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>توضیح SEO</label>
              <input type="text" {...register("seoDescription")} className={inputClass} />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button type="submit" className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all">
              ذخیره تغییرات
            </button>
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm hover:text-gray-800 rounded-lg hover:bg-gray-100 transition-colors">
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}