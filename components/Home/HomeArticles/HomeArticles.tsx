import Link from "next/link"
import HomeArticleItem from "./HomeArticleItem"
import { getHomeDataApi } from "@/services/homeServices"
import { IPost } from "@/types/PostDto"

export default async function HomeArticles() {
  const { posts } = await getHomeDataApi()

  return (
    <section className="container mx-auto my-24 px-4 md:px-8 lg:px-12">

      {/* Header */}
      <div className="flex items-end justify-between mb-12">
        <div className="flex flex-col items-start">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-sky-400 bg-sky-500/10 border border-sky-500/20 px-4 py-1.5 rounded-full mb-4">
            مقالات
          </span>
          <h2 className="text-white/90 text-2xl md:text-3xl font-semibold leading-snug">
            آخرین مطالب بارش
          </h2>
          <div className="mt-4 w-10 h-px bg-sky-500/40" />
        </div>

        <Link
          href="/blog"
          className="text-sky-400/70 text-sm border border-sky-500/20 rounded-xl px-5 py-2 transition-all duration-200 hover:text-sky-300 hover:border-sky-400/40 hover:bg-sky-500/8"
        >
          همه مقالات
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {posts.map((article: IPost) => (
          <HomeArticleItem key={article.slug} article={article} />
        ))}
      </div>

    </section>
  )
}