/**
 * BotSync marketing site configuration.
 *
 * The public site reads live data (brokers, legal policies) from the existing
 * BotSync backend and links out to the existing authenticated app.
 * Set these in your environment — no data is hardcoded in the frontend.
 *
 *   VITE_BOTSYNC_API_URL  e.g. https://api.botsync.app   (API origin, no trailing slash)
 * Login and builder links currently point to the local under-construction page.
 */

const configuredApi = (import.meta.env["VITE_BOTSYNC_API_URL"] as string | undefined) ?? "";
const rawApi = configuredApi || (import.meta.env.DEV ? "http://localhost:3000" : "");
const trim = (v: string) => v.replace(/\/+$/, "");

export const API_ORIGIN = trim(rawApi);
export const API_BASE = `${API_ORIGIN}/api/v1`;
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
