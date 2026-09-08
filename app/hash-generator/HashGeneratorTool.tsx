"use client";

import { useState, useEffect, useCallback } from "react";
import { Copy, Check, Fingerprint, FileText, Upload } from "lucide-react";

// HÄ±zlÄ± ve baÄŸÄ±msÄ±z MD5 implementasyonu
function md5(string: string): string {
  function md5cycle(x: number[], k: number[]) {
    let a = x[0],
      b = x[1],
      c = x[2],
      d = x[3];

    a = ff(a, b, c, d, k[0], 7, -680876936);
    d = ff(d, a, b, c, k[1], 12, -389564586);
    c = ff(c, d, a, b, k[2], 17, 606105819);
    b = ff(b, c, d, a, k[3], 22, -1044525330);
    a = ff(a, b, c, d, k[4], 7, -176418897);
    d = ff(d, a, b, c, k[5], 12, 1200080426);
    c = ff(c, d, a, b, k[6], 17, -1473231341);
    b = ff(b, c, d, a, k[7], 22, -45705983);
    a = ff(a, b, c, d, k[8], 7, 1770035416);
    d = ff(d, a, b, c, k[9], 12, -1958414417);
    c = ff(c, d, a, b, k[10], 17, -42063);
    b = ff(b, c, d, a, k[11], 22, -1990404162);
    a = ff(a, b, c, d, k[12], 7, 1804603682);
    d = ff(d, a, b, c, k[13], 12, -40341101);
    c = ff(c, d, a, b, k[14], 17, -1502002290);
    b = ff(b, c, d, a, k[15], 22, 1236535329);

    a = gg(a, b, c, d, k[1], 5, -165796510);
    d = gg(d, a, b, c, k[6], 9, -1069501632);
    c = gg(c, d, a, b, k[11], 14, 643717713);
    b = gg(b, c, d, a, k[0], 20, -373897302);
    a = gg(a, b, c, d, k[5], 5, -701558691);
    d = gg(d, a, b, c, k[10], 9, 38016083);
    c = gg(c, d, a, b, k[15], 14, -660478335);
    b = gg(b, c, d, a, k[4], 20, -405537848);
    a = gg(a, b, c, d, k[9], 5, 568446438);
    d = gg(d, a, b, c, k[14], 9, -1019803690);
    c = gg(c, d, a, b, k[3], 14, -187363961);
    b = gg(b, c, d, a, k[8], 20, 1163531501);
    a = gg(a, b, c, d, k[13], 5, -1444681467);
    d = gg(d, a, b, c, k[2], 9, -51403784);
    c = gg(c, d, a, b, k[7], 14, 1735328473);
    b = gg(b, c, d, a, k[12], 20, -1926607734);

    a = hh(a, b, c, d, k[5], 4, -378558);
    d = hh(d, a, b, c, k[8], 11, -2022574463);
    c = hh(c, d, a, b, k[11], 16, 1839030562);
    b = hh(b, c, d, a, k[14], 23, -35309556);
    a = hh(a, b, c, d, k[1], 4, -1530992060);
    d = hh(d, a, b, c, k[4], 11, 1272893353);
    c = hh(c, d, a, b, k[7], 16, -155497632);
    b = hh(b, c, d, a, k[10], 23, -1094730640);
    a = hh(a, b, c, d, k[13], 4, 681279174);
    d = hh(d, a, b, c, k[0], 11, -358537222);
    c = hh(c, d, a, b, k[3], 16, -722521979);
    b = hh(b, c, d, a, k[6], 23, 76029189);
    a = hh(a, b, c, d, k[9], 4, -640364487);
    d = hh(d, a, b, c, k[12], 11, -421815835);
    c = hh(c, d, a, b, k[15], 16, 530742520);
    b = hh(b, c, d, a, k[2], 23, -995338651);

    a = ii(a, b, c, d, k[0], 6, -198630844);
    d = ii(d, a, b, c, k[7], 10, 1126891415);
    c = ii(c, d, a, b, k[14], 15, -1416354905);
    b = ii(b, c, d, a, k[5], 21, -57434055);
    a = ii(a, b, c, d, k[12], 6, 1700485571);
    d = ii(d, a, b, c, k[3], 10, -1894986606);
    c = ii(c, d, a, b, k[10], 15, -1051523);
    b = ii(b, c, d, a, k[1], 21, -2054922799);
    a = ii(a, b, c, d, k[8], 6, 1873313359);
    d = ii(d, a, b, c, k[15], 10, -30611744);
    c = ii(c, d, a, b, k[6], 15, -1560198380);
    b = ii(b, c, d, a, k[13], 21, 1309151649);
    a = ii(a, b, c, d, k[4], 6, -145523070);
    d = ii(d, a, b, c, k[11], 10, -1120210379);
    c = ii(c, d, a, b, k[2], 15, 718787259);
    b = ii(b, c, d, a, k[9], 21, -343485551);

    x[0] = add32(a, x[0]);
    x[1] = add32(b, x[1]);
    x[2] = add32(c, x[2]);
    x[3] = add32(d, x[3]);
  }

  function cmn(q: number, a: number, b: number, x: number, s: number, t: number) {
    a = add32(add32(a, q), add32(x, t));
    return add32((a << s) | (a >>> (32 - s)), b);
  }
  function ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return cmn((b & c) | (~b & d), a, b, x, s, t);
  }
  function gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return cmn((b & d) | (c & ~d), a, b, x, s, t);
  }
  function hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return cmn(b ^ c ^ d, a, b, x, s, t);
  }
  function ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return cmn(c ^ (b | ~d), a, b, x, s, t);
  }
  function add32(a: number, b: number) {
    return (a + b) & 0xffffffff;
  }

  function rstr2binl(input: string) {
    const output: number[] = Array(input.length >> 2).fill(0);
    for (let i = 0; i < input.length * 8; i += 8) {
      output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << i % 32;
    }
    return output;
  }

  function binl2hex(binarray: number[]) {
    const hex_tab = "0123456789abcdef";
    let str = "";
    for (let i = 0; i < binarray.length * 4; i++) {
      str +=
        hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0x0f) +
        hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0x0f);
    }
    return str;
  }

  const n = string.length;
  const state = [1732584193, -271733879, -1732584194, 271733878];
  const x = rstr2binl(string);
  x[n >> 2] |= 0x80 << (n % 4) * 8;
  x[(((n + 8) >> 6) << 4) + 14] = n * 8;

  for (let i = 0; i < x.length; i += 16) {
    const oldstate = state.slice(0);
    md5cycle(state, x.slice(i, i + 16));
  }
  return binl2hex(state);
}

