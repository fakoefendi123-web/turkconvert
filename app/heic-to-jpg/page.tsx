import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { getToolMetadata } from "@/lib/constants/tool-seo";
import HeicConverterTool from "./HeicConverterTool";

export const metadata: Metadata = getToolMetadata("heic-to-jpg");

export default function HeicToJpgPage() {
  return (
    <ToolPageLayout toolId="heic-to-jpg">
      <HeicConverterTool
        defaultFormat="image/jpeg"
        title="HEIC to JPG Dönüştürücü"
        description="iPhone (.heic) fotoğraflarınızı tarayıcınızda saniyeler içinde JPG formatına dönüştürün. Tek tek veya toplu dönüştürüp ZIP olarak indirin."
      />
    </ToolPageLayout>
  );
}
