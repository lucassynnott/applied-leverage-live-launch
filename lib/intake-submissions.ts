export type EmbeddedFormVariant = "diagnostic" | "sprint";

const FORM_SUBMIT_ENDPOINT = "https://formsubmit.co/ajax/lucas@appliedleverage.io";

const formTypeByVariant: Record<EmbeddedFormVariant, string> = {
  diagnostic: "Diagnostic application",
  sprint: "Sprint waitlist"
};

const subjectByVariant: Record<EmbeddedFormVariant, string> = {
  diagnostic: "Applied Leverage diagnostic application",
  sprint: "Applied Leverage sprint waitlist"
};

type FormSubmitResponse = {
  errors?: string[];
  message?: string;
  success?: boolean | string;
};

type FetchLike = typeof fetch;

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

export async function submitEmbeddedForm(
  variant: EmbeddedFormVariant,
  formData: FormData,
  fetchImpl: FetchLike = fetch
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
  let payload: FormSubmitResponse | undefined;

  if (raw) {
    try {
      payload = JSON.parse(raw) as FormSubmitResponse;
    } catch {
      payload = undefined;
    }
  }

  const explicitFailure =
    payload?.success === false || payload?.success === "false";

  if (!response.ok || explicitFailure) {
    throw new Error(
      payload?.message ??
        "Couldn't send your form right now. Email lucas@appliedleverage.io if it keeps failing."
    );
  }
}
