import type { Metadata, ResolvingMetadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"

interface IProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: IProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params
  const post = await prisma.post.findUnique({ where: { slug } })
  if (!post) return { title: "مقاله پیدا نشد" }

  return {
    title: post.seoTitle || `${post.title} | وبلاگ بارش`,
    description: post.seoDescription,
    keywords: post.keywords as string[] | null,
    openGraph: {
      title: post.title,
      description: post.seoDescription,
      type: "article",
      publishedTime: post.date.toISOString(),
      images: [post.image],
    },
  }
}

export default async function BlogDetail({ params }: IProps) {
  const { slug } = await params
  const post = await prisma.post.findUnique({ where: { slug } })

  if (!post) notFound()

  return (
    <main dir="rtl" className="text-white mt-20 min-h-screen">
      <article className="container mx-auto pt-16 pb-24 px-4 max-w-4xl">

        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-white/30 mb-10">
          <Link href="/" className="hover:text-white transition-colors">خانه</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-white transition-colors">وبلاگ</Link>
          <span>/</span>
          <span className="text-white/60 truncate">{post.title}</span>
        </nav>

        {/* هدر */}
        <header className="mb-12">
          <div className="flex items-center gap-3 text-white/40 text-xs mb-6">
            <span className="bg-white/10 border border-white/10 px-3 py-1 rounded-full text-white/80">
              {post.category}
            </span>
            <span>•</span>
            <time dateTime={post.date.toISOString()}>
              {post.date.toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" })}
            </time>
            <span>•</span>
            <span>زمان مطالعه: {post.readTime}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-8 bg-linear-to-b from-white to-white/60 bg-clip-text text-transparent">
            {post.title}
          </h1>
        </header>

        {/* تصویر */}
        <div className="relative aspect-video mb-16 rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
        </div>

        {/* محتوا */}
        <div className="relative">
          <div className="absolute -right-20 top-0 w-64 h-64 bg-white/5 blur-[100px] rounded-full pointer-events-none" />
          <div
            className="
              prose prose-invert prose-p:text-white/70 prose-p:leading-8 prose-p:text-justify
              prose-headings:text-white prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-12
              prose-blockquote:border-r-4 prose-blockquote:border-white/20 prose-blockquote:bg-white/5
              prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-l-xl
              prose-strong:text-white prose-strong:font-bold
              max-w-none
            "
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* فوتر مقاله */}
        <footer className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold text-white/40">
              B
            </div>
            <div>
              <p className="text-sm font-semibold">تحریریه بارش صنعتی</p>
              <p className="text-xs text-white/40">مرجع تخصصی شیرآلات و اتصالات</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Link
              href="/blog"
              className="px-6 py-2 border border-white/10 rounded-xl text-sm hover:bg-white/5 transition-colors"
            >
              بازگشت به وبلاگ
            </Link>
          </div>
        </footer>

      </article>
    </main>
  )
}

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({ select: { slug: true } })
  return posts.map((p) => ({ slug: p.slug }))
}