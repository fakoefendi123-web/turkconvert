import type { Metadata } from "next";
import HeicConverterTool from "../heic-to-jpg/HeicConverterTool";

export const metadata: Metadata = {
  title: "HEIC to PNG Dönüştürücü - iPhone Fotoğraflarını Kayıpsız PNG Yap | TurkConvert",
  description:
    "iPhone HEIC ve HEIF fotoğraflarınızı kayıpsız PNG formatına dönüştürün. Ücretsiz, reklamsız, toplu dönüştürme ve %100 tarayıcı içi gizli işlem.",
  keywords: [
    "heic to png",
    "heic png dönüştürücü",
    "iphone fotoğrafı png yapma",
    "kayıpsız heic dönüştürme",
  ],
};

export default function HeicToPngPage() {
  return (
    <HeicConverterTool
      defaultFormat="image/png"
      title="HEIC to PNG Dönüştürücü"
      description="iPhone (.heic) fotoğraflarınızı en yüksek kalitede ve kayıpsız PNG formatına dönüştürün. Tek tek veya toplu dönüştürüp ZIP olarak indirin."
    />
  );
}
