'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import {
  Save,
  Phone,
  MapPin,
  Send,
  ShoppingCart,
  Award,
  Package,
  Users,
  Globe,
  FileText,
  Image as ImageIcon,
} from 'lucide-react'
import { BsInstagram } from 'react-icons/bs'
import { ISiteInfo } from '@/types/SiteInfoDto'
import {
  getSiteInfoAdminApi,
  updateSiteInfoAdminApi,
  uploadAboutImage,
} from '@/services/admin/siteInfoServices'
import Image from 'next/image'

const inputClass =
  'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-all focus:border-sky-400 focus:ring-4 focus:ring-sky-100'

const labelClass = 'mb-2 block text-xs font-medium text-slate-500'

const sectionClass =
  'rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'

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

  useEffect(() => {
    if (!imageFile) return

    const objectUrl = URL.createObjectURL(imageFile)
    setImagePreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [imageFile])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    setImageFile(file)
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
    <div className="min-h-screen bg-slate-50" dir="rtl">
      <main className="mx-auto max-w-5xl p-8">
        <header className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900">تنظیمات اطلاعات پایه</h1>
            <p className="mt-1 text-sm text-slate-500">
              مدیریت محتوای اصلی سایت و شبکه‌های اجتماعی
            </p>
          </div>

          <button
            type="submit"
            form="info-form"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-2xl bg-linear-to-l from-sky-500 to-indigo-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:shadow-md disabled:opacity-60"
          >
            <Save size={16} />
            {loading ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
          </button>
        </header>

        <form id="info-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <section className={sectionClass}>
            <h2 className="mb-5 flex items-center gap-2 text-sm font-semibold text-slate-800">
              <Phone size={18} className="text-sky-500" />
              ارتباطات پایه
            </h2>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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
                  <MapPin className="absolute right-3 top-3.5 text-slate-400" size={16} />
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

          <section className={sectionClass}>
            <h2 className="mb-5 flex items-center gap-2 text-sm font-semibold text-slate-800">
              <Globe size={18} className="text-indigo-500" />
              شبکه‌های اجتماعی و لینک‌ها
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className={labelClass}>اینستاگرام</label>
                <div className="relative">
                  <BsInstagram className="absolute right-3 top-3.5 text-slate-400" size={15} />
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
                  <Send className="absolute right-3 top-3.5 text-slate-400" size={15} />
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
                  <ShoppingCart className="absolute right-3 top-3.5 text-slate-400" size={15} />
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

          <section className={sectionClass}>
            <h2 className="mb-5 flex items-center gap-2 text-sm font-semibold text-slate-800">
              <Award size={18} className="text-amber-500" />
              شاخص‌های عملکرد
            </h2>

            <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
              {[
                {
                  label: 'سال سابقه',
                  field: 'yearsOfExperience',
                  icon: <Award size={14} />,
                  color: 'text-amber-500',
                },
                {
                  label: 'محصول تحویلی',
                  field: 'deliveredProducts',
                  icon: <Package size={14} />,
                  color: 'text-sky-500',
                },
                {
                  label: 'مشتری اعتماد کرده',
                  field: 'trustedCustomers',
                  icon: <Users size={14} />,
                  color: 'text-emerald-500',
                },
                {
                  label: 'کشور تحت پوشش',
                  field: 'coveredCountries',
                  icon: <Globe size={14} />,
                  color: 'text-violet-500',
                },
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

          <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className={`${sectionClass} flex flex-col`}>
              <label className={labelClass}>تصویر درباره ما</label>
              <label className="mt-2 flex min-h-[180] flex-1 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 transition-colors hover:border-sky-400 group">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="preview"
                    className="h-full w-full rounded-2xl object-cover"
                  />
                ) : (
                  <>
                    <ImageIcon
                      className="mb-2 text-slate-400 transition-colors group-hover:text-sky-500"
                      size={36}
                    />
                    <span className="text-xs text-slate-500">کلیک برای آپلود</span>
                  </>
                )}
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
            </div>

            <div className={`${sectionClass} space-y-4 lg:col-span-2`}>
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
                  <FileText size={14} className="text-sky-500" />
                  متن صفحه اصلی (Hero)
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
