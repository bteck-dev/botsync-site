import { Apple, ArrowLeft, Construction, Mail, Smartphone, Sparkles } from "lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/site/Logo";
import { ctaStyles } from "@/components/site/primitives";

type ConstructionSearch = {
  feature?: "login" | "builder" | "download";
};

export const Route = createFileRoute("/under-construction")({
  validateSearch: (search: Record<string, unknown>): ConstructionSearch => {
    const feature = search["feature"];
    return feature === "login" || feature === "builder" || feature === "download" ? { feature } : {};
  },
  head: () => ({
    meta: [
      { title: "Under Construction | BotSync" },
      {
        name: "description",
        content: "BotSync login and strategy-building tools are coming soon.",
      },
    ],
  }),
  component: UnderConstructionPage,
});

function UnderConstructionPage() {
  const { feature } = Route.useSearch();
  const featureName = feature === "login" ? "Login" : feature === "download" ? "App Download" : "Sign Up";

  return (
    <main className="grid min-h-screen place-items-center overflow-hidden px-5 py-12">
      <div className="grid-bg pointer-events-none fixed inset-0 opacity-60" aria-hidden="true" />
      <div
        className="pointer-events-none fixed left-1/2 top-1/3 size-[32rem] -translate-x-1/2 rounded-full opacity-20 blur-[120px]"
        style={{ backgroundImage: "var(--gradient-brand)" }}
        aria-hidden="true"
      />

      <section className="panel glow relative w-full max-w-2xl p-8 text-center sm:p-12">
        <Link to="/" className="mx-auto inline-flex rounded-xl" aria-label="BotSync home">
          <Logo size={42} />
        </Link>

        <div className="mx-auto mt-9 flex size-16 items-center justify-center rounded-2xl border border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan">
          <Construction className="size-8" aria-hidden="true" />
        </div>

        <p className="mt-7 inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
          <Sparkles className="size-3.5 text-brand-cyan" aria-hidden="true" />
          {featureName}
        </p>
        <h1 className="mt-5 text-4xl font-bold text-balance sm:text-5xl">
          This page is <span className="text-gradient">under construction</span>
        </h1>
        {feature === "download" ? (
          <>
            <p className="mx-auto mt-5 max-w-lg leading-relaxed text-muted-foreground sm:text-lg">
              BotSync for iOS and Android is coming soon.
            </p>
            <div className="mx-auto mt-8 grid max-w-lg gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-surface/60 p-5">
                <Apple className="mx-auto size-7" aria-hidden="true" />
                <p className="mt-3 font-semibold">iOS</p>
                <p className="mt-1 text-xs text-brand-cyan">Coming soon</p>
              </div>
              <div className="rounded-2xl border border-border bg-surface/60 p-5">
                <Smartphone className="mx-auto size-7" aria-hidden="true" />
                <p className="mt-3 font-semibold">Android</p>
                <p className="mt-1 text-xs text-brand-emerald">Coming soon</p>
              </div>
            </div>
            <a href="mailto:support@botsync.app?subject=BotSync%20App%20Enquiry" className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <Mail className="size-4" aria-hidden="true" /> Questions about the app? Contact us
            </a>
          </>
        ) : (
          <p className="mx-auto mt-5 max-w-lg leading-relaxed text-muted-foreground sm:text-lg">
            We’re putting the finishing touches on the BotSync {featureName.toLowerCase()} experience.
            Please check back soon.
          </p>
        )}

        <div className="mt-9 flex justify-center">
          <Link to="/" className={ctaStyles.primary}>
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}
