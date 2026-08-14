import { Activity, Bot, CalendarClock, Cloud, KeyRound, ScanLine, Smartphone, Users } from "lucide-react";
import { Reveal, Section, SectionHeading } from "./primitives";

const features = [
  { icon: Bot, title: "Expert Advisors", text: "Create, connect, and control automated MT4 and MT5 strategies." },
  { icon: ScanLine, title: "AI & Market News", text: "Review chart analysis, market context, and key economic events together." },
  { icon: CalendarClock, title: "Trade Scheduling", text: "Choose when strategies run across sessions and market events." },
  { icon: Users, title: "Trader Management", text: "Manage members, licences, brokers, and activity from one dashboard." },
  { icon: Activity, title: "Live Monitoring", text: "Follow bot activity, executions, and account status as they happen." },
  { icon: KeyRound, title: "Licence Control", text: "Issue and manage secure access for clients and community members." },
  { icon: Cloud, title: "Cloud Connectivity", text: "Keep your trading ecosystem connected beyond a single desktop." },
  { icon: Smartphone, title: "Mobile Management", text: "Make changes and stay informed wherever the market takes you." },
];

export function Features() {
  return (
    <Section id="features" className="border-y border-border bg-surface/25">
      <SectionHeading eyebrow="Complete platform" title="Every Tool Your Trading Operation Needs" description="Automation, analysis, access control, and account management—connected in one clean workspace." />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, text }, index) => (
          <Reveal key={title} delay={(index % 4) * 60}>
            <article className="group h-full rounded-2xl border border-border bg-surface/55 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-cyan/30 hover:bg-surface">
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand-cyan/10 transition-colors group-hover:bg-brand-cyan/15"><Icon className="size-5 text-brand-cyan" aria-hidden="true" /></span>
              <h3 className="mt-4 text-base font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
