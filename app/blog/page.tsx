import type { Metadata } from "next";
import Link from "next/link";

const socialImage = "https://appliedleverage.io/og/blog-index.png";

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
  }
] as const;

export default function BlogIndexPage() {
  return (
    <main className="page-stack">
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
            <Link className="button button-ghost" href="/workbook">
              Request the Workbook
            </Link>
          </div>
        </div>
      </section>

      <section className="page-band">
        <div className="page-band__inner">
          <div className="page-band__header">
            <p className="eyebrow">Published now</p>
            <h2>Start here</h2>
            <p>
              One live article so far. Now it has a real index route instead of living as a buried URL only
              the assessment knew about.
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
                  <Link className="button button-ghost" href="/diagnostic">
                    Book the Diagnostic
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
