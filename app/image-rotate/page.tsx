import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { getToolMetadata } from "@/lib/constants/tool-seo";
import ImageRotateTool from "./ImageRotateTool";

export const metadata: Metadata = getToolMetadata("image-rotate");

export default function ImageRotatePage() {
  return (
    <ToolPageLayout toolId="image-rotate">
      <ImageRotateTool />
    </ToolPageLayout>
  );
}
