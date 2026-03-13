import { describe, expect, it } from "vitest";

import { buildRequestContext, createSubmissionId, getInboxNotePath } from "@/lib/intake-ledger";

describe("createSubmissionId", () => {
  it("returns a non-empty id", () => {
    expect(createSubmissionId()).toMatch(/[a-f0-9-]{36}/i);
  });
});

describe("buildRequestContext", () => {
  it("captures request metadata for the intake ledger", () => {
    const request = new Request("https://appliedleverage.io/api/intake/diagnostic", {
      headers: {
        referer: "https://appliedleverage.io/diagnostic?utm_source=meta",
        "user-agent": "Vitest"
      }
    });

    expect(buildRequestContext(request)).toEqual({
      origin: "https://appliedleverage.io",
      pathname: "/api/intake/diagnostic",
      referer: "https://appliedleverage.io/diagnostic?utm_source=meta",
      userAgent: "Vitest"
    });
  });
});

describe("getInboxNotePath", () => {
  it("targets the visible obsidian inbox surface", () => {
    expect(getInboxNotePath("abc-123")).toContain("obsidian-vault/Gigabrain/Inbox/abc-123.md");
  });
});
