import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { getToolMetadata } from "@/lib/constants/tool-seo";
import { ImageFormatConverter } from "@/components/ui/ImageFormatConverter";

export const metadata: Metadata = getToolMetadata("png-to-jpg");

export default function PngToJpgPage() {
  return (
    <ToolPageLayout toolId="png-to-jpg">
      <ImageFormatConverter
        acceptTypes="image/png,.png"
        sourceLabel="PNG"
        targetFormat="image/jpeg"
        targetExtension="jpg"
        targetLabel="JPG"
      />
    </ToolPageLayout>
  );
}
