import { readFileSync } from "node:fs";
import path from "node:path";

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { RichMarkdown } from "@/components/rich-markdown";
import { WorkbookCtaLink } from "@/components/workbook-cta-link";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const articles = {
  "5-signs-ready-for-automation": {
    title: "The 5 Signs Your Business Is Ready for AI Automation",
    description:
      "A straight answer on when automation is leverage, when it is a distraction, and what service businesses should automate first.",
    publishedTime: "2026-03-12T00:00:00Z",
    authorName: "Lucas Synnott",
    ogImage: "https://appliedleverage.io/og/5-signs-ready-for-automation.png",
    heroSubheadline:
      "When automation is leverage, when it is a distraction, and what to fix before you try to automate the wrong thing.",
    introEyebrow: "Read time / operator memo",
    introTitle: "The article the assessment already points to",
    introDescription:
      "The site was already referencing this piece. Now it actually exists on a real route instead of dying as an orphaned promise.",
    faqEyebrow: "FAQ / automation readiness",
    faqTitle: "Questions operators usually ask before they automate",
    faqDescription:
      "Straight answers for service businesses trying to figure out whether they need better systems, better positioning, or actual automation.",
    nextStepDescription:
      "If the article made the drag clearer but you do not need live judgment yet, the workbook is the clean self-guided next step. If the bottleneck is obvious and you want expert prioritization fast, apply for the diagnostic.",
    filePath: path.join(
      process.cwd(),
      "..",
      "ventures",
      "active",
      "content",
      "blog-5-signs-ready-for-automation.md"
    ),
    faq: [
      {
        question: "What is AI automation for a small business?",
        answer:
          "AI automation for a small business means using systems, workflows, and agents to handle repeatable operational work such as follow-up, reporting, onboarding, admin, and internal handoffs. It is not about replacing judgment. It is about removing recurring manual execution."
      },
      {
        question: "When is a business ready for automation?",
        answer:
          "A business is usually ready for automation when it has recurring work, a repeatable offer, clear bottlenecks, and enough delivery volume that founder time is becoming the constraint. If every engagement is completely custom and the offer is still changing, it is too early."
      },
      {
        question: "What should you automate first?",
        answer:
          "Start with repeatable tasks that happen every week, consume real time, and follow a clear sequence. Good first targets are onboarding, follow-up, reporting, status updates, invoice reminders, and data handoffs between tools."
      },
      {
        question: "Can agencies and consultants benefit from AI automation?",
        answer:
          "Yes — especially when delivery, reporting, or client communication depends too heavily on the founder. Agencies and consultants usually benefit first from automating recurring operations, not strategy."
      },
      {
        question: "Is AI automation worth it for a service business?",
        answer:
          "It is worth it when the business already has real operational drag. If the core problem is lack of clients, automation is not the fix. If the core problem is too much recurring manual work, it usually is."
      }
    ]
  },
  "client-onboarding-automation-for-small-service-businesses": {
    title: "Client Onboarding Automation for Small Service Businesses",
    description:
      "How to automate client onboarding in a small service business, agency, or consulting firm — without automating the wrong parts too early.",
    publishedTime: "2026-03-13T13:00:00Z",
    authorName: "Lucas Synnott",
    ogImage:
      "https://appliedleverage.io/og/client-onboarding-automation-for-small-service-businesses.png",
    heroSubheadline:
      "How to automate the repeatable parts of client onboarding without turning the whole experience into brittle process sludge.",
    introEyebrow: "Read time / workflow bottleneck",
    introTitle: "A practical article built for workflow-intent search",
    introDescription:
      "This one goes after a real operator pain point instead of another generic AI-thought-leadership blob: messy onboarding that keeps making delivery feel heavier than it should.",
    faqEyebrow: "FAQ / client onboarding automation",
    faqTitle: "Questions operators ask when onboarding starts breaking",
    faqDescription:
      "Straight answers on what to automate first, what to leave human, and how to avoid automating a vague process into a faster mess.",
    nextStepDescription:
      "If onboarding is obviously dragging but you still need a readiness signal, start with the assessment. If you want the self-serve version, work through the workbook. If you want expert prioritization on what to automate first, apply for the diagnostic.",
    filePath: path.join(
      process.cwd(),
      "..",
      "ventures",
      "active",
      "content",
      "client-onboarding-automation-for-small-service-businesses.md"
    ),
    faq: [
      {
        question: "What is client onboarding automation?",
        answer:
          "Client onboarding automation is the use of systems and workflows to handle repeatable onboarding steps such as welcome emails, intake forms, scheduling, task creation, and internal handoffs."
      },
      {
        question: "What parts of onboarding should be automated first?",
        answer:
          "Automate the recurring, predictable steps first: communication, form dispatch, reminders, scheduling, workspace setup, and project handoffs."
      },
      {
        question: "What should you not automate in onboarding?",
        answer:
          "Do not automate strategic judgment, custom scoping, undefined exceptions, or relationship moments that still benefit from direct human handling."
      },
      {
        question: "Is onboarding a good first automation for agencies and consultants?",
        answer:
          "Usually yes. It is one of the cleanest early automation targets because it is frequent, repeatable, and expensive when it breaks."
      }
    ]
  },
  "what-to-automate-first-in-a-small-service-business": {
    title: "What to Automate First in a Small Service Business",
    description:
      "A practical guide to what to automate first in a small service business, agency, or consulting firm — and which workflows are a waste of time to automate too early.",
    publishedTime: "2026-03-13T14:08:00Z",
    authorName: "Lucas Synnott",
    ogImage:
      "https://appliedleverage.io/og/what-to-automate-first-in-a-small-service-business.png",
    heroSubheadline:
      "How to choose the first automation that actually removes operational drag instead of building another AI science project.",
    introEyebrow: "Read time / prioritization",
    introTitle: "A buyer-intent article for operators asking the right question",
    introDescription:
      "This one targets the practical search intent sitting between vague automation curiosity and a paid audit: what should actually get automated first when the business is already carrying repeatable drag.",
    faqEyebrow: "FAQ / what to automate first",
    faqTitle: "Questions operators ask before they automate the wrong thing",
    faqDescription:
      "Straight answers on the first workflows worth automating, the traps to avoid, and how to tell whether a process is ready for automation at all.",
    nextStepDescription:
      "If this clarified the likely bottleneck but you still need a reality check, start with the assessment. If you want to work the audit yourself, use the workbook. If you want expert prioritization on what to automate first, apply for the diagnostic.",
    filePath: path.join(
      process.cwd(),
      "..",
      "ventures",
      "active",
      "content",
      "what-to-automate-first-in-a-small-service-business.md"
    ),
    faq: [
      {
        question: "What should a small service business automate first?",
        answer:
          "Usually the first automation should target repeatable operational drag such as lead follow-up, client onboarding, reporting, invoice reminders, and tool handoffs."
      },
      {
        question: "What should you not automate first?",
        answer:
          "Do not start with strategy, undefined workflows, custom delivery, or sales messaging that is still changing every week."
      },
      {
        question: "How do you know if a workflow is worth automating?",
        answer:
          "Look for work that is frequent, time-consuming, error-prone, founder-dependent, and already follows a rough sequence."
      },
      {
        question: "Is lead follow-up or onboarding usually the better first move?",
        answer:
          "Often yes. Both are high-leverage early targets because they are repeatable, commercially important, and expensive when they break."
      }
    ]
  }
} as const;

