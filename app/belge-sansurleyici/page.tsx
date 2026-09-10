import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { getToolMetadata } from "@/lib/constants/tool-seo";
import DocumentRedactorTool from "./DocumentRedactorTool";

export const metadata: Metadata = getToolMetadata("belge-sansurleyici");

export default function DocumentRedactorPage() {
  return (
    <ToolPageLayout toolId="belge-sansurleyici">
      <DocumentRedactorTool />
    </ToolPageLayout>
  );
}
