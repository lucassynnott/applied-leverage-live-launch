import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Operator's Automation Audit | Applied Leverage",
  description:
    "A self-guided 90-minute workbook for operators who want to find their top automation opportunities before booking live help.",
  alternates: {
    canonical: "https://appliedleverage.io/workbook"
  },
  openGraph: {
    title: "The Operator's Automation Audit",
    description:
      "A self-guided 90-minute workbook for operators who want to find their top automation opportunities before booking live help.",
    type: "website",
    url: "https://appliedleverage.io/workbook"
  },
  twitter: {
    card: "summary_large_image",
    title: "The Operator's Automation Audit",
    description:
      "A self-guided 90-minute workbook for operators who want to find their top automation opportunities before booking live help."
  }
};

const manualWorkbookRequestHref =
  "mailto:lucas@appliedleverage.io?subject=Automation%20Audit%20Workbook&body=Hey%20Lucas%20%E2%80%94%20send%20me%20the%20current%20link%20for%20The%20Operator%E2%80%99s%20Automation%20Audit.%20I%E2%80%99m%20interested%20in%20the%20%2447%20workbook.";

const workbookCheckoutHref = process.env.NEXT_PUBLIC_WORKBOOK_CHECKOUT_URL?.trim() || "";
const workbookPrimaryHref = workbookCheckoutHref || manualWorkbookRequestHref;
const workbookPrimaryLabel = workbookCheckoutHref ? "Get the workbook" : "Request the workbook";
const workbookSupportNote = workbookCheckoutHref
  ? "Instant checkout is live. Start self-guided, then step up to the Diagnostic if you want expert judgment."
  : "Manual delivery stays in place until the direct checkout goes live.";

