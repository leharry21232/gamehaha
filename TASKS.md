# Tasks

## Current milestone: Neighborhood exploration foundation (M4.x, approved extension before official M5)
- [x] Preserve existing story mission IDs so browser saves from earlier builds remain valid.
- [x] Group the existing first-customer, lifetime-earnings, and level-three missions into Chapter 1.
- [x] Add the Chapter 1 level-five finale and reward.
- [x] Add Tester Panel controls for lifetime completed orders and lifetime earnings.
- [x] Persist mission reward money to both progression and active session saves.
- [x] Add regression tests for sequential unlocks, completion, legacy IDs, and reward claiming.
- [ ] Verify the Chapter 1 mission chain in the browser from a fresh profile and an existing save.
- [ ] Verify claiming each reward survives a page reload and Continue.

- [x] Audit and reuse the existing neighborhood SVG scene rather than creating a parallel map renderer.
- [x] Add bounded sidewalk movement with collision and axis sliding.
- [x] Add six reachable interaction points: bánh tráng cart, grocery, snack stall, drink stall, market gate, and neighbor NPC.
- [x] Route keyboard and touch movement through the same collision rules.
- [x] Add Tester Panel map diagnostics and teleport controls.
- [x] Add regression tests for bounds, collision, sliding, interaction range, and walkable interaction points.
- [ ] Verify keyboard movement, touch controls, all six interactions, and cart return in a real browser.
- [ ] Verify map overlay does not interfere with morning preparation, pause, or cooking flow.

**Roadmap note:** This M4.x neighborhood slice is an approved extension. Official Spec Kit M5 remains decoration, skins, difficulty, and audio.
 
## Previous completed work
- [x] Per-ingredient topping removal and global undo.
- [x] Tester Panel foundation, safe gameplay controls, inventory inspector, and read-only save export.
- [x] Per-browser localStorage save ownership; no cloud sync or account dependency.
- [x] Automated regression coverage for independent browser storage areas.

## Explicitly out of scope
- Cloud save synchronization, account-based saves, and cross-device transfer.
- Save import/reset tools and sample-save management. Keep the Tester Panel's save view read-only.
- Changing the existing bánh tráng preparation mechanics, timing, or scoring as part of the story milestone.


## M6 – Mở rộng khu phố và tiến trình người chơi (đang triển khai)
- [x] Thêm bốn nguyên liệu topping mới vào chợ nhập hàng với giá và cấp mở khóa riêng.
- [x] Khóa thao tác mua và sử dụng topping mới khi chưa đạt cấp; kiểm tra tại GameEngine, không chỉ khóa giao diện.
- [x] Giữ save cũ tương thích: các nguyên liệu mới được khởi tạo tồn kho bằng 0 khi tiếp tục save phiên bản trước.
- [x] Hiển thị cấp độ, thanh XP, nhiệm vụ, tiền và thời gian trên HUD đầu màn hình.
- [ ] Kiểm tra thủ công cấp 1–6, mua hàng, tồn kho và sử dụng từng topping mới.
- [ ] Kiểm tra save cũ sau nâng cấp và xác nhận số lượng nguyên liệu cũ không đổi.
- [ ] Hoàn tất CI, TypeScript và production build.

## M6 – Kết nối bản đồ với Chương 1 (đang triển khai)
- [x] Hiển thị nhiệm vụ Chương 1 trực tiếp trong tab Nhật ký trên bản đồ.
- [x] Hiển thị tiến độ, trạng thái, phần thưởng và nút nhận thưởng khi đủ điều kiện.
- [x] Kết nối lời thoại Cô Năm với nhiệm vụ hiện tại và tiến độ của người chơi.
- [ ] Kiểm tra hội thoại bằng phím E và nút tương tác trên thiết bị cảm ứng.
- [ ] Kiểm tra nhận thưởng từ Nhật ký và xác nhận số dư được lưu sau khi tải lại.
- [ ] Hoàn tất kiểm thử regression, TypeScript và production build.


