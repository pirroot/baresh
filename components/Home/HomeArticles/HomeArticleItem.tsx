import { IPost } from "@/types/PostDto"
import Image from "next/image"
import Link from "next/link"

interface Props {
  article: IPost
}

export default function HomeArticleItem({ article }: Props) {
  const { slug, image, title, updatedAt } = article;
  return (
    <article className="
      relative overflow-hidden
      flex flex-col
      border border-sky-500/15 rounded-2xl
      bg-sky-500/5 backdrop-blur-sm
      transition-all duration-300
      hover:bg-sky-500/10 hover:border-sky-500/30 hover:-translate-y-1
      group
    ">
      <Link href={`/blog/${slug}`} tabIndex={-1} aria-hidden="true">
        <div className="relative w-full aspect-video overflow-hidden rounded-t-2xl">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
        </div>
      </Link>

      <div className="flex flex-col gap-3 p-5 flex-1">
        <time
          dateTime={updatedAt}
          className="text-sky-400/60 text-xs font-semibold tracking-widest uppercase"
        >
          {new Date(updatedAt).toLocaleDateString("fa-IR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>

        <h3 className="text-white/90 text-base font-semibold leading-snug line-clamp-2">
          <Link
            href={`/blog/${slug}`}
            className="hover:text-sky-300 transition-colors duration-200"
          >
            {title}
          </Link>
        </h3>

        <div className="mt-1 w-8 h-px bg-sky-500/30" />

        <Link
          href={`/blog/${slug}`}
          className="
            inline-flex items-center gap-2
            text-sky-400/70 text-xs font-semibold tracking-widest uppercase
            transition-all duration-200
            hover:text-sky-300 group/link
            mt-auto
          "
        >
          ادامه مطلب
          <span className="transition-transform duration-200 group-hover/link:-translate-x-1">
            ←
          </span>
        </Link>
      </div>
    </article>
  )
}