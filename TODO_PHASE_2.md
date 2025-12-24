
Phase 2 review — ambiguous or removed pages

1) /board/qna* (files present on disk; routes NOT registered in src/App.tsx)

Suspected files / components:
- src/pages/board/QnAList.tsx — list page (renders items, currently no Link to details; onClick handlers are no-ops)
- src/pages/board/QnAForm.tsx — create/edit form (uses `useParams`, `createQnA`, `updateQnA`)
- src/pages/board/QnADetail.tsx — detail view (uses `useParams`, `getQnAById`, `addAnswer`, `deleteQnA`)
- src/services/qnaService.ts — data access for QnA
- src/types/index.ts — `QnA`, `QnAFormData` types
- src/pages/admin/Dashboard.tsx — imports/uses recent QnA stats (contextual reference)

Remaining Link / navigate references (checked repo-wide):
- No occurrences of literal path `/board/qna` or `/board/qna/` found outside the board files themselves.
- Within the QnA pages, navigations redirect to `/` or `/auth/login` (e.g., `navigate("/")`, `navigate("/auth/login")`) — these were kept as Phase-1 safe fallbacks.

Router confirmation (where NOT registered):
- src/App.tsx — routes include `/board/notice` but do NOT include any `/board/qna` or `/board/qna/:id` routes.

Notes / Phase-2 action items:
- Decide whether to re-add `/board/qna` routes to `src/App.tsx` or remove/archive the QnA pages. Per Phase-1, files are preserved.
- If re-adding routes is chosen later, consider enabling proper Link/navigation from site lists and mega menu.

2) /board/free* (files present on disk; routes NOT registered in src/App.tsx)

Suspected files / components:
- src/pages/board/FreeList.tsx — list page (renders posts; item onClick are no-ops)
- src/pages/board/FreeForm.tsx — create/edit form (uses `useParams`, `createFreePost`, `updateFreePost`)
- src/pages/board/FreeDetail.tsx — detail view (uses `useParams`, `getFreePost`, `deleteFreePost`, `incrementFreePostViews`)
- src/services/freeService.ts — data access for Free posts
- src/types/index.ts — `FreePost`, `FreeFormData` types

Remaining Link / navigate references (checked repo-wide):
- No occurrences of literal path `/board/free` or `/board/free/` found outside the board files themselves.
- Within these pages, navigations redirect to `/` (e.g., `navigate("/")`) for cancel/after-save and on missing data — kept as Phase-1 safe behavior.

Router confirmation (where NOT registered):
- src/App.tsx — routes include only `/board/notice` (no `/board/free` or `/board/free/:id` entries).

Notes / Phase-2 action items:
- Decide whether to re-add `/board/free` routes to `src/App.tsx` or remove/archive the Free board pages.
- If re-adding routes, ensure menu/search entries are restored and mobile/mega menus reflect those paths.

General Phase-2 checklist:
- Review admin pages that interact with QnA/Free services (admin edit/delete flows).
- Confirm any CMS/data expectations (Firestore collections `qna`, `free` exist and are intended to be public).
- If removing files in Phase-2, update `src/constants/menu.ts` and search modal items accordingly.

Policy: per Phase-1 rules, no files were deleted and no routes were added in this change.


3) Other UI links pointing to routes NOT registered in `src/App.tsx`

Suspected files / locations:
- src/components/layout/Footer.tsx
	- Links: `/terms`, `/privacy`, `/about/location` (note: `/about/location` is registered)
- src/components/common/ProtectedRoute.tsx
	- Navigates to `/login` when unauthenticated (no `/login` route in `src/App.tsx`)
- src/components/admin/AdminLayout.tsx
	- Links: `/admin/dashboard`, `/admin/notice`, `/admin/nara-purchase` (admin routes not present in `src/App.tsx` — admin may be mounted separately)
- src/pages/admin/AdminLogin.tsx
	- Contains `to="/"` usages and references (admin login page exists but not wired in `src/App.tsx`)

Notes:
- These UI references are harmless for Phase-1 (some navigate to `/` or are internal to admin area), but should be reviewed in Phase-2 to decide whether to:
	- add corresponding routes to `src/App.tsx` (if intended), or
	- hide/neutralize links and surface a migration plan.

Phase-1 neutralizations (DONE):
- `src/components/layout/Footer.tsx`: replaced `Link` to `/terms`, `/privacy`, and `/admin/login` with non-clickable `span` elements to avoid linking to unregistered routes.
- `src/components/common/ProtectedRoute.tsx`: changed redirect from `/login` to `/` to avoid referencing non-registered `/login` route.
- `src/components/admin/AdminLayout.tsx`: replaced `/admin/*` links (`/admin/dashboard`, `/admin/notice`, `/admin/nara-purchase`) with non-clickable spans and removed the logo link to `/admin/dashboard`.
- `src/pages/admin/AdminLogin.tsx`: changed post-login navigation from `/admin/dashboard` to `/` to avoid routing to an unregistered admin path.

Ambiguous / leave-for-Phase-2 (no action taken):
- `src/pages/board/*` (QnA/Free files) preserved — decide in Phase-2 whether to re-add routes or delete/archive.



