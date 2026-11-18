# Decisions

- New Game resets the active run wallet to the configured starter balance while retaining long-term progression fields (level, XP, lifetime earnings, completed orders, and decorations).
- Topping correction supports both global last-action undo and targeted removal by topping type; targeted removal must refund stock only for stock-backed ingredients.

## Tester Panel
- Tester Panel mutating actions must call explicit clamped `GameEngine.debug*` methods. Never expose direct writes to engine internals or raw localStorage editing.
- Customer test actions replace only the last waiting-line entry; they do not increase queue capacity or bypass the normal order-spawn flow.
- Forced rain reuses the existing Saigon-rain event implementation and is blocked during other interruptions, checkout, non-cooking phases, and outside an active order.
- Inventory inspection is read-only and uses the live HUD inventory snapshot.
- The Save tab remains read-only; do not add import, reset, or sample-save management tools.
- Story-mission test counters are changed only through clamped GameEngine debug APIs exposed in Tester Panel.

## Local save ownership
- Store game progress and the active session in the browser's `localStorage`, scoped to the current site origin and browser profile.
- Different browsers or browser profiles have independent saves. A second tab in the same browser profile on the same origin uses that profile's existing save.
- Different devices have independent saves by default. Do not add account login, cloud sync, or cross-device transfer unless explicitly requested.
- A deployment on a different origin (for example, localhost versus the production domain) has a separate save.
- Clearing site data, using a private session that is later closed, or changing browser profiles can make a local save unavailable.

## Story progression
- The first three existing mission IDs remain unchanged to preserve completion records in older browser saves.
- Chapter 1 is a sequential chain ending at level 5. New chapters are not added until their gameplay systems and unlocks are ready.
- Claiming a story reward updates both the active run balance and persisted progression wallet, then persists the active session.

## Neighborhood map exploration
- Build on the existing SVG neighborhood scene; do not introduce a parallel renderer or a new dependency.
- The first explorable map is only the current bánh tráng neighborhood. No city-wide expansion in this slice.
- Player movement uses normalized viewport percentages, fixed sidewalk bounds, and collision rectangles aligned with the scene. Keyboard and touch controls must share the same movement function.
- The first six interaction points are the bánh tráng cart, tạp hóa cô Năm, sạp ăn vặt, quán nước chú Ba, cổng chợ, and cô Năm hàng xóm.
- Interactions are narrative-only for now. They must not change cash, inventory, save schema, mission progress, or cooking behavior.
- The player may return to the existing morning-preparation screen only by interacting with the bánh tráng cart.
- This approved M4.x exploration slice does not replace official Spec Kit M5 (decorations, skins, difficulty, and audio).
