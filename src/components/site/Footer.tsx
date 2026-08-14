import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Mail } from "lucide-react";
import { Logo } from "./Logo";
import { legalQuery } from "@/lib/botsync-api";
import { authUrls, navSections } from "@/lib/botsync-config";

export function Footer() {
  const { data: policies, isPending, isError } = useQuery(legalQuery);

  return (
    <footer className="relative border-t border-border bg-[oklch(0.11_0.02_264)]">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
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
                Create account
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
