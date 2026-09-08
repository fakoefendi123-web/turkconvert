import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import LoremIpsumTool from "./LoremIpsumTool";

export const metadata: Metadata = {
  title: "Lorem Ipsum Üretici - Yer Tutucu Metin Oluşturucu",
  description:
    "Tasarım, web sitesi ve baskı projeleriniz için paragraf, cümle veya kelime bazında klasik veya Türkçe Lorem Ipsum metinleri üretin. Ücretsiz ve hızlı.",
  openGraph: {
    title: "Lorem Ipsum Üretici | turkconvert",
    description: "Anında paragraf ve kelime bazında yer tutucu metin üretin.",
  },
};

export default function LoremIpsumPage() {
  return (
    <ToolPageLayout
      title="Lorem Ipsum Üretici"
      description="Tasarım ve geliştirme projeleriniz için paragraf, cümle veya kelime bazında yer tutucu metin oluşturun."
    >
      <LoremIpsumTool />
    </ToolPageLayout>
  );
}
