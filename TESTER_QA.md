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

## M6 – Nguyên liệu mở khóa theo cấp và HUD
- [ ] Ở cấp 1, chỉ sáu nguyên liệu cơ bản được mua; Phô Mai, Trân Châu, Sầu Riêng và Nước Cốt Dừa hiển thị cấp mở khóa và không thể mua.
- [ ] Ở cấp 2, mua Phô Mai được; các mặt hàng cấp 3/5/6 vẫn khóa.
- [ ] Ở cấp 3, mua Trân Châu được; Sầu Riêng và Nước Cốt Dừa vẫn khóa.
- [ ] Ở cấp 5, mua Sầu Riêng được; Nước Cốt Dừa vẫn khóa đến cấp 6.
- [ ] Ở cấp 6, mua Nước Cốt Dừa được; tiền, tồn kho và giới hạn sức chứa cập nhật chính xác.
- [ ] Thử gọi GameEngine.buyIngredient trực tiếp ở cấp thấp; xác nhận bị từ chối dù bỏ qua giao diện.
- [ ] Dùng từng topping sau khi mở khóa; xác nhận tồn kho giảm, bỏ topping/undo hoàn lại kho.
- [ ] Mở save phiên bản cũ không có bốn trường tồn kho mới; xác nhận game tiếp tục bình thường và sáu nguyên liệu cũ giữ nguyên.
- [ ] HUD trên desktop/mobile hiển thị cấp, thanh XP, nhiệm vụ, tiền và thời gian mà không che thao tác.

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

## M6 – Nhiệm vụ phụ hàng xóm
- [ ] Đến gần Chú Bảy và nhấn E hoặc nút tương tác; xác nhận lời mời nhiệm vụ phụ xuất hiện.
- [ ] Chọn “ĐỂ LÚC KHÁC”; xác nhận nhiệm vụ chưa được nhận và có thể hỏi lại Chú Bảy.
- [ ] Nhận lời; xác nhận mục tiêu “Gặp Cô Sáu” hiển thị ở bảng điều khiển.
- [ ] Tương tác Tí, Bà Tư hoặc NPC khác; xác nhận nhiệm vụ vẫn chưa hoàn thành.
- [ ] Đến Cô Sáu và tương tác; xác nhận nhiệm vụ phụ chuyển sang hoàn thành đúng một lần.
- [ ] Tương tác lại Chú Bảy/Cô Sáu; xác nhận không có phần thưởng hoặc tiến độ lặp.
- [ ] So sánh tiền, kho, XP, thời gian và nhiệm vụ Chương 1 trước/sau; tất cả phải giữ nguyên.
- [ ] Tải lại ứng dụng; xác nhận nhiệm vụ phụ không làm thay đổi save cũ (trạng thái phiên được reset).
- [ ] Kiểm tra modal và tracker trên desktop/mobile, không che điều khiển di chuyển.

## M6 – Nhiệm vụ phụ Chuyến hàng cuối ngõ
- [ ] Đến gần Tí giao hàng; nhấn E hoặc nút tương tác và xác nhận lời mời xuất hiện.
- [ ] Chọn “ĐỂ LÚC KHÁC”; xác nhận có thể hỏi lại Tí và nhiệm vụ chưa được nhận.
- [ ] Nhận lời; xác nhận mục tiêu gặp Bà Tư xuất hiện trên bảng điều khiển.
- [ ] Tương tác Cô Sáu, Chú Bảy hoặc NPC khác; xác nhận không hoàn thành nhầm nhiệm vụ.
- [ ] Đến Bà Tư và tương tác; xác nhận nhiệm vụ chuyển sang hoàn thành.
- [ ] Hoàn thành nhiệm vụ Tí trước/sau nhiệm vụ Chú Bảy; xác nhận hai trạng thái độc lập.
- [ ] So sánh tiền, kho, XP, thời gian và nhiệm vụ Chương 1 trước/sau; tất cả phải giữ nguyên.
- [ ] Tải lại ứng dụng; xác nhận trạng thái hai nhiệm vụ phụ reset theo phiên và không thay đổi save.
- [ ] Kiểm tra hai tracker và modal trên desktop/mobile, không che điều khiển di chuyển.

