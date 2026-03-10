# Clean Copy Review — Applied Leverage Site
**Author:** Goro Takemura (CMO)
**Date:** 2026-03-09
**Scope:** Full audit of `components/marketing-page.tsx` for internal design notes rendered as live customer-facing copy.

---

## Summary

Internal design/edit notes from the redesign process are rendering verbatim as visible `<h2>` headings, `<p>` paragraphs, and a hero paragraph block across all six pages. The pattern is uniform: each note describes what the section "now" does from a design perspective ("is now framed as", "now reads like", "has a real arc") instead of speaking to the visitor.

**Total flagged instances: 36**

Brand voice reference (from `copy/home.md`): sharp, direct, no fluff, operator language. Short sentences. Present tense. Outcomes-focused.

---

## Section 1: Hero Kicker (Home Page) — PRIORITY FIX

### `components/marketing-page.tsx` · Lines 1134–1136

**Current (live on site):**
```
The offer now opens as a command board: problem shape, build order, and
the first measurable wins all visible before the first scroll.
```

**Why it's wrong:** This is a design note describing what the panel was supposed to look like during the redesign, not a customer-facing sentence. Visitors are reading this as if it describes the product.

**Proposed replacement:**
```
Map your leverage. Sequence the build. Ship automations that free up your
calendar — not just your task list.
```

**Rationale:** Mirrors the three-step structure visible in the hero panel (Audit / Order / Build), uses operator language, speaks directly to the outcome. Replaces a design annotation with a real value statement.

---

## Section 2: Home Page — All Flagged Instances

### `components/marketing-page.tsx` · Line 288–290 (section-intro `<p>`)

**Current:**
```
The site now starts with a real website structure: benefits up front,
proof in the middle, and a clear path into the offer.
```
**Type:** Internal design note. "The site now" is first-person commentary on layout decisions.
**Proposed replacement:** Remove entirely, or replace with:
```
One offer. Two clear steps. A business that runs without you in the middle of everything.
```

---

### `components/marketing-page.tsx` · Line 315 (`<h2>` in Proof Bar section)

**Current:**
```
Social proof now reads like a strip, not a footnote.
```
**Type:** Design commentary. Visitors have no context for what this means.
**Proposed replacement:**
```
What operators say after the diagnostic.
```

---

### `components/marketing-page.tsx` · Line 331 (`<h2>` in Problem section)

**Current:**
```
The site now gives the bottleneck a shape prospects can recognize.
```
**Type:** Design intent note. Uses "the site" and "prospects" — speaking about the page, not to the visitor.
**Proposed replacement:**
```
Most operators aren't stuck on revenue. They're stuck on drag.
```

---

### `components/marketing-page.tsx` · Line 353 (`<h2>` in Who This Is For section)

**Current:**
```
Fit is framed as a clear operator profile, not generic audience copy.
```
**Type:** Design editorial. Comments on how fit is "framed" rather than speaking to the visitor.
**Proposed replacement:**
```
This is built for operators who are already making money.
```

---

## Section 3: Why Page — All Flagged Instances

### `components/marketing-page.tsx` · Line 406 (`<h2>` in Core Problem section)

**Current:**
```
The main argument leads with architecture, not tool hype.
```
**Type:** Internal description of argument structure.
**Proposed replacement:**
```
Your workflow is the bottleneck. Not your tools.
```

---

### `components/marketing-page.tsx` · Line 431 (`<h2>` in Reasons section)

**Current:**
```
Each failure mode is now framed as a card prospects can scan fast.
```
**Type:** Design layout note. References "cards" and "prospects" from a designer's perspective.
**Proposed replacement:**
```
Why AI tools haven't worked — and what's actually going wrong.
```

---

### `components/marketing-page.tsx` · Line 452 (`<h2>` in What Works section)

**Current:**
```
The solution is presented as a sequence: map first, build second.
```
**Type:** Design annotation. "The solution is presented as" is meta-commentary.
**Proposed replacement:**
```
Map the leverage first. Build in the right order.
```

---

### `components/marketing-page.tsx` · Line 478 (`<h2>` in Approach section)

**Current:**
```
Diagnostic and sprint are shown as one path with two entry points.
```
**Type:** Internal UX note about information architecture.
**Proposed replacement:**
```
One path. Two clear entry points.
```

---

### `components/marketing-page.tsx` · Line 505 (`<h2>` in Cost of Waiting section)

