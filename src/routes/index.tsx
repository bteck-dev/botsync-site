import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/site/Hero";
import { Platform } from "@/components/site/Platform";
import { Features } from "@/components/site/Features";
import { Mentors, Students } from "@/components/site/Community";
import { Brokers } from "@/components/site/Brokers";
import { WhyBotSync, HowItWorks, Security } from "@/components/site/WhyHowSecurity";
import { Faq, FinalCta } from "@/components/site/FaqCta";

const title = "BotSync — Mobile Trading Automation for Forex Traders";
const description =
  "BotSync brings Expert Advisor technology to your smartphone. Connect, manage and monitor automated trading strategies on MT4 and MT5 from anywhere — no coding required.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "BotSync",
          applicationCategory: "FinanceApplication",
          operatingSystem: "Web, MetaTrader 4, MetaTrader 5",
          description,
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <a
        href="#platform"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>
      <Header />
      <main>
        <Hero />
        <Platform />
        <Features />
        <Mentors />
        <Students />
        <Brokers />
        <WhyBotSync />
        <HowItWorks />
        <Security />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
