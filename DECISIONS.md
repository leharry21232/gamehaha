# Decisions

- New Game resets the active run wallet to the configured starter balance while retaining long-term progression fields (level, XP, lifetime earnings, completed orders, and decorations).
- Topping correction supports both global last-action undo and targeted removal by topping type; targeted removal must refund stock only for stock-backed ingredients.

- Tester Panel is introduced in stages: the first version is read-only and can export/copy save data; mutating controls wait for explicit GameEngine debug APIs and validation to avoid corrupting active sessions.


## Tester Panel controls
- Tester Panel mutating actions must call explicit clamped `GameEngine.debug*` methods. Never expose direct writes to engine internals or raw localStorage editing. Save import/reset and customer/event spawning remain separate milestones requiring validation and regression tests.


## Tester Panel gameplay tools
- Customer test actions replace only the last waiting-line entry; they do not increase queue capacity or bypass the normal order-spawn flow.
- Forced rain reuses the existing Saigon-rain event implementation and is blocked during other interruptions, checkout, non-cooking phases, and outside an active order.
- Inventory inspection is read-only and uses the live HUD inventory snapshot.
