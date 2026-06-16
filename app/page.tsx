import type { Metadata } from "next"
import HomeArticles from "@/components/Home/HomeArticles/HomeArticles"
import HomeCategories from "@/components/Home/HomeCategories"
import HomeProducts from "@/components/Home/HomeProducts/HomeProducts"
import HomePromise from "@/components/Home/HomePromise"
import HomeStats from "@/components/Home/HomeStats"
import TopPage from "@/components/Home/TopPage/TopPage"

// ========== REVALIDATE ==========
export const revalidate = 3600 // 1 ساعت

// ========== METADATA ==========
export const metadata: Metadata = {
  title: {
    default: "شیرآلات بارش | تولیدکننده برتر شیرآلات بهداشتی و ساختمانی",
    template: "%s | شیرآلات بارش",
  },
  description:
    "کارخانه تولیدی شیرآلات بارش با بیش از ۲۵ سال تجربه، تولیدکننده شیر ظرفشویی، روشویی، حمام و شیرآلات ساختمانی با کیفیت عالی و ضمانت ۱۸ ماهه.",
  keywords: [
    "شیرآلات بارش",
    "کارخانه شیرآلات",
    "شیرآلات بهداشتی",
    "شیر ظرفشویی",
    "شیر روشویی",
    "شیر حمام",
    "شیرآلات ساختمانی",
    "قیمت شیرآلات بارش",
    "خرید شیرآلات",
  ],
  alternates: {
    canonical: "https://bareshco.com",
  },
  openGraph: {
    title: "شیرآلات بارش | تولیدکننده برتر شیرآلات بهداشتی و ساختمانی",
    description:
      "کارخانه تولیدی شیرآلات بارش با بیش از ۲۵ سال تجربه، تولیدکننده شیر ظرفشویی، روشویی، حمام و شیرآلات ساختمانی با کیفیت عالی.",
    url: "https://bareshco.com",
    siteName: "شیرآلات بارش",
    locale: "fa_IR",
    type: "website",
    images: [
      {
        url: "https://bareshco.com/images/og-home.webp",
        width: 1200,
        height: 630,
        alt: "شیرآلات بارش - تولیدکننده برتر",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "شیرآلات بارش | تولیدکننده برتر شیرآلات بهداشتی",
    description: "کارخانه تولیدی شیرآلات بارش با بیش از ۲۵ سال تجربه",
    images: ["https://bareshco.com/images/og-home.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

// ========== JSON-LD ==========
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "شیرآلات بارش",
  url: "https://bareshco.com",
  description:
    "کارخانه تولیدی شیرآلات بارش با بیش از ۲۵ سال تجربه در تولید شیرآلات بهداشتی و ساختمانی",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://bareshco.com/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
}

// ========== HOME PAGE ==========
export default function Home() {
  return (
    <>
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main
        className="min-h-screen "
        dir="rtl"
      >
        {/* ===== بخش‌های صفحه ===== */}

        {/* هیرو / بالای صفحه */}
        <TopPage />

        {/* آمارها */}
        <section aria-labelledby="stats-heading">
          <HomeStats />
        </section>

        {/* دسته‌بندی‌ها */}
        <section aria-labelledby="categories-heading">
          <HomeCategories />
        </section>

        {/* محصولات */}
        <section aria-labelledby="products-heading">
          <HomeProducts />
        </section>

        {/* تعهد برند */}
        <section aria-labelledby="promise-heading">
          <HomePromise />
        </section>

        {/* مقالات / بلاگ */}
        <section aria-labelledby="articles-heading">
          <HomeArticles />
        </section>
      </main>
    </>
  )
}