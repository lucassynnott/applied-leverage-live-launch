import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const {
  appendIntakeLedgerEvent,
  buildRequestContext,
  createSubmissionId,
  resolveLifecycleDelivery,
  submitLifecycleForm
} = vi.hoisted(() => ({
  appendIntakeLedgerEvent: vi.fn(),
  buildRequestContext: vi.fn(),
  createSubmissionId: vi.fn(),
  resolveLifecycleDelivery: vi.fn(),
  submitLifecycleForm: vi.fn()
}));

vi.mock("@/lib/intake-ledger", () => ({
  appendIntakeLedgerEvent,
  buildRequestContext,
  createSubmissionId
}));

vi.mock("@/lib/lifecycle-providers", () => ({
  resolveLifecycleDelivery,
  submitLifecycleForm
}));

import { handleIntakeRoute } from "@/lib/intake-route-handler";

beforeEach(() => {
  vi.clearAllMocks();
  appendIntakeLedgerEvent.mockResolvedValue(undefined);
  createSubmissionId.mockReturnValue("sub_test_123");
  buildRequestContext.mockReturnValue({
    origin: "https://appliedleverage.io",
    pathname: "/api/intake/diagnostic",
    referer: "https://appliedleverage.io/diagnostic",
    userAgent: "Vitest"
  });
  resolveLifecycleDelivery.mockReturnValue({
    provider: "formsubmit",
    endpoint: "https://formsubmit.co/ajax/lucas@appliedleverage.io",
    fallbackUsed: false
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("handleIntakeRoute", () => {
  it("logs received and delivered events for a successful intake submission", async () => {
    submitLifecycleForm.mockResolvedValue({
      provider: "kit",
      endpoint: "kit:form:321",
      fallbackUsed: false
    });

    const request = new Request("https://appliedleverage.io/api/intake/diagnostic", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        name: "Jane Operator",
        email: "jane@company.com",
        revenue: "$10K-$20K",
        drag: "Lead follow-up"
      })
    });

    const response = await handleIntakeRoute(request, "diagnostic");

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      success: true,
      submissionId: "sub_test_123"
    });

    expect(submitLifecycleForm).toHaveBeenCalledWith(
      "diagnostic",
      expect.any(FormData)
    );

    expect(appendIntakeLedgerEvent).toHaveBeenCalledTimes(2);
    expect(appendIntakeLedgerEvent).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        event: "received",
        formType: "diagnostic",
        submissionId: "sub_test_123",
        payload: {
          name: "Jane Operator",
          email: "jane@company.com",
          revenue: "$10K-$20K",
          drag: "Lead follow-up"
        },
        request: {
          origin: "https://appliedleverage.io",
          pathname: "/api/intake/diagnostic",
          referer: "https://appliedleverage.io/diagnostic",
          userAgent: "Vitest"
        }
      })
    );
    expect(appendIntakeLedgerEvent).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        event: "delivered",
        delivery: {
          ok: true,
          provider: "kit",
          endpoint: "kit:form:321",
          fallbackUsed: false
        }
      })
    );
  });

  it("logs a delivery failure and returns 502 when delivery blows up", async () => {
    submitLifecycleForm.mockRejectedValue(new Error("Kit down"));

    const request = new Request("https://appliedleverage.io/api/intake/assessment", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        email: "jane@company.com",
        assessment_score: "17"
      })
    });

    const response = await handleIntakeRoute(request, "assessment");

    expect(response.status).toBe(502);
    await expect(response.json()).resolves.toEqual({
      success: false,
      message: "Kit down"
    });

    expect(appendIntakeLedgerEvent).toHaveBeenCalledTimes(2);
    expect(appendIntakeLedgerEvent).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        event: "received",
        formType: "assessment",
        payload: {
          email: "jane@company.com",
          assessment_score: "17"
        }
      })
    );
    expect(appendIntakeLedgerEvent).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        event: "delivery_failed",
        formType: "assessment",
        delivery: {
          ok: false,
          provider: "formsubmit",
          endpoint: "https://formsubmit.co/ajax/lucas@appliedleverage.io",
          fallbackUsed: false,
          error: "Kit down"
        }
      })
    );
  });
});
