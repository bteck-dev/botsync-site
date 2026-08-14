import { createFileRoute } from "@tanstack/react-router";
import { Bot, Globe2, Smartphone, Users } from "lucide-react";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Reveal } from "@/components/site/primitives";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About BotSync | Mobile Trading Automation" },
      {
        name: "description",
        content: "Learn how BotSync makes automated MT4 and MT5 trading easier to manage from mobile devices.",
      },
      { property: "og:title", content: "About BotSync | Mobile Trading Automation" },
      { property: "og:description", content: "Learn how BotSync makes automated MT4 and MT5 trading easier to manage from mobile devices." },
      { property: "og:url", content: "https://bot-sync.com/about" },
    ],
    links: [{ rel: "canonical", href: "https://bot-sync.com/about" }],
  }),
  component: AboutPage,
});

const values = [
  { icon: Smartphone, title: "Mobile first", text: "Control trading automation wherever you are." },
  { icon: Bot, title: "Simple automation", text: "Powerful tools without complicated workflows." },
  { icon: Users, title: "Built for traders", text: "Designed for traders, mentors, and their communities." },
  { icon: Globe2, title: "Connected", text: "Bring strategies, brokers, and market tools together." },
];

function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-24">
          <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
          <div className="container-page relative">
            <Reveal className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold tracking-widest text-brand-cyan uppercase">About BotSync</p>
              <h1 className="mt-5 text-4xl font-bold text-balance sm:text-5xl">
                Trading automation made <span className="text-gradient">more accessible</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                BotSync helps forex traders connect, manage, and monitor automated MT4 and MT5
                strategies from one simple mobile-first platform.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="border-y border-border bg-surface/30 py-16 sm:py-20">
          <div className="container-page">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {values.map(({ icon: Icon, title, text }, index) => (
                <Reveal key={title} delay={index * 60}>
                  <article className="h-full rounded-2xl border border-border bg-surface/60 p-5">
                    <Icon className="size-5 text-brand-cyan" aria-hidden="true" />
                    <h2 className="mt-4 text-base font-semibold">{title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="container-page">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold">Our mission</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground sm:text-lg">
                Give traders practical automation and market tools that are easy to understand,
                easy to access, and easy to control from anywhere.
              </p>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
