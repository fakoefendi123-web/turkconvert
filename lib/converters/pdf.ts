/**
 * Client-side PDF oluşturma.
 * jsPDF kullanarak görselleri PDF'e dönüştürür.
 */

import { jsPDF } from "jspdf";

/**
 * Görselleri PDF'e dönüştürür.
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

    // Görseli sayfaya sığdır (en-boy oranını koru)
    const ratio = Math.min(
      maxWidth / dimensions.width,
      maxHeight / dimensions.height,
      1 // Orijinalden büyütme
    );

    const imgWidth = dimensions.width * ratio;
    const imgHeight = dimensions.height * ratio;

    // Görseli sayfanın ortasına yerleştir
    const x = (pageWidth - imgWidth) / 2;
    const y = (pageHeight - imgHeight) / 2;

    const format = getImageFormatForPdf(files[i].type);
    pdf.addImage(dataUrl, format, x, y, imgWidth, imgHeight);
  }

  return pdf.output("blob");
}

/**
 * Dosyayı data URL'e dönüştürür.
 */
function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Dosya okunamadı."));
    reader.readAsDataURL(file);
  });
}

/**
 * Data URL'den görsel boyutlarını alır.
 */
function getImageDimensions(
  dataUrl: string
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () =>
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = () => reject(new Error("Görsel yüklenemedi."));
    img.src = dataUrl;
  });
}

/**
 * MIME tipinden jsPDF format stringi döndürür.
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
