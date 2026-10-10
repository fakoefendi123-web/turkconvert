import type { Metadata } from "next";
import PdfSplitTool from "./PdfSplitTool";

export const metadata: Metadata = {
  title: "PDF Sayfalarını Ayırma - PDF Sayfalarını Böl ve Çıkar | TurkConvert",
  description:
    "PDF belgelerinizden dilediğiniz sayfaları çıkarın veya her sayfayı ayrı PDF olarak ayırıp ZIP indirin. Ücretsiz, reklamsız ve %100 gizli.",
  keywords: [
    "pdf ayırma",
    "pdf split",
    "pdf sayfalarını ayırma",
    "pdf bölme online",
    "pdf sayfa çıkarma",
  ],
};

export default function PdfSplitPage() {
  return <PdfSplitTool />;
}
