import type { Metadata } from "next";

import { MarketingPage } from "@/components/marketing-page";
import { loadPageContent, pageDefinitions } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Applied Leverage",
  description: pageDefinitions.home.summary
};

export default function HomePage() {
  return <MarketingPage page={loadPageContent("home")} />;
}

