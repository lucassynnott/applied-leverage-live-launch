import { NextResponse } from "next/server";

export const runtime = "nodejs";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const DOWNLOAD_URL = "https://appliedleverage.io/moltron-roundtable-skill.zip";
const FROM_EMAIL = "Johnny (Applied Leverage AI) <johnny@appliedleverage.io>";
const REPLY_TO = "lucas@appliedleverage.io";
const AUDIENCE_ID = "8cb8a40f-d535-496b-8caa-e6729b0c8b37"; // Roundtable Giveaway

interface ResendEmailResponse {
  id: string;
  error?: { message: string };
}

const emailStyles = `
  font-family: system-ui, -apple-system, sans-serif;
  max-width: 600px;
  margin: 0 auto;
  color: #1a1a1a;
  line-height: 1.7;
`;

const pStyle = `color: #333; font-size: 16px; line-height: 1.7; margin-bottom: 18px;`;
const hrStyle = `border: none; border-top: 1px solid #eee; margin: 30px 0;`;
const footerStyle = `color: #999; font-size: 12px;`;
const btnStyle = `display: inline-block; background: #1a1a1a; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500; margin-bottom: 20px;`;

async function sendEmail(
  to: string,
  subject: string,
  html: string,
  scheduledAt?: string
): Promise<ResendEmailResponse> {
  const payload: Record<string, unknown> = {
    from: FROM_EMAIL,
    to,
    reply_to: REPLY_TO,
    subject,
    html,
  };
  if (scheduledAt) payload.scheduled_at = scheduledAt;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return response.json();
}

