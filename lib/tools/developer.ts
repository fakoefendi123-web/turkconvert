/**
 * Client-side geliÅŸtirici araÃ§larÄ±.
 */

/**
 * JSON'u gÃ¼zel formatlÄ± hale getirir.
 */
export function formatJSON(input: string, indent: number = 2): string {
  const parsed = JSON.parse(input);
  return JSON.stringify(parsed, null, indent);
}

/**
 * JSON'u sÄ±kÄ±ÅŸtÄ±rÄ±lmÄ±ÅŸ (minified) formata dÃ¶nÃ¼ÅŸtÃ¼rÃ¼r.
 */
export function minifyJSON(input: string): string {
  const parsed = JSON.parse(input);
  return JSON.stringify(parsed);
}

/**
 * Metni Base64 formatÄ±na dÃ¶nÃ¼ÅŸtÃ¼rÃ¼r.
 */
export function encodeBase64(input: string): string {
  // UTF-8 desteÄŸi iÃ§in TextEncoder kullan
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  let binary = "";
  for (let i = 0; i < data.length; i++) {
    binary += String.fromCharCode(data[i]);
  }
  return btoa(binary);
}

/**
 * Base64 verisini orijinal metne dÃ¶nÃ¼ÅŸtÃ¼rÃ¼r.
 */
export function decodeBase64(input: string): string {
  const binary = atob(input.trim());
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  const decoder = new TextDecoder();
  return decoder.decode(bytes);
}

/**
 * URL encode.
 */
export function encodeURL(input: string): string {
  return encodeURIComponent(input);
}

/**
 * URL decode.
 */
export function decodeURL(input: string): string {
  return decodeURIComponent(input);
}

/**
 * UUID v4 Ã¼retir.
 */
export function generateUUID(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
