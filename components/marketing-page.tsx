import Image from "next/image";
import Link from "next/link";
import React, { type ReactNode } from "react";

import { EmbeddedForm } from "@/components/forms";
import { RichMarkdown } from "@/components/rich-markdown";
import type { PageSection, PageSlug, SitePage } from "@/lib/site-content";

/* ─────────────────────────────────────────────
   Types
   ───────────────────────────────────────────── */

type ActionLink = {
  label: string;
  href: string;
};

type IconComponent = (props: { className?: string }) => ReactNode;

type Stat = {
  label: string;
  value: string;
};

type MarkdownCard = {
  body: string;
  title: string;
};

type NamedItem = {
  body: string;
  title: string;
};

/* ─────────────────────────────────────────────
   Data constants
   ───────────────────────────────────────────── */

const primaryActions: Record<PageSlug, ActionLink> = {
  home: {
    label: "Get Your Automation Map",
    href: "/diagnostic"
  },
  why: {
    label: "Start With the Diagnostic",
    href: "/diagnostic"
  },
  diagnostic: {
    label: "Apply for a Diagnostic",
    href: "#apply"
  },
  sprint: {
    label: "Join the Waitlist",
    href: "#waitlist"
  },
  about: {
    label: "Apply to Work Together",
    href: "/apply"
  },
  apply: {
    label: "Apply for the Diagnostic",
    href: "#diagnostic-form"
  }
};

const secondaryActions: Record<PageSlug, ActionLink> = {
  home: {
    label: "See Both Paths",
    href: "/apply"
  },
  why: {
    label: "Compare Both Offers",
    href: "/apply"
  },
  diagnostic: {
    label: "Compare Both Paths",
    href: "/apply"
  },
  sprint: {
    label: "Review the Diagnostic",
    href: "/diagnostic"
  },
  about: {
    label: "See the Sprint",
    href: "/sprint"
  },
  apply: {
    label: "Join the Sprint Waitlist",
    href: "#sprint-form"
  }
};

const heroStats: Record<PageSlug, Stat[]> = {
  home: [
    { value: "90 min", label: "working diagnostic" },
    { value: "Top 3", label: "moves ranked by leverage" },
    { value: "4 weeks", label: "to build the stack" }
  ],
  why: [
    { value: "1 map", label: "before any new software" },
    { value: "3 moves", label: "instead of 47 ideas" },
    { value: "5+ hrs", label: "weekly time saved at the low end" }
  ],
  diagnostic: [
    { value: "$297", label: "founding price" },
    { value: "4 hrs", label: "turnaround after the call" },
    { value: "30 days", label: "credit window into the sprint" }
  ],
  sprint: [
    { value: "$3.5K", label: "flat sprint fee" },
    { value: "3", label: "AI agents built" },
    { value: "30 day", label: "post-sprint check-in" }
  ],
  about: [
    { value: "1 operator", label: "running the company" },
    { value: "6 agents", label: "inside the council" },
    { value: "2024", label: "when the self-replacement build started" }
  ],
  apply: [
    { value: "2 paths", label: "diagnostic or sprint" },
    { value: "24 hrs", label: "application review target" },
    { value: "$297", label: "credited into the sprint" }
  ]
};

const iconCycle: IconComponent[] = [
  CompassIcon,
  WorkflowIcon,
  SignalIcon,
  ShieldIcon,
  BuildIcon,
  ArrowUpIcon,
  UserIcon,
  MailIcon
];

const homeFitTitles = [
  "Revenue is already real",
  "The founder is still the bottleneck",
  "AI traction is missing",
  "More tools are not the goal",
  "Leverage is the target"
];

const diagnosticDeliverableTitles = [
  "Offer and delivery audit",
  "Founder bottleneck map",
  "Current stack review",
  "Top three automation moves"
];

const sprintIncludeTitles = [
  "Weekly build sessions",
  "Async review between calls",
  "Direct operator access",
  "Agent documentation",
  "30-day check-in"
];

const aboutFitTitles = [
  "Agency operators",
  "Consultants with real workload",
  "Businesses with genuine drag"
];

/* ─────────────────────────────────────────────
   Main export
   ───────────────────────────────────────────── */

export function MarketingPage({ page }: { page: SitePage }) {
  switch (page.slug) {
    case "home":
      return renderHomePage(page);
    case "why":
      return renderWhyPage(page);
    case "diagnostic":
      return renderDiagnosticPage(page);
    case "sprint":
      return renderSprintPage(page);
    case "about":
      return renderAboutPage(page);
    case "apply":
      return renderApplyPage(page);
    default:
      return null;
  }
}

/* ─────────────────────────────────────────────
   HOME PAGE
   ───────────────────────────────────────────── */

