import type { Metadata } from "next";
import NumberToWordsTool from "./NumberToWordsTool";

export const metadata: Metadata = {
  title: "Yazıyla Sayı & Para Yazıcı - Rakamı Metne Çevirme | TurkConvert",
  description:
    "Sayıları ve para tutarlarını Türkçe okunuşuna, fatura veya çek/senet formatına dönüştürün. Ücretsiz, reklamsız ve hatasız.",
  keywords: [
    "yazıyla sayı yazma",
    "sayıyı yazıya çevirme",
    "fatura tutarı yazıyla",
    "çek senet tutarı yazıyla",
    "para tutarı metne çevirme",
  ],
};

export default function NumberToWordsPage() {
  return <NumberToWordsTool />;
}
