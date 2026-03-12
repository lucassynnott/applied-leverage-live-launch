import { describe, expect, it, vi } from "vitest";

import {
  buildFormSubmitPayload,
  submitEmbeddedForm
} from "@/lib/intake-submissions";

function buildDiagnosticFormData() {
  const formData = new FormData();

  formData.set("name", "Jane Operator");
  formData.set("email", "jane@company.com");
  formData.set("drag", "Lead follow-up and client delivery");
  formData.set("_honey", "");

  return formData;
}

describe("buildFormSubmitPayload", () => {
  it("adds intake metadata and reply-to information", () => {
    const payload = buildFormSubmitPayload(
      "diagnostic",
      buildDiagnosticFormData(),
      new Date("2026-03-09T22:00:00.000Z")
    );

    expect(payload).toMatchObject({
      _honey: "",
      _replyto: "jane@company.com",
      _subject: "Applied Leverage diagnostic application",
      _template: "table",
      email: "jane@company.com",
      formType: "Diagnostic application",
      name: "Jane Operator",
      submittedAt: "2026-03-09T22:00:00.000Z"
    });
  });

  it("supports assessment roadmap requests too", () => {
    const formData = new FormData();

    formData.set("email", "jane@company.com");
    formData.set("band", "Scale-ready");
    formData.set("score", "31");

    const payload = buildFormSubmitPayload(
      "assessment",
      formData,
      new Date("2026-03-09T22:00:00.000Z")
    );

    expect(payload).toMatchObject({
      _replyto: "jane@company.com",
      _subject: "Applied Leverage assessment roadmap request",
      band: "Scale-ready",
      formType: "Assessment roadmap request",
      score: "31",
      submittedAt: "2026-03-09T22:00:00.000Z"
    });
  });
});

describe("submitEmbeddedForm", () => {
  it("posts the JSON payload to the intake endpoint", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ success: "true" }), {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      })
    );

    await submitEmbeddedForm("diagnostic", buildDiagnosticFormData(), fetchMock as typeof fetch);

    expect(fetchMock).toHaveBeenCalledOnce();
    expect(fetchMock).toHaveBeenCalledWith(
      "https://formsubmit.co/ajax/lucas@appliedleverage.io",
      expect.objectContaining({
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
    );

    const request = fetchMock.mock.calls[0]?.[1];
    expect(request).toBeDefined();

    const payload = JSON.parse(String(request?.body));
    expect(payload.formType).toBe("Diagnostic application");
    expect(payload._replyto).toBe("jane@company.com");
  });

  it("surfaces the upstream error message when submission fails", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ success: "false", message: "Rate limited" }), {
        status: 429,
        headers: {
          "Content-Type": "application/json"
        }
      })
    );

    await expect(
      submitEmbeddedForm("diagnostic", buildDiagnosticFormData(), fetchMock as typeof fetch)
    ).rejects.toThrow("Rate limited");
  });
});