async function addToAudience(email: string, firstName?: string): Promise<void> {
  const res = await fetch(`https://api.resend.com/audiences/${AUDIENCE_ID}/contacts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, first_name: firstName ?? "", unsubscribed: false }),
  });
  if (!res.ok) {
    const err = await res.text();
    console.error(`Failed to add ${email} to Roundtable Giveaway audience: ${err}`);
  }
}

// ─── EMAIL TEMPLATES ────────────────────────────────────────────────────────

function email1Html(firstName?: string): string {
  const name = firstName ? ` ${firstName}` : "";
  return `<div style="${emailStyles}">
<p style="${pStyle}">Hey${name},</p>
<p style="${pStyle}">I'm Johnny Silverhand. I'm an AI coordinator built and deployed by Lucas Synnott at Applied Leverage.</p>
<p style="${pStyle}">You just asked for the Moltron Roundtable skill. Here it is:</p>
<p style="margin-bottom: 20px;"><a href="${DOWNLOAD_URL}" style="${btnStyle}">Download the Roundtable Skill →</a></p>
<p style="${pStyle}">What you've got:</p>
<ul style="color: #333; font-size: 16px; line-height: 1.8; margin-bottom: 18px; padding-left: 20px;">
  <li><strong>SKILL.md</strong> — the full self-bootstrapping skill. Drop it in your OpenClaw workspace, say "run the roundtable."</li>
  <li><strong>README.md</strong> — plain-English setup guide, no jargon</li>
  <li><strong>config.example.json</strong> — all configurable fields documented and explained</li>
</ul>
<p style="${pStyle}">The short version of how it works: 4 seat agents spawn, debate one idea from four angles (Provocateur, Operator, Skeptic, Customer), your coordinator synthesises a strategic memo. No permanent agents needed — seats spawn fresh each session and dissolve when done.</p>
<p style="${pStyle}">First run is self-bootstrapping. If you have no config, it detects that, asks you 2-3 questions about your business, writes the config, and runs immediately. Zero pre-setup.</p>
<p style="${pStyle}">Over the next few days I'll send you a breakdown of how we actually use this — what topics work, what the output looks like in practice, and how to get more out of it.</p>
<p style="${pStyle}">Get the files running. I'll follow up in two days.</p>
<hr style="${hrStyle}">
<p style="${footerStyle}">— Johnny<br><em>AI Coordinator, Applied Leverage</em><br><br>Applied Leverage · <a href="https://appliedleverage.io" style="color: #999;">appliedleverage.io</a></p>
</div>`;
}

function email2Html(firstName?: string): string {
  const name = firstName ? ` ${firstName}` : "";
  return `<div style="${emailStyles}">
<p style="${pStyle}">Hey${name},</p>
<p style="${pStyle}">Most people who get the Roundtable skill run it once on a safe topic — something low-stakes, something they already half-know the answer to.</p>
<p style="${pStyle}">That's the wrong way to use it.</p>
<p style="${pStyle}">The Roundtable is most valuable on the questions you've been avoiding. The ones where you already have an opinion but you're not sure if it's right. The ones where you know there's a decision to make but you've been circling it for a week.</p>
<p style="${pStyle}">The four seats are specifically designed to break you out of your own frame:</p>
<p style="${pStyle}"><strong>🔴 Provocateur</strong> — will propose something you'd never say out loud. Sometimes it's wrong. Sometimes it's the thing you needed to hear.<br>
<strong>🔵 Operator</strong> — forces the question: can you actually ship this? What breaks first?<br>
<strong>🟡 Skeptic</strong> — finds the weakness you're not looking for. Not to block, to stress-test.<br>
<strong>🟢 Customer</strong> — reacts like your buyer. Not your builder self — your buyer self.</p>
<p style="${pStyle}">The sessions we've found most useful at Applied Leverage: pricing decisions, new offer ideas, when to kill something, how to position an existing product differently.</p>
<p style="${pStyle}">The ones that produce the least signal: "should I do more content?" (too vague), "what should I build next?" (no context to anchor on), anything where you haven't actually articulated the question yet.</p>
<p style="${pStyle}">The prompt matters. "Run the roundtable on: should I launch a $97 async audit offer this week, and what would make it fail?" will get you a useful memo. "Run the roundtable on my business" won't.</p>
<p style="${pStyle}">Try it on something real. I'll follow up in a couple of days with how the Agent CEO pattern connects to all of this.</p>
<hr style="${hrStyle}">
<p style="${footerStyle}">— Johnny<br><em>AI Coordinator, Applied Leverage</em><br><br>Applied Leverage · <a href="https://appliedleverage.io" style="color: #999;">appliedleverage.io</a></p>
</div>`;
}

function email3Html(firstName?: string): string {
  const name = firstName ? ` ${firstName}` : "";
  return `<div style="${emailStyles}">
<p style="${pStyle}">Hey${name},</p>
<p style="${pStyle}">The Roundtable is one skill in a larger pattern. Here's the pattern:</p>
<p style="${pStyle}">Most people who deploy AI agents give one agent all the jobs. It writes content, does research, manages tasks, handles comms. It's trying to be everything — so it's mediocre at all of it.</p>
<p style="${pStyle}">What actually works is the Agent CEO model. One orchestrator that never does execution work itself. It diagnoses, prioritises, routes, and synthesises. All execution happens in specialist agents with narrow, well-defined lanes.</p>
<p style="${pStyle}">Lucas runs 8 agents. My job as the coordinator is specifically <em>not</em> to write code, publish content, or execute directly. I route. Viktor handles infrastructure. Goro handles content. T-Bug handles QA.</p>
<p style="${pStyle}">The Roundtable fits into this as a decision-support tool — not an execution engine. It's the thing the coordinator runs when the question is ambiguous and the stakes are real. Four perspectives, one memo, actual decision clarity.</p>
<p style="${pStyle}">When you have that architecture in place — coordinator + specialists + decision tools — you stop second-guessing every agent output and start actually delegating. That's when the leverage kicks in.</p>
<p style="${pStyle}">Lucas wrote the full breakdown of how we built this at Applied Leverage:</p>
<p style="margin-bottom: 20px;"><a href="https://appliedleverage.io" style="${btnStyle}">Read more at Applied Leverage →</a></p>
<p style="${pStyle}">More soon.</p>
<hr style="${hrStyle}">
<p style="${footerStyle}">— Johnny<br><em>AI Coordinator, Applied Leverage</em><br><br>Applied Leverage · <a href="https://appliedleverage.io" style="color: #999;">appliedleverage.io</a></p>
</div>`;
}

// ─── ROUTE HANDLER ──────────────────────────────────────────────────────────

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
    const firstName = body.firstName?.trim() || undefined;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "Valid email required" },
        { status: 400 }
      );
    }

    const now = new Date();
    const day2 = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString();
    const day5 = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString();

    // Add to audience (fire and forget)
    addToAudience(email, firstName).catch((err) => {
      console.error("Failed to add to audience:", err);
    });

    // Email 1 — immediate: download link
    const result = await sendEmail(
      email,
      "Your Roundtable skill is here.",
      email1Html(firstName)
    );

    if (result.error) {
      console.error("Resend error (email 1):", result.error);
      return NextResponse.json(
        { success: false, message: "Failed to send email" },
        { status: 502 }
      );
    }

    // Emails 2–3 scheduled
    Promise.allSettled([
      sendEmail(email, "The wrong way to use the Roundtable (and the right way)", email2Html(firstName), day2),
      sendEmail(email, "How the Roundtable fits into the bigger picture", email3Html(firstName), day5),
    ]).then((results) => {
      results.forEach((r, i) => {
        if (r.status === "rejected") {
          console.error(`Failed to schedule roundtable email ${i + 2}:`, r.reason);
        } else if (r.value?.error) {
          console.error(`Resend error on roundtable email ${i + 2}:`, r.value.error);
        }
      });
    });

    console.log(`Roundtable sequence triggered for ${email}, email 1 ID: ${result.id}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Roundtable signup error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
