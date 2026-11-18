# Tasks

## Current bug-fix milestone
- [x] Add per-ingredient topping removal controls.
- [x] Keep global topping undo and keyboard shortcuts.
- [x] Audit New Game wallet reset path and ensure both active balance and persisted progression wallet reset to starter cash.
- [x] Confirm latest CI passes tests, TypeScript, and production build.
- [x] Verify New Game balance in browser after confirming selling location.
- [x] Verify per-ingredient removal and inventory refund in browser.
- [x] Add Tester Panel foundation with F2 and ?debug=1 entry points.
- [x] Show read-only gameplay diagnostics and export/copy current save data.
- [x] Add safe GameEngine debug actions for money, level/XP, and day time.
- [x] Add safe customer queue replacement and controlled Saigon-rain event trigger to Tester Panel.
- [x] Confirm save data remains local to each browser profile/device; no cloud sync or account dependency.
- [x] Add read-only inventory inspector and gameplay QA entry points.
- [x] Add automated regression coverage proving independent browser storage areas do not share player progression.
- [ ] Manual browser QA: play and reload in Browser A, confirm the save resumes; open Browser B (or a separate browser profile) and confirm it starts independently; return to Browser A and confirm its original save remains.

## Explicitly out of scope
- Cloud save synchronization, account-based saves, and cross-device transfer.
- Save import/reset tools and sample-save management. Keep the Tester Panel's save view read-only.
