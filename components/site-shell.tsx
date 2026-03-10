import Link from "next/link";
import React, { type ReactNode } from "react";

import { MobileNav } from "@/components/mobile-nav";
import { getNavigationPages } from "@/lib/site-content";

export function SiteShell({ children }: { children: ReactNode }) {
  const pages = getNavigationPages().map(({ navLabel, path, slug }) => ({
    navLabel,
    path,
    slug
  }));

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="header-topline">
          <Link className="brand" href="/">
            <span className="brand-copy">
              <strong>Applied Leverage</strong>
            </span>
          </Link>
          <MobileNav pages={pages} />
        </div>
        <nav aria-label="Primary" className="site-nav site-nav--desktop">
          {pages.map((page) => (
            <Link className="nav-link" href={page.path} key={page.slug}>
              {page.navLabel}
            </Link>
          ))}
        </nav>
        <div className="header-actions header-actions--desktop">
          <a className="button button-ghost header-cta" href="mailto:lucas@appliedleverage.io">
            Email Lucas
          </a>
          <Link className="button button-primary header-cta" href="/apply">
            Apply
          </Link>
        </div>
      </header>

      {children}

      <footer className="site-footer">
        <div className="footer-copy">
          <p className="eyebrow">Applied Leverage</p>
          <p className="footer-title">
            Operator systems that replace the bottleneck.
          </p>
          <p className="footer-note">
            Diagnostic for the map. Sprint for the build. Same leverage logic,
            different entry point.
          </p>
        </div>
        <div className="footer-columns">
          <div className="footer-links">
            <p className="footer-label">Paths</p>
            <Link href="/diagnostic">Diagnostic</Link>
            <Link href="/sprint">Sprint</Link>
            <Link href="/apply">Apply</Link>
          </div>
          <div className="footer-links">
            <p className="footer-label">Company</p>
            <Link href="/why">The Problem</Link>
            <Link href="/about">About Lucas</Link>
            <a href="mailto:lucas@appliedleverage.io">lucas@appliedleverage.io</a>
          </div>
          <div className="footer-links">
            <p className="footer-label">Connect</p>
            <a href="https://x.com/lucassynnott" target="_blank" rel="noopener noreferrer">X / Twitter</a>
            <a href="https://www.linkedin.com/in/lucas-synnott/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://appliedleverage.io" target="_blank" rel="noopener noreferrer">Newsletter</a>
          </div>
        </div>
        <p className="footer-copyright">&copy; {new Date().getFullYear()} Applied Leverage. All rights reserved.</p>
      </footer>
    </div>
  );
}