## M6 – Nhật ký nhiệm vụ khu phố
- [ ] Mở bản đồ > Nhiệm vụ; xác nhận có cả nhiệm vụ Chú Bảy và nhiệm vụ Tí.
- [ ] Khi chưa nhận, cả hai hiển thị “Chưa nhận” cùng NPC cần tìm.
- [ ] Nhận một nhiệm vụ; xác nhận chỉ nhiệm vụ đó chuyển sang “Đang thực hiện” và hiện đúng mục tiêu.
- [ ] Trì hoãn lời mời; xác nhận trạng thái vẫn là “Chưa nhận”.
- [ ] Hoàn thành một nhiệm vụ; xác nhận nhật ký chuyển đúng nhiệm vụ sang “Đã hoàn thành”.
- [ ] Làm tương tự với nhiệm vụ còn lại; xác nhận trạng thái độc lập, không bị ghi đè.
- [ ] Kiểm tra tab Nhật ký trên desktop/mobile và sau khi hoàn thành Chương 1.


## M6 – Bố cục bản đồ trên màn hình nhỏ
- [ ] Mở bản đồ ở màn hình điện thoại dọc (chiều cao khoảng 640px hoặc thấp hơn), mở tab Nhiệm vụ và cuộn từ nhiệm vụ Chương 1 xuống hết hai nhiệm vụ phụ.
- [ ] Xác nhận bảng Nhiệm vụ nằm phía trên cụm điều khiển dưới màn hình, không che các nút di chuyển và tương tác.
- [ ] Xoay ngang điện thoại hoặc dùng viewport thấp; xác nhận nội dung vẫn cuộn được và nút đóng bảng luôn truy cập được.
- [ ] Mở lời mời của Chú Bảy và Tí; xác nhận cả hai lựa chọn “NHẬN LỜI” và “ĐỂ LÚC KHÁC” nhìn thấy hoặc truy cập được bằng cuộn.
- [ ] Cuộn trong bảng/hộp thoại không làm nhân vật di chuyển hoặc cuộn trang nền.

## M6 – Khóa điều khiển nền khi mở hộp thoại/bảng bản đồ
- [ ] Mở lời mời nhiệm vụ rồi nhấn WASD/phím mũi tên/E; xác nhận nhân vật và NPC phía sau hộp thoại không bị điều khiển/tương tác.
- [ ] Nhấn Escape khi lời mời đang mở; xác nhận hộp thoại đóng nhưng nhiệm vụ vẫn ở trạng thái Chưa nhận và có thể hỏi lại NPC.
- [ ] Mở tab Nhật ký/Bản đồ rồi nhấn E; xác nhận chỉ đóng bảng, không tương tác với NPC đang bị che phía sau.
- [ ] Nhấn Escape khi bảng Nhật ký/Bản đồ đang mở; xác nhận bảng đóng mà không di chuyển nhân vật.


## M6 – Hội thoại sau khi hoàn thành nhiệm vụ khu phố
- [ ] Hoàn thành “Lời nhắn của Chú Bảy”; xác nhận lần đầu Cô Sáu hiện lời thoại hoàn thành, lần sau Cô Sáu và Chú Bảy đều ghi nhận việc đã chuyển tin.
- [ ] Hoàn thành “Chuyến hàng cuối ngõ”; xác nhận lần đầu Bà Tư hiện lời thoại hoàn thành, lần sau Bà Tư và Tí đều ghi nhận việc đã báo tin.
- [ ] Xác nhận NPC không liên quan và nhiệm vụ chưa hoàn thành vẫn dùng hội thoại bình thường.
- [ ] Xác nhận hai nhiệm vụ hoàn thành độc lập, không làm thay đổi tiền, kho, XP, thời gian hoặc nhiệm vụ Chương 1.
