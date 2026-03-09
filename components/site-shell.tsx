import Link from "next/link";
import type { ReactNode } from "react";

import { getNavigationPages } from "@/lib/site-content";

export function SiteShell({ children }: { children: ReactNode }) {
  const pages = getNavigationPages();

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="header-topline">
          <Link className="brand" href="/">
            <span aria-hidden="true" className="brand-mark">
              AL
            </span>
            <span className="brand-copy">
              <strong>Applied Leverage</strong>
              <span>Operator systems for real businesses</span>
            </span>
          </Link>
          <p className="header-context">
            Dublin-based operator systems studio for founder-led service businesses
          </p>
        </div>
        <nav aria-label="Primary" className="site-nav">
          {pages.map((page) => (
            <Link className="nav-link" href={page.path} key={page.slug}>
              {page.navLabel}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <a className="button button-ghost header-cta" href="mailto:apply@appliedleverage.io">
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
            Clarity first. Build second. Replace the bottleneck instead of
            decorating it.
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
            <a href="mailto:apply@appliedleverage.io">apply@appliedleverage.io</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
