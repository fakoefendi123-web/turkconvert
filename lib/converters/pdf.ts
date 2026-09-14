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

    const { dataUrl, format, width, height } = await prepareImageForPdf(files[i]);

    // Görseli sayfaya sığdır (en-boy oranını koru)
    const ratio = Math.min(
      maxWidth / width,
      maxHeight / height,
      1 // Orijinalden büyütme
    );

    const imgWidth = width * ratio;
    const imgHeight = height * ratio;

    // Görseli sayfanın ortasına yerleştir
    const x = (pageWidth - imgWidth) / 2;
    const y = (pageHeight - imgHeight) / 2;

    pdf.addImage(dataUrl, format, x, y, imgWidth, imgHeight);
  }

  return pdf.output("blob");
}

/**
 * Dosyayı okur ve jsPDF için güvenli format ve data URL'e dönüştürür.
 * jsPDF doğrudan WebP formatını desteklemediğinden, WebP dosyaları canvas üzerinden JPEG formatına aktarılır.
 */
async function prepareImageForPdf(
  file: File
): Promise<{ dataUrl: string; format: "JPEG" | "PNG"; width: number; height: number }> {
  const originalDataUrl = await fileToDataUrl(file);
  const dimensions = await getImageDimensions(originalDataUrl);

  if (file.type === "image/webp") {
    const canvas = document.createElement("canvas");
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const img = new Image();
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("WebP görseli yüklenemedi."));
        img.src = originalDataUrl;
      });
      ctx.drawImage(img, 0, 0);
      const convertedDataUrl = canvas.toDataURL("image/jpeg", 0.92);
      return {
        dataUrl: convertedDataUrl,
        format: "JPEG",
        width: dimensions.width,
        height: dimensions.height,
      };
    }
  }

  const format = file.type === "image/png" ? "PNG" : "JPEG";
  return {
    dataUrl: originalDataUrl,
    format,
    width: dimensions.width,
    height: dimensions.height,
  };
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
