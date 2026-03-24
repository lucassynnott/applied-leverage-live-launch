import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Moltron Roundtable — Free OpenClaw Skill | Applied Leverage",
  description:
    "A free OpenClaw skill that runs a live AI R&D council. 4 agent seats debate one bold idea, your coordinator synthesises a strategic memo. Drop it in, run it instantly.",
  alternates: {
    canonical: "https://appliedleverage.io/roundtable"
  },
  openGraph: {
    title: "Moltron Roundtable — Free OpenClaw Skill | Applied Leverage",
    description:
      "A free OpenClaw skill that runs a live AI R&D council. 4 agent seats debate one bold idea, your coordinator synthesises a strategic memo.",
    type: "website",
    url: "https://appliedleverage.io/roundtable",
  },
  twitter: {
    card: "summary_large_image",
    title: "Moltron Roundtable — Free OpenClaw Skill | Applied Leverage",
    description:
      "A free OpenClaw skill that runs a live AI R&D council. 4 agent seats debate one bold idea, your coordinator synthesises a strategic memo.",
  }
};

export default function RoundtablePage() {
  return (
    <main className="marketing-page marketing-page--roundtable">
      <section className="page-hero">
        <div className="hero-two-column">
          <div className="hero-two-column__left">
            <p className="eyebrow">Free skill · Instant download</p>
            <h1 className="hero-title">
              Give your AI agents a war room.
            </h1>
            <p className="hero-subheadline">
              The Moltron Roundtable is a free OpenClaw skill that runs a live R&amp;D council —
              4 agent seats debate one bold idea, your coordinator synthesises a strategic memo.
              Drop it in your workspace. Say &quot;run the roundtable.&quot; Done.
            </p>
            <div className="hero-stats-bar">
              <article className="hero-metric">
                <span className="hero-metric__value">Free</span>
                <span className="hero-metric__label">no catch</span>
              </article>
              <article className="hero-metric">
                <span className="hero-metric__value">4 seats</span>
                <span className="hero-metric__label">Provocateur, Operator, Skeptic, Customer</span>
              </article>
              <article className="hero-metric">
                <span className="hero-metric__value">&lt;2 min</span>
                <span className="hero-metric__label">memo in hand</span>
              </article>
            </div>
          </div>
          <div className="hero-two-column__right">
            <div className="email-capture-card">
              <h3>Get the download link</h3>
              <form id="roundtable-form" className="email-form">
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    required
                    className="email-input"
                  />
                  <button type="submit" className="button button-primary">
                    Send me the skill
                  </button>
                </div>
                <p className="form-note">
                  By entering your email you agree it may be used to send you updates and useful content from Applied Leverage. We will never spam you or sell your data. Unsubscribe any time.
                </p>
              </form>
              <div id="success-message" className="success-message" style={{ display: "none" }}>
                <p>Check your inbox — the skill is on its way.</p>
              </div>
              <div id="error-message" className="error-message" style={{ display: "none" }}>
                <p>Something went wrong. Try again or email lucas@appliedleverage.io directly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-band" id="how-it-works">
        <div className="page-band__header">
          <p className="eyebrow">How it works</p>
          <h2>One skill. Zero setup. Strategic clarity in under 2 minutes.</h2>
        </div>
        <div className="card-grid card-grid--three">
          <article className="surface-card icon-card">
            <h3>1. Drop it in</h3>
            <p>
              Copy the skill folder into your OpenClaw workspace. That&apos;s the install.
              No config file required on first run.
            </p>
          </article>
          <article className="surface-card icon-card">
            <h3>2. Say &quot;run the roundtable&quot;</h3>
            <p>
              First run detects no config, pulls from your memory, asks 2-3 questions about
              your business goals, writes the config, and runs immediately.
            </p>
          </article>
          <article className="surface-card icon-card">
            <h3>3. Get your memo</h3>
            <p>
              4 seat agents spawn, debate, and dissolve. Your coordinator synthesises a
              strategic memo with top 3 actions.
            </p>
          </article>
        </div>
      </section>

      <section className="page-band" id="the-seats">
        <div className="page-band__header">
          <p className="eyebrow">The 4 seats</p>
          <h2>Every angle covered. Every session fresh.</h2>
        </div>
        <div className="card-grid card-grid--two">
          <article className="surface-card icon-card">
            <h3>🔴 Provocateur</h3>
            <p>Generates bold, non-obvious ideas. The one who says what others won&apos;t.</p>
          </article>
          <article className="surface-card icon-card">
            <h3>🔵 Operator</h3>
            <p>Hard execution focus. Evaluates shippability, first steps, hidden complexity.</p>
          </article>
          <article className="surface-card icon-card">
            <h3>🟡 Skeptic</h3>
            <p>Analytical critic. Finds real weaknesses and failure modes before you ship.</p>
          </article>
          <article className="surface-card icon-card">
            <h3>🟢 Customer</h3>
            <p>Voice of your ICP. Reacts like a buyer, not a builder.</p>
          </article>
        </div>
        <article className="narrative-card markdown" style={{ marginTop: "2rem" }}>
          <p>
            Seats spawn as one-shot agents per session — no permanent agents, no pre-configuration.
            The coordinator (your main agent) synthesises the debate into a memo with clear decisions
            and next steps.
          </p>
        </article>
      </section>

      <section className="page-band" id="whats-inside">
        <div className="page-band__header">
          <p className="eyebrow">What&apos;s inside</p>
          <h2>A complete, self-bootstrapping skill you can drop into any OpenClaw workspace.</h2>
        </div>
        <div className="card-grid card-grid--three">
          <article className="surface-card icon-card">
            <h3>SKILL.md</h3>
            <p>
              Full self-bootstrapping skill instructions. Detects no config, asks 2-3 questions,
              writes your setup, runs immediately.
            </p>
          </article>
          <article className="surface-card icon-card">
            <h3>README.md</h3>
            <p>
              Plain-English setup guide. No jargon, no prerequisites. Copy folder, start talking.
            </p>
          </article>
          <article className="surface-card icon-card">
            <h3>config.example.json</h3>
            <p>
              All configurable fields documented. Agent IDs, business context, Slack channel,
              vault path — everything optional.
            </p>
          </article>
        </div>
      </section>

      <section className="page-band" id="sample-output">
        <div className="page-band__header">
          <p className="eyebrow">Sample output</p>
          <h2>What a session memo looks like.</h2>
        </div>
        <article className="narrative-card markdown">
          <pre style={{ whiteSpace: "pre-wrap", fontSize: "0.85rem", lineHeight: "1.6", overflowX: "auto" }}>{`# 🧠 R&D Council — Session #3
2026-03-24 09:00 | morning | Proposer: 🔴 Provocateur

## 💡 The Idea
Launch a "one-hour agency audit" as a $97 async offer — founder records
a 10-min Loom walkthrough, agent fleet diagnoses bottlenecks, delivers
a written report with 3 immediate actions.

🔵 Operator: Shippable in 48h. First constraint is intake form UX.

🟡 Skeptic: Who decides the 3 actions are right? Needs at least one
sync touchpoint or the report feels generic.

🟢 Customer: I'd pay $97 for a diagnosis that doesn't require an hour
of my time. Price it at $147 and it signals seriousness.

## 📋 Strategic Memo
The async audit idea is sound. The risk isn't execution — it's trust.

Top 3 Actions:
1. Build intake form this week (30 min, Tally + Notion)
2. Run 2 beta audits free, collect testimonials
3. Launch at $147 with a 48h turnaround guarantee`}</pre>
        </article>
      </section>

      <section className="page-band page-band--cta" id="get-it">
        <div className="page-band__header">
          <p className="eyebrow">Free download</p>
          <h2>Get the Moltron Roundtable skill.</h2>
        </div>
        <div className="email-capture-card">
          <form id="roundtable-form-footer" className="email-form">
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                required
                className="email-input"
              />
              <button type="submit" className="button button-primary">
                Send me the skill
              </button>
            </div>
            <p className="form-note">
              By entering your email you agree it may be used to send you updates and useful content from Applied Leverage. We will never spam you or sell your data. Unsubscribe any time.
            </p>
          </form>
        </div>
      </section>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            function handleRoundtableSubmit(e) {
              e.preventDefault();
              const form = e.target;
              const email = form.querySelector('input[name="email"]').value;
              const submitBtn = form.querySelector('button[type="submit"]');
              const successMsg = document.getElementById('success-message');
              const errorMsg = document.getElementById('error-message');

              submitBtn.disabled = true;
              submitBtn.textContent = 'Sending...';

              fetch('/api/roundtable', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
              })
              .then(r => r.json())
              .then(data => {
                if (data.success) {
                  form.style.display = 'none';
                  if (successMsg) successMsg.style.display = 'block';
                  document.querySelectorAll('#roundtable-form-footer').forEach(f => {
                    f.innerHTML = '<p class="success-text">Check your inbox — the skill is on its way.</p>';
                  });
                } else {
                  if (errorMsg) errorMsg.style.display = 'block';
                  submitBtn.disabled = false;
                  submitBtn.textContent = 'Send me the skill';
                }
              })
              .catch(() => {
                if (errorMsg) errorMsg.style.display = 'block';
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send me the skill';
              });
            }

            document.getElementById('roundtable-form')?.addEventListener('submit', handleRoundtableSubmit);
            document.getElementById('roundtable-form-footer')?.addEventListener('submit', handleRoundtableSubmit);
          `
        }}
      />
    </main>
  );
}
