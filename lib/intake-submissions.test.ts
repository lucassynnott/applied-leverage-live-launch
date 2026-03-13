import { describe, expect, it, vi } from "vitest";

import {
  buildFormSubmitPayload,
  submitEmbeddedForm,
  submitEmbeddedFormToIntakeRoute
} from "@/lib/intake-submissions";

function buildDiagnosticFormData() {
  const formData = new FormData();

  formData.set("name", "Jane Operator");
  formData.set("email", "jane@company.com");
  formData.set("revenue", "$10K-$20K");
  formData.set("drag", "Lead follow-up and client delivery");
  formData.set("assessment_score", "17");
  formData.set("assessment_band", "manual-heavy");
  formData.set("assessment_top_areas", "follow-up, admin, delivery");
  formData.set("assessment_source", "assessment_quiz");
  formData.set("_honey", "");

  return formData;
}

function buildSprintFormData() {
  const formData = new FormData();

  formData.set("name", "Jane Operator");
  formData.set("email", "jane@company.com");
  formData.set("diagnostic", "No, I still need the Diagnostic");
  formData.set("model", "Operator-led service");
  formData.set("build", "Lead follow-up automation");
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

  it("blocks honeypot submissions before hitting the intake endpoint", async () => {
    const formData = buildDiagnosticFormData();
    formData.set("_honey", "bot payload");
    const fetchMock = vi.fn();

    await expect(
      submitEmbeddedForm("diagnostic", formData, fetchMock as typeof fetch)
    ).rejects.toThrow("Submission blocked.");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects missing required fields before posting", async () => {
    const formData = new FormData();
    formData.set("name", "Jane Operator");
    const fetchMock = vi.fn();

    await expect(
      submitEmbeddedForm("diagnostic", formData, fetchMock as typeof fetch)
    ).rejects.toThrow("Please complete the required fields and try again.");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects invalid email addresses before posting", async () => {
    const formData = buildDiagnosticFormData();
    formData.set("email", "not-an-email");
    const fetchMock = vi.fn();

    await expect(
      submitEmbeddedForm("diagnostic", formData, fetchMock as typeof fetch)
    ).rejects.toThrow("Please enter a valid email address.");
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe("submitEmbeddedFormToIntakeRoute", () => {
  it("posts diagnostic forms to the internal intake route", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ success: true, submissionId: "sub_123" }), {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      })
    );

    await submitEmbeddedFormToIntakeRoute(
      "diagnostic",
      buildDiagnosticFormData(),
      fetchMock as typeof fetch
    );

    expect(fetchMock).toHaveBeenCalledOnce();
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/intake/diagnostic",
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
    expect(payload.name).toBe("Jane Operator");
    expect(payload.email).toBe("jane@company.com");
    expect(payload.assessment_score).toBe("17");
    expect(payload.assessment_band).toBe("manual-heavy");
    expect(payload.assessment_top_areas).toBe("follow-up, admin, delivery");
    expect(payload.assessment_source).toBe("assessment_quiz");
  });

  it("falls back to vendor-direct submit for variants without an internal route", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ success: "true" }), {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      })
    );

    await submitEmbeddedFormToIntakeRoute("sprint", buildSprintFormData(), fetchMock as typeof fetch);

    expect(fetchMock).toHaveBeenCalledWith(
      "https://formsubmit.co/ajax/lucas@appliedleverage.io",
      expect.any(Object)
    );
  });
});
