# Implementation Plan: Undo Topping Selection

## Technical Context

- Runtime: React + TypeScript + Vite.
- Gameplay input and inventory mutations live in `src/game/engine.ts`.
- Canvas layout and button rendering live in `src/game/layout.ts` and `src/game/renderer.ts`.
- Existing topping selection is handled by `GameEngine.addTopping`; each addition decrements stock for the four stocked ingredients and creates a flying visual.

## Design

1. Keep a per-order stack of successfully added topping IDs.
2. Push an ID only after the addition passes unlock and stock checks.
3. Undo pops one ID, decrements its selected count, refunds one unit for stocked ingredients, and removes the most recent matching flying or landed visual.
4. Reuse the existing secondary button rectangle during the `TOPPINGS` step for a visible undo control; this avoids changing responsive layout geometry.
5. Add Backspace and Ctrl+Z keyboard shortcuts, scoped strictly to the `TOPPINGS` step.
6. Clear history whenever `resetPrepBoard` starts a new order.

## Risks and Mitigations

- **In-flight animation race**: remove the item from `flyingToppings` first; only search `bowlIngredients` if no matching flight exists.
- **Inventory mismatch**: only refund the four IDs that are decremented during addition.
- **Scope regression**: leave order scoring and all later preparation steps unchanged.

## Validation

- TypeScript check and production build.
- Existing game tests.
- Manual checks: undo one of several toppings, undo a stocked ingredient, undo while its animation is in flight, and verify the control is inert after leaving the topping step.
