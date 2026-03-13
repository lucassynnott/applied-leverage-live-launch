"use client";

import React, { useEffect, useState } from "react";

type WorkbookCtaLinkProps = {
  className?: string;
  liveHref: string;
  liveLabel: string;
  manualHref: string;
  manualLabel: string;
};

declare global {
  interface Window {
    WORKBOOK_CHECKOUT_URL?: string;
  }
}

export function WorkbookCtaLink({
  className,
  liveHref,
  liveLabel,
  manualHref,
  manualLabel
}: WorkbookCtaLinkProps) {
  const trimmedLiveHref = liveHref.trim();
  const [href, setHref] = useState(trimmedLiveHref || manualHref);
  const [label, setLabel] = useState(trimmedLiveHref ? liveLabel : manualLabel);

  useEffect(() => {
    const runtimeHref = window.WORKBOOK_CHECKOUT_URL?.trim() || "";

    if (runtimeHref) {
      setHref(runtimeHref);
      setLabel(liveLabel);
      return;
    }

    setHref(trimmedLiveHref || manualHref);
    setLabel(trimmedLiveHref ? liveLabel : manualLabel);
  }, [liveLabel, liveHref, manualHref, manualLabel, trimmedLiveHref]);

  return (
    <a className={className} href={href}>
      {label}
    </a>
  );
}
