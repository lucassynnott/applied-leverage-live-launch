import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "30 AI Prompts for Client Reporting | Applied Leverage",
  description:
    "Turn raw data into polished client reports in minutes. 30 plug-and-play prompts for agency owners.",
  alternates: {
    canonical: "https://appliedleverage.io/client-reporting-prompts"
  },
  openGraph: {
    title: "30 AI Prompts for Client Reporting | Applied Leverage",
    description: "Turn raw data into polished client reports in minutes. 30 prompts, ready to use.",
    type: "website",
    url: "https://appliedleverage.io/client-reporting-prompts"
  },
};

const checkoutUrl = "https://buy.stripe.com/dRm5kFdaG5Ax1sG84T2ZO09";

const items = [
  "30 prompts organized by report type — executive summaries, channel performance, insights, goal tracking, and communication",
  "5 prompts specifically for executive summaries — never start a report with a blank page again",
  "6 channel performance prompts covering ads, SEO, social, email, and multi-channel rollups",
  "A prompt to explain underperformance without losing client confidence",
  "The Plain English Translator — removes jargon from any report section instantly",
  "A final QA prompt that catches vague claims before they reach your client",
  "Lifetime access — use forever, share with your team",
];

const forWho = [
  "Agency owners spending 2+ hours on client reports every week",
  "Account managers who hate writing and love data",
  "Consultants who want to look sharper without taking longer",
  "Anyone who has ever sent a report and thought it could have been better",
];

export default function ClientReportingPromptsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#e8e8e8]">
      <div className="max-w-3xl mx-auto px-6 py-20">

        <div className="mb-4">
          <span className="inline-block bg-[#1e1b4b] text-[#a78bfa] text-xs font-bold px-3 py-1 rounded uppercase tracking-wider">
            Prompt Pack
          </span>
        </div>
        <h1 className="text-4xl font-extrabold text-white leading-tight mb-4">
          30 AI Prompts for<br />Client Reporting
        </h1>
        <p className="text-xl text-[#9ca3af] mb-4">
          Stop spending two hours writing reports a client reads in two minutes.
          These 30 prompts turn raw data into polished, client-ready narratives — in minutes.
        </p>
        <p className="text-[#6b7280] text-sm mb-12">
          Built for agency owners running on Claude, ChatGPT, or any AI assistant. Works immediately. No setup.
        </p>

        <div className="bg-[#111] border border-[#222] rounded-xl p-8 mb-10">
          <h2 className="text-white font-bold text-lg mb-6">What you get ($37)</h2>
          <ul className="space-y-3">
            {items.map((item, i) => (
              <li key={i} className="flex gap-3 text-[#d1d5db] text-sm">
                <span className="text-[#7c3aed] font-bold mt-0.5 shrink-0">✓</span>
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

        <div className="bg-[#111] border border-[#7c3aed] rounded-xl p-8 mb-8 text-center">
          <div className="text-4xl font-extrabold text-white mb-2">$37</div>
          <div className="text-[#9ca3af] text-sm mb-6">One-time. Instant access. Lifetime updates.</div>
          <a
            href={checkoutUrl}
            className="block w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors"
          >
            Get the 30 prompts — $37
          </a>
          <p className="text-[#6b7280] text-xs mt-4">
            Delivered immediately. Use in Claude, ChatGPT, or any AI assistant.
          </p>
        </div>

        <p className="text-center text-[#4b5563] text-sm">
          <Link href="/" className="text-[#7c3aed] hover:underline">appliedleverage.io</Link>
          {" · "}
          Questions?{" "}
          <a href="mailto:lucas@appliedleverage.io" className="text-[#7c3aed] hover:underline">
            lucas@appliedleverage.io
          </a>
        </p>
      </div>
    </main>
  );
}
