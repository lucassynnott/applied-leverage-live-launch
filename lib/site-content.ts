import { readFileSync } from "node:fs";
import path from "node:path";

export const pageDefinitions = {
  home: {
    slug: "home",
    path: "/",
    navLabel: "Home",
    eyebrow: "Applied Leverage",
    summary: "Install leverage before drag compounds.",
    highlights: [
      "90-minute Automation Priority Map",
      "4-week implementation sprint",
      "Operator-first systems, not tool theater"
    ]
  },
  why: {
    slug: "why",
    path: "/why",
    navLabel: "The Problem",
    eyebrow: "Why operators stay stuck",
    summary: "AI usually fails because the architecture is wrong, not because the tools are weak.",
    highlights: [
      "Map before software",
      "System bottlenecks over task hacks",
      "Architecture decisions made in public"
    ]
  },
  diagnostic: {
    slug: "diagnostic",
    path: "/diagnostic",
    navLabel: "Diagnostic",
    eyebrow: "Clarity first",
    summary: "A focused audit that tells you what to automate first and what to ignore.",
    highlights: [
      "90 minutes with Lucas",
      "Top 3 automation moves ranked",
      "Map delivered within 4 hours"
    ]
  },
  sprint: {
    slug: "sprint",
    path: "/sprint",
    navLabel: "Sprint",
    eyebrow: "Execution second",
    summary: "A done-with-you implementation sprint for operators who already know what to build.",
    highlights: [
      "4 weeks, 3 automations",
      "Weekly working sessions",
      "Soft-launch cohort capped at 3 clients"
    ]
  },
  about: {
    slug: "about",
    path: "/about",
    navLabel: "About",
    eyebrow: "The operator behind it",
    summary: "Applied Leverage is the proof that a one-operator business can run through a real AI council.",
    highlights: [
      "Built from Lucas's own operation",
      "Specialized AI council roles",
      "Direct operator perspective"
    ]
  },
  apply: {
    slug: "apply",
    path: "/apply",
    navLabel: "Apply",
    eyebrow: "Start here",
    summary: "Choose the right entry point, submit your intake, and move into review.",
    highlights: [
      "Diagnostic applications reviewed in 1 business day",
      "Sprint waitlist for early cohort access",
      "Diagnostic fee rolls into the sprint"
    ]
  }
} as const;

export type PageSlug = keyof typeof pageDefinitions;
export type RoutedPageSlug = Exclude<PageSlug, "home">;
export type PageDefinition = (typeof pageDefinitions)[PageSlug];

export type SectionHeading = {
  title: string;
  id: string;
};

export type PageSection = {
  heading: string;
  id: string;
  body: string;
};

export type PageHero = {
  headline: string;
  subheadline: string;
  body: string;
  badge?: string;
  cta?: {
    label: string;
    href: string;
  };
};

export type SitePage = {
  slug: PageSlug;
  definition: PageDefinition;
  pageTitle: string;
  hero: PageHero;
  sections: PageSection[];
};

const copyFileNames: Record<PageSlug, string> = {
  home: "home.md",
  why: "why.md",
  diagnostic: "diagnostic.md",
  sprint: "sprint.md",
  about: "about.md",
  apply: "apply.md"
};

const SECTION_HEADING_PATTERN = /^##\s+(.*)$/;
const PAGE_TITLE_PATTERN = /^\*\*Page title:\*\*\s*(.+)$/;
const HERO_LABEL_PATTERN = /^\*\*([^*]+):\*\*$/;

export function getNavigationPages(): PageDefinition[] {
  return [
    pageDefinitions.home,
    pageDefinitions.why,
    pageDefinitions.diagnostic,
    pageDefinitions.sprint,
    pageDefinitions.about,
    pageDefinitions.apply
  ];
}

export function getRoutedSlugs(): RoutedPageSlug[] {
  return Object.keys(pageDefinitions).filter(
    (slug): slug is RoutedPageSlug => slug !== "home"
  );
}

export function isRoutedPageSlug(slug: string): slug is RoutedPageSlug {
  return slug in pageDefinitions && slug !== "home";
}

