/**
 * BotSync marketing site configuration.
 *
 * The public site reads live data (brokers, legal policies) from the existing
 * BotSync backend and links out to the existing authenticated app.
 * Set these in your environment — no data is hardcoded in the frontend.
 *
 *   VITE_BOTSYNC_API_URL     e.g. https://api.bot-sync.com     (API origin, no trailing slash)
 *   VITE_BOTSYNC_PORTAL_URL  e.g. https://portal.bot-sync.com  (portal origin, no trailing slash)
 */

const configuredApi = (import.meta.env["VITE_BOTSYNC_API_URL"] as string | undefined) ?? "";
const rawApi = configuredApi || (import.meta.env.DEV ? "http://localhost:3000" : "");
const configuredPortal =
  (import.meta.env["VITE_BOTSYNC_PORTAL_URL"] as string | undefined) ?? "";
const rawPortal = configuredPortal || "https://portal.bot-sync.com";
const trim = (v: string) => v.replace(/\/+$/, "");

export const API_ORIGIN = trim(rawApi);
export const API_BASE = `${API_ORIGIN}/api/v1`;
export const PORTAL_ORIGIN = trim(rawPortal);
export const authUrls = {
  login: "/under-construction?feature=login",
  register: "/under-construction?feature=builder",
};

export const navSections = [
  { label: "Features", hash: "features" },
  { label: "How It Works", hash: "how-it-works" },
  { label: "Community", hash: "community" },
  { label: "AI Tools", hash: "ai-tools" },
  { label: "Brokers", hash: "brokers" },
  { label: "FAQ", hash: "faq" },
] as const;
