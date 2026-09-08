/**
 * Client-side PDF oluÅŸturma.
 * jsPDF kullanarak gÃ¶rselleri PDF'e dÃ¶nÃ¼ÅŸtÃ¼rÃ¼r.
 */

import { jsPDF } from "jspdf";

/**
 * GÃ¶rselleri PDF'e dÃ¶nÃ¼ÅŸtÃ¼rÃ¼r.
 */
export async function imagesToPdf(files: File[]): Promise<Blob> {
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 10;
  const maxWidth = pageWidth - margin * 2;
  const maxHeight = pageHeight - margin * 2;

  for (let i = 0; i < files.length; i++) {
    if (i > 0) pdf.addPage();

    const dataUrl = await fileToDataUrl(files[i]);
    const dimensions = await getImageDimensions(dataUrl);

    // GÃ¶rseli sayfaya sÄ±ÄŸdÄ±r (en-boy oranÄ±nÄ± koru)
    const ratio = Math.min(
      maxWidth / dimensions.width,
      maxHeight / dimensions.height,
      1 // Orijinalden bÃ¼yÃ¼tme
    );

    const imgWidth = dimensions.width * ratio;
    const imgHeight = dimensions.height * ratio;

    // GÃ¶rseli sayfanÄ±n ortasÄ±na yerleÅŸtir
    const x = (pageWidth - imgWidth) / 2;
    const y = (pageHeight - imgHeight) / 2;

    const format = getImageFormatForPdf(files[i].type);
    pdf.addImage(dataUrl, format, x, y, imgWidth, imgHeight);
  }

  return pdf.output("blob");
}

/**
 * DosyayÄ± data URL'e dÃ¶nÃ¼ÅŸtÃ¼rÃ¼r.
 */
function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Dosya okunamadÄ±."));
    reader.readAsDataURL(file);
  });
}

/**
 * Data URL'den gÃ¶rsel boyutlarÄ±nÄ± alÄ±r.
 */
function getImageDimensions(
  dataUrl: string
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () =>
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = () => reject(new Error("GÃ¶rsel yÃ¼klenemedi."));
    img.src = dataUrl;
  });
}

/**
 * MIME tipinden jsPDF format stringi dÃ¶ndÃ¼rÃ¼r.
 */
function getImageFormatForPdf(mimeType: string): string {
  switch (mimeType) {
    case "image/png":
      return "PNG";
    case "image/webp":
      return "WEBP";
    default:
      return "JPEG";
  }
}