### M6 – Phần 2: NPC khu phố
- [x] Thêm Cô Sáu bán hoa, Tí giao hàng, chú Bảy sửa xe và bà Tư hàng xóm vào dữ liệu tương tác.
- [x] Hiển thị bốn NPC bằng sprite pixel-art riêng, có tên trên bản đồ.
- [x] Cho phép trò chuyện với NPC bằng E hoặc nút tương tác cảm ứng, dùng chung hệ thống tương tác hiện có.
- [x] Bổ sung kiểm thử hội thoại, vị trí đi bộ được và vùng tương tác cho cả năm NPC.
- [ ] Kiểm tra trực tiếp vị trí sprite trên màn hình desktop/mobile và xác nhận không che lối đi.
- [ ] Kiểm tra thủ công lời thoại từng NPC và tương tác với các địa điểm cũ.
- [ ] Hoàn tất CI, TypeScript và production build.


### M6 – Phần 3: Nhịp sống và sự kiện khu phố
- [x] Xác định buổi sáng/trưa/chiều theo tiến độ thời gian trong ngày của game.
- [x] Thêm sự kiện không gây gián đoạn, luân phiên theo ngày và thời điểm trong ngày.
- [x] Hiển thị thẻ nhịp sống khu phố gọn trên bản đồ, không chặn điều khiển di chuyển.
- [x] Bổ sung kiểm thử cho mốc thời gian, luân phiên sự kiện và dữ liệu thời gian không hợp lệ.
- [ ] Kiểm tra thủ công thẻ sự kiện ở các giai đoạn sáng/trưa/chiều trên bản đồ.
- [ ] Xác nhận sự kiện không che NPC, không chặn thao tác di chuyển/tương tác và không thay đổi kinh tế/save.
- [ ] Hoàn tất CI, TypeScript và production build.


### M6 – Phần 4: Tương tác sự kiện khu phố (lát cắt đầu tiên)
- [x] Thêm lời mời trò chuyện tùy chọn với một vị khách tò mò khi người chơi đứng gần xe bánh tráng.
- [x] Giữ tương tác E hiện tại: nhấn E tại xe vẫn quay về khu chuẩn bị ngay như trước.
- [x] Sự kiện chỉ hiển thị hội thoại, chỉ xuất hiện một lần trong phiên chạy ứng dụng và không ghi vào save.
- [x] Bổ sung regression test xác nhận dữ liệu sự kiện chỉ chứa nội dung hội thoại.
- [ ] Kiểm tra thủ công nút khách tò mò trên desktop/mobile và xác nhận có thể bỏ qua.
- [ ] Xác nhận sau hội thoại, nhấn E tại xe vẫn mở khu chuẩn bị; tiền, kho, nhiệm vụ và save không đổi.


### M6 – Phần 5: Nhiệm vụ phụ hàng xóm
- [x] Thêm lời nhờ tùy chọn từ Chú Bảy, có lựa chọn nhận lời hoặc để lúc khác.
- [x] Khi nhận lời, theo dõi mục tiêu gặp Cô Sáu và hoàn thành khi tương tác đúng NPC.
- [x] Hiển thị tiến độ nhiệm vụ phụ trên bảng điều khiển khu phố.
- [x] Giữ nhiệm vụ phụ tách biệt khỏi nhiệm vụ Chương 1, tiền, kho, XP, thời gian và vòng lặp bán bánh.
- [x] Không thêm dữ liệu vào save; trạng thái nhiệm vụ chỉ tồn tại trong phiên ứng dụng hiện tại.
- [ ] Kiểm tra thủ công luồng nhận lời, trì hoãn, nhắc lại và hoàn thành trên desktop/mobile.
- [ ] Xác nhận tương tác NPC không liên quan không hoàn thành nhầm nhiệm vụ; nhiệm vụ Chương 1 và gameplay bán hàng không đổi.
- [ ] Hoàn tất CI, TypeScript và production build.


