'use client'

import { useState, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { MdAdd, MdEdit, MdDelete, MdClose, MdCheck } from 'react-icons/md'
import { ISlider } from '@/types/SliderDto'
import {
  getSliderAdminApi,
  createSliderAdminApi,
  updateSliderAdminApi,
  deleteSliderAdminApi,
  uploadSliderImage,
} from '@/services/admin/sliderServices'

const inputClass = 'w-full bg-gray-800 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30 placeholder-white/20'
const labelClass = 'text-xs text-white/50 mb-1.5 block'

export default function AdminSliderPage() {
  const [sliders, setSliders] = useState<ISlider[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
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

  useEffect(() => { fetchSliders() }, [fetchSliders])

  const openCreate = () => {
    setEditingId(null)
    setImageFile(null)
    setImagePreview(null)
    reset({ title: '', alt: '', short_description: '', image: '' })
    setModalOpen(true)
  }

  const openEdit = (slider: ISlider) => {
    setEditingId(slider.id ?? null)
    setImageFile(null)
    setImagePreview(slider.image ?? null)
    reset(slider)
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

      const payload = { ...data, image }

      if (editingId) {
        await updateSliderAdminApi(editingId, payload)
      } else {
        await createSliderAdminApi(payload)
      }

      setModalOpen(false)
      fetchSliders()
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    await deleteSliderAdminApi(id)
    setDeleteId(null)
    fetchSliders()
  }

  return (
    <div dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">مدیریت اسلایدر</h1>
          <p className="text-white/40 text-sm mt-1">{sliders.length} اسلاید در مجموع</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-white text-gray-900 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-white/90 transition-colors">
          <MdAdd size={18} /> اسلاید جدید
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <p className="text-white/30 text-sm text-center py-12">در حال بارگذاری...</p>
      ) : sliders.length === 0 ? (
        <p className="text-white/30 text-sm text-center py-12">اسلایدی ثبت نشده</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sliders.map((slider) => (
            <div key={slider.id} className="bg-gray-900 border border-white/10 rounded-xl overflow-hidden">
              <div className="relative aspect-video bg-gray-800">
                <img src={slider.image} alt={slider.alt} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <p className="text-sm font-medium text-white mb-1">{slider.title}</p>
                <p className="text-xs text-white/40 line-clamp-2">{slider.short_description}</p>
                <div className="flex items-center gap-2 mt-4">
                  <button onClick={() => openEdit(slider)} className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all">
                    <MdEdit size={16} />
                  </button>
                  <button onClick={() => setDeleteId(slider.id!)} className="p-1.5 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-all">
                    <MdDelete size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-base font-semibold">{editingId ? 'ویرایش اسلاید' : 'اسلاید جدید'}</h2>
              <button onClick={() => setModalOpen(false)} className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all">
                <MdClose size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              <div>
                <label className={labelClass}>عنوان *</label>
                <input type="text" {...register('title', { required: true })} className={inputClass} placeholder="عنوان اسلاید" />
              </div>

              <div>
                <label className={labelClass}>متن Alt تصویر *</label>
                <input type="text" {...register('alt', { required: true })} className={inputClass} placeholder="توضیح تصویر برای SEO" />
              </div>

              <div>
                <label className={labelClass}>توضیح کوتاه</label>
                <textarea {...register('short_description')} rows={3} className={`${inputClass} resize-none`} placeholder="توضیح کوتاه اسلاید..." />
              </div>

              <div>
                <label className={labelClass}>تصویر *</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const f = e.target.files?.[0] ?? null
                    setImageFile(f)
                    if (f) setImagePreview(URL.createObjectURL(f))
                  }}
                  className={inputClass}
                />
                {imagePreview && (
                  <img src={imagePreview} alt="preview" className="mt-2 w-full aspect-video object-cover rounded-lg" />
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-2 border-t border-white/10">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm text-white/50 hover:text-white transition-colors">
                  انصراف
                </button>
                <button type="submit" disabled={saving} className="flex items-center gap-2 bg-white text-gray-900 px-5 py-2 rounded-lg text-sm font-medium hover:bg-white/90 disabled:opacity-50 transition-colors">
                  {saving ? 'در حال ذخیره...' : <><MdCheck size={16} /> ذخیره</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 w-full max-w-sm">
            <h3 className="text-base font-semibold mb-2">حذف اسلاید</h3>
            <p className="text-sm text-white/50 mb-6">آیا مطمئن هستید؟ این عملیات قابل بازگشت نیست.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-sm text-white/50 hover:text-white transition-colors">انصراف</button>
              <button onClick={() => handleDelete(deleteId)} className="px-4 py-2 text-sm bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors">حذف کن</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}