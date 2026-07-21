import { useEffect, useState, useCallback } from "react";

const KEY = "medace_session_v1";

export type Session = {
  year: string;
  subject: string;
  recentTopics: { topic: string; subject: string; mode: string; ts: number }[];
};

const empty: Session = { year: "", subject: "", recentTopics: [] };

function read(): Session {
  if (typeof window === "undefined") return empty;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty;
    return { ...empty, ...(JSON.parse(raw) as Partial<Session>) };
  } catch {
    return empty;
  }
}

export function useSession() {
  const [session, setSession] = useState<Session>(empty);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setSession(read());
    setHydrated(true);
  }, []);

  const update = useCallback((patch: Partial<Session>) => {
    setSession((prev) => {
      const next = { ...prev, ...patch };
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const pushRecent = useCallback(
    (item: { topic: string; subject: string; mode: string }) => {
      setSession((prev) => {
        const entry = { ...item, ts: Date.now() };
        const recentTopics = [
          entry,
          ...prev.recentTopics.filter(
            (r) => !(r.topic === item.topic && r.mode === item.mode),
          ),
        ].slice(0, 8);
        const next = { ...prev, recentTopics };
        try {
          localStorage.setItem(KEY, JSON.stringify(next));
        } catch {}
        return next;
      });
    },
    [],
  );

  return { session, hydrated, update, pushRecent };
}
