"use client";

import React, { useEffect, useState, type FormEvent, type ReactNode } from "react";

import {
  submitEmbeddedFormToIntakeRoute,
  type EmbeddedFormVariant
} from "@/lib/intake-submissions";

type FormShellProps = {
  variant: EmbeddedFormVariant;
  eyebrow: string;
  title: string;
  description: string;
  actionLabel: string;
  note: string;
  successMessage: string;
  children: ReactNode;
};

type FieldProps = {
  id: string;
  label: string;
  required?: boolean;
  children: ReactNode;
};

export function EmbeddedForm({ variant }: { variant: EmbeddedFormVariant }) {
  if (variant === "diagnostic") {
    return <DiagnosticForm />;
  }

  return <SprintForm />;
}

function FormShell({
  eyebrow,
  title,
  description,
  actionLabel,
  note,
  successMessage,
  variant,
  children
}: FormShellProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    tone: "error" | "success";
    message: string;
  } | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    if (!form.reportValidity()) {
      setStatus(null);
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      await submitEmbeddedFormToIntakeRoute(variant, new FormData(form));
      setStatus({
        tone: "success",
        message: successMessage
      });
      form.reset();
    } catch (error) {
      setStatus({
        tone: "error",
        message:
          error instanceof Error
            ? error.message
            : "Couldn't send your form right now. Email lucas@appliedleverage.io if it keeps failing."
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      className="lead-form"
      noValidate
      onInput={() => {
        if (status) {
          setStatus(null);
        }
      }}
      onSubmit={(event) => {
        void handleSubmit(event);
      }}
    >
      <div className="form-intro">
        <p className="eyebrow">{eyebrow}</p>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <input autoComplete="off" name="_honey" tabIndex={-1} type="text" hidden />
      <div className="form-grid">{children}</div>
      <div className="form-actions">
        <button className="button button-primary" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Sending..." : actionLabel}
        </button>
        <p className="form-note">{note}</p>
        {status ? (
          <p
            aria-live="polite"
            className="form-status"
            data-tone={status.tone}
            role="status"
          >
            {status.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}

function Field({ id, label, required = false, children }: FieldProps) {
  return (
    <label className="field" htmlFor={id}>
      <span className="field-label">
        {label}
        {required ? <span className="required-indicator">Required</span> : null}
      </span>
      {children}
    </label>
  );
}

function DiagnosticForm() {
  const [assessmentContext, setAssessmentContext] = useState({
    score: "",
    band: "",
    topAreas: "",
    source: ""
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    setAssessmentContext({
      score: params.get("assessment_score") ?? "",
      band: params.get("assessment_band") ?? "",
      topAreas: params.get("assessment_top_areas") ?? "",
      source: params.get("assessment_source") ?? ""
    });
  }, []);

  return (
    <FormShell
      actionLabel="Submit Diagnostic Application"
      description="Answer a few questions so Lucas can review the business and decide the right next step based on fit."
      eyebrow="Diagnostic intake"
      note="Submissions go straight into Lucas's review queue and get checked before any session is offered."
      successMessage="Application received. Lucas will review it personally and reply at the email you submitted with the right next step."
      title="Apply for the Agent OS Diagnostic"
      variant="diagnostic"
    >
      <input name="assessment_score" type="hidden" value={assessmentContext.score} readOnly />
      <input name="assessment_band" type="hidden" value={assessmentContext.band} readOnly />
      <input name="assessment_top_areas" type="hidden" value={assessmentContext.topAreas} readOnly />
      <input name="assessment_source" type="hidden" value={assessmentContext.source} readOnly />
      <Field id="diagnostic-name" label="Name" required>
        <input
          autoComplete="name"
          id="diagnostic-name"
          name="name"
          placeholder="Jane Operator"
          required
        />
      </Field>
      <Field id="diagnostic-email" label="Email" required>
        <input
          autoComplete="email"
          id="diagnostic-email"
          name="email"
          placeholder="jane@company.com"
          required
          type="email"
        />
      </Field>
      <Field id="diagnostic-site" label="Website or offer link">
        <input
          id="diagnostic-site"
          name="site"
          placeholder="https://example.com"
          type="url"
        />
      </Field>
      <Field id="diagnostic-revenue" label="Current monthly revenue" required>
        <select defaultValue="" id="diagnostic-revenue" name="revenue" required>
          <option disabled value="">
            Select a range
          </option>
          <option>$5K-$10K</option>
          <option>$10K-$20K</option>
          <option>$20K-$30K</option>
          <option>$30K+</option>
        </select>
      </Field>
      <Field id="diagnostic-drag" label="Where are you still the bottleneck?" required>
        <textarea
          id="diagnostic-drag"
          name="drag"
          placeholder="Lead follow-up, onboarding, client delivery..."
          required
        />
      </Field>
      <Field id="diagnostic-ai" label="What have you already tried with AI or automation?">
        <textarea
          id="diagnostic-ai"
          name="ai"
          placeholder="Zapier, Make, assistants, internal SOPs..."
        />
      </Field>
    </FormShell>
  );
}

function SprintForm() {
  return (
    <FormShell
      actionLabel="Join the Sprint Waitlist"
      description="Share the build context and Lucas will review whether the sprint is the right next step."
      eyebrow="Sprint waitlist"
      note="Waitlist requests route into the same intake inbox, with replies sent directly by email."
      successMessage="Waitlist request received. Lucas will review your sprint fit and follow up by email."
      title="Request an invite to the next sprint opening"
      variant="sprint"
    >
      <Field id="sprint-name" label="Name" required>
        <input
          autoComplete="name"
          id="sprint-name"
          name="name"
          placeholder="Jane Operator"
          required
        />
      </Field>
      <Field id="sprint-email" label="Email" required>
        <input
          autoComplete="email"
          id="sprint-email"
          name="email"
          placeholder="jane@company.com"
          required
          type="email"
        />
      </Field>
      <Field id="sprint-diagnostic" label="Have you already completed the Diagnostic?" required>
        <select
          defaultValue=""
          id="sprint-diagnostic"
          name="diagnostic"
          required
        >
          <option disabled value="">
            Select an answer
          </option>
          <option>Yes, with Applied Leverage</option>
          <option>Yes, via an equivalent internal audit</option>
          <option>No, I still need the Diagnostic</option>
        </select>
      </Field>
      <Field id="sprint-model" label="Business model" required>
        <input
          id="sprint-model"
          name="model"
          placeholder="Agency, consulting, operator-led service..."
          required
        />
      </Field>
      <Field id="sprint-build" label="What do you want to build first?" required>
        <textarea
          id="sprint-build"
          name="build"
          placeholder="Which workflows need to run without you?"
          required
        />
      </Field>
      <Field id="sprint-context" label="Anything else Lucas should know?">
        <textarea
          id="sprint-context"
          name="context"
          placeholder="Current stack, blockers, timing, budget context..."
        />
      </Field>
    </FormShell>
  );
}