export default function HashGeneratorTool() {
  const [input, setInput] = useState("");
  const [uppercase, setUppercase] = useState(false);
  const [hashes, setHashes] = useState<{ [key: string]: string }>({
    md5: "",
    sha1: "",
    sha256: "",
    sha512: "",
  });
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const calculateHashes = useCallback(async (text: string) => {
    if (!text) {
      setHashes({ md5: "", sha1: "", sha256: "", sha512: "" });
      return;
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    const bufferToHex = (buf: ArrayBuffer) =>
      Array.from(new Uint8Array(buf))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

    try {
      const md5Result = md5(text);
      const sha1Buf = await crypto.subtle.digest("SHA-1", data);
      const sha256Buf = await crypto.subtle.digest("SHA-256", data);
      const sha512Buf = await crypto.subtle.digest("SHA-512", data);

      setHashes({
        md5: md5Result,
        sha1: bufferToHex(sha1Buf),
        sha256: bufferToHex(sha256Buf),
        sha512: bufferToHex(sha512Buf),
      });
    } catch {
      // Hata durumunda
    }
  }, []);

  useEffect(() => {
    calculateHashes(input);
  }, [input, calculateHashes]);

  const handleCopy = async (val: string, key: string) => {
    const textToCopy = uppercase ? val.toUpperCase() : val;
    await navigator.clipboard.writeText(textToCopy);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  const hashList = [
    { key: "md5", name: "MD5", bit: "128-bit" },
    { key: "sha1", name: "SHA-1", bit: "160-bit" },
    { key: "sha256", name: "SHA-256 (Ã–nerilen)", bit: "256-bit" },
    { key: "sha512", name: "SHA-512", bit: "512-bit" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200">
          Metin veya Veri Girin
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Hash deÄŸerini hesaplamak istediÄŸiniz metni buraya yazÄ±n..."
          className="w-full rounded-xl border border-gray-300 bg-white p-4 font-mono text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          rows={4}
        />
        <div className="mt-2 flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              className="h-3.5 w-3.5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span>BÃ¼yÃ¼k Harf Ã‡Ä±ktÄ± (UPPERCASE)</span>
          </label>

          {input && (
            <button
              onClick={() => setInput("")}
              className="text-xs text-gray-400 hover:text-red-500"
            >
              Temizle
            </button>
          )}
        </div>
      </div>

      {/* Hesaplanan Hash SonuÃ§larÄ± */}
      <div className="space-y-4">
        {hashList.map(({ key, name, bit }) => {
          const val = hashes[key] || "";
          const displayVal = uppercase ? val.toUpperCase() : val;

          return (
            <div
              key={key}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-xs dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="mb-1.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-900 dark:text-white">
                    {name}
                  </span>
                  <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                    {bit}
                  </span>
                </div>
                {displayVal && (
                  <button
                    onClick={() => handleCopy(displayVal, key)}
                    className="inline-flex items-center gap-1 text-xs font-medium text-primary-600 hover:underline dark:text-primary-400"
                  >
                    {copiedKey === key ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-green-500" />
                        <span className="text-green-500">KopyalandÄ±!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Kopyala</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              <div className="overflow-x-auto rounded-lg bg-gray-50 p-2.5 font-mono text-xs text-gray-800 dark:bg-gray-800/60 dark:text-gray-200">
                {displayVal || (
                  <span className="text-gray-400 dark:text-gray-500">
                    HesaplanÄ±yor veya girdi bekleniyor...
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
