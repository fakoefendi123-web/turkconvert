import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { ImageFormatConverter } from "@/components/ui/ImageFormatConverter";

export const metadata: Metadata = {
  title: "JPG WEBP DÃ¶nÃ¼ÅŸtÃ¼rÃ¼cÃ¼ - Ãœcretsiz Online",
  description:
    "JPG dosyalarÄ±nÄ±zÄ± Ã¼cretsiz ve kolayca WEBP formatÄ±na dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n. Ãœyelik ve reklam gerekmez.",
  openGraph: {
    title: "JPG WEBP DÃ¶nÃ¼ÅŸtÃ¼rÃ¼cÃ¼ - Ãœcretsiz Online",
    description:
      "JPG dosyalarÄ±nÄ±zÄ± Ã¼cretsiz ve kolayca WEBP formatÄ±na dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n. Ãœyelik ve reklam gerekmez.",
  },
};

export default function JpgToWebpPage() {
  return (
    <ToolPageLayout
      title="JPG â†’ WEBP"
      description="JPG gÃ¶rsellerinizi Ã¼cretsiz olarak WEBP formatÄ±na dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n."
    >
      <ImageFormatConverter
        acceptTypes="image/jpeg,image/jpg,.jpg,.jpeg"
        sourceLabel="JPG"
        targetFormat="image/webp"
        targetExtension="webp"
        targetLabel="WEBP"
      />
    </ToolPageLayout>
  );
}
