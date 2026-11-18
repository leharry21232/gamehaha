# Changelog

## Unreleased
- Confirmed the intended save model: game progress and the active session stay in the current browser profile's localStorage; no account or cloud sync. Added regression coverage for independent storage areas.
- Tester Panel adds a live inventory inspector, a guarded customer-queue test action, and a guarded Saigon-rain trigger using existing gameplay logic.
- Tester Panel includes safe controls to set cash, player level/XP, and remaining day time; changes persist through the existing save systems.

- 2026-11-18: Added an isolated, read-only Tester Panel foundation (F2 / ?debug=1) with live HUD diagnostics and save export/copy.
- 2026-11-18: Added per-ingredient topping removal controls so players can remove a specific selected topping and refund its stock; retained global undo.
