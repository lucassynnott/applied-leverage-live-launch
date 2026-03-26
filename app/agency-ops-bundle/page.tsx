import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Agency Ops Starter Bundle | Applied Leverage",
  description:
    "The exact Notion OS, automation templates, and AI delegation prompts that $500K+ agencies use to stop running everything through their head.",
  alternates: {
    canonical: "https://appliedleverage.io/agency-ops-bundle"
  },
  openGraph: {
    title: "Agency Ops Starter Bundle | Applied Leverage",
    description: "Your agency ops. Systemised. Done.",
    type: "website",
    url: "https://appliedleverage.io/agency-ops-bundle"
  },
};

const checkoutUrl = "https://buy.stripe.com/00w9AV6Mi8MJb3g4SH2ZO0c";

const items = [
  {
    icon: "✅",
    title: "Agency OS Notion Template",
    desc: "Client pipeline, weekly rhythms, delegation board, SOP index",
  },
  {
    icon: "✅",
    title: "3 Automation Templates",
    desc: "Client onboarding, weekly reporting, follow-up sequences (Make.com ready)",
  },
  {
    icon: "✅",
    title: "AI Council Prompt Pack",
    desc: "4 AI role prompts to delegate strategy, ops, content, and client work",
  },
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
          Your Agency Ops. Systemised. Done.
        </h1>

        <p className="text-xl text-[#9ca3af] mb-10">
          Get the exact Notion OS, automation templates, and AI delegation prompts
          that $500K+ agencies use to stop running everything through their head.
        </p>

        <div className="bg-[#111] border border-[#222] rounded-xl p-8 mb-10">
          <h2 className="text-white font-bold text-lg mb-6">{"What's inside"}</h2>
          <ul className="space-y-5">
            {items.map((item, i) => (
              <li key={i} className="flex gap-4 text-[#d1d5db]">
                <span className="text-xl shrink-0">{item.icon}</span>
                <div>
                  <div className="font-semibold text-white text-sm">{item.title}</div>
                  <div className="text-[#9ca3af] text-sm mt-0.5">{item.desc}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#111] border border-[#60a5fa] rounded-xl p-8 mb-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-2">
            <span className="text-[#6b7280] line-through text-2xl">$197</span>
            <span className="text-4xl font-extrabold text-white">$97 today</span>
          </div>
          <div className="text-[#9ca3af] text-sm mb-6">Instant download. No calls. No fluff.</div>
          <a
            href={checkoutUrl}
            className="block w-full bg-[#60a5fa] hover:bg-[#3b82f6] text-[#0a0a0a] font-bold py-4 px-8 rounded-lg text-lg transition-colors"
          >
            Get Instant Access →
          </a>
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
