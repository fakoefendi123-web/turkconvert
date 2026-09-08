import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { QrCodeGeneratorTool } from "./QrCodeGeneratorTool";

export const metadata: Metadata = {
  title: "QR Kod Oluþturucu - Ücretsiz Online",
  description: "Metin veya URL adresinden ücretsiz QR kod oluþturun ve indirin.",
  openGraph: {
    title: "QR Kod Oluþturucu - Ücretsiz Online | turkconvert",
    description:
      "Metin veya URL adresinden ücretsiz QR kod oluþturun ve indirin.",
    type: "website",
    locale: "tr_TR",
    siteName: "turkconvert",
  },
};

export default function QrCodeGeneratorPage() {
  return (
    <ToolPageLayout
      title="QR Kod Oluþturucu"
      description="Metin veya URL adresinden ücretsiz QR kod oluþturun ve indirin."
    >
      <QrCodeGeneratorTool />
    </ToolPageLayout>
  );
}

