# KETRI UI Standard — QA Checklist (Release Gate)

Purpose: acceptance criteria to merge changes that apply the KETRI UI Standard.

Capture & verification
- Home (Bleed) — Capture 2 screenshots:
  1) Desktop viewport showing hero bleeding to top (scroll=0).
 2) Mobile viewport showing hero bleeding and header reserved via `pt-header` (scroll=0).

- Sub pages — For each sub-page type (About, Service, Board): capture 1 screenshot at scroll=0 showing the hero area is offset below header.

- Hero-less pages — capture 1 screenshot showing content starts below header (no overlap).

Automated / Manual checks
- Check 1: `--app-header-h` exists in global CSS and has 72/80/88px breakpoint mapping.
- Check 2: `[data-has-hero]:not(.pt-header)` rule exists in global CSS and sets `padding-top: var(--app-header-h)`.
- Check 3: `data-hero-bleed` rule exists and sets `padding-top: 0`.
- Check 4: No occurrences of JS-based header height measurement that set inline padding/offset. (Search for `.clientHeight`, `getBoundingClientRect()` used to compute header height, or inline style assignments to paddingTop in header/hero files.)
- Check 5: No components with magic-number `padding-top: 84px` (or other header heights) in markup or inline styles.

Failure criteria (block merge)
- Any JS offset remains in codebase that manipulates layout to avoid header overlap.
- Any page that visually overlaps header in the captures (Hero/content behind fixed header).
- Missing or incorrect `--app-header-h` token values.
- `pt-header` used broadly to bypass `[data-has-hero]` without justification (i.e., non-Home pages).

Merge checklist
- [ ] CSS snippet copied into global stylesheet
- [ ] tokens added or confirmed present
- [ ] JS offsets removed
- [ ] Screenshots attached to PR demonstrating Home (2) + each subpage type + hero-less page
- [ ] QA signoff: reviewer confirms no overlap and all automated checks pass

Notes
- If a visual exception is required (rare), document it in PR body and update `ketri-ui-standard.md` with an exception note; do not change v1.0 in same PR.
