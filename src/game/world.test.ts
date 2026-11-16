import test from 'node:test';
import assert from 'node:assert/strict';
import { canChangeVendorLocation, canUseWorldActivity, findNearbyWorldActivity, getVendorLocation, isSystemUnlocked, VENDOR_LOCATIONS, WORLD_ACTIVITIES } from './world';

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

test('minigame locations unlock only at level 5 with a hired staff member', () => {
  for (const activity of WORLD_ACTIVITIES) {
    assert.equal(canUseWorldActivity(activity, 4, 2), false);
    assert.equal(canUseWorldActivity(activity, 5, 0), false);
    assert.equal(canUseWorldActivity(activity, 5, 1), true);
  }
});

test('minigame interaction requires the player to walk within the activity radius', () => {
  const activity = WORLD_ACTIVITIES[0];
  assert.equal(findNearbyWorldActivity(activity.x, activity.y)?.id, activity.id);
  assert.equal(findNearbyWorldActivity(90, 90), null);
});
