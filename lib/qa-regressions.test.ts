import fs from "node:fs";
import path from "node:path";

import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { describe, expect, it } from "vitest";

import { EmbeddedForm } from "@/components/forms";

function renderForm(variant: "diagnostic" | "sprint") {
  return renderToStaticMarkup(createElement(EmbeddedForm, { variant }));
}

function countRequiredFields(html: string) {
  return (html.match(/\srequired(?:=\"\")?/g) ?? []).length;
}

describe("embedded forms", () => {
  it("renders the diagnostic form with a submit path and required fields", () => {
    const html = renderForm("diagnostic");

    expect(html).toContain('type="submit"');
    expect(countRequiredFields(html)).toBeGreaterThan(0);
  });

  it("renders the sprint form with a submit path and required fields", () => {
    const html = renderForm("sprint");

    expect(html).toContain('type="submit"');
    expect(countRequiredFields(html)).toBeGreaterThan(0);
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
});
