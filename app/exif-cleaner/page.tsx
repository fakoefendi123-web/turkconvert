import type { Metadata } from "next";
import ExifCleanerTool from "./ExifCleanerTool";

export const metadata: Metadata = {
  title: "Fotoğraf EXIF & Metadata Temizleyici - Konum ve Kamera Bilgisi Sil | TurkConvert",
  description:
    "Fotoğraflarınızdaki GPS konumu, çekim saati ve cihaz bilgilerini saniyeler içinde temizleyin. Ücretsiz, güvenli ve %100 gizli.",
  keywords: [
    "exif temizleyici",
    "metadata silme",
    "fotoğraf konum silme",
    "exif remover online",
    "fotoğraf gizlilik temizleme",
  ],
};

export default function ExifCleanerPage() {
  return <ExifCleanerTool />;
}
