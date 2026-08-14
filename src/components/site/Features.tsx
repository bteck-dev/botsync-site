import {
  Bot,
  ScanLine,
  CalendarDays,
  Clock,
  Sliders,
  TrendingUp,
  ShieldAlert,
} from "lucide-react";
import { Eyebrow, FeatureList, MockFrame, Reveal, Section } from "./primitives";

function FeatureBlock({
  id,
  eyebrow,
  icon: Icon,
  heading,
  description,
  items,
  visual,
  reverse = false,
}: {
  id?: string | undefined;
  eyebrow: string;
  icon: typeof Bot;
  heading: string;
  description?: string;
  items: string[];
  visual: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <div
      id={id}
      className="scroll-mt-28 grid items-center gap-12 py-14 lg:grid-cols-2 lg:gap-16 lg:py-20"
    >
      <Reveal className={reverse ? "lg:order-2" : undefined}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h3 className="mt-5 flex items-start gap-3 text-2xl font-bold text-balance sm:text-3xl">
          <Icon className="mt-1 size-6 shrink-0 text-brand-cyan" aria-hidden="true" />
          {heading}
        </h3>
        {description ? (
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">{description}</p>
        ) : null}
        <FeatureList items={items} />
      </Reveal>
      <Reveal delay={120} className={reverse ? "lg:order-1" : undefined}>
        {visual}
      </Reveal>
    </div>
  );
}

function EaMock() {
  const rows = [
    { label: "Entry rule", value: "EMA 50 cross + RSI > 55" },
    { label: "Exit rule", value: "ATR trailing stop · 1.8×" },
    { label: "Risk per trade", value: "0.75% of equity" },
    { label: "Max open positions", value: "3" },
    { label: "Instruments", value: "XAUUSD · EURUSD · GBPJPY" },
    { label: "Platform", value: "MT4 · MT5" },
  ];
  return (
    <MockFrame label="Expert Advisor configuration">
      <dl className="divide-y divide-border">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-4 py-3">
            <dt className="text-xs text-muted-foreground">{row.label}</dt>
            <dd className="text-right text-sm font-medium">{row.value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-4 flex items-center justify-between rounded-xl border border-border bg-surface-2/50 px-4 py-3">
        <span className="text-xs text-muted-foreground">Licenses assigned</span>
        <span className="text-sm font-semibold text-brand-emerald">24 active</span>
      </div>
    </MockFrame>
  );
}

function ScannerMock() {
  const bars = [38, 52, 44, 66, 58, 74, 69, 88, 81, 96];
  return (
    <MockFrame label="AI market scanner — XAUUSD H1">
      <div className="flex h-36 items-end gap-1.5" aria-hidden="true">
        {bars.map((h, i) => (
          <span
            key={i}
            className="flex-1 rounded-t bg-brand-gradient opacity-80"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <ul className="mt-5 space-y-2 text-sm">
        {[
          { k: "Structure", v: "Higher highs, bullish continuation" },
          { k: "Key level", v: "Resistance 2,412 · Support 2,368" },
          { k: "Volatility", v: "Elevated (ATR above 20-day average)" },
        ].map((r) => (
          <li
            key={r.k}
            className="flex items-start justify-between gap-4 rounded-lg border border-border bg-surface/60 px-3 py-2"
          >
            <span className="text-xs text-muted-foreground">{r.k}</span>
            <span className="text-right text-xs font-medium">{r.v}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 flex items-start gap-2 rounded-lg border border-warn/30 bg-warn/5 px-3 py-2.5 text-xs text-muted-foreground">
        <ShieldAlert className="mt-0.5 size-4 shrink-0 text-warn" aria-hidden="true" />
        AI output is market analysis for context only — not financial advice or a trade
        recommendation.
      </p>
    </MockFrame>
  );
}

function NewsMock() {
  const events = [
    { time: "09:30", country: "GB", title: "BoE Interest Rate Decision", impact: "High" },
    { time: "13:30", country: "US", title: "CPI (YoY)", impact: "High" },
    { time: "14:15", country: "EU", title: "ECB Press Conference", impact: "Medium" },
    { time: "15:00", country: "US", title: "NFP Revision", impact: "Medium" },
    { time: "23:50", country: "JP", title: "Trade Balance", impact: "Low" },
  ];
  const tone: Record<string, string> = {
    High: "border-destructive/40 text-destructive",
    Medium: "border-warn/40 text-warn",
    Low: "border-border text-muted-foreground",
  };
  return (
    <MockFrame label="Economic calendar — today">
      <ol className="relative space-y-3 border-l border-border pl-5">
        {events.map((e) => (
          <li key={e.title} className="relative">
            <span
              className="absolute top-3 -left-[1.4rem] size-2 rounded-full bg-brand-cyan"
              aria-hidden="true"
            />
            <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface/60 px-3 py-2.5">
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium">{e.title}</span>
                <span className="text-xs text-muted-foreground">
                  {e.time} · {e.country}
                </span>
              </span>
              <span
                className={`rounded-full border px-2.5 py-1 text-[0.7rem] whitespace-nowrap ${tone[e.impact]}`}
              >
                {e.impact}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </MockFrame>
  );
}

function ScheduleMock() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const slots = ["Asia", "London", "New York"];
  const active = new Set(["Mon-London", "Mon-New York", "Tue-London", "Wed-Asia", "Wed-London", "Thu-New York", "Fri-London"]);
  return (
    <MockFrame label="Weekly automation schedule">
      <div className="grid grid-cols-[4.5rem_repeat(5,minmax(0,1fr))] gap-1.5 text-xs">
        <span />
        {days.map((d) => (
          <span key={d} className="text-center text-muted-foreground">
            {d}
          </span>
        ))}
        {slots.map((slot) => (
          <div key={slot} className="contents">
            <span className="flex items-center text-muted-foreground">{slot}</span>
            {days.map((d) => {
              const on = active.has(`${d}-${slot}`);
              return (
                <span
                  key={`${d}-${slot}`}
                  className={
                    on
                      ? "h-9 rounded-md bg-brand-gradient opacity-85"
                      : "h-9 rounded-md border border-border bg-surface/50"
                  }
                  aria-hidden="true"
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="mt-5 space-y-2">
        {[
          { icon: Clock, text: "Activation window: 08:00–17:00 GMT" },
          { icon: CalendarDays, text: "Pause 15 min before high-impact news" },
          { icon: Sliders, text: "Applies to 3 EAs · 24 connected accounts" },
        ].map(({ icon: Icon, text }) => (
          <p key={text} className="flex items-center gap-2 text-xs text-muted-foreground">
            <Icon className="size-4 text-brand-cyan" aria-hidden="true" />
            {text}
          </p>
        ))}
      </div>
    </MockFrame>
  );
}

export function Features() {
  return (
    <Section id="features" className="border-y border-border bg-[oklch(0.115_0.02_264)]">
      <div className="divide-y divide-border">
        <FeatureBlock
          eyebrow="Custom Expert Advisors"
          icon={Bot}
          heading="Build Expert Advisors Around Your Strategy"
          description="Design and manage automated trading systems through an intuitive interface — no complex programming required."
          items={[
            "Visual strategy configuration",
            "Custom entry and exit rules",
            "Risk management settings",
            "Multi-pair support",
            "MT4 and MT5 compatibility",
            "License and account management",
          ]}
          visual={<EaMock />}
        />

        <FeatureBlock
          id="ai-tools"
          eyebrow="AI market scanner"
          icon={ScanLine}
          heading="Find Market Context Faster"
          description="Use AI-assisted analysis to evaluate charts, market structure, volatility, and potential trading opportunities."
          items={[
            "Trend detection",
            "Breakout identification",
            "Support and resistance analysis",
            "Volatility monitoring",
            "Market sentiment insights",
            "Chart screenshot analysis",
          ]}
          visual={<ScannerMock />}
          reverse
        />

        <FeatureBlock
          eyebrow="Economic news & events"
          icon={CalendarDays}
          heading="Stay Ahead of Market-Moving Events"
          items={[
            "Live economic calendar",
            "High-impact news alerts",
            "Interest-rate decisions",
            "CPI and NFP updates",
            "Central-bank announcements",
            "Event-based risk awareness",
          ]}
          visual={<NewsMock />}
        />

        <FeatureBlock
          eyebrow="Automated trade scheduling"
          icon={TrendingUp}
          heading="Plan Trades Before the Market Moves"
          description="Schedule strategy activity and trade execution while keeping control of timing, instruments, and connected accounts."
          items={[
            "Time-based execution",
            "News-event scheduling",
            "Session trading",
            "Daily and weekly automation",
            "Strategy activation windows",
            "Remote cloud execution",
          ]}
          visual={<ScheduleMock />}
          reverse
        />
      </div>
    </Section>
  );
}
