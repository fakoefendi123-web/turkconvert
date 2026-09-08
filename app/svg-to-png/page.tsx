import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import SvgToPngTool from "./SvgToPngTool";

export const metadata: Metadata = {
  title: "SVG PNG DÃ¶nÃ¼ÅŸtÃ¼rÃ¼cÃ¼ - Ãœcretsiz Online",
  description:
    "VektÃ¶rel SVG dosyalarÄ±nÄ±zÄ± yÃ¼ksek Ã§Ã¶zÃ¼nÃ¼rlÃ¼klÃ¼ (1x, 2x, 4x, 8x) ÅŸeffaf veya beyaz zeminli PNG formatÄ±na dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n. Ãœcretsiz ve reklamsÄ±z.",
  openGraph: {
    title: "SVG PNG DÃ¶nÃ¼ÅŸtÃ¼rÃ¼cÃ¼ - Ãœcretsiz Online | turkconvert",
    description: "SVG vektÃ¶rlerini anÄ±nda yÃ¼ksek kaliteli PNG'ye Ã§evirin.",
  },
};

export default function SvgToPngPage() {
  return (
    <ToolPageLayout
      title="SVG â†’ PNG DÃ¶nÃ¼ÅŸtÃ¼rÃ¼cÃ¼"
      description="SVG vektÃ¶r grafiklerinizi istediÄŸiniz Ã§Ã¶zÃ¼nÃ¼rlÃ¼kte ve arka plan tercihiyle net bir PNG formatÄ±na dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n."
    >
      <SvgToPngTool />
    </ToolPageLayout>
  );
}
