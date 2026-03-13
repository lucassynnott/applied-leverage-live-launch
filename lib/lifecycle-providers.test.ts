import { afterEach, describe, expect, it, vi } from "vitest";

import { resolveLifecycleDelivery, submitLifecycleForm } from "@/lib/lifecycle-providers";
import { deriveLifecycleState } from "@/lib/lifecycle-state";

const originalEnv = { ...process.env };

function buildAssessmentFormData(overrides: Record<string, string> = {}) {
  const formData = new FormData();

  formData.set("email", "owner@company.com");
  formData.set("assessment_score", "8");
  formData.set("assessment_band", "Manual-heavy");
  formData.set("assessment_top_areas", "lead follow-up, reporting, handoffs");
  formData.set("_honey", "");

  for (const [key, value] of Object.entries(overrides)) {
    formData.set(key, value);
  }

  return formData;
}

function buildDiagnosticFormData() {
  const formData = new FormData();

  formData.set("name", "Jane Operator");
  formData.set("email", "jane@company.com");
  formData.set("revenue", "$10K-$20K");
  formData.set("drag", "Lead follow-up and client delivery");
  formData.set("assessment_score", "17");
  formData.set("_honey", "");

  return formData;
}

afterEach(() => {
  vi.unstubAllEnvs();
  process.env = { ...originalEnv };
});

describe("resolveLifecycleDelivery", () => {
  it("defaults to FormSubmit when Kit is not configured", () => {
    expect(resolveLifecycleDelivery("assessment")).toEqual({
      provider: "formsubmit",
      endpoint: "https://formsubmit.co/ajax/lucas@appliedleverage.io",
      fallbackUsed: false
    });
  });

  it("marks FormSubmit as a fallback when Kit is partially configured", () => {
    vi.stubEnv("KIT_API_KEY", "kit_test_123");

    expect(resolveLifecycleDelivery("assessment")).toEqual({
      provider: "formsubmit",
      endpoint: "https://formsubmit.co/ajax/lucas@appliedleverage.io",
      fallbackUsed: true
    });
  });

  it("resolves to Kit when both API key and form id exist", () => {
    vi.stubEnv("KIT_API_KEY", "kit_test_123");
    vi.stubEnv("KIT_DIAGNOSTIC_FORM_ID", "321");

    expect(resolveLifecycleDelivery("diagnostic")).toEqual({
      provider: "kit",
      endpoint: "kit:form:321",
      fallbackUsed: false
    });
  });
});

describe("deriveLifecycleState", () => {
  it("derives assessment lifecycle state with readiness tags", () => {
    vi.stubEnv("KIT_ASSESSMENT_TAG_ID", "tag_assessment");
    vi.stubEnv("KIT_MANUAL_HEAVY_TAG_ID", "tag_manual");

    expect(deriveLifecycleState("assessment", buildAssessmentFormData())).toEqual({
      stage: "assessment",
      tagsApplied: ["tag_assessment", "tag_manual"],
      tagsRemoved: [],
      fieldsUpdated: {
        lifecycle_stage: "assessment",
        intake_form_type: "assessment",
        assessment_score: "8",
        assessment_band: "Manual-heavy",
        assessment_top_areas: "lead follow-up, reporting, handoffs"
      },
      hotLead: false
    });
  });

  it("keeps unknown assessment bands conservative", () => {
    vi.stubEnv("KIT_ASSESSMENT_TAG_ID", "tag_assessment");
    vi.stubEnv("KIT_MANUAL_HEAVY_TAG_ID", "tag_manual");
    vi.stubEnv("KIT_SCALE_READY_TAG_ID", "tag_scale");

    expect(
      deriveLifecycleState(
        "assessment",
        buildAssessmentFormData({ assessment_band: "Operator wobble zone" })
      )
    ).toEqual({
      stage: "assessment",
      tagsApplied: ["tag_assessment"],
      tagsRemoved: [],
      fieldsUpdated: {
        lifecycle_stage: "assessment",
        intake_form_type: "assessment",
        assessment_score: "8",
        assessment_band: "Operator wobble zone",
        assessment_top_areas: "lead follow-up, reporting, handoffs"
      },
      hotLead: false
    });
  });

  it("derives diagnostic lifecycle state as a hot lead", () => {
    vi.stubEnv("KIT_DIAGNOSTIC_TAG_ID", "tag_diagnostic");
    vi.stubEnv("KIT_ASSESSMENT_TAG_ID", "tag_assessment");
    vi.stubEnv("KIT_MANUAL_HEAVY_TAG_ID", "tag_manual");
    vi.stubEnv("KIT_SCALE_READY_TAG_ID", "tag_scale");

    expect(deriveLifecycleState("diagnostic", buildDiagnosticFormData())).toEqual({
      stage: "diagnostic_applied",
      tagsApplied: ["tag_diagnostic"],
      tagsRemoved: ["tag_assessment", "tag_manual", "tag_scale"],
      fieldsUpdated: {
        lifecycle_stage: "diagnostic_applied",
        intake_form_type: "diagnostic",
        diagnostic_name: "Jane Operator",
        diagnostic_revenue_band: "$10K-$20K",
        diagnostic_primary_bottleneck: "Lead follow-up and client delivery"
      },
      hotLead: true
    });
  });
});

