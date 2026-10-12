import type { Metadata } from "next";
import PdfOrganizeTool from "./PdfOrganizeTool";

export const metadata: Metadata = {
  title: "Görsel PDF Sayfa Düzenleyici - Sayfa Döndür, Sil, Sırala | TurkConvert",
  description:
    "PDF sayfalarınızı görsel küçük kartlar olarak inceleyin, sürükleyerek sıralayın, ters sayfaları 90° döndürün veya istemediğiniz sayfaları silin. Ücretsiz ve %100 gizli.",
  keywords: [
    "pdf sayfa düzenleme",
    "pdf organize",
    "pdf sayfa döndürme",
    "pdf sayfa silme",
    "pdf sayfa sıralama",
    "online pdf düzenleyici",
    "pdf rotate pages",
  ],
};

export default function PdfOrganizePage() {
  return <PdfOrganizeTool />;
}
