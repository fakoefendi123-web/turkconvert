import type { Metadata } from "next";
import PdfMergeTool from "./PdfMergeTool";

export const metadata: Metadata = {
  title: "PDF Birleştirici - Birden Fazla PDF'i Tek Dosya Yap | TurkConvert",
  description:
    "Birden fazla PDF belgesini sırasını belirleyerek ücretsiz ve reklamsız tek dosyada birleştirin. %100 tarayıcı içi, limitsiz sayfa ve tam gizlilik.",
  keywords: [
    "pdf birleştirme",
    "pdf merge",
    "pdf birleştirici online",
    "ücretsiz pdf birleştir",
    "pdf dosyalarını birleştirme",
  ],
};

export default function PdfMergePage() {
  return <PdfMergeTool />;
}
