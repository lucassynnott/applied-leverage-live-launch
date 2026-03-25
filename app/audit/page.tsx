import type { Metadata } from "next";
import Link from "next/link";

const socialImage = "https://appliedleverage.io/og/audit.png";

export const metadata: Metadata = {
  title: "Bottleneck Audit Call — 90-Minute Business Diagnostic | Applied Leverage",
  description:
    "A paid 90-minute diagnostic session. Walk out with a Founder Dependency Map — a visual breakdown of every place your business breaks without you.",
  alternates: {
    canonical: "https://appliedleverage.io/audit"
  },
  openGraph: {
    title: "Bottleneck Audit Call — 90-Minute Business Diagnostic | Applied Leverage",
    description:
      "A paid 90-minute diagnostic session. Walk out with a Founder Dependency Map — a visual breakdown of every place your business breaks without you.",
    type: "website",
    url: "https://appliedleverage.io/audit",
    images: [{ url: socialImage, alt: "Bottleneck Audit Call" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Bottleneck Audit Call — 90-Minute Business Diagnostic | Applied Leverage",
    description:
      "A paid 90-minute diagnostic session. Walk out with a Founder Dependency Map.",
    images: [socialImage]
  }
};

const stripeLink = "https://buy.stripe.com/fZu8wR0nUd2Zfjwbh52ZO06";

export default function AuditPage() {
  return (
    <main className="marketing-page marketing-page--audit">
      <section className="page-hero">
        <div className="hero-centered">
          <p className="eyebrow">Bottleneck Audit Call</p>
          <h1 className="hero-title">
            Find Every Place You&apos;re the Bottleneck — In 90 Minutes
          </h1>
          <p className="hero-subheadline">
            The Bottleneck Audit Call is a paid 90-minute diagnostic. You walk out with a Founder
            Dependency Map — a visual breakdown of every place your business breaks without you.
          </p>
          <div className="hero-stats-bar">
            <article className="hero-metric">
              <span className="hero-metric__value">$997</span>
              <span className="hero-metric__label">credited toward sprint</span>
            </article>
            <article className="hero-metric">
              <span className="hero-metric__value">90 min</span>
              <span className="hero-metric__label">live diagnostic call</span>
            </article>
            <article className="hero-metric">
              <span className="hero-metric__value">Same day</span>
              <span className="hero-metric__label">PDF delivery</span>
            </article>
          </div>
          <div className="hero-actions">
            <a className="button button-primary" href={stripeLink}>
              Book My Audit Call — $997
            </a>
          </div>
        </div>
      </section>

      <section className="page-band" id="what-you-get">
        <div className="page-band__header">
          <p className="eyebrow">What you get</p>
          <h2>One session. A clear map of every bottleneck with your name on it.</h2>
        </div>
        <div className="card-grid card-grid--two">
          <article className="surface-card icon-card">
            <h3>90-minute 1:1 session via Zoom</h3>
            <p>
              Live diagnostic with Lucas. We go through every function of the business — delivery,
              sales, admin, comms — and find every place it breaks without you.
            </p>
          </article>
          <article className="surface-card icon-card">
            <h3>Founder Dependency Map (PDF same day)</h3>
            <p>
              A visual breakdown of every bottleneck built live during the call. Delivered as a PDF
              the same day so you have something concrete, not just call notes.
            </p>
          </article>
          <article className="surface-card icon-card">
            <h3>Top 3 delegation opportunities</h3>
            <p>
              Ranked and prioritized — not a list of 30 things, but the three moves that will
              actually reduce your load and make the business more transferable.
            </p>
          </article>
          <article className="surface-card icon-card">
            <h3>AI or system recommendation per bottleneck</h3>
            <p>
              Specific recommendations for each of your top 3. What to automate, what to delegate,
              what to eliminate — not generic AI advice.
            </p>
          </article>
        </div>
        <div className="card-grid card-grid--two" style={{ marginTop: "1.5rem" }}>
          <article className="surface-card icon-card">
            <h3>$997 credited toward the sprint</h3>
            <p>
              If the audit surfaces the right problem and you want to fix it properly, the $997
              applies in full to the Implementation Sprint. You don&apos;t pay for diagnosis twice.
            </p>
          </article>
        </div>
      </section>

      <section className="page-band" id="who-its-for">
        <div className="page-band__header">
          <p className="eyebrow">Who it&apos;s for</p>
          <h2>Agency owners and consultants doing $200K–$2M/year who are still the answer to every question.</h2>
        </div>
        <article className="narrative-card markdown">
          <p>
            You&apos;re not in startup mode. The revenue is real. But the business still runs through
            you — every client question, every delivery decision, every fire.
          </p>
          <p>
            That&apos;s not a knowledge problem. It&apos;s a dependency map problem. You haven&apos;t drawn the
            line between what actually requires your judgment and what you&apos;re holding onto out of
            habit, distrust, or inertia.
          </p>
          <p>
            The audit draws that line. Ninety minutes of honest pressure-testing. You leave with a
            map of what&apos;s actually tying you to the business — and what the first moves are to
            change it.
          </p>
        </article>
      </section>

      <section className="page-band page-band--cta" id="book">
        <div className="page-band__header">
          <p className="eyebrow">Ready to find the bottlenecks?</p>
          <h2>One session. Everything on the map. A clear list of what to fix first.</h2>
        </div>
        <div className="split-layout">
          <article className="narrative-card markdown">
            <p>
              The Bottleneck Audit is a working session, not a sales call. You get the Founder
              Dependency Map whether or not you proceed to implementation.
            </p>
            <p>
              If the audit surfaces the right problem and you want to fix it, the $997 applies
              toward the full Implementation Sprint. No awkward upsell. Just a clean decision.
            </p>
          </article>
          <aside className="card-stack">
            <article className="surface-card callout-card">
              <h3>Bottleneck Audit Call</h3>
              <p>
                $997 — credited toward the Implementation Sprint if you proceed. PDF Founder
                Dependency Map delivered same day.
              </p>
              <div className="cta-actions">
                <a className="button button-primary" href={stripeLink}>
                  Book My Audit Call — $997
                </a>
                <Link className="button button-secondary" href="/diagnostic">
                  See the full diagnostic instead
                </Link>
              </div>
            </article>
          </aside>
        </div>
      </section>
    </main>
  );
}