type ArticleSlug = keyof typeof articles;

const workbookCheckoutHref = process.env.NEXT_PUBLIC_WORKBOOK_CHECKOUT_URL?.trim() || "";
const workbookManualRequestHref =
  "mailto:lucas@appliedleverage.io?subject=Automation%20Audit%20Workbook&body=Hey%20Lucas%20%E2%80%94%20send%20me%20the%20current%20link%20for%20The%20Operator%E2%80%99s%20Automation%20Audit.%20I%E2%80%99m%20interested%20in%20the%20%2447%20workbook.";

function formatPublishedDate(isoDate: string) {
  return new Intl.DateTimeFormat("en-IE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC"
  }).format(new Date(isoDate));
}

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  if (!(slug in articles)) {
    return {};
  }

  const article = articles[slug as ArticleSlug];
  const url = `https://appliedleverage.io/blog/${slug}`;

  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: url
    },
    openGraph: {
      title: article.title,
      description: article.description,
      url,
      type: "article",
      publishedTime: article.publishedTime,
      authors: [article.authorName],
      images: [
        {
          url: article.ogImage,
          alt: article.title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [article.ogImage]
    }
  };
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;

  if (!(slug in articles)) {
    notFound();
  }

  const article = articles[slug as ArticleSlug];
  const publishedLabel = formatPublishedDate(article.publishedTime);
  const rawMarkdown = readFileSync(article.filePath, "utf8").replace(/\r\n/g, "\n");
  const body = rawMarkdown
    .replace(/^#\s+.*$/m, "")
    .replace(/^\*By .*\*\s*$/m, "")
    .trim();

  const articleUrl = `https://appliedleverage.io/blog/${slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: [article.ogImage],
    datePublished: article.publishedTime,
    dateModified: article.publishedTime,
    author: {
      "@type": "Person",
      name: article.authorName
    },
    publisher: {
      "@type": "Organization",
      name: "Applied Leverage",
      url: "https://appliedleverage.io"
    },
    mainEntityOfPage: articleUrl,
    url: articleUrl
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
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
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: articleUrl
      }
    ]
  };

  return (
    <main className="page-stack">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="hero hero--page">
        <div className="hero-copy">
          <p className="eyebrow">Applied Leverage / Article</p>
          <h1 className="hero-title">{article.title}</h1>
          <p className="hero-subheadline">{article.heroSubheadline}</p>
          <p className="article-meta">By {article.authorName} · Published {publishedLabel}</p>
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
            <p className="eyebrow">{article.introEyebrow}</p>
            <h2>{article.introTitle}</h2>
            <p>{article.introDescription}</p>
          </div>
          <article className="narrative-card markdown">
            <RichMarkdown source={body} />
          </article>
        </div>
      </section>

      <section className="page-band page-band--muted">
        <div className="page-band__inner">
          <div className="page-band__header">
            <p className="eyebrow">{article.faqEyebrow}</p>
            <h2>{article.faqTitle}</h2>
            <p>{article.faqDescription}</p>
          </div>
          <div className="feature-grid">
            {article.faq.map((item) => (
              <article key={item.question} className="feature-card">
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-band">
        <div className="page-band__inner">
          <div className="page-band__header">
            <p className="eyebrow">Next step / don&apos;t overbuy</p>
            <h2>Readiness signal first. Then the right depth of help.</h2>
            <p>{article.nextStepDescription}</p>
          </div>
          <div className="hero-actions">
            <WorkbookCtaLink
              className="button button-primary"
              liveHref={workbookCheckoutHref}
              liveLabel="Buy the workbook — $47"
              manualHref={workbookManualRequestHref}
              manualLabel="Request the workbook"
            />
            <Link className="button button-secondary" href="/diagnostic">
              Apply for the Diagnostic
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
