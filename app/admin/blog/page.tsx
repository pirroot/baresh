'use client'

import { useState, useEffect, useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { MdAdd, MdEdit, MdDelete, MdClose, MdCheck } from 'react-icons/md'
import { IPost } from '@/types/PostDto'
import {
  getBlogAdminApi,
  createBlogAdminApi,
  updateBlogAdminApi,
  deleteBlogAdminApi,
  uploadBlogImage,
} from '@/services/admin/blogServices'
import RichEditor from '@/components/RichEditor'
import sanitizeHtml from 'sanitize-html'

const inputClass =
  'w-full bg-gray-800 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30 placeholder-white/20'
const labelClass = 'text-xs text-white/50 mb-1.5 block'

type BlogFormValues = Omit<IPost, 'keywords'> & {
  keywords: string
}

const toArray = (val: unknown): string[] => {
  if (Array.isArray(val)) return val
  if (typeof val === 'string') {
    return val
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean)
  }
  return []
}

function getReadingTime(html: string) {
  const text = html.replace(/<[^>]*>/g, ' ')
  const words = text.trim().split(/\s+/).filter(Boolean).length
  const wpm = 200
  return String(Math.max(1, Math.ceil(words / wpm)))
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<IPost[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    control,
  } = useForm<BlogFormValues>({
    defaultValues: {
      title: '',
      slug: '',
      content: '',
      category: '',
      image: '',
      readTime: '',
      seoTitle: '',
      seoDescription: '',
      keywords: '',
    },
  })

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getBlogAdminApi()
      setPosts(data.result ?? [])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const titleToSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9\u0600-\u06FF-]/g, '')
      .slice(0, 60)

  const openCreate = () => {
    setEditingId(null)
    setImageFile(null)
    setImagePreview(null)

    reset({
      title: '',
      slug: '',
      content: '',
      category: '',
      image: '',
      readTime: '',
      seoTitle: '',
      seoDescription: '',
      keywords: '',
    })

    setModalOpen(true)
  }

  const openEdit = (post: IPost) => {
    setEditingId(post.id ?? null)
    setImageFile(null)
    setImagePreview(post.image ?? null)

    reset({
      ...post,
      content: post.content || '',
      keywords: Array.isArray(post.keywords)
        ? post.keywords.join(', ')
        : String(post.keywords ?? ''),
    })

    setModalOpen(true)
  }

  const onSubmit = async (data: BlogFormValues) => {
    const cleanContent = sanitizeHtml(data.content || '', {
      allowedTags: [
        'h1',
        'h2',
        'h3',
        'p',
        'strong',
        'em',
        'ul',
        'ol',
        'li',
        'a',
        'pre',
        'code',
        'blockquote',
      ],
      allowedAttributes: {
        a: ['href', 'target', 'rel'],
      },
    })

    setSaving(true)
    try {
      let image = data.image

      if (imageFile) {
        const uploaded = await uploadBlogImage(imageFile)
        image = uploaded.image
      }

      const payload: IPost = {
        ...data,
        content: cleanContent,
        image,
        seoTitle: data.seoTitle || data.title,
        readTime: getReadingTime(cleanContent),
        keywords: toArray(data.keywords),
      }

      if (editingId) {
        await updateBlogAdminApi(editingId, payload)
      } else {
        await createBlogAdminApi(payload)
      }

      setModalOpen(false)
      await fetchPosts()
      router.refresh()
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    await deleteBlogAdminApi(id)
    setDeleteId(null)
    fetchPosts()
  }

  const watchTitle = watch('title')
  useEffect(() => {
    if (!editingId && watchTitle) {
      setValue('slug', titleToSlug(watchTitle))
    }
  }, [watchTitle, editingId, setValue])

  return (
    <div dir="rtl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">مدیریت بلاگ</h1>
          <p className="text-white/40 text-sm mt-1">{posts.length} پست در مجموع</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-white text-gray-900 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-white/90 transition-colors"
        >
          <MdAdd size={18} /> پست جدید
        </button>
      </div>

      <div className="bg-gray-900 border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-right text-xs text-white/40 font-medium px-6 py-4">پست</th>
              <th className="text-right text-xs text-white/40 font-medium px-6 py-4">دسته‌بندی</th>
              <th className="text-right text-xs text-white/40 font-medium px-6 py-4">زمان مطالعه</th>
              <th className="text-right text-xs text-white/40 font-medium px-6 py-4">تاریخ</th>
              <th className="text-right text-xs text-white/40 font-medium px-6 py-4">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-12 text-white/30 text-sm">
                  در حال بارگذاری...
                </td>
              </tr>
            ) : posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-12 text-white/30 text-sm">
                  پستی یافت نشد
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {post.image && (
                        <img src={post.image} alt={post.title} className="w-12 h-12 rounded-lg object-cover bg-white/5" />
                      )}
                      <div>
                        <p className="text-sm text-white font-medium">{post.title}</p>
                        <code className="text-xs text-white/30">{post.slug}</code>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs bg-white/5 text-white/60 px-2.5 py-1 rounded-full">{post.category}</span>
                  </td>
                  <td className="px-6 py-4 text-xs text-white/40">{post.readTime}</td>
                  <td className="px-6 py-4 text-xs text-white/30">
                    {post.date ? new Date(post.date).toLocaleDateString('fa-IR') : '-'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEdit(post)}
                        className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"
                      >
                        <MdEdit size={16} />
                      </button>
                      <button
                        onClick={() => setDeleteId(post.id!)}
                        className="p-1.5 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-all"
                      >
                        <MdDelete size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-base font-semibold">{editingId ? 'ویرایش پست' : 'پست جدید'}</h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"
              >
                <MdClose size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>عنوان *</label>
                  <input type="text" {...register('title', { required: true })} className={inputClass} placeholder="عنوان پست" />
                </div>
                <div>
                  <label className={labelClass}>Slug *</label>
                  <input type="text" {...register('slug', { required: true })} className={inputClass} placeholder="post-slug" dir="ltr" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>تصویر کاور</label>
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
                </div>

                <div>
                  <label className={labelClass}>دسته‌بندی *</label>
                  <input type="text" {...register('category', { required: true })} className={inputClass} placeholder="مثال: آموزش" />
                </div>
              </div>

              {imagePreview && (
                <img src={imagePreview} alt="preview" className="mt-2 h-24 rounded-lg object-cover" />
              )}

              <div>
                <label className={labelClass}>محتوا *</label>
                <Controller
                  name="content"
                  control={control}
                  rules={{ required: 'محتوا الزامی است' }}
                  render={({ field, fieldState }) => (
                    <>
                      <RichEditor value={field.value || ''} onChange={field.onChange} />
                      {fieldState.error && (
                        <p className="mt-1 text-sm text-red-500">{fieldState.error.message}</p>
                      )}
                    </>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>عنوان SEO</label>
                  <input type="text" {...register('seoTitle')} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>کلمات کلیدی</label>
                  <input type="text" {...register('keywords')} className={inputClass} placeholder="react, nextjs, seo" />
                </div>
              </div>

              <div>
                <label className={labelClass}>توضیح SEO</label>
                <textarea {...register('seoDescription')} rows={2} className={`${inputClass} resize-none`} />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-sm text-white/50 hover:text-white transition-colors"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 bg-white text-gray-900 px-5 py-2 rounded-lg text-sm font-medium hover:bg-white/90 disabled:opacity-50 transition-colors"
                >
                  {saving ? 'در حال ذخیره...' : <><MdCheck size={16} /> ذخیره</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
