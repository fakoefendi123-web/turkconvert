import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { ImageFormatConverter } from "@/components/ui/ImageFormatConverter";

export const metadata: Metadata = {
  title: "PNG WEBP DÃ¶nÃ¼ÅŸtÃ¼rÃ¼cÃ¼ - Ãœcretsiz Online",
  description:
    "PNG dosyalarÄ±nÄ±zÄ± Ã¼cretsiz ve kolayca WEBP formatÄ±na dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n. Ãœyelik ve reklam gerekmez.",
  openGraph: {
    title: "PNG WEBP DÃ¶nÃ¼ÅŸtÃ¼rÃ¼cÃ¼ - Ãœcretsiz Online",
    description:
      "PNG dosyalarÄ±nÄ±zÄ± Ã¼cretsiz ve kolayca WEBP formatÄ±na dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n. Ãœyelik ve reklam gerekmez.",
  },
};

export default function PngToWebpPage() {
  return (
    <ToolPageLayout
      title="PNG â†’ WEBP"
      description="PNG gÃ¶rsellerinizi Ã¼cretsiz olarak WEBP formatÄ±na dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n."
    >
      <ImageFormatConverter
        acceptTypes="image/png,.png"
        sourceLabel="PNG"
        targetFormat="image/webp"
        targetExtension="webp"
        targetLabel="WEBP"
      />
    </ToolPageLayout>
  );
}