### M6 – Phần 6: Nhiệm vụ phụ Chuyến hàng cuối ngõ
- [x] Thêm lời nhờ tùy chọn từ Tí giao hàng, có lựa chọn nhận lời hoặc để lúc khác.
- [x] Khi nhận lời, theo dõi mục tiêu gặp Bà Tư; chỉ tương tác đúng NPC mới hoàn thành.
- [x] Hiển thị mục tiêu và trạng thái hoàn thành độc lập với nhiệm vụ Chú Bảy.
- [x] Bổ sung kiểm thử cho lời mời, trì hoãn, nhắc lại, giao lời và NPC không liên quan.
- [x] Giữ nhiệm vụ thuần kể chuyện, chỉ tồn tại trong phiên; không thay đổi save, tiền, kho, XP, thời gian hoặc nhiệm vụ Chương 1.
- [ ] Kiểm tra thủ công cả hai nhiệm vụ phụ cùng tồn tại trên desktop/mobile.
- [ ] Xác nhận nhận/hoàn thành nhiệm vụ này không làm thay đổi trạng thái nhiệm vụ Chú Bảy và ngược lại.
- [ ] Hoàn tất CI, TypeScript và production build.


### M6 – Phần 7: Nhật ký nhiệm vụ khu phố
- [x] Thêm danh sách hai nhiệm vụ phụ trong tab Nhiệm vụ của bản đồ.
- [x] Hiển thị trạng thái Chưa nhận / Đang thực hiện / Đã hoàn thành và hướng dẫn NPC cần gặp.
- [x] Nội dung nhật ký đọc trực tiếp trạng thái React hiện tại; không tạo save mới hoặc thay đổi tiến trình nhiệm vụ.
- [ ] Kiểm tra trạng thái nhật ký cập nhật sau khi nhận, trì hoãn và hoàn thành từng nhiệm vụ.
- [ ] Kiểm tra bố cục nhật ký trên desktop/mobile và khi Chương 1 đã hoàn thành.
- [ ] Hoàn tất CI, TypeScript và production build.


### M6 – Phần 8: Hoàn thiện bố cục bảng nhiệm vụ trên màn hình nhỏ
- [x] Đặt bảng thông tin/Nhật ký trong vùng an toàn phía trên cụm điều khiển dưới màn hình.
- [x] Cho phép cuộn nội dung Nhật ký theo chiều dọc trên màn hình cảm ứng, không cuộn nhầm bản đồ.
- [x] Giới hạn chiều cao hộp thoại nhận nhiệm vụ để các nút lựa chọn luôn có thể truy cập trên màn hình thấp.
- [ ] Kiểm tra Nhật ký khi có đủ nhiệm vụ Chương 1 và hai nhiệm vụ phụ ở màn hình điện thoại dọc/ngang.
- [ ] Kiểm tra hai hộp thoại nhận nhiệm vụ trên màn hình thấp và xác nhận nút NHẬN LỜI / ĐỂ LÚC KHÁC luôn nhìn thấy, cuộn được khi cần.
- [ ] Xác nhận các nút di chuyển, tương tác và đóng bản đồ không bị bảng thông tin che khuất.


### M6 – Phần 9: Khóa tương tác nền khi mở giao diện
- [x] Chặn WASD/phím mũi tên/E khi hộp thoại nhận nhiệm vụ đang mở để không điều khiển nhân vật hoặc tương tác phía sau.
- [x] Hỗ trợ Escape để đóng lời mời mà không nhận/từ chối nhiệm vụ.
- [x] Khi bảng Bản đồ/Nhật ký đang mở, phím E chỉ đóng bảng thay vì tương tác với NPC bị che.
- [x] Hỗ trợ Escape đóng bảng đang mở; giữ nguyên WASD/phím mũi tên để đóng bảng và di chuyển như luồng hiện tại.
- [ ] Kiểm tra thủ công các trường hợp phím khi hộp thoại và bảng đang mở.
