# Changelog

## Unreleased
- Expanded Chapter 1 into a four-step story mission chain ending at level 5, while preserving existing mission IDs for old browser saves.
- Added Tester Panel controls for lifetime order count and earnings to test story progression, and ensured claimed mission rewards persist across reloads.
- Confirmed the intended save model: game progress and the active session stay in the current browser profile's localStorage; no account or cloud sync. Added isolation regression coverage.
- Tester Panel adds a live inventory inspector, a guarded customer-queue test action, and a guarded Saigon-rain trigger using existing gameplay logic.
- Tester Panel includes safe controls to set cash, player level/XP, and remaining day time; changes persist through the existing save systems.

- 2026-11-18: Added an isolated, read-only Tester Panel foundation (F2 / ?debug=1) with live HUD diagnostics and save export/copy.
- 2026-11-18: Added per-ingredient topping removal controls so players can remove a specific selected topping and refund its stock; retained global undo.
