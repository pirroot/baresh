import { getDashboardAdminApi } from '@/services/admin/dashboardServices'
import { MdInventory, MdArticle, MdQuestionAnswer } from 'react-icons/md'

export default async function AdminPage() {
  const data = await getDashboardAdminApi()
  const stats = [
    {
      label: 'محصولات',
      value: data.productCount,
      sub: 'محصول ثبت شده',
      icon: MdInventory,
      color: 'bg-blue-500/10 text-blue-400',
    },
    {
      label: 'پست‌های بلاگ',
      value: data.postCount,
      sub: 'مقاله منتشر شده',
      icon: MdArticle,
      color: 'bg-purple-500/10 text-purple-400',
    },
    {
      label: 'سوالات متداول',
      value: data.faqCount,
      sub: 'سوال ثبت شده',
      icon: MdQuestionAnswer,
      color: 'bg-green-500/10 text-green-400',
    },
  ]

  return (
    <div dir="rtl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">داشبورد</h1>
        <p className="text-white/50 text-sm mt-1">خلاصه وضعیت سایت</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {stats && stats.map(({ label, value, sub, icon: Icon, color }) => (
          <div key={label} className="bg-gray-900 border border-white/10 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white/50 text-sm">{label}</span>
              <div className={`p-2 rounded-lg ${color}`}>
                <Icon size={18} />
              </div>
            </div>
            <p className="text-3xl font-bold text-white">{value}</p>
            <p className="text-xs text-white/40 mt-1">{sub}</p>
          </div>
        ))}
      </div>

      {/* Recent Posts */}
      <div className="bg-gray-900 border border-white/10 rounded-xl p-6">
        <h2 className="text-base font-semibold mb-4">آخرین پست‌های بلاگ</h2>
        <div className="space-y-3">
          {data.recentPosts.length === 0 ? (
            <p className="text-white/30 text-sm">هنوز پستی ثبت نشده.</p>
          ) : (
            data.recentPosts.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
              >
                <span className="text-sm text-white/80">{post.title}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs bg-white/5 text-white/40 px-2 py-0.5 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-white/30">
                    {new Date(post.date).toLocaleDateString('fa-IR')}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}