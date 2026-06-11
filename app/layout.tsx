import type { Metadata, Viewport } from "next"
import Script from "next/script"

import raviFont from "@/lib/font"
import ConditionalLayout from "@/components/ConditionalLayout"

import "./globals.css"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0f1a",
}

export const metadata: Metadata = {
  metadataBase: new URL("https://bareshco.com"),

  title: {
    default: "شیرآلات بهداشتی بارش | کارخانه تولیدی شیرآلات خانگی باکیفیت",
    template: "%s | شیرآلات بهداشتی بارش",
  },

  description:
    "کارخانه تولیدی شیرآلات بهداشتی بارش - تولیدکننده شیر ظرفشویی، شیر روشویی، شیر حمام و شیرآلات ساختمانی باکیفیت با ضمانت اصالت. تکیه بر دانش فنی، تجهیزات مدرن و استانداردهای روز تولید برای خانه‌های ایرانی.",

  keywords: [
    "شیرآلات بارش",
    "کارخانه شیرآلات",
    "شیرآلات خانگی",
    "شیر ظرفشویی",
    "شیر روشویی",
    "شیر حمام",
    "شیرآلات ساختمانی",
    "خرید شیرآلات",
    "شیرآلات باکیفیت",
    "تولیدکننده شیرآلات",
    "شیرآلات ایرانی",
  ],

  authors: [{ name: "Barsh Faucet Manufacturing Co." }],
  creator: "Barsh Faucet Manufacturing Co.",
  publisher: "Barsh Faucet Manufacturing Co.",
  applicationName: "شیرآلات بارش",

  alternates: {
    canonical: "https://bareshco.com",
    languages: {
      "fa-IR": "https://bareshco.com",
    },
  },

  icons: {
    icon: [
      { url: "/images/favicon.ico", sizes: "any" },
      { url: "/images/logo-top.webp", type: "image/webp" },
    ],
    shortcut: "/images/favicon.ico",
    apple: [{ url: "/images/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },

  openGraph: {
    title: "شیرآلات بهداشتی بارش | کارخانه تولیدی شیرآلات بهداشتی و خانگی",
    description:
      "کارخانه تولیدی شیرآلات بارش - شیر ظرفشویی، روشویی، حمام و شیرآلات ساختمانی باکیفیت با ضمانت اصالت و قیمت مناسب.",
    url: "https://bareshco.com",
    siteName: "شیرآلات بارش",
    locale: "fa_IR",
    type: "website",
    images: [
      {
        url: "https://bareshco.com/images/og-image.webp",
        width: 1200,
        height: 630,
        alt: "کارخانه تولیدی شیرآلات بارش - شیرآلات خانگی باکیفیت",
        type: "image/webp",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "شیرآلات بارش | کارخانه تولیدی شیرآلات خانگی",
    description:
      "شیر ظرفشویی، روشویی، حمام و شیرآلات ساختمانی باکیفیت با ضمانت اصالت - کارخانه بارش",
    images: ["https://bareshco.com/images/og-image.webp"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  verification: {
    google: "sFBxOHjudYpACC-uzzhxIVr_IG8QyJamVfyqljjRHis",
  },

  category: "shopping",

  other: {
    "geo.region": "IR",
    "geo.placename": "Iran",
    "format-detection": "telephone=no",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fa" dir="rtl" className={`scroll-smooth ${raviFont.variable}`}>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body
        className="min-h-screen bg-[#0a0f1a] text-white antialiased"
        style={{
          background: "linear-gradient(135deg, #0a0f1a 0%, #0d1628 50%, #0a1520 100%)",
        }}
      >
        <ConditionalLayout>{children}</ConditionalLayout>

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZV24KTY6KL"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZV24KTY6KL', { page_path: window.location.pathname });
          `}
        </Script>
      </body>
    </html>
  )
}