import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "You are in — 30 AI Prompts for Client Reporting | Applied Leverage",
  description: "Access your 30 AI prompts for client reporting.",
};

export default function ClientReportingPromptsThankYouPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#e8e8e8]">
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <div className="text-5xl mb-6">🎯</div>
        <h1 className="text-3xl font-extrabold text-white mb-4">{"You're in."}</h1>
        <p className="text-[#9ca3af] text-lg mb-10">
          Your 30 AI prompts for client reporting are ready. Open the link below — bookmark it and share it with your team.
        </p>

        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a
          href="/client-reporting-prompts/index.html"
          className="inline-block bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-bold py-4 px-10 rounded-lg text-lg transition-colors mb-6"
        >
          Open your prompts →
        </a>

        <div className="bg-[#111] border border-[#222] rounded-xl p-6 text-left mt-10">
          <h2 className="text-white font-bold mb-3">Quick start</h2>
          <ol className="space-y-2 text-[#9ca3af] text-sm list-decimal list-inside">
            <li>Open Claude or ChatGPT</li>
            <li>Pick the prompt that matches what you are writing</li>
            <li>Replace the [BRACKETS] with your client data</li>
            <li>Paste it. Done.</li>
          </ol>
          <p className="text-[#6b7280] text-xs mt-4">
            Prompt 30 — the Report Quality Checker — is the one most people say they wished they had sooner.
            Run it before you send any report.
          </p>
        </div>

        <p className="text-[#4b5563] text-sm mt-10">
          <Link href="/" className="text-[#7c3aed] hover:underline">appliedleverage.io</Link>
          {" · "}
          <a href="mailto:lucas@appliedleverage.io" className="text-[#7c3aed] hover:underline">
            lucas@appliedleverage.io
          </a>
        </p>
      </div>
    </main>
  );
}
