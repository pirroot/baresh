import Link from "next/link"
import HomeArticleItem from "./HomeArticleItem"

interface IHomeArticleDto {
  slug: string
  image: string
  title: string
  excerpt: string
  date: string
  category: string
}

const HomeArticleList: IHomeArticleDto[] = [
  {
    slug: "how-to-choose-faucet",
    image: "/images/articles/a1.webp",
    title: "چگونه شیرآلات مناسب برای منزل خود انتخاب کنیم؟",
    excerpt:
      "انتخاب شیرآلات مناسب به عوامل مختلفی بستگی دارد؛ از جنس بدنه گرفته تا فشار آب و سبک دکوراسیون منزل.",
    date: "2025-03-10",
    category: "راهنمای خرید",
  },
  {
    slug: "water-saving-tips",
    image: "/images/articles/a2.webp",
    title: "۵ راهکار عملی برای کاهش مصرف آب در خانه",
    excerpt:
      "با استفاده از شیرآلات استاندارد و رعایت چند نکته ساده می‌توان مصرف آب را تا ۴۰ درصد کاهش داد.",
    date: "2025-02-18",
    category: "صرفه‌جویی",
  },
  {
    slug: "industrial-valves-guide",
    image: "/images/articles/a3.webp",
    title: "راهنمای جامع شیرهای صنعتی و کاربرد آن‌ها",
    excerpt:
      "شیرهای صنعتی در انواع مختلف تولید می‌شوند و هر کدام برای شرایط فشار و دمای خاصی طراحی شده‌اند.",
    date: "2025-01-05",
    category: "صنعتی",
  },
]

export default function HomeArticles() {
  return (
    <section className="container mx-auto my-30">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-white/40 text-xs tracking-widest uppercase mb-3">
            مقالات
          </p>
          <h2 className="text-white/90 text-2xl font-semibold leading-snug">
            آخرین مطالب بارش
          </h2>
          <div className="mt-4 w-10 h-px bg-white/30" />
        </div>

        <Link
          href="/articles"
          className="
            text-white/50 text-sm
            border border-white/20 rounded-xl px-5 py-2
            transition-all duration-200
            hover:text-white hover:border-white/50
          "
        >
          همه مقالات
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {HomeArticleList.map((article) => (
          <HomeArticleItem key={article.slug} {...article} />
        ))}
      </div>
    </section>
  )
}