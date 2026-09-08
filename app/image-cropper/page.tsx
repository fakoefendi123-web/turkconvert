import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import ImageCropperTool from "./ImageCropperTool";

export const metadata: Metadata = {
  title: "GÃ¶rsel KÄ±rpÄ±cÄ± - Ãœcretsiz Online",
  description:
    "GÃ¶rsellerinizi istediÄŸiniz oranda (1:1, 16:9, 4:3) veya serbest olarak kÄ±rpÄ±n ve yÃ¼ksek kalitede indirin. Ãœcretsiz ve gÃ¼venli.",
  openGraph: {
    title: "GÃ¶rsel KÄ±rpÄ±cÄ± - Ãœcretsiz Online | turkconvert",
    description: "GÃ¶rsellerinizi tarayÄ±cÄ±nÄ±zda kolayca kÄ±rpÄ±n ve indirin.",
  },
};

export default function ImageCropperPage() {
  return (
    <ToolPageLayout
      title="GÃ¶rsel KÄ±rpÄ±cÄ±"
      description="GÃ¶rsellerinizi 1:1, 16:9 veya serbest oranda kÄ±rparak istediÄŸiniz alanÄ± kesin."
    >
      <ImageCropperTool />
    </ToolPageLayout>
  );
}
