import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import HashGeneratorTool from "./HashGeneratorTool";

export const metadata: Metadata = {
  title: "Hash OluÅŸturucu - SHA-256, MD5, SHA-1 HesaplayÄ±cÄ±",
  description:
    "Metinleriniz iÃ§in tarayÄ±cÄ±nÄ±zda anÄ±nda MD5, SHA-1, SHA-256 ve SHA-512 kriptografik hash deÄŸerlerini hesaplayÄ±n. GÃ¼venli ve Ã¼cretsiz.",
  openGraph: {
    title: "Hash OluÅŸturucu | turkconvert",
    description: "AnÄ±nda SHA-256, MD5 ve SHA-1 hash hesaplayÄ±n.",
  },
};

export default function HashGeneratorPage() {
  return (
    <ToolPageLayout
      title="Hash OluÅŸturucu"
      description="Metinlerinizi ve verilerinizi SHA-256, MD5, SHA-1 ve SHA-512 kriptografik hash formatlarÄ±na dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n."
    >
      <HashGeneratorTool />
    </ToolPageLayout>
  );
}
