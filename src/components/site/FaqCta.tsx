import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal, Section, SectionHeading, ctaStyles } from "./primitives";
import { authUrls } from "@/lib/botsync-config";

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
    q: "Can I manage multiple members or accounts?",
    a: "Yes. You can add members, issue licence keys, register devices and monitor activity for your whole community from one dashboard, within the limits of your account plan.",
  },
  {
    q: "What is the difference between normal and subscription license keys?",
    a: "A normal licence key grants access for a fixed allocation defined by the workspace owner. A subscription key stays valid while the member's subscription remains active and is revoked when it lapses.",
  },
  {
    q: "How do AI analysis tokens work?",
    a: "AI tools consume tokens from a balance. Each chart or market analysis request deducts tokens, and the remaining balance is visible across the workspace and member interfaces.",
  },
  {
    q: "Does BotSync guarantee profitable trades?",
    a: "No. BotSync does not guarantee results of any kind. Trading foreign exchange and leveraged products carries substantial financial risk, including the loss of your capital. BotSync provides technology and analytical tools only — never a promise of performance.",
  },
  {
    q: "How are broker credentials protected?",
    a: "Broker connection details are stored server-side with restricted, role-based access, and activation is tied to registered devices. Credentials are never exposed to other members.",
  },
  {
    q: "Can I schedule trades in advance?",
    a: "Yes. You can define activation windows, session-based schedules, daily or weekly automation, and news-event rules before the market moves.",
  },
];

export function Faq() {
  return (
    <Section id="faq">
      <SectionHeading eyebrow="FAQ" title="Questions Traders Ask Before Building" />
      <div className="mx-auto mt-12 max-w-3xl">
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
    <Section id="get-started" className="border-t border-border">
      <Reveal>
        <div className="panel glow grid-bg relative overflow-hidden px-6 py-14 text-center sm:px-12 sm:py-20">
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
                Start Building
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
              <a href={authUrls.login} className={ctaStyles.ghost}>
                Sign In
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
