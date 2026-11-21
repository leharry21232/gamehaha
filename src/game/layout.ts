import type { ToppingId } from './types';
import { TOPPINGS } from './orders';

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface PrepLayout {
  width: number;
  height: number;
  counterY: number;
  customerX: number;
  customerY: number;
  bubbleRect: Rect;
  boardCenterX: number;
  boardCenterY: number;
  boardRadius: number;
  matRect: Rect;
  rollRect: Rect;
  bowlCenterX: number;
  bowlCenterY: number;
  bowlRadius: number;
  trayRects: Record<ToppingId, Rect>;
  primaryBtn: Rect;
  secondaryBtn: Rect;
  limeHoldRect: Rect;
  chiliHoldRect: Rect;
  limeBarRect: Rect;
  chiliBarRect: Rect;
  shakeBtn: Rect;
  rollBtn: Rect;
}

export interface RaidLayout {
  width: number;
  height: number;
  roadX: number;
  roadW: number;
  laneCount: number;
  laneW: number;
  cartY: number;
  cartW: number;
  cartH: number;
  boostBtn: Rect;
}

export function pointInRect(px: number, py: number, r: Rect): boolean {
  return px >= r.x && px <= r.x + r.w && py >= r.y && py <= r.y + r.h;
}

export function getActiveCustomerRect(layout: PrepLayout): Rect {
  return {
    x: layout.customerX - 48,
    y: layout.customerY - 115,
    w: 96,
    h: 118,
  };
}

export function getWaitingCustomerRects(layout: PrepLayout, count: number): Rect[] {
  const rects: Rect[] = [];
  for (let i = 0; i < count; i++) {
    const wx = Math.min(layout.width - 70, layout.bubbleRect.x + layout.bubbleRect.w + 48 + i * 74);
    rects.push({
      x: wx - 30,
      y: layout.counterY - 96,
      w: 60,
      h: 92,
    });
  }
  return rects;
}

export function getAppeaseActiveRect(layout: PrepLayout): Rect {
  return {
    x: Math.max(12, layout.customerX - 66),
    y: layout.counterY + 4,
    w: 132,
    h: 28,
  };
}

export function getAppeaseWaitingRect(waitingRect: Rect): Rect {
  return {
    x: waitingRect.x - 12,
    y: waitingRect.y - 30,
    w: 84,
    h: 26,
  };
}

export function getLandladyRect(x: number, y: number): Rect {
  return {
    x: x - 44,
    y: y - 105,
    w: 88,
    h: 108,
  };
}

export function getLotterySellerRect(x: number, y: number): Rect {
  return {
    x: x - 42,
    y: y - 102,
    w: 84,
    h: 104,
  };
}

export function getElectricPoleRect(layout: PrepLayout): Rect {
  const poleW = layout.width >= 900 ? 64 : 50;
  const topY = Math.max(64, layout.counterY - 196);
  return {
    x: 10,
    y: topY,
    w: poleW,
    h: Math.max(120, layout.counterY - topY - 4),
  };
}

export interface FlowRhythmLayout {
  container: Rect;
  trackerRect: Rect;
  lanes: Rect[];
  padRects: Rect[];
  hitY: number;
}

export function getFlowLaneRects(layout: PrepLayout): FlowRhythmLayout {
  const cw = Math.min(560, layout.width - 36);
  const topY = layout.counterY + 52;
  const ch = Math.max(246, layout.height - topY - 18);
  const cx = layout.width * 0.5 - cw * 0.5;
  const padH = 54;
  const hitY = topY + ch - padH - 16;
  const trackerRect: Rect = {
    x: cx + 16,
    y: topY + 38,
    w: cw - 32,
    h: 30,
  };
  const laneTopY = trackerRect.y + trackerRect.h + 10;
  const laneGap = 10;
  const laneW = (cw - 36 - laneGap * 3) / 4;
  const lanes: Rect[] = [];
  const padRects: Rect[] = [];
  for (let i = 0; i < 4; i++) {
    const lx = cx + 18 + i * (laneW + laneGap);
    lanes.push({ x: lx, y: laneTopY, w: laneW, h: topY + ch - laneTopY - 14 });
    padRects.push({ x: lx, y: hitY - 22, w: laneW, h: padH });
  }
  return {
    container: { x: cx, y: topY, w: cw, h: ch },
    trackerRect,
    lanes,
    padRects,
    hitY,
  };
}

