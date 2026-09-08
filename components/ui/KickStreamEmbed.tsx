"use client";

import { useState } from "react";
import { Tv, MessageSquare, ExternalLink, RefreshCw, Radio, Crown } from "lucide-react";

export function KickStreamEmbed() {
  const [activeTab, setActiveTab] = useState<"both" | "player" | "chat">("both");
  const [reloadKey, setReloadKey] = useState(0);

  const handleRefresh = () => {
    setReloadKey((k) => k + 1);
  };

  return (
    <div className="space-y-4">
      {/* Üst Yayın Başlığı ve Kontrol Paneli */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white/90 p-4 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-900/90 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 shadow-md shadow-amber-500/20">
            <Crown className="h-6 w-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-gray-900 dark:text-white sm:text-lg">
                Prens Hazretleri
              </h2>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                CANLI YAYIN
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Resmi Kick Canlı Yayın &amp; Karargah Kanalı
            </p>
          </div>
        </div>

        {/* Butonlar */}
        <div className="flex items-center gap-2">
          {/* Mobilde Sekme Değiştirici */}
          <div className="flex rounded-lg border border-gray-200 bg-gray-100 p-1 dark:border-gray-700 dark:bg-gray-800 lg:hidden">
            <button
              onClick={() => setActiveTab("player")}
              className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                activeTab === "player"
                  ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              <Tv className="h-3.5 w-3.5" />
              <span>Yayın</span>
            </button>
            <button
              onClick={() => setActiveTab("chat")}
              className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                activeTab === "chat"
                  ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Sohbet</span>
            </button>
          </div>

          <button
            onClick={handleRefresh}
            title="Yayını Yenile"
            className="rounded-lg border border-gray-200 p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            <RefreshCw className="h-4 w-4" />
          </button>

          <a
            href="https://kick.com/prenshazretleri"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-[#53FC18] px-4 py-2 text-xs font-bold text-black shadow-md shadow-emerald-500/20 transition-all hover:scale-105 hover:bg-[#45e012] sm:text-sm"
          >
            <Radio className="h-3.5 w-3.5" />
            <span>Kick’te Aç</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Yayın ve Chat Izgarası */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Canlı Yayın Oynatıcısı */}
        <div
          className={`overflow-hidden rounded-2xl border border-gray-200 bg-black shadow-2xl dark:border-gray-800 lg:col-span-8 xl:col-span-9 ${
            activeTab === "chat" ? "hidden lg:block" : "block"
          }`}
        >
          <div className="relative aspect-video w-full bg-black">
            <iframe
              key={`player-${reloadKey}`}
              src="https://player.kick.com/prenshazretleri?autoplay=true&muted=false"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="h-full w-full border-0"
              title="Prens Hazretleri Kick Canlı Yayını"
            />
          </div>
        </div>

        {/* Canlı Sohbet (Chat) */}
        <div
          className={`flex h-[500px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-neutral-900 shadow-xl dark:border-gray-800 lg:col-span-4 lg:h-auto xl:col-span-3 ${
            activeTab === "player" ? "hidden lg:flex" : "flex"
          }`}
        >
          <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-950 px-4 py-2.5 text-xs font-semibold text-neutral-200">
            <span className="flex items-center gap-1.5">
              <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
              <span>Canlı Sohbet</span>
            </span>
            <a
              href="https://kick.com/prenshazretleri"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-emerald-400 hover:underline"
            >
              Mesaj Yaz ↗
            </a>
          </div>

          <div className="relative flex-1 bg-neutral-950">
            <iframe
              key={`chat-${reloadKey}`}
              src="https://kick.com/popout/prenshazretleri/chat"
              className="h-full w-full border-0 bg-neutral-950"
              title="Prens Hazretleri Canlı Sohbet"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
