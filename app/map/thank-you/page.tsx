import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Founder Dependency Map — Download Ready | Applied Leverage",
  description: "Your Founder Dependency Map is on its way.",
  robots: { index: false }
};

export default function MapThankYouPage() {
  return (
    <main className="marketing-page">
      <section className="page-hero">
        <div className="hero-centered">
          <p className="eyebrow">Purchase complete</p>
          <h1 className="hero-title">Your Map Is on Its Way.</h1>
          <p className="hero-subheadline">
            Check your inbox — the Founder Dependency Map PDF and walkthrough video link will
            arrive within a few minutes.
          </p>
          <div className="card-grid card-grid--two" style={{ marginTop: "2.5rem" }}>
            <article className="surface-card icon-card">
              <h3>Work through it honestly</h3>
              <p>
                The map only works if you answer the diagnostic questions without rationalizing.
                If something makes you uncomfortable, that&apos;s the point.
              </p>
            </article>
            <article className="surface-card icon-card">
              <h3>Want a live audit after?</h3>
              <p>
                If the map surfaces real bottlenecks and you want expert help prioritizing them,
                the Bottleneck Audit Call is the next step.
              </p>
            </article>
          </div>
          <div className="hero-actions" style={{ marginTop: "2rem" }}>
            <Link className="button button-primary" href="/audit">
              Learn about the Audit Call
            </Link>
            <Link className="button button-secondary" href="/">
              Back to Applied Leverage
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
