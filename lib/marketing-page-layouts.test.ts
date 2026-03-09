import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { MarketingPage } from "@/components/marketing-page";
import { loadPageContent, type PageSlug } from "@/lib/site-content";

const heroClassBySlug: Record<PageSlug, string> = {
  home: "home-hero",
  why: "why-hero",
  diagnostic: "diagnostic-hero",
  sprint: "sprint-hero",
  about: "about-hero",
  apply: "apply-hero"
};

function renderPage(slug: PageSlug) {
  return renderToStaticMarkup(
    createElement(MarketingPage, { page: loadPageContent(slug) })
  );
}

describe("marketing page layout variants", () => {
  for (const [slug, heroClass] of Object.entries(heroClassBySlug)) {
    it(`renders a dedicated hero treatment for ${slug}`, () => {
      const html = renderPage(slug as PageSlug);

      expect(html).toMatch(new RegExp(`class="[^"]*${heroClass}[^"]*"`));
      expect((html.match(/<svg\b/g) ?? []).length).toBeGreaterThan(2);
    });
  }

  it("keeps the apply page free of placeholder intake copy and points to Lucas's inbox", () => {
    const html = renderPage("apply");

    expect(html).toContain("lucas@appliedleverage.io");
    expect(html).not.toContain("placeholder form");
    expect(html).not.toContain("apply@appliedleverage.io");
  });
});
