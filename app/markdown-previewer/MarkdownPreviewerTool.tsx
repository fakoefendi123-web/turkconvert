"use client";

import { useState, useMemo } from "react";
import { marked } from "marked";
import { Copy, Check, Download, Sparkles, Trash2, FileCode } from "lucide-react";

const SAMPLE_MARKDOWN = `# turkconvert'e Hoş Geldiniz! 🚀

Bu araç ile **Markdown** metinlerinizi anlık olarak yazabilir ve sağ tarafta canlı HTML çıktısını görebilirsiniz.

## Özellikler
- **Kalın Metin** ve *İtalik Metin*
- [turkconvert Ana Sayfa](https://turkconvert.online)
- \`inline code\` ve kod blokları

### Örnek Kod Bloğu:
\`\`\`javascript
function merhaba(isim) {
  console.log("Merhaba " + isim + "!");
}
merhaba("Dünya");
\`\`\`

> "Sadelik en yüksek gelişmişlik düzeyidir." — Leonardo da Vinci

### Görev Listesi:
- [x] Ücretsiz dosya dönüştürme
- [x] Reklamsız arayüz
- [x] Client-side güvenlik
`;

function sanitizeHtml(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/on\w+\s*=\s*"[^"]*"/gi, "")
    .replace(/on\w+\s*=\s*'[^']*'/gi, "")
    .replace(/href\s*=\s*"javascript:[^"]*"/gi, 'href="#"');
}

export default function MarkdownPreviewerTool() {
  const [markdown, setMarkdown] = useState(SAMPLE_MARKDOWN);
  const [copiedHtml, setCopiedHtml] = useState(false);

  const htmlOutput = useMemo(() => {
    try {
      const raw = marked.parse(markdown) as string;
      return sanitizeHtml(raw);
    } catch {
      return "<p>Markdown ayrıştırılırken hata oluştu.</p>";
    }
  }, [markdown]);

  const handleCopyHtml = async () => {
    await navigator.clipboard.writeText(htmlOutput);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 1500);
  };

  const handleDownloadHtml = () => {
    const fullHtml = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <title>Markdown Çıktısı | turkconvert</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; max-width: 800px; margin: 40px auto; padding: 0 20px; color: #333; }
    pre { background: #f4f4f5; padding: 15px; border-radius: 8px; overflow-x: auto; }
    code { font-family: monospace; background: #f4f4f5; padding: 2px 6px; border-radius: 4px; }
    blockquote { border-left: 4px solid #2563eb; margin: 0; padding-left: 15px; color: #666; }
    table { border-collapse: collapse; width: 100%; margin: 20px 0; }
    th, td { border: 1px solid #ddd; padding: 8px 12px; }
    th { background: #f4f4f5; }
  </style>
</head>
<body>
${htmlOutput}
</body>
</html>`;

    const blob = new Blob([fullHtml], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "belge.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* Üst Eylem Araç Çubuğu */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 pb-3 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMarkdown(SAMPLE_MARKDOWN)}
            className="btn-secondary !px-2.5 !py-1.5 text-xs gap-1"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary-500" />
            Örnek Yükle
          </button>
          <button
            type="button"
            onClick={() => setMarkdown("")}
            className="rounded-lg p-1.5 text-gray-400 hover:text-red-500"
            title="Temizle"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyHtml}
            className="btn-secondary !px-3 !py-1.5 text-xs gap-1.5"
          >
            {copiedHtml ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
            {copiedHtml ? "HTML Kopyalandı!" : "HTML Kopyala"}
          </button>
          <button
            type="button"
            onClick={handleDownloadHtml}
            className="btn-primary !px-3 !py-1.5 text-xs gap-1.5"
          >
            <Download className="h-3.5 w-3.5" />
            HTML İndir
          </button>
        </div>
      </div>

      {/* Editör ve Önizleyici (Split View) */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Markdown Giriş */}
        <div className="flex flex-col">
          <label className="mb-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
            Markdown Metni
          </label>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="# Başlık yazın..."
            className="min-h-[420px] w-full rounded-xl border border-gray-300 bg-white p-4 font-mono text-xs text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          />
        </div>

        {/* Canlı HTML Önizleme */}
        <div className="flex flex-col">
          <label className="mb-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
            Canlı Önizleme
          </label>
          <div
            dangerouslySetInnerHTML={{ __html: htmlOutput }}
            className="prose prose-sm dark:prose-invert min-h-[420px] max-h-[500px] w-full overflow-y-auto rounded-xl border border-gray-200 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-gray-900/60"
          />
        </div>
      </div>
    </div>
  );
}
