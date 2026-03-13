import { buildFormSubmitPayload, type EmbeddedFormVariant } from "@/lib/intake-submissions";
import { deriveLifecycleState, type LifecycleStateEffect } from "@/lib/lifecycle-state";

type DeliveryProvider = "formsubmit" | "kit";

type DeliveryTarget = {
  provider: DeliveryProvider;
  endpoint: string;
  fallbackUsed: boolean;
};

export type LifecycleDeliveryResult = DeliveryTarget & {
  ok: boolean;
  state: LifecycleStateEffect;
  error?: string;
};

const FORM_SUBMIT_ENDPOINT = "https://formsubmit.co/ajax/lucas@appliedleverage.io";
const KIT_API_BASE = "https://api.kit.com/v4/forms";

type FetchLike = typeof fetch;

type KitSubscriberPayload = {
  email_address: string;
  first_name?: string;
  fields?: Record<string, string>;
  tags?: string[];
};

function resolveKitFormId(variant: EmbeddedFormVariant) {
  if (variant === "assessment") {
    return process.env.KIT_ASSESSMENT_FORM_ID?.trim();
  }

  if (variant === "diagnostic") {
    return process.env.KIT_DIAGNOSTIC_FORM_ID?.trim();
  }

  return undefined;
}

function allowKitFallback() {
  return (process.env.KIT_FALLBACK_TO_FORMSUBMIT?.trim() || "true") !== "false";
}

export function resolveLifecycleDelivery(variant: EmbeddedFormVariant): DeliveryTarget {
  const kitApiKey = process.env.KIT_API_KEY?.trim();
  const kitFormId = resolveKitFormId(variant);
  const allowFallback = allowKitFallback();

  if (kitApiKey && kitFormId) {
    return {
      provider: "kit",
      endpoint: `kit:form:${kitFormId}`,
      fallbackUsed: false
    };
  }

  return {
    provider: "formsubmit",
    endpoint: FORM_SUBMIT_ENDPOINT,
    fallbackUsed: Boolean(kitApiKey || kitFormId) && allowFallback
  };
}

function buildKitSubscriberPayload(
  formData: FormData,
  state: LifecycleStateEffect
): KitSubscriberPayload {
  const values: Record<string, string> = {};

  for (const [key, value] of formData.entries()) {
    if (typeof value !== "string") {
      continue;
    }

    const trimmed = value.trim();

    if (!trimmed || key.startsWith("_")) {
      continue;
    }

    values[key] = trimmed;
  }

  const { email, name, first_name, ...rest } = values;

  return {
    email_address: email ?? "",
    first_name: first_name ?? name,
    fields: {
      ...rest,
      ...state.fieldsUpdated
    },
    ...(state.tagsApplied.length ? { tags: state.tagsApplied } : {})
  };
}

async function submitViaFormSubmit(
  variant: EmbeddedFormVariant,
  formData: FormData,
  fetchImpl: FetchLike
) {
  const response = await fetchImpl(FORM_SUBMIT_ENDPOINT, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(buildFormSubmitPayload(variant, formData))
  });

  const raw = await response.text();
  let payload: { message?: string; success?: boolean | string } | undefined;

  if (raw) {
    try {
      payload = JSON.parse(raw) as { message?: string; success?: boolean | string };
    } catch {
      payload = undefined;
    }
  }

  const explicitFailure = payload?.success === false || payload?.success === "false";

  if (!response.ok || explicitFailure) {
    throw new Error(
      payload?.message ??
        "Couldn't send your form right now. Email lucas@appliedleverage.io if it keeps failing."
    );
  }
}

async function submitViaKit(
  variant: EmbeddedFormVariant,
  formData: FormData,
  state: LifecycleStateEffect,
  fetchImpl: FetchLike
) {
  const kitApiKey = process.env.KIT_API_KEY?.trim();
  const kitFormId = resolveKitFormId(variant);

  if (!kitApiKey || !kitFormId) {
    throw new Error("Kit is not fully configured.");
  }

  const response = await fetchImpl(`${KIT_API_BASE}/${kitFormId}/subscribers`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${kitApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(buildKitSubscriberPayload(formData, state))
  });

  const raw = await response.text();
  let payload: { message?: string; error?: string } | undefined;

  if (raw) {
    try {
      payload = JSON.parse(raw) as { message?: string; error?: string };
    } catch {
      payload = undefined;
    }
  }

  if (!response.ok) {
    throw new Error(
      payload?.message ??
        payload?.error ??
        "Couldn't send your form right now. Email lucas@appliedleverage.io if it keeps failing."
    );
  }
}

export async function submitLifecycleForm(
  variant: EmbeddedFormVariant,
  formData: FormData,
  fetchImpl: FetchLike = fetch
): Promise<LifecycleDeliveryResult> {
  const deliveryTarget = resolveLifecycleDelivery(variant);

  if (variant !== "assessment" && variant !== "diagnostic") {
    throw new Error(`Lifecycle state derivation does not support variant: ${variant}`);
  }

  const state = deriveLifecycleState(variant, formData);

  if (deliveryTarget.provider === "kit") {
    try {
      await submitViaKit(variant, formData, state, fetchImpl);
      return {
        ok: true,
        ...deliveryTarget,
        state
      };
    } catch (error) {
      if (!allowKitFallback()) {
        throw error;
      }

      await submitViaFormSubmit(variant, formData, fetchImpl);

      return {
        ok: true,
        provider: "formsubmit",
        endpoint: FORM_SUBMIT_ENDPOINT,
        fallbackUsed: true,
        state
      };
    }
  }

  await submitViaFormSubmit(variant, formData, fetchImpl);
  return {
    ok: true,
    ...deliveryTarget,
    state
  };
}
