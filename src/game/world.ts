import type { CityDistrictId } from './types';

export interface VendorLocation {
  id: CityDistrictId;
  name: string;
  rentPerDay: number;
  customerTraffic: 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH';
  competition: 'LOW' | 'MEDIUM' | 'HIGH';
  orderMultiplier: number;
  incidentMultiplier: number;
  description: string;
  unlockLevel: number;
}

export const VENDOR_LOCATIONS: readonly VendorLocation[] = [
  { id: 'CONG_VIEN', name: 'Công viên 23/9', rentPerDay: 15000, customerTraffic: 'MEDIUM', competition: 'LOW', orderMultiplier: 0.95, incidentMultiplier: 0.8, description: 'Khách ổn định, ít cạnh tranh, phù hợp người mới.', unlockLevel: 1 },
  { id: 'DAI_HOC', name: 'Khu đại học', rentPerDay: 20000, customerTraffic: 'HIGH', competition: 'MEDIUM', orderMultiplier: 1.05, incidentMultiplier: 1, description: 'Đông sinh viên, khách nhạy cảm với giá.', unlockLevel: 1 },
  { id: 'CHO_BEN_THANH', name: 'Chợ Bến Thành', rentPerDay: 30000, customerTraffic: 'VERY_HIGH', competition: 'HIGH', orderMultiplier: 1.15, incidentMultiplier: 1.15, description: 'Lượng khách lớn, cạnh tranh và chi phí cao.', unlockLevel: 1 },
  { id: 'NGA_TU', name: 'Ngã tư Hàng Xanh', rentPerDay: 22000, customerTraffic: 'HIGH', competition: 'MEDIUM', orderMultiplier: 1.1, incidentMultiplier: 1.1, description: 'Nhiều người qua lại, nhịp bán hàng nhanh.', unlockLevel: 1 },
  { id: 'PHO_DI_BO', name: 'Phố đi bộ Nguyễn Huệ', rentPerDay: 35000, customerTraffic: 'VERY_HIGH', competition: 'HIGH', orderMultiplier: 1.25, incidentMultiplier: 1.3, description: 'Đông khách vào buổi tối nhưng chi phí và rủi ro cao.', unlockLevel: 1 },
] as const;

export function getVendorLocation(id: string): VendorLocation {
  return VENDOR_LOCATIONS.find((location) => location.id === id) ?? VENDOR_LOCATIONS[0];
}

export function canChangeVendorLocation(screen: string): boolean {
  return screen === 'TITLE_MENU' || screen === 'END_OF_DAY';
}

export type MajorGameSystem =
  | 'WORLD'
  | 'BUSINESS'
  | 'ECONOMY'
  | 'STAFF'
  | 'PROGRESSION'
  | 'SIDE_ACTIVITIES';

export interface SystemUnlock {
  system: MajorGameSystem;
  minimumLevel: number;
  requiresStaff: boolean;
}

export const SYSTEM_UNLOCKS: readonly SystemUnlock[] = [
  { system: 'WORLD', minimumLevel: 1, requiresStaff: false },
  { system: 'BUSINESS', minimumLevel: 1, requiresStaff: false },
  { system: 'ECONOMY', minimumLevel: 1, requiresStaff: false },
  { system: 'PROGRESSION', minimumLevel: 1, requiresStaff: false },
  { system: 'STAFF', minimumLevel: 5, requiresStaff: false },
  { system: 'SIDE_ACTIVITIES', minimumLevel: 5, requiresStaff: true },
] as const;

export function isSystemUnlocked(system: MajorGameSystem, level: number, hasStaff: boolean): boolean {
  const rule = SYSTEM_UNLOCKS.find((item) => item.system === system);
  return Boolean(rule && level >= rule.minimumLevel && (!rule.requiresStaff || hasStaff));
}

export type WorldActivityId = 'TAROT' | 'LOTTERY' | 'STOCKS';

