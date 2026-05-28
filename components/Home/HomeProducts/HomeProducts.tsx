import HomeProductItem from "./HomeProductItem"

interface IHomeProductDto {
  image: string
  title: string
  slug: string
}

const HomeProductList: IHomeProductDto[] = [
  {
    image: "/images/products/p1.webp",
    title: "شیر فلکه صنعتی",
    slug: "شیرآلات",
  },
  {
    image: "/images/products/p2.webp",
    title: "پمپ آب فشار قوی",
    slug: "پمپ‌ها",
  },
  {
    image: "/images/products/p3.webp",
    title: "اتصالات مانیفولد",
    slug: "اتصالات",
  },
  {
    image: "/images/products/p4.webp",
    title: "شیر برقی دو راهه",
    slug: "شیرآلات",
  },
]

export default function HomeProducts() {
  return (
    <section className="container mx-auto my-30">
      {/* هدر */}
      <div className="flex flex-col items-center text-center mb-10">
        <p className="text-white/40 text-xs tracking-widest uppercase mb-3">
          محصولات ما
        </p>
        <h2 className="text-white/90 text-2xl font-semibold leading-snug">
          جدیدترین محصولات بارش
        </h2>
        <div className="mt-4 w-10 h-px bg-white/30" />
      </div>

      {/* گرید محصولات */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {HomeProductList.map((product) => (
          <HomeProductItem key={product.title} {...product} />
        ))}
      </div>
    </section>
  )
}