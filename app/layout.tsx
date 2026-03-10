import type { Metadata, Viewport } from "next";
import {
  IBM_Plex_Mono,
  Instrument_Serif,
  Space_Grotesk
} from "next/font/google";
import type { ReactNode } from "react";

import { SiteShell } from "@/components/site-shell";

import "./globals.css";

const sans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans"
});

const display = Instrument_Serif({
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display",
  weight: "400"
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"]
});

export const metadata: Metadata = {
  title: {
    default: "Applied Leverage",
    template: "%s | Applied Leverage"
  },
  description:
    "Applied Leverage helps operators install the automations and AI systems that remove founder drag."
};

export const viewport: Viewport = {
  themeColor: "#000000"
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      className={`${sans.variable} ${display.variable} ${mono.variable}`}
      lang="en"
    >
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
