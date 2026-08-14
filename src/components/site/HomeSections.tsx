import { ArrowUpRight, BarChart3, BrainCircuit, CandlestickChart, CheckCircle2, Globe2, Newspaper, Radar, Smartphone, Sparkles } from "lucide-react";
import { Reveal, Section, SectionHeading } from "./primitives";

const aiTools = [
  { icon: CandlestickChart, title: "AI Chart Analysis", text: "Turn complex price action into a clear, structured market view in seconds.", tag: "Technical insight" },
  { icon: Newspaper, title: "Smart Market News", text: "See the events that matter and understand how they may affect your instruments.", tag: "Live context" },
  { icon: Radar, title: "Market Structure", text: "Identify momentum, volatility, and important levels before acting on a setup.", tag: "Signal clarity" },
];

export function AboutHome() {
  return (
    <Section id="about" className="overflow-hidden border-y border-border bg-surface/25">
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <Reveal>
          <SectionHeading align="left" eyebrow="About BotSync" title={<>The control centre for your <span className="text-gradient">trading automation</span></>} />
          <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>
              Botsync is a trading automation platform designed to bring Expert Advisor technology
              closer to your smartphone.
            </p>
            <p>
              Take automated trading wherever you go. Our Mobile Trading EA platform makes it
              easier to connect, manage, and monitor automated trading strategies directly from
              your mobile device.
            </p>
            <p>
              Whether you&apos;re an experienced trader, signal provider, or trading mentor, you
              can access powerful automation tools without being tied to your computer.
            </p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {["Built for MT4 and MT5", "Manage from any device", "No coding required", "Designed to scale"].map((item) => (
              <div key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground"><CheckCircle2 className="size-4 shrink-0 text-brand-emerald" aria-hidden="true" />{item}</div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="relative mx-auto max-w-xl">
            <div className="absolute inset-10 rounded-full bg-brand-blue/20 blur-3xl" aria-hidden="true" />
            <div className="panel relative grid gap-px overflow-hidden bg-border sm:grid-cols-2">
              {[
                { icon: Smartphone, value: "Mobile first", label: "Control wherever you trade" },
                { icon: Globe2, value: "One workspace", label: "Accounts, bots, and teams" },
                { icon: BrainCircuit, value: "AI assisted", label: "Sharper market context" },
                { icon: BarChart3, value: "Always visible", label: "Activity and performance" },
              ].map(({ icon: Icon, value, label }) => (
                <div key={value} className="bg-surface/95 p-6 sm:p-7"><Icon className="size-5 text-brand-cyan" aria-hidden="true" /><p className="mt-5 font-display text-lg font-semibold">{value}</p><p className="mt-1 text-sm text-muted-foreground">{label}</p></div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

export function AiTools() {
  return (
    <Section id="ai-tools" className="overflow-hidden">
      <div className="pointer-events-none absolute top-1/2 left-1/2 size-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-blue/10 blur-[110px]" aria-hidden="true" />
      <div className="relative">
        <SectionHeading eyebrow="AI tools" title={<>Read the market with <span className="text-gradient">more confidence</span></>} description="Practical AI-powered tools help you make sense of charts, news, and market conditions without switching between platforms." />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {aiTools.map(({ icon: Icon, title, text, tag }, index) => (
            <Reveal key={title} delay={index * 80}>
              <article className="group panel relative h-full overflow-hidden p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-7">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/70 to-transparent" />
                <div className="flex items-start justify-between gap-4"><span className="inline-flex size-12 items-center justify-center rounded-2xl border border-brand-cyan/20 bg-brand-cyan/10"><Icon className="size-6 text-brand-cyan" aria-hidden="true" /></span><Sparkles className="size-4 text-brand-emerald/70" aria-hidden="true" /></div>
                <p className="mt-8 text-xs font-semibold tracking-widest text-brand-emerald uppercase">{tag}</p><h3 className="mt-2 text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-brand-cyan">Built into BotSync <ArrowUpRight className="size-4" aria-hidden="true" /></div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
