import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import TextCleanerTool from "./TextCleanerTool";

export const metadata: Metadata = {
  title: "Metin Temizleyici",
  description:
    "Metinlerinizdeki fazla boÅŸluklarÄ±, boÅŸ satÄ±rlarÄ± ve gereksiz karakterleri temizleyin.",
  openGraph: {
    title: "Metin Temizleyici",
    description:
      "Metinlerinizdeki fazla boÅŸluklarÄ±, boÅŸ satÄ±rlarÄ± ve gereksiz karakterleri temizleyin.",
  },
};

export default function TextCleanerPage() {
  return (
    <ToolPageLayout
      title="Metin Temizleyici"
      description="Metinlerinizdeki fazla boÅŸluklarÄ±, boÅŸ satÄ±rlarÄ± ve gereksiz karakterleri temizleyin."
    >
      <TextCleanerTool />
    </ToolPageLayout>
  );
}
