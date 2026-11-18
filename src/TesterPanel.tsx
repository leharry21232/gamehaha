import { useMemo, useState } from 'react';
import type { GameHudSnapshot } from './game/types';

type TesterTab = 'OVERVIEW' | 'CONTROL' | 'SAVE';

interface TesterPanelProps {
  hud: GameHudSnapshot;
  onClose: () => void;
  onSetMoney: (value: number) => void;
  onSetProgress: (level: number, xp: number) => void;
  onSetDayTime: (seconds: number) => void;
}

const SESSION_SAVE_KEY = 'banh_trang_session_save_v1';
const PROGRESS_SAVE_KEY = 'banh_trang_player_progress_v1';

function formatMoney(value: number): string {
  return `${Math.floor(value).toLocaleString('vi-VN')}đ`;
}

function readSaveBundle(): Record<string, string | null> {
  try {
    return {
      session: window.localStorage.getItem(SESSION_SAVE_KEY),
      progression: window.localStorage.getItem(PROGRESS_SAVE_KEY),
      vendorSpot: window.localStorage.getItem('banhtrang_vendor_spot_v1'),
      tutorial: window.localStorage.getItem('banhtrang_tutorial_v1'),
    };
  } catch {
    return { session: null, progression: null, vendorSpot: null, tutorial: null };
  }
}

