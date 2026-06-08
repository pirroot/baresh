import type { Metadata } from 'next';
import raviFont from '@/lib/font';
import './globals.css';
import ConditionalLayout from '@/components/ConditionalLayout';

export const metadata: Metadata = {
  title: {
    default: 'شیرآلات بهداشتی بارش | کارخانه تولیدی شیرآلات خانگی باکیفیت',
    template: '%s | شیرآلات بهداشتی بارش',
  },
  description:
    'کارخانه تولیدی شیرآلات بهداشتی بارش - تولیدکننده شیر ظرفشویی، شیر روشویی، شیر حمام و شیرآلات ساختمانی باکیفیت با ضمانت اصالت. تکیه بر دانش فنی، تجهیزات مدرن و استانداردهای روز تولید برای خانه‌های ایرانی.',

  keywords: [
    'شیرآلات بارش',
    'کارخانه شیرآلات',
    'شیرآلات خانگی',
    'شیر ظرفشویی',
    'شیر روشویی',
    'شیر حمام',
    'شیرآلات ساختمانی',
    'خرید شیرآلات',
    'شیرآلات باکیفیت',
    'تولیدکننده شیرآلات',
    'شیرآلات ایرانی',
  ],

  authors: [{ name: 'Barsh Faucet Manufacturing Co.' }],
  creator: 'Barsh Faucet Manufacturing Co.',
  publisher: 'Barsh Faucet Manufacturing Co.',

  metadataBase: new URL('https://bareshco.com'),

  alternates: {
    canonical: 'https://bareshco.com',
    languages: {
      'fa-IR': 'https://bareshco.com',
    },
  },

  icons: {
    icon: [
      { url: '/images/favicon.ico', sizes: 'any' },
      { url: '/images/logo-top.webp', type: 'image/webp' },
    ],
    shortcut: '/images/favicon.ico',
    apple: '/images/logo-top.webp',
  },

  openGraph: {
    title: 'شیرآلات بهداشتی بارش | کارخانه تولیدی شیرآلات بهداشتی و خانگی',
    description:
      'کارخانه تولیدی شیرآلات بارش - شیر ظرفشویی، روشویی، حمام و شیرآلات ساختمانی باکیفیت با ضمانت اصالت و قیمت مناسب.',
    url: 'https://bareshco.com',
    siteName: 'شیرآلات بارش',
    images: [
      {
        url: '/images/og-image.webp', // ← تصویر OG اختصاصی بسازید (1200×630)
        width: 1200,
        height: 630,
        alt: 'کارخانه تولیدی شیرآلات بارش - شیرآلات خانگی باکیفیت',
        type: 'image/webp',
      },
    ],
    locale: 'fa_IR',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'شیرآلات بارش | کارخانه تولیدی شیرآلات خانگی',
    description:
      'شیر ظرفشویی، روشویی، حمام و شیرآلات ساختمانی باکیفیت با ضمانت اصالت - کارخانه بارش',
    images: [
      {
        url: '/images/og-image.webp',
        alt: 'شیرآلات بارش',
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  category: 'shopping',

  other: {
    'geo.region': 'IR',
    'geo.placename': 'Iran',
    'og:locale:alternate': 'en_US',
  },
  verification: {
    google: "sFBxOHjudYpACC- uzzhxIVr_IG8QyJamVfyqljjRHis",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={`scroll-smooth ${raviFont.variable} `}>
      <body className="bg-[#2c2c2c] bg-grid">
        <ConditionalLayout >
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
