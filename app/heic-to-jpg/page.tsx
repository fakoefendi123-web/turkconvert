import type { Metadata } from "next";
import HeicConverterTool from "./HeicConverterTool";

export const metadata: Metadata = {
  title: "HEIC to JPG Dönüştürücü - iPhone Fotoğraflarını JPG Yap | TurkConvert",
  description:
    "iPhone HEIC ve HEIF fotoğraflarınızı anında JPG formatına dönüştürün. Ücretsiz, hızlı, toplu dönüştürme ve %100 tarayıcı içi gizli işlem.",
  keywords: [
    "heic to jpg",
    "heic jpg dönüştürücü",
    "iphone fotoğrafı jpg yapma",
    "heic dönüştürme",
    "ücretsiz heic çevirici",
  ],
};

export default function HeicToJpgPage() {
  return (
    <HeicConverterTool
      defaultFormat="image/jpeg"
      title="HEIC to JPG Dönüştürücü"
      description="iPhone (.heic) fotoğraflarınızı tarayıcınızda saniyeler içinde JPG formatına dönüştürün. Tek tek veya toplu dönüştürüp ZIP olarak indirin."
    />
  );
}
