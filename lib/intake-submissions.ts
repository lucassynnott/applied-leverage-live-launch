export type EmbeddedFormVariant = "assessment" | "diagnostic" | "sprint";

const FORM_SUBMIT_ENDPOINT = "https://formsubmit.co/ajax/lucas@appliedleverage.io";
const INTERNAL_INTAKE_ENDPOINTS: Partial<Record<EmbeddedFormVariant, string>> = {
  assessment: "/api/intake/assessment",
  diagnostic: "/api/intake/diagnostic"
};

const formTypeByVariant: Record<EmbeddedFormVariant, string> = {
  assessment: "Assessment roadmap request",
  diagnostic: "Diagnostic application",
  sprint: "Sprint waitlist"
};

const subjectByVariant: Record<EmbeddedFormVariant, string> = {
  assessment: "Applied Leverage assessment roadmap request",
  diagnostic: "Applied Leverage diagnostic application",
  sprint: "Applied Leverage sprint waitlist"
};

type FormSubmitResponse = {
  errors?: string[];
  message?: string;
  success?: boolean | string;
};

type FetchLike = typeof fetch;

const requiredFieldsByVariant: Record<EmbeddedFormVariant, string[]> = {
  assessment: ["email"],
  diagnostic: ["name", "email", "revenue", "drag"],
  sprint: ["name", "email", "diagnostic", "model", "build"]
};

function normalizeFormData(formData: FormData) {
  const values: Record<string, string> = {};

  for (const [key, value] of formData.entries()) {
    if (typeof value !== "string") {
      continue;
    }

    values[key] = value.trim();
  }

  return values;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateSubmission(variant: EmbeddedFormVariant, values: Record<string, string>) {
  if (values._honey) {
    throw new Error("Submission blocked.");
  }

  const missingField = requiredFieldsByVariant[variant].find((field) => !values[field]);

  if (missingField) {
    throw new Error("Please complete the required fields and try again.");
  }

  if (!isValidEmail(values.email ?? "")) {
    throw new Error("Please enter a valid email address.");
  }
}

export function buildFormSubmitPayload(
  variant: EmbeddedFormVariant,
  formData: FormData,
  submittedAt = new Date()
) {
  const values = normalizeFormData(formData);

  return {
    ...values,
    _replyto: values.email ?? "",
    _subject: subjectByVariant[variant],
    _template: "table",
    formType: formTypeByVariant[variant],
    submittedAt: submittedAt.toISOString()
  };
}

async function parseResponsePayload(response: Response) {
  const raw = await response.text();
  let payload: FormSubmitResponse | undefined;

  if (raw) {
    try {
      payload = JSON.parse(raw) as FormSubmitResponse;
    } catch {
      payload = undefined;
    }
  }

  return payload;
}

export async function submitEmbeddedForm(
  variant: EmbeddedFormVariant,
  formData: FormData,
  fetchImpl: FetchLike = fetch
) {
  validateSubmission(variant, normalizeFormData(formData));

  const response = await fetchImpl(FORM_SUBMIT_ENDPOINT, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(buildFormSubmitPayload(variant, formData))
  });

  const payload = await parseResponsePayload(response);
  const explicitFailure = payload?.success === false || payload?.success === "false";

  if (!response.ok || explicitFailure) {
    throw new Error(
      payload?.message ??
        "Couldn't send your form right now. Email lucas@appliedleverage.io if it keeps failing."
    );
  }
}

export async function submitEmbeddedFormToIntakeRoute(
  variant: EmbeddedFormVariant,
  formData: FormData,
  fetchImpl: FetchLike = fetch
) {
  validateSubmission(variant, normalizeFormData(formData));

  const endpoint = INTERNAL_INTAKE_ENDPOINTS[variant];

  if (!endpoint) {
    return submitEmbeddedForm(variant, formData, fetchImpl);
  }

  const response = await fetchImpl(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(Object.fromEntries(formData.entries()))
  });

  const payload = await parseResponsePayload(response);
  const explicitFailure = payload?.success === false || payload?.success === "false";

  if (!response.ok || explicitFailure) {
    throw new Error(
      payload?.message ??
        "Couldn't send your form right now. Email lucas@appliedleverage.io if it keeps failing."
    );
  }

  return payload;
}
