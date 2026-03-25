import type { Metadata } from "next";
import Link from "next/link";

const socialImage = "https://appliedleverage.io/og/map.png";

export const metadata: Metadata = {
  title: "Founder Dependency Map — Find Where You're Holding Your Business Hostage | Applied Leverage",
  description:
    "A $97 self-guided worksheet that shows agency owners exactly where the business breaks without them — and what to fix first.",
  alternates: {
    canonical: "https://appliedleverage.io/map"
  },
  openGraph: {
    title: "Founder Dependency Map | Applied Leverage",
    description:
      "A $97 self-guided worksheet that shows agency owners exactly where the business breaks without them — and what to fix first.",
    type: "website",
    url: "https://appliedleverage.io/map",
    images: [{ url: socialImage, alt: "Founder Dependency Map" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Founder Dependency Map | Applied Leverage",
    description: "A $97 self-guided worksheet. Find every place your business breaks without you.",
    images: [socialImage]
  }
};

const stripeLink = "https://buy.stripe.com/28E00l4Ea9QN9Zc70P2ZO07";

export default function MapPage() {
  return (
    <main className="marketing-page marketing-page--map">
      <section className="page-hero">
        <div className="hero-centered">
          <p className="eyebrow">Founder Dependency Map</p>
          <h1 className="hero-title">Map Every Place You&apos;re Holding Your Business Hostage</h1>
          <p className="hero-subheadline">
            The Founder Dependency Map is a self-guided worksheet that shows agency owners exactly
            where the business breaks without them — and what to fix first.
          </p>
          <div className="hero-stats-bar">
            <article className="hero-metric">
              <span className="hero-metric__value">$97</span>
              <span className="hero-metric__label">one-time, instant delivery</span>
            </article>
            <article className="hero-metric">
              <span className="hero-metric__value">12</span>
              <span className="hero-metric__label">bottleneck categories</span>
            </article>
            <article className="hero-metric">
              <span className="hero-metric__value">0–100</span>
              <span className="hero-metric__label">dependency score</span>
            </article>
          </div>
          <div className="hero-actions">
            <a className="button button-primary" href={stripeLink}>
              Get the Map — $97
            </a>
          </div>
        </div>
      </section>

      <section className="page-band" id="what-you-get">
        <div className="page-band__header">
          <p className="eyebrow">What you get</p>
          <h2>A complete picture of founder dependency — scored, prioritized, and ready to act on.</h2>
        </div>
        <div className="card-grid card-grid--two">
          <article className="surface-card icon-card">
            <h3>Complete Founder Dependency Map worksheet (PDF)</h3>
            <p>
              The full self-guided worksheet, available for instant download. Work through it
              yourself and get a clear picture of where the business is founder-dependent.
            </p>
          </article>
          <article className="surface-card icon-card">
            <h3>0–100 Founder Dependency Score</h3>
            <p>
              A scoring rubric that translates your answers into a single number. Know exactly how
              dependent your business is on you — and where it ranks on the spectrum.
            </p>
          </article>
          <article className="surface-card icon-card">
            <h3>12 bottleneck categories with diagnostic questions</h3>
            <p>
              Covers delivery, client comms, sales, hiring, finance, systems, and six more areas
              where founders quietly become the answer to every question.
            </p>
          </article>
          <article className="surface-card icon-card">
            <h3>Prioritization matrix</h3>
            <p>
              A decision framework for what to delegate, automate, or eliminate — so you leave
              with a ranked shortlist, not a wall of yellow sticky notes.
            </p>
          </article>
          <article className="surface-card icon-card">
            <h3>Short walkthrough video</h3>
            <p>
              A founder walkthrough showing how to use the map, what the scores mean, and how to
              translate your results into a first move.
            </p>
          </article>
        </div>
      </section>

      <section className="page-band" id="who-its-for">
        <div className="page-band__header">
          <p className="eyebrow">Who it&apos;s for</p>
          <h2>The agency owner who knows they&apos;re the bottleneck — but hasn&apos;t mapped it yet.</h2>
        </div>
        <article className="narrative-card markdown">
          <p>
            You&apos;ve thought about it. The business doesn&apos;t really run without you — and somewhere in
            the back of your head, you know that&apos;s a problem.
          </p>
          <p>
            But &quot;too founder-dependent&quot; is still vague. You haven&apos;t put names on the specific
            functions, decisions, and relationships that require you specifically. You haven&apos;t
            scored the damage.
          </p>
          <p>
            The map fixes that. Work through 12 categories, score each one, leave with a clear
            picture of where you&apos;re genuinely needed versus where you&apos;re just in the way.
          </p>
        </article>
      </section>

      <section className="page-band" id="next-step">
        <div className="page-band__header">
          <p className="eyebrow">What comes next</p>
          <h2>The map tells you where. The audit tells you what to do about it.</h2>
        </div>
        <div className="comparison-table">
          <div className="comparison-col comparison-col--for">
            <div className="comparison-col__header">
              <h3>Start with the map if…</h3>
            </div>
            <ul className="comparison-col__list">
              <li><span>You want to self-diagnose before booking a call.</span></li>
              <li><span>You need a concrete score to understand the scope.</span></li>
              <li><span>You want the framework at a lower entry price.</span></li>
              <li><span>You prefer working through it independently first.</span></li>
            </ul>
          </div>
          <div className="comparison-divider" />
          <div className="comparison-col comparison-col--not">
            <div className="comparison-col__header">
              <h3>Go straight to the audit if…</h3>
            </div>
            <ul className="comparison-col__list">
              <li><span>You already know the bottlenecks are real.</span></li>
              <li><span>You want expert eyes on the specific problem.</span></li>
              <li><span>You want prioritized recommendations, not just a framework.</span></li>
              <li><span>You&apos;re close to being ready to fix it properly.</span></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="page-band page-band--cta" id="get">
        <div className="page-band__header">
          <p className="eyebrow">Get the map</p>
          <h2>$97 one-time. Instant delivery. The clearest picture of founder dependency you&apos;ll ever draw.</h2>
        </div>
        <aside className="card-stack">
          <article className="surface-card callout-card">
            <h3>Founder Dependency Map</h3>
            <p>
              PDF worksheet + scoring rubric + prioritization matrix + walkthrough video. Instant
              download after purchase.
            </p>
            <div className="cta-actions">
              <a className="button button-primary" href={stripeLink}>
                Get the Map — $97
              </a>
              <Link className="button button-secondary" href="/audit">
                Want a live audit instead?
              </Link>
            </div>
          </article>
        </aside>
      </section>
    </main>
  );
}
