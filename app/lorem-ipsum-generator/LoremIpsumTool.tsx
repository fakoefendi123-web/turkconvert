"use client";

import { useState, useCallback, useEffect } from "react";
import { Copy, Check, Download, RefreshCw, FileText } from "lucide-react";

const LATIN_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea",
  "commodo", "consequat", "duis", "aute", "irure", "in", "reprehenderit", "in",
  "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla",
  "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident",
  "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id",
  "est", "laborum"
];

const TURKISH_WORDS = [
  "bir", "zamanlar", "yÃ¼ksek", "daÄŸlarÄ±n", "ardÄ±nda", "yeÅŸil", "vadilerde",
  "yaÅŸayan", "insanlar", "iÃ§in", "bilgi", "en", "deÄŸerli", "hazine", "idi",
  "gÃ¼neÅŸ", "her", "sabah", "mavi", "gÃ¶kyÃ¼zÃ¼nde", "yÃ¼kselirken", "yeni", "bir",
  "umut", "Ä±ÅŸÄ±ÄŸÄ±", "yayardÄ±", "kitaplar", "ve", "yazÄ±lar", "geÃ§miÅŸin", "izlerini",
  "geleceÄŸe", "taÅŸÄ±yan", "kÃ¶prÃ¼ler", "olarak", "kabul", "edilirdi", "teknoloji",
  "ve", "tasarÄ±m", "hayatÄ±n", "her", "alanÄ±nda", "kolaylÄ±k", "saÄŸlayarak",
  "insanlarÄ±n", "Ã¼retkenliÄŸini", "artÄ±rmÄ±ÅŸtÄ±r", "bugÃ¼n", "ise", "dijital", "Ã§aÄŸda",
  "hÄ±zlÄ±", "gÃ¼venli", "ve", "Ã¶zgÃ¼r", "Ã§Ã¶zÃ¼mler", "bÃ¼yÃ¼k", "fark", "yaratmaktadÄ±r"
];

export default function LoremIpsumTool() {
  const [count, setCount] = useState(3);
  const [type, setType] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const [language, setLanguage] = useState<"latin" | "turkish">("latin");
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [result, setResult] = useState("");
  const [copiedText, setCopiedText] = useState(false);
  const [copiedHtml, setCopiedHtml] = useState(false);

  const generateSentence = (words: string[]) => {
    const len = Math.floor(Math.random() * 8) + 8;
    const sentenceWords: string[] = [];
    for (let i = 0; i < len; i++) {
      sentenceWords.push(words[Math.floor(Math.random() * words.length)]);
    }
    const joined = sentenceWords.join(" ");
    return joined.charAt(0).toUpperCase() + joined.slice(1) + ".";
  };

  const generateParagraph = (words: string[]) => {
    const numSentences = Math.floor(Math.random() * 3) + 4;
    const sentences: string[] = [];
    for (let i = 0; i < numSentences; i++) {
      sentences.push(generateSentence(words));
    }
    return sentences.join(" ");
  };

  const handleGenerate = useCallback(() => {
    const words = language === "latin" ? LATIN_WORDS : TURKISH_WORDS;

    if (type === "words") {
      const selected: string[] = [];
      if (language === "latin" && startWithLorem && count >= 5) {
        selected.push("Lorem", "ipsum", "dolor", "sit", "amet");
      }
      while (selected.length < count) {
        selected.push(words[Math.floor(Math.random() * words.length)]);
      }
      setResult(selected.slice(0, count).join(" "));
      return;
    }

    if (type === "sentences") {
      const sentences: string[] = [];
      for (let i = 0; i < count; i++) {
        if (i === 0 && language === "latin" && startWithLorem) {
          sentences.push("Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
        } else {
          sentences.push(generateSentence(words));
        }
      }
      setResult(sentences.join(" "));
      return;
    }

    // paragraphs
    const paragraphs: string[] = [];
    for (let i = 0; i < count; i++) {
      let p = generateParagraph(words);
      if (i === 0 && language === "latin" && startWithLorem) {
        p = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " + p;
      }
      paragraphs.push(p);
    }
    setResult(paragraphs.join("\n\n"));
  }, [count, type, language, startWithLorem]);

  useEffect(() => {
    handleGenerate();
  }, [handleGenerate]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 1500);
  };

  const handleCopyHtml = async () => {
    const html = result
      .split("\n\n")
      .map((p) => `<p>${p}</p>`)
      .join("\n");
    await navigator.clipboard.writeText(html);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 1500);
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([result], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "lorem-ipsum.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* SeÃ§enekler */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900 space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Miktar */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-gray-700 dark:text-gray-300">
              Miktar
            </label>
            <input
              type="number"
              min="1"
              max="50"
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(50, Number(e.target.value))))}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>

          {/* TÃ¼r */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-gray-700 dark:text-gray-300">
              Birim TÃ¼rÃ¼
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            >
              <option value="paragraphs">Paragraf</option>
              <option value="sentences">CÃ¼mle</option>
              <option value="words">Kelime</option>
            </select>
          </div>

          {/* Dil */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-gray-700 dark:text-gray-300">
              Metin Dili
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            >
              <option value="latin">Klasik Latin (Lorem Ipsum)</option>
              <option value="turkish">TÃ¼rkÃ§e Yer Tutucu</option>
            </select>
          </div>
        </div>

        {language === "latin" && (
          <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
            <input
              type="checkbox"
              checked={startWithLorem}
              onChange={(e) => setStartWithLorem(e.target.checked)}
              className="h-3.5 w-3.5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span>&quot;Lorem ipsum dolor sit amet...&quot; ile baÅŸla</span>
          </label>
        )}

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleGenerate}
            className="btn-primary !px-4 !py-2 text-xs gap-1.5"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Yeniden Ãœret
          </button>
        </div>
      </div>

      {/* Ã‡Ä±ktÄ± */}
      <div className="space-y-3">
        <textarea
          value={result}
          readOnly
          rows={10}
          className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 p-4 text-xs leading-relaxed text-gray-800 dark:border-gray-800 dark:bg-gray-900/60 dark:text-gray-200 sm:text-sm"
        />

        <div className="flex flex-wrap items-center justify-end gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="btn-primary !px-3 !py-2 text-xs gap-1.5"
          >
            {copiedText ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copiedText ? "KopyalandÄ±!" : "Metni Kopyala"}
          </button>

          {type === "paragraphs" && (
            <button
              type="button"
              onClick={handleCopyHtml}
              className="btn-secondary !px-3 !py-2 text-xs gap-1.5"
            >
              {copiedHtml ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
              {copiedHtml ? "HTML KopyalandÄ±!" : "<p> Etiketleriyle Kopyala"}
            </button>
          )}

          <button
            type="button"
            onClick={handleDownloadTxt}
            className="btn-secondary !px-3 !py-2 text-xs gap-1.5"
          >
            <Download className="h-3.5 w-3.5" />
            .txt Ä°ndir
          </button>
        </div>
      </div>
    </div>
  );
}
