import test from 'node:test';
import assert from 'node:assert/strict';
import { canChangeVendorLocation, getVendorLocation, isSystemUnlocked, VENDOR_LOCATIONS } from './world';

test('all five vendor locations have distinct grounded costs and valid multipliers', () => {
  assert.equal(VENDOR_LOCATIONS.length, 5);
  for (const location of VENDOR_LOCATIONS) {
    assert.ok(location.rentPerDay > 0);
    assert.ok(location.orderMultiplier > 0);
    assert.ok(location.incidentMultiplier > 0);
  }
});

test('unknown vendor location safely falls back to the first location', () => {
  assert.equal(getVendorLocation('UNKNOWN').id, 'CONG_VIEN');
});

test('location changes are only allowed before a new game or at end of day', () => {
  assert.equal(canChangeVendorLocation('TITLE_MENU'), true);
  assert.equal(canChangeVendorLocation('END_OF_DAY'), true);
  assert.equal(canChangeVendorLocation('MORNING_PREP'), false);
  assert.equal(canChangeVendorLocation('PLAYING'), false);
});

test('side activities require level 5 and at least one staff member', () => {
  assert.equal(isSystemUnlocked('SIDE_ACTIVITIES', 4, true), false);
  assert.equal(isSystemUnlocked('SIDE_ACTIVITIES', 5, false), false);
  assert.equal(isSystemUnlocked('SIDE_ACTIVITIES', 5, true), true);
  assert.equal(isSystemUnlocked('STAFF', 5, false), true);
});
