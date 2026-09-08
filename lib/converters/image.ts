/**
 * Client-side gÃ¶rsel dÃ¶nÃ¼ÅŸtÃ¼rme iÅŸlemleri.
 * Canvas API kullanarak ek baÄŸÄ±mlÄ±lÄ±k gerektirmez.
 */

/**
 * GÃ¶rseli hedef formata dÃ¶nÃ¼ÅŸtÃ¼rÃ¼r.
 */
export async function convertImage(
  file: File,
  targetFormat: "image/png" | "image/jpeg" | "image/webp",
  quality?: number
): Promise<Blob> {
  const img = await loadImage(file);
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas desteklenmiyor.");

  // JPEG formatÄ±nda ÅŸeffaf arka plan beyaz olmalÄ±
  if (targetFormat === "image/jpeg") {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  ctx.drawImage(img, 0, 0);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("DÃ¶nÃ¼ÅŸtÃ¼rme baÅŸarÄ±sÄ±z."));
      },
      targetFormat,
      quality ?? (targetFormat === "image/jpeg" ? 0.92 : undefined)
    );
  });
}

/**
 * GÃ¶rseli yeniden boyutlandÄ±rÄ±r.
 */
export async function resizeImage(
  file: File,
  width: number,
  height: number,
  maintainAspect: boolean
): Promise<Blob> {
  const img = await loadImage(file);

  let targetWidth = width;
  let targetHeight = height;

  if (maintainAspect) {
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    if (width && !height) {
      targetHeight = Math.round(width / aspectRatio);
    } else if (height && !width) {
      targetWidth = Math.round(height * aspectRatio);
    } else {
      // Her ikisi de verilmiÅŸse geniÅŸliÄŸe gÃ¶re oran koru
      targetHeight = Math.round(width / aspectRatio);
    }
  }

  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas desteklenmiyor.");

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

  // Orijinal formatÄ± koru
  const format = getImageFormat(file.type);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("BoyutlandÄ±rma baÅŸarÄ±sÄ±z."));
      },
      format,
      format === "image/jpeg" ? 0.92 : undefined
    );
  });
}

/**
 * GÃ¶rseli sÄ±kÄ±ÅŸtÄ±rÄ±r.
 * @param quality 0-1 arasÄ± kalite deÄŸeri
 */
export async function compressImage(
  file: File,
  quality: number
): Promise<Blob> {
  const img = await loadImage(file);
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas desteklenmiyor.");

  // SÄ±kÄ±ÅŸtÄ±rma iÃ§in JPEG/WEBP kullan (PNG sÄ±kÄ±ÅŸtÄ±rma desteklemez)
  const format =
    file.type === "image/webp" ? "image/webp" : "image/jpeg";

  if (format === "image/jpeg") {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  ctx.drawImage(img, 0, 0);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("SÄ±kÄ±ÅŸtÄ±rma baÅŸarÄ±sÄ±z."));
      },
      format,
      quality
    );
  });
}

/**
 * Dosyadan Image elementi yÃ¼kler.
 */
function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("GÃ¶rsel yÃ¼klenemedi."));
    };

    img.src = url;
  });
}

/**
 * MIME tipinden format dÃ¶ndÃ¼rÃ¼r.
 */
function getImageFormat(
  mimeType: string
): "image/png" | "image/jpeg" | "image/webp" {
  switch (mimeType) {
    case "image/jpeg":
      return "image/jpeg";
    case "image/webp":
      return "image/webp";
    default:
      return "image/png";
  }
}
