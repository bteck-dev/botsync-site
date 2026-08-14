import {
  Code2,
  Sparkles,
  Layers,
  Users,
  Zap,
  BarChart3,
  Cloud,
  Plug,
  UserCog,
  Blocks,
  Send,
  Gauge,
  Lock,
  KeyRound,
  Smartphone,
  ShieldCheck,
  ServerCog,
  ScrollText,
} from "lucide-react";
import { Reveal, Section, SectionHeading } from "./primitives";

const benefits = [
  { icon: Code2, title: "No coding required", text: "Configure strategies through the interface, not a compiler." },
  { icon: Smartphone, title: "Mobile-first automation", text: "Manage EAs, accounts and trades from your smartphone." },
  { icon: Sparkles, title: "AI-powered market tools", text: "Chart, structure and volatility analysis on demand." },
  { icon: Layers, title: "Multiple Expert Advisors", text: "Run several strategies side by side per workspace." },
  { icon: Users, title: "Scalable community management", text: "Licences, devices and referrals in one place." },
  { icon: Zap, title: "Fast and secure synchronisation", text: "Changes propagate to connected terminals quickly." },
  { icon: BarChart3, title: "Professional analytics dashboard", text: "Execution logs, activity and account insight." },
  { icon: Cloud, title: "Cloud-powered automation", text: "Keep strategies running without a desktop terminal." },
  { icon: Plug, title: "Designed for MT4 and MT5", text: "Native support for both MetaTrader generations." },
];

const steps = [
  { icon: UserCog, title: "Create your workspace", text: "Register and configure your trader profile." },
  { icon: Blocks, title: "Build your trading ecosystem", text: "Add Expert Advisors, strategy settings, and supported instruments." },
  { icon: Send, title: "Invite your community", text: "Share referral links and issue the appropriate license keys." },
  { icon: Gauge, title: "Automate and monitor", text: "Schedule activity, review logs, and manage everything from one place." },
];

const security = [
  { icon: UserCog, label: "Role-based access" },
  { icon: Lock, label: "Secure authentication" },
  { icon: KeyRound, label: "Controlled license activation" },
  { icon: Smartphone, label: "Registered-device management" },
  { icon: ShieldCheck, label: "Protected broker credentials" },
  { icon: ServerCog, label: "Server-side payment verification" },
  { icon: ScrollText, label: "Activity and execution logs" },
];

export function WhyBotSync() {
  return (
    <Section id="why" className="border-y border-border bg-[oklch(0.115_0.02_264)]">
      <SectionHeading
        eyebrow="Why BotSync"
        title="Everything a Trader Needs, in One Operating Layer"
      />
      <ul className="mt-14 grid gap-4 md:grid-cols-2">
        {benefits.map(({ icon: Icon, title, text }, i) => (
          <Reveal as="li" key={title} delay={(i % 2) * 90}>
            <div
              className={`panel flex h-full items-start gap-4 p-6 ${
                i % 2 === 1 ? "md:translate-y-4" : ""
              }`}
            >
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-2/70">
                <Icon className="size-5 text-brand-cyan" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-base font-semibold">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

export function HowItWorks() {
  return (
    <Section id="how-it-works">
      <SectionHeading eyebrow="How it works" title="From Strategy to Automated Community in Four Steps" />
      <ol className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {steps.map(({ icon: Icon, title, text }, i) => (
          <Reveal as="li" key={title} delay={i * 90}>
            <div className="panel relative h-full overflow-hidden p-6">
              <span
                className="absolute top-3 right-4 font-display text-5xl font-bold text-foreground/5"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <Icon className="size-5 text-brand-emerald" aria-hidden="true" />
              <h3 className="mt-4 font-display text-base font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

export function Security() {
  return (
    <Section id="security" className="border-y border-border bg-[oklch(0.115_0.02_264)]">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <SectionHeading
            align="left"
            eyebrow="Security"
            title="Automation Built With Control in Mind"
            description="Access, licences, devices and payments are controlled server-side, so you decide exactly who can run what."
          />
        </Reveal>
        <Reveal delay={120}>
          <ul className="grid gap-3 sm:grid-cols-2">
            {security.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-3 rounded-xl border border-border bg-surface/70 px-4 py-3.5 text-sm"
              >
                <Icon className="size-4 shrink-0 text-brand-cyan" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
