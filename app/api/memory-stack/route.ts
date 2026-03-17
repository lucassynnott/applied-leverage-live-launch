import { NextResponse } from "next/server";

export const runtime = "nodejs";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const DOWNLOAD_URL = "https://appliedleverage.io/memory-stack.zip";
const FROM_EMAIL = "lucas@appliedleverage.io";

interface ResendEmailResponse {
  id: string;
  error?: { message: string };
}

interface ResendAudienceResponse {
  data?: { id: string }[];
  error?: { message: string };
}

async function sendDownloadEmail(email: string): Promise<ResendEmailResponse> {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: email,
      subject: "Your OpenClaw Memory Stack download link",
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1a1a1a; font-size: 24px; margin-bottom: 20px;">
            Here's your Memory Stack download
          </h1>
          <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Thanks for grabbing the OpenClaw Memory Stack. Here's the download link:
          </p>
          <p style="margin-bottom: 20px;">
            <a href="${DOWNLOAD_URL}"
               style="display: inline-block; background: #1a1a1a; color: #fff; padding: 12px 24px;
                      text-decoration: none; border-radius: 6px; font-weight: 500;">
              Download Memory Stack
            </a>
          </p>
          <p style="color: #666; font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
            <strong>What's inside:</strong><br>
            • Ready-to-use templates (AGENTS.md, MEMORY.md, PARA.md)<br>
            • Install scripts (preflight, package, apply)<br>
            • Full documentation and examples
          </p>
          <p style="color: #666; font-size: 14px; line-height: 1.6;">
            Drop the files in your OpenClaw workspace and your agent will have persistent memory
            across sessions. No more repeating yourself.
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="color: #999; font-size: 12px;">
            Applied Leverage — lucas@appliedleverage.io
          </p>
        </div>
      `
    })
  });

  return response.json();
}

async function addToAudience(email: string): Promise<void> {
  // First, get or create an audience for memory-stack downloads
  const audiencesRes = await fetch("https://api.resend.com/audiences", {
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`
    }
  });

  const audiencesData = (await audiencesRes.json()) as ResendAudienceResponse;
  let audienceId: string | undefined;

  // Look for existing "memory-stack" audience
  if (audiencesData.data) {
    const existing = audiencesData.data.find(
      (a: { id: string }) => (a as { id: string; name?: string }).name === "memory-stack"
    );
    if (existing) {
      audienceId = existing.id;
    }
  }

  // Create audience if it doesn't exist
  if (!audienceId) {
    const createRes = await fetch("https://api.resend.com/audiences", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: "memory-stack" })
    });
    const createData = (await createRes.json()) as { data?: { id: string } };
    if (createData.data) {
      audienceId = createData.data.id;
    }
  }

  if (!audienceId) {
    console.error("Could not get or create audience");
    return;
  }

  // Add contact to audience
  await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      unsubscribed: false
    })
  });
}

export async function POST(request: Request) {
  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY not configured");
    return NextResponse.json(
      { success: false, message: "Server misconfiguration" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const email = body.email?.trim().toLowerCase();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "Valid email required" },
        { status: 400 }
      );
    }

    // Add to audience (fire and forget - don't block on this)
    addToAudience(email).catch(err => {
      console.error("Failed to add to audience:", err);
    });

    // Send the download email
    const emailResult = await sendDownloadEmail(email);

    if (emailResult.error) {
      console.error("Resend error:", emailResult.error);
      return NextResponse.json(
        { success: false, message: "Failed to send email" },
        { status: 502 }
      );
    }

    console.log(`Memory stack download sent to ${email}, message ID: ${emailResult.id}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Memory stack signup error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
