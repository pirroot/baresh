'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import {
  Save, Phone, MapPin, Send, ShoppingCart,
  Award, Package, Users, Globe, FileText, Image as ImageIcon
} from 'lucide-react'
import { BsInstagram } from 'react-icons/bs'
import { ISiteInfo } from '@/types/SiteInfoDto'
import {
  getSiteInfoAdminApi,
  updateSiteInfoAdminApi,
  uploadAboutImage,
} from '@/services/admin/siteInfoServices'

const inputClass =
  'w-full bg-gray-950 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-all text-white placeholder-gray-600'

const labelClass = 'text-sm text-gray-400 mb-1 block'

export default function AdminInfoPage() {
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const router = useRouter()

  const { register, handleSubmit, reset } = useForm<ISiteInfo>()

  useEffect(() => {
    getSiteInfoAdminApi().then((data) => {
      if (data) {
        reset(data)
        if (data.aboutImage) setImagePreview(data.aboutImage)
      }
    })
  }, [reset])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    setImageFile(file)
    if (file) setImagePreview(URL.createObjectURL(file))
  }

  const onSubmit = async (data: ISiteInfo) => {
    setLoading(true)
    try {
      let aboutImage = data.aboutImage
      if (imageFile) {
        const uploaded = await uploadAboutImage(imageFile)
        aboutImage = uploaded.image
      }
      await updateSiteInfoAdminApi({ ...data, aboutImage })
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white" dir="rtl">
      <main className="p-8 max-w-5xl mx-auto">

        {/* Header */}
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-100">تنظیمات اطلاعات پایه</h1>
            <p className="text-gray-400 text-sm mt-1">مدیریت محتوای اصلی سایت و شبکه‌های اجتماعی</p>
          </div>
          <button
            type="submit"
            form="info-form"
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-colors px-6 py-2.5 rounded-xl font-medium text-sm"
          >
            <Save size={16} />
            {loading ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
          </button>
        </header>

        <form id="info-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* ارتباطات پایه */}
          <section className="bg-gray-900 border border-white/10 rounded-2xl p-6">
            <h2 className="text-base font-semibold mb-5 flex items-center gap-2 text-blue-400">
              <Phone size={18} /> ارتباطات پایه
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>شماره تماس</label>
                <input
                  type="text"
                  placeholder="021-XXXXXXXX"
                  {...register('phone')}
                  className={inputClass}
                  dir="ltr"
                />
              </div>
              <div>
                <label className={labelClass}>آدرس کارخانه</label>
                <div className="relative">
                  <MapPin className="absolute right-3 top-3.5 text-gray-500" size={16} />
                  <input
                    type="text"
                    placeholder="استان، شهر، شهرک صنعتی..."
                    {...register('factoryAddress')}
                    className={`${inputClass} pr-9`}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* شبکه‌های اجتماعی */}
          <section className="bg-gray-900 border border-white/10 rounded-2xl p-6">
            <h2 className="text-base font-semibold mb-5 flex items-center gap-2 text-pink-400">
              <Globe size={18} /> شبکه‌های اجتماعی و لینک‌ها
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className={labelClass}>اینستاگرام</label>
                <div className="relative">
                  <BsInstagram className="absolute right-3 top-3.5 text-gray-500" size={15} />
                  <input
                    type="text"
                    placeholder="username"
                    {...register('instagram')}
                    className={`${inputClass} pr-9 py-2.5 text-sm`}
                    dir="ltr"
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>تلگرام</label>
                <div className="relative">
                  <Send className="absolute right-3 top-3.5 text-gray-500" size={15} />
                  <input
                    type="text"
                    placeholder="@username"
                    {...register('telegram')}
                    className={`${inputClass} pr-9 py-2.5 text-sm`}
                    dir="ltr"
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>بله</label>
                <input
                  type="text"
                  placeholder="ID Bale"
                  {...register('bale')}
                  className={`${inputClass} py-2.5 text-sm`}
                  dir="ltr"
                />
              </div>
              <div>
                <label className={labelClass}>لینک فروشگاه</label>
                <div className="relative">
                  <ShoppingCart className="absolute right-3 top-3.5 text-gray-500" size={15} />
                  <input
                    type="url"
                    placeholder="https://..."
                    {...register('shopUrl')}
                    className={`${inputClass} pr-9 py-2.5 text-sm`}
                    dir="ltr"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* شاخص‌های عملکرد */}
          <section className="bg-gray-900 border border-white/10 rounded-2xl p-6">
            <h2 className="text-base font-semibold mb-5 flex items-center gap-2 text-yellow-400">
              <Award size={18} /> شاخص‌های عملکرد
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { label: 'سال سابقه', field: 'yearsOfExperience', icon: <Award size={14} />, color: 'text-yellow-400' },
                { label: 'محصول تحویلی', field: 'deliveredProducts', icon: <Package size={14} />, color: 'text-blue-400' },
                { label: 'مشتری اعتماد کرده', field: 'trustedCustomers', icon: <Users size={14} />, color: 'text-green-400' },
                { label: 'کشور تحت پوشش', field: 'coveredCountries', icon: <Globe size={14} />, color: 'text-purple-400' },
              ].map((stat) => (
                <div key={stat.field}>
                  <label className={`${labelClass} flex items-center gap-1.5`}>
                    <span className={stat.color}>{stat.icon}</span>
                    {stat.label}
                  </label>
                  <input
                    type="number"
                    min={0}
                    {...register(stat.field as keyof ISiteInfo, { valueAsNumber: true })}
                    className={inputClass}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* درباره ما */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* آپلود تصویر */}
            <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 flex flex-col">
              <label className={labelClass}>تصویر درباره ما</label>
              <label className="flex-1 mt-2 bg-gray-950 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500/50 transition-colors group min-h-[180] overflow-hidden">
                {imagePreview ? (
                  <img src={imagePreview} alt="preview" className="w-full h-full object-cover rounded-2xl" />
                ) : (
                  <>
                    <ImageIcon className="text-gray-600 group-hover:text-blue-500 mb-2 transition-colors" size={36} />
                    <span className="text-xs text-gray-500">کلیک برای آپلود</span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            {/* متون */}
            <div className="lg:col-span-2 bg-gray-900 border border-white/10 rounded-2xl p-6 space-y-4">
              <div>
                <label className={labelClass}>عنوان درباره ما</label>
                <input
                  type="text"
                  {...register('aboutTitle')}
                  className={inputClass}
                  placeholder="مثال: درباره شرکت ما"
                />
              </div>
              <div>
                <label className={labelClass}>متن درباره ما</label>
                <textarea
                  rows={3}
                  {...register('aboutText')}
                  className={`${inputClass} resize-none`}
                  placeholder="توضیحات درباره شرکت..."
                />
              </div>
              <div>
                <label className={`${labelClass} flex items-center gap-1.5`}>
                  <FileText size={14} className="text-blue-400" /> متن صفحه اصلی (Hero)
                </label>
                <textarea
                  rows={3}
                  {...register('homePageText')}
                  className={`${inputClass} resize-none`}
                  placeholder="متن hero section..."
                />
              </div>
            </div>
          </section>

        </form>
      </main>
    </div>
  )
}