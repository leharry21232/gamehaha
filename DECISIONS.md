# Decisions

- New Game resets the active run wallet to the configured starter balance while retaining long-term progression fields (level, XP, lifetime earnings, completed orders, and decorations).
- Topping correction supports both global last-action undo and targeted removal by topping type; targeted removal must refund stock only for stock-backed ingredients.

- Tester Panel is introduced in stages: the first version is read-only and can export/copy save data; mutating controls wait for explicit GameEngine debug APIs and validation to avoid corrupting active sessions.
