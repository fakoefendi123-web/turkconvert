import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://turkconvert.online"),
  title: {
    default: "TurkConvert - Ücretsiz Online Dosya Dönüştürme Araçları",
    template: "%s | TurkConvert",
  },
  description:
    "JPG, PNG, WEBP ve PDF dönüştürme araçları dahil ücretsiz, hızlı ve güvenli online dosya araçları. Üyelik gerekmez.",
  keywords: [
    "dosya dönüştürme",
    "jpg png dönüştürme",
    "online dönüştürücü",
    "ücretsiz dönüştürücü",
    "pdf dönüştürme",
    "görsel dönüştürme",
    "resim boyutlandırma",
    "resim sıkıştırma",
    "turkconvert",
  ],
  alternates: {
    canonical: "https://turkconvert.online",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://turkconvert.online",
    siteName: "TurkConvert",
    title: "TurkConvert - Ücretsiz Online Dosya Dönüştürme Araçları",
    description:
      "JPG, PNG, WEBP ve PDF dönüştürme araçları dahil ücretsiz, hızlı ve güvenli online dosya araçları. Üyelik gerekmez.",
  },
  twitter: {
    card: "summary_large_image",
    title: "TurkConvert - Ücretsiz Online Dosya Dönüştürme Araçları",
    description:
      "JPG, PNG, WEBP ve PDF dönüştürme araçları dahil ücretsiz, hızlı ve güvenli online dosya araçları. Üyelik gerekmez.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { PwaManager } from "@/components/ui/PwaManager";
import { AdBanner } from "@/components/ui/AdBanner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3795286161515157"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col bg-mesh">
            <Navbar />
            <main className="flex-1">{children}</main>
            <div className="w-full px-4 sm:px-6 lg:px-8">
              <AdBanner />
            </div>
            <Footer />
            <PwaManager />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

