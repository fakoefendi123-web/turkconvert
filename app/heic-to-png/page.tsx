import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { getToolMetadata } from "@/lib/constants/tool-seo";
import HeicConverterTool from "../heic-to-jpg/HeicConverterTool";

export const metadata: Metadata = getToolMetadata("heic-to-png");

export default function HeicToPngPage() {
  return (
    <ToolPageLayout toolId="heic-to-png">
      <HeicConverterTool
        defaultFormat="image/png"
        title="HEIC to PNG Dönüştürücü"
        description="iPhone (.heic) fotoğraflarınızı en yüksek kalitede ve kayıpsız PNG formatına dönüştürün. Tek tek veya toplu dönüştürüp ZIP olarak indirin."
      />
    </ToolPageLayout>
  );
}
