import { appendFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

import type { EmbeddedFormVariant } from "@/lib/intake-submissions";
import type { LifecycleStateEffect } from "@/lib/lifecycle-state";

export type IntakeLedgerEvent = {
  event: "received" | "delivered" | "delivery_failed";
  formType: EmbeddedFormVariant;
  submissionId: string;
  submittedAt: string;
  payload: Record<string, string>;
  request: {
    origin?: string;
    pathname?: string;
    referer?: string;
    userAgent?: string;
  };
  delivery?: {
    ok: boolean;
    provider?: "formsubmit" | "kit";
    endpoint?: string;
    fallbackUsed?: boolean;
    error?: string;
    state?: LifecycleStateEffect;
  };
};

const LEDGER_PATH = path.join(process.cwd(), "data", "intake-submissions.jsonl");
const INBOX_PATH = path.join(process.cwd(), "..", "obsidian-vault", "Gigabrain", "Inbox");

function formatPayload(payload: Record<string, string>) {
  const entries = Object.entries(payload);

  if (entries.length === 0) {
    return "- *(empty payload captured)*";
  }

  return entries
    .map(([key, value]) => `- **${key}**: ${value.replace(/\n/g, " ")}`)
    .join("\n");
}

function formatDeliveryState(state?: LifecycleStateEffect) {
  if (!state) {
    return "";
  }

  const lines = [
    `- **stage**: ${state.stage}`,
    `- **hotLead**: ${state.hotLead ? "yes" : "no"}`
  ];

  if (state.tagsApplied?.length) {
    lines.push(`- **tagsApplied**: ${state.tagsApplied.join(", ")}`);
  }

  if (state.tagsRemoved?.length) {
    lines.push(`- **tagsRemoved**: ${state.tagsRemoved.join(", ")}`);
  }

  if (state.fieldsUpdated && Object.keys(state.fieldsUpdated).length > 0) {
    lines.push(
      `- **fieldsUpdated**: ${Object.entries(state.fieldsUpdated)
        .map(([key, value]) => `${key}=${value}`)
        .join(", ")}`
    );
  }

  return `\n\n## Derived lifecycle state\n${lines.join("\n")}`;
}

function formatInboxNote(event: IntakeLedgerEvent) {
  const title = `${event.formType} intake — ${event.submissionId}`;
  const requestLines = [
    `- **origin**: ${event.request.origin ?? "n/a"}`,
    `- **pathname**: ${event.request.pathname ?? "n/a"}`,
    `- **referer**: ${event.request.referer ?? "n/a"}`,
    `- **userAgent**: ${event.request.userAgent ?? "n/a"}`
  ].join("\n");

  const deliveryBlock = event.delivery
    ? `\n\n## Delivery\n- **ok**: ${event.delivery.ok ? "yes" : "no"}\n- **provider**: ${event.delivery.provider ?? "n/a"}\n- **endpoint**: ${event.delivery.endpoint ?? "n/a"}\n- **fallbackUsed**: ${event.delivery.fallbackUsed ? "yes" : "no"}${
        event.delivery.error ? `\n- **error**: ${event.delivery.error}` : ""
      }${formatDeliveryState(event.delivery.state)}`
    : "";

  return `---\nsubmissionId: ${event.submissionId}\nformType: ${event.formType}\nlastEvent: ${event.event}\nsubmittedAt: ${event.submittedAt}\n---\n\n# ${title}\n\n## Request\n${requestLines}\n\n## Payload\n${formatPayload(event.payload)}${deliveryBlock}\n`;
}

export function createSubmissionId() {
  return randomUUID();
}

export function buildRequestContext(request: Request) {
  const url = new URL(request.url);

  return {
    origin: url.origin,
    pathname: url.pathname,
    referer: request.headers.get("referer") ?? undefined,
    userAgent: request.headers.get("user-agent") ?? undefined
  };
}

export function getInboxNotePath(submissionId: string) {
  return path.join(INBOX_PATH, `${submissionId}.md`);
}

export async function appendIntakeLedgerEvent(event: IntakeLedgerEvent) {
  await mkdir(path.dirname(LEDGER_PATH), { recursive: true });
  await mkdir(INBOX_PATH, { recursive: true });
  await appendFile(LEDGER_PATH, `${JSON.stringify(event)}\n`, "utf8");
  await writeFile(getInboxNotePath(event.submissionId), formatInboxNote(event), "utf8");
}
