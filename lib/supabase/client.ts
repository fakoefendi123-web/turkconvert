import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "./types";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://onlzdwfpbdplpuxiipeb.supabase.co";

// Fallback dummy JWT structure to prevent build-time prerender crash in CI environments (e.g., GitHub Actions)
const DUMMY_BUILD_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE2MDAwMDAwMDAsImV4cCI6MTk5OTk5OTk5OX0.dummy_build_key";

const rawAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "";

// Use real key if available, otherwise safe dummy key for static prerender
const effectiveKey = rawAnonKey.trim() !== "" ? rawAnonKey.trim() : DUMMY_BUILD_KEY;

// Singleton Supabase Client
let cachedClient: SupabaseClient<Database> | null = null;

export function getSupabase(): SupabaseClient<Database> {
  if (cachedClient) return cachedClient;

  cachedClient = createClient<Database>(supabaseUrl, effectiveKey, {
    auth: {
      persistSession: typeof window !== "undefined",
      autoRefreshToken: typeof window !== "undefined",
      detectSessionInUrl: typeof window !== "undefined",
    },
    realtime: {
      params: {
        eventsPerSecond: 10,
      },
    },
  });

  return cachedClient;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(
    rawAnonKey &&
      rawAnonKey.trim() !== "" &&
      rawAnonKey !== DUMMY_BUILD_KEY &&
      !rawAnonKey.includes("placeholder") &&
      !rawAnonKey.includes("ornek")
  );
}
