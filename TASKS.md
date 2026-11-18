# Tasks

## Current milestone: Neighborhood exploration foundation (M4.x, approved extension before official M5)
- [x] Preserve existing story mission IDs so browser saves from earlier builds remain valid.
- [x] Group the existing first-customer, lifetime-earnings, and level-three missions into Chapter 1.
- [x] Add the Chapter 1 level-five finale and reward.
- [x] Add Tester Panel controls for lifetime completed orders and lifetime earnings.
- [x] Persist mission reward money to both progression and active session saves.
- [x] Add regression tests for sequential unlocks, completion, legacy IDs, and reward claiming.
- [ ] Verify the Chapter 1 mission chain in the browser from a fresh profile and an existing save.
- [ ] Verify claiming each reward survives a page reload and Continue.

- [x] Audit and reuse the existing neighborhood SVG scene rather than creating a parallel map renderer.
- [x] Add bounded sidewalk movement with collision and axis sliding.
- [x] Add six reachable interaction points: bánh tráng cart, grocery, snack stall, drink stall, market gate, and neighbor NPC.
- [x] Route keyboard and touch movement through the same collision rules.
- [x] Add Tester Panel map diagnostics and teleport controls.
- [x] Add regression tests for bounds, collision, sliding, interaction range, and walkable interaction points.
- [ ] Verify keyboard movement, touch controls, all six interactions, and cart return in a real browser.
- [ ] Verify map overlay does not interfere with morning preparation, pause, or cooking flow.

**Roadmap note:** This M4.x neighborhood slice is an approved extension. Official Spec Kit M5 remains decoration, skins, difficulty, and audio.
 
## Previous completed work
- [x] Per-ingredient topping removal and global undo.
- [x] Tester Panel foundation, safe gameplay controls, inventory inspector, and read-only save export.
- [x] Per-browser localStorage save ownership; no cloud sync or account dependency.
- [x] Automated regression coverage for independent browser storage areas.

## Explicitly out of scope
- Cloud save synchronization, account-based saves, and cross-device transfer.
- Save import/reset tools and sample-save management. Keep the Tester Panel's save view read-only.
- Changing the existing bánh tráng preparation mechanics, timing, or scoring as part of the story milestone.
