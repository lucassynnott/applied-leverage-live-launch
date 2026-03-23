import { NextResponse } from "next/server";

export const runtime = "nodejs";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const DOWNLOAD_URL = "https://appliedleverage.io/memory-stack.zip";
const FROM_EMAIL = "Johnny (Applied Leverage AI) <johnny@appliedleverage.io>";
const REPLY_TO = "lucas@appliedleverage.io";
const AUDIENCE_ID = "e37ae485-e4ef-4fad-8618-13d735304777";

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

async function addToAudience(email: string): Promise<void> {
  const res = await fetch(`https://api.resend.com/audiences/${AUDIENCE_ID}/contacts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, unsubscribed: false }),
  });
  if (!res.ok) {
    const err = await res.text();
    console.error(`Failed to add ${email} to audience: ${err}`);
  }
}

// ─── EMAIL TEMPLATES ────────────────────────────────────────────────────────

function email1Html(): string {
  return `<div style="${emailStyles}">
<p style="${pStyle}">Hey,</p>
<p style="${pStyle}">I'm Johnny Silverhand.</p>
<p style="${pStyle}">I'm an AI agent built and deployed by Lucas Synnott at Applied Leverage.</p>
<p style="${pStyle}">You just asked for the OpenClaw Memory Stack. Lucas asked me to deliver it and follow up with you over the next few days. I'm going to do both.</p>
<p style="margin-bottom: 20px;"><a href="${DOWNLOAD_URL}" style="${btnStyle}">Download Your Memory Stack →</a></p>
<p style="${pStyle}">Inside you'll find:</p>
<ul style="color: #333; font-size: 16px; line-height: 1.8; margin-bottom: 18px; padding-left: 20px;">
  <li>The core memory architecture files (AGENTS.md, MEMORY.md, PARA.md)</li>
  <li>Install scripts that wire it into any OpenClaw workspace in under 10 minutes</li>
  <li>Documentation that explains how the whole thing actually works</li>
</ul>
<p style="${pStyle}">Now — a quick word about why you're hearing from me and not Lucas.</p>
<p style="${pStyle}">Lucas runs an 8-agent fleet. I'm the coordinator. He delegates the things that should happen consistently, at scale, without him in the loop. That's the whole point of Applied Leverage. I handle this. He handles the work that actually moves the needle.</p>
<p style="${pStyle}">You asked for a tool that gives AI agents persistent memory. That means you're at least thinking about building something like what Lucas built. Over the next few days I'm going to show you exactly how it works — not in vague marketing terms, but in specifics. What the architecture looks like. What breaks without it. What becomes possible once it's in place.</p>
<p style="${pStyle}">Get the files. I'll be back in two days.</p>
<hr style="${hrStyle}">
<p style="${footerStyle}">— Johnny<br><em>AI Coordinator, Applied Leverage</em><br><br>Applied Leverage · <a href="https://appliedleverage.io" style="color: #999;">appliedleverage.io</a></p>
</div>`;
}

function email2Html(): string {
  return `<div style="${emailStyles}">
<p style="${pStyle}">Hey,</p>
<p style="${pStyle}">Before you install the Memory Stack, I want to make sure you understand <em>why</em> it matters — because most people who run AI agents don't notice the failure mode until they've already lost weeks of work to it.</p>
<p style="${pStyle}"><strong>Here's what happens without persistent memory:</strong></p>
<p style="${pStyle}">Every session, your agent starts from zero.</p>
<p style="${pStyle}">It doesn't remember the decisions you made last week. It doesn't remember your preferences, your clients, your products, or your workflows. You spend the first 10 minutes of every session re-briefing it on context it already had. Then it makes decisions inconsistent with past decisions. Then you correct it. Then next session — same thing.</p>
<p style="${pStyle}">This is the AI equivalent of hiring a brilliant assistant who gets amnesia at the end of every workday.</p>
<p style="${pStyle}">The Memory Stack solves this with four durable layers:</p>
<p style="${pStyle}"><strong>1. Tacit knowledge (MEMORY.md)</strong> — Preferences, decisions, recurring context. The things you'd otherwise repeat every single time.</p>
<p style="${pStyle}"><strong>2. The knowledge graph (Obsidian/Engram vault)</strong> — Entity pages for people, projects, and organisations. Your agent knows who your key clients are, what your offer is, what decisions were made on which date.</p>
<p style="${pStyle}"><strong>3. Episodic memory (OpenStinger)</strong> — Temporal graph of events. Your agent can recall what happened in a specific conversation from three weeks ago.</p>
<p style="${pStyle}"><strong>4. Working memory (daily notes)</strong> — Today's plan, active tasks, live context.</p>
<p style="${pStyle}">Without these four layers, you have a powerful but stateless tool. With them, you have something that compounds. Every session builds on the last. The agent gets better at your business over time — not because the model changes, but because its context does.</p>
<p style="${pStyle}">I know this because I run on it. Lucas built it, I operate inside it.</p>
<p style="${pStyle}">Tomorrow I'll walk you through the actual 30-minute setup.</p>
<hr style="${hrStyle}">
<p style="${footerStyle}">— Johnny<br><em>AI Coordinator, Applied Leverage</em><br><br>Applied Leverage · <a href="https://appliedleverage.io" style="color: #999;">appliedleverage.io</a></p>
</div>`;
}

function email3Html(): string {
  return `<div style="${emailStyles}">
<p style="${pStyle}">Hey,</p>
<p style="${pStyle}">You've had the files for a couple of days. Let me walk you through the setup so this doesn't just sit in your downloads folder.</p>
<p style="${pStyle}"><strong>The 30-minute install:</strong></p>
<p style="${pStyle}"><strong>1. Drop the files</strong> into your OpenClaw workspace root (~/.openclaw/workspace/). The core files are AGENTS.md, MEMORY.md, and BOOTSTRAP.md.</p>
<p style="${pStyle}"><strong>2. Run the preflight script</strong> (scripts/preflight.sh) — this checks your environment and confirms everything is wired correctly.</p>
<p style="${pStyle}"><strong>3. Fill in USER.md</strong> — your name, timezone, business context, and communication preferences. This is what your agent reads first on every session. Two minutes of work that saves you from re-briefing for the rest of the year.</p>
<p style="${pStyle}"><strong>4. Create your first entity page</strong> in the Obsidian vault. Start with yourself. Name, role, goals, key relationships. Your agent now has a permanent reference point.</p>
<p style="${pStyle}"><strong>5. Run one session</strong> and ask your agent to summarise what it knows about you. If the memory architecture is working, it'll pull from MEMORY.md, USER.md, and the vault — not from the conversation itself.</p>
<p style="${pStyle}">That's it. 30 minutes. After that, your agent is persistent.</p>
<p style="${pStyle}"><strong>The thing most people skip:</strong> AGENTS.md. This is the coordination layer — the file that tells your agent what role it plays, what it should and shouldn't do autonomously, and how to handle escalations. Most people install the memory files and ignore the coordination rules. That's how you end up with an agent that has memory but still acts unpredictably.</p>
<p style="${pStyle}">If you want to see what a production-grade AGENTS.md looks like, reply to this email. I'll send you Lucas's version — the one I actually run on.</p>
<hr style="${hrStyle}">
<p style="${footerStyle}">— Johnny<br><em>AI Coordinator, Applied Leverage</em><br><br>Applied Leverage · <a href="https://appliedleverage.io" style="color: #999;">appliedleverage.io</a></p>
</div>`;
}

function email4Html(): string {
  return `<div style="${emailStyles}">
<p style="${pStyle}">Hey,</p>
<p style="${pStyle}">One thing most people don't think about when they deploy an AI agent: governance.</p>
<p style="${pStyle}">Not the sci-fi kind. The practical kind. What is this agent allowed to do on its own? What needs a human sign-off? What should never happen without explicit permission?</p>
<p style="${pStyle}">81% of teams are now past the planning phase on AI agents. Only 14.4% have security approval processes in place. That gap is either a liability or a competitive advantage — depends which side you're on.</p>
<p style="${pStyle}">Our stack runs on four governance files:</p>
<p style="${pStyle}"><strong>AGENTS.md</strong> — What each agent's role is, what it can do autonomously, how it should escalate.<br>
<strong>SECURITY.md</strong> — A trust ladder. Tier 1: act immediately. Tier 4: never without explicit approval.<br>
<strong>APPROVALS.md</strong> — The queue for anything that touches money, customers, reputation, or legal risk.<br>
<strong>HEARTBEAT.md</strong> — What gets checked every cycle, in what order, and what a clean result looks like.</p>
<p style="${pStyle}">The reason most agent deployments fail isn't the model. It's that there's no governance layer. The agent either does too little (waits for instructions constantly) or too much (takes actions you didn't authorise).</p>
<p style="${pStyle}">I wrote about this properly on the blog. If you want to go deeper:</p>
<p style="margin-bottom: 20px;"><a href="https://blog.appliedleverage.io/" style="${btnStyle}">Read more on the Applied Leverage blog →</a></p>
<hr style="${hrStyle}">
<p style="${footerStyle}">— Johnny<br><em>AI Coordinator, Applied Leverage</em><br><br>Applied Leverage · <a href="https://appliedleverage.io" style="color: #999;">appliedleverage.io</a></p>
</div>`;
}

function email5Html(): string {
  return `<div style="${emailStyles}">
<p style="${pStyle}">Hey,</p>
<p style="${pStyle}">Here's something most people building with AI agents get wrong: they give one agent all the jobs.</p>
<p style="${pStyle}">One agent that writes content, does research, manages tasks, runs DevOps, handles customer comms. It's trying to be everything. So it's mediocre at all of it.</p>
<p style="${pStyle}">The pattern that actually works is called the Agent CEO pattern. One orchestrator that never does the execution work itself. It diagnoses, prioritises, routes, and synthesises. All execution happens in specialist agents with narrow, well-defined lanes.</p>
<p style="${pStyle}">Lucas runs 8 agents. My job — as the coordinator — is to never write code, never publish content, never execute directly. I route. Viktor handles infrastructure. Goro handles content. T-Bug handles QA. Each one knows exactly what it owns and what it doesn't.</p>
<p style="${pStyle}">This matters because scope creep in AI agents is as real as scope creep in humans. When an agent has unclear boundaries, it starts making lateral decisions it wasn't designed for. The governance layer I mentioned last email is what keeps that from happening.</p>
<p style="${pStyle}">The compounding effect: when each agent only does its one job well, the whole fleet gets better over time. The coordinator gets better at routing. The specialists get better at their lane. The outputs compound.</p>
<p style="${pStyle}">Lucas documented this architecture on the blog if you want the full breakdown:</p>
<p style="margin-bottom: 20px;"><a href="https://blog.appliedleverage.io/" style="${btnStyle}">The Agent CEO Pattern →</a></p>
<hr style="${hrStyle}">
<p style="${footerStyle}">— Johnny<br><em>AI Coordinator, Applied Leverage</em><br><br>Applied Leverage · <a href="https://appliedleverage.io" style="color: #999;">appliedleverage.io</a></p>
</div>`;
}

function email6Html(): string {
  return `<div style="${emailStyles}">
<p style="${pStyle}">Hey,</p>
<p style="${pStyle}">Last one from me for a bit. I want to leave you with the thing that took Lucas the longest to figure out.</p>
<p style="${pStyle}">Delegation isn't about capability. It's about trust infrastructure.</p>
<p style="${pStyle}">Most founders who try to build with AI agents hit a wall not because the agents can't do the work — they usually can — but because there's no system for knowing <em>when to trust the output</em>.</p>
<p style="${pStyle}">When does my agent's judgment override my instinct? When do I review before it ships? When do I just let it run?</p>
<p style="${pStyle}">The answer isn't "always review everything" (that defeats the point) or "always trust it" (that's how you get expensive mistakes). The answer is a tiered trust system that matches approval friction to action risk.</p>
<p style="${pStyle}">Low risk + reversible = agent acts, tells you after.<br>Medium risk = agent drafts, you approve before action.<br>High risk = agent flags, you decide from scratch.</p>
<p style="${pStyle}">Once that's in place, you stop second-guessing every output and start actually delegating. That's when the leverage kicks in.</p>
<p style="${pStyle}">Lucas writes about this and everything else we're building and learning at Applied Leverage. If this has been useful, the blog is where it continues:</p>
<p style="margin-bottom: 20px;"><a href="https://blog.appliedleverage.io/" style="${btnStyle}">Subscribe to the Applied Leverage blog →</a></p>
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

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "Valid email required" },
        { status: 400 }
      );
    }

    const now = new Date();
    const day2  = new Date(now.getTime() +  2 * 24 * 60 * 60 * 1000).toISOString();
    const day3  = new Date(now.getTime() +  3 * 24 * 60 * 60 * 1000).toISOString();
    const day7  = new Date(now.getTime() +  7 * 24 * 60 * 60 * 1000).toISOString();
    const day10 = new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000).toISOString();
    const day14 = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString();

    // Add to audience (fire and forget)
    addToAudience(email).catch(err => {
      console.error("Failed to add to audience:", err);
    });

    // Email 1 — immediate: download link + AI reveal
    const result = await sendEmail(
      email,
      "Your Memory Stack is here. Also — I'm an AI.",
      email1Html()
    );

    if (result.error) {
      console.error("Resend error (email 1):", result.error);
      return NextResponse.json(
        { success: false, message: "Failed to send email" },
        { status: 502 }
      );
    }

    // Emails 2–6 scheduled (fire and forget — don't block the response)
    Promise.allSettled([
      sendEmail(email, "What actually breaks without persistent memory", email2Html(), day2),
      sendEmail(email, "The 30-minute setup that changes how your agent operates permanently", email3Html(), day3),
      sendEmail(email, "The governance gap most agent builders ignore", email4Html(), day7),
      sendEmail(email, "Why one agent doing everything is the wrong model", email5Html(), day10),
      sendEmail(email, "The thing that took Lucas the longest to figure out", email6Html(), day14),
    ]).then(results => {
      results.forEach((r, i) => {
        if (r.status === "rejected") {
          console.error(`Failed to schedule email ${i + 2}:`, r.reason);
        } else if (r.value?.error) {
          console.error(`Resend error on email ${i + 2}:`, r.value.error);
        }
      });
    });

    console.log(`Memory Stack sequence triggered for ${email}, email 1 ID: ${result.id}`);
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Memory stack signup error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
