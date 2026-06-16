import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { IPost } from "@/types/PostDto"
import { getBlogAdminApi } from "@/services/admin/blogServices"
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "وبلاگ | بارش صنعتی — مقالات و راهنمای شیرآلات",
  description: "آخرین مقالات بارش صنعتی درباره شیرآلات صنعتی، راهنمای خرید و نکات نصب.",
  openGraph: {
    title: "وبلاگ بارش صنعتی",
    description: "مقالات تخصصی در حوزه شیرآلات صنعتی و خانگی.",
    type: "website",
  },
}

export default async function BlogPage() {
  const articles = await getBlogAdminApi()

  return (
    <main dir="rtl" className="text-white mt-20">
      <section className="container mx-auto pt-24 pb-24 px-4 md:px-8 lg:px-12">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-sky-400 bg-sky-500/10 border border-sky-500/20 px-4 py-1.5 rounded-full mb-4">
            دانش و تجربه
          </span>
          <h1 className="text-2xl md:text-3xl font-semibold mb-3">وبلاگ بارش صنعتی</h1>
          <p className="text-sm text-white/50 max-w-sm mx-auto leading-7">
            مقالات تخصصی در حوزه شیرآلات صنعتی، نکات نصب و راهنمای خرید
          </p>
          <div className="mt-5 w-10 h-px bg-sky-500/40" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {articles.result?.map((article: IPost) => (
            <article
              key={article.id}
              className="overflow-hidden flex flex-col border border-sky-500/15 rounded-2xl bg-sky-500/5 backdrop-blur-sm transition-all duration-300 hover:bg-sky-500/10 hover:border-sky-400/30 hover:-translate-y-1 group"
              itemScope itemType="https://schema.org/BlogPosting"
            >
              <meta itemProp="headline" content={article.title} />
              <meta itemProp="datePublished" content={article.date} />

              {/* Image */}
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
                  <div className="absolute inset-0 bg-linear-to-t from-[#0a0f1a]/60 to-transparent" />
                  <span className="absolute bottom-3 right-3 text-sky-300 text-xs bg-sky-500/15 backdrop-blur-sm px-3 py-1 rounded-full border border-sky-500/20">
                    {article.category}
                  </span>
                </div>
              </Link>

              {/* Content */}
              <div className="flex flex-col gap-3 p-5 flex-1">
                <div className="flex items-center gap-3 text-white/30 text-xs">
                  <time dateTime={article.date}>
                    {new Date(article.updatedAt).toLocaleDateString("fa-IR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span aria-hidden>·</span>
                  <span>{article.readTime || "۵ دقیقه"} مطالعه</span>
                </div>

                <h2 className="text-white/90 text-sm font-semibold leading-snug line-clamp-2">
                  <Link
                    href={`/blog/${article.slug}`}
                    className="hover:text-sky-300 transition-colors duration-200"
                    itemProp="url"
                  >
                    {article.title}
                  </Link>
                </h2>

                <p className="text-white/40 text-xs leading-6 line-clamp-2 flex-1" itemProp="description">
                  {article.content.substring(0, 100)}...
                </p>

                <div className="mt-1 w-full h-px bg-sky-500/10" />

                <Link
                  href={`/blog/${article.slug}`}
                  className="inline-flex items-center gap-2 text-sky-400/60 text-xs hover:text-sky-300 transition-colors duration-200 group/link"
                >
                  ادامه مطلب
                  <span className="transition-transform duration-200 group-hover/link:-translate-x-1">←</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

      </section>
    </main>
  )
}