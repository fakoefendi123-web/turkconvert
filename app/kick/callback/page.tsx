"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, AlertCircle, Loader2, ArrowLeft, Radio } from "lucide-react";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase/client";

function KickOAuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [details, setDetails] = useState<string>("");

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get("code");
      const state = searchParams.get("state");
      const error = searchParams.get("error");
      const errorDescription = searchParams.get("error_description");

      if (error) {
        setStatus("error");
        setErrorMessage(
          errorDescription || `Kick Yetkilendirme Hatası: ${error}`
        );
        return;
      }

      if (!code || !state) {
        setStatus("error");
        setErrorMessage("Geçersiz callback çağrısı: Yetkilendirme kodu veya durum bilgisi bulunamadı.");
        return;
      }

      try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://onlzdwfpbdplpuxiipeb.supabase.co";
        
        let sessionToken = "";
        if (isSupabaseConfigured()) {
          try {
            const client = getSupabase();
            const { data } = await client.auth.getSession();
            if (data.session) {
              sessionToken = data.session.access_token;
            }
          } catch {
            // Ignore session fetch error
          }
        }

        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };
        if (sessionToken) {
          headers["Authorization"] = `Bearer ${sessionToken}`;
        }

        const response = await fetch(`${supabaseUrl}/functions/v1/kick-oauth?action=callback`, {
          method: "POST",
          headers,
          body: JSON.stringify({ code, state }),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || `HTTP ${response.status}: Yetkilendirme doğrulanamadı.`);
        }

        setStatus("success");
        setDetails(result.username ? `@${result.username} kanalı bağlandı` : "Hesap başarıyla eşleştirildi");

        // Redirect back to dashboard after 2 seconds
        setTimeout(() => {
          router.push("/kick?connected=true");
        }, 2000);
      } catch (err: unknown) {
        console.error("Kick OAuth Callback Hatası:", err);
        setStatus("error");
        setErrorMessage(
          err instanceof Error ? err.message : "Bilinmeyen bir bağlantı hatası oluştu."
        );
      }
    };

    handleCallback();
  }, [searchParams, router]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-xl dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 dark:bg-primary-950/40 dark:text-primary-400">
          <Radio className="h-7 w-7" />
        </div>

        <h1 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
          Kick Hesabı Bağlanıyor
        </h1>

        {status === "loading" && (
          <div className="py-6 space-y-3">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary-600 dark:text-primary-400" />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Kick OAuth 2.1 doğrulanıyor ve kanal bilgileri kaydediliyor...
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="py-6 space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div className="font-semibold text-sm text-emerald-600 dark:text-emerald-400">
              Bağlantı Başarılı!
            </div>
            {details && (
              <p className="text-xs text-gray-600 dark:text-gray-300 font-mono">
                {details}
              </p>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Kontrol merkezine aktarılıyorsunuz...
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="py-6 space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-950/50 dark:text-red-400">
              <AlertCircle className="h-6 w-6" />
            </div>
            <div className="font-semibold text-sm text-red-600 dark:text-red-400">
              Bağlantı Başarısız Oldu
            </div>
            {errorMessage && (
              <div className="rounded-xl bg-red-50 p-3 text-xs text-red-700 dark:bg-red-950/30 dark:text-red-300 break-words text-left font-mono">
                {errorMessage}
              </div>
            )}
            <Link
              href="/kick"
              className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Kontrol Paneline Dön
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function KickCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[70vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
        </div>
      }
    >
      <KickOAuthCallbackContent />
    </Suspense>
  );
}