export interface WorldActivity {
  id: WorldActivityId;
  name: string;
  icon: string;
  x: number;
  y: number;
  description: string;
  unlockLevel: number;
  requiresStaff: boolean;
}

export const WORLD_ACTIVITIES: readonly WorldActivity[] = [
  { id: 'TAROT', name: 'Góc bói Tarot', icon: '🔮', x: 18, y: 49, description: 'Gặp cô bói bài và thử vận may.', unlockLevel: 5, requiresStaff: true },
  { id: 'LOTTERY', name: 'Quầy vé số', icon: '🎟️', x: 50, y: 25, description: 'Thử vận may với những tấm vé số.', unlockLevel: 5, requiresStaff: true },
  { id: 'STOCKS', name: 'Bảng chứng khoán', icon: '📈', x: 84, y: 54, description: 'Theo dõi thị trường và thử đầu tư.', unlockLevel: 5, requiresStaff: true },
] as const;

export function canUseWorldActivity(activity: WorldActivity, level: number, totalStaff: number): boolean {
  return level >= activity.unlockLevel && (!activity.requiresStaff || totalStaff > 0);
}

export function findNearbyWorldActivity(
  x: number,
  y: number,
  activities: readonly WorldActivity[] = WORLD_ACTIVITIES,
  radius = 14,
): WorldActivity | null {
  return activities.find((activity) => Math.hypot(x - activity.x, y - activity.y) <= radius) ?? null;
}

export interface WorldLandmark {
  id: string;
  name: string;
  kind: 'PARK' | 'MARKET' | 'FOOD_STALL' | 'SIDEWALK' | 'ROAD';
  x: number;
  y: number;
  width: number;
  height: number;
}

export const WORLD_LANDMARKS: readonly WorldLandmark[] = [
  { id: 'park', name: 'Công viên nhỏ', kind: 'PARK', x: 2, y: 8, width: 25, height: 27 },
  { id: 'market', name: 'Dãy cửa hàng', kind: 'MARKET', x: 31, y: 7, width: 37, height: 25 },
  { id: 'food-stall', name: 'Xe bánh tráng', kind: 'FOOD_STALL', x: 68, y: 30, width: 26, height: 28 },
  { id: 'sidewalk-top', name: 'Vỉa hè phía trên', kind: 'SIDEWALK', x: 4, y: 35, width: 92, height: 9 },
  { id: 'main-road', name: 'Đường phố', kind: 'ROAD', x: 3, y: 46, width: 94, height: 34 },
  { id: 'sidewalk-bottom', name: 'Vỉa hè phía dưới', kind: 'SIDEWALK', x: 4, y: 82, width: 92, height: 12 },
] as const;

export interface PedestrianRoute {
  id: string;
  emoji: string;
  label: string;
  animation: 'walk-east' | 'walk-west' | 'walk-short';
  top: string;
  delay: string;
}

export const PEDESTRIAN_ROUTES: readonly PedestrianRoute[] = [
  { id: 'student', emoji: '🎒', label: 'Sinh viên', animation: 'walk-east', top: '39%', delay: '0s' },
  { id: 'office', emoji: '👜', label: 'Nhân viên văn phòng', animation: 'walk-west', top: '84%', delay: '-3s' },
  { id: 'shipper', emoji: '🛵', label: 'Shipper', animation: 'walk-short', top: '62%', delay: '-5s' },
  { id: 'local', emoji: '🧍🏻‍♀️', label: 'Người đi đường', animation: 'walk-east', top: '88%', delay: '-8s' },
] as const;


export interface WorldPosition {
  x: number;
  y: number;
}

export interface WorldInteractable {
  id: 'cart' | 'grocery' | 'snack_shop' | 'drink_stall' | 'market_stall' | 'co_nam' | 'co_sau' | 'shipper_ti' | 'chu_bay' | 'ba_tu';
  name: string;
  x: number;
  y: number;
  radius: number;
  kind: 'BUSINESS' | 'NPC';
  description: string;
  interactionText: string;
}

