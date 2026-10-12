import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { getToolMetadata } from "@/lib/constants/tool-seo";
import NumberToWordsTool from "./NumberToWordsTool";

export const metadata: Metadata = getToolMetadata("sayiyi-yaziya-cevir");

export default function NumberToWordsPage() {
  return (
    <ToolPageLayout toolId="sayiyi-yaziya-cevir">
      <NumberToWordsTool />
    </ToolPageLayout>
  );
}
