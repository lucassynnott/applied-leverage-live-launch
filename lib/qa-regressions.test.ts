import fs from "node:fs";
import path from "node:path";

import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { describe, expect, it } from "vitest";

import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
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

  it("keeps the low-friction assessment route in the main shell navigation", () => {
    const html = renderShell();

    expect(html).toContain('href="/assess"');
    expect(html).toContain('>Assessment<');
    expect(html).toContain('href="/workbook"');
    expect(html).toContain('>Start here<');
    expect(html).not.toContain('>Email<');
  });

  it("keeps the pitch PDF contact block on the .io domain", () => {
    const pdfSource = fs.readFileSync(
      path.resolve(__dirname, "../pitch-pdf.html"),
      "utf8"
    );

    expect(pdfSource).toContain("lucas@appliedleverage.io");
    expect(pdfSource).toContain("appliedleverage.io");
    expect(pdfSource).not.toContain("lucas@appliedleverage.com");
    expect(pdfSource).not.toContain(">appliedleverage.com<");
  });

  it("keeps the pitch PDF sprint CTA honest about waitlist state", () => {
    const pdfSource = fs.readFileSync(
      path.resolve(__dirname, "../pitch-pdf.html"),
      "utf8"
    );
    const fullPdfSource = fs.readFileSync(
      path.resolve(__dirname, "../pitch-pdf-full.html"),
      "utf8"
    );
    const staticSprintSource = fs.readFileSync(
      path.resolve(__dirname, "../index.html"),
      "utf8"
    );

    expect(pdfSource).toContain("Join the Implementation Sprint waitlist");
    expect(pdfSource).not.toContain("Book the Implementation Sprint");
    expect(fullPdfSource).toContain("Join the Implementation Sprint waitlist");
    expect(fullPdfSource).not.toContain("Book the Implementation Sprint");
    expect(staticSprintSource).toContain("Join the waitlist");
    expect(staticSprintSource).not.toContain("Book the sprint");
    expect(staticSprintSource).toContain("Email Lucas to join the waitlist");
    expect(staticSprintSource).not.toContain("Email Lucas to book");
    expect(staticSprintSource).toContain("If the fit is right, Lucas will place you in the next cohort.");
  });
});

describe("publish-layer guards", () => {
  it("keeps robots pointed at the live domain sitemap", () => {
    expect(robots()).toEqual({
      rules: {
        userAgent: "*",
        allow: "/"
      },
      sitemap: "https://appliedleverage.io/sitemap.xml",
      host: "https://appliedleverage.io"
    });
  });

  it("keeps the sitemap advertising the live offer ladder and current blog routes", () => {
    const entries = sitemap();
    const urls = entries.map((entry) => entry.url);

    expect(urls).toEqual([
      "https://appliedleverage.io",
      "https://appliedleverage.io/why",
      "https://appliedleverage.io/assess",
      "https://appliedleverage.io/diagnostic",
      "https://appliedleverage.io/sprint",
      "https://appliedleverage.io/about",
      "https://appliedleverage.io/apply",
      "https://appliedleverage.io/workbook",
      "https://appliedleverage.io/blog",
      "https://appliedleverage.io/blog/5-signs-ready-for-automation",
      "https://appliedleverage.io/blog/client-onboarding-automation-for-small-service-businesses",
      "https://appliedleverage.io/blog/what-to-automate-first-in-a-small-service-business"
    ]);
  });
});

