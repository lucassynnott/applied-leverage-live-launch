import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Audit Call Booked | Applied Leverage",
  description: "You're booked. Your Bottleneck Audit Call is confirmed.",
  robots: { index: false }
};

export default function AuditThankYouPage() {
  return (
    <main className="marketing-page">
      <section className="page-hero">
        <div className="hero-centered">
          <p className="eyebrow">You&apos;re booked</p>
          <h1 className="hero-title">Audit Call Confirmed.</h1>
          <p className="hero-subheadline">
            You&apos;ll receive a calendar invite and Zoom link within 24 hours. Come ready to talk
            through how your business actually runs day to day.
          </p>
          <div className="card-grid card-grid--two" style={{ marginTop: "2.5rem" }}>
            <article className="surface-card icon-card">
              <h3>What to prepare</h3>
              <p>
                Think through the last 5 times something went wrong because you weren&apos;t available.
                That&apos;s the map we&apos;re building from.
              </p>
            </article>
            <article className="surface-card icon-card">
              <h3>What happens after</h3>
              <p>
                You&apos;ll receive your Founder Dependency Map PDF the same day. If you want to
                proceed to the Implementation Sprint, the $997 credits in full.
              </p>
            </article>
          </div>
          <div className="hero-actions" style={{ marginTop: "2rem" }}>
            <Link className="button button-secondary" href="/">
              Back to Applied Leverage
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
