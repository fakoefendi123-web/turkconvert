import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import MarkdownPreviewerTool from "./MarkdownPreviewerTool";

export const metadata: Metadata = {
  title: "Markdown EditÃ¶r ve Ã–nizleyici - CanlÄ± HTML",
  description:
    "Markdown metinlerinizi canlÄ± olarak yazÄ±n, saÄŸ tarafta anlÄ±k HTML Ã§Ä±ktÄ±sÄ±nÄ± gÃ¶rÃ¼n ve tek tÄ±kla HTML olarak indirin. Ãœcretsiz online Markdown editÃ¶rÃ¼.",
  openGraph: {
    title: "Markdown EditÃ¶r ve Ã–nizleyici | turkconvert",
    description: "CanlÄ± Markdown editÃ¶rÃ¼ ve HTML dÄ±ÅŸa aktarÄ±cÄ±.",
  },
};

export default function MarkdownPreviewerPage() {
  return (
    <ToolPageLayout
      title="Markdown Ã–nizleyici & EditÃ¶r"
      description="Markdown formatÄ±nda belgelerinizi yazÄ±n, canlÄ± olarak Ã¶nizleyin ve HTML formatÄ±nda kopyalayÄ±n ya da indirin."
    >
      <MarkdownPreviewerTool />
    </ToolPageLayout>
  );
}
