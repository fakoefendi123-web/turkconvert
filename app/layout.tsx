import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "turkconvert — Ücretsiz Online Dosya Dönüştürme Araçları",
    template: "%s | turkconvert",
  },
  description:
    "Ücretsiz, hızlı ve reklamsız dosya dönüştürme araçları. JPG, PNG, WEBP dönüştürme, PDF oluşturma, metin araçları ve daha fazlası.",
  keywords: [
    "dosya dönüştürme",
    "jpg png dönüştürme",
    "online dönüştürücü",
    "ücretsiz dönüştürücü",
    "pdf dönüştürme",
    "görsel dönüştürme",
  ],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "turkconvert",
    title: "turkconvert — Ücretsiz Online Dosya Dönüştürme Araçları",
    description:
      "Ücretsiz, hızlı ve reklamsız dosya dönüştürme araçları. Üyelik gerekmez.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

