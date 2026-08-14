import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, ArrowRight, FileText, Loader2 } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Section, SectionHeading, ctaStyles } from "@/components/site/primitives";
import { legalQuery } from "@/lib/botsync-api";

export const Route = createFileRoute("/legal/")({
  head: () => ({
    meta: [
      { title: "Legal Center — BotSync" },
      {
        name: "description",
        content:
          "BotSync legal center: terms & conditions, privacy & cookie policy, disclaimer, user agreement, and trading risk disclosure.",
      },
      { property: "og:title", content: "Legal Center — BotSync" },
      {
        property: "og:description",
        content: "Terms, privacy, disclaimer, user agreement and risk disclosure for BotSync.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/legal" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/legal" }],
  }),
  component: LegalIndex,
});

function LegalIndex() {
  const { data, isPending, isError, refetch, isFetching } = useQuery(legalQuery);

  return (
    <>
      <Header />
      <main>
        <Section className="pt-32">
          <SectionHeading
            eyebrow="Legal center"
            title="Policies, agreements and disclosures"
            description="These documents are published and maintained by BotSync administrators, so they always reflect the current live version."
          />

          <div className="mx-auto mt-12 max-w-4xl">
            {isPending ? (
              <ul className="grid gap-4 sm:grid-cols-2" aria-busy="true">
                {[0, 1, 2, 3].map((i) => (
                  <li key={i} className="panel h-36 animate-pulse" />
                ))}
              </ul>
            ) : null}

            {isError ? (
              <div className="panel flex flex-col items-center gap-4 p-10 text-center">
                <AlertTriangle className="size-6 text-warn" aria-hidden="true" />
                <p className="text-sm text-muted-foreground">
                  We couldn't load the legal policies right now.
                </p>
                <button type="button" onClick={() => refetch()} className={ctaStyles.ghost}>
                  {isFetching ? (
                    <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  ) : null}
                  Try again
                </button>
              </div>
            ) : null}

            {data && data.length === 0 ? (
              <p className="panel p-10 text-center text-sm text-muted-foreground">
                No policies have been published yet.
              </p>
            ) : null}

            {data && data.length > 0 ? (
              <ul className="grid gap-4 sm:grid-cols-2">
                {data.map((policy) => (
                  <li key={policy.id}>
                    <Link
                      to="/legal/$slug"
                      params={{ slug: policy.slug }}
                      className="panel flex h-full flex-col gap-3 p-6 transition-colors hover:border-brand-cyan/50"
                    >
                      <FileText className="size-5 text-brand-cyan" aria-hidden="true" />
                      <h2 className="font-display text-lg font-semibold">{policy.title}</h2>
                      {policy.description ? (
                        <p className="line-clamp-3 text-sm text-muted-foreground">
                          {policy.description}
                        </p>
                      ) : null}
                      <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-brand-cyan">
                        Read policy
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