export function TesterPanel({ hud, onClose, onSetMoney, onSetProgress, onSetDayTime }: TesterPanelProps) {
  const [tab, setTab] = useState<TesterTab>('OVERVIEW');
  const [moneyInput, setMoneyInput] = useState(String(hud.money));
  const [levelInput, setLevelInput] = useState(String(hud.playerLevel));
  const [xpInput, setXpInput] = useState(String(hud.playerXp));
  const [timeInput, setTimeInput] = useState(String(Math.floor(hud.dayTimeLeft)));
  const saveBundle = useMemo(() => readSaveBundle(), [hud.screen, hud.day, hud.money, hud.ordersServed]);
  const saveText = JSON.stringify(saveBundle, null, 2);
  const hasSessionSave = Boolean(saveBundle.session);

  const exportSave = () => {
    const blob = new Blob([saveText], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'banh-trang-tester-save.json';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const copySave = async () => {
    try {
      await navigator.clipboard.writeText(saveText);
    } catch {
      // Clipboard access can be unavailable in insecure contexts.
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-start justify-end bg-black/45 p-2 sm:p-5" role="dialog" aria-modal="true" aria-label="Tester Panel">
      <section className="flex max-h-[calc(100dvh-1rem)] w-full max-w-xl flex-col overflow-hidden border-[3px] border-[#111318] bg-[#fff8df] text-[#1c1a16] shadow-[7px_7px_0_#111318] sm:max-h-[calc(100dvh-2.5rem)]">
        <header className="flex items-center justify-between border-b-[3px] border-[#111318] bg-[#f5b942] px-4 py-3">
          <div>
            <p className="font-mono text-[10px] font-black tracking-[0.2em]">DEVELOPER TOOLS · BUILD TEST</p>
            <h2 className="font-display text-xl font-black">TESTER PANEL</h2>
          </div>
          <button type="button" onClick={onClose} className="border-2 border-[#111318] bg-white px-3 py-2 text-sm font-black shadow-[2px_2px_0_#111318] hover:bg-amber-100">ĐÓNG · F2</button>
        </header>

        <nav className="flex gap-2 border-b-2 border-[#111318] bg-[#f0e5c7] p-3">
          <button type="button" onClick={() => setTab('OVERVIEW')} className={`border-2 border-[#111318] px-3 py-2 text-xs font-black ${tab === 'OVERVIEW' ? 'bg-[#243b35] text-white' : 'bg-white'}`}>TỔNG QUAN</button>
          <button type="button" onClick={() => setTab('CONTROL')} className={`border-2 border-[#111318] px-3 py-2 text-xs font-black ${tab === 'CONTROL' ? 'bg-[#243b35] text-white' : 'bg-white'}`}>ĐIỀU KHIỂN</button>
          <button type="button" onClick={() => setTab('SAVE')} className={`border-2 border-[#111318] px-3 py-2 text-xs font-black ${tab === 'SAVE' ? 'bg-[#243b35] text-white' : 'bg-white'}`}>SAVE & DỮ LIỆU</button>
        </nav>

        <div className="allow-touch-scroll overflow-y-auto p-4">
          {tab === 'OVERVIEW' ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {[
                  ['MÀN HÌNH', hud.screen],
                  ['GIAI ĐOẠN', hud.phase],
                  ['NGÀY', String(hud.day)],
                  ['THỜI GIAN CÒN', `${Math.ceil(hud.dayTimeLeft)} / ${hud.dayDuration}s`],
                  ['TIỀN', formatMoney(hud.money)],
                  ['XU', String(hud.xu)],
                  ['LEVEL', String(hud.playerLevel)],
                  ['XP', `${hud.playerXp} / ${hud.playerXpToNext}`],
                  ['ĐƠN ĐÃ PHỤC VỤ', String(hud.ordersServed)],
                  ['ĐƠN HOÀN HẢO', String(hud.perfectOrders)],
                  ['XE', `Cấp ${hud.vehicleLevel}`],
                  ['ĐỘ KHÓ', hud.difficulty],
                ].map(([label, value]) => (
                  <div key={label} className="border-2 border-[#26231d] bg-white p-3">
                    <p className="text-[10px] font-black tracking-wide text-[#756b58]">{label}</p>
                    <p className="mt-1 break-words font-mono text-sm font-black">{value}</p>
                  </div>
                ))}
              </div>

              <div className="border-2 border-[#26231d] bg-[#e9dfc5] p-3">
                <h3 className="mb-2 text-xs font-black tracking-wide">TRẠNG THÁI HỆ THỐNG</h3>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <p>Khách tức giận: {hud.hasAngryCustomer ? 'CÓ' : 'KHÔNG'}</p>
                  <p>Đang mưa: {hud.rainActive ? 'CÓ' : 'KHÔNG'}</p>
                  <p>QTE: {hud.qteActive ? 'ĐANG CHẠY' : 'TẮT'}</p>
                  <p>Boss: {hud.bossFightActive ? 'ĐANG CHẠY' : 'TẮT'}</p>
                  <p>Mini game nhịp: {hud.flowRhythmActive ? 'ĐANG CHẠY' : 'TẮT'}</p>
                  <p>Shop: {hud.shopOpen ? 'MỞ' : 'ĐÓNG'}</p>
                </div>
              </div>

              <p className="text-[11px] leading-relaxed text-[#625a4b]">Bản đầu chỉ đọc trạng thái game, chưa có nút thay đổi tiền, level hoặc sinh sự kiện. Các nút can thiệp sẽ được thêm sau khi có API debug an toàn trong GameEngine.</p>
            </div>
          ) : tab === 'CONTROL' ? (
            <div className="space-y-4">
              <div className="border-2 border-[#26231d] bg-amber-100 p-3 text-xs leading-relaxed">
                <strong>CHẾ ĐỘ CAN THIỆP TEST</strong>
                <p className="mt-1">Các thay đổi được lưu vào save hiện tại. Hãy dùng trong môi trường test; không ảnh hưởng công thức hay thao tác chế biến.</p>
              </div>
              <section className="space-y-2 border-2 border-[#26231d] bg-white p-3">
                <h3 className="text-xs font-black">KINH TẾ · TIỀN MẶT</h3>
                <input aria-label="Số tiền cần đặt" type="number" min="0" max="999999999" value={moneyInput} onChange={(event) => setMoneyInput(event.target.value)} className="w-full border-2 border-[#26231d] px-3 py-2 font-mono text-sm" />
                <button type="button" onClick={() => onSetMoney(Number(moneyInput))} className="border-2 border-[#111318] bg-[#f5b942] px-3 py-2 text-xs font-black shadow-[2px_2px_0_#111318]">ÁP DỤNG TIỀN</button>
              </section>
              <section className="space-y-2 border-2 border-[#26231d] bg-white p-3">
                <h3 className="text-xs font-black">TIẾN TRÌNH · LEVEL & XP</h3>
                <div className="grid grid-cols-2 gap-2">
                  <label className="text-xs font-bold">Level (1–100)<input aria-label="Level" type="number" min="1" max="100" value={levelInput} onChange={(event) => setLevelInput(event.target.value)} className="mt-1 w-full border-2 border-[#26231d] px-2 py-2 font-mono" /></label>
                  <label className="text-xs font-bold">XP hiện tại<input aria-label="XP" type="number" min="0" value={xpInput} onChange={(event) => setXpInput(event.target.value)} className="mt-1 w-full border-2 border-[#26231d] px-2 py-2 font-mono" /></label>
                </div>
                <p className="text-[10px] text-[#756b58]">XP sẽ tự giới hạn dưới ngưỡng lên cấp tiếp theo.</p>
                <button type="button" onClick={() => onSetProgress(Number(levelInput), Number(xpInput))} className="border-2 border-[#111318] bg-[#f5b942] px-3 py-2 text-xs font-black shadow-[2px_2px_0_#111318]">ÁP DỤNG LEVEL / XP</button>
              </section>
              <section className="space-y-2 border-2 border-[#26231d] bg-white p-3">
                <h3 className="text-xs font-black">THỜI GIAN TRONG NGÀY</h3>
                <label className="block text-xs font-bold">Giây còn lại (0–{hud.dayDuration})<input aria-label="Thời gian còn lại" type="number" min="0" max={hud.dayDuration} value={timeInput} onChange={(event) => setTimeInput(event.target.value)} className="mt-1 w-full border-2 border-[#26231d] px-3 py-2 font-mono" /></label>
                <button type="button" onClick={() => onSetDayTime(Number(timeInput))} className="border-2 border-[#111318] bg-[#f5b942] px-3 py-2 text-xs font-black shadow-[2px_2px_0_#111318]">ĐẶT THỜI GIAN</button>
              </section>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="border-2 border-[#26231d] bg-white p-3">
                <p className="text-xs font-black">BẢN LƯU PHIÊN CHƠI</p>
                <p className="mt-1 text-sm">{hasSessionSave ? 'Đã tìm thấy dữ liệu save.' : 'Chưa tìm thấy dữ liệu save phiên chơi.'}</p>
                <p className="mt-1 break-all font-mono text-[10px] text-[#756b58]">{SESSION_SAVE_KEY}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={exportSave} className="border-2 border-[#111318] bg-[#f5b942] px-3 py-2 text-xs font-black shadow-[2px_2px_0_#111318]">XUẤT SAVE JSON</button>
                <button type="button" onClick={() => void copySave()} className="border-2 border-[#111318] bg-white px-3 py-2 text-xs font-black shadow-[2px_2px_0_#111318]">COPY JSON</button>
              </div>
              <pre className="max-h-72 overflow-auto border-2 border-[#26231d] bg-[#1f2933] p-3 text-[10px] leading-relaxed text-emerald-100">{saveText}</pre>
              <p className="text-[11px] leading-relaxed text-[#625a4b]">Xuất/copy chỉ đọc các khóa save của game và vị trí bán hàng. Chưa hỗ trợ import hoặc xóa save để tránh ghi đè nhầm dữ liệu đang chơi.</p>
            </div>
          )}
        </div>

        <footer className="border-t-2 border-[#111318] bg-[#f0e5c7] px-4 py-2 text-[10px] font-bold text-[#625a4b]">F2 MỞ / ĐÓNG · CÔNG CỤ TEST CÓ GHI SAVE</footer>
      </section>
    </div>
  );
}
