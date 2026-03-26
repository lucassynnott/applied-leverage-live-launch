import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "You are in — Agency Ops Starter Bundle | Applied Leverage",
  description: "Access your Agency Ops Starter Bundle.",
};

export default function AgencyOpsBundleThankYouPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#e8e8e8]">
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <div className="text-5xl mb-6">📦</div>
        <h1 className="text-3xl font-extrabold text-white mb-4">Your bundle is ready.</h1>
        <p className="text-[#9ca3af] text-lg mb-10">
          6 templates, systems, and guides — all yours. Start with whichever system 
          is causing you the most friction right now.
        </p>

        <div className="bg-[#111] border border-[#222] rounded-xl p-6 text-left mb-6">
          <h2 className="text-white font-bold mb-4">Download your files</h2>
          <ul className="space-y-3 text-[#d1d5db] text-sm">
            <li className="flex items-center gap-3">
              <a 
                href="#" 
                className="text-[#60a5fa] hover:underline flex-1"
              >
                Client Intake Form Template
              </a>
              <span className="text-[#6b7280] text-xs">Notion / Google Docs</span>
            </li>
            <li className="flex items-center gap-3">
              <a 
                href="#" 
                className="text-[#60a5fa] hover:underline flex-1"
              >
                Project Tracker System
              </a>
              <span className="text-[#6b7280] text-xs">Google Sheets / Excel</span>
            </li>
            <li className="flex items-center gap-3">
              <a 
                href="#" 
                className="text-[#60a5fa] hover:underline flex-1"
              >
                Weekly Reporting Template
              </a>
              <span className="text-[#6b7280] text-xs">Notion / Google Docs</span>
            </li>
            <li className="flex items-center gap-3">
              <a 
                href="#" 
                className="text-[#60a5fa] hover:underline flex-1"
              >
                Onboarding Checklist
              </a>
              <span className="text-[#6b7280] text-xs">Notion / Trello</span>
            </li>
            <li className="flex items-center gap-3">
              <a 
                href="#" 
                className="text-[#60a5fa] hover:underline flex-1"
              >
                Task Priority Matrix
              </a>
              <span className="text-[#6b7280] text-xs">PDF / Miro</span>
            </li>
            <li className="flex items-center gap-3">
              <a 
                href="#" 
                className="text-[#60a5fa] hover:underline flex-1"
              >
                Agency Ops Quick-Start Guide
              </a>
              <span className="text-[#6b7280] text-xs">PDF</span>
            </li>
          </ul>
          <p className="text-[#6b7280] text-xs mt-4">
            Links will be available shortly. Check your email for download instructions.
          </p>
        </div>

        <div className="bg-[#111] border border-[#222] rounded-xl p-6 text-left">
          <h2 className="text-white font-bold mb-3">Suggested first move</h2>
          <ol className="space-y-2 text-[#9ca3af] text-sm list-decimal list-inside">
            <li>Download the Client Intake Form Template</li>
            <li>Customize it for your agency (5 minutes)</li>
            <li>Use it on your next client call — today</li>
            <li>Build momentum from there</li>
          </ol>
          <p className="text-[#6b7280] text-xs mt-4">
            The Quick-Start Guide walks through implementation if you get stuck.
          </p>
        </div>

        <p className="text-[#4b5563] text-sm mt-10">
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
