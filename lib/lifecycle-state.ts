import type { EmbeddedFormVariant } from "@/lib/intake-submissions";

export type LifecycleStage = "assessment" | "diagnostic_applied";

export type LifecycleStateEffect = {
  stage: LifecycleStage;
  tagsApplied: string[];
  tagsRemoved: string[];
  fieldsUpdated: Record<string, string>;
  hotLead: boolean;
};

type SupportedLifecycleVariant = Extract<EmbeddedFormVariant, "assessment" | "diagnostic">;

function getTrimmed(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function pushIfPresent(target: string[], value?: string) {
  if (value) {
    target.push(value);
  }
}

function setIfPresent(target: Record<string, string>, key: string, value: string) {
  if (value) {
    target[key] = value;
  }
}

function normalizeBand(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function buildAssessmentState(formData: FormData): LifecycleStateEffect {
  const tagsApplied: string[] = [];
  const fieldsUpdated: Record<string, string> = {
    lifecycle_stage: "assessment",
    intake_form_type: "assessment"
  };

  pushIfPresent(tagsApplied, process.env.KIT_ASSESSMENT_TAG_ID?.trim());

  const assessmentScore = getTrimmed(formData, "assessment_score");
  const assessmentBand = getTrimmed(formData, "assessment_band");
  const assessmentTopAreas = getTrimmed(formData, "assessment_top_areas");
  const normalizedBand = normalizeBand(assessmentBand);

  setIfPresent(fieldsUpdated, "assessment_score", assessmentScore);
  setIfPresent(fieldsUpdated, "assessment_band", assessmentBand);
  setIfPresent(fieldsUpdated, "assessment_top_areas", assessmentTopAreas);

  if (
    normalizedBand.includes("manual") ||
    normalizedBand.includes("heavy") ||
    normalizedBand.includes("low") ||
    normalizedBand.includes("operator dependent")
  ) {
    pushIfPresent(tagsApplied, process.env.KIT_MANUAL_HEAVY_TAG_ID?.trim());
  } else if (
    normalizedBand.includes("scale") ||
    normalizedBand.includes("ready") ||
    normalizedBand.includes("high")
  ) {
    pushIfPresent(tagsApplied, process.env.KIT_SCALE_READY_TAG_ID?.trim());
  }

  return {
    stage: "assessment",
    tagsApplied,
    tagsRemoved: [],
    fieldsUpdated,
    hotLead: false
  };
}

function buildDiagnosticState(formData: FormData): LifecycleStateEffect {
  const tagsApplied: string[] = [];
  const tagsRemoved: string[] = [];
  const fieldsUpdated: Record<string, string> = {
    lifecycle_stage: "diagnostic_applied",
    intake_form_type: "diagnostic"
  };

  pushIfPresent(tagsApplied, process.env.KIT_DIAGNOSTIC_TAG_ID?.trim());
  pushIfPresent(tagsRemoved, process.env.KIT_ASSESSMENT_TAG_ID?.trim());
  pushIfPresent(tagsRemoved, process.env.KIT_MANUAL_HEAVY_TAG_ID?.trim());
  pushIfPresent(tagsRemoved, process.env.KIT_SCALE_READY_TAG_ID?.trim());

  setIfPresent(fieldsUpdated, "diagnostic_name", getTrimmed(formData, "name"));
  setIfPresent(fieldsUpdated, "diagnostic_revenue_band", getTrimmed(formData, "revenue"));
  setIfPresent(fieldsUpdated, "diagnostic_primary_bottleneck", getTrimmed(formData, "drag"));

  return {
    stage: "diagnostic_applied",
    tagsApplied,
    tagsRemoved,
    fieldsUpdated,
    hotLead: true
  };
}

export function deriveLifecycleState(
  variant: SupportedLifecycleVariant,
  formData: FormData
): LifecycleStateEffect {
  if (variant === "assessment") {
    return buildAssessmentState(formData);
  }

  if (variant === "diagnostic") {
    return buildDiagnosticState(formData);
  }

  throw new Error(`Lifecycle state derivation does not support variant: ${variant satisfies never}`);
}
