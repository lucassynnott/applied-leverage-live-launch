import type { Metadata } from "next";

const socialImage = "https://appliedleverage.io/og/ai-ops-weekly.png";

export const metadata: Metadata = {
  title: "AI Ops Weekly — One AI Workflow, Every Week | Applied Leverage",
  description:
    "One complete AI operations playbook to your inbox every Tuesday. One workflow, one tool, one prompt stack — ready to drop into your business. $97/month.",
  alternates: { canonical: "https://appliedleverage.io/ai-ops-weekly" },
  openGraph: {
    title: "AI Ops Weekly | Applied Leverage",
    description: "One complete AI operations playbook to your inbox every Tuesday.",
    type: "website",
    url: "https://appliedleverage.io/ai-ops-weekly",
    images: [{ url: socialImage, alt: "AI Ops Weekly" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Ops Weekly | Applied Leverage",
    description: "One AI workflow, every Tuesday. Tested. Ready to install. $97/month.",
    images: [socialImage]
  }
};

const stripeLink = "https://buy.stripe.com/7sYfZj0nU7IFc7keth2ZO08";

export default function AiOpsWeeklyPage() {
  return (
    <main className="marketing-page marketing-page--ai-ops-weekly">
      <section className="page-hero">
        <div className="hero-centered">
          <p className="eyebrow">AI Ops Weekly</p>
          <h1 className="hero-title">One AI Workflow, Every Week. Tested. Ready to Install.</h1>
          <p className="hero-subheadline">
            AI Ops Weekly delivers one complete AI operations playbook to your inbox every Tuesday
            — one workflow, one tool, one prompt stack, ready to drop into your business.
          </p>
          <div className="hero-stats-bar">
            <article className="hero-metric">
              <span className="hero-metric__value">$97</span>
              <span className="hero-metric__label">per month, cancel anytime</span>
            </article>
            <article className="hero-metric">
              <span className="hero-metric__value">Every</span>
              <span className="hero-metric__label">Tuesday in your inbox</span>
            </article>
            <article className="hero-metric">
              <span className="hero-metric__value">30 min</span>
              <span className="hero-metric__label">or less to set up</span>
            </article>
          </div>
          <div className="hero-actions">
            <a className="button button-primary" href={stripeLink}>
              Start Getting AI Ops Weekly — $97/mo
            </a>
          </div>
        </div>
      </section>

      <section className="page-band" id="what-you-get">
        <div className="page-band__header">
          <p className="eyebrow">What subscribers get</p>
          <h2>Not a newsletter. A working playbook you can install this week.</h2>
        </div>
        <div className="card-grid card-grid--two">
          <article className="surface-card icon-card">
            <h3>One complete workflow breakdown every Tuesday</h3>
            <p>
              Each issue covers one AI workflow end to end — what it does, why it matters, and
              exactly how to set it up. No fluff. No theory without a how-to.
            </p>
          </article>
          <article className="surface-card icon-card">
            <h3>The exact prompt stack used</h3>
            <p>
              Copy-paste prompts tested against the workflow. Not prompting advice — the actual
              prompts that make the system run.
            </p>
          </article>
          <article className="surface-card icon-card">
            <h3>Step-by-step implementation guide</h3>
            <p>
              30 minutes or less to set up. Every issue comes with a numbered guide so you can
              install the workflow without reverse-engineering anything.
            </p>
          </article>
          <article className="surface-card icon-card">
            <h3>Honest tool assessments</h3>
            <p>
              Tool recommendations with real tradeoffs — what they work for, where they break,
              and when to use something cheaper instead.
            </p>
          </article>
          <article className="surface-card icon-card">
            <h3>Full back-catalogue access</h3>
            <p>
              Every workflow published before you joined. Search by category, tool, or use case.
              Start with whatever is most urgent for your business.
            </p>
          </article>
        </div>
      </section>

      <section className="page-band" id="who-its-for">
        <div className="page-band__header">
          <p className="eyebrow">Who it&apos;s for</p>
          <h2>Agency owners and operators who want to actually use AI — not just read about it.</h2>
        </div>
        <article className="narrative-card markdown">
          <p>
            There is no shortage of AI content. There is a massive shortage of AI content that
            tells you the specific workflow, the exact prompt, and how to set it up in under an hour.
          </p>
          <p>
            AI Ops Weekly is built for operators running agencies who want to move AI out of the
            interesting tools category and into actual business operations. One workflow per week.
            Every week. No backlog of tabs you will never read.
          </p>
          <p>
            If you install one workflow a week, you have added 52 operational improvements to your
            business in a year. That compounds.
          </p>
        </article>
      </section>

      <section className="page-band page-band--cta" id="subscribe">
        <div className="page-band__header">
          <p className="eyebrow">Start this Tuesday</p>
          <h2>$97/month. Cancel anytime. One real workflow every week.</h2>
        </div>
        <aside className="card-stack">
          <article className="surface-card callout-card">
            <h3>AI Ops Weekly</h3>
            <p>
              Every Tuesday: one complete workflow, one prompt stack, one implementation guide.
              Full back-catalogue included from day one.
            </p>
            <div className="cta-actions">
              <a className="button button-primary" href={stripeLink}>
                Start Getting AI Ops Weekly — $97/mo
              </a>
            </div>
            <p style={{ marginTop: "1rem", fontSize: "0.875rem", opacity: 0.7 }}>
              Cancel anytime. No contracts.
            </p>
          </article>
        </aside>
      </section>
    </main>
  );
}
