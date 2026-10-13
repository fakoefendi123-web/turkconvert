import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import PercentageCalculatorTool from "./PercentageCalculatorTool";
import { getToolMetadata } from "@/lib/constants/tool-seo";
import type { Metadata } from "next";

export function generateMetadata(): Metadata {
  return getToolMetadata("yuzde-hesaplayici");
}

export default function PercentageCalculatorPage() {
  return (
    <ToolPageLayout toolId="yuzde-hesaplayici">
      <PercentageCalculatorTool />
    </ToolPageLayout>
  );
}