describe("copy regressions", () => {
  it("renders the revised home hero kicker instead of the leaked design note", () => {
    const html = renderHomePage();

    expect(html).not.toContain("The offer now opens as a command board");
    expect(html).toContain("Map your leverage. Sequence the build.");
  });

  it("keeps workbook CTA wording commercially consistent on the home page", () => {
    const html = renderHomePage();

    expect(html).toContain("Request the workbook");
    expect(html).not.toContain("Get the workbook");
    expect(html).not.toContain("View the workbook");
  });

  it("keeps workbook CTAs honest across static assessment and diagnostic pages in manual mode", () => {
    const assessHtml = fs.readFileSync(
      path.resolve(__dirname, "../public/assess/index.html"),
      "utf8"
    );
    const diagnosticHtml = fs.readFileSync(
      path.resolve(__dirname, "../public/diagnostic/index.html"),
      "utf8"
    );

    expect(assessHtml).toContain("Request the workbook");
    expect(assessHtml).not.toContain("Get the workbook");
    expect(assessHtml).toContain("Apply for the diagnostic");
    expect(assessHtml).toContain("apply for a paid");
    expect(assessHtml).not.toContain("Book a diagnostic");
    expect(assessHtml).not.toContain("book a paid");
    expect(assessHtml).not.toContain("Book the diagnostic");
    expect(diagnosticHtml).toContain("Request the workbook");
    expect(diagnosticHtml).toContain("Request <a href=\"https://appliedleverage.io/workbook\"");
    expect(diagnosticHtml).not.toContain("Get the workbook");
    expect(diagnosticHtml).not.toContain("Get <a href=\"https://appliedleverage.io/workbook\"");
  });

  it("keeps the static diagnostic workbook CTA wired to flip both label and href when checkout goes live", () => {
    const diagnosticHtml = fs.readFileSync(
      path.resolve(__dirname, "../public/diagnostic/index.html"),
      "utf8"
    );

    expect(diagnosticHtml).toContain("workbookPathCta.textContent = workbookCheckoutUrl ? 'Buy the workbook — $47 →' : 'Request the workbook →';");
    expect(diagnosticHtml).toContain("workbookPathCta.href = workbookCheckoutUrl || 'https://appliedleverage.io/workbook';");
    expect(diagnosticHtml).not.toContain("Get the workbook");
  });

  it("keeps the static diagnostic thank-you copy honest across endpoint and email fallback paths", () => {
    const diagnosticHtml = fs.readFileSync(
      path.resolve(__dirname, "../public/diagnostic/index.html"),
      "utf8"
    );

    expect(diagnosticHtml).toContain("Your application was submitted successfully and is now in the manual review queue under ${submissionId}.");
    expect(diagnosticHtml).toContain("Your application was submitted successfully and is now in the manual review queue.");
    expect(diagnosticHtml).toContain("showThanks('endpoint', responseJson.submissionId || '');");
    expect(diagnosticHtml).toContain("Your email app should open with the full application draft.");
    expect(diagnosticHtml).toContain("Submitting…");
    expect(diagnosticHtml).toContain("Application submitted.");
    expect(diagnosticHtml).toContain("Application draft opened for review.");
  });

  it("keeps the static diagnostic delivery timing aligned with the softer same-day promise", () => {
    const diagnosticHtml = fs.readFileSync(
      path.resolve(__dirname, "../public/diagnostic/index.html"),
      "utf8"
    );

    expect(diagnosticHtml).toContain("Usually the same day");
    expect(diagnosticHtml).toContain("as quickly as possible, usually the same day");
    expect(diagnosticHtml).not.toContain("Within 4 hours");
  });

  it("keeps the static diagnostic header free of fake fixed-scarcity claims", () => {
    const diagnosticHtml = fs.readFileSync(
      path.resolve(__dirname, "../public/diagnostic/index.html"),
      "utf8"
    );

    expect(diagnosticHtml).toContain("Applications reviewed personally");
    expect(diagnosticHtml).not.toContain("Founding Cohort — 10 spots");
  });

  it("keeps the sprint/apply lane free of untracked numeric scarcity caps", () => {
    const siteContentSource = fs.readFileSync(
      path.resolve(__dirname, "../lib/site-content.ts"),
      "utf8"
    );
    const marketingPageSource = fs.readFileSync(
      path.resolve(__dirname, "../components/marketing-page.tsx"),
      "utf8"
    );
    const applyCopySource = fs.readFileSync(
      path.resolve(__dirname, "../copy/apply.md"),
      "utf8"
    );
    const sprintCopySource = fs.readFileSync(
      path.resolve(__dirname, "../copy/sprint.md"),
      "utf8"
    );

    expect(siteContentSource).not.toContain("Soft-launch cohort capped at 3 clients");
    expect(marketingPageSource).not.toContain("First soft-launch cohort only.");
    expect(marketingPageSource).not.toContain("Waitlist is for the first soft-launch cohort only");
    expect(marketingPageSource).not.toContain("first cohort access");
    expect(siteContentSource).not.toContain("early cohort access");
    expect(applyCopySource).not.toContain("first cohort limited to 3 clients");
    expect(applyCopySource).not.toContain("cohort spot opens");
    expect(applyCopySource).toContain("soft launch");
    expect(applyCopySource).toContain("Applications are reviewed manually before space is opened.");
    expect(sprintCopySource).not.toContain("Limited to 3 clients per cohort");
    expect(sprintCopySource).not.toContain("first cohort is limited to **3 clients**");
    expect(sprintCopySource).toContain("Soft launch waitlist only");
    expect(sprintCopySource).toContain("Applications are reviewed manually before space is opened.");
    expect(sprintCopySource).not.toContain("first Sprint cohort");
    expect(sprintCopySource).toContain("next Sprint opening");
  });

  it("keeps the static assessment roadmap flow honest across queueing and email fallback paths", () => {
    const assessHtml = fs.readFileSync(
      path.resolve(__dirname, "../public/assess/index.html"),
      "utf8"
    );

    expect(assessHtml).toContain("window.ASSESSMENT_ROADMAP_ENDPOINT || `/api/intake/assessment`");
    expect(assessHtml).toContain("Roadmap request received. Your result is now in the intake queue under ${submissionId}.");
    expect(assessHtml).toContain("Roadmap request received. Your result is now in the intake queue.");
    expect(assessHtml).toContain("No capture endpoint is wired yet. Opening a prefilled email to Lucas so this lead doesn't get dropped.");
    expect(assessHtml).toContain("mailto:lucas@appliedleverage.io?subject=${subject}&body=${body}");
    expect(assessHtml).not.toContain("Roadmap request received. Check your inbox.");
    expect(assessHtml).not.toContain("Your roadmap is on the way");
  });

  it("keeps the workbook page access note state-neutral", () => {
    const workbookSource = fs.readFileSync(
      path.resolve(__dirname, "../app/workbook/page.tsx"),
      "utf8"
    );

    expect(workbookSource).toContain(
      "Manual delivery for now. Product is ready now. Request access and Lucas will send the current version directly."
    );
    expect(workbookSource).not.toContain("Instant checkout is live now.");
    expect(workbookSource).not.toContain("Manual fulfillment for now.");
  });

  it("keeps article next-step copy aligned with apply-first diagnostic language", () => {
    const articleSource = fs.readFileSync(
      path.resolve(__dirname, "../app/blog/[slug]/page.tsx"),
      "utf8"
    );

    expect(articleSource).toContain("apply for the diagnostic");
    expect(articleSource).not.toContain("book the diagnostic");
  });

  it("keeps article publish metadata visible on-page instead of hiding it only in schema", () => {
    const articleSource = fs.readFileSync(
      path.resolve(__dirname, "../app/blog/[slug]/page.tsx"),
      "utf8"
    );

    expect(articleSource).toContain("By {article.authorName} · Published {publishedLabel}");
    expect(articleSource).toContain("function formatPublishedDate");
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
