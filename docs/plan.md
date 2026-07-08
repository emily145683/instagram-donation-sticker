# Plan: Close Gaps in Donation-Sticker Wireframes & Flow

## Context
The workspace originally contained only [wireframes/wireframes.drawio](../wireframes/wireframes.drawio) (2 tabs: "Wireframe" = 3 screens, "Flow diagram" = storyboard). This plan captures the gap analysis of that file and the design decisions made before implementation.

## Existing design (as analyzed)
- **Screen 1**: photo background, charity logo + name, single Donate button.
- **Screen 2**: charity name header, "Fact" text, info icon + link (charity website), 3 fixed amount buttons (£3/£5/£10), payment panel with 2 card icons.
- **Screen 3**: "Success" header, "Welcome to (charity) community", "You and X others donated £Y today" card, close (X) top-left.
- **Flow**: Start → Screen 1 → donate tap → Screen 2 → [info link? yes: charity website (dead end) / no: pick amount] → choose payment + pay → Screen 2 → Screen 3 → tap X → Stop.

## Decisions
1. Info link opens an **in-app web view** with a back path returning to Screen 2 (fixes the dead end).
2. Back/cancel navigation: **rely on OS/platform swipe-down gesture only** — no explicit back/close buttons added to Screens 1/2.
3. Payment icons represent **card + Apple/Google Pay**. Added a **loading/processing state** and a **payment failure state** (with retry/cancel).
4. Added a **custom donation amount** option on Screen 2, alongside £3/£5/£10.
5. Added an **age verification / parental consent** gate, since the audience is young people handling real payments.
6. Deliverables: **(a)** a new, separate `.drawio` diagram (original untouched) with updated screens + flow, and **(b)** a written spec document capturing the gap analysis and decisions.

## Steps
1. Write spec document ([docs/donation-sticker-spec.md](./donation-sticker-spec.md)): screen-by-screen description, full gap list, decisions above, and remaining open questions.
2. Design updated flow logic:
   - New gate right after Start: age/parental-consent check decision → (a) proceed to Screen 1, (b) request parental consent, (c) blocked message if underage & no consent.
   - Info-link branch: Screen 2 → info link → in-app web view → back → returns to Screen 2 (closes the loop).
   - Screen 2 amount step: add a 4th "Custom amount" entry alongside the 3 presets.
   - Payment step split into: choose payment method → processing/loading state → success (→ Screen 3) or failure (→ retry/cancel loop).
3. Build new `.drawio` file ([wireframes/wireframes-v2.drawio](../wireframes/wireframes-v2.drawio)), separate from the original, with two tabs mirroring the original's structure and shape conventions, implementing the new screens/nodes from step 2.
4. Cross-check the new diagram against the spec doc for consistency.

## Relevant files
- `wireframes/wireframes.drawio` — existing file, reference/style base only, not modified.
- `wireframes/wireframes-v2.drawio` — new file with updated Wireframe + Flow diagram tabs.
- `docs/donation-sticker-spec.md` — new written spec doc.
- `docs/plan.md` — this document.

## Verification
1. Open both tabs of the new `.drawio` file in the draw.io editor to confirm layout renders correctly and matches the original style.
2. Manually trace every path in the updated flow diagram (including the age-gate, info-link loop, and payment failure loop) to confirm no dead ends remain.
3. Review the spec doc against the diagram to ensure every screen/decision referenced in one exists in the other.

## Explicitly out of scope
- No implementation code (wireframe/spec stage only).
- No changes to the original `wireframes.drawio` file.
- No detailed legal copy (consent wording, Gift Aid terms) — flagged as open items needing legal/compliance input.
- Charity-selection/creator-side flow (how a charity gets attached to a post) — a related but separate flow, not designed here.

## Open questions (flagged in spec, not blocking this plan)
- Content source for the "Fact" text on Screen 2.
- Exact scope/refresh of the "X others donated today" counter.
- Whether a share-back-to-story / virality mechanic is wanted on Screen 3.
- Currency localization beyond £.
- Receipt / Gift Aid / tax-deduction details on Screen 3.
