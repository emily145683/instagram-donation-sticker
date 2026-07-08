# Instagram Donation Sticker — Spec & Gap Analysis

## Overview
A sticker-like feature for social media platforms that lets young people donate to charity quickly, in three linear screens. This document records the gap analysis of the original wireframe ([wireframes/wireframes.drawio](../wireframes/wireframes.drawio)), the decisions made to close those gaps, and remaining open questions. See [wireframes/wireframes-v2.drawio](../wireframes/wireframes-v2.drawio) for the updated wireframe/flow that implements these decisions.

## Original screens (v1)
- **Screen 1**: photo background, charity logo + name, single Donate button.
- **Screen 2**: charity name header, "Fact" text, info icon + link to charity website, 3 fixed amount buttons (£3/£5/£10), payment panel with 2 card icons.
- **Screen 3**: "Success" header, "Welcome to (charity) community" message, "You and X others donated £Y today" card, close (X) button top-left.

## Original flow (v1)
Start → display Screen 1 → donate button pressed → Screen 1 changes to Screen 2 → decision: does user press the info link? → **yes**: charity website displayed (dead end, no return path) / **no**: one of three amount buttons pressed → payment method chosen and amount paid → Screen changes from 2 to 3 → user presses close (X) → Stop.

## Gaps identified
1. **Dead-end branch** — the info-link path to the charity website never rejoins the flow.
2. **No back/cancel path** anywhere except the final close button on Screen 3.
3. **Payment step is a black box** — no detail on payment methods, card entry, authentication, or loading state.
4. **No failure states** — no flow for declined payment, network error, or timeout.
5. **Fixed amounts only** (£3/£5/£10) — no custom amount entry.
6. **Currency hardcoded to £** — no indication of localization.
7. **No age verification or parental consent** for a payment feature aimed at young people.
8. **"Fact" text** on Screen 2 has no defined content source.
9. **No receipt/confirmation details** on Screen 3 (amount, Gift Aid/tax info, email receipt).
10. **No viral/share loop** — no option to share the donation back to a story.
11. **"Others donated today" counter** — scope undefined (per-post/per-charity/global, real-time or cached).
12. **Charity selection/attachment** — no flow for how a charity gets attached to a post (assumed a separate, out-of-scope creator flow).

## Decisions
1. **Info link**: opens an in-app web view showing the charity website, with a Back action that returns the user to Screen 2 (closes the loop).
2. **Back/cancel navigation**: no explicit back/close buttons are added to Screens 1 or 2 — the platform's existing swipe-down-to-dismiss gesture is relied on for exiting mid-flow.
3. **Payment methods**: the two icons represent a generic card and Apple Pay/Google Pay. A **processing/loading state** is shown while payment is in progress, and a **payment failed state** is shown on failure, offering Retry (back to payment method selection) or Cancel (back to amount selection).
4. **Custom amount**: a 4th option is added on Screen 2 alongside £3/£5/£10, letting the user enter any amount.
5. **Age/parental consent**: a gate is added right after Start. If the user is not age-verified or lacks parental consent, they see a blocked/consent-request screen instead of proceeding to Screen 1.
6. **Deliverables**: this spec document plus a new, separate `.drawio` file containing the updated wireframe and flow (the original file is left unmodified).

## Updated screens (v2)
- **Screen 0 — Age/Parental Consent** *(new)*: age input, consent request action if underage, Continue action.
- **Screen 1**: unchanged — photo, logo + charity name, Donate button.
- **Screen 2**: charity header, Fact text, info icon + "Learn more" link, 4 amount options (£3/£5/£10/Custom), payment method icons (card, Apple/Google Pay), Pay Now button.
- **Screen 2a — In-app Web View** *(new)*: back button, address bar, charity website content.
- **Screen 2b — Processing** *(new)*: loading indicator while payment is submitted.
- **Screen 2c — Payment Failed** *(new)*: error message, Retry and Cancel actions.
- **Screen 3**: unchanged — Success header, welcome message, donation stats card, close (X) button.

## Updated flow (v2)
Start → age/consent check → **blocked**: show blocked/consent-request message → Stop, or **passed**: display Screen 1 → donate button pressed → Screen 1 changes to Screen 2 → decision: info link pressed? → **yes**: in-app web view displayed → user taps Back → returns to Screen 2 (loop) / **no**: user selects a preset or custom amount → user chooses payment method → processing payment → decision: payment successful? → **yes**: Screen changes from 2 to 3 → user presses close (X) → Stop / **no**: payment failed → decision: retry or cancel? → **retry**: back to payment method selection (loop) / **cancel**: back to amount selection (loop).

## Explicitly out of scope
- Detailed legal/compliance copy for consent and tax wording (flagged, not written here).
- The charity-selection/creator-side flow (how a charity gets attached to a post).
- Backend/payment-processor implementation details.

## Open questions
- What is the content source for the "Fact" text on Screen 2 (static per charity vs. rotating)?
- What is the exact scope of the "X others donated today" counter (per-post, per-charity, or global; real-time or cached)?
- Should Screen 3 support sharing the donation back to the user's story for virality?
- Should currency localize beyond £ for non-UK users?
- What receipt/Gift Aid/tax-deduction details, if any, should appear on Screen 3?
