import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { getToolMetadata } from "@/lib/constants/tool-seo";
import { QrCodeGeneratorTool } from "./QrCodeGeneratorTool";

export const metadata: Metadata = getToolMetadata("qr-code-generator");

export default function QrCodeGeneratorPage() {
  return (
    <ToolPageLayout toolId="qr-code-generator">
      <QrCodeGeneratorTool />
    </ToolPageLayout>
  );
}

