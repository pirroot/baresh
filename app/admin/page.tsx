export default async function AdminPage() {
  return (
    <div dir="rtl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">داشبورد</h1>
        <p className="text-white/50 text-sm mt-1">خلاصه وضعیت سایت</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-10">
        {/* {stats.map(({ label, value, sub, icon: Icon, color }) => (
          <div
            key={label}
            className="bg-gray-900 border border-white/10 rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-white/50 text-sm">{label}</span>
              <div className={`p-2 rounded-lg ${color}`}>
                <Icon size={18} />
              </div>
            </div>
            <p className="text-3xl font-bold text-white">{value}</p>
            <p className="text-xs text-white/40 mt-1">{sub}</p>
          </div>
        ))} */}
      </div>

      {/* Recent Blogs */}
      <div className="bg-gray-900 border border-white/10 rounded-xl p-6">
        <h2 className="text-base font-semibold mb-4">آخرین پست‌های بلاگ</h2>
        <div className="space-y-3">
          {/* {recentBlogs.length === 0 && (
            <p className="text-white/30 text-sm">هنوز پستی ثبت نشده.</p>
          )} */}
          {/* {recentBlogs.map((blog) => (
            <div
              key={blog.id}
              className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
            >
              <span className="text-sm text-white/80">{blog.title}</span>
              <div className="flex items-center gap-3">
                <span className="text-xs text-white/30">
                  {new Date(blog.createdAt).toLocaleDateString("fa-IR")}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${blog.published
                    ? "bg-green-500/10 text-green-400"
                    : "bg-amber-500/10 text-amber-400"
                    }`}
                >
                  {blog.published ? "منتشر" : "پیش‌نویس"}
                </span>
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
}