import type { Metadata } from "next"
import Image from "next/image"
import { decode } from 'html-entities'
import Link from "next/link"
import { notFound } from "next/navigation"
import { getBlogBySlug } from "@/services/Product/productServices"

interface IProps {
  params: Promise<{ slug: string }>
}


export async function generateMetadata({ params }: IProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogBySlug(slug)

  if (!post) return { title: "مقاله پیدا نشد" }

  const imageUrl = Array.isArray(post.image) ? post.image[0] : post.image

  return {
    title: post.seoTitle || `${post.title} | وبلاگ بارش`,
    description: post.seoDescription,
    keywords: post.keywords as string[] | null,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.seoDescription ?? post.content?.slice(0, 160),
      type: "article",
      publishedTime: new Date(post.createdAt).toISOString(),
      images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle || post.title,
      description: post.seoDescription ?? "",
      images: [imageUrl],
    },
  }
}


function BlogMeta({
  category,
  createdAt,
  readTime,
}: {
  category: string
  createdAt: string | Date
  readTime: number
}) {
  const date = createdAt instanceof Date ? createdAt : new Date(createdAt)

  return (
    <div className="flex flex-wrap items-center gap-3 text-white/40 text-xs mb-6">
      <span className="bg-white/10 border border-white/10 px-3 py-1 rounded-full text-white/80">
        {category}
      </span>
      <span aria-hidden>•</span>
      <time dateTime={date.toISOString()}>
        {date.toLocaleDateString("fa-IR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>
      <span aria-hidden>•</span>
      <span>زمان مطالعه: {readTime} دقیقه</span>
    </div>
  )
}

function BlogAuthor() {
  return (
    <div className="flex items-center gap-4">
      <div
        className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold text-white/40"
        aria-hidden
      >
        B
      </div>
      <div>
        <p className="text-sm font-semibold">تجروبیات بارش</p>
        <p className="text-xs text-white/40">مرجع تخصصی شیرآلات بهداشتی و خانگی</p>
      </div>
    </div>
  )
}


export default async function BlogDetail({ params }: IProps) {
  const { slug } = await params
  const post = await getBlogBySlug(slug)

  if (!post) notFound()

  const publishedDate = new Date(post.createdAt).toISOString()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seoDescription,
    image: post.image,
    datePublished: publishedDate,
    author: {
      "@type": "Organization",
      name: "تحریریه بارش صنعتی",
    },
  }


  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main dir="rtl" className="text-white mt-20 min-h-screen">
        <article className="container mx-auto pt-16 pb-24 px-4 max-w-4xl">

          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="flex items-center gap-2 text-xs text-white/30 mb-10">
            <Link href="/" className="hover:text-white transition-colors">خانه</Link>
            <span aria-hidden>/</span>
            <Link href="/blog" className="hover:text-white transition-colors">وبلاگ</Link>
            <span aria-hidden>/</span>
            <span className="text-white/60 truncate" aria-current="page">{post.title}</span>
          </nav>

          {/* Header */}
          <header className="mb-12">
            <BlogMeta
              category={post.category}
              createdAt={post.createdAt}
              readTime={post.readTime}
            />
            <h1 className="text-2xl md:text-5xl font-bold leading-tight mb-8 bg-linear-to-b from-white to-white/60 bg-clip-text text-transparent">
              {post.title}
            </h1>
          </header>

          {/* Hero image */}
          <div className="relative aspect-video mb-16 rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1000px) 80vw, 896px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="relative">
            <div className="absolute -right-20 top-0 w-64 h-64 bg-white/5 blur-[100px] rounded-full pointer-events-none" aria-hidden />
            <div
              className="prose prose-invert prose-lg max-w-none [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-white [&_p]:text-white/80"
              dangerouslySetInnerHTML={{ __html: decode(post.content) }}
            /></div>

          {/* Footer */}
          <footer className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <BlogAuthor />
            <Link
              href="/blog"
              className="px-6 py-2 border border-white/10 rounded-xl text-sm hover:bg-white/5 transition-colors"
            >
              بازگشت به وبلاگ
            </Link>
          </footer>

        </article>
      </main>
    </>
  )
}