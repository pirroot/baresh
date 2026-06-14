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

  if (!post) {
    return { title: "مقاله پیدا نشد" }
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
  const imageUrl = Array.isArray(post.image) ? post.image[0] : post.image

  const description =
    post.seoDescription ??
    post.content?.replace(/<[^>]*>/g, "").slice(0, 160)

  return {
    title: post.seoTitle || `${post.title} | وبلاگ بارش`,
    description,

    keywords: post.keywords as string[] | null,

    alternates: {
      canonical: `${baseUrl}/blog/${slug}`,
    },

    openGraph: {
      title: post.title,
      description,
      url: `${baseUrl}/blog/${slug}`,
      type: "article",
      publishedTime: new Date(post.createdAt).toISOString(),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: post.seoTitle || post.title,
      description,
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
    <div className="flex flex-wrap items-center gap-3 text-white/35 text-xs mb-6">
      <span className="inline-flex items-center text-xs font-semibold tracking-wide text-sky-400 bg-sky-500/10 border border-sky-500/20 px-3 py-1 rounded-full">
        {category}
      </span>
      <span aria-hidden>·</span>
      <time dateTime={date.toISOString()}>
        {date.toLocaleDateString("fa-IR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>
      <span aria-hidden>·</span>
      <span>زمان مطالعه: {readTime} دقیقه</span>
    </div>
  )
}

function BlogAuthor() {
  return (
    <div className="flex items-center gap-4">
      <div
        className="w-12 h-12 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center font-bold text-sky-400/60"
        aria-hidden
      >
        B
      </div>
      <div>
        <p className="text-sm font-semibold text-white/85">تجربیات بارش</p>
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main dir="rtl" className="text-white mt-20 min-h-screen">
        <article className="container mx-auto pt-16 pb-24 px-4 md:px-8 max-w-4xl">

          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="flex items-center gap-2 text-xs text-white/30 mb-10">
            <Link href="/" className="hover:text-sky-300 transition-colors">خانه</Link>
            <span aria-hidden className="text-white/20">/</span>
            <Link href="/blog" className="hover:text-sky-300 transition-colors">وبلاگ</Link>
            <span aria-hidden className="text-white/20">/</span>
            <span className="text-sky-300/70 truncate" aria-current="page">{post.title}</span>
          </nav>

          {/* Header */}
          <header className="mb-12">
            <BlogMeta
              category={post.category}
              createdAt={post.createdAt}
              readTime={post.readTime}
            />
            <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-6 text-white/90">
              {post.title}
            </h1>
            <div className="w-10 h-px bg-sky-500/40" />
          </header>

          {/* Hero image */}
          <div className="relative aspect-video mb-16 rounded-2xl overflow-hidden border border-sky-500/15 shadow-2xl shadow-sky-950/30 group">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1000px) 80vw, 896px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#0a0f1a]/60 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="relative">
            <div className="absolute -right-20 top-0 w-64 h-64 bg-sky-500/5 blur-[100px] rounded-full pointer-events-none" aria-hidden />
            <div
              className="prose prose-invert prose-lg max-w-none [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-white [&_p]:text-white/70 [&_a]:text-sky-400 [&_a:hover]:text-sky-300 [&_strong]:text-white/90 [&_blockquote]:border-sky-500/30 [&_blockquote]:text-white/60 text-justify leading-14"
              dangerouslySetInnerHTML={{ __html: decode(post.content) }}
            />
          </div>

          {/* Footer */}
          <footer className="mt-20 pt-10 border-t border-sky-500/15 flex flex-col md:flex-row justify-between items-center gap-6">
            <BlogAuthor />
            <Link
              href="/blog"
              className="px-6 py-2.5 border border-sky-500/20 text-sky-400/70 rounded-xl text-sm hover:bg-sky-500/10 hover:text-sky-300 hover:border-sky-400/40 transition-all duration-200"
            >
              بازگشت به وبلاگ
            </Link>
          </footer>

        </article>
      </main>
    </>
  )
}