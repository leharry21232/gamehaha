# Tasks

## Current milestone: Chapter 1 story progression (M4)
- [x] Preserve existing story mission IDs so browser saves from earlier builds remain valid.
- [x] Group the existing first-customer, lifetime-earnings, and level-three missions into Chapter 1.
- [x] Add the Chapter 1 level-five finale and reward.
- [x] Add Tester Panel controls for lifetime completed orders and lifetime earnings.
- [x] Persist mission reward money to both progression and active session saves.
- [x] Add regression tests for sequential unlocks, completion, legacy IDs, and reward claiming.
- [ ] Verify the Chapter 1 mission chain in the browser from a fresh profile and an existing save.
- [ ] Verify claiming each reward survives a page reload and Continue.

## Previous completed work
- [x] Per-ingredient topping removal and global undo.
- [x] Tester Panel foundation, safe gameplay controls, inventory inspector, and read-only save export.
- [x] Per-browser localStorage save ownership; no cloud sync or account dependency.
- [x] Automated regression coverage for independent browser storage areas.

## Explicitly out of scope
- Cloud save synchronization, account-based saves, and cross-device transfer.
- Save import/reset tools and sample-save management. Keep the Tester Panel's save view read-only.
- Changing the existing bánh tráng preparation mechanics, timing, or scoring as part of the story milestone.
