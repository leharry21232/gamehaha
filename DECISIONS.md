# Decisions

- New Game resets the active run wallet to the configured starter balance while retaining long-term progression fields (level, XP, lifetime earnings, completed orders, and decorations).
- Topping correction supports both global last-action undo and targeted removal by topping type; targeted removal must refund stock only for stock-backed ingredients.

## Tester Panel
- Tester Panel is introduced in stages: the first version is read-only and can export/copy save data; mutating controls wait for explicit GameEngine debug APIs and validation to avoid corrupting active sessions.
- Tester Panel mutating actions must call explicit clamped `GameEngine.debug*` methods. Never expose direct writes to engine internals or raw localStorage editing.
- Customer test actions replace only the last waiting-line entry; they do not increase queue capacity or bypass the normal order-spawn flow.
- Forced rain reuses the existing Saigon-rain event implementation and is blocked during other interruptions, checkout, non-cooking phases, and outside an active order.
- Inventory inspection is read-only and uses the live HUD inventory snapshot.
- The Save tab remains read-only; do not add import, reset, or sample-save management tools.

## Local save ownership
- Store game progress and the active session in the browser's `localStorage`, scoped to the current site origin and browser profile.
- Different browsers or browser profiles have independent saves. A second tab in the same browser profile on the same origin uses that profile's existing save.
- Different devices have independent saves by default. Do not add account login, cloud sync, or cross-device transfer unless explicitly requested.
- A deployment on a different origin (for example, localhost versus the production domain) has a separate save.
- Clearing site data, using a private session that is later closed, or changing browser profiles can make a local save unavailable. Explain this limitation clearly.
