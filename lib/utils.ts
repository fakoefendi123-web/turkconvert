/**
 * Dosya boyutunu okunabilir formata dÃ¶nÃ¼ÅŸtÃ¼rÃ¼r.
 * Ã–rn: 1024 â†’ "1.00 KB"
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

/**
 * Dosya adÄ±ndan uzantÄ±yÄ± deÄŸiÅŸtirir.
 * Ã–rn: ("photo.jpg", "png") â†’ "photo.png"
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
 * YÃ¼zde hesaplar.
 */
export function calculateSavingsPercent(
  originalSize: number,
  newSize: number
): number {
  if (originalSize === 0) return 0;
  return Math.round(((originalSize - newSize) / originalSize) * 100);
}
