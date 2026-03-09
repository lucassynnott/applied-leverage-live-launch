import Link from "next/link";
import type { ReactNode } from "react";

import { getNavigationPages } from "@/lib/site-content";

export function SiteShell({ children }: { children: ReactNode }) {
  const pages = getNavigationPages();

  return (
    <div className="site-shell">
      <header className="site-header">
        <Link className="brand" href="/">
          <span aria-hidden="true" className="brand-mark">
            AL
          </span>
          <span className="brand-copy">
            <strong>Applied Leverage</strong>
            <span>Operator systems for real businesses</span>
          </span>
        </Link>
        <nav aria-label="Primary" className="site-nav">
          {pages.map((page) => (
            <Link className="nav-link" href={page.path} key={page.slug}>
              {page.navLabel}
            </Link>
          ))}
        </nav>
        <Link className="button button-ghost header-cta" href="/apply">
          Apply
        </Link>
      </header>

      {children}

      <footer className="site-footer">
        <div className="footer-copy">
          <p className="eyebrow">Applied Leverage</p>
          <p className="footer-title">
            Clarity first. Build second. Replace the bottleneck instead of
            decorating it.
          </p>
        </div>
        <div className="footer-links">
          <Link href="/diagnostic">Diagnostic</Link>
          <Link href="/sprint">Sprint</Link>
          <Link href="/about">About Lucas</Link>
          <a href="mailto:apply@appliedleverage.io">apply@appliedleverage.io</a>
        </div>
      </footer>
    </div>
  );
}
