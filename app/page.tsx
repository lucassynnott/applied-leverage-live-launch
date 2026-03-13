import type { Metadata } from "next";

import { MarketingPage } from "@/components/marketing-page";
import { loadPageContent, pageDefinitions } from "@/lib/site-content";

const siteUrl = "https://appliedleverage.io";
const socialImage = `${siteUrl}/images/lucas-synnott.png`;

export const metadata: Metadata = {
  title: "Applied Leverage",
  description: pageDefinitions.home.summary,
  alternates: {
    canonical: siteUrl
  },
  openGraph: {
    title: "Applied Leverage",
    description: pageDefinitions.home.summary,
    url: siteUrl,
    type: "website",
    images: [
      {
        url: socialImage,
        alt: "Applied Leverage"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Applied Leverage",
    description: pageDefinitions.home.summary,
    images: [socialImage]
  }
};

export default function HomePage() {
  return <MarketingPage page={loadPageContent("home")} />;
}

