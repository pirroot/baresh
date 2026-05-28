import { getProductsApi } from "@/services/Product/productServices"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "محصولات | بارش صنعتی — شیرآلات صنعتی و خانگی",
  description: "مشاهده کامل محصولات بارش صنعتی شامل شیرآلات صنعتی، خانگی، اتصالات و پمپ‌ها. کیفیت بین‌المللی، گارانتی ۲ ساله.",
  openGraph: {
    title: "محصولات بارش صنعتی",
    description: "شیرآلات صنعتی و خانگی با کیفیت بین‌المللی.",
    type: "website",
  },
}

export default async function Products() {
  const result = await getProductsApi()
  const products = (await result.data)

  return (
    <main dir="rtl" className="text-white mt-20">
      <section className="container mx-auto pt-24 pb-24 px-4">
        <div className="text-center mb-12">
          <p className="text-white/40 text-xs tracking-widest uppercase mb-3">
            محصولات ما
          </p>
          <h1 className="text-2xl font-semibold mb-3">شیرآلات بارش صنعتی</h1>
          <p className="text-sm text-white/50 max-w-sm mx-auto leading-7">
            مجموعه کاملی از شیرآلات صنعتی و خانگی با استانداردهای بین‌المللی
          </p>
          <div className="mt-5 w-10 h-px bg-white/30 mx-auto" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {products.map((product: any) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="relative overflow-hidden flex flex-col border border-white/20 rounded-2xl bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 hover:border-white/40 hover:-translate-y-1 group"
            >
              {/* تصویر */}
              <div className="relative w-full aspect-square overflow-hidden rounded-t-2xl bg-white/5">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain p-6 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                <span className="absolute bottom-3 right-3 text-white/80 text-xs bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/15">
                  {product.category}
                </span>
              </div>

              {/* اطلاعات */}
              <div className="flex flex-col items-center gap-2 px-5 py-5 text-center">
                <div className="w-8 h-px bg-white/25 transition-all duration-300 group-hover:w-14 group-hover:bg-white/60" />
                <h2 className="text-white/90 text-sm font-semibold leading-snug">
                  {product.title}
                </h2>
              </div>
            </Link>
          ))}
        </div>

        {/* اگر محصولی نبود */}
        {products.length === 0 && (
          <div className="text-center py-20 text-white/20 italic text-sm">
            در حال حاضر محصولی برای نمایش وجود ندارد.
          </div>
        )}

        {/* {products.length > 1 && (
          <nav aria-label="صفحه‌بندی محصولات" className="flex justify-center items-center gap-2">
            {currentPage > 1 ? (
              <Link
                href={`/products?page=${currentPage - 1}`}
                className="border border-white/20 rounded-xl px-4 py-2 text-sm text-white/60 transition-all duration-200 hover:bg-white/10 hover:border-white/40 hover:text-white"
                aria-label="صفحه قبل"
              >
                ←
              </Link>
            ) : (
              <span className="border border-white/10 rounded-xl px-4 py-2 text-sm text-white/20 cursor-not-allowed">←</span>
            )}

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Link
                key={page}
                href={`/products?page=${page}`}
                className={`border rounded-xl px-4 py-2 text-sm transition-all duration-200 ${page === currentPage
                  ? "bg-white text-black border-white font-semibold"
                  : "border-white/20 text-white/60 hover:bg-white/10 hover:border-white/40 hover:text-white"
                  }`}
              >
                {page.toLocaleString("fa-IR")}
              </Link>
            ))}

            {currentPage < totalPages ? (
              <Link
                href={`/products?page=${currentPage + 1}`}
                className="border border-white/20 rounded-xl px-4 py-2 text-sm text-white/60 transition-all duration-200 hover:bg-white/10 hover:border-white/40 hover:text-white"
                aria-label="صفحه بعد"
              >
                →
              </Link>
            ) : (
              <span className="border border-white/10 rounded-xl px-4 py-2 text-sm text-white/20 cursor-not-allowed">→</span>
            )}
          </nav>
        )} */}

      </section>
    </main>
  )
}