describe("submitLifecycleForm", () => {
  it("submits to Kit when the provider is fully configured", async () => {
    vi.stubEnv("KIT_API_KEY", "kit_test_123");
    vi.stubEnv("KIT_DIAGNOSTIC_FORM_ID", "321");

    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ subscriber: { id: "sub_123" } }), {
        status: 201,
        headers: {
          "Content-Type": "application/json"
        }
      })
    );

    vi.stubEnv("KIT_DIAGNOSTIC_TAG_ID", "tag_diagnostic");

    await expect(
      submitLifecycleForm("diagnostic", buildDiagnosticFormData(), fetchMock as typeof fetch)
    ).resolves.toEqual({
      ok: true,
      provider: "kit",
      endpoint: "kit:form:321",
      fallbackUsed: false,
      state: {
        stage: "diagnostic_applied",
        tagsApplied: ["tag_diagnostic"],
        tagsRemoved: [],
        fieldsUpdated: {
          lifecycle_stage: "diagnostic_applied",
          intake_form_type: "diagnostic",
          diagnostic_name: "Jane Operator",
          diagnostic_revenue_band: "$10K-$20K",
          diagnostic_primary_bottleneck: "Lead follow-up and client delivery"
        },
        hotLead: true
      }
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.kit.com/v4/forms/321/subscribers",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          Authorization: "Bearer kit_test_123"
        })
      })
    );

    const request = fetchMock.mock.calls[0]?.[1];
    const payload = JSON.parse(String(request?.body));
    expect(payload.email_address).toBe("jane@company.com");
    expect(payload.first_name).toBe("Jane Operator");
    expect(payload.fields).toMatchObject({
      revenue: "$10K-$20K",
      drag: "Lead follow-up and client delivery",
      assessment_score: "17",
      lifecycle_stage: "diagnostic_applied",
      intake_form_type: "diagnostic",
      diagnostic_name: "Jane Operator",
      diagnostic_revenue_band: "$10K-$20K",
      diagnostic_primary_bottleneck: "Lead follow-up and client delivery"
    });
    expect(payload.tags).toEqual(["tag_diagnostic"]);
  });

  it("falls back to FormSubmit when Kit delivery fails and fallback is allowed", async () => {
    vi.stubEnv("KIT_API_KEY", "kit_test_123");
    vi.stubEnv("KIT_DIAGNOSTIC_FORM_ID", "321");
    vi.stubEnv("KIT_FALLBACK_TO_FORMSUBMIT", "true");

    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ message: "Kit down" }), {
          status: 503,
          headers: {
            "Content-Type": "application/json"
          }
        })
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ success: "true" }), {
          status: 200,
          headers: {
            "Content-Type": "application/json"
          }
        })
      );

    vi.stubEnv("KIT_DIAGNOSTIC_TAG_ID", "tag_diagnostic");

    await expect(
      submitLifecycleForm("diagnostic", buildDiagnosticFormData(), fetchMock as typeof fetch)
    ).resolves.toEqual({
      ok: true,
      provider: "formsubmit",
      endpoint: "https://formsubmit.co/ajax/lucas@appliedleverage.io",
      fallbackUsed: true,
      state: {
        stage: "diagnostic_applied",
        tagsApplied: ["tag_diagnostic"],
        tagsRemoved: [],
        fieldsUpdated: {
          lifecycle_stage: "diagnostic_applied",
          intake_form_type: "diagnostic",
          diagnostic_name: "Jane Operator",
          diagnostic_revenue_band: "$10K-$20K",
          diagnostic_primary_bottleneck: "Lead follow-up and client delivery"
        },
        hotLead: true
      }
    });

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[1]?.[0]).toBe("https://formsubmit.co/ajax/lucas@appliedleverage.io");
  });

  it("surfaces the Kit error when fallback is disabled", async () => {
    vi.stubEnv("KIT_API_KEY", "kit_test_123");
    vi.stubEnv("KIT_DIAGNOSTIC_FORM_ID", "321");
    vi.stubEnv("KIT_FALLBACK_TO_FORMSUBMIT", "false");

    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ message: "Kit down" }), {
        status: 503,
        headers: {
          "Content-Type": "application/json"
        }
      })
    );

    await expect(
      submitLifecycleForm("diagnostic", buildDiagnosticFormData(), fetchMock as typeof fetch)
    ).rejects.toThrow("Kit down");

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
