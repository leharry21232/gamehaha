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


## Neighborhood map (M5)
- [ ] Start a fresh game and confirm the neighborhood opens without covering or breaking the onboarding flow.
- [ ] Walk with WASD and arrow keys; confirm the player stays on the sidewalk and cannot pass through the cart, drink stall, or trees.
- [ ] Walk around the lower edge of the cart to reach the grocery shop; confirm the route is not blocked.
- [ ] Visit the grocery shop, snack stall, drink stall, market entrance, neighbor NPC, and bánh tráng cart.
- [ ] At each point, press E and the on-screen interaction button; confirm the correct contextual text appears.
- [ ] Interact with the bánh tráng cart and confirm the existing morning-preparation screen opens.
- [ ] Use the Tester Panel > BẢN ĐỒ tab to open the map and teleport to each interaction point.
- [ ] Confirm informational interactions do not change cash, inventory, missions, vendor location, or save data.
- [ ] On a touch device or responsive emulator, verify the directional buttons and interaction button are usable and do not overlap important content.
- [ ] Close the map from both new-game onboarding and morning preparation; complete a normal cooking order to confirm the original gameplay loop is unchanged.

## Release gate
- [ ] GitHub Actions: progression tests pass.
- [ ] GitHub Actions: TypeScript check passes.
- [ ] GitHub Actions: production build passes.
- [ ] Manual browser checklist completed on the latest deployed commit.


## Neighborhood ambience (M6)
- [ ] Open the neighborhood map with an in-game morning state; confirm the morning event card appears.
- [ ] Use Tester Panel to adjust day time (or test a day with midday/afternoon state) and confirm the card changes to the matching day part.
- [ ] Confirm events rotate on a later in-game day.
- [ ] Confirm the event card does not block walking, NPC interaction, map controls, or the hide-controls button.
- [ ] Confirm event display does not change cash, inventory, mission progress, save data, or cooking behavior.


## M6 – Sự kiện khách tò mò ghé xe
- [ ] Đi bộ đến gần xe bánh tráng; xác nhận nút “KHÁCH TÒ MÒ” xuất hiện.
- [ ] Bấm nút và đọc hội thoại; xác nhận bản đồ vẫn mở và không có popup ép buộc.
- [ ] Xác nhận nút sự kiện không xuất hiện lại trong cùng phiên ứng dụng.
- [ ] Bỏ qua sự kiện và nhấn E; xác nhận quay về khu chuẩn bị như trước.
- [ ] So sánh tiền, kho, tiến độ nhiệm vụ và save trước/sau; tất cả phải giữ nguyên.
- [ ] Kiểm tra responsive desktop/mobile, bảo đảm nút không làm tràn bảng điều khiển.
