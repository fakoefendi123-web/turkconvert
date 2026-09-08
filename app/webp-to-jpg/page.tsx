import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { ImageFormatConverter } from "@/components/ui/ImageFormatConverter";

export const metadata: Metadata = {
  title: "WEBP JPG DÃ¶nÃ¼ÅŸtÃ¼rÃ¼cÃ¼ - Ãœcretsiz Online",
  description:
    "WEBP dosyalarÄ±nÄ±zÄ± Ã¼cretsiz ve kolayca JPG formatÄ±na dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n. Ãœyelik ve reklam gerekmez.",
  openGraph: {
    title: "WEBP JPG DÃ¶nÃ¼ÅŸtÃ¼rÃ¼cÃ¼ - Ãœcretsiz Online",
    description:
      "WEBP dosyalarÄ±nÄ±zÄ± Ã¼cretsiz ve kolayca JPG formatÄ±na dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n. Ãœyelik ve reklam gerekmez.",
  },
};

export default function WebpToJpgPage() {
  return (
    <ToolPageLayout
      title="WEBP â†’ JPG"
      description="WEBP gÃ¶rsellerinizi Ã¼cretsiz olarak JPG formatÄ±na dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n."
    >
      <ImageFormatConverter
        acceptTypes="image/webp,.webp"
        sourceLabel="WEBP"
        targetFormat="image/jpeg"
        targetExtension="jpg"
        targetLabel="JPG"
      />
    </ToolPageLayout>
  );
}
