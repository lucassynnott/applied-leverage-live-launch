"use client";

import React, { useState, type FormEvent, type ReactNode } from "react";

type EmbeddedFormVariant = "diagnostic" | "sprint";

type FormShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  actionLabel: string;
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
  successMessage,
  children
}: FormShellProps) {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    if (!form.reportValidity()) {
      setStatusMessage(null);
      return;
    }

    setStatusMessage(successMessage);
    form.reset();
  }

  return (
    <form
      className="lead-form"
      onInput={() => {
        if (statusMessage) {
          setStatusMessage(null);
        }
      }}
      onSubmit={handleSubmit}
    >
      <div className="form-intro">
        <p className="eyebrow">{eyebrow}</p>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="form-grid">{children}</div>
      <div className="form-actions">
        <button className="button button-primary" type="submit">
          {actionLabel}
        </button>
        <p className="form-note">
          Launch placeholder. Submit keeps browser validation intact and shows a
          local confirmation until the live intake backend is wired.
        </p>
        {statusMessage ? (
          <p aria-live="polite" className="form-status" role="status">
            {statusMessage}
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
  return (
    <FormShell
      actionLabel="Submit Diagnostic Application"
      description="This placeholder captures the core intake fields needed to qualify a diagnostic call."
      eyebrow="Diagnostic intake"
      successMessage="Diagnostic application captured locally. Wire this form to your intake backend before launch."
      title="Apply for the Agent OS Diagnostic"
    >
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
      description="This placeholder waitlist form keeps the soft launch credible while the intake backend stays lightweight."
      eyebrow="Sprint waitlist"
      successMessage="Sprint waitlist request captured locally. Connect this form to your waitlist workflow before launch."
      title="Request an invite to the first sprint cohort"
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