export function parseSectionHeading(raw: string): SectionHeading {
  const trimmed = raw.trim();
  const match = trimmed.match(/^(.*?)(?:\s*\{#([A-Za-z0-9_-]+)\})?$/);
  const title = (match?.[1] ?? trimmed).trim();
  const explicitId = match?.[2];

  return {
    title,
    id: explicitId ?? toAnchorId(title)
  };
}

export function loadPageContent(slug: PageSlug): SitePage {
  const definition = pageDefinitions[slug];
  const rawMarkdown = readCopyMarkdown(slug);
  const { pageTitle, sections } = parseCopySections(rawMarkdown);
  const heroSection = sections.find(
    (section) => {
      const heading = section.heading.toLowerCase();
      return heading === "hero" || heading === "headline";
    }
  );
  const hero =
    heroSection?.heading.toLowerCase() === "headline"
      ? parseHeadlineHero(heroSection.body, definition.summary)
      : parseHeroSection(heroSection?.body ?? "", definition.summary);

  return {
    slug,
    definition,
    pageTitle: pageTitle ?? "Applied Leverage",
    hero,
    sections: sections.filter((section) => section !== heroSection)
  };
}

export function toAnchorId(value: string): string {
  return (
    value
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "section"
  );
}

function readCopyMarkdown(slug: PageSlug): string {
  const filePath = path.join(process.cwd(), "copy", copyFileNames[slug]);
  return readFileSync(filePath, "utf8").replace(/\r\n/g, "\n");
}

function parseCopySections(rawMarkdown: string): {
  pageTitle?: string;
  sections: PageSection[];
} {
  const lines = rawMarkdown.split("\n");
  const sections: PageSection[] = [];
  let pageTitle: string | undefined;
  let currentHeading: SectionHeading | null = null;
  let bodyLines: string[] = [];

  const pushSection = () => {
    if (!currentHeading) {
      return;
    }

    const rawBody = normalizeMarkdown(bodyLines.join("\n"));
    const cleanBody = rawBody.replace(/\n*\*?©.*?All rights reserved\.?\*?\s*$/i, "").trim();
    sections.push({
      heading: currentHeading.title,
      id: currentHeading.id,
      body: cleanBody
    });
  };

  for (const line of lines) {
    if (line.startsWith("# ")) {
      continue;
    }

    if (line.trim() === "---") {
      continue;
    }

    const pageTitleMatch = line.trim().match(PAGE_TITLE_PATTERN);
    if (pageTitleMatch) {
      pageTitle = pageTitleMatch[1].trim();
      continue;
    }

    const sectionMatch = line.match(SECTION_HEADING_PATTERN);
    if (sectionMatch) {
      pushSection();
      currentHeading = parseSectionHeading(sectionMatch[1]);
      bodyLines = [];
      continue;
    }

    if (!currentHeading) {
      continue;
    }

    bodyLines.push(line);
  }

  pushSection();

  return { pageTitle, sections };
}

function parseHeroSection(body: string, fallbackSummary: string): PageHero {
  const groups: Record<string, string[]> = {
    body: []
  };
  let currentKey = "body";

  for (const line of body.split("\n")) {
    const trimmed = line.trim();
    const labelMatch = trimmed.match(HERO_LABEL_PATTERN);

    if (labelMatch) {
      currentKey = labelMatch[1].toLowerCase();
      groups[currentKey] ??= [];

      const inlineValue = trimmed.slice(labelMatch[0].length).trim();
      if (inlineValue) {
        groups[currentKey].push(inlineValue);
      }
      continue;
    }

    groups[currentKey] ??= [];
    groups[currentKey].push(line);
  }

  return {
    headline:
      stripInlineMarkdown(cleanQuoted(groups.headline).join(" ").trim()) ||
      fallbackSummary,
    subheadline: stripInlineMarkdown(
      cleanQuoted(groups.subheadline).join(" ").trim()
    ),
    body: normalizeMarkdown((groups.body ?? []).join("\n")),
    badge:
      stripInlineMarkdown((groups["status badge"] ?? []).join(" ").trim()) ||
      undefined,
    cta: extractFirstMarkdownLink(
      [...(groups["primary cta"] ?? []), ...(groups.cta ?? [])].join("\n")
    )
  };
}

function parseHeadlineHero(body: string, fallbackSummary: string): PageHero {
  return {
    headline:
      stripInlineMarkdown(cleanQuoted(body.split("\n")).join(" ").trim()) ||
      fallbackSummary,
    subheadline: "",
    body: "",
    badge: undefined,
    cta: undefined
  };
}

function cleanQuoted(lines: string[] | undefined): string[] {
  return (lines ?? []).map((line) => line.replace(/^>\s?/, "").trim());
}

function normalizeMarkdown(markdown: string): string {
  return markdown.trim().replace(/\n{3,}/g, "\n\n");
}

function stripInlineMarkdown(value: string): string {
  return value.replace(/[*_`]/g, "").replace(/\[(.+?)\]\(.+?\)/g, "$1");
}

function extractFirstMarkdownLink(value: string): PageHero["cta"] {
  const match = value.match(/\[([^\]]+)\]\(([^)]+)\)/);

  if (!match) {
    return undefined;
  }

  return {
    label: match[1].replace(/^→\s*/, "").trim(),
    href: match[2].trim()
  };
}
