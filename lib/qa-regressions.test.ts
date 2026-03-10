import fs from "node:fs";
import path from "node:path";

import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { describe, expect, it } from "vitest";

import { EmbeddedForm } from "@/components/forms";
import { MarketingPage } from "@/components/marketing-page";
import { SiteShell } from "@/components/site-shell";
import { loadPageContent } from "@/lib/site-content";

function renderForm(variant: "diagnostic" | "sprint") {
  return renderToStaticMarkup(createElement(EmbeddedForm, { variant }));
}

function renderShell() {
  return renderToStaticMarkup(
    createElement(
      SiteShell,
      null,
      createElement("div", null, "content")
    )
  );
}

function renderHomePage() {
  return renderToStaticMarkup(
    createElement(MarketingPage, { page: loadPageContent("home") })
  );
}

function countRequiredFields(html: string) {
  return (html.match(/\srequired(?:=\"\")?/g) ?? []).length;
}

describe("embedded forms", () => {
  it("renders the diagnostic form with a submit path and required fields", () => {
    const html = renderForm("diagnostic");

    expect(html).toContain('type="submit"');
    expect(countRequiredFields(html)).toBeGreaterThan(0);
    expect(html).not.toContain("captured locally");
    expect(html).not.toContain("Launch placeholder");
  });

  it("renders the sprint form with a submit path and required fields", () => {
    const html = renderForm("sprint");

    expect(html).toContain('type="submit"');
    expect(countRequiredFields(html)).toBeGreaterThan(0);
    expect(html).not.toContain("captured locally");
    expect(html).not.toContain("Launch placeholder");
  });
});

describe("mobile layout guards", () => {
  it("pins the marketing page grids to a shrinkable single column by default", () => {
    const stylesheet = fs.readFileSync(
      path.resolve(__dirname, "../app/globals.css"),
      "utf8"
    );

    expect(stylesheet).toMatch(
      /\.marketing-page,\s*\n\.hero-grid,\s*\n\.section-grid\s*\{[\s\S]*grid-template-columns:\s*minmax\(0,\s*1fr\);/
    );
  });

  it("renders a dedicated mobile nav toggle and hides the desktop header controls", () => {
    const html = renderShell();
    const stylesheet = fs.readFileSync(
      path.resolve(__dirname, "../app/globals.css"),
      "utf8"
    );

    expect(html).toContain("mobile-nav__toggle");
    expect(stylesheet).toMatch(/\.mobile-nav__panel \{[\s\S]*max-height:\s*0;/);
    expect(stylesheet).toMatch(
      /@media \(max-width: 720px\) \{[\s\S]*\.site-nav--desktop,\s*\n\s*\.header-actions--desktop \{[\s\S]*display:\s*none;/
    );
    expect(stylesheet).toMatch(
      /@media \(max-width: 720px\) \{[\s\S]*\.mobile-nav__toggle \{[\s\S]*display:\s*inline-flex;/
    );
  });
});

describe("contact routing guards", () => {
  it("routes shell contact actions to Lucas's inbox", () => {
    const html = renderShell();

    expect(html).toContain("mailto:lucas@appliedleverage.io");
    expect(html).not.toContain("apply@appliedleverage.io");
  });
});

describe("copy regressions", () => {
  it("renders the revised home hero kicker instead of the leaked design note", () => {
    const html = renderHomePage();

    expect(html).not.toContain("The offer now opens as a command board");
    expect(html).toContain("Map your leverage. Sequence the build.");
  });

  it("removes Goro's flagged internal design-note strings from marketing-page copy", () => {
    const source = fs.readFileSync(
      path.resolve(__dirname, "../components/marketing-page.tsx"),
      "utf8"
    );
    const flaggedPhrases = [
      "The site now starts with a real website structure",
      "Social proof now reads like a strip, not a footnote.",
      "The site now gives the bottleneck a shape prospects can recognize.",
      "Fit is framed as a clear operator profile, not generic audience copy.",
      "The main argument leads with architecture, not tool hype.",
      "Each failure mode is now framed as a card prospects can scan fast.",
      "The solution is presented as a sequence: map first, build second.",
      "Diagnostic and sprint are shown as one path with two entry points.",
      "The cost of waiting now lands as an economic argument.",
      "Start with the real drag, then show exactly what the session removes.",
      "The offer now shows the deliverable as a product, not just copy.",
      "The call flow is laid out as a timeline with clear expectations.",
      "Good-fit and bad-fit signals now sit side by side.",
      "Pricing, credit, and next-step logic are grouped into one decision block.",
      "The founder credibility section now reads like proof, not a sidebar.",
      "Questions are broken into cards so objections can be scanned fast.",
      "Application section with trust signals and the form in context.",
      "The page makes the execution bottleneck explicit before selling the sprint.",
      "The core promise is framed around a live stack, not theory.",
      "The weekly structure is now a true timeline instead of one long markdown block.",
      "Included items are laid out as deliverable cards, not buried in bullets.",
      "The right-fit signal is paired against the reasons to start with the diagnostic.",
      "Pricing, launch status, and what comes next are grouped into one panel.",
      "Common objections are framed as execution questions, not generic FAQ filler.",
      "Waitlist form paired with cohort and launch-trust signals.",
      "The founder story has a real narrative arc and delivery context.",
      "The council now appears as a proper capability grid with role clarity.",
      "The product rationale is tied back to the operator problem the site solves.",
      "The ideal client profile is framed with more conviction and less generic copy.",
      "Contact and next-step routes are positioned as the final trust block.",
      "Two clear paths, each framed by the problem it solves.",
      "The page now recommends a default path instead of forcing a guess.",
      "Diagnostic application with trust signals next to the form.",
      "Sprint waitlist with clearer expectations and commitment framing."
    ];

    flaggedPhrases.forEach((phrase) => {
      expect(source).not.toContain(phrase);
    });
  });
});
