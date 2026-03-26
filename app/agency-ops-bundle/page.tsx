import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Agency Ops Starter Bundle | Applied Leverage",
  description:
    "The essential templates and systems to get your agency operations running smoothly — client intake, project tracking, and weekly reporting.",
  alternates: {
    canonical: "https://appliedleverage.io/agency-ops-bundle"
  },
  openGraph: {
    title: "Agency Ops Starter Bundle | Applied Leverage",
    description: "Essential agency ops templates. Get your operations running smoothly.",
    type: "website",
    url: "https://appliedleverage.io/agency-ops-bundle"
  },
};

const checkoutUrl = "https://buy.stripe.com/00w9AV6Mi8MJb3g4SH2ZO0c";

const items = [
  "Client Intake Form Template — capture everything you need upfront, every time",
  "Project Tracker System — track deliverables, deadlines, and status in one place",
  "Weekly Reporting Template — automate client updates with a consistent format",
  "Onboarding Checklist — the first 48 hours of every new client engagement, documented",
  "Task Priority Matrix — stop firefighting, start working on what moves the needle",
  "Agency Ops Quick-Start Guide — how to implement these systems in under 2 hours",
];

const forWho = [
  "Solo agency owners drowning in client chaos",
  "Small agencies ready to professionalize their operations",
  "Anyone who's tired of scrambling to remember what each client needs",
  "Teams preparing to hire their first ops person",
];

export default function AgencyOpsBundlePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#e8e8e8]">
      <div className="max-w-3xl mx-auto px-6 py-20">

        <div className="mb-4">
          <span className="inline-block bg-[#1e3a5f] text-[#60a5fa] text-xs font-bold px-3 py-1 rounded uppercase tracking-wider">
            Starter Bundle
          </span>
        </div>
        <h1 className="text-4xl font-extrabold text-white leading-tight mb-4">
          Agency Ops Starter Bundle
        </h1>
        <p className="text-xl text-[#9ca3af] mb-4">
          Your agency is growing, but your operations are still held together with 
          spreadsheets and memory. Every new client feels like starting from scratch.
        </p>
        <p className="text-xl text-[#9ca3af] mb-10">
          This bundle fixes that — the essential templates and systems to get your 
          agency operations running smoothly, without the overhead.
        </p>
        <p className="text-[#6b7280] text-sm mb-12">
          Designed for agencies with 1–5 people who know they need better systems 
          but don't have time to build them from scratch.
        </p>

        <div className="bg-[#111] border border-[#222] rounded-xl p-8 mb-10">
          <h2 className="text-white font-bold text-lg mb-6">{"What's in the bundle"}</h2>
          <ul className="space-y-3">
            {items.map((item, i) => (
              <li key={i} className="flex gap-3 text-[#d1d5db] text-sm">
                <span className="text-[#60a5fa] font-bold mt-0.5 shrink-0">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-10">
          <h2 className="text-white font-bold text-lg mb-4">Who this is for</h2>
          <ul className="space-y-2 text-[#9ca3af] text-sm">
            {forWho.map((item, i) => (
              <li key={i}>→ {item}</li>
            ))}
          </ul>
        </div>

        <div className="bg-[#111] border border-[#60a5fa] rounded-xl p-8 mb-8 text-center">
          <div className="text-4xl font-extrabold text-white mb-2">£7</div>
          <div className="text-[#9ca3af] text-sm mb-6">One-time. Instant access. Lifetime updates.</div>
          <a
            href={checkoutUrl}
            className="block w-full bg-[#60a5fa] hover:bg-[#3b82f6] text-[#0a0a0a] font-bold py-4 px-8 rounded-lg text-lg transition-colors"
          >
            Get the bundle — £7
          </a>
          <p className="text-[#6b7280] text-xs mt-4">
            Delivered immediately. Works in Notion, Google Sheets, or any tool your team uses.
          </p>
        </div>

        <div className="bg-[#111] border border-[#222] rounded-xl p-6 mb-10">
          <h2 className="text-white font-bold text-lg mb-3">What people are saying</h2>
          <blockquote className="text-[#9ca3af] text-sm italic mb-2">
            "Finally got my client intake sorted. No more 'oh I forgot to ask for that' moments."
          </blockquote>
          <cite className="text-[#6b7280] text-xs">— Early adopter</cite>
        </div>

        <p className="text-center text-[#4b5563] text-sm">
          <Link href="/" className="text-[#60a5fa] hover:underline">appliedleverage.io</Link>
          {" · "}
          <a href="mailto:lucas@appliedleverage.io" className="text-[#60a5fa] hover:underline">
            lucas@appliedleverage.io
          </a>
        </p>
      </div>
    </main>
  );
}
