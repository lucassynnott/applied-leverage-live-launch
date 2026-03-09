import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MarketingPage } from "@/components/marketing-page";
import {
  getRoutedSlugs,
  isRoutedPageSlug,
  loadPageContent
} from "@/lib/site-content";

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

  return {
    title: page.pageTitle,
    description: page.definition.summary
  };
}

export default async function RoutedPage({ params }: PageProps) {
  const { slug } = await params;

  if (!isRoutedPageSlug(slug)) {
    notFound();
  }

  return <MarketingPage page={loadPageContent(slug)} />;
}

