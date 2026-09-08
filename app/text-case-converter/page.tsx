import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { getToolMetadata } from "@/lib/constants/tool-seo";
import TextCaseConverterTool from "./TextCaseConverterTool";

export const metadata: Metadata = getToolMetadata("text-case-converter");

export default function TextCaseConverterPage() {
  return (
    <ToolPageLayout toolId="text-case-converter">
      <TextCaseConverterTool />
    </ToolPageLayout>
  );
}
