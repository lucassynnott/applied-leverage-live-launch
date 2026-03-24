import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Moltron Roundtable — Free OpenClaw Skill | Applied Leverage",
  description:
    "A free OpenClaw skill that runs a live AI R&D council. 4 agent seats debate one bold idea, your coordinator synthesises a strategic memo. Drop it in and run.",
  alternates: {
    canonical: "https://appliedleverage.io/roundtable"
  },
  openGraph: {
    title: "Moltron Roundtable — Free OpenClaw Skill | Applied Leverage",
    description:
      "A free OpenClaw skill that runs a live AI R&D council. 4 agent seats debate one bold idea, your coordinator synthesises a strategic memo. Drop it in and run.",
    type: "website",
    url: "https://appliedleverage.io/roundtable",
  },
  twitter: {
    card: "summary_large_image",
    title: "Moltron Roundtable — Free OpenClaw Skill | Applied Leverage",
    description:
      "A free OpenClaw skill that runs a live AI R&D council. 4 agent seats debate one bold idea, your coordinator synthesises a strategic memo. Drop it in and run.",
  }
};

export default function RoundtablePage() {
  return (
    <main className="marketing-page marketing-page--roundtable">
      <section className="page-hero">
        <div className="hero-two-column">
          <div className="hero-two-column__left">
            <p className="eyebrow">Free skill</p>
            <h1 className="hero-title">
              Give your AI agents a boardroom.
            </h1>
            <p className="hero-subheadline">
              The Moltron Roundtable is a free OpenClaw skill that runs a live R&amp;D council.
              Four agent seats debate one bold idea. Your coordinator synthesises a strategic memo.
              Zero pre-configuration. Works in under 2 minutes.
            </p>
            <div className="hero-stats-bar">
              <article className="hero-metric">
                <span className="hero-metric__value">Free</span>
                <span className="hero-metric__label">no catch</span>
              </article>
              <article className="hero-metric">
                <span className="hero-metric__value">4 seats</span>
                <span className="hero-metric__label">spawn on demand</span>
              </article>
              <article className="hero-metric">
                <span className="hero-metric__value">&lt;2 min</span>
                <span className="hero-metric__label">to a decision memo</span>
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
                <p>Check your inbox — the download link is on its way.</p>
              </div>
              <div id="error-message" className="error-message" style={{ display: "none" }}>
                <p>Something went wrong. Try again or email lucas@appliedleverage.io directly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-band" id="what-it-is">
        <div className="page-band__header">
          <p className="eyebrow">What&apos;s inside</p>
          <h2>A self-bootstrapping skill you drop into any OpenClaw workspace.</h2>
        </div>
        <div className="card-grid card-grid--three">
          <article className="surface-card icon-card">
            <h3>SKILL.md</h3>
            <p>
              Full self-bootstrapping skill instructions. First run detects no config, asks
              2-3 questions about your business, writes config, and runs immediately.
            </p>
          </article>
          <article className="surface-card icon-card">
            <h3>README.md</h3>
            <p>
              Plain-English setup guide. No jargon. Covers install, first run,
              customising seat personas, and saving memos to Obsidian or Slack.
            </p>
          </article>
          <article className="surface-card icon-card">
            <h3>config.example.json</h3>
            <p>
              All configurable fields documented and explained. Seat agent IDs, business context,
              vault path, Slack channel. Change what you need, leave the rest.
            </p>
          </article>
        </div>
      </section>

      <section className="page-band" id="how-it-works">
        <div className="page-band__header">
          <p className="eyebrow">How it works</p>
          <h2>Four agents. One question. One memo.</h2>
        </div>
        <article className="narrative-card markdown">
          <p>
            You drop the skill folder into your OpenClaw workspace and say &quot;run the roundtable.&quot;
            That&apos;s the install and the first run in one step.
          </p>
          <p>
            Four seat agents spawn as one-shot instances — Provocateur, Operator, Skeptic, Customer.
            Each one takes a position on your question. Your coordinator agent reads all four responses
            and synthesises a strategic memo with the top 3 actions.
          </p>
          <p>
            The seats dissolve when the session ends. No permanent agents, no setup overhead.
            The rotating proposer seat means a different agent leads each session — you get
            different frames on the same problem over time.
          </p>
        </article>
      </section>

      <section className="page-band" id="the-seats">
        <div className="page-band__header">
          <p className="eyebrow">The 4 seats</p>
          <h2>Four angles on every decision.</h2>
        </div>
        <div className="card-grid card-grid--two">
          <article className="surface-card icon-card">
            <h3>🔴 Provocateur</h3>
            <p>
              Generates bold, non-obvious ideas. The one who says what others won&apos;t.
              Breaks anchoring bias on safe options.
            </p>
          </article>
          <article className="surface-card icon-card">
            <h3>🔵 Operator</h3>
            <p>
              Hard execution focus. Evaluates shippability, first steps, and hidden complexity.
              Forces the question: can you actually build this?
            </p>
          </article>
          <article className="surface-card icon-card">
            <h3>🟡 Skeptic</h3>
            <p>
              Analytical critic. Finds real weaknesses and failure modes before you ship.
              Not to block — to stress-test.
            </p>
          </article>
          <article className="surface-card icon-card">
            <h3>🟢 Customer</h3>
            <p>
              Voice of your ICP. Reacts like a buyer, not a builder. Catches the things
              that feel obvious internally and land wrong externally.
            </p>
          </article>
        </div>
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
            function handleFormSubmit(e) {
              e.preventDefault();
              var form = e.target;
              var email = form.querySelector('input[name="email"]').value;
              var submitBtn = form.querySelector('button[type="submit"]');
              var successMsg = document.getElementById('success-message');
              var errorMsg = document.getElementById('error-message');

              submitBtn.disabled = true;
              submitBtn.textContent = 'Sending...';

              fetch('/api/roundtable', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email })
              })
              .then(function(r) { return r.json(); })
              .then(function(data) {
                if (data.success) {
                  form.style.display = 'none';
                  if (successMsg) successMsg.style.display = 'block';
                  document.querySelectorAll('#roundtable-form-footer').forEach(function(f) {
                    f.innerHTML = '<p class="success-text">You already got the link. Check your inbox.</p>';
                  });
                } else {
                  if (errorMsg) errorMsg.style.display = 'block';
                  submitBtn.disabled = false;
                  submitBtn.textContent = 'Send me the skill';
                }
              })
              .catch(function() {
                if (errorMsg) errorMsg.style.display = 'block';
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send me the skill';
              });
            }

            document.getElementById('roundtable-form')?.addEventListener('submit', handleFormSubmit);
            document.getElementById('roundtable-form-footer')?.addEventListener('submit', handleFormSubmit);
          `
        }}
      />
    </main>
  );
}
