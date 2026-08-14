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
export const appDownloadUrl = "/under-construction?feature=download";
export const socialUrls = {
  whatsapp: (import.meta.env["VITE_BOTSYNC_WHATSAPP_URL"] as string | undefined) || "https://wa.me/27737526797",
  tiktok: (import.meta.env["VITE_BOTSYNC_TIKTOK_URL"] as string | undefined) || "https://www.tiktok.com/@bakonetrades_1",
  facebook: (import.meta.env["VITE_BOTSYNC_FACEBOOK_URL"] as string | undefined) || "https://www.facebook.com/share/1Jxc1pEmNw/",
};

export const navSections = [
  { label: "About", hash: "about" },
  { label: "AI Tools", hash: "ai-tools" },
  { label: "Features", hash: "features" },
  { label: "Brokers", hash: "brokers" },
  { label: "How It Works", hash: "how-it-works" },
  { label: "FAQ", hash: "faq" },
] as const;
