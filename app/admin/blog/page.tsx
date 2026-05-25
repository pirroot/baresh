"use client";

// app/admin/blog/page.tsx

import { useState, useEffect, useCallback } from "react";
import {
  MdAdd,
  MdEdit,
  MdDelete,
  MdSearch,
  MdClose,
  MdCheck,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";

type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  published: boolean;
  createdAt: string;
};

type FormData = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  published: boolean;
};

const emptyForm: FormData = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImage: "",
  published: false,
};

export default function AdminBlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/admin/blog?page=${page}&limit=10&search=${search}`
      );
      const data = await res.json();
      setBlogs(data.blogs);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch {
      setError("خطا در دریافت پست‌ها");
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // تبدیل عنوان به slug فارسی-انگلیسی
  const titleToSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\u0600-\u06FF-]/g, "")
      .slice(0, 60);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setModalOpen(true);
  };

  const openEdit = async (id: string) => {
    setError("");
    const res = await fetch(`/api/admin/blog/${id}`);
    const blog: Blog = await res.json();
    setEditingId(id);
    setForm({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt ?? "",
      content: blog.content,
      coverImage: blog.coverImage ?? "",
      published: blog.published,
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.slug || !form.content) {
      setError("عنوان، slug و محتوا الزامی هستند");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const url = editingId
        ? `/api/admin/blog/${editingId}`
        : "/api/admin/blog";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "خطا در ذخیره");
        return;
      }
      setModalOpen(false);
      fetchBlogs();
    } catch {
      setError("خطا در ارتباط با سرور");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
      setDeleteId(null);
      fetchBlogs();
    } catch {
      setError("خطا در حذف پست");
    }
  };

  return (
    <div dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">مدیریت بلاگ</h1>
          <p className="text-white/40 text-sm mt-1">{total} پست در مجموع</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-white text-gray-900 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-white/90 transition-colors"
        >
          <MdAdd size={18} />
          پست جدید
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <MdSearch
          size={18}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30"
        />
        <input
          type="text"
          placeholder="جستجو در پست‌ها..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="w-full bg-gray-900 border border-white/10 rounded-lg pr-10 pl-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30"
        />
      </div>

      {/* Table */}
      <div className="bg-gray-900 border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-right text-xs text-white/40 font-medium px-6 py-4">عنوان</th>
              <th className="text-right text-xs text-white/40 font-medium px-6 py-4">slug</th>
              <th className="text-right text-xs text-white/40 font-medium px-6 py-4">وضعیت</th>
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
            ) : blogs.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-12 text-white/30 text-sm">
                  پستی یافت نشد
                </td>
              </tr>
            ) : (
              blogs.map((blog) => (
                <tr key={blog.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm text-white font-medium">{blog.title}</p>
                    {blog.excerpt && (
                      <p className="text-xs text-white/30 mt-0.5 truncate max-w-xs">{blog.excerpt}</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-xs text-white/40 bg-white/5 px-2 py-1 rounded">{blog.slug}</code>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1.5 text-xs w-fit px-2.5 py-1 rounded-full ${blog.published
                      ? "bg-green-500/10 text-green-400"
                      : "bg-amber-500/10 text-amber-400"
                      }`}>
                      {blog.published ? <MdVisibility size={13} /> : <MdVisibilityOff size={13} />}
                      {blog.published ? "منتشر" : "پیش‌نویس"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-white/30">
                    {new Date(blog.createdAt).toLocaleDateString("fa-IR")}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEdit(blog.id)}
                        className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"
                      >
                        <MdEdit size={16} />
                      </button>
                      <button
                        onClick={() => setDeleteId(blog.id)}
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
            <p className="text-xs text-white/30">
              صفحه {page} از {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-3 py-1.5 text-xs rounded-lg border border-white/10 text-white/50 disabled:opacity-30 hover:bg-white/5 transition-colors"
              >
                قبلی
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1.5 text-xs rounded-lg border border-white/10 text-white/50 disabled:opacity-30 hover:bg-white/5 transition-colors"
              >
                بعدی
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-base font-semibold">
                {editingId ? "ویرایش پست" : "پست جدید"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"
              >
                <MdClose size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <div>
                <label className="text-xs text-white/50 mb-1.5 block">عنوان *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => {
                    setForm((f) => ({
                      ...f,
                      title: e.target.value,
                      slug: editingId ? f.slug : titleToSlug(e.target.value),
                    }));
                  }}
                  className="w-full bg-gray-800 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30"
                  placeholder="عنوان پست را وارد کنید"
                />
              </div>

              <div>
                <label className="text-xs text-white/50 mb-1.5 block">Slug *</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                  className="w-full bg-gray-800 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-white/30"
                  placeholder="post-slug"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="text-xs text-white/50 mb-1.5 block">خلاصه</label>
                <textarea
                  value={form.excerpt}
                  onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                  rows={2}
                  className="w-full bg-gray-800 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30 resize-none"
                  placeholder="خلاصه کوتاه پست..."
                />
              </div>

              <div>
                <label className="text-xs text-white/50 mb-1.5 block">محتوا *</label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                  rows={8}
                  className="w-full bg-gray-800 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30 resize-none"
                  placeholder="محتوای کامل پست (از Markdown پشتیبانی می‌شود)"
                />
              </div>

              <div>
                <label className="text-xs text-white/50 mb-1.5 block">لینک تصویر کاور</label>
                <input
                  type="text"
                  value={form.coverImage}
                  onChange={(e) => setForm((f) => ({ ...f, coverImage: e.target.value }))}
                  className="w-full bg-gray-800 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30"
                  placeholder="https://..."
                  dir="ltr"
                />
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => setForm((f) => ({ ...f, published: !f.published }))}
                  className={`w-10 h-5 rounded-full transition-colors flex items-center px-0.5 ${form.published ? "bg-green-500" : "bg-white/20"
                    }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${form.published ? "translate-x-5" : "translate-x-0"}`} />
                </div>
                <span className="text-sm text-white/70">
                  {form.published ? "منتشر شود" : "ذخیره به عنوان پیش‌نویس"}
                </span>
              </label>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/10">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 text-sm text-white/50 hover:text-white transition-colors"
              >
                انصراف
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 bg-white text-gray-900 px-5 py-2 rounded-lg text-sm font-medium hover:bg-white/90 transition-colors disabled:opacity-50"
              >
                {saving ? "در حال ذخیره..." : <><MdCheck size={16} /> ذخیره</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 w-full max-w-sm">
            <h3 className="text-base font-semibold mb-2">حذف پست</h3>
            <p className="text-sm text-white/50 mb-6">
              آیا مطمئن هستید؟ این عملیات قابل بازگشت نیست.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-sm text-white/50 hover:text-white transition-colors"
              >
                انصراف
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="px-4 py-2 text-sm bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
              >
                حذف کن
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}