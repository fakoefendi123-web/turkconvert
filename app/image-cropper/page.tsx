import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { getToolMetadata } from "@/lib/constants/tool-seo";
import ImageCropperTool from "./ImageCropperTool";

export const metadata: Metadata = getToolMetadata("image-cropper");

export default function ImageCropperPage() {
  return (
    <ToolPageLayout toolId="image-cropper">
      <ImageCropperTool />
    </ToolPageLayout>
  );
}
