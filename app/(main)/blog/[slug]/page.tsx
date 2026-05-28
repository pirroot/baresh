import type { Metadata, ResolvingMetadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

// سینا، اینجا دیتای فرضی رو قرار می‌دیم؛ در دنیای واقعی این از دیتابیس یا CMS میاد
const allArticles = [
  {
    id: 1,
    slug: "article-1",
    title: "چگونه شیرآلات مناسب برای منزل انتخاب کنیم؟",
    category: "راهنمای خرید",
    date: "2025-01-15",
    readTime: "6 دقیقه",
    image: "/images/articles/a1.webp",
    excerpt: "انتخاب شیرآلات مناسب به عوامل مختلفی بستگی دارد؛ از جنس بدنه گرفته تا فشار آب.",
    content: `
      <p>شیرآلات یکی از مهم‌ترین اجزای دکوراسیون و تاسیسات هر خانه‌ای هستند. انتخاب درست آن‌ها نه تنها به زیبایی فضا کمک می‌کند، بلکه در طول عمر سیستم لوله‌کشی و کاهش هزینه‌های آب نیز موثر است.</p>
      
      <h2>۱. توجه به جنس بدنه</h2>
      <p>اکثر شیرآلات استاندارد از آلیاژ برنج ساخته می‌شوند. برنج ترکیبی از مس و روی است که در برابر خوردگی و زنگ‌زدگی مقاومت بسیار بالایی دارد. محصولات بارش صنعتی تماماً از برنج با خلوص بالا تهیه شده‌اند.</p>
      
      <blockquote>
        نکته حرفه‌ای: همیشه وزن شیر را چک کنید. شیرآلات با کیفیت معمولاً وزن بیشتری دارند که نشان‌دهنده ضخامت مناسب دیواره‌های برنجی است.
      </blockquote>

      <h2>۲. نوع آبکاری (Finishing)</h2>
      <p>آبکاری نیکل-کروم رایج‌ترین نوع است که سطحی آینه‌ای و براق ایجاد می‌کند. اما امروزه مدل‌های PVD با رنگ‌های زیتونی، طلایی و دودی نیز طرفداران زیادی پیدا کرده‌اند که مقاومت بیشتری در برابر خط و خش دارند.</p>

      <h2>۳. مکانیزم عملکرد (کارتریج)</h2>
      <p>قلب تپنده یک شیر، کارتریج آن است. کارتریج‌های سرامیکی بهترین عملکرد را دارند زیرا در برابر سایش مقاوم بوده و به ندرت دچار چکه می‌شوند.</p>
    `,
  },
]

interface IArticleDetailProps {
  params: { slug: string }
}

// SEO: متا تگ‌های داینامیک مقاله (سینا، این بخش برای سئو حیاتیه)
export async function generateMetadata(
  { params }: IArticleDetailProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params
  const article = allArticles.find((a) => a.slug.trim() === slug.trim());
  if (!article) return { title: "مقاله پیدا نشد" }

  return {
    title: `${article.title} | وبلاگ بارش صنعتی`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      images: [article.image],
    },
  }
}

export default async function BlogDetail({ params }: IArticleDetailProps) {
  const { slug } = await params
  const article = allArticles.find((a) => a.slug.trim() === slug.trim());

  if (!article) notFound()

  return (
    <main dir="rtl" className="text-white mt-20 min-h-screen">
      <article className="container mx-auto pt-16 pb-24 px-4 max-w-4xl">

        {/* Breadcrumbs - برای سئو عالیه */}
        <nav className="flex items-center gap-2 text-xs text-white/30 mb-10">
          <Link href="/" className="hover:text-white transition-colors">خانه</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-white transition-colors">وبلاگ</Link>
          <span>/</span>
          <span className="text-white/60 truncate">{article.title}</span>
        </nav>

        {/* هدر مقاله */}
        <header className="mb-12">
          <div className="flex items-center gap-3 text-white/40 text-xs mb-6">
            <span className="bg-white/10 border border-white/10 px-3 py-1 rounded-full text-white/80">
              {article.category}
            </span>
            <span>•</span>
            <time dateTime={article.date}>
              {new Date(article.date).toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" })}
            </time>
            <span>•</span>
            <span>زمان مطالعه: {article.readTime}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-8 bg-linear-to-b from-white to-white/60 bg-clip-text text-transparent">
            {article.title}
          </h1>
        </header>

        {/* تصویر اصلی مقاله */}
        <div className="relative aspect-video mb-16 rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
        </div>

        {/* محتوای مقاله - سینا اینجا از پلاگین Typography استفاده کن */}
        <div className="relative">
          {/* دکوراسیون بک‌گراند نردی برای عمق دادن به صفحه */}
          <div className="absolute -right-20 top-0 w-64 h-64 bg-white/5 blur-[100px] rounded-full pointer-events-none" />

          <div
            className="
                    prose prose-invert prose-p:text-white/70 prose-p:leading-8 prose-p:text-justify
                    prose-headings:text-white prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-12
                    prose-blockquote:border-r-4 prose-blockquote:border-white/20 prose-blockquote:bg-white/5 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-l-xl
                    prose-strong:text-white prose-strong:font-bold
                    max-w-none
                "
            dangerouslySetInnerHTML={{ __html: article.content }}
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
            <button className="px-6 py-2 bg-white text-black rounded-xl text-sm font-bold hover:bg-white/90 transition-all active:scale-95">
              اشتراک گذاری
            </button>
          </div>
        </footer>

      </article>
    </main>
  )
}
