import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { getToolMetadata } from "@/lib/constants/tool-seo";
import KdvCalculatorTool from "./KdvCalculatorTool";

export const metadata: Metadata = getToolMetadata("kdv-hesaplayici");

export default function KdvCalculatorPage() {
  return (
    <ToolPageLayout toolId="kdv-hesaplayici">
      <KdvCalculatorTool />
    </ToolPageLayout>
  );
}
