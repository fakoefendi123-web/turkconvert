import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import TextCaseConverterTool from "./TextCaseConverterTool";

export const metadata: Metadata = {
  title: "Büyük Küçük Harf Dönüştürücü",
  description:
    "Metinlerinizi büyük harf, küçük harf veya başlık düzenine dönüştürün.",
  openGraph: {
    title: "Büyük Küçük Harf Dönüştürücü",
    description:
      "Metinlerinizi büyük harf, küçük harf veya başlık düzenine dönüştürün.",
  },
};

export default function TextCaseConverterPage() {
  return (
    <ToolPageLayout
      title="Büyük Küçük Harf Dönüştürücü"
      description="Metinlerinizi büyük harf, küçük harf veya başlık düzenine dönüştürün."
    >
      <TextCaseConverterTool />
    </ToolPageLayout>
  );
}
