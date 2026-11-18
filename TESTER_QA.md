# Tester Panel QA Checklist

Run this checklist on a disposable test save or a fresh test session. Do not use the only save you care about.

## Entry points
- [ ] Open the Tester Panel with F2.
- [ ] Open the game with `?debug=1`.
- [ ] Close the panel with its close button and reopen with F2.

## Existing controls
- [ ] Set money to a normal value and confirm the HUD updates.
- [ ] Try negative and very large money values; confirm values are clamped.
- [ ] Set level and XP; confirm XP stays below the next-level threshold.
- [ ] Set remaining day time to 0 and to the full shift duration; confirm the HUD updates.

## Gameplay tools
- [ ] While a normal order is active, queue a Student, Ninja Lead, Office, or Shipper customer.
- [ ] Finish the current order and confirm the selected customer appears through the normal queue flow.
- [ ] Confirm the queue does not grow beyond its normal capacity.
- [ ] If Gen Z is locked, confirm it is not offered; after unlocking it, confirm it can be selected.
- [ ] Trigger Saigon rain during a normal order; confirm the original rain event and its 3-second interaction window run.
- [ ] Try triggering rain outside a shift, during checkout, and during another interruption; confirm the action is rejected without interrupting gameplay.

## Inventory inspector
- [ ] Confirm all six stock values match the in-game inventory.
- [ ] Use ingredients in an order and confirm the displayed values refresh.
- [ ] Confirm the inspector has no controls that can mutate inventory.

## Save and gameplay regression
- [ ] Export and copy the save JSON.
- [ ] Confirm Tester Panel actions do not alter recipe requirements or cooking steps.
- [ ] Complete a full order: toppings, seasoning, rolling/cutting, and checkout.
- [ ] Refresh/reopen the game and verify the existing Continue/save flow remains intact.
- [ ] Confirm the game works normally after closing Tester Panel.

## Release gate
- [ ] GitHub Actions: progression tests pass.
- [ ] GitHub Actions: TypeScript check passes.
- [ ] GitHub Actions: production build passes.
- [ ] Manual browser checklist completed on the latest deployed commit.