export const WORLD_WALKABLE_BOUNDS = {
  minX: 4,
  maxX: 96,
  minY: 33,
  maxY: 56,
} as const;

// Percent-based collision rectangles match the neighborhood SVG's viewBox.
export const WORLD_COLLISION_RECTS = [
  { id: 'left_tree', x: 0, y: 34, width: 7, height: 15 },
  { id: 'cart', x: 14, y: 32, width: 20, height: 22 },
  { id: 'drink_stall', x: 57, y: 31, width: 15, height: 21 },
  { id: 'right_tree', x: 86, y: 33, width: 7, height: 15 },
] as const;

export const WORLD_INTERACTABLES: readonly WorldInteractable[] = [
  {
    id: 'cart',
    name: 'Xe bánh tráng',
    x: 36,
    y: 48,
    radius: 9,
    kind: 'BUSINESS',
    description: 'Chiếc xe bánh tráng của bạn. Đây là nơi bắt đầu một ca bán hàng.',
    interactionText: 'Bạn đã đến xe bánh tráng. Nhấn E để quay lại khu chuẩn bị và bắt đầu bán hàng.',
  },
  {
    id: 'grocery',
    name: 'Tạp hóa cô Năm',
    x: 12,
    y: 33,
    radius: 7,
    kind: 'BUSINESS',
    description: 'Tiệm tạp hóa nhỏ ở đầu dãy phố. Cô Năm luôn biết chỗ mua đồ dùng rẻ.',
    interactionText: 'Cô Năm: “Mới dọn xe ra hả con? Có thiếu gì cứ ghé cô, đừng ngại hỏi giá trước nha!”',
  },
  {
    id: 'snack_shop',
    name: 'Sạp ăn vặt',
    x: 38,
    y: 33,
    radius: 7,
    kind: 'BUSINESS',
    description: 'Sạp đồ ăn vặt thơm mùi bánh nướng và đồ ăn buổi sáng.',
    interactionText: 'Chủ sạp: “Buổi sáng khách đông lắm đó. Bán ngon, giữ giá dễ chịu là khách nhớ mặt liền!”',
  },
  {
    id: 'drink_stall',
    name: 'Quán nước chú Ba',
    x: 74,
    y: 48,
    radius: 8,
    kind: 'BUSINESS',
    description: 'Quán nước nhỏ cạnh vỉa hè, nơi người trong xóm thường dừng chân trò chuyện.',
    interactionText: 'Chú Ba: “Đường này sáng nào cũng đông. Con cứ bán từ từ, làm có tâm thì khách sẽ quay lại.”',
  },
  {
    id: 'market_stall',
    name: 'Cổng chợ',
    x: 84,
    y: 33,
    radius: 8,
    kind: 'BUSINESS',
    description: 'Lối vào dãy sạp chợ. Người mua bán bắt đầu nhộn nhịp từ sáng sớm.',
    interactionText: 'Tiếng loa chợ vang lên: “Chợ đã mở cửa! Bà con mua bán nhớ giữ lối đi thông thoáng nhé!”',
  },
  {
    id: 'co_nam',
    name: 'Cô Năm hàng xóm',
    x: 46,
    y: 53,
    radius: 7,
    kind: 'NPC',
    description: 'Một người hàng xóm thân thiện đang quan sát xe bánh tráng mới mở.',
    interactionText: 'Cô Năm: “Xe mới nhìn sạch sẽ đó. Nhớ chào khách và đừng để người ta phải chờ lâu nghe con!”',
  },
  {
    id: 'co_sau',
    name: 'Cô Sáu bán hoa',
    x: 10,
    y: 52,
    radius: 7,
    kind: 'NPC',
    description: 'Cô Sáu bán hoa ở góc vỉa hè, lúc nào cũng vui vẻ và hay để ý chuyện trong xóm.',
    interactionText: 'Cô Sáu: “Sáng nay hoa cúc đẹp lắm con. Mở hàng nhớ cười tươi, người ta thấy vui thì dễ ghé lại lắm!”',
  },
  {
    id: 'shipper_ti',
    name: 'Tí giao hàng',
    x: 52,
    y: 34,
    radius: 7,
    kind: 'NPC',
    description: 'Tí là shipper trẻ thường dừng lại đầu phố để xem đơn giao trong ngày.',
    interactionText: 'Tí: “Em chạy đơn quanh mấy con hẻm này suốt. Quán nào làm nhanh, gói gọn là khách đặt lại liền anh ơi!”',
  },
  {
    id: 'chu_bay',
    name: 'Chú Bảy sửa xe',
    x: 77,
    y: 53,
    radius: 7,
    kind: 'NPC',
    description: 'Chú Bảy sửa xe lâu năm, thường ngồi trước tiệm nhìn dòng người qua lại.',
    interactionText: 'Chú Bảy: “Xe cộ chạy ngoài đường đông lắm. Con kê xe gọn vào lề, chừa lối cho bà con đi nghen!”',
  },
  {
    id: 'ba_tu',
    name: 'Bà Tư hàng xóm',
    x: 94,
    y: 52,
    radius: 7,
    kind: 'NPC',
    description: 'Bà Tư sống ở cuối dãy phố, thích trò chuyện và cập nhật tin tức khu xóm.',
    interactionText: 'Bà Tư: “Ở xóm này người ta quý nhau cái tình. Con bán đàng hoàng, giữ vệ sinh là bà con thương thôi!”',
  },
] as const;

