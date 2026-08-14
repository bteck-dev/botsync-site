import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal, Section, SectionHeading, ctaStyles } from "./primitives";
import { appDownloadUrl, authUrls } from "@/lib/botsync-config";

const faqs = [
  {
    q: "What is an Expert Advisor?",
    a: "An Expert Advisor (EA) is an automated program that runs inside MetaTrader and executes a defined set of trading rules — entries, exits and risk settings — on your behalf.",
  },
  {
    q: "Do I need coding knowledge to use BotSync?",
    a: "No. BotSync is designed so traders can configure strategies through the interface. Members simply activate a licence key, choose an EA and connect their broker account.",
  },
  {
    q: "Does BotSync support MT4 and MT5?",
    a: "Yes. Expert Advisors and account connections are designed for both MetaTrader 4 and MetaTrader 5. Supported brokers and servers are published in the Brokers section.",
  },
  {
    q: "Does BotSync guarantee profitable trades?",
    a: "No. BotSync does not guarantee results of any kind. Trading foreign exchange and leveraged products carries substantial financial risk, including the loss of your capital. BotSync provides technology and analytical tools only — never a promise of performance.",
  },
];

export function Faq() {
  return (
    <Section id="faq" className="border-t border-border py-16 sm:py-20">
      <SectionHeading eyebrow="FAQ" title="Common Questions" />
      <div className="mx-auto mt-8 max-w-3xl">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((item, i) => (
            <AccordionItem key={item.q} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}

export function FinalCta() {
  return (
    <Section id="get-started" className="border-t border-border py-16 sm:py-20">
      <Reveal>
        <div className="panel glow grid-bg relative overflow-hidden px-6 py-12 text-center sm:px-12 sm:py-14">
          <div
            className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full opacity-25 blur-[100px]"
            style={{ backgroundImage: "var(--gradient-brand)" }}
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold text-balance sm:text-4xl">
              Take Automated Trading With You Everywhere
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Create automated tools, support your community, and manage your trading operation from
              one professional platform — on desktop or mobile.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <a href={authUrls.register} className={ctaStyles.primary}>
                Sign Up
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
              <a href={authUrls.login} className={ctaStyles.ghost}>
                Sign In
              </a>
              <a href={appDownloadUrl} className={ctaStyles.ghost}>
                Download App
              </a>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              By creating an account you agree to our{" "}
              <Link to="/legal" className="text-brand-cyan underline">
                Terms and Privacy policies
              </Link>
              .
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
