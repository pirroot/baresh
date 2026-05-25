import type { Metadata } from 'next';
import Header from '@/components/Header';
import raviFont from '@/constants/font';
import './globals.css';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'شیرآلات بارش',
    template: '%s | شیرآلات بارش',
  },
  description: 'شرکت شیرآلات بارش - عرضه انواع شیرآلات با بهترین قیمت و کیفیت',

  keywords: [
    'شیرآلات',
    'شیرآلات بارش',
    'خرید شیرآلات',
    'شیرآلات ساختمانی',
    'شیر ظرفشویی',
    'شیر روشویی',
    'شیر حمام',
  ],

  authors: [{ name: 'Barsh Company' }],
  creator: 'Barsh Company',
  publisher: 'Barsh Company',

  metadataBase: new URL('https://bareshco.com'),

  icons: {
    icon: '/images/logo-top.webp',
    shortcut: '/images/top-logo.webp',
    apple: '/images/logo-top.webp',
  },

  openGraph: {
    title: 'شیرآلات بارش',
    description: 'عرضه انواع شیرآلات ساختمانی با بهترین قیمت و کیفیت',
    url: 'https://bareshco.com',
    siteName: 'Barsh',
    images: [
      {
        url: '/images/logo-top.webp',
        width: 1200,
        height: 630,
        alt: 'شیرآلات بارش',
      },
    ],
    locale: 'fa_IR',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'شیرآلات بارش',
    description: 'عرضه انواع شیرآلات ساختمانی با بهترین قیمت',
    images: ['/images/logo-top.webp'],
  },

  robots: {
    index: true,
    follow: true,
  },

  category: 'shopping',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={`scroll-smooth ${raviFont.variable} `}>
      <body className="bg-[#202022] bg-grid">
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
