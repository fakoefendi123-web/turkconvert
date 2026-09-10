import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { getToolMetadata } from "@/lib/constants/tool-seo";
import ImageCompareTool from "./ImageCompareTool";

export const metadata: Metadata = getToolMetadata("image-compare");

export default function ImageComparePage() {
  return (
    <ToolPageLayout toolId="image-compare">
      <ImageCompareTool />
    </ToolPageLayout>
  );
}
