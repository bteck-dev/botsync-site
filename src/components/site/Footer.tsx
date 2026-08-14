import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Mail } from "lucide-react";
import { Logo } from "./Logo";
import { legalQuery } from "@/lib/botsync-api";
import { appDownloadUrl, authUrls, navSections, socialUrls } from "@/lib/botsync-config";

function SocialIcon({ name, className = "size-4" }: { name: "whatsapp" | "tiktok" | "facebook"; className?: string }) {
  const paths = {
    whatsapp: "M12.04 2a9.84 9.84 0 0 0-8.4 14.96L2 22l5.2-1.62A9.96 9.96 0 1 0 12.04 2Zm5.8 14.08c-.25.7-1.45 1.34-2.02 1.42-.52.08-1.18.11-1.9-.12-.44-.14-1-.33-1.72-.64-3.03-1.31-5-4.36-5.15-4.56-.15-.2-1.23-1.63-1.23-3.1 0-1.47.77-2.2 1.04-2.5.27-.3.6-.37.8-.37h.57c.18 0 .43-.07.67.51.25.6.84 2.05.92 2.2.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.32.39-.45.52-.15.15-.3.31-.13.61.17.3.76 1.25 1.63 2.02 1.12 1 2.07 1.31 2.37 1.46.3.15.47.13.65-.07.17-.2.74-.87.94-1.17.2-.3.4-.25.67-.15.27.1 1.72.81 2.02.96.3.15.5.22.57.35.08.12.08.72-.17 1.42Z",
    tiktok: "M19.6 6.42a5.5 5.5 0 0 1-3.22-1.03v7.42a6.82 6.82 0 1 1-5.88-6.76v3.44a3.4 3.4 0 1 0 2.48 3.27V2h3.4c.2 1.73 1.42 3.16 3.22 3.52v.9Z",
    facebook: "M13.5 22v-9h3l.45-3.5H13.5V7.26c0-1.01.28-1.7 1.74-1.7H17V2.43c-.3-.04-1.36-.13-2.6-.13-2.57 0-4.34 1.57-4.34 4.46V9.5H7.15V13h2.91v9h3.44Z",
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor"><path d={paths[name]} /></svg>;
}

export function Footer() {
  const { data: policies, isPending, isError } = useQuery(legalQuery);

  return (
    <footer className="relative border-t border-border bg-[oklch(0.11_0.02_264)]">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Mobile trading automation for forex traders, signal providers, and mentors — Expert
            Advisors, AI market tools, and community management in one platform.
          </p>
        </div>

        <nav aria-label="Platform">
          <h2 className="text-sm font-semibold text-foreground">Platform</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link to="/about" className="text-muted-foreground hover:text-foreground">About BotSync</Link>
            </li>
            {navSections.map((item) => (
              <li key={item.hash}>
                <Link
                  to="/"
                  hash={item.hash}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Account">
          <h2 className="text-sm font-semibold text-foreground">Account</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={authUrls.login} className="text-muted-foreground hover:text-foreground">
                Login
              </a>
            </li>
            <li>
              <a href={authUrls.register} className="text-muted-foreground hover:text-foreground">
                Sign Up
              </a>
            </li>
            <li>
              <a href={appDownloadUrl} className="text-muted-foreground hover:text-foreground">
                Download App
              </a>
            </li>
            <li>
              <a
                href="mailto:support@botsync.app"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <Mail className="size-4" aria-hidden="true" />
                Contact support
              </a>
            </li>
          </ul>
        </nav>

        <nav aria-label="Social media">
          <h2 className="text-sm font-semibold text-foreground">Follow BotSync</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li><a href={socialUrls.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-muted-foreground hover:text-[#25D366]"><SocialIcon name="whatsapp" />WhatsApp</a></li>
            <li><a href={socialUrls.tiktok} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"><SocialIcon name="tiktok" />TikTok</a></li>
            <li>
              {socialUrls.facebook ? (
                <a href={socialUrls.facebook} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-muted-foreground hover:text-[#1877F2]"><SocialIcon name="facebook" />Facebook</a>
              ) : (
                <span className="inline-flex items-center gap-2 text-muted-foreground/65"><SocialIcon name="facebook" />Facebook <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-semibold uppercase">Coming soon</span></span>
              )}
            </li>
          </ul>
        </nav>

        <nav aria-label="Legal center">
          <h2 className="text-sm font-semibold text-foreground">Legal center</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link to="/legal" className="text-muted-foreground hover:text-foreground">
                Legal center
              </Link>
            </li>
            {isPending
              ? [0, 1, 2].map((i) => (
                  <li key={i} className="h-4 w-32 animate-pulse rounded bg-surface-2" />
                ))
              : null}
            {isError ? (
              <li className="text-sm text-muted-foreground">
                Policies are temporarily unavailable.
              </li>
            ) : null}
            {policies?.map((policy) => (
              <li key={policy.id}>
                <Link
                  to="/legal/$slug"
                  params={{ slug: policy.slug }}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {policy.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <a
        href={socialUrls.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with BotSync on WhatsApp"
        className="fixed right-5 bottom-5 z-40 inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform hover:scale-105"
      >
        <SocialIcon name="whatsapp" className="size-7" />
      </a>

      <div className="container-page border-t border-border py-8">
        <p className="text-xs leading-relaxed text-muted-foreground">
          <strong className="font-semibold text-foreground">Risk warning:</strong> Trading foreign
          exchange and leveraged products involves substantial risk and may not be suitable for
          every person. BotSync provides technology and analytical tools and does not guarantee
          trading performance.
        </p>
        <p className="mt-4 text-xs text-muted-foreground">
          © {new Date().getFullYear()} BotSync. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
