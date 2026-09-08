import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "turkconvert — Ücretsiz Online Dosya Dönüþtürme Araçlarý",
    template: "%s | turkconvert",
  },
  description:
    "Ücretsiz, hýzlý ve reklamsýz dosya dönüþtürme araçlarý. JPG, PNG, WEBP dönüþtürme, PDF oluþturma, metin araçlarý ve daha fazlasý.",
  keywords: [
    "dosya dönüþtürme",
    "jpg png dönüþtürme",
    "online dönüþtürücü",
    "ücretsiz dönüþtürücü",
    "pdf dönüþtürme",
    "görsel dönüþtürme",
  ],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "turkconvert",
    title: "turkconvert — Ücretsiz Online Dosya Dönüþtürme Araçlarý",
    description:
      "Ücretsiz, hýzlý ve reklamsýz dosya dönüþtürme araçlarý. Üyelik gerekmez.",
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

