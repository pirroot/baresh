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
  'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-all focus:border-sky-400 focus:ring-4 focus:ring-sky-100'

const labelClass = 'mb-2 block text-xs font-medium text-slate-500'

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
    await fetchPosts()
  }

  const watchTitle = watch('title')

  useEffect(() => {
    if (!editingId && watchTitle) {
      setValue('slug', titleToSlug(watchTitle))
    }
  }, [watchTitle, editingId, setValue])

  return (
    <div dir="rtl" className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-2 text-sm font-medium text-sky-600">مدیریت محتوا</p>
          <h1 className="text-2xl font-bold text-slate-900">مدیریت بلاگ</h1>
          <p className="mt-1 text-sm text-slate-500">
            {posts.length.toLocaleString('fa-IR')} پست در مجموع
          </p>
        </div>

        <button
          onClick={openCreate}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-sky-500 to-indigo-500 px-5 py-3 text-sm font-medium text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
        >
          <MdAdd size={18} />
          پست جدید
        </button>
      </div>

      {/* Table / List */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-5">
          <h2 className="text-base font-bold text-slate-900">لیست پست‌ها</h2>
          <p className="mt-1 text-xs text-slate-400">
            مشاهده، ویرایش و حذف پست‌های بلاگ
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px]">
            <thead className="bg-slate-50">
              <tr className="border-b border-slate-200">
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500">
                  پست
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500">
                  دسته‌بندی
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500">
                  زمان مطالعه
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500">
                  تاریخ
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500">
                  عملیات
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-14 text-center text-sm text-slate-400">
                    در حال بارگذاری...
                  </td>
                </tr>
              ) : posts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-14 text-center text-sm text-slate-400">
                    پستی یافت نشد
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr
                    key={post.id}
                    className="transition-colors hover:bg-slate-50/80"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {post.image ? (
                          <img
                            src={post.image}
                            alt={post.title}
                            className="h-12 w-12 rounded-xl border border-slate-200 object-cover bg-slate-100"
                          />
                        ) : (
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-xs text-slate-400">
                            بدون تصویر
                          </div>
                        )}

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-800">
                            {post.title}
                          </p>
                          <code className="mt-1 block truncate text-xs text-slate-400" dir="ltr">
                            {post.slug}
                          </code>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700 ring-1 ring-sky-100">
                        {post.category}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-xs text-slate-500">
                      {post.readTime} دقیقه
                    </td>

                    <td className="px-6 py-4 text-xs text-slate-400">
                      {post.date
                        ? new Date(post.date).toLocaleDateString('fa-IR')
                        : '-'}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEdit(post)}
                          className="rounded-xl p-2 text-slate-500 transition-all hover:bg-sky-50 hover:text-sky-600"
                          title="ویرایش"
                        >
                          <MdEdit size={18} />
                        </button>

                        <button
                          onClick={() => setDeleteId(post.id!)}
                          className="rounded-xl p-2 text-slate-500 transition-all hover:bg-red-50 hover:text-red-500"
                          title="حذف"
                        >
                          <MdDelete size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 backdrop-blur-sm p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/95 px-6 py-5 backdrop-blur">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  {editingId ? 'ویرایش پست' : 'پست جدید'}
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  اطلاعات مقاله را کامل و دقیق وارد کنید
                </p>
              </div>

              <button
                onClick={() => setModalOpen(false)}
                className="rounded-xl p-2 text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-700"
              >
                <MdClose size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className={labelClass}>عنوان *</label>
                  <input
                    type="text"
                    {...register('title', { required: true })}
                    className={inputClass}
                    placeholder="عنوان پست"
                  />
                </div>

                <div>
                  <label className={labelClass}>Slug *</label>
                  <input
                    type="text"
                    {...register('slug', { required: true })}
                    className={inputClass}
                    placeholder="post-slug"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                    className={`${inputClass} file:ml-3 file:rounded-xl file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-xs file:font-medium file:text-slate-600 hover:file:bg-slate-200`}
                  />
                </div>

                <div>
                  <label className={labelClass}>دسته‌بندی *</label>
                  <input
                    type="text"
                    {...register('category', { required: true })}
                    className={inputClass}
                    placeholder="مثال: آموزش"
                  />
                </div>
              </div>

              {imagePreview && (
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <img
                    src={imagePreview}
                    alt="preview"
                    className="h-32 w-full rounded-xl object-cover"
                  />
                </div>
              )}

              <div>
                <label className={labelClass}>محتوا *</label>
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                  <Controller
                    name="content"
                    control={control}
                    rules={{ required: 'محتوا الزامی است' }}
                    render={({ field, fieldState }) => (
                      <div className="p-2">
                        <RichEditor value={field.value || ''} onChange={field.onChange} />
                        {fieldState.error && (
                          <p className="mt-2 text-sm text-red-500">
                            {fieldState.error.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className={labelClass}>عنوان SEO</label>
                  <input
                    type="text"
                    {...register('seoTitle')}
                    className={inputClass}
                    placeholder="عنوان سئو"
                  />
                </div>

                <div>
                  <label className={labelClass}>کلمات کلیدی</label>
                  <input
                    type="text"
                    {...register('keywords')}
                    className={inputClass}
                    placeholder="react, nextjs, seo"
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>توضیح SEO</label>
                <textarea
                  {...register('seoDescription')}
                  rows={3}
                  className={`${inputClass} resize-none`}
                  placeholder="توضیح کوتاه برای موتورهای جستجو"
                />
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-2xl px-4 py-2.5 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
                >
                  انصراف
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-l from-sky-500 to-indigo-500 px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving ? (
                    'در حال ذخیره...'
                  ) : (
                    <>
                      <MdCheck size={16} />
                      ذخیره
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-500">
              <MdDelete size={22} />
            </div>

            <h3 className="text-lg font-bold text-slate-900">حذف پست</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              آیا از حذف این پست مطمئن هستی؟ این عملیات قابل بازگشت نیست.
            </p>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="rounded-2xl px-4 py-2.5 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
              >
                انصراف
              </button>

              <button
                onClick={() => handleDelete(deleteId)}
                className="rounded-2xl bg-red-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-600"
              >
                حذف پست
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
