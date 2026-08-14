import { useEffect, useState } from "react";
import { Menu, X, ArrowRight, Download } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { ctaStyles } from "./primitives";
import { appDownloadUrl, authUrls, navSections } from "@/lib/botsync-config";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-b border-border bg-background/92 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 sm:h-20">
        <Link to="/" hash="top" className="rounded-lg" aria-label="BotSync home">
          <Logo size={34} />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {navSections.map((item) => (
            <Link
              key={item.hash}
              to="/"
              hash={item.hash}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a href="mailto:support@botsync.app?subject=BotSync%20App%20Enquiry" className={ctaStyles.quiet}>
            Contact
          </a>
          <a href={appDownloadUrl} className={ctaStyles.quiet}>
            <Download className="size-4" aria-hidden="true" />
            Download App
          </a>
          <a href={authUrls.login} className={ctaStyles.quiet}>
            Login
          </a>
          <a href={authUrls.register} className={ctaStyles.primary}>
            Sign Up
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-surface/70 text-foreground lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-border bg-background/98 backdrop-blur-xl lg:hidden"
      >
        <nav aria-label="Mobile" className="container-page flex flex-col gap-1 py-5">
          {navSections.map((item) => (
            <Link
              key={item.hash}
              to="/"
              hash={item.hash}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-base font-medium text-muted-foreground hover:bg-surface hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-3 grid gap-2">
            <a href="mailto:support@botsync.app?subject=BotSync%20App%20Enquiry" className={ctaStyles.ghost}>
              Contact
            </a>
            <a href={appDownloadUrl} className={ctaStyles.ghost}>
              <Download className="size-4" aria-hidden="true" />
              Download App
            </a>
            <a href={authUrls.login} className={ctaStyles.ghost}>
              Login
            </a>
            <a href={authUrls.register} className={ctaStyles.primary}>
              Sign Up
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
