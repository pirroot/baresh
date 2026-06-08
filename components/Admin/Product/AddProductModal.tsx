'use client'
import { useState } from 'react';
import { redirect } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { MdAdd } from 'react-icons/md';
import { IProduct } from '@/types/ProductDto';
import { createProductAdminApi, uploadProductImage, uploadProductPdf } from '@/services/admin/adminServices';



const inputClass = `
  w-full px-3 py-2.5 rounded-lg border border-gray-200
  bg-blue-400/20 text-white text-sm placeholder-white/80
  outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100
  transition-all duration-150
`;

const labelClass = "block text-sm text-gray-500 mb-1";

const AddProductModal = () => {
  const [open, isOpen] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<IProduct>()
  const [file, setFile] = useState<File | null>(null)
  const [pdf, setPDf] = useState<File | null>(null)

  const upload_Image_file = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    setFile(selected);
  };

  const upload_Pdf_file = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pdf = e.target.files?.[0] ?? null
    setPDf(pdf)
  }

  const onSubmit = async (data: IProduct) => {
    let imagePath = '';
    let pdfPath = ''

    if (file) {
      const uploaded = await uploadProductImage(file);
      imagePath = uploaded.image;
    }

    if (pdf) {
      const pdf_uploaded = await uploadProductPdf(pdf)
      pdfPath = pdf_uploaded.pdf
    }

    await createProductAdminApi({
      ...data,
      seoTitle: data.title,

      slug: data.title
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9\u0600-\u06FF-]/g, "")
        .slice(0, 60) + `-${Math.floor(Math.random() * 10000)}`,
      features: (data.features as unknown as string).split('-').map((k) => k.trim()).filter((k) => k !== ''),
      keywords: (data.keywords as unknown as string).split('-').map((k) => k.trim()).filter((k) => k !== ''),
      image: imagePath,
      catalogPdf: pdfPath,
    });
    isOpen(false)
    redirect("/admin/products")
  };

  return (
    <div dir="rtl">
      <button
        className="flex items-center gap-2 bg-white text-gray-900 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-white/90 transition-colors"
        onClick={() => isOpen(true)}
      >
        <MdAdd size={18} />
        محصول جدید
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => isOpen(false)}
        >
          <div
            className="relative w-full max-w-xl mx-4 bg-zinc-900 border-2 text-white rounded-2xl shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-base font-semibold ">افزودن محصول جدید</h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>عنوان محصول</label>
                  <input
                    type="text"
                    {...register('title', { required: true })}
                    placeholder="مثال: شیر آب"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>دسته‌بندی</label>
                  <input
                    type="text"
                    {...register("category", { required: true })}
                    placeholder="مثال: شیرآلات"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>توضیح کوتاه</label>
                <input
                  type="text"
                  {...register("description", { required: true })}
                  placeholder="یک خط توضیح کوتاه از محصول"
                  className={inputClass}
                />
              </div>


              <div>
                <label className={labelClass}>توضیح کامل محصول</label>
                <textarea
                  {...register("product_description", { required: true })}
                  placeholder="توضیحات کامل محصول را اینجا بنویسید..."
                  rows={3}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>ویژگی‌ها</label>
                  <input
                    type="text"
                    {...register('features', { required: true })}
                    placeholder="با کاما جدا کنید"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>کلمات کلیدی</label>
                  <input
                    type="text"
                    {...register('keywords', { required: true })}
                    placeholder="با کاما جدا کنید"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>توضیح SEO</label>
                <input
                  type="textarea"
                  {...register('seoDescription', { required: true })}
                  placeholder="برای بهبود فروش"
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>عکس محصول</label>
                  <input
                    type="file"
                    accept='image/*'
                    onChange={upload_Image_file}
                    className={`${inputClass} py-7`}
                    required
                  />
                </div>
                <div>
                  <label className={labelClass}>کاتالوگ محصول</label>
                  <input
                    type="file"
                    accept='application/pdf'
                    onChange={upload_Pdf_file}
                    className={`${inputClass} py-7`}
                  />
                </div>
              </div>

              <div className="flex items-center justify-start gap-2">
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 active:scale-95 transition-all"
                >
                  ذخیره محصول
                </button>
                <button
                  type="button"
                  onClick={() => isOpen(false)}
                  className="px-4 py-2 text-sm  hover:text-gray-800 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  انصراف
                </button>
              </div>
            </form>

          </div>
        </div >
      )}
    </div >
  );
};

export default AddProductModal;