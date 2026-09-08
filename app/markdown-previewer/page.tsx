import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import MarkdownPreviewerTool from "./MarkdownPreviewerTool";

export const metadata: Metadata = {
  title: "Markdown Editör ve Önizleyici - Canlı HTML",
  description:
    "Markdown metinlerinizi canlı olarak yazın, sağ tarafta anlık HTML çıktısını görün ve tek tıkla HTML olarak indirin. Ücretsiz online Markdown editörü.",
  openGraph: {
    title: "Markdown Editör ve Önizleyici | turkconvert",
    description: "Canlı Markdown editörü ve HTML dışa aktarıcı.",
  },
};

export default function MarkdownPreviewerPage() {
  return (
    <ToolPageLayout
      title="Markdown Önizleyici & Editör"
      description="Markdown formatında belgelerinizi yazın, canlı olarak önizleyin ve HTML formatında kopyalayın ya da indirin."
    >
      <MarkdownPreviewerTool />
    </ToolPageLayout>
  );
}
