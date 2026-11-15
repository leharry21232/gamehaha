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
