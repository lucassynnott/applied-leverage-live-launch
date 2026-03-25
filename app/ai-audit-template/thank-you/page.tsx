import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "You are in — AI Readiness Audit Template | Applied Leverage",
  description: "Access your AI audit template.",
};

export default function AiAuditTemplateThankYouPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#e8e8e8]">
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <div className="text-5xl mb-6">🔍</div>
        <h1 className="text-3xl font-extrabold text-white mb-4">Template is yours.</h1>
        <p className="text-[#9ca3af] text-lg mb-10">
          Your AI Readiness Audit Template is ready. Open it below, replace the brackets
          with your client information, and deliver something polished.
        </p>

        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a
          href="/ai-audit-template/index.html"
          className="inline-block bg-[#d97706] hover:bg-[#b45309] text-white font-bold py-4 px-10 rounded-lg text-lg transition-colors mb-6"
        >
          Open your audit template →
        </a>

        <div className="bg-[#111] border border-[#222] rounded-xl p-6 text-left mt-10">
          <h2 className="text-white font-bold mb-3">How to run your first audit</h2>
          <ol className="space-y-2 text-[#9ca3af] text-sm list-decimal list-inside">
            <li>Book a 45–60 min discovery call — use the 6 dimensions as your agenda</li>
            <li>Take rough notes in each section during the call</li>
            <li>Use the AI prompts at the bottom to score and write each section</li>
            <li>Fill in the brackets with your client specifics</li>
            <li>Remove the Applied Leverage branding — it is your report now</li>
          </ol>
          <p className="text-[#6b7280] text-xs mt-4">
            Total time from call notes to finished report: 60–90 minutes.
          </p>
        </div>

        <p className="text-[#4b5563] text-sm mt-10">
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
