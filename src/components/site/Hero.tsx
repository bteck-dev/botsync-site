import { ArrowRight, Check, Download, Smartphone } from "lucide-react";
import { appDownloadUrl, authUrls } from "@/lib/botsync-config";
import { ctaStyles, Reveal } from "./primitives";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-14 sm:pt-36 sm:pb-20">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-45" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-48 left-1/2 size-[34rem] -translate-x-1/2 rounded-full opacity-25 blur-[120px]"
        style={{ backgroundImage: "var(--gradient-brand)" }}
        aria-hidden="true"
      />
      <div className="container-page relative grid items-center gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-8">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
            <Smartphone className="size-3.5 text-brand-cyan" aria-hidden="true" />
            Trading automation in your pocket
          </span>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold text-balance sm:text-5xl lg:text-6xl lg:leading-[1.04]">
            Automate. Connect. <span className="text-gradient">Trade Anywhere.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Run and monitor MT4 or MT5 Expert Advisors from your phone—without coding or staying
            tied to a computer.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={authUrls.register} className={ctaStyles.primary}>
              Sign Up <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a href={appDownloadUrl} className={ctaStyles.ghost}>
              <Download className="size-4" aria-hidden="true" /> Download App
            </a>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
            {["MT4 & MT5", "No coding", "Mobile control"].map((item) => (
              <li key={item} className="inline-flex items-center gap-2">
                <Check className="size-4 text-brand-emerald" aria-hidden="true" /> {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={100} className="hidden w-full justify-self-center sm:block lg:-mr-10">
          <div className="relative overflow-hidden rounded-[2rem] border border-brand-cyan/20 bg-background shadow-2xl">
            <img
              src="/botsync-phone-showcase-navy.png"
              alt="BotSync running Gold Scalper, live trade logs, and AI Tools displayed in three phone frames"
              width="1536"
              height="1024"
              className="mx-auto h-auto w-full max-w-[52rem]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
