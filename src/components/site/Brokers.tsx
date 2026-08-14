import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Building2, CheckCircle2, Radio, ShieldCheck, Waypoints } from "lucide-react";
import { brokersQuery, type Broker } from "@/lib/botsync-api";
import { Reveal, SectionHeading } from "./primitives";

function BrokerLogo({ broker }: { broker: Broker }) {
  const [failed, setFailed] = useState(false);
  if (!broker.logoUrl || failed) return <Building2 className="size-7 text-brand-cyan" aria-hidden="true" />;
  return <img src={broker.logoUrl} alt="" loading="lazy" onError={() => setFailed(true)} className="size-12 shrink-0 rounded-xl bg-white/95 object-contain p-1.5" />;
}

export function Brokers() {
  const { data: brokers = [], isPending, isError } = useQuery(brokersQuery);
  return (
    <section id="brokers" className="relative scroll-mt-28 overflow-hidden py-20 sm:py-28" aria-label="Supported brokers">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="container-page relative">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <Reveal><SectionHeading align="left" eyebrow="Broker network" title={<>Connect to the market. <span className="text-gradient">Stay in control.</span></>} description="Bring supported MT4 and MT5 broker accounts into one streamlined automation workspace." /></Reveal>
          <Reveal delay={100} className="grid grid-cols-3 gap-2 sm:gap-3">
            {[
              { icon: Radio, label: "Live sync" }, { icon: ShieldCheck, label: "Protected" }, { icon: Waypoints, label: "MT4 & MT5" },
            ].map(({ icon: Icon, label }) => <div key={label} className="rounded-xl border border-border bg-surface/60 px-3 py-3 text-center text-xs font-semibold text-muted-foreground sm:min-w-24"><Icon className="mx-auto mb-2 size-4 text-brand-emerald" aria-hidden="true" />{label}</div>)}
          </Reveal>
        </div>
        <Reveal delay={150} className="mt-12">
          <div className="relative rounded-3xl border border-border bg-surface/40 p-3 shadow-2xl sm:p-5">
            <div className="absolute -inset-px -z-10 rounded-3xl bg-gradient-to-r from-brand-blue/25 via-brand-cyan/15 to-brand-emerald/20 blur-xl" aria-hidden="true" />
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-1">
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-brand-emerald uppercase"><span className="live-dot size-2 rounded-full bg-brand-emerald" />Connection network live</span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><CheckCircle2 className="size-4 text-brand-cyan" />Supported integrations</span>
            </div>
            {isPending && <div className="h-24 animate-pulse rounded-2xl bg-surface" />}
            {isError && <p className="rounded-2xl bg-surface px-5 py-8 text-center text-sm text-muted-foreground">Broker connections are temporarily unavailable.</p>}
            {!isPending && !isError && brokers.length === 0 && <p className="rounded-2xl bg-surface px-5 py-8 text-center text-sm text-muted-foreground">New broker connections are being prepared.</p>}
            {brokers.length > 0 && <div className="broker-marquee overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"><ul className="broker-track flex w-max items-stretch gap-3">{[...brokers, ...brokers].map((broker, index) => (
              <li key={`${broker.id}-${index}`} aria-hidden={index >= brokers.length} className="flex min-h-24 w-72 items-center gap-4 rounded-2xl border border-border bg-background/70 px-4 py-4 transition-colors hover:border-brand-cyan/35">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-border bg-surface"><BrokerLogo broker={broker} /></span>
                <span className="min-w-0"><span className="block truncate font-semibold">{broker.name}</span><span className="mt-1.5 block truncate text-xs text-muted-foreground">{broker.platforms.join(" • ") || "Trading connection"}</span><span className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-brand-emerald"><span className="size-1.5 rounded-full bg-brand-emerald" />Compatible</span></span>
              </li>))}</ul></div>}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
