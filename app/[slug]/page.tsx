import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MarketingPage } from "@/components/marketing-page";
import {
  getRoutedSlugs,
  isRoutedPageSlug,
  loadPageContent
} from "@/lib/site-content";

const siteUrl = "https://appliedleverage.io";
const socialImage = `${siteUrl}/images/lucas-synnott.png`;

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getRoutedSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  if (!isRoutedPageSlug(slug)) {
    return {};
  }

  const page = loadPageContent(slug);

  const canonicalUrl = `${siteUrl}${page.definition.path}`;

  return {
    title: page.pageTitle,
    description: page.definition.summary,
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: page.pageTitle,
      description: page.definition.summary,
      url: canonicalUrl,
      type: "website",
      images: [
        {
          url: socialImage,
          alt: page.pageTitle
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: page.pageTitle,
      description: page.definition.summary,
      images: [socialImage]
    }
  };
}

export default async function RoutedPage({ params }: PageProps) {
  const { slug } = await params;

  if (!isRoutedPageSlug(slug)) {
    notFound();
  }

  return <MarketingPage page={loadPageContent(slug)} />;
}

