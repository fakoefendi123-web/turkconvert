/**
 * Client-side görsel dönüştürme işlemleri.
 * Canvas API kullanarak ek bağımlılık gerektirmez.
 */

/**
 * Görseli hedef formata dönüştürür.
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

  // JPEG formatında şeffaf arka plan beyaz olmalı
  if (targetFormat === "image/jpeg") {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  ctx.drawImage(img, 0, 0);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Dönüştürme başarısız."));
      },
      targetFormat,
      quality ?? (targetFormat === "image/jpeg" ? 0.92 : undefined)
    );
  });
}

/**
 * Görseli yeniden boyutlandırır.
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
      // Her ikisi de verilmişse genişliğe göre oran koru
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

  // Orijinal formatı koru
  const format = getImageFormat(file.type);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Boyutlandırma başarısız."));
      },
      format,
      format === "image/jpeg" ? 0.92 : undefined
    );
  });
}

/**
 * Görseli sıkıştırır.
 * @param quality 0-1 arası kalite değeri
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

  // Sıkıştırma için JPEG/WEBP kullan (PNG sıkıştırma desteklemez)
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
        else reject(new Error("Sıkıştırma başarısız."));
      },
      format,
      quality
    );
  });
}

/**
 * Dosyadan Image elementi yükler.
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
      reject(new Error("Görsel yüklenemedi."));
    };

    img.src = url;
  });
}

/**
 * MIME tipinden format döndürür.
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
