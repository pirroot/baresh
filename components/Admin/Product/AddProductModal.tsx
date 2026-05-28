'use client'
import React, { useState } from 'react';
import { MdAdd, MdClose } from 'react-icons/md';

export interface IProduct {
  id: number;
  title: string;
  slug: string;
  category: string;
  image: string;
  catalogPdf: string;
  description: string;
  product_description: string;
  features: string[];
  seoTitle?: string | null;
  seoDescription?: string | null;
  keywords: string[];
  createdAt: Date;
  updatedAt: Date;
}

const inputClass = `
  w-full px-3 py-2.5 rounded-lg border border-gray-200
  bg-blue-400/20 text-white text-sm placeholder-white/80
  outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100
  transition-all duration-150
`;

const labelClass = "block text-sm text-gray-500 mb-1";

const AddProductModal = () => {
  const [open, isOpen] = useState<boolean>(false);
  const [form, setForm] = useState({
    title: '',
    slug: '',
    category: '',
    description: '',
    product_description: '',
    features: '',
    keywords: '',
    seoTitle: '',
    seoDescription: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    isOpen(false);
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => isOpen(false)}
        >
          <div
            className="relative w-full max-w-xl mx-4 bg-zinc-700/40 text-white rounded-2xl shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-base font-semibold ">افزودن محصول جدید</h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>عنوان محصول</label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="مثال: لپ‌تاپ دل"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>اسلاگ</label>
                  <input
                    type="text"
                    name="slug"
                    value={form.slug}
                    onChange={handleChange}
                    placeholder="dell-laptop"
                    className={inputClass}
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>دسته‌بندی</label>
                <input
                  type="text"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  placeholder="مثال: الکترونیک"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>توضیح کوتاه</label>
                <input
                  type="text"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="یک خط توضیح"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>توضیح کامل محصول</label>
                <textarea
                  name="product_description"
                  value={form.product_description}
                  onChange={handleChange}
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
                    name="features"
                    value={form.features}
                    onChange={handleChange}
                    placeholder="با کاما جدا کنید"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>کلمات کلیدی</label>
                  <input
                    type="text"
                    name="keywords"
                    value={form.keywords}
                    onChange={handleChange}
                    placeholder="با کاما جدا کنید"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>عنوان SEO</label>
                  <input
                    type="text"
                    name="seoTitle"
                    value={form.seoTitle}
                    onChange={handleChange}
                    placeholder="اختیاری"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>توضیح SEO</label>
                  <input
                    type="text"
                    name="seoDescription"
                    value={form.seoDescription}
                    onChange={handleChange}
                    placeholder="اختیاری"
                    className={inputClass}
                  />
                </div>
              </div>

            </form>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-700">
              <button
                type="button"
                onClick={() => isOpen(false)}
                className="px-4 py-2 text-sm  hover:text-gray-800 rounded-lg hover:bg-gray-100 transition-colors"
              >
                انصراف
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 active:scale-95 transition-all"
              >
                ذخیره محصول
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProductModal;