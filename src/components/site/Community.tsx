import {
  UserPlus,
  KeyRound,
  Plug,
  CalendarClock,
  Gauge,
  Bot,
  Users,
  CreditCard,
  Image as ImageIcon,
  ScrollText,
  Wallet,
  Smartphone,
  BellRing,
  Sparkles,
  ListChecks,
} from "lucide-react";
import { Eyebrow, MockFrame, Reveal, Section, SectionHeading } from "./primitives";

const workflow = [
  { icon: Bot, title: "Create or configure an EA", text: "Set strategy rules, pairs and risk." },
  { icon: UserPlus, title: "Add members", text: "Invite through referral links or manually." },
  {
    icon: KeyRound,
    title: "Generate license keys",
    text: "Issue normal or subscription license keys.",
  },
  { icon: Plug, title: "Connect MT4 or MT5", text: "Link broker accounts and register devices." },
  {
    icon: CalendarClock,
    title: "Schedule or synchronise trades",
    text: "Automate sessions and event windows.",
  },
  { icon: Gauge, title: "Monitor from one dashboard", text: "Track activity, logs and licences." },
];

const traderHighlights = [
  { icon: Users, label: "Member management" },
  { icon: KeyRound, label: "License-key controls" },
  { icon: CreditCard, label: "Subscription support" },
  { icon: ImageIcon, label: "EA branding and images" },
  { icon: ScrollText, label: "Trade logs" },
  { icon: Wallet, label: "Earnings and commission visibility" },
  { icon: Smartphone, label: "Secure device registration" },
];

const mobileSteps = [
  "Register through a referral link",
  "Add a normal or subscription license key",
  "Select an Expert Advisor",
  "Connect a broker account",
  "Receive relevant notifications",
  "Use AI tools and token balances",
  "Review clear execution logs",
];

export function Mentors() {
  return (
    <Section id="community">
      <SectionHeading
        eyebrow="For traders"
        title="Built to Help Traders Operate Professionally"
        description="A single workflow from strategy to community, with the controls a growing trading operation needs."
      />

      <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {workflow.map(({ icon: Icon, title, text }, i) => (
          <Reveal as="li" key={title} delay={i * 70}>
            <div className="panel h-full p-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-9 items-center justify-center rounded-lg border border-border bg-surface-2/70 text-xs font-semibold text-brand-cyan">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Icon className="size-5 text-brand-emerald" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </div>
          </Reveal>
        ))}
      </ol>

      <Reveal delay={120}>
        <ul className="mt-10 flex flex-wrap gap-2.5">
          {traderHighlights.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3.5 py-2 text-sm text-muted-foreground"
            >
              <Icon className="size-4 text-brand-cyan" aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}

function PhoneMock() {
  return (
    <div className="mx-auto w-full max-w-[19rem]">
      <div className="panel glow rounded-[2.25rem] p-3">
        <div className="rounded-[1.75rem] border border-border bg-background p-4">
          <div className="flex items-center justify-between text-[0.65rem] text-muted-foreground">
            <span>9:41</span>
            <span className="inline-flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-brand-emerald" aria-hidden="true" />
              Synced
            </span>
          </div>

          <p className="mt-5 text-xs text-muted-foreground">Active licence</p>
          <div className="mt-2 rounded-xl border border-border bg-surface-2/60 p-3">
            <p className="font-display text-sm font-semibold">Momentum Breakout EA</p>
            <p className="mt-1 text-[0.7rem] text-muted-foreground">
              Subscription · renews in 21 days
            </p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-border bg-surface/70 p-3">
              <Sparkles className="size-4 text-brand-cyan" aria-hidden="true" />
              <p className="mt-2 font-display text-lg font-bold">180</p>
              <p className="text-[0.65rem] text-muted-foreground">AI tokens</p>
            </div>
            <div className="rounded-xl border border-border bg-surface/70 p-3">
              <Plug className="size-4 text-brand-emerald" aria-hidden="true" />
              <p className="mt-2 font-display text-lg font-bold">MT5</p>
              <p className="text-[0.65rem] text-muted-foreground">Broker linked</p>
            </div>
          </div>

          <ul className="mt-4 space-y-2">
            {[
              { icon: BellRing, text: "High-impact CPI release in 30 min" },
              { icon: ListChecks, text: "EURUSD buy executed · 0.02 lots" },
              { icon: ListChecks, text: "XAUUSD position closed · logged" },
            ].map((r) => (
              <li
                key={r.text}
                className="flex items-start gap-2 rounded-lg border border-border bg-surface/60 px-3 py-2 text-[0.7rem] text-muted-foreground"
              >
                <r.icon className="mt-0.5 size-3.5 shrink-0 text-brand-cyan" aria-hidden="true" />
                {r.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function Students() {
  return (
    <Section
      id="mobile"
      className="border-y border-border bg-[oklch(0.115_0.02_264)]"
    >
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Eyebrow>Mobile experience</Eyebrow>
          <h2 className="mt-5 text-3xl font-bold text-balance sm:text-4xl">
            Trade on Mobile. Stay in Control.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            BotSync brings automated trading to your smartphone. Activate a licence, connect a
            broker account, and follow your strategies while automation and logging happen in the
            background.
          </p>
          <ul className="mt-8 space-y-3">
            {mobileSteps.map((step) => (
              <li key={step} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span
                  className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-emerald"
                  aria-hidden="true"
                />
                {step}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={120}>
          <PhoneMock />
        </Reveal>
      </div>
    </Section>
  );
}

export { MockFrame };
