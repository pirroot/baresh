import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Sparkles } from "lucide-react"

interface IHomeProductItemProps {
  id?: string
  image: string
  title: string
  slug: string
  category?: string
  description?: string
}

export default function HomeProductItem({
  id,
  image,
  title,
  slug,
  category,
  description,
}: IHomeProductItemProps) {
  return (
    <Link
      href={`/products/${slug}`}
      title={title}
      className="
        group relative overflow-hidden
        flex flex-col items-center justify-between text-center
        border border-sky-500/15 rounded-2xl
        bg-linear-to-br from-sky-500/5 via-sky-500/5 to-transparent
        backdrop-blur-sm
        transition-all duration-300 ease-out
        hover:bg-sky-500/10 hover:border-sky-500/30 
        focus:ring-sky-500/50
        flex-1
      "
      aria-label={`مشاهده محصول ${title}`}
    >
      {/* ===== افکت نورانی روی هاور ===== */}
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-sky-500/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

      {/* ===== برچسب دسته‌بندی ===== */}
      {category && (
        <div className="absolute top-3 right-3 z-10">
          <span className="text-[10px] font-medium text-white/40 bg-white/5 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
            {category}
          </span>
        </div>
      )}

      {/* ===== تصویر ===== */}
      <div className="relative w-full aspect-square overflow-hidden rounded-t-2xl bg-linear-to-br from-sky-500/5 to-transparent">
        <Image
          src={image}
          alt={title}
          title={title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain p-5 transition-all duration-500  "
          priority={false}
          loading="lazy"
          quality={85}
        />

        {/* ===== گرادیانت پایین تصویر ===== */}
        <div className="absolute bottom-0 left-0 right-0 h-14 bg-linear-to-t from-black/30 via-black/10 to-transparent" />

        {/* ===== آیکون مشاهده ===== */}
        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="flex items-center gap-1 text-[10px] text-sky-400 bg-sky-500/20 backdrop-blur-sm px-2.5 py-1 rounded-full border border-sky-500/20">
            <Sparkles className="w-3 h-3" />
            مشاهده
          </span>
        </div>
      </div>

      {/* ===== متن ===== */}
      <div className="flex flex-col items-center gap-2 px-4 py-4 w-full">
        {/* خط تزیینی */}
        <div className="w-8 h-px bg-sky-500/30 transition-all duration-300 group-hover:w-12 group-hover:bg-sky-400/60" />

        {/* عنوان */}
        <h3 className="text-white/90 text-sm font-semibold leading-snug line-clamp-2 group-hover:text-sky-300 transition-colors duration-200">
          {title}
        </h3>

        {/* توضیح کوتاه (اختیاری) */}
        {description && (
          <p className="text-[10px] text-white/30 line-clamp-1 group-hover:text-white/50 transition-colors">
            {description}
          </p>
        )}

        {/* دکته مخفی */}
        <span className="text-[10px] text-sky-400/0 group-hover:text-sky-400/60 transition-all duration-300 flex items-center gap-1">
          مشاهده جزئیات
          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  )
}