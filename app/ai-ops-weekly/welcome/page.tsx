import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Welcome to AI Ops Weekly | Applied Leverage",
  description: "You're in. Your first issue lands Tuesday.",
  robots: { index: false }
};

export default function AiOpsWeeklyWelcomePage() {
  return (
    <main className="marketing-page">
      <section className="page-hero">
        <div className="hero-centered">
          <p className="eyebrow">You&apos;re in</p>
          <h1 className="hero-title">First Issue Lands Tuesday.</h1>
          <p className="hero-subheadline">
            Welcome to AI Ops Weekly. Every Tuesday you&apos;ll get one complete AI workflow — the
            prompt stack, the setup guide, and honest tool notes. Ready to install in 30 minutes.
          </p>
          <div className="card-grid card-grid--two" style={{ marginTop: "2.5rem" }}>
            <article className="surface-card icon-card">
              <h3>Back-catalogue is yours</h3>
              <p>
                You have access to every issue published so far. Check the welcome email for the
                catalogue link. Start with whatever your business needs most right now.
              </p>
            </article>
            <article className="surface-card icon-card">
              <h3>Tuesday in your inbox</h3>
              <p>
                Add lucas@appliedleverage.io to your contacts so the issue doesn&apos;t end up in
                promotions. It&apos;s a real email, not a broadcast blast.
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