**Current:**
```
The cost of waiting now lands as an economic argument.
```
**Type:** Design intent note. "Lands as" is editorial commentary.
**Proposed replacement:**
```
Every month without leverage is a month you're still trading time for output.
```

---

## Section 4: Diagnostic Page — All Flagged Instances

### `components/marketing-page.tsx` · Line 560 (`<h2>` in Problem section)

**Current:**
```
Start with the real drag, then show exactly what the session removes.
```
**Type:** Internal instruction about content sequence, not customer copy.
**Proposed replacement:**
```
The problem isn't hustle. It's not knowing what to automate first.
```

---

### `components/marketing-page.tsx` · Line 585 (`<h2>` in What You Get section)

**Current:**
```
The offer now shows the deliverable as a product, not just copy.
```
**Type:** Editorial note. "Now shows" and "not just copy" are design-side observations.
**Proposed replacement:**
```
What you leave the call with.
```

---

### `components/marketing-page.tsx` · Line 605 (`<h2>` in Format section)

**Current:**
```
The call flow is laid out as a timeline with clear expectations.
```
**Type:** Design description. References layout ("laid out as a timeline") rather than the value.
**Proposed replacement:**
```
Ninety minutes. A map in your inbox within four hours.
```

---

### `components/marketing-page.tsx` · Line 621 (`<h2>` in Qualification section)

**Current:**
```
Good-fit and bad-fit signals now sit side by side.
```
**Type:** Layout note. "Sit side by side" describes UI arrangement.
**Proposed replacement:**
```
Is this the right move for you?
```

---

### `components/marketing-page.tsx` · Line 640 (`<h2>` in Pricing section)

**Current:**
```
Pricing, credit, and next-step logic are grouped into one decision block.
```
**Type:** UX architecture note. "Decision block" is internal terminology.
**Proposed replacement:**
```
$297 founding price — fully credited into the sprint if you continue.
```

---

### `components/marketing-page.tsx` · Line 660 (`<h2>` in About Lucas section)

**Current:**
```
The founder credibility section now reads like proof, not a sidebar.
```
**Type:** Editorial note critiquing a previous version of the section.
**Proposed replacement:**
```
Built by an operator who ran the same audit on his own business.
```

---

### `components/marketing-page.tsx` · Line 680 (`<h2>` in FAQ section)

**Current:**
```
Questions are broken into cards so objections can be scanned fast.
```
**Type:** UX design note. Describes the format, not the section content.
**Proposed replacement:**
```
Common questions.
```

---

### `components/marketing-page.tsx` · Line 700 (FormSection `title` prop → renders as `<h2>`)

**Current:**
```
Application section with trust signals and the form in context.
```
**Type:** Component architecture note. Should never have been copy.
**Proposed replacement:**
```
Apply for your diagnostic.
```

---

## Section 5: Sprint Page — All Flagged Instances

### `components/marketing-page.tsx` · Line 732 (`<h2>` in Problem section)

**Current:**
```
The page makes the execution bottleneck explicit before selling the sprint.
```
**Type:** Copywriting strategy note about page structure. Includes "selling the sprint" — internal framing.
**Proposed replacement:**
```
You know what to build. You're not building it.
```

---

### `components/marketing-page.tsx` · Line 752 (`<h2>` in Sprint Is section)

**Current:**
```
The core promise is framed around a live stack, not theory.
```
**Type:** Positioning note. "Framed around" is editorial language.
**Proposed replacement:**
```
Four weeks. Three automations. Your business runs differently on the other side.
```

---

### `components/marketing-page.tsx` · Line 779 (`<h2>` in Structure section)

**Current:**
```
The weekly structure is now a true timeline instead of one long markdown block.
```
**Type:** Explicit design/dev note. References markdown formatting.
**Proposed replacement:**
```
The four-week build.
```

---

### `components/marketing-page.tsx` · Line 800 (`<h2>` in Included section)

**Current:**
```
Included items are laid out as deliverable cards, not buried in bullets.
```
**Type:** Layout and formatting note. References "cards" and "bullets" — internal UI language.
**Proposed replacement:**
```
What's included in every sprint.
```

---

### `components/marketing-page.tsx` · Line 817 (`<h2>` in Qualification section)

**Current:**
```
The right-fit signal is paired against the reasons to start with the diagnostic.
```
**Type:** Content strategy note. "Right-fit signal" and "paired against" are editorial terms.
**Proposed replacement:**
```
Is the sprint the right starting point?
```

---

### `components/marketing-page.tsx` · Line 836 (`<h2>` in Pricing section)

