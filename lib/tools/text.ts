/**
 * Client-side metin araÃ§larÄ±.
 */

export interface TextStats {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  lines: number;
  sentences: number;
  paragraphs: number;
}

/**
 * Metin istatistiklerini hesaplar.
 */
export function analyzeText(text: string): TextStats {
  if (!text.trim()) {
    return {
      words: 0,
      characters: 0,
      charactersNoSpaces: 0,
      lines: 0,
      sentences: 0,
      paragraphs: 0,
    };
  }

  const words = text
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  const lines = text.split(/\r\n|\r|\n/).length;
  const sentences = text
    .split(/[.!?]+/)
    .filter((s) => s.trim().length > 0).length;
  const paragraphs = text
    .split(/\n\s*\n/)
    .filter((p) => p.trim().length > 0).length;

  return { words, characters, charactersNoSpaces, lines, sentences, paragraphs };
}

/**
 * Metni bÃ¼yÃ¼k harfe dÃ¶nÃ¼ÅŸtÃ¼rÃ¼r.
 */
export function toUpperCase(text: string): string {
  return text.toLocaleUpperCase("tr-TR");
}

/**
 * Metni kÃ¼Ã§Ã¼k harfe dÃ¶nÃ¼ÅŸtÃ¼rÃ¼r.
 */
export function toLowerCase(text: string): string {
  return text.toLocaleLowerCase("tr-TR");
}

/**
 * Her kelimenin ilk harfini bÃ¼yÃ¼tÃ¼r.
 */
export function toTitleCase(text: string): string {
  return text
    .toLocaleLowerCase("tr-TR")
    .replace(/(^|\s)\S/g, (char) => char.toLocaleUpperCase("tr-TR"));
}

/**
 * CÃ¼mlelerin ilk harfini bÃ¼yÃ¼tÃ¼r.
 */
export function toSentenceCase(text: string): string {
  return text
    .toLocaleLowerCase("tr-TR")
    .replace(/(^\s*|[.!?]\s+)(\S)/g, (_match, prefix, char) => {
      return prefix + char.toLocaleUpperCase("tr-TR");
    });
}

/**
 * Metni temizler: fazla boÅŸluklarÄ± kaldÄ±rÄ±r, satÄ±r baÅŸÄ±/sonu temizler.
 */
export function cleanText(
  text: string,
  options: {
    trimLines?: boolean;
    removeExtraSpaces?: boolean;
    removeEmptyLines?: boolean;
    removeLineBreaks?: boolean;
  } = {}
): string {
  const {
    trimLines = true,
    removeExtraSpaces = true,
    removeEmptyLines = true,
    removeLineBreaks = false,
  } = options;

  let result = text;

  if (trimLines) {
    result = result
      .split("\n")
      .map((line) => line.trim())
      .join("\n");
  }

  if (removeExtraSpaces) {
    result = result.replace(/[^\S\n]+/g, " ");
  }

  if (removeEmptyLines) {
    result = result.replace(/\n{3,}/g, "\n\n");
  }

  if (removeLineBreaks) {
    result = result.replace(/\n+/g, " ");
  }

  return result.trim();
}
