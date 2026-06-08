import Link from "next/link"
import HomeArticleItem from "./HomeArticleItem"
import { getHomeDataApi } from "@/services/homeServices"
import { IPost } from "@/types/PostDto"

export default async function HomeArticles() {
  const { posts } = await getHomeDataApi()
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
          href="/blog"
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
        {posts.map((article: IPost) => (
          <HomeArticleItem key={article.slug} article={article} />
        ))}
      </div>
    </section>
  )
}