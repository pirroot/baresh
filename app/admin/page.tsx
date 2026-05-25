import { prisma } from "@/lib/prisma";
import { MdArticle, MdInventory, MdVisibility, MdTrendingUp } from "react-icons/md";

export default async function AdminPage() {
  // const [totalBlogs, publishedBlogs, totalProducts, inStockProducts] =
  //   await Promise.all([
  //     prisma.blog.count(),
  //     prisma.blog.count({ where: { published: true } }),
  //     prisma.product.count(),
  //     prisma.product.count({ where: { inStock: true } }),
  //   ]);

  // const recentBlogs = await prisma.blog.findMany({
  //   orderBy: { createdAt: "desc" },
  //   take: 5,
  //   select: { id: true, title: true, published: true, createdAt: true },
  // });

  // const stats = [
  //   {
  //     label: "کل پست‌های بلاگ",
  //     value: totalBlogs,
  //     sub: `${publishedBlogs} منتشر شده`,
  //     icon: MdArticle,
  //     color: "bg-blue-500/10 text-blue-400",
  //   },
  //   {
  //     label: "کل محصولات",
  //     value: totalProducts,
  //     sub: `${inStockProducts} موجود در انبار`,
  //     icon: MdInventory,
  //     color: "bg-purple-500/10 text-purple-400",
  //   },
  //   {
  //     label: "پست‌های پیش‌نویس",
  //     value: totalBlogs - publishedBlogs,
  //     sub: "منتشر نشده",
  //     icon: MdVisibility,
  //     color: "bg-amber-500/10 text-amber-400",
  //   },
  //   {
  //     label: "ناموجود در انبار",
  //     value: totalProducts - inStockProducts,
  //     sub: "نیاز به بروزرسانی",
  //     icon: MdTrendingUp,
  //     color: "bg-red-500/10 text-red-400",
  //   },
  // ];

  return (
    <div dir="rtl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">داشبورد</h1>
        <p className="text-white/50 text-sm mt-1">خلاصه وضعیت سایت</p>
      </div>

      {/* Stats Grid */}
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