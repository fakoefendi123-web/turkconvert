import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { getToolMetadata } from "@/lib/constants/tool-seo";
import { ImageFormatConverter } from "@/components/ui/ImageFormatConverter";

export const metadata: Metadata = getToolMetadata("webp-to-jpg");

export default function WebpToJpgPage() {
  return (
    <ToolPageLayout toolId="webp-to-jpg">
      <ImageFormatConverter
        acceptTypes="image/webp,.webp"
        sourceLabel="WEBP"
        targetFormat="image/jpeg"
        targetExtension="jpg"
        targetLabel="JPG"
      />
    </ToolPageLayout>
  );
}
