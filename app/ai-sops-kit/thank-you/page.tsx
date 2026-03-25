import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "You are in — AI SOPs-in-a-Day Kit | Applied Leverage",
  description: "Access your AI SOPs kit.",
};

export default function AiSopsKitThankYouPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#e8e8e8]">
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <div className="text-5xl mb-6">📋</div>
        <h1 className="text-3xl font-extrabold text-white mb-4">Your SOPs are ready.</h1>
        <p className="text-[#9ca3af] text-lg mb-10">
          12 templates and the full AI prompt framework — all yours. Start with whichever process
          is causing you the most pain right now.
        </p>

        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a
          href="/ai-sops-kit/index.html"
          className="inline-block bg-[#059669] hover:bg-[#047857] text-white font-bold py-4 px-10 rounded-lg text-lg transition-colors mb-6"
        >
          Open your SOPs kit →
        </a>

        <div className="bg-[#111] border border-[#222] rounded-xl p-6 text-left mt-10">
          <h2 className="text-white font-bold mb-3">Suggested first move</h2>
          <ol className="space-y-2 text-[#9ca3af] text-sm list-decimal list-inside">
            <li>Open the kit and scan the 12 SOP titles</li>
            <li>Pick the one your team runs most inconsistently right now</li>
            <li>Copy it into Notion or Google Docs, fill in the brackets</li>
            <li>Share it in your team Slack before end of day — done</li>
          </ol>
          <p className="text-[#6b7280] text-xs mt-4">
            The Master SOP Builder Prompt at the bottom handles any process not already included — takes 20 minutes max.
          </p>
        </div>

        <p className="text-[#4b5563] text-sm mt-10">
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
