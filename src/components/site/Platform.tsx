import { Blocks, Bot, Users, Zap, BarChart3, ChevronRight } from "lucide-react";
import { Reveal, Section, SectionHeading } from "./primitives";

const flow = [
  { icon: Blocks, title: "Strategy", text: "Define your rules, instruments and risk profile." },
  { icon: Bot, title: "Expert Advisor", text: "Package the logic into a managed EA." },
  { icon: Users, title: "Community", text: "Issue license keys and register devices." },
  { icon: Zap, title: "Automated execution", text: "Run on MT4 or MT5 from the cloud." },
  { icon: BarChart3, title: "Analytics", text: "Review logs, activity and performance data." },
];

export function Platform() {
  return (
    <Section id="platform">
      <SectionHeading
        eyebrow="Platform overview"
        title="One Platform. Your Strategy. Your Community."
        description="BotSync is an intelligent trading automation platform built for forex traders, signal providers, and mentors. Convert your strategy into an automated Expert Advisor and manage it from your desktop or mobile device."
      />

      <ol className="mt-14 grid gap-4 lg:grid-cols-5">
        {flow.map(({ icon: Icon, title, text }, i) => (
          <Reveal as="li" key={title} delay={i * 90} className="relative">
            <div className="panel h-full p-6">
              <span className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-surface-2/70">
                <Icon className="size-5 text-brand-cyan" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
            {i < flow.length - 1 ? (
              <ChevronRight
                className="absolute top-1/2 -right-3 hidden size-5 -translate-y-1/2 text-brand-cyan/60 lg:block"
                aria-hidden="true"
              />
            ) : null}
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
