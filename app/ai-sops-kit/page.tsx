import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI SOPs-in-a-Day Kit | Applied Leverage",
  description:
    "12 plug-and-play SOP templates + AI prompts to build any new SOP in 20 minutes. For agency owners and ops managers.",
  alternates: {
    canonical: "https://appliedleverage.io/ai-sops-kit"
  },
  openGraph: {
    title: "AI SOPs-in-a-Day Kit | Applied Leverage",
    description: "12 SOP templates + AI prompts. Document your agency in one day.",
    type: "website",
    url: "https://appliedleverage.io/ai-sops-kit"
  },
};

const checkoutUrl = "https://buy.stripe.com/aFa6oJ6Mi5Axb3gdpd2ZO0a";

const items = [
  "12 complete SOP templates covering client onboarding, weekly reporting, new hire onboarding, proposals, monthly reviews, and 7 more",
  "Each SOP includes trigger conditions, numbered steps with sub-tasks, owner fields, and a clear done-when definition",
  "An AI customization prompt for every SOP — adapt any template to your agency in 5 minutes",
  "The Master SOP Builder Prompt — generate any new SOP from scratch in 20 minutes",
  "A prompt to convert rough process notes into a clean numbered SOP",
  "A prompt to identify AI automation opportunities inside any existing SOP",
  "All templates in editable HTML — copy into Notion, Google Docs, or any tool your team uses",
];

const forWho = [
  "Agency owners whose business lives in their head",
  "Ops managers who keep getting asked how to do something",
  "Teams where the same mistakes happen over and over",
  "Anyone preparing to hire and worried about what knowledge only lives in their own brain",
];

export default function AiSopsKitPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#e8e8e8]">
      <div className="max-w-3xl mx-auto px-6 py-20">

        <div className="mb-4">
          <span className="inline-block bg-[#022c22] text-[#34d399] text-xs font-bold px-3 py-1 rounded uppercase tracking-wider">
            Templates + Prompts
          </span>
        </div>
        <h1 className="text-4xl font-extrabold text-white leading-tight mb-4">
          AI SOPs-in-a-Day Kit
        </h1>
        <p className="text-xl text-[#9ca3af] mb-4">
          Your agency runs on processes no one has documented. Every time something goes wrong,
          someone has to ask someone else how it is supposed to work.
        </p>
        <p className="text-xl text-[#9ca3af] mb-10">
          This kit fixes that — 12 ready-to-use SOP templates and the AI prompts to build
          any new one in 20 minutes.
        </p>
        <p className="text-[#6b7280] text-sm mb-12">
          Designed for agencies with 2–20 people who know they need SOPs but have not had time to write them.
        </p>

        <div className="bg-[#111] border border-[#222] rounded-xl p-8 mb-10">
          <h2 className="text-white font-bold text-lg mb-6">{"What's in the kit ($47)"}</h2>
          <ul className="space-y-3">
            {items.map((item, i) => (
              <li key={i} className="flex gap-3 text-[#d1d5db] text-sm">
                <span className="text-[#059669] font-bold mt-0.5 shrink-0">✓</span>
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

        <div className="bg-[#111] border border-[#059669] rounded-xl p-8 mb-8 text-center">
          <div className="text-4xl font-extrabold text-white mb-2">$47</div>
          <div className="text-[#9ca3af] text-sm mb-6">One-time. Instant access. Lifetime updates.</div>
          <a
            href={checkoutUrl}
            className="block w-full bg-[#059669] hover:bg-[#047857] text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors"
          >
            Get the SOPs kit — $47
          </a>
          <p className="text-[#6b7280] text-xs mt-4">
            Delivered immediately. Works in Notion, Google Docs, or any editor.
          </p>
        </div>

        <p className="text-center text-[#4b5563] text-sm">
          <Link href="/" className="text-[#059669] hover:underline">appliedleverage.io</Link>
          {" · "}
          <a href="mailto:lucas@appliedleverage.io" className="text-[#059669] hover:underline">
            lucas@appliedleverage.io
          </a>
        </p>
      </div>
    </main>
  );
}
