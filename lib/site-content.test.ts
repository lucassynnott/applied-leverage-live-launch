import { describe, expect, it } from "vitest";

import { loadPageContent, parseSectionHeading } from "@/lib/site-content";

describe("parseSectionHeading", () => {
  it("extracts explicit anchor ids from section titles", () => {
    expect(parseSectionHeading("WAITLIST {#waitlist}")).toEqual({
      title: "WAITLIST",
      id: "waitlist"
    });
  });
});

describe("loadPageContent", () => {
  it("loads the diagnostic page hero and apply section", () => {
    const page = loadPageContent("diagnostic");

    expect(page.hero.headline).toContain("90 minutes");
    expect(page.sections.some((section) => section.id === "apply")).toBe(true);
  });
});
