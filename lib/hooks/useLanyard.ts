"use client";

import { useEffect, useState, useRef } from "react";

export interface LanyardUser {
  id: string;
  username: string;
  avatar: string | null;
  discriminator: string;
  display_name?: string | null;
  global_name?: string | null;
  banner?: string | null;
}

export interface LanyardActivity {
  id: string;
  name: string;
  type: number;
  state?: string;
  details?: string;
  timestamps?: {
    start?: number;
    end?: number;
  };
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
}

export interface LanyardSpotify {
  track_id: string;
  song: string;
  artist: string;
  album: string;
  album_art_url: string;
  timestamps: {
    start: number;
    end: number;
  };
}

export interface LanyardData {
  discord_user: LanyardUser;
  discord_status: "online" | "idle" | "dnd" | "offline";
  activities: LanyardActivity[];
  listening_to_spotify: boolean;
  spotify: LanyardSpotify | null;
}

export function useLanyard(userIds: string[]) {
  const [data, setData] = useState<Record<string, LanyardData>>({});
  const [loading, setLoading] = useState(true);
  const socketRef = useRef<WebSocket | null>(null);
  const heartbeatTimerRef = useRef<NodeJS.Timeout | null>(null);

  const userIdsKey = userIds.join(",");

  useEffect(() => {
    if (!userIdsKey) return;
    const currentIds = userIdsKey.split(",").filter(Boolean);

    let isMounted = true;

    // 1. Initial REST fetch for instant rendering
    const fetchInitial = async () => {
      try {
        const results = await Promise.all(
          currentIds.map(async (id) => {
            try {
              const res = await fetch(`https://api.lanyard.rest/v1/users/${id}`, {
                cache: "no-store",
              });
              const json = await res.json();
              if (json.success && json.data) {
                return [id, json.data] as const;
              }
            } catch {
              // fallback ignore
            }
            return null;
          })
        );

        if (isMounted) {
          const map: Record<string, LanyardData> = {};
          results.forEach((item) => {
            if (item) {
              map[item[0]] = item[1];
            }
          });
          setData((prev) => ({ ...prev, ...map }));
          setLoading(false);
        }
      } catch {
        if (isMounted) setLoading(false);
      }
    };

    fetchInitial();

    // 2. WebSocket for real-time live presence updates
    const connectWs = () => {
      if (typeof window === "undefined") return;

      try {
        const ws = new WebSocket("wss://api.lanyard.rest/socket");
        socketRef.current = ws;

        ws.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data);
            const { op, t, d } = message;

            // Hello: send subscribe
            if (op === 1) {
              const heartbeatInterval = d.heartbeat_interval;
              if (heartbeatTimerRef.current) clearInterval(heartbeatTimerRef.current);
              heartbeatTimerRef.current = setInterval(() => {
                if (ws.readyState === WebSocket.OPEN) {
                  ws.send(JSON.stringify({ op: 3 }));
                }
              }, heartbeatInterval);

              ws.send(
                JSON.stringify({
                  op: 2,
                  d: {
                    subscribe_to_ids: currentIds,
                  },
                })
              );
            }

            // Init state
            if (t === "INIT_STATE") {
              if (isMounted && d) {
                setData((prev) => ({ ...prev, ...d }));
              }
            }

            // Live presence update
            if (t === "PRESENCE_UPDATE") {
              if (isMounted && d && d.discord_user?.id) {
                setData((prev) => ({
                  ...prev,
                  [d.discord_user.id]: d,
                }));
              }
            }
          } catch {
            // Ignore parse errors
          }
        };

        ws.onclose = () => {
          if (heartbeatTimerRef.current) clearInterval(heartbeatTimerRef.current);
          if (isMounted) {
            setTimeout(connectWs, 5000);
          }
        };

        ws.onerror = () => {
          ws.close();
        };
      } catch {
        // Fallback to polling if WebSocket fails
      }
    };

    connectWs();

    // Fallback polling every 20 seconds
    const pollInterval = setInterval(fetchInitial, 20000);

    return () => {
      isMounted = false;
      clearInterval(pollInterval);
      if (heartbeatTimerRef.current) clearInterval(heartbeatTimerRef.current);
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [userIdsKey]);

  return { data, loading };
}
