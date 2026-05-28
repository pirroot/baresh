import Image from "next/image"
import Link from "next/link"

interface IHomeProductItemProps {
  image: string
  title: string
  slug: string
}

export default function HomeProductItem({
  image,
  title,
  slug,
}: IHomeProductItemProps) {
  return (
    <Link
      href={`/products/${slug}`}
      title={title}
      className="
        relative overflow-hidden
        flex flex-col items-center justify-between text-center
        border border-white/30 rounded-2xl
        bg-white/10 backdrop-blur-sm
        transition-all duration-300 ease-out
        hover:bg-white/20 hover:border-white/60 hover:scale-105 hover:-translate-y-1
        group flex-1
      "
    >
      <div className="relative w-full aspect-square overflow-hidden rounded-t-2xl">
        <Image
          src={image}
          alt={title}
          title={title}
          fill
          className="object-contain p-6 transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-linear-to-t from-black/20 to-transparent" />
      </div>

      <div className="flex flex-col items-center gap-2 px-5 py-5 w-full">

        <div className="w-8 h-px bg-white/30 transition-all duration-300 group-hover:w-14 group-hover:bg-white/70" />

        <h3 className="text-white text-sm font-semibold leading-snug">{title}</h3>
      </div>
    </Link>
  )
}