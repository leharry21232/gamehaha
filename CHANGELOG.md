# Changelog

## Unreleased
- Added the first explorable neighborhood slice using the existing 2D pixel-art scene: collision-aware movement, six local interaction points with dialogue, and Tester Panel map QA controls. No economy, inventory, save, or cooking-loop behavior is changed.
- Added collision-aware neighborhood exploration using the existing pixel-art SVG map, with six walkable interaction points and contextual NPC/store dialogue.
- Added keyboard and touch movement through shared world rules, plus Tester Panel map teleport/QA controls and regression tests.
- Map interactions are informational only in this slice; they do not alter cash, inventory, mission progress, or the cooking loop.
- Expanded Chapter 1 into a four-step story mission chain ending at level 5, while preserving existing mission IDs for old browser saves.
- Added Tester Panel controls for lifetime order count and earnings to test story progression, and ensured claimed mission rewards persist across reloads.
- Confirmed the intended save model: game progress and the active session stay in the current browser profile's localStorage; no account or cloud sync. Added isolation regression coverage.
- Tester Panel adds a live inventory inspector, a guarded customer-queue test action, and a guarded Saigon-rain trigger using existing gameplay logic.
- Tester Panel includes safe controls to set cash, player level/XP, and remaining day time; changes persist through the existing save systems.

- 2026-11-18: Added an isolated, read-only Tester Panel foundation (F2 / ?debug=1) with live HUD diagnostics and save export/copy.
- 2026-11-18: Added per-ingredient topping removal controls so players can remove a specific selected topping and refund its stock; retained global undo.


## M6 – Chapter 1 neighborhood integration
- Connected the map Journal tab to the live Chapter 1 mission snapshot, including progress, status, reward, and the existing reward-claim API.
- Made Cô Năm's neighborhood dialogue reflect the current story mission and progress.
