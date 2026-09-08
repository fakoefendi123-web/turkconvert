import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { getToolMetadata } from "@/lib/constants/tool-seo";
import { ImageFormatConverter } from "@/components/ui/ImageFormatConverter";

export const metadata: Metadata = getToolMetadata("jpg-to-png");

export default function JpgToPngPage() {
  return (
    <ToolPageLayout toolId="jpg-to-png">
      <ImageFormatConverter
        acceptTypes="image/jpeg,image/jpg,.jpg,.jpeg"
        sourceLabel="JPG"
        targetFormat="image/png"
        targetExtension="png"
        targetLabel="PNG"
      />
    </ToolPageLayout>
  );
}
