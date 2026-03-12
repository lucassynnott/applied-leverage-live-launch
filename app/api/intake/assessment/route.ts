import { NextResponse } from "next/server";

import { submitEmbeddedForm } from "@/lib/intake-submissions";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Record<string, unknown>;
    const formData = new FormData();

    for (const [key, value] of Object.entries(payload)) {
      if (value === undefined || value === null) {
        continue;
      }

      formData.set(key, String(value));
    }

    await submitEmbeddedForm("assessment", formData);

    return NextResponse.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Couldn't send your roadmap request right now. Email lucas@appliedleverage.io if it keeps failing.";

    return NextResponse.json({ success: false, message }, { status: 502 });
  }
}
