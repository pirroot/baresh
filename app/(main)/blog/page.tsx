import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { prisma } from "@/lib/prisma"

// ۱. سئو داینامیک برای صفحه لیست وبلاگ
export const metadata: Metadata = {
  title: "وبلاگ | بارش صنعتی — مقالات و راهنمای شیرآلات",
  description: "آخرین مقالات بارش صنعتی درباره شیرآلات صنعتی، راهنمای خرید و نکات نصب.",
  openGraph: {
    title: "وبلاگ بارش صنعتی",
    description: "مقالات تخصصی در حوزه شیرآلات صنعتی و خانگی.",
    type: "website",
  },
}

const ITEMS_PER_PAGE = 6

interface IBlogPageProps {
  searchParams: Promise<{ page?: string }>
}

export default async function BlogPage({ searchParams }: IBlogPageProps) {
  // منتظر شدن برای پارامترهای جستجو (Next.js 15)
  const { page } = await searchParams
  const currentPage = Math.max(1, parseInt(page ?? "1", 10))

  // ۲. دریافت دیتای واقعی از دیتابیس با قابلیت Pagination
  const [articles, totalCount] = await Promise.all([
    prisma.post.findMany({
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
      orderBy: { date: 'desc' }, // نمایش جدیدترین‌ها در ابتدا
    }),
    prisma.post.count()
  ])

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  // مقاله ویژه (اولین مقاله در صفحه اول)
  const featured = currentPage === 1 ? articles[0] : null
  const rest = currentPage === 1 ? articles.slice(1) : articles

  return (
    <main dir="rtl" className="text-white mt-20">
      <section className="container mx-auto pt-24 pb-24 px-4">

        <div className="text-center mb-12">
          <p className="text-white/40 text-xs tracking-widest uppercase mb-3">دانش و تجربه</p>
          <h1 className="text-2xl font-semibold mb-3">وبلاگ بارش صنعتی</h1>
          <p className="text-sm text-white/50 max-w-sm mx-auto leading-7">
            مقالات تخصصی در حوزه شیرآلات صنعتی، نکات نصب و راهنمای خرید
          </p>
          <div className="mt-5 w-10 h-px bg-white/30 mx-auto" />
        </div>

        {/* Featured Article */}
        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="group relative overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-white/20 rounded-2xl bg-white/10 backdrop-blur-sm mb-6 transition-all duration-300 hover:bg-white/15 hover:border-white/40"
          >
            <div className="relative min-h-64 overflow-hidden rounded-t-2xl md:rounded-r-2xl md:rounded-tl-none">
              {featured.image && (
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              )}
              <div className="absolute inset-0 bg-linear-to-l from-black/30 to-transparent" />
              <span className="absolute top-4 right-4 bg-white text-black text-xs font-semibold px-3 py-1 rounded-full">ویژه</span>
            </div>
            <div className="flex flex-col justify-center gap-4 p-10">
              <span className="text-white/40 text-xs">{featured.category}</span>
              <h2 className="text-xl font-bold leading-snug text-white/90 group-hover:text-white transition-colors duration-200">
                {featured.title}
              </h2>
              {/* اگر خلاصه مقاله (excerpt) در دیتابیس نیست، از بخشی از محتوا استفاده کن */}
              <p className="text-white/50 text-sm leading-7 line-clamp-3">{featured.content.substring(0, 150)}...</p>
              <div className="flex items-center gap-4 text-white/30 text-xs">
                <time dateTime={featured.date.toISOString()}>
                  {new Date(featured.date).toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" })}
                </time>
                <span>·</span>
                <span>{featured.readTime || '5 دقیقه'} مطالعه</span>
              </div>
            </div>
          </Link>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {rest.map((article: any) => (
            <article
              key={article.id}
              className="overflow-hidden flex flex-col border border-white/20 rounded-2xl bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 hover:border-white/40 hover:-translate-y-1 group"
              itemScope itemType="https://schema.org/BlogPosting"
            >
              <meta itemProp="headline" content={article.title} />
              <meta itemProp="datePublished" content={article.date.toISOString()} />

              <Link href={`/blog/${article.slug}`}>
                <div className="relative w-full aspect-video overflow-hidden rounded-t-2xl">
                  {article.image && (
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                  <span className="absolute bottom-3 right-3 text-white/90 text-xs bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                    {article.category}
                  </span>
                </div>
              </Link>

              <div className="flex flex-col gap-3 p-5 flex-1">
                <div className="flex items-center gap-3 text-white/30 text-xs">
                  <time dateTime={article.date.toISOString()}>
                    {new Date(article.date).toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" })}
                  </time>
                  <span>·</span>
                  <span>{article.readTime || '5 دقیقه'} مطالعه</span>
                </div>

                <h2 className="text-white/90 text-sm font-semibold leading-snug line-clamp-2">
                  <Link href={`/blog/${article.slug}`} className="hover:text-white transition-colors duration-200" itemProp="url">
                    {article.title}
                  </Link>
                </h2>

                <p className="text-white/45 text-xs leading-6 line-clamp-2 flex-1" itemProp="description">
                  {article.content.substring(0, 100)}...
                </p>

                <Link href={`/blog/${article.slug}`} className="inline-flex items-center gap-2 text-white/50 text-xs hover:text-white transition-colors duration-200 group/link mt-1">
                  ادامه مطلب
                  <span className="transition-transform duration-200 group-hover/link:-translate-x-1">←</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <nav className="flex justify-center items-center gap-2">
            {/* دکمه‌های صفحه‌بندی اینجا قرار می‌گیرند (مشابه کد قبلی خودت) */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Link
                key={page}
                href={`/blog?page=${page}`}
                className={`border rounded-xl px-4 py-2 text-sm transition-all duration-200 ${page === currentPage ? "bg-white text-black" : "border-white/20 text-white/60 hover:bg-white/10"
                  }`}
              >
                {page.toLocaleString("fa-IR")}
              </Link>
            ))}
          </nav>
        )}
      </section>
    </main>
  )
}