export default function WorkbookPage() {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    brand: {
      "@type": "Brand",
      name: "Applied Leverage"
    },
    category: "Business workflow workbook",
    description:
      "A self-guided 90-minute workbook for operators who want to find their top automation opportunities before booking live help.",
    name: "The Operator's Automation Audit",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      price: "47",
      priceCurrency: "USD",
      url: "https://appliedleverage.io/workbook"
    },
    url: "https://appliedleverage.io/workbook"
  };

  return (
    <main className="marketing-page marketing-page--workbook">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <section className="page-hero workbook-hero">
        <div className="hero-centered">
          <p className="eyebrow">Self-guided audit</p>
          <h1 className="hero-title">Find your top 3 automation opportunities in 90 minutes.</h1>
          <p className="hero-subheadline">
            The Operator&apos;s Automation Audit is the low-friction entry point for operators who
            want clarity before they book live help.
          </p>
          <div className="hero-stats-bar">
            <article className="hero-metric">
              <span className="hero-metric__value">$47</span>
              <span className="hero-metric__label">self-guided workbook</span>
            </article>
            <article className="hero-metric">
              <span className="hero-metric__value">90 min</span>
              <span className="hero-metric__label">to complete the audit</span>
            </article>
            <article className="hero-metric">
              <span className="hero-metric__value">Top 3</span>
              <span className="hero-metric__label">priorities ranked by ROI</span>
            </article>
          </div>
          <div className="hero-actions">
            <a className="button button-primary" href={workbookPrimaryHref}>
              {workbookPrimaryLabel}
            </a>
            <Link className="button button-secondary" href="/diagnostic">
              Need expert judgment instead?
            </Link>
          </div>
          <p className="hero-supporting-note">{workbookSupportNote}</p>
        </div>
      </section>

      <section className="page-band" id="what-it-is">
        <div className="page-band__header">
          <p className="eyebrow">What it is</p>
          <h2>Stop buying tools before you know what deserves automation.</h2>
        </div>
        <article className="narrative-card markdown">
          <p>
            Most operators do the stupid thing first: they buy software before they know where
            their actual drag lives.
          </p>
          <p>
            This workbook fixes that. You audit delivery, sales follow-up, admin overhead, and the
            recurring founder bottlenecks that keep eating your week. Then you score the
            opportunities and leave with a 1-page Automation Priority Map.
          </p>
          <p>
            No generic AI hype. No random stack recommendations. Just a cleaner answer on what to
            automate first.
          </p>
        </article>
      </section>

      <section className="page-band" id="whats-inside">
        <div className="page-band__header">
          <p className="eyebrow">What&apos;s inside</p>
          <h2>The audit covers the parts of the business most people keep hand-waving.</h2>
        </div>
        <div className="card-grid card-grid--two">
          <article className="surface-card icon-card">
            <h3>Delivery audit</h3>
            <p>Map every step from payment received to result delivered. Find the repeatable work still hiding inside delivery.</p>
          </article>
          <article className="surface-card icon-card">
            <h3>Sales + follow-up audit</h3>
            <p>Trace the path from first contact to paid client so money leaks stop masquerading as &ldquo;just how it works.&rdquo;</p>
          </article>
          <article className="surface-card icon-card">
            <h3>Admin overhead audit</h3>
            <p>Add up the invisible tax: reporting, chasing, updating, packaging, and all the recurring junk that should already be systemized.</p>
          </article>
          <article className="surface-card icon-card">
            <h3>Priority Map synthesis</h3>
            <p>Rank the real opportunities by ROI and effort so you leave with a top 3, not a graveyard of 27 ideas.</p>
          </article>
        </div>
      </section>

      <section className="page-band" id="fit">
        <div className="page-band__header">
          <p className="eyebrow">Workbook or diagnostic?</p>
          <h2>Choose structure if you want to think it through yourself. Choose judgment if you want the sharper answer faster.</h2>
        </div>
        <div className="comparison-table">
          <div className="comparison-col comparison-col--for">
            <div className="comparison-col__header">
              <h3>Start with the workbook if…</h3>
            </div>
            <ul className="comparison-col__list">
              <li><span>You want a lower-cost first step.</span></li>
              <li><span>You&apos;re willing to do the thinking honestly.</span></li>
              <li><span>You want to rank your own opportunities before booking a call.</span></li>
              <li><span>You need clarity, not implementation yet.</span></li>
            </ul>
          </div>
          <div className="comparison-divider" />
          <div className="comparison-col comparison-col--not">
            <div className="comparison-col__header">
              <h3>Go straight to the diagnostic if…</h3>
            </div>
            <ul className="comparison-col__list">
              <li><span>You already know the drag is real and want expert prioritization fast.</span></li>
              <li><span>You don&apos;t want to waste time guessing wrong.</span></li>
              <li><span>You want live pressure-testing of the workflow, not just a solo framework.</span></li>
              <li><span>You&apos;re probably one decision away from implementation.</span></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="page-band" id="request">
        <div className="page-band__header">
          <p className="eyebrow">Start with the self-guided path</p>
          <h2>Choose the workbook when you want clarity first without jumping straight into live help.</h2>
        </div>
        <div className="split-layout">
          <article className="narrative-card markdown">
            <p>
              If you want to work through the audit yourself before bringing in outside help, this
              is the cleanest first move.
            </p>
            <p>
              The workbook gives you the same decision structure behind the diagnostic — just in a
              self-guided format. You audit the business, rank the opportunities, and leave with a
              Priority Map instead of more tool noise.
            </p>
            <p>
              If you already know you want expert judgment, skip the self-guided route and go
              straight to the Diagnostic.
            </p>
          </article>
          <aside className="card-stack">
            <article className="surface-card callout-card">
              <h3>Two clean next moves</h3>
              <p>Want the self-guided audit? Request the workbook. Want expert judgment? Book the diagnostic.</p>
              <div className="cta-actions">
                <a className="button button-primary" href={workbookPrimaryHref}>
                  {workbookPrimaryLabel}
                </a>
                <Link className="button button-secondary" href="/diagnostic">
                  Book the diagnostic
                </Link>
              </div>
              <p>{workbookSupportNote}</p>
            </article>
          </aside>
        </div>
      </section>
    </main>
  );
}
