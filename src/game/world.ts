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
