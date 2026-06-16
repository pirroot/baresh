import type { Metadata, Viewport } from "next"
import Script from "next/script"
import raviFont from "@/lib/font"
import ConditionalLayout from "@/components/ConditionalLayout"

import "./globals.css"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0a0f1a" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0f1a" },
  ],
  colorScheme: "dark",
}

// ========== METADATA WITH ENHANCED SEO ==========
export const metadata: Metadata = {
  metadataBase: new URL("https://bareshco.com"),

  title: {
    default: "شیرآلات بارش | تولیدکننده برتر شیرآلات بهداشتی و ساختمانی",
    template: "%s | شیرآلات بارش | تولیدکننده رسمی",
    absolute: "شیرآلات بارش - کارخانه تولید شیرآلات باکیفیت ایرانی",
  },

  description:
    "کارخانه تولیدی شیرآلات بارش با بیش از ۲۵ سال تجربه، تولیدکننده شیر ظرفشویی، روشویی، حمام و شیرآلات ساختمانی با استانداردهای جهانی و ضمانت ۱۸ ماهه.",

  keywords: [
    "شیرآلات بارش",
    "کارخانه شیرآلات بارش",
    "تولیدکننده شیرآلات",
    "شیرآلات بهداشتی",
    "شیر ظرفشویی بارش",
    "شیر روشویی بارش",
    "شیر حمام بارش",
    "شیرآلات ساختمانی",
    "قیمت شیرآلات بارش",
    "خرید آنلاین شیرآلات",
    "بهترین برند شیرآلات ایرانی",
    "شیرآلات با کیفیت",
    "نمایندگی شیرآلات بارش",
    "کاتالوگ شیرآلات بارش",
  ],

  authors: [
    { name: "شیرآلات بارش", url: "https://bareshco.com" },
    { name: "تیم فنی بارش", url: "https://bareshco.com/about" },
  ],

  creator: "شیرآلات بارش - کارخانه تولیدی",
  publisher: "شیرآلات بارش",
  applicationName: "شیرآلات بارش | فروشگاه آنلاین",

  alternates: {
    canonical: "https://bareshco.com",
    languages: {
      "fa-IR": "https://bareshco.com",
      "en-US": "https://bareshco.com/en",
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/icons/apple-icon-57x57.png", sizes: "57x57" },
      { url: "/icons/apple-icon-72x72.png", sizes: "72x72" },
      { url: "/icons/apple-icon-114x114.png", sizes: "114x114" },
      { url: "/icons/apple-icon-180x180.png", sizes: "180x180" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/icons/safari-pinned-tab.svg",
        color: "#0a0f1a",
      },
    ],
  },

  manifest: "/site.webmanifest",

  openGraph: {
    title: "شیرآلات بارش | کارخانه تولید شیرآلات باکیفیت ایرانی",
    description:
      "تولیدکننده برتر شیرآلات بهداشتی و ساختمانی با ۲۵ سال تجربه. ضمانت اصل بودن کالا، ارسال سریع و پشتیبانی ۲۴ ساعته.",
    url: "https://bareshco.com",
    siteName: "شیرآلات بارش",
    locale: "fa_IR",
    alternateLocale: ["en_US"],
    type: "website",
    emails: ["info@bareshco.com"],
    phoneNumbers: ["+989123023349"],
    countryName: "Iran",
    images: [
      {
        url: "https://bareshco.com/images/og/og-image-main.webp",
        width: 1200,
        height: 630,
        alt: "شیرآلات بارش - تولیدکننده شیرآلات بهداشتی",
        type: "image/webp",
        secureUrl: "https://bareshco.com/images/og/og-image-main.webp",
      },
      {
        url: "https://bareshco.com/images/og/og-image-product.webp",
        width: 1200,
        height: 630,
        alt: "محصولات شیرآلات بارش",
        type: "image/webp",
      },
    ],
    videos: [
      {
        url: "https://bareshco.com/videos/intro.mp4",
        width: 1920,
        height: 1080,
        type: "video/mp4",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@bareshco",
    siteId: "123456789",
    creator: "@bareshco",
    creatorId: "123456789",
    title: "شیرآلات بارش | تولیدکننده شیرآلات بهداشتی",
    description:
      "کارخانه تولیدی شیرآلات بارش با استانداردهای جهانی و ضمانت کیفیت",
    images: {
      url: "https://bareshco.com/images/og/twitter-image.webp",
      alt: "شیرآلات بارش",
      width: 1200,
      height: 600,
    },
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  verification: {
    google: "sFBxOHjudYpACC-uzzhxIVr_IG8QyJamVfyqljjRHis",
    yandex: "yandex-verification-code",
    me: "me@bareshco.com",
    other: {
      "facebook-domain-verification": "facebook-verification-code",
      "msvalidate.01": "bing-verification-code",
    },
  },

  category: "shopping",

  classification: "Business > Industrial Goods > Plumbing Fixtures",

  referrer: "origin-when-cross-origin",

  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },

  appleWebApp: {
    capable: true,
    title: "شیرآلات بارش",
    statusBarStyle: "black-translucent",
  },

  appLinks: {
    ios: {
      url: "https://bareshco.com/app",
      app_store_id: "123456789",
    },
    android: {
      package: "com.bareshco.app",
      url: "https://bareshco.com/app",
    },
  },

  bookmarks: ["https://bareshco.com/products"],

  other: {
    "format-detection": "telephone=no",
    "msapplication-TileColor": "#0a0f1a",
    "msapplication-TileImage": "/icons/ms-icon-144x144.png",
    "msapplication-config": "/browserconfig.xml",
    "geo.region": "IR",
    "geo.placename": "Tehran",
    "geo.position": "35.6892;51.3890",
    "ICBM": "35.6892, 51.3890",
  },
}

// ========== ROOT LAYOUT WITH ENHANCED STRUCTURE ==========
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLdOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "شیرآلات بارش",
    alternateName: "کارخانه تولیدی شیرآلات بارش",
    url: "https://bareshco.com",
    logo: "https://bareshco.com/images/logo.webp",
    image: "https://bareshco.com/images/og-image.webp",
    description:
      "تولیدکننده برتر شیرآلات بهداشتی و ساختمانی در ایران با بیش از ۲۵ سال سابقه",
    address: {
      "@type": "PostalAddress",
      streetAddress: "شهرک صنعتی سلمان‌شهر، بلاص اصلی",
      addressLocality: "تهران",
      addressRegion: "تهران",
      postalCode: "123456789",
      addressCountry: "IR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+98-9123023349",
      contactType: "customer service",
      availableLanguage: ["Persian", "English"],
    },
    sameAs: [
      "https://www.instagram.com/bareshco",
      "https://t.me/bareshco",
      "https://www.linkedin.com/company/bareshco",
      "https://www.aparat.com/bareshco",
    ],
    foundingDate: "1999",
    numberOfEmployees: "50-100",
    legalName: "شرکت تولیدی صنعتی بارش",
    taxID: "12345678901",
  }

  const jsonLdWebSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "شیرآلات بارش",
    url: "https://bareshco.com",
    description: "فروشگاه آنلاین و کارخانه تولید شیرآلات بارش",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://bareshco.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  }

  const jsonLdLocalBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "کارخانه شیرآلات بارش",
    image: "https://bareshco.com/images/factory.webp",
    priceRange: "$$",
    openingHours: "Sa-Th 08:00-17:00",
    telephone: "+989123023349",
    email: "info@bareshco.com",
  }

  return (
    <html
      lang="fa"
      dir="rtl"
      className={`scroll-smooth ${raviFont.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to Critical Domains */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preload" href="/fonts/ravi.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

        {/* RSS Feed */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS Feed شیرآلات بارش"
          href="/feed.xml"
        />

        {/* Sitemap */}
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
      </head>

      <body
        className="min-h-screen bg-lineaer-to-br from-slate-950 via-slate-900 to-slate-950 text-white antialiased"
        style={{
          background: "radial-gradient(ellipse at top, #1e293b 0%, #0a0f1a 100%)",
        }}
      >
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLocalBusiness) }}
        />

        {/* Main Content with Conditional Layout */}
        <ConditionalLayout>{children}</ConditionalLayout>

        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZV24KTY6KL"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZV24KTY6KL', {
              page_path: window.location.pathname,
              send_page_view: true,
              cookie_flags: 'SameSite=None;Secure',
              anonymize_ip: true,
            });
          `}
        </Script>

        {/* Google Tag Manager (Noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
      </body>
    </html>
  )
}