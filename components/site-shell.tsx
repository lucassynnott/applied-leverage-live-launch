import Link from "next/link";
import React, { type ReactNode } from "react";

import { MobileNav } from "@/components/mobile-nav";
import { getNavigationPages } from "@/lib/site-content";

export function SiteShell({ children }: { children: ReactNode }) {
  const pages = [
    ...getNavigationPages().map(({ navLabel, path, slug }) => ({
      navLabel,
      path,
      slug
    })),
    {
      navLabel: "Workbook",
      path: "/workbook",
      slug: "workbook"
    }
  ];

  return (
    <div className="site-shell">
      <header className="site-header">
        <Link className="brand" href="/">
          Applied Leverage
        </Link>
        <nav aria-label="Primary" className="site-nav site-nav--desktop">
          {pages.map((page) => (
            <Link className="nav-link" href={page.path} key={page.slug}>
              {page.navLabel}
            </Link>
          ))}
        </nav>
        <div className="header-actions header-actions--desktop">
          <Link className="button button-primary header-cta" href="/apply">
            Apply
          </Link>
        </div>
        <MobileNav pages={pages} />
      </header>

      {children}

      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <p className="footer-title">Applied Leverage</p>
            <p className="footer-note">
              Clarity first. Build second. Replace the bottleneck instead of decorating it.
            </p>
          </div>
          <div className="footer-columns">
            <div className="footer-links">
              <p className="footer-label">Services</p>
              <Link href="/workbook">Workbook</Link>
              <Link href="/diagnostic">Diagnostic</Link>
              <Link href="/sprint">Sprint</Link>
              <Link href="/apply">Apply</Link>
            </div>
            <div className="footer-links">
              <p className="footer-label">Company</p>
              <Link href="/why">The Problem</Link>
              <Link href="/about">About</Link>
              <Link href="/blog">Blog</Link>
              <a href="mailto:lucas@appliedleverage.io">Contact</a>
            </div>
            <div className="footer-links">
              <p className="footer-label">Connect</p>
              <a href="https://x.com/lucassynnott" target="_blank" rel="noopener noreferrer">X / Twitter</a>
              <a href="https://www.linkedin.com/in/lucas-synnott/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://appliedleverage.io" target="_blank" rel="noopener noreferrer">Newsletter</a>
            </div>
          </div>
        </div>
        <p className="footer-copyright">
          &copy; {new Date().getFullYear()} Applied Leverage
        </p>
      </footer>
    </div>
  );
}
