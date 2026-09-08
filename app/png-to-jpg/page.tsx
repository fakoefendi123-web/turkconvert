import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { ImageFormatConverter } from "@/components/ui/ImageFormatConverter";

export const metadata: Metadata = {
  title: "PNG JPG DÃ¶nÃ¼ÅŸtÃ¼rÃ¼cÃ¼ - Ãœcretsiz Online",
  description:
    "PNG dosyalarÄ±nÄ±zÄ± Ã¼cretsiz ve kolayca JPG formatÄ±na dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n. Ãœyelik ve reklam gerekmez.",
  openGraph: {
    title: "PNG JPG DÃ¶nÃ¼ÅŸtÃ¼rÃ¼cÃ¼ - Ãœcretsiz Online",
    description:
      "PNG dosyalarÄ±nÄ±zÄ± Ã¼cretsiz ve kolayca JPG formatÄ±na dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n. Ãœyelik ve reklam gerekmez.",
  },
};

export default function PngToJpgPage() {
  return (
    <ToolPageLayout
      title="PNG â†’ JPG"
      description="PNG gÃ¶rsellerinizi Ã¼cretsiz olarak JPG formatÄ±na dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n."
    >
      <ImageFormatConverter
        acceptTypes="image/png,.png"
        sourceLabel="PNG"
        targetFormat="image/jpeg"
        targetExtension="jpg"
        targetLabel="JPG"
      />
    </ToolPageLayout>
  );
}
