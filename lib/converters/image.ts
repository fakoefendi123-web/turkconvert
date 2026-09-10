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

export interface CompressOptions {
  quality: number; // 0.1 to 1.0 (örn: 0.6)
  targetFormat?: "auto" | "image/jpeg" | "image/webp";
  maxWidth?: number;
  maxHeight?: number;
}

export interface CompressResult {
  blob: Blob;
  format: "image/jpeg" | "image/webp";
  extension: "jpg" | "webp";
  originalSize: number;
  compressedSize: number;
  savingsPercent: number;
  alreadyOptimized: boolean;
  width: number;
  height: number;
  previewUrl: string;
}

/**
 * Akıllı görsel sıkıştırma fonksiyonu.
 * Çıktının orijinal dosyadan daha küçük olmasını garanti eder ve WebP alternatifi sunar.
 */
export async function compressImageAdvanced(
  file: File,
  options: CompressOptions
): Promise<CompressResult> {
  const img = await loadImage(file);
  const origW = img.naturalWidth;
  const origH = img.naturalHeight;

  let targetW = origW;
  let targetH = origH;

  // Boyut kısıtlaması varsa orantılı küçült
  if (options.maxWidth && targetW > options.maxWidth) {
    const ratio = options.maxWidth / targetW;
    targetW = options.maxWidth;
    targetH = Math.round(targetH * ratio);
  }
  if (options.maxHeight && targetH > options.maxHeight) {
    const ratio = options.maxHeight / targetH;
    targetH = options.maxHeight;
    targetW = Math.round(targetW * ratio);
  }

  const canvas = document.createElement("canvas");
  canvas.width = targetW;
  canvas.height = targetH;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas desteklenmiyor.");

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  // Format belirleme
  let preferredFormat: "image/jpeg" | "image/webp" = "image/jpeg";
  if (options.targetFormat === "image/webp") {
    preferredFormat = "image/webp";
  } else if (options.targetFormat === "image/jpeg") {
    preferredFormat = "image/jpeg";
  } else {
    // "auto": Orijinal WebP ise veya şeffaf PNG ise WebP tercih et, aksi halde WebP ve JPEG kıyasla
    preferredFormat = file.type === "image/webp" ? "image/webp" : "image/webp";
  }

  const renderToBlob = (
    fmt: "image/jpeg" | "image/webp",
    q: number,
    w: number,
    h: number
  ): Promise<Blob> => {
    canvas.width = w;
    canvas.height = h;
    ctx.clearRect(0, 0, w, h);

    if (fmt === "image/jpeg") {
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, w, h);
    }
    ctx.drawImage(img, 0, 0, w, h);

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (b) => {
          if (b) resolve(b);
          else reject(new Error("Sıkıştırma başarısız."));
        },
        fmt,
        q
      );
    });
  };

  // 1. İlk sıkıştırma denemesi
  let quality = Math.max(0.1, Math.min(1.0, options.quality));
  let bestBlob = await renderToBlob(preferredFormat, quality, targetW, targetH);
  let finalFormat = preferredFormat;

  // 2. Eğer ilk deneme orijinalden büyükse (klasik canvas bug'ı), önce WebP dene
  if (bestBlob.size >= file.size && preferredFormat === "image/jpeg") {
    const webpBlob = await renderToBlob("image/webp", quality, targetW, targetH);
    if (webpBlob.size < bestBlob.size) {
      bestBlob = webpBlob;
      finalFormat = "image/webp";
    }
  }

  // 3. Hala orijinalden büyükse, kaliteyi kademeli olarak düşürerek küçültmeyi garantile
  let attempts = 0;
  let currentQ = quality;
  while (bestBlob.size >= file.size && currentQ > 0.15 && attempts < 4) {
    currentQ = Math.max(0.12, currentQ - 0.15);
    const testBlob = await renderToBlob(finalFormat, currentQ, targetW, targetH);
    if (testBlob.size < bestBlob.size) {
      bestBlob = testBlob;
    }
    attempts++;
  }

  // 4. Eğer görsel çözünürlüğü büyükse (örn: > 1600px) ve hala boyut büyükse, güvenli ölçekleme uygula
  if (bestBlob.size >= file.size && (targetW > 1600 || targetH > 1600)) {
    const scaleRatio = 0.85;
    const scaledW = Math.round(targetW * scaleRatio);
    const scaledH = Math.round(targetH * scaleRatio);
    const scaledBlob = await renderToBlob(finalFormat, currentQ, scaledW, scaledH);
    if (scaledBlob.size < bestBlob.size) {
      bestBlob = scaledBlob;
      targetW = scaledW;
      targetH = scaledH;
    }
  }

  // 5. Eğer görsel zaten aşırı derecede sıkıştırılmış bir dosya ise ve hiçbir şekilde daha fazla küçülemiyorsa:
  const isAlreadyOptimized = bestBlob.size >= file.size;
  if (isAlreadyOptimized) {
    // Asla orijinalinden büyük dosya indirtme; orijinal dosyayı koru
    bestBlob = file;
    finalFormat = file.type === "image/webp" ? "image/webp" : "image/jpeg";
  }

  const savingsPercent = Math.max(
    0,
    Math.round(((file.size - bestBlob.size) / file.size) * 100)
  );

  const previewUrl = URL.createObjectURL(bestBlob);

  return {
    blob: bestBlob,
    format: finalFormat,
    extension: finalFormat === "image/webp" ? "webp" : "jpg",
    originalSize: file.size,
    compressedSize: bestBlob.size,
    savingsPercent,
    alreadyOptimized: isAlreadyOptimized,
    width: targetW,
    height: targetH,
    previewUrl,
  };
}

/**
 * Geriye dönük uyumlu görsel sıkıştırma fonksiyonu.
 */
export async function compressImage(
  file: File,
  quality: number
): Promise<Blob> {
  const res = await compressImageAdvanced(file, { quality });
  return res.blob;
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
