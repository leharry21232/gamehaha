# AGENTS.md

Hướng dẫn cho AI (Codex, ChatGPT, Claude Code...) khi làm việc trong repo này. Đọc hết file trước khi sửa code. Giữ file này ngắn và cập nhật khi có thay đổi.

## 1. Dự án là gì

Game tycoon pixel art nhìn từ trên xuống: người chơi điều hành xe bánh tráng ở vỉa hè trước chợ, rồi mở rộng dần thành tiệm và chuỗi. Đặc tả đầy đủ nằm ở **`Speckit Xe Bánh Tráng Tycoon.md`** (nguồn sự thật cho gameplay, UI/UX, roadmap M0 đến M8). Khi code và speckit mâu thuẫn, hãy hỏi chủ dự án, đừng tự chọn.

Giai đoạn hiện tại: **phát triển gameplay**, chưa deploy. Mọi tính năng mới phải kiểm thử được qua **Tester Panel** (mở bằng F2 hoặc `?debug=1`).

## 2. Stack (theo package.json)

- Vite + React 19 + TypeScript + Tailwind CSS 4
- `motion` (animation), `lucide-react` (icon)
- Express + dotenv (server), `tsx` để chạy TypeScript phía server
- `@google/genai` (Gemini API). Chưa rõ đang dùng cho tính năng nào, hỏi chủ dự án trước khi mở rộng.

## 3. Lệnh thường dùng

```bash
npm install          # cài thư viện
npm run dev          # chạy dev: vite, cổng 3000, host 0.0.0.0
npm run build        # build production vào dist/
npm run preview      # xem bản build
npm run lint         # kiểm tra kiểu: tsc --noEmit (không có ESLint)
npm run clean        # xóa dist và server.js
```

Trước khi báo “xong”: `npm run lint` và `npm run build` phải chạy sạch.

## 4. Cấu trúc thư mục

Đã biết ở thư mục gốc: `index.html`, `src/`, `public/`, `vite.config.ts`, `tsconfig.json`, `metadata.json`, `.env.example`, `package.json`.

**TODO cho AI ở bước M0:** đọc `src/` và `public/`, rồi điền vào đây một dòng giải thích cho mỗi thư mục và file chính (file vào chính, nơi giữ game state, nơi vẽ cảnh, nơi xử lý save). Không đoán, chỉ ghi những gì đã đọc.

## 5. Quy tắc bắt buộc

1. **Audit trước, code sau.** Ở mỗi phiên mới: đọc file này, speckit, `CHANGELOG.md`, `TASKS.md` (nếu có). Không viết lại từ đầu nếu đã có nền tảng dùng được.
2. **Làm từng milestone, từng việc nhỏ.** Mỗi lần một việc, kèm tiêu chí nghiệm thu từ speckit mục 17.
3. **Không hard-code số cân bằng.** Giá, tỉ lệ, công thức, thời gian nằm trong file config (JSON hoặc `.ts` thuần dữ liệu). Logic chỉ đọc config.
4. **Logic game tách khỏi giao diện.** Công thức giá, chấm điểm, thuế, tiến trình là hàm thuần (không phụ thuộc React) để test được.
5. **Mọi tính năng mới có điều khiển trong Tester Panel.**
6. **Không thêm thư viện mới** khi chưa hỏi chủ dự án.
7. **Không phá save cũ.** Save có `schemaVersion` và hàm migrate. Save theo UUID ẩn danh, không dùng IP làm khóa chính (xem speckit mục 14).
8. **Bí mật:** không commit `.env` hay khóa API. Vite đưa biến `VITE_*` ra trình duyệt, nên **không đặt khóa Gemini hoặc khóa riêng vào code client**. Gọi API có khóa qua server Express.
9. **Tiếng Việt có dấu:** chuỗi giao diện hiển thị tiếng Việt, font phải hỗ trợ đủ dấu. Tên biến và comment dùng tiếng Anh, theo `GLOSSARY.md` nếu có.
10. **Không dùng tên thương hiệu thật** cho app giao hàng, cổ phiếu, vé số (dùng tên hư cấu). Tiền trong game không liên quan tiền thật.

## 6. Hình ảnh

- Pixel art: tile gốc 16px, hiển thị x3, `image-rendering: pixelated`, chỉ scale số nguyên.
- Cảnh chơi giống ảnh tham chiếu (vỉa hè trước chợ, lòng đường, bus, xe máy). Xem speckit mục 2 và 3.
- Cảnh có nhiều sprite chuyển động (xe máy, NPC, bus) thì ưu tiên `<canvas>` thay vì nhiều phần tử DOM, và cần quyết định cùng chủ dự án ở M1.

## 7. Định nghĩa “xong”

- Chạy được bằng `npm run dev`, `npm run lint` và `npm run build` không lỗi.
- Đạt tiêu chí nghiệm thu của milestone.
- Có điều khiển trong Tester Panel.
- Đã cập nhật `CHANGELOG.md` (một dòng), `TASKS.md`, và `DECISIONS.md` nếu có quyết định mới.
- Báo cáo cuối việc: danh sách file đã đổi, cách chạy, cách test, việc còn dang dở.
