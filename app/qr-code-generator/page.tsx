import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { QrCodeGeneratorTool } from "./QrCodeGeneratorTool";

export const metadata: Metadata = {
  title: "QR Kod Oluşturucu - Ücretsiz Online",
  description: "Metin veya URL adresinden ücretsiz QR kod oluşturun ve indirin.",
  openGraph: {
    title: "QR Kod Oluşturucu - Ücretsiz Online | turkconvert",
    description:
      "Metin veya URL adresinden ücretsiz QR kod oluşturun ve indirin.",
    type: "website",
    locale: "tr_TR",
    siteName: "turkconvert",
  },
};

export default function QrCodeGeneratorPage() {
  return (
    <ToolPageLayout
      title="QR Kod Oluşturucu"
      description="Metin veya URL adresinden ücretsiz QR kod oluşturun ve indirin."
    >
      <QrCodeGeneratorTool />
    </ToolPageLayout>
  );
}

