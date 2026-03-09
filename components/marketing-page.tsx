import Link from "next/link";

import { EmbeddedForm } from "@/components/forms";
import { RichMarkdown } from "@/components/rich-markdown";
import type { PageSlug, SitePage } from "@/lib/site-content";

const secondaryActions: Record<PageSlug, { label: string; href: string }> = {
  home: {
    label: "See Both Paths",
    href: "/apply"
  },
  why: {
    label: "Start With the Diagnostic",
    href: "/diagnostic"
  },
  diagnostic: {
    label: "Compare Both Offers",
    href: "/apply"
  },
  sprint: {
    label: "Review the Diagnostic",
    href: "/diagnostic"
  },
  about: {
    label: "Apply to Work Together",
    href: "/apply"
  },
  apply: {
    label: "Read the Diagnostic",
    href: "/diagnostic"
  }
};

export function MarketingPage({ page }: { page: SitePage }) {
  const secondaryAction = secondaryActions[page.slug];

  return (
    <main className="marketing-page">
      <section className="hero-grid">
        <div className="hero-card">
          <p className="eyebrow">{page.definition.eyebrow}</p>
          <h1>{page.hero.headline}</h1>
          {page.hero.subheadline ? (
            <p className="hero-subheadline">{page.hero.subheadline}</p>
          ) : null}
          {page.hero.body ? (
            <RichMarkdown className="markdown hero-body" source={page.hero.body} />
          ) : null}
          <div className="hero-actions">
            {page.hero.cta ? (
              <Link className="button button-primary" href={page.hero.cta.href}>
                {page.hero.cta.label}
              </Link>
            ) : null}
            <Link className="button button-secondary" href={secondaryAction.href}>
              {secondaryAction.label}
            </Link>
          </div>
        </div>
        <aside className="hero-aside">
          <p className="eyebrow">
            {page.hero.badge ?? "Operator-first offer design"}
          </p>
          <p className="aside-summary">{page.definition.summary}</p>
          <ul className="highlight-list">
            {page.definition.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </section>

      <div className="section-grid">
        {page.sections.map((section, index) => {
          const embeddedForm = getEmbeddedForm(page.slug, section.id);

          return (
            <section className="content-section" id={section.id} key={section.id}>
              <div className="section-header">
                <span className="section-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2>{section.heading}</h2>
              </div>
              <RichMarkdown className="markdown section-body" source={section.body} />
              {embeddedForm ? <EmbeddedForm variant={embeddedForm} /> : null}
            </section>
          );
        })}
      </div>

      <section className="bottom-cta">
        <div>
          <p className="eyebrow">What happens next</p>
          <h2>Map the bottleneck. Then remove it.</h2>
          <p>
            Start with the Diagnostic if you need clarity. Move into the Sprint
            if you already know the work and want guidance while it gets built.
          </p>
        </div>
        <div className="hero-actions">
          <Link className="button button-primary" href="/diagnostic">
            Book the Diagnostic
          </Link>
          <Link className="button button-secondary" href="/apply">
            View Both Paths
          </Link>
        </div>
      </section>
    </main>
  );
}

function getEmbeddedForm(
  slug: PageSlug,
  sectionId: string
): "diagnostic" | "sprint" | null {
  if (slug === "diagnostic" && sectionId === "apply") {
    return "diagnostic";
  }

  if (slug === "sprint" && sectionId === "waitlist") {
    return "sprint";
  }

  if (slug === "apply" && sectionId === "diagnostic-form") {
    return "diagnostic";
  }

  if (slug === "apply" && sectionId === "sprint-form") {
    return "sprint";
  }

  return null;
}

