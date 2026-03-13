import { NextResponse } from "next/server";

import {
  appendIntakeLedgerEvent,
  buildRequestContext,
  createSubmissionId
} from "@/lib/intake-ledger";
import { resolveLifecycleDelivery, submitLifecycleForm } from "@/lib/lifecycle-providers";

type IntakeVariant = "assessment" | "diagnostic";

type IntakeSuccessMessageByVariant = Record<IntakeVariant, string>;

const failureMessageByVariant: IntakeSuccessMessageByVariant = {
  assessment:
    "Couldn't send your roadmap request right now. Email lucas@appliedleverage.io if it keeps failing.",
  diagnostic:
    "Couldn't send your application right now. Email lucas@appliedleverage.io if it keeps failing."
};

function buildFormData(payload: Record<string, unknown>) {
  const formData = new FormData();

  for (const [key, value] of Object.entries(payload)) {
    if (value === undefined || value === null) {
      continue;
    }

    formData.set(key, String(value));
  }

  return formData;
}

export async function handleIntakeRoute(request: Request, variant: IntakeVariant) {
  const submittedAt = new Date().toISOString();
  const submissionId = createSubmissionId();
  const requestContext = buildRequestContext(request);
  let submittedPayload: Record<string, string> = {};

  try {
    const payload = (await request.json()) as Record<string, unknown>;
    const formData = buildFormData(payload);
    submittedPayload = Object.fromEntries(formData.entries()) as Record<string, string>;

    await appendIntakeLedgerEvent({
      event: "received",
      formType: variant,
      submissionId,
      submittedAt,
      payload: submittedPayload,
      request: requestContext
    });

    const deliveryResult = await submitLifecycleForm(variant, formData);

    await appendIntakeLedgerEvent({
      event: "delivered",
      formType: variant,
      submissionId,
      submittedAt,
      payload: submittedPayload,
      request: requestContext,
      delivery: {
        ok: true,
        provider: deliveryResult.provider,
        endpoint: deliveryResult.endpoint,
        fallbackUsed: deliveryResult.fallbackUsed,
        state: deliveryResult.state
      }
    });

    return NextResponse.json({ success: true, submissionId });
  } catch (error) {
    const message = error instanceof Error ? error.message : failureMessageByVariant[variant];
    const deliveryTarget = resolveLifecycleDelivery(variant);

    await appendIntakeLedgerEvent({
      event: "delivery_failed",
      formType: variant,
      submissionId,
      submittedAt,
      payload: submittedPayload,
      request: requestContext,
      delivery: {
        ok: false,
        provider: deliveryTarget.provider,
        endpoint: deliveryTarget.endpoint,
        fallbackUsed: deliveryTarget.fallbackUsed,
        error: message
      }
    }).catch(() => undefined);

    return NextResponse.json({ success: false, message }, { status: 502 });
  }
}
