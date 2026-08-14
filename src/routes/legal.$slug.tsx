import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, ArrowLeft, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Section, ctaStyles } from "@/components/site/primitives";
import { fetchLegalPolicy } from "@/lib/botsync-api";

export const Route = createFileRoute("/legal/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `Legal — BotSync` },
      {
        name: "description",
        content: "Read the current published BotSync legal policy and trading risk disclosure.",
      },
      { property: "og:title", content: "Legal — BotSync" },
      {
        property: "og:description",
        content: "Read the current published BotSync legal policy and trading risk disclosure.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `/legal/${params.slug}` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `/legal/${params.slug}` }],
  }),
  component: LegalPolicyPage,
});

function looksLikeHtml(value: string) {
  return /<\/?[a-z][\s\S]*>/i.test(value);
}

function LegacyPolicyContent({ content }: { content: string }) {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    if (!looksLikeHtml(content)) return;
    let active = true;
    void import("dompurify").then((mod) => {
      if (active) setHtml(mod.default.sanitize(content));
    });
    return () => {
      active = false;
    };
  }, [content]);

  if (!looksLikeHtml(content)) {
    return (
      <div className="space-y-4">
        {content
          .split(/\n{2,}/)
          .map((para) => para.trim())
          .filter(Boolean)
          .map((para, i) => (
            <p key={i} className="text-sm leading-relaxed text-muted-foreground">
              {para}
            </p>
          ))}
      </div>
    );
  }

  if (html === null) {
    return (
      <p className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        Preparing document…
      </p>
    );
  }

  return (
    <div
      className="space-y-4 text-sm leading-relaxed text-muted-foreground [&_a]:text-brand-cyan [&_a]:underline [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-foreground [&_ul]:space-y-2"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function PolicyContent({ content }: { content: string }) {
  if (looksLikeHtml(content)) return <LegacyPolicyContent content={content} />;

  return (
    <div className="legal-document">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noreferrer">
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

function LegalPolicyPage() {
  const { slug } = Route.useParams();
  const { data, isPending, isError, refetch, isFetching } = useQuery({
    queryKey: ["legal", "policy", slug],
    queryFn: ({ signal }) => fetchLegalPolicy(slug, signal),
    staleTime: 5 * 60_000,
  });

  return (
    <>
      <Header />
      <main>
        <Section className="pt-32">
          <div className="mx-auto max-w-3xl">
            <Link to="/legal" className={ctaStyles.quiet}>
              <ArrowLeft className="size-4" aria-hidden="true" />
              Legal center
            </Link>

            {isPending ? (
              <div className="mt-8 space-y-4" aria-busy="true">
                <div className="h-10 w-2/3 animate-pulse rounded bg-surface-2" />
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-4 animate-pulse rounded bg-surface-2" />
                ))}
              </div>
            ) : null}

            {isError ? (
              <div className="panel mt-8 flex flex-col items-center gap-4 p-10 text-center">
                <AlertTriangle className="size-6 text-warn" aria-hidden="true" />
                <p className="text-sm text-muted-foreground">
                  This document couldn't be loaded right now.
                </p>
                <button type="button" onClick={() => refetch()} className={ctaStyles.ghost}>
                  {isFetching ? (
                    <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  ) : null}
                  Try again
                </button>
              </div>
            ) : null}

            {!isPending && !isError && !data ? (
              <div className="panel mt-8 p-10 text-center">
                <h1 className="font-display text-2xl font-bold">Policy not found</h1>
                <p className="mt-3 text-sm text-muted-foreground">
                  This policy either doesn't exist or is not currently published.
                </p>
                <Link to="/legal" className={`${ctaStyles.ghost} mt-6`}>
                  Browse the legal center
                </Link>
              </div>
            ) : null}

            {data ? (
              <article className="mt-8">
                <h1 className="text-3xl font-bold text-balance sm:text-4xl">{data.title}</h1>
                {data.description ? (
                  <p className="mt-4 text-base text-muted-foreground">{data.description}</p>
                ) : null}
                {data.updatedAt ? (
                  <p className="mt-4 text-xs text-muted-foreground">
                    Last updated{" "}
                    <time dateTime={data.updatedAt}>
                      {new Date(data.updatedAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </p>
                ) : null}
                <hr className="my-8 border-border" />
                {data.content ? (
                  <PolicyContent content={data.content} />
                ) : (
                  <p className="text-sm text-muted-foreground">
                    This policy has no content published yet.
                  </p>
                )}
              </article>
            ) : null}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
