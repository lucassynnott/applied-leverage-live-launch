import type { Metadata } from "next";
import Link from "next/link";

import { WorkbookCtaLink } from "@/components/workbook-cta-link";

const socialImage = "https://appliedleverage.io/og/blog-index.png";
const workbookCheckoutHref = process.env.NEXT_PUBLIC_WORKBOOK_CHECKOUT_URL?.trim() || "";
const workbookManualRequestHref =
  "mailto:lucas@appliedleverage.io?subject=Automation%20Audit%20Workbook&body=Hey%20Lucas%20%E2%80%94%20send%20me%20the%20current%20link%20for%20The%20Operator%E2%80%99s%20Automation%20Audit.%20I%E2%80%99m%20interested%20in%20the%20%2447%20workbook.";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Operator notes from Applied Leverage on AI automation, bottlenecks, and what to fix before you automate the wrong thing.",
  alternates: {
    canonical: "https://appliedleverage.io/blog"
  },
  openGraph: {
    title: "Applied Leverage Blog",
    description:
      "Operator notes on AI automation, bottlenecks, and commercial systems.",
    url: "https://appliedleverage.io/blog",
    type: "website",
    images: [
      {
        url: socialImage,
        alt: "Applied Leverage Blog"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Applied Leverage Blog",
    description:
      "Operator notes on AI automation, bottlenecks, and commercial systems.",
    images: [socialImage]
  }
};

const articles = [
  {
    slug: "5-signs-ready-for-automation",
    title: "The 5 Signs Your Business Is Ready for AI Automation",
    description:
      "A straight answer on when automation is leverage, when it is a distraction, and what service businesses should automate first.",
    eyebrow: "Automation readiness / article"
  },
  {
    slug: "client-onboarding-automation-for-small-service-businesses",
    title: "Client Onboarding Automation for Small Service Businesses",
    description:
      "How to automate client onboarding in a small service business, agency, or consulting firm — without automating the wrong parts too early.",
    eyebrow: "Workflow bottleneck / article"
  },
  {
    slug: "what-to-automate-first-in-a-small-service-business",
    title: "What to Automate First in a Small Service Business",
    description:
      "A practical guide to what to automate first in a small service business, agency, or consulting firm — and which workflows are a waste of time to automate too early.",
    eyebrow: "Prioritization / article"
  }
] as const;

export default function BlogIndexPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Applied Leverage Blog",
    description:
      "Operator notes from Applied Leverage on AI automation, bottlenecks, and what to fix before you automate the wrong thing.",
    url: "https://appliedleverage.io/blog"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://appliedleverage.io/"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://appliedleverage.io/blog"
      }
    ]
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: articles.length,
    itemListElement: articles.map((article, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://appliedleverage.io/blog/${article.slug}`,
      name: article.title,
      description: article.description
    }))
  };

  return (
    <main className="page-stack">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <section className="hero hero--page">
        <div className="hero-copy">
          <p className="eyebrow">Applied Leverage / Blog</p>
          <h1 className="hero-title">Operator notes, not content sludge.</h1>
          <p className="hero-subheadline">
            The blog is where Applied Leverage explains what to automate, what to ignore, and how to stop
            buying tools before the bottleneck is clear.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/assess">
              Take the Free Assessment
            </Link>
            <WorkbookCtaLink
              className="button button-ghost"
              liveHref={workbookCheckoutHref}
              liveLabel="Buy the workbook — $47"
              manualHref={workbookManualRequestHref}
              manualLabel="Request the workbook"
            />
          </div>
        </div>
      </section>

      <section className="page-band">
        <div className="page-band__inner">
          <div className="page-band__header">
            <p className="eyebrow">Published now</p>
            <h2>Start here</h2>
            <p>
              The blog now has multiple real search-entry pages: a readiness article, a workflow-specific
              onboarding article, and a prioritization article for operators asking what to automate first.
            </p>
          </div>

          <div className="stack-list">
            {articles.map((article) => (
              <article className="narrative-card" key={article.slug}>
                <p className="eyebrow">{article.eyebrow}</p>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <div className="hero-actions">
                  <Link className="button button-primary" href={`/blog/${article.slug}`}>
                    Read article
                  </Link>
                  <WorkbookCtaLink
                    className="button button-ghost"
                    liveHref={workbookCheckoutHref}
                    liveLabel="Buy the workbook — $47"
                    manualHref={workbookManualRequestHref}
                    manualLabel="Request the workbook"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
