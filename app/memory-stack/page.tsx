import type { Metadata } from "next";

const socialImage = "https://appliedleverage.io/og/memory-stack.png";

export const metadata: Metadata = {
  title: "OpenClaw Memory Stack — Free Download | Applied Leverage",
  description:
    "A complete memory system template for OpenClaw agents. Templates, scripts, and docs to make your AI assistant remember context across sessions.",
  alternates: {
    canonical: "https://appliedleverage.io/memory-stack"
  },
  openGraph: {
    title: "OpenClaw Memory Stack — Free Download | Applied Leverage",
    description:
      "A complete memory system template for OpenClaw agents. Templates, scripts, and docs to make your AI assistant remember context across sessions.",
    type: "website",
    url: "https://appliedleverage.io/memory-stack",
    images: [
      {
        url: socialImage,
        alt: "OpenClaw Memory Stack"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenClaw Memory Stack — Free Download | Applied Leverage",
    description:
      "A complete memory system template for OpenClaw agents. Templates, scripts, and docs to make your AI assistant remember context across sessions.",
    images: [socialImage]
  }
};

export default function MemoryStackPage() {
  return (
    <main className="marketing-page marketing-page--memory-stack">
      <section className="page-hero">
        <div className="hero-two-column">
          <div className="hero-two-column__left">
            <p className="eyebrow">Free resource</p>
            <h1 className="hero-title">
              Make your AI assistant actually remember things.
            </h1>
            <p className="hero-subheadline">
              The OpenClaw Memory Stack is a plug-and-play template system that gives your AI
              assistant persistent memory across sessions. No more repeating yourself every conversation.
            </p>
            <div className="hero-stats-bar">
              <article className="hero-metric">
                <span className="hero-metric__value">Free</span>
                <span className="hero-metric__label">no catch</span>
              </article>
              <article className="hero-metric">
                <span className="hero-metric__value">22 files</span>
                <span className="hero-metric__label">templates, scripts, docs</span>
              </article>
              <article className="hero-metric">
                <span className="hero-metric__value">5 min</span>
                <span className="hero-metric__label">to install</span>
              </article>
            </div>
          </div>
          <div className="hero-two-column__right">
            <div className="email-capture-card">
              <h3>Get the download link</h3>
              <form id="memory-stack-form" className="email-form">
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    required
                    className="email-input"
                  />
                  <button type="submit" className="button button-primary">
                    Send me the link
                  </button>
                </div>
                <p className="form-note">
                  I&apos;ll email you the download link. No spam, ever.
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
          <h2>A complete memory system you can drop into any OpenClaw workspace.</h2>
        </div>
        <div className="card-grid card-grid--three">
          <article className="surface-card icon-card">
            <h3>Templates</h3>
            <p>
              Ready-to-use files for AGENTS.md, MEMORY.md, PARA.md, and WORKSPACE_MEMORY_SYSTEM.md.
              Drop them in and your agent has context structure.
            </p>
          </article>
          <article className="surface-card icon-card">
            <h3>Scripts</h3>
            <p>
              Preflight checks, package builder, and apply scripts. Install the whole stack with
              one command.
            </p>
          </article>
          <article className="surface-card icon-card">
            <h3>Docs</h3>
            <p>
              Full README, install prompt, research notes, and config snippets. You&apos;ll know
              exactly how each piece fits.
            </p>
          </article>
        </div>
      </section>

      <section className="page-band" id="why-it-matters">
        <div className="page-band__header">
          <p className="eyebrow">Why this matters</p>
          <h2>Most AI assistants forget everything between conversations.</h2>
        </div>
        <article className="narrative-card markdown">
          <p>
            You tell them your preferences, your business context, your decisions — and then
            you repeat yourself next time. It&apos;s exhausting.
          </p>
          <p>
            The Memory Stack fixes that. It gives your agent a structured place to store and
            retrieve what matters: user preferences, business facts, past decisions, and
            daily context. Every conversation builds on the last.
          </p>
          <p>
            This is the same system I use in my own OpenClaw workspace. It&apos;s battle-tested
            and deliberately simple.
          </p>
        </article>
      </section>

      <section className="page-band" id="who-its-for">
        <div className="page-band__header">
          <p className="eyebrow">Who it&apos;s for</p>
          <h2>Operators who use OpenClaw and are tired of repeating themselves.</h2>
        </div>
        <div className="card-grid card-grid--two">
          <article className="surface-card icon-card">
            <h3>You&apos;ll get value if you…</h3>
            <ul>
              <li>Use OpenClaw daily for work</li>
              <li>Find yourself re-explaining context constantly</li>
              <li>Want your agent to remember decisions, not just execute tasks</li>
            </ul>
          </article>
          <article className="surface-card icon-card">
            <h3>Skip this if you…</h3>
            <ul>
              <li>Don&apos;t use OpenClaw yet</li>
              <li>Prefer starting from scratch</li>
              <li>Already have a memory system that works</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="page-band page-band--cta" id="get-it">
        <div className="page-band__header">
          <p className="eyebrow">Free download</p>
          <h2>Get the OpenClaw Memory Stack.</h2>
        </div>
        <div className="email-capture-card">
          <form id="memory-stack-form-footer" className="email-form">
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                required
                className="email-input"
              />
              <button type="submit" className="button button-primary">
                Send me the link
              </button>
            </div>
            <p className="form-note">No spam. Just the download link.</p>
          </form>
        </div>
      </section>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            function handleFormSubmit(e) {
              e.preventDefault();
              const form = e.target;
              const email = form.querySelector('input[name="email"]').value;
              const submitBtn = form.querySelector('button[type="submit"]');
              const successMsg = document.getElementById('success-message');
              const errorMsg = document.getElementById('error-message');

              submitBtn.disabled = true;
              submitBtn.textContent = 'Sending...';

              fetch('/api/memory-stack', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
              })
              .then(r => r.json())
              .then(data => {
                if (data.success) {
                  form.style.display = 'none';
                  if (successMsg) successMsg.style.display = 'block';
                  document.querySelectorAll('#memory-stack-form-footer').forEach(f => {
                    f.innerHTML = '<p class="success-text">You already got the link. Check your inbox.</p>';
                  });
                } else {
                  if (errorMsg) errorMsg.style.display = 'block';
                  submitBtn.disabled = false;
                  submitBtn.textContent = 'Send me the link';
                }
              })
              .catch(() => {
                if (errorMsg) errorMsg.style.display = 'block';
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send me the link';
              });
            }

            document.getElementById('memory-stack-form')?.addEventListener('submit', handleFormSubmit);
            document.getElementById('memory-stack-form-footer')?.addEventListener('submit', handleFormSubmit);
          `
        }}
      />
    </main>
  );
}
