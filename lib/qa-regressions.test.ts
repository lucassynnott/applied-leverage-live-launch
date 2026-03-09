import fs from "node:fs";
import path from "node:path";

import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { describe, expect, it } from "vitest";

import { EmbeddedForm } from "@/components/forms";
import { SiteShell } from "@/components/site-shell";

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

  it("renders the primary nav as a mobile grid instead of a horizontal scroller", () => {
    const stylesheet = fs.readFileSync(
      path.resolve(__dirname, "../app/globals.css"),
      "utf8"
    );

    expect(stylesheet).toMatch(
      /@media \(max-width: 720px\) \{[\s\S]*\.site-nav \{[\s\S]*display:\s*grid;[\s\S]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\);[\s\S]*overflow:\s*visible;/
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
