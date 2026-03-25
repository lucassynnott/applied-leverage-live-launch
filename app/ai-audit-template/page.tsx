import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Done-for-You AI Readiness Audit Template | Applied Leverage",
  description:
    "Deliver a polished AI readiness audit to any client. Complete editable template with 6-dimension scoring, deep dive sections, and AI prompts to fill it in 90 minutes.",
  alternates: {
    canonical: "https://appliedleverage.io/ai-audit-template"
  },
  openGraph: {
    title: "Done-for-You AI Readiness Audit Template | Applied Leverage",
    description:
      "Stop building audits from scratch. Score any client AI readiness in 90 minutes and deliver a report they will actually value.",
    type: "website",
    url: "https://appliedleverage.io/ai-audit-template"
  },
};

const checkoutUrl = "https://buy.stripe.com/14AfZj5Ie3sp3AOad12ZO0b";

const items = [
  "Complete audit report structure — cover page, overall score, 6-dimension deep dives, prioritized recommendations, and executive summary",
  "A 0–60 scoring system across 6 dimensions: lead gen, client onboarding, service delivery, reporting, internal admin, and team communication",
  "Pre-written finding sections for each dimension with fill-in brackets — no staring at blank pages",
  "5-tier prioritized recommendations format — immediate actions through quarterly initiatives",
  "4 AI prompts to complete each section fast: score a dimension, write a finding, write a recommendation, write the executive summary",
  "Editable in HTML — render in any browser, copy sections into your preferred doc tool",
  "Licensed for client work — remove Applied Leverage branding and deliver under your own name",
];

const forWho = [
  "Consultants adding AI audits as a service line",
  "Agency owners doing discovery with prospects who want a tangible output",
  "Fractional COOs and operations consultants",
  "Anyone who has been asked to audit a business for AI readiness and wanted a solid framework",
];

export default function AiAuditTemplatePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#e8e8e8]">
      <div className="max-w-3xl mx-auto px-6 py-20">

        <div className="mb-4">
          <span className="inline-block bg-[#292524] text-[#fbbf24] text-xs font-bold px-3 py-1 rounded uppercase tracking-wider">
            Productized Service Template
          </span>
        </div>
        <h1 className="text-4xl font-extrabold text-white leading-tight mb-4">
          Done-for-You AI<br />Readiness Audit Template
        </h1>
        <p className="text-xl text-[#9ca3af] mb-4">
          Consultants are charging $500–$2,000 for AI readiness audits right now.
          Most are spending 4–6 hours building each report from scratch.
        </p>
        <p className="text-xl text-[#9ca3af] mb-10">
          This template cuts that to 90 minutes — scoring framework, 6-dimension deep
          dive sections, prioritized recommendations, and the AI prompts to write it fast.
        </p>
        <p className="text-[#6b7280] text-sm mb-12">
          Designed for consultants and agency owners who want to add AI audits as a productized service line.
          Use it under your own brand. Deliver it to clients tonight.
        </p>

        <div className="bg-[#111] border border-[#222] rounded-xl p-8 mb-10">
          <h2 className="text-white font-bold text-lg mb-6">{"What's in the template ($67)"}</h2>
          <ul className="space-y-3">
            {items.map((item, i) => (
              <li key={i} className="flex gap-3 text-[#d1d5db] text-sm">
                <span className="text-[#d97706] font-bold mt-0.5 shrink-0">✓</span>
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

        <div className="bg-[#111] border border-[#d97706] rounded-xl p-8 mb-8 text-center">
          <div className="text-4xl font-extrabold text-white mb-2">$67</div>
          <div className="text-[#9ca3af] text-sm mb-6">One-time. Instant access. Use for unlimited clients.</div>
          <a
            href={checkoutUrl}
            className="block w-full bg-[#d97706] hover:bg-[#b45309] text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors"
          >
            Get the audit template — $67
          </a>
          <p className="text-[#6b7280] text-xs mt-4">
            Delivered immediately. License covers unlimited client use.
          </p>
        </div>

        <p className="text-center text-[#4b5563] text-sm">
          <Link href="/" className="text-[#d97706] hover:underline">appliedleverage.io</Link>
          {" · "}
          <a href="mailto:lucas@appliedleverage.io" className="text-[#d97706] hover:underline">
            lucas@appliedleverage.io
          </a>
        </p>
      </div>
    </main>
  );
}
