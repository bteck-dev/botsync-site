import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, Building2, Loader2, Search } from "lucide-react";
import { Reveal, Section, SectionHeading, ctaStyles } from "./primitives";
import { brokersQuery, type Broker, type Platform } from "@/lib/botsync-api";

const filters: Array<{ key: "all" | Platform; label: string }> = [
  { key: "all", label: "All platforms" },
  { key: "MT4", label: "MT4" },
  { key: "MT5", label: "MT5" },
];

function BrokerLogo({ broker }: { broker: Broker }) {
  const [failed, setFailed] = useState(false);
  if (!broker.logoUrl || failed) {
    return (
      <span
        className="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-surface-2/70"
        aria-hidden="true"
      >
        <Building2 className="size-5 text-brand-cyan" />
      </span>
    );
  }
  return (
    <img
      src={broker.logoUrl}
      alt={`${broker.name} logo`}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="size-11 rounded-xl border border-border bg-surface-2/70 object-contain p-1.5"
    />
  );
}

export function Brokers() {
  const { data, isPending, isError, refetch, isFetching } = useQuery(brokersQuery);
  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState<"all" | Platform>("all");

  const brokers = useMemo(() => data ?? [], [data]);
  const showControls = brokers.length > 8;

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return brokers.filter((b) => {
      const matchesQuery = !q || b.name.toLowerCase().includes(q);
      const matchesPlatform = platform === "all" || b.platforms.includes(platform);
      return matchesQuery && matchesPlatform;
    });
  }, [brokers, query, platform]);

  return (
    <Section id="brokers">
      <SectionHeading
        eyebrow="Supported brokers"
        title="Connect the Brokers Your Community Already Uses"
        description="This list is maintained by BotSync administrators and updates automatically — only brokers marked active are shown here."
      />

      <div className="mt-12">
        {showControls ? (
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <label className="relative w-full sm:max-w-xs">
              <span className="sr-only">Search brokers</span>
              <Search
                className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search brokers"
                className="w-full rounded-xl border border-border bg-surface/70 py-2.5 pr-3 pl-9 text-sm text-foreground placeholder:text-muted-foreground"
              />
            </label>
            <div className="flex gap-2" role="group" aria-label="Filter by platform">
              {filters.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  aria-pressed={platform === f.key}
                  onClick={() => setPlatform(f.key)}
                  className={
                    platform === f.key
                      ? "rounded-xl border border-brand-cyan/60 bg-surface-2 px-3.5 py-2 text-sm font-medium"
                      : "rounded-xl border border-border bg-surface/60 px-3.5 py-2 text-sm text-muted-foreground hover:text-foreground"
                  }
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {isPending ? (
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4" aria-busy="true">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <li key={i} className="panel h-32 animate-pulse" />
            ))}
          </ul>
        ) : null}

        {isError ? (
          <div className="panel flex flex-col items-center gap-4 p-10 text-center">
            <AlertTriangle className="size-6 text-warn" aria-hidden="true" />
            <p className="text-sm text-muted-foreground">
              The broker list couldn't be loaded right now. Please try again shortly.
            </p>
            <button type="button" onClick={() => refetch()} className={ctaStyles.ghost}>
              {isFetching ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
              Retry
            </button>
          </div>
        ) : null}

        {!isPending && !isError && brokers.length === 0 ? (
          <p className="panel p-10 text-center text-sm text-muted-foreground">
            No supported brokers are published yet. Check back soon.
          </p>
        ) : null}

        {!isPending && !isError && brokers.length > 0 && visible.length === 0 ? (
          <p className="panel p-10 text-center text-sm text-muted-foreground">
            No brokers match your search.
          </p>
        ) : null}

        {visible.length > 0 ? (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {visible.map((broker, i) => (
              <Reveal as="li" key={broker.id} delay={Math.min(i, 8) * 60}>
                <div className="panel flex h-full flex-col gap-4 p-5">
                  <div className="flex items-center gap-3">
                    <BrokerLogo broker={broker} />
                    <div className="min-w-0">
                      <h3 className="truncate font-display text-sm font-semibold">{broker.name}</h3>
                      <p className="text-xs text-brand-emerald">Available</p>
                    </div>
                  </div>
                  <div className="mt-auto flex flex-wrap items-center gap-2">
                    {broker.platforms.length > 0 ? (
                      broker.platforms.map((p) => (
                        <span
                          key={p}
                          className="rounded-full border border-border px-2.5 py-1 text-[0.7rem] text-muted-foreground"
                        >
                          {p}
                        </span>
                      ))
                    ) : (
                      <span className="text-[0.7rem] text-muted-foreground">
                        Platform details coming soon
                      </span>
                    )}
                    {broker.serverCount > 0 ? (
                      <span className="text-[0.7rem] text-muted-foreground">
                        {broker.serverCount} server{broker.serverCount === 1 ? "" : "s"}
                      </span>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        ) : null}
      </div>
    </Section>
  );
}
