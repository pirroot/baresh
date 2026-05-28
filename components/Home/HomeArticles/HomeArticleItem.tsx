import Image from "next/image"
import Link from "next/link"

interface IHomeArticleItemProps {
  slug: string
  image: string
  title: string
  excerpt: string
  date: string
}

export default function HomeArticleItem({
  slug,
  image,
  title,
  excerpt,
  date,
}: IHomeArticleItemProps) {
  return (
    <article className="
      relative overflow-hidden
      flex flex-col
      border border-white/20 rounded-2xl
      bg-white/10 backdrop-blur-sm
      transition-all duration-300
      hover:bg-white/15 hover:border-white/40 hover:-translate-y-1
      group
    ">
      {/* تصویر */}
      <Link href={`/articles/${slug}`} tabIndex={-1} aria-hidden="true">
        <div className="relative w-full aspect-video overflow-hidden rounded-t-2xl">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
        </div>
      </Link>

      {/* متن */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        <time
          dateTime={date}
          className="text-white/35 text-xs"
        >
          {new Date(date).toLocaleDateString("fa-IR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>

        <h3 className="text-white/90 text-base font-semibold leading-snug line-clamp-2">
          <Link
            href={`/articles/${slug}`}
            className="hover:text-white transition-colors duration-200"
          >
            {title}
          </Link>
        </h3>

        <p className="text-white/50 text-sm leading-6 line-clamp-2 flex-1">
          {excerpt}
        </p>

        <Link
          href={`/articles/${slug}`}
          className="
            inline-flex items-center gap-2
            text-white/60 text-xs font-medium
            transition-all duration-200
            hover:text-white group/link
            mt-1
          "
        >
          ادامه مطلب
          <span className="transition-transform duration-200 group-hover/link:translate-x-[-4px]">
            ←
          </span>
        </Link>
      </div>
    </article>
  )
}