export function readSafeAreaInsets(): { top: number; right: number; bottom: number; left: number } {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return { top: 0, right: 0, bottom: 0, left: 0 };
  }
  const cs = getComputedStyle(document.documentElement);
  const parsePx = (v: string): number => {
    const n = parseFloat(v);
    return Number.isFinite(n) ? n : 0;
  };
  return {
    top: parsePx(cs.getPropertyValue('--sat')),
    right: parsePx(cs.getPropertyValue('--sar')),
    bottom: parsePx(cs.getPropertyValue('--sab')),
    left: parsePx(cs.getPropertyValue('--sal')),
  };
}

export function getQteArrowRects(w: number, h: number): Rect[] {
  const isNarrow = w < 420;
  const boxSize = isNarrow ? 48 : 54;
  const gap = isNarrow ? 10 : 14;
  const totalW = boxSize * 4 + gap * 3;
  const startX = w * 0.5 - totalW * 0.5;
  const y = h * 0.5 - 10;
  return [0, 1, 2, 3].map((i) => ({
    x: startX + i * (boxSize + gap),
    y,
    w: boxSize,
    h: boxSize,
  }));
}

export function computePrepLayout(w: number, h: number): PrepLayout {
  const insets = readSafeAreaInsets();
  const width = Math.max(1, w);
  const height = Math.max(1, h);
  const isPortrait = width < 680;
  const isShortLandscape = isPortrait && height < width;
  const safeTop = isPortrait
    ? isShortLandscape
      ? Math.max(92, insets.top + 80)
      : Math.max(width <= 360 ? 168 : 152, insets.top + 144)
    : Math.max(48, insets.top + 44);
  const safeBottom = Math.max(10, insets.bottom + 8);
  const counterY = isPortrait
    ? safeTop + (isShortLandscape ? 100 : 148)
    : Math.max(safeTop + 150, Math.min(height * 0.38, 280));

  const maxSceneW = Math.max(1, Math.min(width - (isPortrait ? 12 : 24), 1080));
  const sceneLeft = (width - maxSceneW) * 0.5;
  const customerX = isPortrait
    ? Math.max(38, Math.min(58, width * 0.14))
    : sceneLeft + Math.min(130, maxSceneW * 0.16);
  const customerY = counterY - 6;

  const bubbleX = isPortrait ? customerX + 44 : customerX + 90;
  const queueReserve = width >= 860 ? 185 : isPortrait ? 8 : 110;
  const bubbleW = isPortrait
    ? Math.max(1, Math.min(width - bubbleX - 10 - insets.right, width * 0.72))
    : Math.max(220, Math.min(580, sceneLeft + maxSceneW - bubbleX - queueReserve));
  const bubbleY = safeTop + 4;
  const bubbleH = Math.max(76, counterY - bubbleY - 10);

  const workTop = counterY + 14;
  const btnH = isPortrait ? Math.max(42, Math.min(50, height * 0.07)) : 50;
  const btnY = Math.max(workTop + 64, height - safeBottom - btnH - 8);
  const workH = Math.max(1, btnY - workTop);

  // Reserve a dedicated vertical slot between the step header and the action
  // buttons. The board scales down when a phone is short instead of overflowing.
  const boardTop = workTop + (isPortrait ? 10 : 24);
  const boardBottom = btnY - (isPortrait ? 14 : 24);
  const boardSlotH = Math.max(1, boardBottom - boardTop);
  const boardRadius = isPortrait
    ? Math.max(1, Math.min(126, (width - 28) / 2.6, boardSlotH / 2.08))
    : Math.max(1, Math.min(144, (boardSlotH / 2.08), maxSceneW * 0.18));
  const boardCenterX = width * 0.5;
  const boardCenterY = boardTop + boardSlotH * 0.5;

  const bowlCenterX = width * 0.5;
  const bowlRadius = isPortrait
    ? Math.max(42, Math.min(86, Math.min(workH * 0.2, (width - 32) * 0.22)))
    : Math.max(64, Math.min(124, Math.min(workH * 0.3, maxSceneW * 0.16)));
  const bowlCenterY = isPortrait
    ? Math.min(boardTop + bowlRadius + 12, workTop + Math.min(workH * 0.25, 118))
    : workTop + workH * 0.42;

  const matW = isPortrait ? Math.max(1, Math.min(width - 24, 260)) : Math.min(320, bowlRadius * 2.55);
  const matH = isPortrait ? Math.min(132, workH * 0.28) : Math.min(230, workH * 0.56);
  const matRect: Rect = {
    x: bowlCenterX - matW * 0.5,
    y: bowlCenterY - matH * 0.5,
    w: matW,
    h: matH,
  };

  const rollW = isPortrait ? Math.max(1, Math.min(width - 24, 300)) : Math.min(390, maxSceneW * 0.54);
  const rollH = isPortrait ? 64 : 82;
  const rollRect: Rect = {
    x: boardCenterX - rollW * 0.5,
    y: boardCenterY - rollH * 0.5,
    w: rollW,
    h: rollH,
  };

  const trayRects = {} as Record<ToppingId, Rect>;
  if (isPortrait) {
    const cols = 4;
    const gapX = 5;
    const gapY = 6;
    const sidePad = Math.max(8, insets.left + 6);
    const trayW = Math.max(1, Math.floor((width - sidePad * 2 - gapX * (cols - 1)) / cols));
    const trayH = Math.max(34, Math.min(54, (btnY - (bowlCenterY + bowlRadius + 12)) / 2.25));
    const gridStartY = Math.max(bowlCenterY + bowlRadius + 8, btnY - trayH * 2 - gapY - 10);
    TOPPINGS.forEach((t, idx) => {
      const col = idx % cols;
      const row = Math.floor(idx / cols);
      trayRects[t.id] = {
        x: sidePad + col * (trayW + gapX),
        y: gridStartY + row * (trayH + gapY),
        w: trayW,
        h: trayH,
      };
    });
  } else {
    const trayW = Math.max(96, Math.min(170, (maxSceneW - bowlRadius * 2 - 72) * 0.46));
    const trayH = Math.max(40, Math.min(64, (workH - 84) / 4.4));
    const trayGapY = 8;
    const totalTrayH = trayH * 4 + trayGapY * 3;
    const trayStartY = Math.max(workTop + 40, bowlCenterY - totalTrayH * 0.5 - 6);
    const leftTrayX = Math.max(8, bowlCenterX - Math.max(bowlRadius, matW * 0.5) - 20 - trayW);
    const rightTrayX = Math.min(width - trayW - 8, bowlCenterX + Math.max(bowlRadius, matW * 0.5) + 20);
    TOPPINGS.forEach((t, idx) => {
      const isLeft = idx < 4;
      const row = idx % 4;
      trayRects[t.id] = {
        x: isLeft ? leftTrayX : rightTrayX,
        y: trayStartY + row * (trayH + trayGapY),
        w: trayW,
        h: trayH,
      };
    });
  }

  const gapBtns = isPortrait ? 8 : 16;
  const availableBtnW = Math.max(1, width - (isPortrait ? 24 : 48) - gapBtns);
  const secW = isPortrait ? Math.min(116, availableBtnW * 0.36) : 132;
  const btnW = isPortrait
    ? Math.max(1, Math.min(256, availableBtnW - secW))
    : Math.min(256, maxSceneW * 0.38);
  const totalBtnsW = secW + gapBtns + btnW;
  const secondaryBtn: Rect = {
    x: isPortrait ? (width - totalBtnsW) * 0.5 : width * 0.5 - btnW * 0.5 + 72 - 148,
    y: btnY,
    w: secW,
    h: btnH,
  };
  const primaryBtn: Rect = {
    x: isPortrait ? secondaryBtn.x + secW + gapBtns : width * 0.5 - btnW * 0.5 + 72,
    y: btnY,
    w: btnW,
    h: btnH,
  };

  const limeHoldW = isPortrait ? Math.min(122, Math.floor(width * 0.33)) : 144;
  const gapHold = isPortrait ? 8 : 18;
  const barW = isPortrait ? Math.max(1, width - limeHoldW - gapHold - 24) : Math.min(340, maxSceneW * 0.48);
  const barH = 26;
  const holdH = isPortrait ? 48 : 58;
  const seasonStartY = isPortrait ? workTop + 24 : bowlCenterY - 56;
  const seasonLeftX = width * 0.5 - (limeHoldW + gapHold + barW) * 0.5;
  const limeHoldRect: Rect = { x: seasonLeftX, y: seasonStartY, w: limeHoldW, h: holdH };
  const limeBarRect: Rect = { x: seasonLeftX + limeHoldW + gapHold, y: seasonStartY + (holdH - barH) * 0.5, w: barW, h: barH };
  const chiliHoldRect: Rect = { x: seasonLeftX, y: seasonStartY + holdH + 16, w: limeHoldW, h: holdH };
  const chiliBarRect: Rect = { x: seasonLeftX + limeHoldW + gapHold, y: seasonStartY + holdH + 16 + (holdH - barH) * 0.5, w: barW, h: barH };

  const shakeBtnW = isPortrait ? Math.max(1, Math.min(264, width - 24)) : 276;
  const shakeBtn: Rect = { x: (width - shakeBtnW) * 0.5, y: btnY - 58, w: shakeBtnW, h: 48 };
  const rollBtnW = isPortrait ? Math.max(1, Math.min(250, width - 24)) : 250;
  const rollBtn: Rect = { x: (width - rollBtnW) * 0.5, y: btnY, w: rollBtnW, h: 48 };

  return {
    width,
    height,
    counterY,
    customerX,
    customerY,
    bubbleRect: { x: bubbleX, y: bubbleY, w: bubbleW, h: bubbleH },
    boardCenterX,
    boardCenterY,
    boardRadius,
    matRect,
    rollRect,
    bowlCenterX,
    bowlCenterY,
    bowlRadius,
    trayRects,
    primaryBtn,
    secondaryBtn,
    limeHoldRect,
    chiliHoldRect,
    limeBarRect,
    chiliBarRect,
    shakeBtn,
    rollBtn,
  };
}
export function getToppingRemoveRect(layout: PrepLayout, id: ToppingId): Rect {
  const tray = layout.trayRects[id];
  const size = Math.min(28, Math.max(22, tray.w * 0.2));
  return {
    x: tray.x + tray.w - size - 5,
    y: tray.y + 5,
    w: size,
    h: size,
  };
}

