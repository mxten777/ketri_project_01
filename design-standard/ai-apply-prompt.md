# AI Apply Prompt — Apply KETRI UI Standard

Purpose: give an actionable prompt to port the KETRI UI Standard into another codebase. The prompt is intentionally prescriptive so an automated tool or human following it will reproduce KETRI behavior exactly.

FREEZE: v1.0 — DO NOT change `--app-header-h` behavior or hero-padding rules. JS offsets are forbidden.

Apply steps (commit message: `fix: apply KETRI UI standard`):
1) Ensure project has a global CSS entry point and a `:root` where CSS variables can be defined.
2) Add tokens (copy `design-standard/tokens.css`) into the global CSS. Preserve values for `--app-header-h` (72/80/88px breakpoints).
3) Add the snippet `design-standard/index.css.snippet.css` into the global stylesheet (copy/paste). This creates the canonical:
   - `[data-has-hero]:not(.pt-header) { padding-top: var(--app-header-h); }`
   - `[data-hero-bleed] { padding-top: 0; }`
4) Replace any JS-driven header offset code: find patterns that measure header height and apply inline `style.paddingTop` or similar — remove them and rely on `data-has-hero` rule.
5) Ensure `main` or layout root uses `pt-header` only where Home bleed behavior is intended. Other pages must use `data-has-hero`.
6) Run QA (follow `design-standard/qa-checklist.md`).
7) Commit with message: `fix: apply KETRI UI standard` and open PR titled: "chore: apply ketri-ui-standard v1.0". Add reviewer and QA label.

Apply rules (1..7) — required checklist for automation:
1. FREEZE: Do not change `--app-header-h` numeric values in the commit.
2. NO JS OFFSETS: Remove any code that programmatically measures header and sets offsets.
3. PT-HEADER RULE: `pt-header` is a utility mapping to `var(--app-header-h)` — preserve its usage for Home only.
4. DATA ATTRS: Use `data-has-hero` on sections that need header-safe offsets; use `data-hero-bleed` only for explicit bleed cases.
5. COMMIT MSG: `fix: apply KETRI UI standard` (automation will look for this exact message).
6. QA: All checks in `qa-checklist.md` must pass before merging.
7. VERSION: Do not update `ketri-ui-standard.md` version in the same PR. Version bumps follow `chore: bump ketri-ui-standard vX.Y`.

Notes for implementer: include `design-standard/index.css.snippet.css` exactly; it is intended to be copy-paste ready and minimal to avoid token drift.
