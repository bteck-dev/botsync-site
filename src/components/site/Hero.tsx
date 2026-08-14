import {
  ArrowRight,
  Bot,
  Users,
  CalendarClock,
  Sparkles,
  Plug,
  Cloud,
  Code2,
  Smartphone,
} from "lucide-react";
import { ctaStyles, Reveal } from "./primitives";
import { authUrls } from "@/lib/botsync-config";

const stats = [
  { icon: Bot, label: "Active Expert Advisors", value: "6", meta: "3 live · 3 paused" },
  { icon: Users, label: "Connected accounts", value: "48", meta: "42 devices registered" },
  { icon: CalendarClock, label: "Scheduled trades", value: "12", meta: "London & NY sessions" },
  { icon: Sparkles, label: "AI market signals", value: "9", meta: "Analysis, not advice" },
];

const trust = [
  { icon: Smartphone, label: "Trade from your smartphone" },
  { icon: Code2, label: "No coding required" },
  { icon: Plug, label: "MT4 & MT5 compatible" },
  { icon: Cloud, label: "Cloud-powered automation" },
];

const advisors = [
  { name: "Momentum Breakout EA", pairs: "XAUUSD · GBPJPY", state: "Running" },
  { name: "London Session Scalper", pairs: "EURUSD · GBPUSD", state: "Running" },
  { name: "News Guard EA", pairs: "USDJPY", state: "Paused" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full opacity-25 blur-[120px]"
        style={{ backgroundImage: "var(--gradient-brand)" }}
        aria-hidden="true"
      />
      <div className="container-page relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
              <Smartphone className="size-3.5 text-brand-cyan" aria-hidden="true" />
              Mobile Trading EA platform
            </span>
            <h1 className="mt-6 text-4xl font-bold text-balance sm:text-5xl lg:text-6xl lg:leading-[1.05]">
              Take Automated Trading{" "}
              <span className="text-gradient">Wherever You Go</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              BotSync is a trading automation platform designed to bring Expert Advisor technology
              closer to your smartphone. Connect, manage and monitor automated trading strategies
              directly from your mobile device — without being tied to your computer.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Whether you&apos;re an experienced trader, signal provider, or trading mentor, you can
              access powerful automation tools and run EAs on MT4 and MT5 from anywhere.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={authUrls.register} className={ctaStyles.primary}>
                Start Building
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
              <a href="#features" className={ctaStyles.ghost}>
                Explore Features
              </a>
            </div>
            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
              {trust.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <Icon className="size-4 text-brand-cyan" aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <div className="panel glow overflow-hidden">
              <div className="flex items-center justify-between border-b border-border bg-surface-2/50 px-5 py-4">
                <div>
                  <p className="text-sm font-semibold">Mobile trader workspace</p>
                  <p className="text-xs text-muted-foreground">Illustrative interface preview</p>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1">
                    <span className="size-1.5 rounded-full bg-brand-emerald" aria-hidden="true" />
                    MT4 connected
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1">
                    <span className="size-1.5 rounded-full bg-brand-cyan" aria-hidden="true" />
                    MT5 connected
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 p-5">
                {stats.map(({ icon: Icon, label, value, meta }) => (
                  <div key={label} className="rounded-xl border border-border bg-surface/70 p-4">
                    <Icon className="size-4 text-brand-cyan" aria-hidden="true" />
                    <p className="mt-3 font-display text-2xl font-bold">{value}</p>
                    <p className="text-xs font-medium text-foreground">{label}</p>
                    <p className="mt-1 text-[0.7rem] text-muted-foreground">{meta}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-border p-5">
                <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  Expert Advisors
                </p>
                <ul className="mt-3 space-y-2">
                  {advisors.map((ea) => (
                    <li
                      key={ea.name}
                      className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface/60 px-3 py-2.5"
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium">{ea.name}</span>
                        <span className="block truncate text-xs text-muted-foreground">
                          {ea.pairs}
                        </span>
                      </span>
                      <span
                        className={
                          ea.state === "Running"
                            ? "rounded-full border border-brand-emerald/40 px-2.5 py-1 text-[0.7rem] text-brand-emerald"
                            : "rounded-full border border-border px-2.5 py-1 text-[0.7rem] text-muted-foreground"
                        }
                      >
                        {ea.state}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
