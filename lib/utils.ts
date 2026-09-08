/**
 * Dosya boyutunu okunabilir formata dönüştürür.
 * Örn: 1024 → "1.00 KB"
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

/**
 * Dosya adından uzantıyı değiştirir.
 * Örn: ("photo.jpg", "png") → "photo.png"
 */
export function changeFileExtension(
  fileName: string,
  newExtension: string
): string {
  const lastDot = fileName.lastIndexOf(".");
  const baseName = lastDot > 0 ? fileName.substring(0, lastDot) : fileName;
  return `${baseName}.${newExtension}`;
}

/**
 * Yüzde hesaplar.
 */
export function calculateSavingsPercent(
  originalSize: number,
  newSize: number
): number {
  if (originalSize === 0) return 0;
  return Math.round(((originalSize - newSize) / originalSize) * 100);
}