function renderHomePage(page: SitePage) {
  const proof = getSectionByHeading(page.sections, "PROOF BAR");
  const problem = getSectionByHeading(page.sections, "THE PROBLEM");
  const solution = getSectionByHeading(page.sections, "THE SOLUTION");
  const fit = getSectionByHeading(page.sections, "WHO THIS IS FOR");
  const cta = getSectionByHeading(page.sections, "CTA");
  const steps = splitSteps(solution.body);
  const fitList = extractChecklist(fit.body);
  const ctaCopy = splitLeadCopy(cta.body);
  const quotes = extractQuotes(proof.body);

  return (
    <main className="marketing-page marketing-page--home">
      <PageHero page={page} />

      {/* Social Proof — editorial pull-quotes */}
      <section className="page-band" id={proof.id}>
        <div className="page-band__header">
          <p className="eyebrow">What operators say</p>
        </div>
        <div className="quote-strip">
          {quotes.map((quote) => (
            <article className="quote-card" key={quote.text}>
              <QuoteIcon className="quote-icon" />
              <blockquote>
                <p>{quote.text}</p>
              </blockquote>
              {quote.attribution ? (
                <cite>{quote.attribution}</cite>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      {/* The Problem — full-width editorial narrative */}
      <section className="page-band" id={problem.id}>
        <div className="page-band__header">
          <p className="eyebrow">{problem.heading}</p>
          <h2>{"You don't have a tool problem. You have a prioritization problem."}</h2>
        </div>
        <article className="narrative-card">
          <RichMarkdown className="markdown" source={problem.body} />
        </article>
      </section>

      {/* The Solution — two-step editorial cards */}
      <section className="page-band" id={solution.id}>
        <div className="page-band__header">
          <p className="eyebrow">{solution.heading}</p>
          <h2>Clarity first. Then build.</h2>
        </div>
        <div className="card-grid card-grid--two">
          {steps.map((step, index) => (
            <article className="surface-card timeline-card" key={step.title}>
              <span className="timeline-index">Step {index + 1}</span>
              <h3>{step.title}</h3>
              <RichMarkdown className="markdown card-markdown" source={step.body} />
            </article>
          ))}
        </div>
      </section>

      {/* Who This Is For — check cards */}
      <section className="page-band" id={fit.id}>
        <div className="page-band__header">
          <p className="eyebrow">{fit.heading}</p>
          <h2>This is built for operators who are already making money.</h2>
        </div>
        <div className="check-grid">
          {fitList.map((item, index) => (
            <CheckCard
              icon={CheckIcon}
              key={item}
              label={item}
              title={homeFitTitles[index] ?? `Fit signal ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* CTA */}
      <PromoPanel
        body={ctaCopy.body || cta.body}
        eyebrow="Founding cohort"
        id={cta.id}
        notes={[
          "Application reviewed within 1 business day",
          "Diagnostic is credited into the sprint if you continue"
        ]}
        primary={primaryActions.home}
        secondary={secondaryActions.home}
        title={ctaCopy.title || "Ready to find out where your leverage is?"}
      />
    </main>
  );
}

/* ─────────────────────────────────────────────
   WHY PAGE
   ───────────────────────────────────────────── */

function renderWhyPage(page: SitePage) {
  const coreProblem = getSectionByHeading(page.sections, "THE CORE PROBLEM");
  const reasons = getSectionByHeading(
    page.sections,
    "WHY AI TOOLS HAVEN'T DELIVERED (THE REAL REASONS)"
  );
  const whatWorks = getSectionByHeading(page.sections, "WHAT ACTUALLY WORKS");
  const approach = getSectionByHeading(
    page.sections,
    "THE APPLIED LEVERAGE APPROACH"
  );
  const cost = getSectionByHeading(page.sections, "THE COST OF WAITING");
  const cta = getSectionByHeading(page.sections, "CTA");
  const reasonCards = splitMarkdownSubsections(reasons.body);
  const ctaCopy = splitLeadCopy(cta.body);

  return (
    <main className="marketing-page marketing-page--why">
      <PageHero page={page} />

      {/* Core Problem — full-width narrative with a stat sidebar */}
      <section className="page-band" id={coreProblem.id}>
        <div className="page-band__header">
          <p className="eyebrow">{coreProblem.heading}</p>
          <h2>Your workflow is the bottleneck. Not your tools.</h2>
        </div>
        <div className="split-layout split-layout--wide">
          <article className="narrative-card">
            <RichMarkdown className="markdown" source={coreProblem.body} />
          </article>
          <aside className="card-stack">
            <StatCard label="Map before software" value="Order matters" />
            <IconCard
              body="Busywork is visible, but the expensive bottlenecks are usually hidden in delivery, handoffs, and approvals."
              icon={CompassIcon}
              title="Visible work is not the constraint"
            />
          </aside>
        </div>
      </section>

      {/* Why AI Tools Haven't Delivered — numbered reason cards */}
      <section className="page-band" id={reasons.id}>
        <div className="page-band__header">
          <p className="eyebrow">{reasons.heading}</p>
          <h2>{"Why AI tools haven't worked and what's actually going wrong."}</h2>
        </div>
        {reasonCards.intro ? (
          <div className="section-intro">
            <RichMarkdown className="markdown" source={reasonCards.intro} />
          </div>
        ) : null}
        <div className="card-grid card-grid--two">
          {reasonCards.items.map((item, index) => (
            <article className="surface-card reason-card" key={item.title}>
              <span className="reason-index">0{index + 1}</span>
              <h3>{item.title}</h3>
              <RichMarkdown className="markdown card-markdown" source={item.body} />
            </article>
          ))}
        </div>
      </section>

      {/* What Actually Works — split layout with supporting cards */}
      <section className="page-band" id={whatWorks.id}>
        <div className="page-band__header">
          <p className="eyebrow">{whatWorks.heading}</p>
          <h2>Map the leverage first. Build in the right order.</h2>
        </div>
        <div className="split-layout split-layout--flip">
          <article className="narrative-card">
            <RichMarkdown className="markdown" source={whatWorks.body} />
          </article>
          <aside className="card-stack">
            <IconCard
              body="High-value leverage is not always obvious from inside the operation."
              icon={WorkflowIcon}
              title="External diagnosis sharpens priority"
            />
            <IconCard
              body="Once the build order is clear, implementation gets materially faster."
              icon={ArrowUpIcon}
              title="Speed follows clarity"
            />
          </aside>
        </div>
      </section>

      {/* The Applied Leverage Approach — editorial narrative */}
      <section className="page-band" id={approach.id}>
        <div className="page-band__header">
          <p className="eyebrow">{approach.heading}</p>
          <h2>One path. Two clear entry points.</h2>
        </div>
        <article className="narrative-card">
          <RichMarkdown className="markdown" source={approach.body} />
        </article>
      </section>

      {/* The Cost of Waiting — narrative with a supporting stat */}
      <section className="page-band" id={cost.id}>
        <div className="page-band__header">
          <p className="eyebrow">{cost.heading}</p>
          <h2>Every month without leverage is another month of trading time for output.</h2>
        </div>
        <div className="split-layout">
          <article className="narrative-card">
            <RichMarkdown className="markdown" source={cost.body} />
          </article>
          <aside className="card-stack">
            <StatCard label="Low-end upside" value="5 hours a week" />
          </aside>
        </div>
      </section>

      {/* CTA */}
      <PromoPanel
        body={ctaCopy.body || cta.body}
        eyebrow="Start with the map"
        id={cta.id}
        notes={[
          "90-minute working session",
          "Priority map delivered within 4 hours"
        ]}
        primary={primaryActions.why}
        secondary={secondaryActions.why}
        title={ctaCopy.title || "Find out what you should build first."}
      />
    </main>
  );
}

/* ─────────────────────────────────────────────
   DIAGNOSTIC PAGE
   ───────────────────────────────────────────── */

function renderDiagnosticPage(page: SitePage) {
  const problem = getSectionByHeading(page.sections, "THE PROBLEM");
  const whatYouGet = getSectionByHeading(page.sections, "WHAT YOU GET");
  const format = getSectionByHeading(page.sections, "THE FORMAT");
  const forSection = getSectionByHeading(page.sections, "WHO THIS IS FOR");
  const notForSection = getSectionByHeading(page.sections, "WHO THIS IS NOT FOR");
  const whatHappensAfter = getSectionByHeading(page.sections, "WHAT HAPPENS AFTER");
  const pricing = getSectionByHeading(page.sections, "PRICING");
  const aboutLucas = getSectionByHeading(page.sections, "ABOUT LUCAS");
  const faq = getSectionByHeading(page.sections, "FAQ");
  const apply = getSectionByHeading(page.sections, "APPLY");
  const formatSteps = parseLabeledParagraphs(format.body);
  const deliverables = extractChecklist(whatYouGet.body);
  const faqItems = parseFaqCards(faq.body);

  return (
    <main className="marketing-page marketing-page--diagnostic">
      <PageHero page={page} />

      {/* The Problem */}
      <section className="page-band" id={problem.id}>
        <div className="page-band__header">
          <p className="eyebrow">{problem.heading}</p>
          <h2>{"The problem isn't hustle. It's not knowing what to automate first."}</h2>
        </div>
        <article className="narrative-card">
          <RichMarkdown className="markdown" source={problem.body} />
        </article>
      </section>

      {/* What You Get — deliverable check cards */}
      <section className="page-band" id={whatYouGet.id}>
        <div className="page-band__header">
          <p className="eyebrow">{whatYouGet.heading}</p>
          <h2>What you leave the call with.</h2>
        </div>
        <div className="card-grid card-grid--two">
          {deliverables.map((item, index) => (
            <IconCard
              body={item}
              icon={iconCycle[index % iconCycle.length]}
              key={item}
              title={diagnosticDeliverableTitles[index] ?? `Deliverable ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* The Format — timeline steps */}
      <section className="page-band" id={format.id}>
        <div className="page-band__header">
          <p className="eyebrow">{format.heading}</p>
          <h2>Ninety minutes. A map in your inbox within four hours.</h2>
        </div>
        <div className="timeline-grid">
          {formatSteps.map((step, index) => (
            <article className="surface-card timeline-card" key={step.title}>
              <span className="timeline-index">0{index + 1}</span>
              <h3>{step.title}</h3>
              <RichMarkdown className="markdown card-markdown" source={step.body} />
            </article>
          ))}
        </div>
      </section>

      {/* For / Not For — comparison table */}
      <section className="page-band" id={forSection.id}>
        <div className="page-band__header">
          <p className="eyebrow">Qualification</p>
          <h2>Is this the right move for you?</h2>
        </div>
        <ComparisonTable
          forItems={extractChecklist(forSection.body)}
          notForItems={extractChecklist(notForSection.body)}
        />
      </section>

      {/* What Happens After + Pricing — two clean cards */}
      <section className="page-band" id={pricing.id}>
        <div className="page-band__header">
          <p className="eyebrow">Offer detail</p>
          <h2>$297 founding price, fully credited into the sprint if you continue.</h2>
        </div>
        <div className="card-grid card-grid--two">
          <article className="surface-card">
            <h3>{pricing.heading}</h3>
            <RichMarkdown className="markdown card-markdown" source={pricing.body} />
          </article>
          <article className="surface-card">
            <h3>{whatHappensAfter.heading}</h3>
            <RichMarkdown
              className="markdown card-markdown"
              source={whatHappensAfter.body}
            />
          </article>
        </div>
      </section>

      {/* About Lucas — split layout with profile image */}
      <section className="page-band" id={aboutLucas.id}>
        <div className="page-band__header">
          <p className="eyebrow">{aboutLucas.heading}</p>
          <h2>Built by an operator who ran the same audit on his own business.</h2>
        </div>
        <div className="split-layout split-layout--flip">
          <article className="narrative-card">
            <RichMarkdown className="markdown" source={aboutLucas.body} />
          </article>
          <aside className="card-stack">
            <div className="about-portrait">
              <Image
                src="/images/lucas-synnott.png"
                alt="Lucas Synnott"
                width={400}
                height={400}
                className="about-portrait__img"
              />
            </div>
          </aside>
        </div>
      </section>

      {/* FAQ */}
      <section className="page-band" id={faq.id}>
        <div className="page-band__header">
          <p className="eyebrow">{faq.heading}</p>
          <h2>Common questions.</h2>
        </div>
        <div className="faq-grid">
          {faqItems.map((item) => (
            <article className="surface-card faq-card" key={item.title}>
              <h3>{item.title}</h3>
              <RichMarkdown className="markdown card-markdown" source={item.body} />
            </article>
          ))}
        </div>
      </section>

      {/* Apply form */}
      <FormSection
        notes={[
          "Every application is reviewed personally",
          "Accepted operators get payment and booking inside 24 hours",
          "If the fit is wrong, the answer is a direct no"
        ]}
        page={page}
        section={apply}
        title="Apply for your diagnostic."
      />
    </main>
  );
}

/* ─────────────────────────────────────────────
   SPRINT PAGE
   ───────────────────────────────────────────── */

function renderSprintPage(page: SitePage) {
  const problem = getSectionByHeading(page.sections, "THE PROBLEM THE SPRINT SOLVES");
  const sprintIs = getSectionByHeading(page.sections, "WHAT THE SPRINT IS");
  const structure = getSectionByHeading(page.sections, "THE 4-WEEK STRUCTURE");
  const included = getSectionByHeading(page.sections, "WHAT'S INCLUDED");
  const forSection = getSectionByHeading(page.sections, "WHO THIS IS FOR");
  const notForSection = getSectionByHeading(page.sections, "WHO THIS IS NOT FOR");
  const pricing = getSectionByHeading(page.sections, "PRICING AND CREDIT");
  const waitlistIntro = getSectionByHeading(
    page.sections,
    "SOFT LAUNCH - WAITLIST"
  );
  const whatComesAfter = getSectionByHeading(page.sections, "WHAT COMES AFTER");
  const faq = getSectionByHeading(page.sections, "FAQ");
  const waitlist = getSectionByHeading(page.sections, "WAITLIST");
  const structureCards = splitMarkdownSubsections(structure.body);
  const includedItems = extractChecklist(included.body);
  const faqItems = parseFaqCards(faq.body);

  return (
    <main className="marketing-page marketing-page--sprint">
      <PageHero page={page} />

      {/* The Problem the Sprint Solves */}
      <section className="page-band" id={problem.id}>
        <div className="page-band__header">
          <p className="eyebrow">{problem.heading}</p>
          <h2>{"You know what to build. You're not building it."}</h2>
        </div>
        <article className="narrative-card">
          <RichMarkdown className="markdown" source={problem.body} />
        </article>
      </section>

      {/* What the Sprint Is */}
      <section className="page-band" id={sprintIs.id}>
        <div className="page-band__header">
          <p className="eyebrow">{sprintIs.heading}</p>
          <h2>Four weeks. Three dedicated AI agents. Your business runs differently on the other side.</h2>
        </div>
        <article className="narrative-card">
          <RichMarkdown className="markdown" source={sprintIs.body} />
        </article>
      </section>

      {/* The 4-Week Structure — timeline cards */}
      <section className="page-band" id={structure.id}>
        <div className="page-band__header">
          <p className="eyebrow">{structure.heading}</p>
          <h2>The four-week build.</h2>
        </div>
        {structureCards.intro ? (
          <div className="section-intro">
            <RichMarkdown className="markdown" source={structureCards.intro} />
          </div>
        ) : null}
        <div className="timeline-grid">
          {structureCards.items.map((item, index) => (
            <article className="surface-card timeline-card" key={item.title}>
              <span className="timeline-index">Week {index + 1}</span>
              <h3>{item.title}</h3>
              <RichMarkdown className="markdown card-markdown" source={item.body} />
            </article>
          ))}
        </div>
      </section>

      {/* What's Included */}
      <section className="page-band" id={included.id}>
        <div className="page-band__header">
          <p className="eyebrow">{included.heading}</p>
          <h2>{"What's included in every sprint."}</h2>
        </div>
        <div className="card-grid card-grid--three">
          {includedItems.map((item, index) => (
            <IconCard
              body={item}
              icon={iconCycle[index % iconCycle.length]}
              key={item}
              title={sprintIncludeTitles[index] ?? `Included ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* For / Not For — comparison table */}
      <section className="page-band" id={forSection.id}>
        <div className="page-band__header">
          <p className="eyebrow">Qualification</p>
          <h2>Is the sprint the right starting point?</h2>
        </div>
        <ComparisonTable
          forItems={extractChecklist(forSection.body)}
          notForItems={extractChecklist(notForSection.body)}
        />
      </section>

      {/* Pricing and Credit */}
      <section className="page-band" id={pricing.id}>
        <div className="page-band__header">
          <p className="eyebrow">Decision block</p>
          <h2>$3,500 flat. First soft-launch cohort only.</h2>
        </div>
        <div className="card-grid card-grid--three">
          <article className="surface-card">
            <h3>{pricing.heading}</h3>
            <RichMarkdown className="markdown card-markdown" source={pricing.body} />
          </article>
          <article className="surface-card">
            <h3>{waitlistIntro.heading}</h3>
            <RichMarkdown
              className="markdown card-markdown"
              source={waitlistIntro.body}
            />
          </article>
          <article className="surface-card">
            <h3>{whatComesAfter.heading}</h3>
            <RichMarkdown
              className="markdown card-markdown"
              source={whatComesAfter.body}
            />
          </article>
        </div>
      </section>

      {/* FAQ */}
      <section className="page-band" id={faq.id}>
        <div className="page-band__header">
          <p className="eyebrow">{faq.heading}</p>
          <h2>Common questions.</h2>
        </div>
        <div className="faq-grid">
          {faqItems.map((item) => (
            <article className="surface-card faq-card" key={item.title}>
              <h3>{item.title}</h3>
              <RichMarkdown className="markdown card-markdown" source={item.body} />
            </article>
          ))}
        </div>
      </section>

      {/* Waitlist form */}
      <FormSection
        notes={[
          "Waitlist is for the first soft-launch cohort only",
          "Diagnostic clients get priority when spots open",
          "No commitment is required to join the list"
        ]}
        page={page}
        section={waitlist}
        title="Join the sprint waitlist."
      />
    </main>
  );
}

/* ─────────────────────────────────────────────
   ABOUT PAGE
   ───────────────────────────────────────────── */

function renderAboutPage(page: SitePage) {
  const story = getSectionByHeading(page.sections, "THE STORY");
  const council = getSectionByHeading(page.sections, "THE AI COUNCIL");
  const product = getSectionByHeading(
    page.sections,
    "WHY I BUILT THIS INTO A PRODUCT"
  );
  const who = getSectionByHeading(page.sections, "WHO I BUILD FOR");
  const connect = getSectionByHeading(page.sections, "CONNECT");
  const councilItems = parseNamedList(council.body);

  return (
    <main className="marketing-page marketing-page--about">
      <PageHero page={page} />

      {/* The Story — split layout with portrait */}
      <section className="page-band" id={story.id}>
        <div className="page-band__header">
          <p className="eyebrow">{story.heading}</p>
          <h2>Lucas built this on himself first.</h2>
        </div>
        <div className="split-layout">
          <article className="narrative-card">
            <RichMarkdown className="markdown" source={story.body} />
          </article>
          <aside className="card-stack">
            <div className="about-portrait">
              <Image
                src="/images/lucas-synnott.png"
                alt="Lucas Synnott"
                width={400}
                height={400}
                className="about-portrait__img"
              />
            </div>
          </aside>
        </div>
      </section>

      {/* The AI Council — 3-column agent grid */}
      <section className="page-band" id={council.id}>
        <div className="page-band__header">
          <p className="eyebrow">{council.heading}</p>
          <h2>The AI council running the operation.</h2>
        </div>
        <div className="card-grid card-grid--three">
          {councilItems.map((item, index) => (
            <IconCard
              body={item.body}
              icon={iconCycle[index % iconCycle.length]}
              key={item.title}
              title={item.title}
            />
          ))}
        </div>
      </section>

      {/* Why I Built This Into a Product */}
      <section className="page-band" id={product.id}>
        <div className="page-band__header">
          <p className="eyebrow">{product.heading}</p>
          <h2>Why this became a product.</h2>
        </div>
        <div className="split-layout split-layout--flip">
          <article className="narrative-card">
            <RichMarkdown className="markdown" source={product.body} />
          </article>
          <aside className="card-stack">
            <StatCard label="What most operators need" value="Three dedicated AI agents" />
          </aside>
        </div>
      </section>

      {/* Who I Build For — check cards */}
      <section className="page-band" id={who.id}>
        <div className="page-band__header">
          <p className="eyebrow">{who.heading}</p>
          <h2>Who I build for.</h2>
        </div>
        <div className="check-grid">
          {splitParagraphs(who.body).map((item, index) => (
            <CheckCard
              icon={CheckIcon}
              key={item}
              label={item}
              title={aboutFitTitles[index] ?? `Operator profile ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Connect — clean CTA */}
      <section className="page-band" id={connect.id}>
        <div className="page-band__header">
          <p className="eyebrow">{connect.heading}</p>
          <h2>Where to go from here.</h2>
        </div>
        <div className="split-layout">
          <article className="narrative-card">
            <RichMarkdown className="markdown" source={connect.body} />
          </article>
          <aside className="card-stack">
            <article className="surface-card callout-card">
              <h3>Where to start</h3>
              <p>
                If the work is still unclear, start with the diagnostic. If the
                map already exists, the sprint is the execution path.
              </p>
              <div className="cta-actions">
                <Link className="button button-primary" href="/apply">
                  Apply
                </Link>
                <Link className="button button-secondary" href="/sprint">
                  See the Sprint
                </Link>
              </div>
            </article>
          </aside>
        </div>
      </section>
    </main>
  );
}

/* ─────────────────────────────────────────────
   APPLY PAGE
   ───────────────────────────────────────────── */

function renderApplyPage(page: SitePage) {
  const paths = getSectionByHeading(page.sections, "TWO PATHS");
  const notSure = getSectionByHeading(page.sections, "NOT SURE WHICH ONE?");
  const diagnosticForm = getSectionByHeading(
    page.sections,
    "DIAGNOSTIC APPLICATION"
  );
  const sprintForm = getSectionByHeading(page.sections, "SPRINT WAITLIST");
  const questions = getSectionByHeading(page.sections, "QUESTIONS");
  const pathCards = splitMarkdownSubsections(paths.body);

  return (
    <main className="marketing-page marketing-page--apply">
      <PageHero page={page} />

      {/* Two Paths — side by side cards */}
      <section className="page-band" id={paths.id}>
        <div className="page-band__header">
          <p className="eyebrow">{paths.heading}</p>
          <h2>Two paths. One right starting point for you.</h2>
        </div>
        <div className="card-grid card-grid--two">
          {pathCards.items.map((item, index) => (
            <article className="surface-card path-card" key={item.title}>
              <span className="path-chip">Path {index + 1}</span>
              <h3>{item.title}</h3>
              <RichMarkdown className="markdown card-markdown" source={item.body} />
            </article>
          ))}
        </div>
      </section>

      {/* Decision helper */}
      <section className="page-band" id={notSure.id}>
        <div className="page-band__header">
          <p className="eyebrow">{notSure.heading}</p>
          <h2>Not sure which one fits?</h2>
        </div>
        <div className="split-layout">
          <article className="narrative-card">
            <RichMarkdown className="markdown" source={notSure.body} />
          </article>
          <aside className="card-stack">
            <StatCard label="Default recommendation" value="Start with the diagnostic" />
          </aside>
        </div>
      </section>

      {/* Diagnostic Application form */}
      <FormSection
        notes={[
          "Current offer and revenue range",
          "How delivery works today",
          "Where non-judgment work still depends on you"
        ]}
        page={page}
        section={diagnosticForm}
        title="Apply for the diagnostic."
      />

      {/* Sprint Waitlist form */}
      <FormSection
        notes={[
          "Whether the diagnostic is already complete",
          "What the operator wants to build first",
          "Why waitlist members get first cohort access"
        ]}
        page={page}
        section={sprintForm}
        title="Join the sprint waitlist."
      />

      {/* Questions CTA */}
      <PromoPanel
        body={questions.body}
        eyebrow={questions.heading}
        id={questions.id}
        notes={[
          "Email a short description of the bottleneck",
          "Expect a direct path recommendation"
        ]}
        primary={primaryActions.apply}
        secondary={secondaryActions.apply}
        title="Still unsure which path fits?"
      />
    </main>
  );
}

/* ─────────────────────────────────────────────
   HERO — router
   ───────────────────────────────────────────── */

function PageHero({ page }: { page: SitePage }) {
  switch (page.slug) {
    case "home":
      return <HomeHero page={page} />;
    case "why":
      return <WhyHero page={page} />;
    case "diagnostic":
      return <DiagnosticHero page={page} />;
    case "sprint":
      return <SprintHero page={page} />;
    case "about":
      return <AboutHero page={page} />;
    case "apply":
      return <ApplyHero page={page} />;
    default:
      return null;
  }
}

/* ─────────────────────────────────────────────
   HERO — per-page implementations
   ───────────────────────────────────────────── */

function HomeHero({ page }: { page: SitePage }) {
  return (
    <HeroCentered page={page}>
      <div className="hero-stats-bar">
        {heroStats.home.map((stat) => (
          <HeroMetric key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </div>
    </HeroCentered>
  );
}

function WhyHero({ page }: { page: SitePage }) {
  return (
    <HeroCentered page={page}>
      <div className="hero-stats-bar">
        {heroStats.why.map((stat) => (
          <HeroMetric key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </div>
    </HeroCentered>
  );
}

function DiagnosticHero({ page }: { page: SitePage }) {
  return (
    <HeroCentered page={page}>
      <div className="hero-stats-bar">
        {heroStats.diagnostic.map((stat) => (
          <HeroMetric key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </div>
    </HeroCentered>
  );
}

function SprintHero({ page }: { page: SitePage }) {
  return (
    <HeroCentered page={page}>
      <div className="hero-stats-bar">
        {heroStats.sprint.map((stat) => (
          <HeroMetric key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </div>
    </HeroCentered>
  );
}

function AboutHero({ page }: { page: SitePage }) {
  return (
    <HeroCentered page={page}>
      <div className="hero-stats-bar">
        {heroStats.about.map((stat) => (
          <HeroMetric key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </div>
    </HeroCentered>
  );
}

function ApplyHero({ page }: { page: SitePage }) {
  return (
    <HeroCentered page={page}>
      <div className="hero-stats-bar">
        {heroStats.apply.map((stat) => (
          <HeroMetric key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </div>
    </HeroCentered>
  );
}

/* ─────────────────────────────────────────────
   HERO — shared building blocks
   ───────────────────────────────────────────── */

function HeroCentered({
  children,
  page
}: {
  children?: ReactNode;
  page: SitePage;
}) {
  const primaryAction = page.hero.cta ?? primaryActions[page.slug];
  const secondaryAction = secondaryActions[page.slug];

  return (
    <section className="page-hero">
      <div className="hero-centered">
        <p className="eyebrow">{page.definition.eyebrow}</p>
        <h1 className="hero-title">{page.hero.headline}</h1>
        {page.hero.subheadline ? (
          <p className="hero-subheadline">{page.hero.subheadline}</p>
        ) : null}
        {page.hero.body ? (
          <RichMarkdown className="markdown hero-body" source={page.hero.body} />
        ) : null}
        <div className="hero-actions">
          <Link className="button button-primary" href={primaryAction.href}>
            {primaryAction.label}
          </Link>
          <Link className="button button-secondary" href={secondaryAction.href}>
            {secondaryAction.label}
          </Link>
        </div>
      </div>
      {children}
    </section>
  );
}

function HeroMetric({ label, value }: Stat) {
  return (
    <article className="hero-metric">
      <span className="hero-metric__value">{value}</span>
      <span className="hero-metric__label">{label}</span>
    </article>
  );
}

/* ─────────────────────────────────────────────
   SECTION — shared building blocks
   ───────────────────────────────────────────── */

function FormSection({
  notes,
  page,
  section,
  title
}: {
  notes: string[];
  page: SitePage;
  section: PageSection;
  title: string;
}) {
  const form = getEmbeddedForm(page.slug, section.id);

  return (
    <section className="page-band page-band--form" id={section.id}>
      <div className="form-layout">
        <div className="form-layout__intro">
          <p className="eyebrow">{section.heading}</p>
          <h2>{title}</h2>
          <RichMarkdown className="markdown" source={section.body} />
          <div className="trust-list">
            {notes.map((note) => (
              <div className="trust-list__item" key={note}>
                <CheckIcon className="signal-icon" />
                <span>{note}</span>
              </div>
            ))}
          </div>
        </div>
        {form ? <EmbeddedForm variant={form} /> : null}
      </div>
    </section>
  );
}

function PromoPanel({
  body,
  eyebrow,
  id,
  notes,
  primary,
  secondary,
  title
}: {
  body: string;
  eyebrow: string;
  id: string;
  notes: string[];
  primary: ActionLink;
  secondary: ActionLink;
  title: string;
}) {
  return (
    <section className="page-band page-band--cta bottom-cta" id={id}>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <RichMarkdown className="markdown cta-copy" source={body} />
        <div className="trust-list">
          {notes.map((note) => (
            <div className="trust-list__item" key={note}>
              <CheckIcon className="signal-icon" />
              <span>{note}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="cta-actions">
        <Link className="button button-primary" href={primary.href}>
          {primary.label}
        </Link>
        <Link className="button button-secondary" href={secondary.href}>
          {secondary.label}
        </Link>
      </div>
    </section>
  );
}

function ComparisonTable({
  forItems,
  notForItems
}: {
  forItems: string[];
  notForItems: string[];
}) {
  return (
    <div className="comparison-table">
      <div className="comparison-col comparison-col--for">
        <div className="comparison-col__header">
          <span className="comparison-col__icon comparison-col__icon--for">
            <CheckIcon className="panel-icon" />
          </span>
          <h3>This is for you if&hellip;</h3>
        </div>
        <ul className="comparison-col__list">
          {forItems.map((item) => (
            <li key={item}>
              <CheckIcon className="comparison-check" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="comparison-divider" />
      <div className="comparison-col comparison-col--not">
        <div className="comparison-col__header">
          <span className="comparison-col__icon comparison-col__icon--not">
            <CloseIcon className="panel-icon" />
          </span>
          <h3>This is not for you if&hellip;</h3>
        </div>
        <ul className="comparison-col__list">
          {notForItems.map((item) => (
            <li key={item}>
              <CloseIcon className="comparison-x" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function IconCard({
  body,
  icon: Icon,
  title
}: {
  body: string;
  icon: IconComponent;
  title: string;
}) {
  return (
    <article className="surface-card icon-card">
      <span className="icon-badge">
        <Icon className="panel-icon" />
      </span>
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  );
}

function CheckCard({
  icon: Icon,
  label,
  title
}: {
  icon: IconComponent;
  label: string;
  title: string;
}) {
  return (
    <article className="surface-card check-card">
      <span className="icon-badge icon-badge--small">
        <Icon className="panel-icon" />
      </span>
      {title ? <h3>{title}</h3> : null}
      <p>{label}</p>
    </article>
  );
}

function StatCard({ label, value }: Stat) {
  return (
    <article className="surface-card stat-card">
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </article>
  );
}

/* ─────────────────────────────────────────────
   HELPER / UTILITY FUNCTIONS
   ───────────────────────────────────────────── */

function getSectionByHeading(sections: PageSection[], heading: string): PageSection {
  const match = sections.find(
    (section) => normalizeHeadingKey(section.heading) === normalizeHeadingKey(heading)
  );

  if (!match) {
    throw new Error(`Missing section "${heading}"`);
  }

  return match;
}

function splitParagraphs(markdown: string): string[] {
  return normalizeMarkdown(markdown)
    .split(/\n\s*\n/g)
    .map((part) => stripMarkdown(part))
    .filter(Boolean);
}

function splitMarkdownSubsections(markdown: string): {
  intro: string;
  items: MarkdownCard[];
} {
  const lines = markdown.split("\n");
  const introLines: string[] = [];
  const items: MarkdownCard[] = [];
  let current: { body: string[]; title: string } | null = null;

  const pushCurrent = () => {
    if (!current) {
      return;
    }

    items.push({
      body: normalizeMarkdown(current.body.join("\n")),
      title: current.title
    });
    current = null;
  };

  for (const line of lines) {
    const sectionMatch = line.match(/^###\s+(.+)$/);

    if (sectionMatch) {
      pushCurrent();
      current = {
        body: [],
        title: stripMarkdown(sectionMatch[1])
      };
      continue;
    }

    if (current) {
      current.body.push(line);
    } else {
      introLines.push(line);
    }
  }

  pushCurrent();

  return {
    intro: normalizeMarkdown(introLines.join("\n")),
    items
  };
}

function parseLabeledParagraphs(markdown: string): MarkdownCard[] {
  const lines = markdown.split("\n");
  const items: MarkdownCard[] = [];
  let current: { body: string[]; title: string } | null = null;

  const pushCurrent = () => {
    if (!current) {
      return;
    }

    items.push({
      body: normalizeMarkdown(current.body.join("\n")),
      title: current.title
    });
    current = null;
  };

  for (const line of lines) {
    const labeledMatch = line
      .trim()
      .match(/^(?:[-*]\s+)?\*\*(.+?):\*\*\s*(.*)$/);

    if (labeledMatch) {
      pushCurrent();
      current = {
        body: labeledMatch[2] ? [labeledMatch[2]] : [],
        title: stripMarkdown(labeledMatch[1])
      };
      continue;
    }

    if (current) {
      current.body.push(line);
    }
  }

  pushCurrent();

  return items;
}

function parseFaqCards(markdown: string): MarkdownCard[] {
  const lines = markdown.split("\n");
  const items: MarkdownCard[] = [];
  let current: { body: string[]; title: string } | null = null;

  const pushCurrent = () => {
    if (!current) {
      return;
    }

    items.push({
      body: normalizeMarkdown(current.body.join("\n")),
      title: current.title
    });
    current = null;
  };

  for (const line of lines) {
    const match = line.trim().match(/^\*\*(.+?)\*\*$/);

    if (match) {
      pushCurrent();
      current = {
        body: [],
        title: stripMarkdown(match[1])
      };
      continue;
    }

    if (current) {
      current.body.push(line);
    }
  }

  pushCurrent();

  return items;
}

function parseNamedList(markdown: string): NamedItem[] {
  return markdown
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .flatMap((line) => {
      const match = line.match(/^-\s+\*\*(.+?)\*\*\s*(?:-|\u2014)\s*(.+)$/);

      if (!match) {
        return [];
      }

      return [
        {
          body: stripMarkdown(match[2]),
          title: stripMarkdown(match[1])
        }
      ];
    });
}

function extractQuotes(markdown: string): { text: string; attribution: string }[] {
  const quotes: { text: string; attribution: string }[] = [];
  let current: string[] = [];

  const pushCurrent = () => {
    if (current.length === 0) {
      return;
    }

    const raw = stripMarkdown(current.join(" ").trim());
    const dashMatch = raw.match(/^(.+?)\s*[—\u2014-]\s*(.+)$/);
    if (dashMatch) {
      quotes.push({
        text: dashMatch[1].replace(/^[""\u201C]|[""\u201D]$/g, "").trim(),
        attribution: dashMatch[2].trim()
      });
    } else {
      quotes.push({ text: raw.replace(/^[""\u201C]|[""\u201D]$/g, "").trim(), attribution: "" });
    }
    current = [];
  };

  for (const line of markdown.split("\n")) {
    if (line.trim().startsWith(">")) {
      const content = line.replace(/^>\s?/, "").trim();
      if (!content) {
        pushCurrent();
        continue;
      }
      current.push(content);
      continue;
    }

    if (!line.trim()) {
      pushCurrent();
    }
  }

  pushCurrent();

  return quotes;
}

function splitSteps(markdown: string): MarkdownCard[] {
  const parts = markdown.split(/(?=\*\*Step \d+:)/);
  return parts
    .filter(part => part.trim())
    .map(part => {
      const match = part.match(/^\*\*Step \d+:\s*(.+?)\*\*\s*([\s\S]*)/);
      if (!match) {
        return { title: "Step", body: part.trim() };
      }
      return {
        title: stripMarkdown(match[1]),
        body: normalizeMarkdown(match[2])
      };
    });
}

function extractChecklist(markdown: string): string[] {
  return markdown
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .flatMap((line) => {
      const cleaned = line.replace(/^[-*]\s+/, "").replace(/^[\u2713\u2717]\s+/, "");
      if (cleaned === line && !line.startsWith("- ") && !line.startsWith("* ")) {
        if (!line.startsWith("\u2713") && !line.startsWith("\u2717")) {
          return [];
        }
      }

      return [stripMarkdown(cleaned)];
    });
}

function splitLeadCopy(markdown: string): { body: string; title: string } {
  const trimmed = normalizeMarkdown(markdown);
  const match = trimmed.match(/^\*\*(.+?)\*\*\s*([\s\S]*)$/);

  if (!match) {
    return {
      body: trimmed,
      title: ""
    };
  }

  return {
    body: normalizeMarkdown(match[2]),
    title: stripMarkdown(match[1])
  };
}

function normalizeMarkdown(markdown: string): string {
  return markdown.trim().replace(/\n{3,}/g, "\n\n");
}

function stripMarkdown(value: string): string {
  return value
    .replace(/\[(.+?)\]\(.+?\)/g, "$1")
    .replace(/[*_`>#]/g, "")
    .replace(/^\u2192\s*/, "")
    .trim();
}

function normalizeHeadingKey(value: string): string {
  return value
    .toLowerCase()
    .replace(/[\u2012-\u2015]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

function getEmbeddedForm(
  slug: PageSlug,
  sectionId: string
): "diagnostic" | "sprint" | null {
  if (slug === "diagnostic" && sectionId === "apply") {
    return "diagnostic";
  }

  if (slug === "sprint" && sectionId === "waitlist") {
    return "sprint";
  }

  if (slug === "apply" && sectionId === "diagnostic-form") {
    return "diagnostic";
  }

  if (slug === "apply" && sectionId === "sprint-form") {
    return "sprint";
  }

  return null;
}

/* ─────────────────────────────────────────────
   SVG ICON COMPONENTS
   ───────────────────────────────────────────── */

function svgProps(className?: string) {
  return {
    className,
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.7,
    viewBox: "0 0 24 24"
  };
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg {...svgProps(className)}>
      <path d="M5 12.5 9.2 17 19 7.5" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg {...svgProps(className)}>
      <path d="m7 7 10 10" />
      <path d="m17 7-10 10" />
    </svg>
  );
}

function CompassIcon({ className }: { className?: string }) {
  return (
    <svg {...svgProps(className)}>
      <circle cx="12" cy="12" r="8" />
      <path d="m10 14 3.8-7.8L16 10l-6 4Z" />
    </svg>
  );
}

function WorkflowIcon({ className }: { className?: string }) {
  return (
    <svg {...svgProps(className)}>
      <rect height="5" rx="1.2" width="6" x="3" y="5" />
      <rect height="5" rx="1.2" width="6" x="15" y="5" />
      <rect height="5" rx="1.2" width="6" x="9" y="14" />
      <path d="M9 7.5h6" />
      <path d="M12 10v4" />
    </svg>
  );
}

function SignalIcon({ className }: { className?: string }) {
  return (
    <svg {...svgProps(className)}>
      <path d="M4 16v2" />
      <path d="M8 13v5" />
      <path d="M12 10v8" />
      <path d="M16 7v11" />
      <path d="M20 4v14" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg {...svgProps(className)}>
      <path d="M12 3 5.5 6v4.8c0 4 2.7 7.6 6.5 9.2 3.8-1.6 6.5-5.2 6.5-9.2V6L12 3Z" />
      <path d="m9.3 12.2 1.9 1.9 3.7-4.1" />
    </svg>
  );
}

function BuildIcon({ className }: { className?: string }) {
  return (
    <svg {...svgProps(className)}>
      <path d="m14.5 5.5 4 4" />
      <path d="m10 10 7-7 4 4-7 7" />
      <path d="m12 8-6 6" />
      <path d="m5 14 5 5" />
      <path d="M4 20h4" />
    </svg>
  );
}

function ArrowUpIcon({ className }: { className?: string }) {
  return (
    <svg {...svgProps(className)}>
      <path d="M6 16 18 4" />
      <path d="M10 4h8v8" />
      <path d="M5 20h14" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg {...svgProps(className)}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5.5 19c1.8-3.2 4.2-4.8 6.5-4.8s4.7 1.6 6.5 4.8" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg {...svgProps(className)}>
      <rect height="12" rx="2" width="18" x="3" y="6" />
      <path d="m5 8 7 5 7-5" />
    </svg>
  );
}

function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg {...svgProps(className)}>
      <path d="M7 15.5a3.5 3.5 0 1 1 0-7H9v3H7a1 1 0 0 0 0 2h2v2H7Z" />
      <path d="M15 15.5a3.5 3.5 0 1 1 0-7h2v3h-2a1 1 0 0 0 0 2h2v2h-2Z" />
    </svg>
  );
}
