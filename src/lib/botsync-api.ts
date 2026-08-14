import { API_BASE, API_ORIGIN } from "./botsync-config";

/** True once VITE_BOTSYNC_API_URL points at the BotSync backend. */
export const isApiConfigured = Boolean(API_ORIGIN);

export type Platform = "MT4" | "MT5";

export interface Broker {
  id: string;
  name: string;
  description: string | null;
  logoUrl: string | null;
  platforms: Platform[];
  serverCount: number;
  available: boolean;
}

export interface LegalPolicy {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  content: string | null;
  updatedAt: string | null;
}

type Json = Record<string, unknown>;

function list(payload: unknown): Json[] {
  if (Array.isArray(payload)) return payload as Json[];
  if (payload && typeof payload === "object") {
    const obj = payload as Json;
    for (const key of ["data", "brokers", "policies", "items", "results"]) {
      const v = obj[key];
      if (Array.isArray(v)) return v as Json[];
      if (v && typeof v === "object") {
        const nested = list(v);
        if (nested.length > 0) return nested;
      }
    }
  }
  return [];
}

function str(o: Json, ...keys: string[]): string | null {
  for (const k of keys) {
    const v = o[k];
    if (typeof v === "string" && v.trim()) return v;
    if (typeof v === "number") return String(v);
  }
  return null;
}

function bool(o: Json, ...keys: string[]): boolean | null {
  for (const k of keys) {
    const v = o[k];
    if (typeof v === "boolean") return v;
    if (v === 1 || v === "1" || v === "true") return true;
    if (v === 0 || v === "0" || v === "false") return false;
    if (typeof v === "string" && ["active", "published", "live"].includes(v.toLowerCase())) return true;
    if (typeof v === "string" && ["inactive", "draft", "disabled"].includes(v.toLowerCase())) return false;
  }
  return null;
}

async function getJson(path: string, signal?: AbortSignal): Promise<unknown> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { Accept: "application/json" },
    signal: signal ?? null,
  });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json();
}

function platformsOf(o: Json): Platform[] {
  const out = new Set<Platform>();
  const raw = o["platforms"] ?? o["supported_platforms"] ?? o["platform"];
  const push = (v: unknown) => {
    const s = String(v).toUpperCase();
    if (s.includes("MT4") || s.includes("METATRADER 4")) out.add("MT4");
    if (s.includes("MT5") || s.includes("METATRADER 5")) out.add("MT5");
  };
  if (Array.isArray(raw)) raw.forEach(push);
  else if (raw != null) push(raw);
  if (bool(o, "supports_mt4", "mt4", "mt4_supported")) out.add("MT4");
  if (bool(o, "supports_mt5", "mt5", "mt5_supported")) out.add("MT5");
  return [...out].sort();
}

export function normalizeBroker(o: Json, index: number): Broker {
  const servers = o["servers"] ?? o["broker_servers"];
  const serverList = Array.isArray(servers) ? (servers as Json[]) : [];
  const activeServers = serverList.filter((s) => bool(s, "is_active", "active", "status") !== false);
  return {
    id: str(o, "id", "uuid", "slug", "name") ?? `broker-${index}`,
    name: str(o, "name", "broker_name", "title") ?? "Unnamed broker",
    description: str(o, "description", "summary", "tagline", "short_description"),
    logoUrl: str(o, "logo_url", "logoUrl", "logo", "image_url", "image"),
    platforms: platformsOf(o),
    serverCount: activeServers.length,
    available: bool(o, "is_active", "active", "status", "enabled") !== false,
  };
}

export async function fetchBrokers(signal?: AbortSignal): Promise<Broker[]> {
  if (!isApiConfigured) return [];
  const payload = await getJson("/brokers", signal);
  return list(payload)
    .map(normalizeBroker)
    .filter((b) => b.available)
    .sort((a, b) => a.name.localeCompare(b.name));
}

function slugify(v: string) {
  return v
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function normalizePolicy(o: Json, index: number): LegalPolicy {
  const title = str(o, "title", "name") ?? "Untitled policy";
  return {
    id: str(o, "id", "uuid", "slug") ?? `policy-${index}`,
    slug: str(o, "slug", "key", "type") ?? slugify(title),
    title,
    description: str(o, "description", "summary", "excerpt"),
    content: str(o, "content", "body", "html", "text"),
    updatedAt: str(o, "updated_at", "updatedAt", "last_updated", "published_at", "created_at"),
  };
}

function isPublished(o: Json): boolean {
  const published = bool(o, "is_published", "published", "is_active", "active", "status");
  return published !== false;
}

export async function fetchLegalPolicies(signal?: AbortSignal): Promise<LegalPolicy[]> {
  if (!isApiConfigured) return [];
  const payload = await getJson("/legal", signal);
  return list(payload).filter(isPublished).map(normalizePolicy);
}

export async function fetchLegalPolicy(slug: string, signal?: AbortSignal): Promise<LegalPolicy | null> {
  if (!isApiConfigured) return null;
  try {
    const payload = await getJson(`/legal/${encodeURIComponent(slug)}`, signal);
    const root =
      payload && typeof payload === "object" && !Array.isArray(payload) ? (payload as Json) : null;
    const data = root?.["data"];
    const dataObject = data && typeof data === "object" && !Array.isArray(data) ? (data as Json) : null;
    const policy = dataObject?.["policy"];
    const obj =
      policy && typeof policy === "object" && !Array.isArray(policy)
        ? (policy as Json)
        : dataObject ?? root;
    if (obj && (obj["title"] || obj["content"])) {
      if (!isPublished(obj)) return null;
      return normalizePolicy(obj, 0);
    }
  } catch {
    /* fall back to the collection endpoint below */
  }
  const all = await fetchLegalPolicies(signal);
  return all.find((p) => p.slug === slug) ?? null;
}

export const legalQuery = {
  queryKey: ["legal", "policies"] as const,
  queryFn: ({ signal }: { signal: AbortSignal }) => fetchLegalPolicies(signal),
  staleTime: 5 * 60_000,
  retry: 1,
};

export const brokersQuery = {
  queryKey: ["brokers", "public"] as const,
  queryFn: ({ signal }: { signal: AbortSignal }) => fetchBrokers(signal),
  staleTime: 5 * 60_000,
  retry: 1,
};