function isInsideWorldCollision(position: WorldPosition, padding = 1.2): boolean {
  return WORLD_COLLISION_RECTS.some((rect) =>
    position.x + padding > rect.x &&
    position.x - padding < rect.x + rect.width &&
    position.y + padding > rect.y &&
    position.y - padding < rect.y + rect.height
  );
}

export function isWorldPositionWalkable(position: WorldPosition): boolean {
  return position.x >= WORLD_WALKABLE_BOUNDS.minX &&
    position.x <= WORLD_WALKABLE_BOUNDS.maxX &&
    position.y >= WORLD_WALKABLE_BOUNDS.minY &&
    position.y <= WORLD_WALKABLE_BOUNDS.maxY &&
    !isInsideWorldCollision(position);
}

export function moveWorldPlayer(
  position: WorldPosition,
  deltaX: number,
  deltaY: number,
): WorldPosition {
  const nextX = Math.max(WORLD_WALKABLE_BOUNDS.minX, Math.min(WORLD_WALKABLE_BOUNDS.maxX, position.x + deltaX));
  const nextY = Math.max(WORLD_WALKABLE_BOUNDS.minY, Math.min(WORLD_WALKABLE_BOUNDS.maxY, position.y + deltaY));

  const horizontal = { x: nextX, y: position.y };
  const afterHorizontal = isInsideWorldCollision(horizontal) ? position.x : horizontal.x;
  const vertical = { x: afterHorizontal, y: nextY };
  const afterVertical = isInsideWorldCollision(vertical) ? position.y : vertical.y;

  return { x: afterHorizontal, y: afterVertical };
}

export function findNearbyWorldLocation(
  x: number,
  y: number,
  locations: readonly WorldInteractable[] = WORLD_INTERACTABLES,
): WorldInteractable | null {
  let nearest: WorldInteractable | null = null;
  let nearestDistance = Number.POSITIVE_INFINITY;

  for (const location of locations) {
    const distance = Math.hypot(x - location.x, y - location.y);
    if (distance <= location.radius && distance < nearestDistance) {
      nearest = location;
      nearestDistance = distance;
    }
  }

  return nearest;
}
