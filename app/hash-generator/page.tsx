import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import HashGeneratorTool from "./HashGeneratorTool";

export const metadata: Metadata = {
  title: "Hash Oluşturucu - SHA-256, MD5, SHA-1 Hesaplayıcı",
  description:
    "Metinleriniz için tarayıcınızda anında MD5, SHA-1, SHA-256 ve SHA-512 kriptografik hash değerlerini hesaplayın. Güvenli ve ücretsiz.",
  openGraph: {
    title: "Hash Oluşturucu | turkconvert",
    description: "Anında SHA-256, MD5 ve SHA-1 hash hesaplayın.",
  },
};

export default function HashGeneratorPage() {
  return (
    <ToolPageLayout
      title="Hash Oluşturucu"
      description="Metinlerinizi ve verilerinizi SHA-256, MD5, SHA-1 ve SHA-512 kriptografik hash formatlarına dönüştürün."
    >
      <HashGeneratorTool />
    </ToolPageLayout>
  );
}