export function getToppingUndoRect(layout: PrepLayout): Rect {
  const centeredPrimaryX = layout.width * 0.5 - layout.primaryBtn.w * 0.5;
  return {
    ...layout.secondaryBtn,
    x: Math.max(12, centeredPrimaryX - layout.secondaryBtn.w - 12),
    y: layout.primaryBtn.y,
  };
}

export function computeRaidLayout(w: number, h: number): RaidLayout {
  const insets = readSafeAreaInsets();
  const isPortrait = w < 680;
  const safeBottom = Math.max(14, insets.bottom + 10);
  const laneCount = 4;
  const roadW = isPortrait ? Math.min(400, w - 24) : Math.min(560, Math.max(320, w * 0.54));
  const roadX = (w - roadW) * 0.5;
  const laneW = roadW / laneCount;
  const cartW = Math.min(88, laneW * 0.68);
  const cartH = cartW * 1.3;
  const cartY = h - cartH - safeBottom - (isPortrait ? 74 : 82);

  const boostBtn: Rect = isPortrait
    ? {
        x: w - 154 - Math.max(12, insets.right + 10),
        y: h - safeBottom - 54,
        w: 146,
        h: 50,
      }
    : {
        x: Math.min(w - 178, roadX + roadW + 24),
        y: h - safeBottom - 64,
        w: 158,
        h: 54,
      };

  return {
    width: w,
    height: h,
    roadX,
    roadW,
    laneCount,
    laneW,
    cartY,
    cartW,
    cartH,
    boostBtn,
  };
}
