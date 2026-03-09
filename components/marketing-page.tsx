import Link from "next/link";
import type { ReactNode } from "react";

import { EmbeddedForm } from "@/components/forms";
import { RichMarkdown } from "@/components/rich-markdown";
import type { PageSection, PageSlug, SitePage } from "@/lib/site-content";

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
    { value: "3", label: "automations shipped" },
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

const heroSteps: Record<PageSlug, string[]> = {
  home: ["Audit", "Sequence", "Build"],
  why: ["Map", "Prioritize", "Install"],
  diagnostic: ["Audit", "Rank", "Decide"],
  sprint: ["Scope", "Build", "Stabilize"],
  about: ["Design", "Delegate", "Ship"],
  apply: ["Choose", "Apply", "Build"]
};

const heroSignals: Partial<Record<PageSlug, string[]>> = {
  about: [
    "AI council operating model in production",
    "Operator-first implementation perspective",
    "Built from Lucas's own business constraints"
  ],
  apply: [
    "Diagnostic is the default starting point",
    "Sprint is for operators who already know what to build",
    "Both paths route into the same leverage stack"
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

function renderHomePage(page: SitePage) {
  const proof = getSectionByHeading(page.sections, "PROOF BAR");
  const problem = getSectionByHeading(page.sections, "THE PROBLEM");
  const solution = getSectionByHeading(page.sections, "THE SOLUTION");
  const fit = getSectionByHeading(page.sections, "WHO THIS IS FOR");
  const cta = getSectionByHeading(page.sections, "CTA");
  const problemList = extractChecklist(problem.body);
  const steps = splitOnRules(solution.body);
  const fitList = extractChecklist(fit.body);
  const ctaCopy = splitLeadCopy(cta.body);

  return (
    <main className="marketing-page marketing-page--home">
      <StandardHero
        page={page}
        summary="Applied Leverage turns founder drag into a ranked build order, then ships the operating system behind it."
      />

      <section className="page-band page-band--accent" id={solution.id}>
        <div className="page-band__header">
          <p className="eyebrow">{solution.heading}</p>
          <h2>One offer, two clear steps, and a stronger operating rhythm.</h2>
          <p className="section-intro">
            The site now starts with a real website structure: benefits up front,
            proof in the middle, and a clear path into the offer.
          </p>
        </div>
        <div className="card-grid card-grid--three">
          {page.definition.highlights.map((item, index) => (
            <IconCard
              body={item}
              icon={iconCycle[index % iconCycle.length]}
              key={item}
              title={homeFeatureTitles[index] ?? `Signal ${index + 1}`}
            />
          ))}
        </div>
        <div className="timeline-grid timeline-grid--two">
          {steps.map((step, index) => (
            <article className="surface-card timeline-card" key={step}>
              <span className="timeline-index">Step {index + 1}</span>
              <RichMarkdown className="markdown card-markdown" source={step} />
            </article>
          ))}
        </div>
      </section>

      <section className="page-band page-band--tight" id={proof.id}>
        <div className="page-band__header">
          <p className="eyebrow">{proof.heading}</p>
          <h2>Social proof now reads like a strip, not a footnote.</h2>
        </div>
        <div className="quote-strip">
          {extractQuotes(proof.body).map((quote, index) => (
            <article className="surface-card quote-card" key={quote}>
              <QuoteIcon className="quote-icon" />
              <p>{quote}</p>
              <span>Signal {index + 1}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="page-band" id={problem.id}>
        <div className="page-band__header">
          <p className="eyebrow">{problem.heading}</p>
          <h2>The site now gives the bottleneck a shape prospects can recognize.</h2>
        </div>
        <div className="split-layout">
          <article className="surface-card narrative-card">
            <RichMarkdown className="markdown" source={problem.body} />
          </article>
          <div className="card-grid">
            {problemList.map((item, index) => (
              <IconCard
                body={item}
                icon={iconCycle[(index + 2) % iconCycle.length]}
                key={item}
                title={homeProblemTitles[index] ?? `Pressure point ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="page-band page-band--contrast" id={fit.id}>
        <div className="page-band__header">
          <p className="eyebrow">{fit.heading}</p>
          <h2>Fit is framed as a clear operator profile, not generic audience copy.</h2>
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
      <StandardHero
        page={page}
        summary="This page now reads like a narrative argument with contrast sections, pull signals, and a sharper explanation of why AI projects stall."
      />

      <section className="page-band" id={coreProblem.id}>
        <div className="page-band__header">
          <p className="eyebrow">{coreProblem.heading}</p>
          <h2>The main argument leads with architecture, not tool hype.</h2>
        </div>
        <div className="split-layout split-layout--wide">
          <article className="surface-card narrative-card">
            <RichMarkdown className="markdown" source={coreProblem.body} />
          </article>
          <div className="card-stack">
            <StatCard label="Map before software" value="Order matters" />
            <IconCard
              body="Busywork is visible, but the expensive bottlenecks are usually hidden in delivery, handoffs, and approvals."
              icon={CompassIcon}
              title="Visible work is not the constraint"
            />
            <IconCard
              body="Adding AI to a broken workflow compounds the chaos instead of removing it."
              icon={SignalIcon}
              title="Tools amplify architecture"
            />
          </div>
        </div>
      </section>

      <section className="page-band page-band--contrast" id={reasons.id}>
        <div className="page-band__header">
          <p className="eyebrow">{reasons.heading}</p>
          <h2>Each failure mode is now framed as a card prospects can scan fast.</h2>
        </div>
        {reasonCards.intro ? (
          <article className="surface-card narrative-card">
            <RichMarkdown className="markdown" source={reasonCards.intro} />
          </article>
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

      <section className="page-band" id={whatWorks.id}>
        <div className="page-band__header">
          <p className="eyebrow">{whatWorks.heading}</p>
          <h2>The solution is presented as a sequence: map first, build second.</h2>
        </div>
        <div className="split-layout split-layout--flip">
          <article className="surface-card narrative-card">
            <RichMarkdown className="markdown" source={whatWorks.body} />
          </article>
          <div className="card-stack">
            <StatCard label="Shared pattern" value="Map, then order the build" />
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
          </div>
        </div>
      </section>

      <section className="page-band page-band--accent" id={approach.id}>
        <div className="page-band__header">
          <p className="eyebrow">{approach.heading}</p>
          <h2>Diagnostic and sprint are shown as one path with two entry points.</h2>
        </div>
        <div className="card-grid card-grid--two">
          <article className="surface-card">
            <h3>Clarity first</h3>
            <RichMarkdown className="markdown card-markdown" source={approach.body} />
          </article>
          <article className="surface-card">
            <h3>Then build the stack</h3>
            <div className="card-grid">
              <IconCard
                body="Use the diagnostic when the highest-leverage move is still unclear."
                icon={CompassIcon}
                title="Diagnostic"
              />
              <IconCard
                body="Use the sprint when the map is clear and execution is the bottleneck."
                icon={BuildIcon}
                title="Sprint"
              />
            </div>
          </article>
        </div>
      </section>

      <section className="page-band" id={cost.id}>
        <div className="page-band__header">
          <p className="eyebrow">{cost.heading}</p>
          <h2>The cost of waiting now lands as an economic argument.</h2>
        </div>
        <div className="split-layout">
          <article className="surface-card narrative-card">
            <RichMarkdown className="markdown" source={cost.body} />
          </article>
          <div className="card-stack">
            <StatCard label="Low-end upside" value="5 hours a week" />
            <IconCard
              body="Without leverage, you keep buying growth with your own calendar."
              icon={ClockIcon}
              title="Time is the real tax"
            />
          </div>
        </div>
      </section>

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
      <StandardHero
        page={page}
        summary="The diagnostic page is now an offer page: pricing in the hero, deliverables in cards, timeline steps, and the application form anchored into the narrative."
      />

      <section className="page-band" id={problem.id}>
        <div className="page-band__header">
          <p className="eyebrow">{problem.heading}</p>
          <h2>Start with the real drag, then show exactly what the session removes.</h2>
        </div>
        <div className="split-layout">
          <article className="surface-card narrative-card">
            <RichMarkdown className="markdown" source={problem.body} />
          </article>
          <div className="card-stack">
            <StatCard label="Best fit" value="$5K-$30K / month" />
            <IconCard
              body="You do not need more AI ideas. You need the build order that frees time first."
              icon={CompassIcon}
              title="Prioritization over novelty"
            />
            <IconCard
              body="The output is a ranked automation map you can act on immediately."
              icon={WorkflowIcon}
              title="Tangible deliverable"
            />
          </div>
        </div>
      </section>

      <section className="page-band page-band--accent" id={whatYouGet.id}>
        <div className="page-band__header">
          <p className="eyebrow">{whatYouGet.heading}</p>
          <h2>The offer now shows the deliverable as a product, not just copy.</h2>
        </div>
        <article className="surface-card narrative-card">
          <RichMarkdown className="markdown" source={whatYouGet.body} />
        </article>
        <div className="card-grid card-grid--three">
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

      <section className="page-band" id={format.id}>
        <div className="page-band__header">
          <p className="eyebrow">{format.heading}</p>
          <h2>The call flow is laid out as a timeline with clear expectations.</h2>
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

      <section className="page-band page-band--contrast" id={forSection.id}>
        <div className="page-band__header">
          <p className="eyebrow">Qualification</p>
          <h2>Good-fit and bad-fit signals now sit side by side.</h2>
        </div>
        <div className="card-grid card-grid--two">
          <ChecklistPanel
            icon={CheckIcon}
            items={extractChecklist(forSection.body)}
            title="This is for"
          />
          <ChecklistPanel
            icon={CloseIcon}
            items={extractChecklist(notForSection.body)}
            title="This is not for"
          />
        </div>
      </section>

      <section className="page-band" id={pricing.id}>
        <div className="page-band__header">
          <p className="eyebrow">Offer detail</p>
          <h2>Pricing, credit, and next-step logic are grouped into one decision block.</h2>
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

      <section className="page-band page-band--accent" id={aboutLucas.id}>
        <div className="page-band__header">
          <p className="eyebrow">{aboutLucas.heading}</p>
          <h2>The founder credibility section now reads like proof, not a sidebar.</h2>
        </div>
        <div className="split-layout split-layout--flip">
          <article className="surface-card narrative-card">
            <RichMarkdown className="markdown" source={aboutLucas.body} />
          </article>
          <div className="card-stack">
            <StatCard label="Operating model" value="AI council in production" />
            <IconCard
              body="The same audit logic used on Applied Leverage is the logic used on the client business."
              icon={CouncilIcon}
              title="Internal proof of concept"
            />
          </div>
        </div>
      </section>

      <section className="page-band" id={faq.id}>
        <div className="page-band__header">
          <p className="eyebrow">{faq.heading}</p>
          <h2>Questions are broken into cards so objections can be scanned fast.</h2>
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

      <FormSection
        notes={[
          "Every application is reviewed personally",
          "Accepted operators get payment and booking inside 24 hours",
          "If the fit is wrong, the answer is a direct no"
        ]}
        page={page}
        section={apply}
        title="Application section with trust signals and the form in context."
      />
    </main>
  );
}

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
      <StandardHero
        page={page}
        summary="The sprint page now behaves like an execution offer page: price in the hero, a week-by-week timeline, inclusion cards, and the waitlist embedded where the decision gets made."
      />

      <section className="page-band" id={problem.id}>
        <div className="page-band__header">
          <p className="eyebrow">{problem.heading}</p>
          <h2>The page makes the execution bottleneck explicit before selling the sprint.</h2>
        </div>
        <div className="split-layout">
          <article className="surface-card narrative-card">
            <RichMarkdown className="markdown" source={problem.body} />
          </article>
          <div className="card-stack">
            <StatCard label="Soft launch" value="3 clients per cohort" />
            <IconCard
              body="This is for operators who know what to build but keep getting blocked by scope, setup, or time."
              icon={BuildIcon}
              title="Execution, not discovery"
            />
          </div>
        </div>
      </section>

      <section className="page-band page-band--accent" id={sprintIs.id}>
        <div className="page-band__header">
          <p className="eyebrow">{sprintIs.heading}</p>
          <h2>The core promise is framed around a live stack, not theory.</h2>
        </div>
        <div className="card-grid card-grid--two">
          <article className="surface-card">
            <RichMarkdown className="markdown" source={sprintIs.body} />
          </article>
          <article className="surface-card">
            <h3>What changes in four weeks</h3>
            <div className="card-grid">
              <IconCard
                body="One highest-leverage automation goes live first so momentum shows up immediately."
                icon={ArrowUpIcon}
                title="Week-one movement"
              />
              <IconCard
                body="Every week ends with a real system in the stack, not another planning doc."
                icon={WorkflowIcon}
                title="Live implementation"
              />
            </div>
          </article>
        </div>
      </section>

      <section className="page-band" id={structure.id}>
        <div className="page-band__header">
          <p className="eyebrow">{structure.heading}</p>
          <h2>The weekly structure is now a true timeline instead of one long markdown block.</h2>
        </div>
        {structureCards.intro ? (
          <article className="surface-card narrative-card">
            <RichMarkdown className="markdown" source={structureCards.intro} />
          </article>
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

      <section className="page-band page-band--contrast" id={included.id}>
        <div className="page-band__header">
          <p className="eyebrow">{included.heading}</p>
          <h2>Included items are laid out as deliverable cards, not buried in bullets.</h2>
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

      <section className="page-band" id={forSection.id}>
        <div className="page-band__header">
          <p className="eyebrow">Qualification</p>
          <h2>The right-fit signal is paired against the reasons to start with the diagnostic.</h2>
        </div>
        <div className="card-grid card-grid--two">
          <ChecklistPanel
            icon={CheckIcon}
            items={extractChecklist(forSection.body)}
            title="This sprint fits when"
          />
          <ChecklistPanel
            icon={CloseIcon}
            items={extractChecklist(notForSection.body)}
            title="Start elsewhere when"
          />
        </div>
      </section>

      <section className="page-band page-band--accent" id={pricing.id}>
        <div className="page-band__header">
          <p className="eyebrow">Decision block</p>
          <h2>Pricing, launch status, and what comes next are grouped into one panel.</h2>
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

      <section className="page-band" id={faq.id}>
        <div className="page-band__header">
          <p className="eyebrow">{faq.heading}</p>
          <h2>Common objections are framed as execution questions, not generic FAQ filler.</h2>
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

      <FormSection
        notes={[
          "Waitlist is for the first soft-launch cohort only",
          "Diagnostic clients get priority when spots open",
          "No commitment is required to join the list"
        ]}
        page={page}
        section={waitlist}
        title="Waitlist form paired with cohort and launch-trust signals."
      />
    </main>
  );
}

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
      <StandardHero
        page={page}
        summary="The About page now reads like a founder story and capability proof: personal narrative, council architecture, and a clear statement of who the work is built for."
      />

      <section className="page-band" id={story.id}>
        <div className="page-band__header">
          <p className="eyebrow">{story.heading}</p>
          <h2>The founder story has a real narrative arc and delivery context.</h2>
        </div>
        <div className="split-layout">
          <article className="surface-card narrative-card">
            <RichMarkdown className="markdown" source={story.body} />
          </article>
          <div className="card-stack">
            <StatCard label="Operating principle" value="Judgment stays human" />
            <IconCard
              body="Repeatable work gets redesigned so Lucas only stays inside the decisions that actually require him."
              icon={UserIcon}
              title="Replace the wrong work first"
            />
          </div>
        </div>
      </section>

      <section className="page-band page-band--accent" id={council.id}>
        <div className="page-band__header">
          <p className="eyebrow">{council.heading}</p>
          <h2>The council now appears as a proper capability grid with role clarity.</h2>
        </div>
        <article className="surface-card narrative-card">
          <RichMarkdown className="markdown" source={council.body} />
        </article>
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

      <section className="page-band" id={product.id}>
        <div className="page-band__header">
          <p className="eyebrow">{product.heading}</p>
          <h2>The product rationale is tied back to the operator problem the site solves.</h2>
        </div>
        <div className="split-layout split-layout--flip">
          <article className="surface-card narrative-card">
            <RichMarkdown className="markdown" source={product.body} />
          </article>
          <div className="card-stack">
            <StatCard label="What most operators need" value="Three high-impact automations" />
            <IconCard
              body="The product is scoped to what creates an immediate operating shift instead of recreating the full council."
              icon={CouncilIcon}
              title="Architecture scaled to fit"
            />
          </div>
        </div>
      </section>

      <section className="page-band page-band--contrast" id={who.id}>
        <div className="page-band__header">
          <p className="eyebrow">{who.heading}</p>
          <h2>The ideal client profile is framed with more conviction and less generic copy.</h2>
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

      <section className="page-band" id={connect.id}>
        <div className="page-band__header">
          <p className="eyebrow">{connect.heading}</p>
          <h2>Contact and next-step routes are positioned as the final trust block.</h2>
        </div>
        <div className="card-grid card-grid--two">
          <article className="surface-card">
            <RichMarkdown className="markdown" source={connect.body} />
          </article>
          <article className="surface-card callout-card">
            <h3>Where to start</h3>
            <p>
              If the work is still unclear, start with the diagnostic. If the
              map already exists, the sprint is the execution path.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/apply">
                Apply
              </Link>
              <Link className="button button-secondary" href="/sprint">
                See the Sprint
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

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
      <StandardHero
        page={page}
        summary="The apply page now acts like a decision page: two path cards, stronger trust signals, and both forms presented as the next step instead of a long markdown sheet."
      />

      <section className="page-band page-band--accent" id={paths.id}>
        <div className="page-band__header">
          <p className="eyebrow">{paths.heading}</p>
          <h2>Two clear paths, each framed by the problem it solves.</h2>
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

      <section className="page-band" id={notSure.id}>
        <div className="page-band__header">
          <p className="eyebrow">{notSure.heading}</p>
          <h2>The page now recommends a default path instead of forcing a guess.</h2>
        </div>
        <div className="split-layout">
          <article className="surface-card narrative-card">
            <RichMarkdown className="markdown" source={notSure.body} />
          </article>
          <div className="card-stack">
            <StatCard label="Default recommendation" value="Start with the diagnostic" />
            <IconCard
              body="The sprint only works when the build order is already clear."
              icon={CompassIcon}
              title="Clarity before implementation"
            />
          </div>
        </div>
      </section>

      <FormSection
        notes={[
          "Current offer and revenue range",
          "How delivery works today",
          "Where non-judgment work still depends on you"
        ]}
        page={page}
        section={diagnosticForm}
        title="Diagnostic application with trust signals next to the form."
      />

      <FormSection
        notes={[
          "Whether the diagnostic is already complete",
          "What the operator wants to build first",
          "Why waitlist members get first cohort access"
        ]}
        page={page}
        section={sprintForm}
        title="Sprint waitlist with clearer expectations and commitment framing."
      />

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

function StandardHero({
  page,
  summary
}: {
  page: SitePage;
  summary: string;
}) {
  const primaryAction = page.hero.cta ?? primaryActions[page.slug];
  const secondaryAction = secondaryActions[page.slug];
  const signals = heroSignals[page.slug] ?? page.definition.highlights;

  return (
    <section className={`hero-grid page-hero page-hero--${page.slug}`}>
      <article className="hero-panel hero-copy-panel">
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
      </article>

      <aside className="hero-panel hero-visual-panel">
        <p className="eyebrow eyebrow-accent">
          {page.hero.badge ?? "Operator system design"}
        </p>
        <p className="hero-visual-summary">{summary}</p>
        <div className="hero-diagram" aria-hidden="true">
          {heroSteps[page.slug].map((step) => (
            <span className="hero-diagram-node" key={step}>
              {step}
            </span>
          ))}
        </div>
        <div className="hero-stat-grid">
          {heroStats[page.slug].map((stat) => (
            <StatCard key={stat.label} label={stat.label} value={stat.value} />
          ))}
        </div>
        <ul className="hero-signal-list">
          {signals.map((signal) => (
            <li key={signal}>
              <CheckIcon className="signal-icon" />
              <span>{signal}</span>
            </li>
          ))}
        </ul>
      </aside>
    </section>
  );
}

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
      <div className="page-band__header">
        <p className="eyebrow">{section.heading}</p>
        <h2>{title}</h2>
      </div>
      <div className="form-layout">
        <article className="surface-card narrative-card">
          <RichMarkdown className="markdown" source={section.body} />
          <div className="trust-list">
            {notes.map((note) => (
              <div className="trust-list__item" key={note}>
                <CheckIcon className="signal-icon" />
                <span>{note}</span>
              </div>
            ))}
          </div>
        </article>
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

function ChecklistPanel({
  icon,
  items,
  title
}: {
  icon: IconComponent;
  items: string[];
  title: string;
}) {
  return (
    <article className="surface-card checklist-panel">
      <h3>{title}</h3>
      <div className="check-grid check-grid--nested">
        {items.map((item) => (
          <CheckCard icon={icon} key={item} label={item} title="" />
        ))}
      </div>
    </article>
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

function splitOnRules(markdown: string): string[] {
  return markdown
    .split(/\n-{3,}\n/g)
    .map((part) => normalizeMarkdown(part))
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

function extractQuotes(markdown: string): string[] {
  const quotes: string[] = [];
  let current: string[] = [];

  const pushCurrent = () => {
    if (current.length === 0) {
      return;
    }

    quotes.push(stripMarkdown(current.join(" ").trim()));
    current = [];
  };

  for (const line of markdown.split("\n")) {
    if (line.trim().startsWith(">")) {
      current.push(line.replace(/^>\s?/, "").trim());
      continue;
    }

    if (!line.trim()) {
      pushCurrent();
    }
  }

  pushCurrent();

  return quotes;
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

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg {...svgProps(className)}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4.5l3 1.7" />
    </svg>
  );
}

function CouncilIcon({ className }: { className?: string }) {
  return (
    <svg {...svgProps(className)}>
      <circle cx="6.5" cy="8" r="2.5" />
      <circle cx="17.5" cy="8" r="2.5" />
      <circle cx="12" cy="15.5" r="2.5" />
      <path d="M8.5 9.8 10.4 13" />
      <path d="m15.5 9.8-1.9 3.2" />
      <path d="M9 8h6" />
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

const homeFeatureTitles = [
  "Map the leverage",
  "Install the right order",
  "Build for operator relief"
];

const homeProblemTitles = [
  "Client load keeps stacking",
  "Follow-up lives in your head",
  "Delivery needs your presence",
  "Admin never stops"
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
  "Automation documentation",
  "30-day check-in"
];

const aboutFitTitles = [
  "Agency operators",
  "Consultants with real workload",
  "Businesses with genuine drag"
];
