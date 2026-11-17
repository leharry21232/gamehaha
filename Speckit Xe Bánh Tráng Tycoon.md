# Speckit: Xe Bánh Tráng Tycoon

*Bản đặc tả gameplay + UI/UX cho ChatGPT / Codex, phiên bản 0.1 (prototype gameplay, chưa deploy).*

Quy ước: **\[YC\]** là yêu cầu của chủ dự án (kèm số thứ tự #1 đến #25). **\[ĐX\]** là phần đề xuất thêm để game hay hơn. Mọi mục \[ĐX\] đều phải điều khiển được từ Tester Panel (mục 15).

## 0. Cách dùng file này với ChatGPT

Dán toàn bộ file này cùng link repo https://github.com/leharry21232/gamehaha vào ChatGPT, rồi bắt buộc nó theo các quy tắc sau:

1. **Bước 0, audit repo trước.** Đọc repo, tóm tắt: stack, cấu trúc thư mục, file vào chính, game loop hiện tại, cái gì đã có, cái gì thiếu. Chỉ sau đó mới lập kế hoạch. Không viết lại từ đầu nếu repo đã có nền tảng dùng được.
2. Làm theo từng milestone ở mục 17, mỗi lượt một milestone, kèm tiêu chí nghiệm thu. Không nhảy cóc.
3. Mọi con số cân bằng (giá, tỉ lệ, thời gian, công thức) nằm trong file config JSON, không hard-code trong logic.
4. Mọi tính năng mới phải có công tắc hoặc nút tương ứng trong Tester Panel để kiểm thử nhanh.
5. Mỗi milestone kết thúc bằng: danh sách file đã đổi, cách chạy, cách test, việc còn dang dở.

## 1. Tầm nhìn và vòng lặp chính

Game mô phỏng kinh doanh (tycoon) pixel art nhìn từ trên xuống. Người chơi bắt đầu với một xe đẩy bánh tráng ở vỉa hè trước cổng chợ, rồi lớn dần thành tiệm, rồi chuỗi thương hiệu. Cảm giác cốt lõi: **“mỗi ngày quán mình khá hơn hôm qua”** \[YC #7\].

Bốn trụ cột:

- **Tay nghề**: làm đúng món, đúng khẩu vị, bấm đúng nhịp.
- **Quản lý**: giá bán, nguyên liệu, tiền mặt bằng, thuế.
- **Tăng trưởng nhìn thấy được**: xe đổi hình, khách xếp hàng, biểu đồ doanh thu đi lên.
- **Bất ngờ**: khách lạ, sự kiện thị trường, tarot, minigame, công an.

**\[YC #1\] Bỏ hẳn màn “chọn thời gian đồ”.** Thay bằng tiến trình kiểu cày level: kiếm tiền → lên level → mở khóa → mua đồ trang trí cho xe. Ngày trong game tự chạy theo ca (1 ca khoảng 3 đến 5 phút thực, chỉnh trong config). Người chơi chỉ bấm **Mở bán** để bắt đầu ca.

Vòng lặp một ngày:

1. **Sáng, chuẩn bị**: xem giá thị trường, mua nguyên liệu, chỉnh giá và menu, trang trí.
2. **Ca bán**: khách đến, đọc order, làm đúng, thu tiền, xử lý sự cố (khách khó, công an).
3. **Tối, tổng kết**: thu trừ chi (nguyên liệu, mặt bằng, thuế), nhận XP, mở khóa, đầu tư hoặc mua skin.
4. **Hằng ngày**: minigame toán nhận quà, xem tarot.

## 2. Phân tích ảnh tham chiếu (phong cách hình ảnh)

Ảnh là một khung cảnh phố chợ Việt Nam, pixel art, nhìn từ trên xuống hơi nghiêng. Cần bám sát các điểm sau \[YC #24\]:

**Kỹ thuật hiển thị**

- Pixel art độ phân giải thấp, phóng to bằng nearest-neighbor (không làm mịn, tắt anti-aliasing, `image-rendering: pixelated`).
- Tile gốc 16px, hiển thị x3 (ảnh mẫu 1200x675 tương đương lưới 25x14 tile). Khung hình 16:9, scale theo cửa sổ nhưng chỉ dùng hệ số nguyên.
- Viền sprite tối nhẹ, đổ bóng mềm dưới chân nhân vật và vật thể.

**Bố cục theo các dải ngang từ trên xuống**

1. Hàng quầy chợ với mái bạt sọc nhiều màu (kem-vàng, đỏ-trắng, tím-trắng, xanh), có sạp rau củ và sạp thịt phía trên cùng.
2. Bức tường gạch vàng ấm có poster dán, ở giữa là **cổng chợ** với biển xanh (tên chợ) và dây cờ tam giác nhiều màu.
3. **Vỉa hè lát gạch xám: đây là khu chơi chính.** Có xe đẩy, xe bánh mì cạnh tranh, bàn ghế nhựa xanh và đỏ, hàng xe máy đỗ, thùng rác, hộp điện, trụ điện, cây trong ô đất, biển cấm đỗ, NPC đi lại.
4. **Lòng đường** có vạch trắng đứt, cống thoát nước, xe buýt xanh dừng ở trạm, xe máy chạy ngang liên tục.
5. Vỉa hè đối diện với trạm bus và cây. Dùng làm “nền sống động”, không chơi trực tiếp.

**Chất liệu cảm xúc**

- Tông màu ấm, bão hòa vừa: tường vàng đất, xám gạch vỉa hè, xanh bus, đỏ cờ và bàn ghế, xanh lá cây. Lấy mẫu màu thật bằng eyedropper từ ảnh, đưa vào một file palette duy nhất (khoảng 32 màu).
- Thế giới luôn “sống”: xe máy chạy ngang, bus dừng rồi đi, lá cây đung đưa nhẹ, NPC đi bộ, bong bóng thoại. \[ĐX\] Xe bánh mì trong ảnh là **đối thủ cạnh tranh khách**: nếu giá hoặc uy tín của bạn kém, khách đi sang đó.
- &#91;ĐX\] Chu kỳ ngày đêm bằng lớp phủ màu (sáng, trưa, chiều, tối), đèn đường bật buổi tối, thời tiết mưa nắng ảnh hưởng khách và giá rau.
- Phông chữ pixel phải hiển thị đủ dấu tiếng Việt (test các ký tự ặ, ữ, ỳ, ẵ, ộ). Có font dự phòng.

## 3. Bố cục màn hình và HUD

Màn hình chơi giữ nguyên khung cảnh như ảnh. HUD đè lên bằng khung pixel (viền gỗ hoặc nâu tối, nền kem), không che khu vỉa hè.

- **Thanh trên**: tiền, level + thanh XP, ngày và giờ trong ca, uy tín (sao), thời tiết, chip “Thuế/Mặt bằng đến hạn”.
- **Thanh trái (nút chức năng)**: Mua hàng, Thực đơn và giá, Trang trí, Cửa hàng skin, Mở rộng, Đầu tư, Sổ sách.
- **Thanh phải**: Quà hằng ngày (toán), Tarot, Nhiệm vụ, Thi đấu online, Giao hàng online.
- **Khay dưới**: kệ nguyên liệu và khu làm món (kéo thả hoặc bấm), thanh bấm nhịp khi nấu.
- **Bong bóng trên đầu khách**: icon món, danh sách nguyên liệu, khẩu vị, thanh kiên nhẫn. Phản ứng bằng emoji sau khi nhận món.
- Tooltip và popup cho mọi con số (người chơi phải thấy đầy đủ thông tin \[YC #1\]).
- Chỉ mở khóa nút khi đủ level. Nút bị khóa hiển thị ổ khóa kèm “Mở ở Lv X”.
- Đồng thời phải dùng được trên điện thoại (nút to, kéo thả có phương án bấm thay thế).

## 4. Cốt truyện và tiến trình \[YC #2, #10, #7\]

**Mở đầu:** bà Tư (bà ngoại) để lại cho bạn chiếc xe đẩy bánh tráng và công thức bí truyền, kèm một khoản nợ cũ. Chợ sắp bị Ban quản lý siết lại: tiền mặt bằng, thuế, giải tỏa lề đường. Mục tiêu dài hạn: trả nợ, giữ chợ, dựng thương hiệu bánh tráng nhà Bà Tư.

**Nhân vật cố định:** bà Tư (cố vấn qua mẩu giấy và điện thoại), anh Ban quản lý chợ (thu phí mặt bằng), chú công an khu vực (hài hước, không phải phản diện), chị thuế, ông chủ xe bánh mì (đối thủ), thầy bói tarot, shipper quen.

**Bốn chương** (mỗi chương có 3 đến 5 đoạn hội thoại cùng nhiệm vụ chính):

| Chương | Level | Bối cảnh | Mục tiêu |
| --- | --- | --- | --- |
| 1. Xe đẩy đầu ngõ | 1 đến 5 | Vỉa hè trước chợ, 3 món, né công an | Trả nợ đợt 1 |
| 2. Có chỗ đứng | 6 đến 12 | Thuê sạp trong chợ, thuế bắt đầu | Đủ tiền thuê sạp 14 ngày liền |
| 3. Tiệm nhỏ | 13 đến 20 | Thuê hoặc mua nhà mặt phố, app giao hàng, đầu tư | Doanh thu tuần đạt mốc |
| 4. Thương hiệu | 21 đến 30 | Chi nhánh, thi online | Hạng cao trong giải |

**Mở khóa theo level \[YC #10\]** (mẫu, chỉnh trong config):

| Level | Mở khóa |
| --- | --- |
| 1 | Bánh tráng trộn, bấm nhịp cơ bản |
| 2 | Mua nguyên liệu |
| 3 | Chỉnh giá bán |
| 4 | Trang trí cơ bản |
| 5 | Quà toán hằng ngày |
| 6 | Tarot, thêm món (bánh tráng nướng) |
| 8 | Cửa hàng skin |
| 10 | Sổ sách nâng cao, thuê sạp |
| 12 | Chứng khoán và vé số |
| 15 | Thuê nhân viên, mở rộng |
| 18 | App giao hàng |
| 22 | Thi đấu online |

**Cây kỹ năng** (1 điểm mỗi level, 3 nhánh):

- **Tay nghề**: vùng bấm “Perfect” rộng hơn, hao nguyên liệu ít hơn, làm món nhanh hơn.
- **Giao tiếp**: khách kiên nhẫn hơn, nhận diện khách khó, giảm bị quịt tiền.
- **Kinh doanh**: nhập hàng rẻ hơn, giảm phí và thuế nhẹ, xem trước xu hướng giá, báo trước khi công an tới.

**\[ĐX\] Cảm giác tiến bộ \[YC #7\]:** xe đổi diện mạo theo mốc doanh thu, hàng khách xếp dài, popup “Kỷ lục mới”, biểu đồ doanh thu 7 ngày, mục tiêu tuần có thưởng, lời nhận xét của khách hiện trên đầu.

## 5. Khách hàng và phục vụ \[YC #3, #4, #15, #19\]

**Các loại khách và cách đối phó**

| Loại | Đặc điểm | Cách đối phó |
| --- | --- | --- |
| Khách thường | Cân bằng | Làm đúng, đúng giá |
| Học sinh | Đông, tiền ít, nhạy giá | Giữ giá thấp, có combo nhỏ |
| Dân văn phòng | Vội, trả nhiều | Làm nhanh, ưu tiên xếp hàng |
| Khách khó tính | Soi khẩu vị, hay chê | Làm chuẩn từng yêu cầu |
| Khách trả giá | Đòi giảm | Chọn nhượng bộ hoặc giữ giá |
| Kẻ quịt tiền, móc túi | Tìm cách đi không trả tiền | Để ý, bấm cảnh báo kịp thời |
| Food reviewer | Review ảnh hưởng uy tín | Làm hoàn hảo |
| Đơn tiệc lớn | Số lượng nhiều, hạn giờ | Chuẩn bị tồn kho trước |
| Shipper | Lấy đơn online | Làm sẵn, đúng giờ |
| Khách lạ bí ẩn | Kích hoạt nhiệm vụ phụ | Tùy tình huống |

Mỗi loại cấu hình: tỉ lệ xuất hiện theo giờ, kiên nhẫn, độ nhạy giá, độ nhạy khẩu vị, tiền tip.

**Quy trình một order \[YC #4, #19\]**

1. Khách đến, bong bóng hiện: món, danh sách nguyên liệu đúng, khẩu vị (cay, mặn, ngọt, chua, mỗi chiều mức 0 đến 3), yêu cầu đặc biệt (ví dụ: không hành).
2. Người chơi lấy **đúng nguyên liệu** từ kệ bỏ vào bánh. Sai hoặc thiếu là mất điểm. Hết nguyên liệu thì phải từ chối hoặc đổi món.
3. **Minigame bấm nút (giữ cơ chế người chơi đang thích)**: bấm đúng nhịp ở bước chính (trộn, nướng, cuốn).
4. Chấm điểm: `điểm = 0.5 * đúng_nguyên_liệu + 0.3 * đúng_khẩu_vị + 0.2 * nhịp_bấm`.
5. Kết quả: **Perfect** (>=90) tăng uy tín, tip +20%, khách báo bạn bè; **Ổn** nhận đủ tiền; **Hỏng** khách bỏ đi hoặc đòi giảm giá, uy tín giảm.

**Uy tín quán** (0 đến 5 sao): làm ngon tăng uy tín, uy tín cao kéo **nhiều khách hơn và khách trả cao hơn** \[YC #19\]. Uy tín giảm dần nếu bỏ bê.

**Thực đơn đa dạng \[YC #15\]:** bánh tráng trộn, nướng, cuốn, phơi sương, kẹp, chấm; đồ uống (trà tắc, nước mía, sữa đậu nành); ăn vặt (xoài lắc, cóc dầm, gỏi khô bò). Mỗi món là một công thức dữ liệu (xem mục 16), mở khóa dần theo level.

**Nguyên liệu:** có tồn kho, hạn sử dụng (hỏng thì mất), sức chứa phụ thuộc thùng đá và tủ lạnh (có thể nâng cấp).

## 6. Kinh tế \[YC #1, #2, #13, #16, #20\]

**Thu**: bán món, tip, quà hằng ngày, đầu tư. **Chi**: nguyên liệu, phí mặt bằng mỗi ngày, thuế, lương nhân viên, phạt.

**Giá nguyên liệu theo thị trường \[YC #13\]**

- Mỗi nguyên liệu có giá gốc. Giá hôm nay = `giá_gốc * (1 + xu_hướng) * (1 + nhiễu) * (1 + sự_kiện)`. Xu hướng là bước đi ngẫu nhiên có kéo về trung bình, để giá không trôi mãi.
- Sự kiện: mưa bão (rau đắt), Tết (trứng cút, tôm đắt), mùa vụ (xoài rẻ), đình công, khan hiếm.
- UI hiển thị mũi tên lên xuống và biểu đồ 7 ngày cho từng nguyên liệu.

**Giá bán do người chơi tự chỉnh \[YC #16\]**

- Giá tham chiếu thị trường: `R = chi_phí_nguyên_liệu_hôm_nay * hệ_số_lãi_chuẩn (mặc định 1.8)`, điều chỉnh theo địa điểm và độ khó.
- Tỉ lệ `r = giá_bán / R`. Lượng khách nhân hệ số cầu: `r` trong 0.9 đến 1.1 là “đúng giá” (khách bình thường); `r` trên 1.3 giảm mạnh số khách; `r` dưới 0.8 đông khách nhưng lỗ và dễ hết hàng.
- UI có thanh “Giá hợp lý” xanh, vàng, đỏ và cảnh báo lãi lỗ ngay trên từng món.
- Khi khách gọi thêm topping, người chơi tự báo giá phụ. Giá hợp lý thì khách đồng ý, quá cao thì khách từ chối và uy tín giảm nhẹ.

**Phí mặt bằng theo địa điểm \[YC #20\]:** mỗi nơi có phí mỗi ngày, lưu lượng khách, rủi ro công an, mức cạnh tranh.

| Địa điểm | Phí/ngày | Khách | Rủi ro công an |
| --- | --- | --- | --- |
| Vỉa hè trước chợ (mặc định) | Thấp | Trung bình | Cao |
| Sạp trong chợ | Vừa | Ổn định | Không |
| Ngã tư đông xe | Vừa | Cao | Cao |
| Cổng trường | Vừa | Rất cao giờ tan học | Vừa |
| Mặt phố | Cao | Cao | Thấp |

**Thuế \[YC #2\]:** bắt đầu từ chương 2, đóng theo chu kỳ 7 ngày game. Có hai chế độ: khoán cố định hoặc theo % doanh thu (người chơi chọn, có tính toán). Trễ hạn bị phạt thêm và mất uy tín. Luôn hiển thị hạn đóng trên HUD.

**Tổng kết ngày:** `lãi ròng = doanh thu + tip - nguyên liệu - mặt bằng - thuế phân bổ - lương - phạt`. Màn tổng kết hiện đầy đủ từng dòng, top món bán chạy, số khách theo loại, biểu đồ so sánh với hôm qua \[YC #1, #7\].

## 7. Trang trí và skin \[YC #1, #9, #17\]

- **Ô trang trí trên xe/quán**: mái che, bảng hiệu, đèn, cờ, bàn ghế, cây cảnh, nền vỉa hè, poster. Mỗi vật phẩm có: giá, độ hiếm, `decor_score`, level yêu cầu.
- **Vẻ đẹp kéo khách \[YC #17\]**: `hệ_số_hấp_dẫn = 1 + k * căn(tổng_decor_score)`, chặn trần +50% (k trong config). Hiệu ứng phải thấy ngay: thêm khách dừng lại, đèn sáng, người đi đường ngoái nhìn.
- **Skin \[YC #9\]**: skin xe, skin nhân vật, skin bàn ghế, skin bảng hiệu. Cửa hàng **xoay vòng hằng ngày và hằng tuần** để luôn có cái mới; skin theo mùa (Tết, Trung thu). Mua bằng tiền trong game hoặc phiếu thưởng. Không pay-to-win: skin chỉ đổi hình, không đổi sức mạnh (trừ điểm trang trí đã nêu).
- &#91;ĐX\] Xem thử (preview) trước khi mua, lưu bộ sưu tập, thưởng khi đủ bộ (set bonus), nút “Chụp ảnh quán” để khoe.

## 8. Mở rộng và giao hàng online \[YC #6, #20, #22\]

**Thuê hoặc mua mặt bằng \[YC #6\]**

- **Thuê**: ít vốn, trả phí mỗi ngày, ngừng trả là mất chỗ.
- **Mua**: vốn lớn, không phí ngày nhưng có thuế tài sản, giá trị tăng theo thời gian và bán lại được.
- Loại cơ sở: sạp trong chợ, nhà mặt phố, chi nhánh. Mỗi cơ sở có số bàn, khu bếp, chỗ cho nhân viên.
- **Nhân viên**: thuê, trả lương, có kỹ năng và độ mệt, tự làm món theo trình độ. Quản lý nhiều cơ sở bằng cách giao việc, ngày càng ít tự tay làm.
- **Chọn địa điểm \[YC #20\]**: đầu mỗi ca chọn nơi bán, phải đủ tiền trả phí ngày. Mỗi nơi khác nhau về khách, rủi ro, cạnh tranh (xem bảng mục 6).

**Giao hàng online \[YC #22\]**

- Dùng một app giao hàng **hư cấu** (tên gợi ý: “ShipNhanh”), không dùng thương hiệu thật. Mở khóa ở Lv18.
- Tải app, đăng quán, **bán thử 3 ngày** rồi chọn tiếp tục hay ngừng.
- Đơn online vào hàng đợi riêng, có hạn giao, shipper NPC đến lấy. App thu hoa hồng 15 đến 25% (config). Có điểm đánh giá riêng của app, ảnh hưởng lượng đơn.
- Người chơi tự chọn khuyến mãi (tốn chi phí, đổi lấy nhiều đơn).

## 9. Công an và lấn chiếm lề đường \[YC #12\]

- Áp dụng khi bán ở vỉa hè, nhất là Lv1 đến khoảng Lv12. Bán trong sạp hợp pháp thì hết nguy cơ (đây cũng là động lực để thuê sạp).
- **Đồng hồ cảnh giác**: tăng theo khu vực, giờ cao điểm, độ khó. Trước khi công an tới có **tín hiệu cảnh báo** (NPC hô, còi, icon). Người chơi bấm **Dọn xe** để kéo xe vào trong.
- Minigame nhanh: kéo xe hoặc bấm liên tục kịp giờ. Thất bại thì bị phạt tiền, mất một phần hàng, giảm uy tín. Kỹ năng nhánh Kinh doanh giúp báo trước.
- Tông hài hước, nhẹ nhàng. Công an là NPC công bằng, không bạo lực. Mỗi lần xử lý có dòng giải thích ngắn về quy định để người chơi hiểu vì sao bị phạt.

## 10. Đầu tư \[YC #14\]

Tất cả chỉ dùng **tiền trong game**, không liên quan tiền thật, không loot box.

- **Chứng khoán ảo**: 6 đến 8 mã công ty **hư cấu**. Giá chạy theo bước đi ngẫu nhiên cộng tin tức và sự kiện (giá thịt tăng thì cổ phiếu chuỗi thịt biến động). Có mua, bán, phí giao dịch, biểu đồ đơn giản, giới hạn theo level (mở ở Lv12).
- **Vé số**: vé ảo giá cố định, xổ mỗi ngày game, giới hạn số vé/ngày. Tỉ lệ trúng và giá trị kỳ vọng phải hiện rõ (trung bình lỗ), để game dạy rủi ro thay vì khuyến khích mê số.
- &#91;ĐX\] **Tiết kiệm**: gửi tiền, lãi nhỏ nhưng an toàn, làm đối trọng với cổ phiếu.
- Cổ phiếu và sự kiện thị trường dùng chung hệ sự kiện với giá nguyên liệu (mục 6) để thế giới nhất quán.

## 11. Minigame và giải trí \[YC #5, #11, #18\]

**Toán hằng ngày \[YC #5\]**

- Mỗi ngày một lượt: 5 câu trong 60 giây, đề sinh ngẫu nhiên theo seed của ngày, độ khó theo level (cộng trừ, nhân chia nhẩm, tính tiền thối, phân số cơ bản).
- Quà tăng theo chuỗi ngày liên tiếp (streak). Chống spam: chỉ tính một lần mỗi ngày, quà chỉ là tiền, nguyên liệu, vé thưởng nhỏ.

**Tarot \[YC #11\]**

- Một lượt mỗi ngày, rút 1 đến 3 lá. Lời giải hài hước, kèm **buff nhỏ trong ngày** (ví dụ +5% khách, giảm nhẹ giá một nguyên liệu, tối đa +10%) và quà nhỏ.
- Ghi rõ là giải trí. Lưu lịch sử các lá đã rút. Tự vẽ bộ bài mang phong vị Việt, không dùng tranh có bản quyền.

**Thi đấu online \[YC #18\]**

- Giải theo tuần với các thể loại: tốc độ phục vụ (cùng seed khách), doanh thu cùng điều kiện, toán nhanh, bình chọn trang trí.
- Bảng xếp hạng, thưởng skin độc quyền. Bản đầu làm **bất đồng bộ** (so điểm, ghost), thời gian thực để sau.
- Server xác thực bằng seed chung và log thao tác để chống gian lận. Giải thi dùng bộ tham số độ khó cố định.

## 12. Độ khó \[YC #8\]

Bốn preset: **Dễ, Thường, Khó, Tùy chỉnh**. Tham số chỉnh được: tốc độ khách, độ kiên nhẫn, tần suất công an, biên độ biến động giá, mức thuế, tiền khởi đầu, độ nhạy giá của khách, hạn dùng nguyên liệu, độ dễ tính của vùng bấm nhịp.

| Tham số | Dễ | Thường | Khó |
| --- | --- | --- | --- |
| Tiền khởi đầu | x1.5 | x1.0 | x0.7 |
| Kiên nhẫn khách | x1.3 | x1.0 | x0.75 |
| Công an | x0.5 | x1.0 | x1.5 |
| Biến động giá | x0.7 | x1.0 | x1.4 |
| Thuế | x0.8 | x1.0 | x1.2 |
| XP nhận | x0.8 | x1.0 | x1.3 |

Đổi độ khó giữa chừng được, có cảnh báo. Giá trị trong bảng là mẫu, chỉnh trong config.

## 13. Âm thanh \[YC #21\]

Mỗi hành động có âm riêng:

| Nhóm | Âm thanh |
| --- | --- |
| Nền (ambient) | Tiếng phố, xe máy chạy ngang, còi bus, tiếng chợ xa |
| Làm món | Nhặt nguyên liệu, bỏ vào bánh, trộn xào xạc, nướng xèo |
| Nhịp bấm | Tick Perfect, Good, Miss khác nhau |
| Tiền | Thu tiền “ting”, tip, trả lương |
| Tiến trình | Lên level, mở khóa, kỷ lục mới |
| Sự kiện | Còi công an, giá lên xuống, tarot lật bài, trúng số |
| UI | Click, mở bảng, mua đồ, lỗi |

Nhạc nền đổi theo chương và theo buổi trong ngày. Có mixer 4 kênh (tổng, nhạc, hiệu ứng, ambient). Chỉ phát âm sau lần tương tác đầu tiên (chính sách autoplay của trình duyệt). Sound manager giới hạn số âm phát cùng lúc và có mức ưu tiên.

## 14. Lưu game \[YC #23\]

**Lưu ý quan trọng:** lưu theo địa chỉ IP **không đáng tin**. Nhiều người dùng chung IP (nhà, công ty, mạng 4G), IP của một người lại hay đổi, và gắn dữ liệu với IP còn có rủi ro riêng tư. Vì vậy đề xuất:

1. **Tự động lưu cục bộ** (localStorage hoặc IndexedDB). Mở game là vào đúng chỗ cũ (ngày, ca, tồn kho, giá, vị trí, level).
2. Lần đầu cấp **ID ẩn danh (UUID)** lưu trong trình duyệt. Nếu có backend, đồng bộ save lên server theo ID này.
3. Tùy chọn **mã khôi phục** hoặc đăng nhập để chơi nhiều thiết bị.
4. IP chỉ là **tín hiệu phụ** (chống gian lận, giới hạn tần suất), không làm khóa chính. Nếu bạn vẫn muốn dùng IP, chỉ dùng làm gợi ý “bạn có phải người chơi này không?” và luôn hỏi xác nhận.

Kỹ thuật: autosave cuối mỗi ca, mỗi N giây và khi đóng tab (`visibilitychange`). Save có `schemaVersion` và hàm migrate, có checksum, giữ 3 bản sao dự phòng. Xung đột máy và server: so thời gian, hỏi người chơi chọn bản nào.

## 15. Tester Panel (giao diện tester game)

Mở bằng phím **F2** hoặc `?debug=1`, chỉ có ở bản tester. Phong cách pixel giống game nhưng tách khỏi HUD chính. **Mọi tính năng mới phải có điều khiển ở đây.**

- **Thời gian**: tốc độ x1, x2, x5, x10; bỏ qua ca; nhảy ngày.
- **Tài chính và tiến trình**: thêm hoặc bớt tiền, đặt level, XP, uy tín, điểm kỹ năng; reset thuế.
- **Khách**: sinh khách theo loại, chỉnh tần suất, bật khách tự động, hiện số liệu kiên nhẫn và hitbox.
- **Thị trường**: ép giá nguyên liệu, kích hoạt sự kiện thị trường, xem biểu đồ, đặt seed ngẫu nhiên.
- **Công an**: gọi ngay, chỉnh tỉ lệ.
- **Đầu tư**: ép giá cổ phiếu, ép kết quả vé số.
- **Mở khóa**: mở hết tính năng, skin, địa điểm.
- **Độ khó**: đổi preset, chỉnh từng tham số trực tiếp.
- **Minigame và tarot**: kích hoạt ngay, chọn đáp án hoặc lá bài.
- **Âm thanh**: nút thử từng SFX, mixer.
- **Save**: xem JSON, export và import, xóa save, nạp save mốc (Lv5, Lv12, Lv20), thử save phiên bản cũ.
- **Online**: giả lập bảng xếp hạng và app giao hàng.
- **Log**: nhật ký kinh tế mỗi ngày, xuất CSV.
- &#91;ĐX\] **Balance Simulator**: tự chạy N ngày với bot đơn giản rồi báo thu chi trung bình, để cân bằng game mà không phải chơi tay.
- &#91;ĐX\] **Checklist QA** cho từng hệ thống (đánh dấu pass hoặc fail ngay trong panel).

## 16. Cấu trúc dữ liệu (config, dạng YAML minh họa)

```
ingredient:
  id: hanh_phi
  name: Hành phi
  base_price: 2000
  shelf_life_days: 3
  volatility: 0.15
dish:
  id: banh_trang_tron
  name: Bánh tráng trộn
  unlock_level: 1
  recipe: [banh_trang, xoai, trung_cut, hanh_phi, sa_te]
  taste: {cay: 2, man: 1, ngot: 1, chua: 1}
  base_markup: 1.8
customer_type:
  id: hoc_sinh
  spawn_weight: {sang: 1, trua: 2, chieu: 5, toi: 1}
  patience: 40
  price_sensitivity: 1.4
  taste_sensitivity: 0.6
  tip: 0.02
location:
  id: via_he_truoc_cho
  fee_per_day: 20000
  traffic: 1.0
  police_risk: 0.8
  competition: 0.7
save:
  schemaVersion: 1
  playerId: uuid
  day: 12
  money: 0
  level: 4
  inventory: {}
  menu_prices: {}
  decor: []
  unlocked: []
```

Các thực thể khác dùng cùng cách: Decoration/Skin, Skill, LevelReward, MarketEvent, Stock, Quest, TarotCard.

## 17. Lộ trình và tiêu chí nghiệm thu

| Milestone | Nội dung | Nghiệm thu |
| --- | --- | --- |
| M0 | Audit repo, tóm tắt cấu trúc, đề xuất kế hoạch | Có báo cáo, đối chiếu với 25 yêu cầu |
| M1 | Khung UI/HUD theo ảnh, cảnh vỉa hè, Tester Panel khung, save cục bộ | Mở game là thấy cảnh giống ảnh, F2 mở panel, tắt mở lại vẫn giữ tiến trình |
| M2 | Khách, order, nguyên liệu, bấm nhịp, chấm điểm, uy tín | Làm xong một ca đầy đủ, điểm và uy tín đổi đúng |
| M3 | Giá thị trường, giá bán, mặt bằng, thuế, sổ sách | Giá chạy theo thị trường, đặt giá cao thì khách giảm, sổ sách khớp số |
| M4 | Level, XP, mở khóa, kỹ năng, cốt truyện chương 1 | Lên level mở đúng chức năng, chương 1 chơi hết được |
| M5 | Trang trí, skin, độ khó, âm thanh | Quán đẹp hơn thì nhiều khách hơn, mỗi hành động có âm |
| M6 | Công an, thêm loại khách, mở rộng cơ sở, nhân viên | Né hoặc dính phạt đúng luật, thuê và mua mặt bằng chạy được |
| M7 | Toán hằng ngày, tarot, chứng khoán, vé số | Quà nhận đúng, giá cổ phiếu và vé số hoạt động |
| M8 | App giao hàng, thi online, đồng bộ save | Đơn online chạy được, bảng xếp hạng cập nhật, save khôi phục trên máy khác |

**Đối chiếu nhanh yêu cầu:** #1 mục 1, 6, 7 · #2 mục 4, 6 · #3 mục 5 · #4 mục 5 · #5 mục 11 · #6 mục 8 · #7 mục 4 · #8 mục 12 · #9 mục 7 · #10 mục 4 · #11 mục 11 · #12 mục 9 · #13 mục 6 · #14 mục 10 · #15 mục 5 · #16 mục 6 · #17 mục 7 · #18 mục 11 · #19 mục 5 · #20 mục 6, 8 · #21 mục 13 · #22 mục 8 · #23 mục 14 · #24 mục 2, 3 · #25 mục 0 (M0).

## 18. Prompt mẫu để dán vào ChatGPT

> Bạn là lead game developer. Repo của tôi: https://github.com/leharry21232/gamehaha. Tài liệu đặc tả đính kèm là yêu cầu chính thức. Việc đầu tiên: đọc repo, tóm tắt stack, cấu trúc thư mục, file vào chính, những gì đã có, những gì còn thiếu so với đặc tả. Chưa viết code. Sau đó đề xuất kế hoạch theo milestone M0 đến M8, hỏi tôi duyệt rồi mới làm từng milestone. Mỗi milestone phải: giữ code cũ chạy được, đưa số liệu cân bằng vào file config, thêm điều khiển tương ứng vào Tester Panel, và kết thúc bằng danh sách file đã đổi, cách chạy, cách test, việc còn dang dở. UI phải giống ảnh tham chiếu (pixel art top-down, tile 16px phóng x3, nearest-neighbor, bảng màu lấy từ ảnh). Nếu yêu cầu nào mâu thuẫn hoặc rủi ro (ví dụ lưu theo IP), hãy nêu rõ và đề xuất cách an toàn hơn thay vì làm theo mù quáng.
