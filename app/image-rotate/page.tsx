import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import ImageRotateTool from "./ImageRotateTool";

export const metadata: Metadata = {
  title: "GÃ¶rsel DÃ¶ndÃ¼rme ve Ã‡evirme - Ãœcretsiz Online",
  description:
    "GÃ¶rsellerinizi 90Â°, 180Â° veya 270Â° dÃ¶ndÃ¼rÃ¼n, yatay ve dikey olarak aynalayÄ±n. TarayÄ±cÄ±nÄ±zda Ã¼cretsiz, hÄ±zlÄ± ve gÃ¼venli.",
  openGraph: {
    title: "GÃ¶rsel DÃ¶ndÃ¼rme ve Ã‡evirme - Ãœcretsiz Online | turkconvert",
    description:
      "GÃ¶rsellerinizi Ã¼cretsiz olarak dÃ¶ndÃ¼rÃ¼n ve aynalayÄ±n. Ãœyelik gerekmez.",
  },
};

export default function ImageRotatePage() {
  return (
    <ToolPageLayout
      title="GÃ¶rsel DÃ¶ndÃ¼rme & Ã‡evirme"
      description="GÃ¶rsellerinizi istediÄŸiniz aÃ§Ä±da dÃ¶ndÃ¼rÃ¼n veya yatay/dikey olarak aynalayÄ±n."
    >
      <ImageRotateTool />
    </ToolPageLayout>
  );
}
