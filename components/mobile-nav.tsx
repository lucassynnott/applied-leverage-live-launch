"use client";

import Link from "next/link";
import React, { useEffect, useId, useRef, useState } from "react";

type NavPage = {
  navLabel: string;
  path: string;
  slug: string;
};

export function MobileNav({ pages }: { pages: readonly NavPage[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const closeNav = () => {
    setIsOpen(false);
  };

  return (
    <div
      className={`mobile-nav${isOpen ? " is-open" : ""}`}
      ref={navRef}
    >
      <button
        aria-controls={panelId}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        className="mobile-nav__toggle"
        onClick={() => {
          setIsOpen((open) => !open);
        }}
        type="button"
      >
        <span className="mobile-nav__toggle-label">Menu</span>
        <span aria-hidden="true" className="mobile-nav__toggle-icon">
          <span />
          <span />
          <span />
        </span>
      </button>

      <div className="mobile-nav__panel" id={panelId}>
        <nav aria-label="Mobile primary" className="mobile-nav__links">
          {pages.map((page) => (
            <Link
              className="mobile-nav__link"
              href={page.path}
              key={page.slug}
              onClick={closeNav}
            >
              {page.navLabel}
            </Link>
          ))}
        </nav>
        <div className="mobile-nav__actions">
          <a
            className="button button-ghost mobile-nav__cta"
            href="mailto:lucas@appliedleverage.io"
            onClick={closeNav}
          >
            Email Lucas
          </a>
          <Link
            className="button button-primary mobile-nav__cta"
            href="/apply"
            onClick={closeNav}
          >
            Apply
          </Link>
        </div>
      </div>
    </div>
  );
}
