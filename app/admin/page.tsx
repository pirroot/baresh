import { getDashboardAdminApi } from "@/services/admin/dashboardServices";
import { MdInventory, MdArticle, MdQuestionAnswer } from "react-icons/md";

export default async function AdminPage() {
  const data = await getDashboardAdminApi();

  const stats = [
    {
      label: "محصولات",
      value: data.productCount,
      sub: "محصول ثبت شده",
      icon: MdInventory,
      color: "bg-sky-50 text-sky-600 ring-sky-100",
      accent: "from-sky-500 to-cyan-500",
    },
    {
      label: "پست‌های بلاگ",
      value: data.postCount,
      sub: "مقاله منتشر شده",
      icon: MdArticle,
      color: "bg-violet-50 text-violet-600 ring-violet-100",
      accent: "from-violet-500 to-fuchsia-500",
    },
    {
      label: "سوالات متداول",
      value: data.faqCount,
      sub: "سوال ثبت شده",
      icon: MdQuestionAnswer,
      color: "bg-emerald-50 text-emerald-600 ring-emerald-100",
      accent: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <div dir="rtl" className="space-y-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-sm font-medium text-sky-600">
            نمای کلی مدیریت
          </p>
          <h1 className="text-2xl font-bold text-slate-900">داشبورد</h1>
          <p className="mt-2 text-sm text-slate-500">خلاصه وضعیت سایت</p>
        </div>

        <div className="hidden rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500 sm:block">
          آخرین بروزرسانی: امروز
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map(({ label, value, sub, icon: Icon, color, accent }) => (
          <div
            key={label}
            className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div
              className={`absolute right-0 top-0 h-1 w-full bg-linear-to-l ${accent}`}
            />

            <div className="mb-5 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">
                {label}
              </span>
              <div
                className={`rounded-2xl p-3 ring-1 transition-transform duration-300 group-hover:scale-110 ${color}`}
              >
                <Icon size={20} />
              </div>
            </div>

            <p className="text-3xl font-extrabold tracking-tight text-slate-900">
              {value.toLocaleString("fa-IR")}
            </p>
            <p className="mt-2 text-xs text-slate-400">{sub}</p>
          </div>
        ))}
      </div>

      {/* Recent Posts */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              آخرین پست‌های بلاگ
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              جدیدترین محتواهای منتشر شده
            </p>
          </div>

          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
            {data.recentPosts.length.toLocaleString("fa-IR")} مورد
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {data.recentPosts.length === 0 ? (
            <div className="px-6 py-10 text-center">
              <p className="text-sm font-medium text-slate-500">
                هنوز پستی ثبت نشده.
              </p>
              <p className="mt-1 text-xs text-slate-400">
                بعد از انتشار مقاله، اینجا نمایش داده می‌شود.
              </p>
            </div>
          ) : (
            data.recentPosts.map((post) => (
              <div
                key={post.id}
                className="flex flex-col gap-3 px-6 py-4 transition-colors hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-700">
                    {post.title}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    {new Date(post.date).toLocaleDateString("fa-IR")}
                  </p>
                </div>

                <span className="w-fit rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-600 ring-1 ring-sky-100">
                  {post.category}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
