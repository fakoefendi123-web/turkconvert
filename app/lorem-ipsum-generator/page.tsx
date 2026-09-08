import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import LoremIpsumTool from "./LoremIpsumTool";

export const metadata: Metadata = {
  title: "Lorem Ipsum Ãœretici - Yer Tutucu Metin OluÅŸturucu",
  description:
    "TasarÄ±m, web sitesi ve baskÄ± projeleriniz iÃ§in paragraf, cÃ¼mle veya kelime bazÄ±nda klasik veya TÃ¼rkÃ§e Lorem Ipsum metinleri Ã¼retin. Ãœcretsiz ve hÄ±zlÄ±.",
  openGraph: {
    title: "Lorem Ipsum Ãœretici | turkconvert",
    description: "AnÄ±nda paragraf ve kelime bazÄ±nda yer tutucu metin Ã¼retin.",
  },
};

export default function LoremIpsumPage() {
  return (
    <ToolPageLayout
      title="Lorem Ipsum Ãœretici"
      description="TasarÄ±m ve geliÅŸtirme projeleriniz iÃ§in paragraf, cÃ¼mle veya kelime bazÄ±nda yer tutucu metin oluÅŸturun."
    >
      <LoremIpsumTool />
    </ToolPageLayout>
  );
}
