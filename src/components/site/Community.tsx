import { Eyebrow, Reveal, Section, SectionHeading } from "./primitives";

export function Mentors() {
  return (
    <Section id="community">
      <SectionHeading
        eyebrow="For traders"
        title="Built to Help Traders Operate Professionally"
        description="Create and manage Expert Advisors, members, licence keys, broker connections, trade schedules, and activity from one dashboard."
      />
    </Section>
  );
}

export function Students() {
  return (
    <Section id="mobile" className="border-y border-border bg-[oklch(0.115_0.02_264)]">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Eyebrow>Mobile experience</Eyebrow>
          <h2 className="mt-5 text-3xl font-bold text-balance sm:text-4xl">
            Trade on Mobile. Stay in Control.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Activate your licence, connect a broker, and monitor automated trades from the BotSync
            app wherever you are.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <img
            src="/botsync-app-preview.png"
            alt="BotSync mobile app showing its trades log and signal status"
            className="mx-auto max-h-[42rem] w-auto rounded-[2rem] border border-border shadow-2xl"
            loading="lazy"
          />
        </Reveal>
      </div>
    </Section>
  );
}