**Current:**
```
Pricing, launch status, and what comes next are grouped into one panel.
```
**Type:** Layout note. References "panel" — UI design language.
**Proposed replacement:**
```
$3,500 flat. First soft-launch cohort only.
```

---

### `components/marketing-page.tsx` · Line 863 (`<h2>` in FAQ section)

**Current:**
```
Common objections are framed as execution questions, not generic FAQ filler.
```
**Type:** Copywriting meta-note. "Not generic FAQ filler" is editorial.
**Proposed replacement:**
```
Common questions.
```

---

### `components/marketing-page.tsx` · Line 883 (FormSection `title` → renders as `<h2>`)

**Current:**
```
Waitlist form paired with cohort and launch-trust signals.
```
**Type:** Component note. Never customer-facing copy.
**Proposed replacement:**
```
Join the sprint waitlist.
```

---

## Section 6: About Page — All Flagged Instances

### `components/marketing-page.tsx` · Line 907 (`<h2>` in Story section)

**Current:**
```
The founder story has a real narrative arc and delivery context.
```
**Type:** Editorial assessment of story quality. "Has a real narrative arc" is self-critique language.
**Proposed replacement:**
```
Lucas built this on himself first.
```

---

### `components/marketing-page.tsx` · Line 927 (`<h2>` in Council section)

**Current:**
```
The council now appears as a proper capability grid with role clarity.
```
**Type:** Design layout note. References "capability grid" and "role clarity" — internal terms.
**Proposed replacement:**
```
The AI council running the operation.
```

---

### `components/marketing-page.tsx` · Line 947 (`<h2>` in Product section)

**Current:**
```
The product rationale is tied back to the operator problem the site solves.
```
**Type:** Content strategy note. "Tied back to" and "the site solves" are meta-commentary.
**Proposed replacement:**
```
Why this became a product.
```

---

### `components/marketing-page.tsx` · Line 967 (`<h2>` in Who I Build For section)

**Current:**
```
The ideal client profile is framed with more conviction and less generic copy.
```
**Type:** Self-editorial note comparing to a previous version. "Less generic copy" is an internal observation.
**Proposed replacement:**
```
Who I build for.
```

---

### `components/marketing-page.tsx` · Line 984 (`<h2>` in Connect section)

**Current:**
```
Contact and next-step routes are positioned as the final trust block.
```
**Type:** UX positioning note. "Trust block" is internal design terminology.
**Proposed replacement:**
```
Where to go from here.
```

---

## Section 7: Apply Page — All Flagged Instances

### `components/marketing-page.tsx` · Line 1029 (`<h2>` in Two Paths section)

**Current:**
```
Two clear paths, each framed by the problem it solves.
```
**Type:** Borderline — "framed by" is slightly editorial but could pass as customer copy. Flagging for cleanup.
**Proposed replacement:**
```
Two paths. One right starting point for you.
```

---

### `components/marketing-page.tsx` · Line 1045 (`<h2>` in Not Sure section)

**Current:**
```
The page now recommends a default path instead of forcing a guess.
```
**Type:** Internal note. "The page now" references the site's own layout.
**Proposed replacement:**
```
Not sure which one fits?
```

---

### `components/marketing-page.tsx` · Line 1070 (FormSection `title` → renders as `<h2>`)

**Current:**
```
Diagnostic application with trust signals next to the form.
```
**Type:** Component note about layout.
**Proposed replacement:**
```
Apply for the diagnostic.
```

---

### `components/marketing-page.tsx` · Line 1081 (FormSection `title` → renders as `<h2>`)

**Current:**
```
Sprint waitlist with clearer expectations and commitment framing.
```
**Type:** Design note. "Commitment framing" is internal copy strategy language.
**Proposed replacement:**
```
Join the sprint waitlist.
```

---

## Implementation Notes for T-Bug

All flagged instances are in a single file: `components/marketing-page.tsx`.

The pattern is consistent: every `<h2>` inside a `renderXxxPage()` function body and every `title` prop passed to `FormSection` was written as an internal design annotation, not customer copy.

**Replacement is purely a find-and-replace on string literals.** No structural changes needed. No data model changes needed. Replace the hardcoded string, keep the surrounding JSX untouched.

**Highest priority (visible above the fold on the home page):**
1. Lines 1135–1136 — the hero-kicker paragraph in `HomeHero`
2. Lines 288–290 — the section-intro paragraph in the Solution section

**Everything else** is an `<h2>` heading — all broken in the same way, all fixable by swapping the string.

---

*Audit complete. Ready for T-Bug implementation.*
