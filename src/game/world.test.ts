import test from 'node:test';
import assert from 'node:assert/strict';
import { canChangeVendorLocation, canUseWorldActivity, findNearbyWorldActivity, findNearbyWorldLocation, getVendorLocation, isSystemUnlocked, isWorldPositionWalkable, moveWorldPlayer, VENDOR_LOCATIONS, WORLD_ACTIVITIES, WORLD_INTERACTABLES, WORLD_LANDMARKS, PEDESTRIAN_ROUTES } from './world';

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

test('street scene includes distinct park, shops, food stall, sidewalk and road areas', () => {
  const kinds = new Set(WORLD_LANDMARKS.map((landmark) => landmark.kind));
  for (const kind of ['PARK', 'MARKET', 'FOOD_STALL', 'SIDEWALK', 'ROAD']) {
    assert.ok(kinds.has(kind as (typeof WORLD_LANDMARKS)[number]['kind']));
  }
});

test('pedestrian routes have unique ids and movement animations', () => {
  assert.ok(PEDESTRIAN_ROUTES.length >= 3);
  assert.equal(new Set(PEDESTRIAN_ROUTES.map((route) => route.id)).size, PEDESTRIAN_ROUTES.length);
  for (const route of PEDESTRIAN_ROUTES) {
    assert.ok(route.emoji.length > 0);
    assert.ok(route.top.endsWith('%'));
    assert.ok(route.delay.length > 0);
  }
});


test('neighborhood movement stays inside the walkable sidewalk bounds', () => {
  const moved = moveWorldPlayer({ x: 48, y: 45 }, 100, -100);
  assert.equal(moved.x, 96);
  assert.equal(moved.y, 33);
});

test('neighborhood movement collides with solid map objects', () => {
  const blockedByCart = moveWorldPlayer({ x: 40, y: 38 }, -15, 0);
  assert.equal(blockedByCart.x, 40);

  const blockedByDrinkStall = moveWorldPlayer({ x: 50, y: 45 }, 20, 0);
  assert.equal(blockedByDrinkStall.x, 50);
});

test('movement slides along obstacles instead of freezing both axes', () => {
  const moved = moveWorldPlayer({ x: 40, y: 38 }, -15, 5);
  assert.equal(moved.x, 40);
  assert.equal(moved.y, 43);
});

test('all neighborhood businesses and the neighbor have interaction dialogue', () => {
  assert.equal(WORLD_INTERACTABLES.length, 6);
  for (const location of WORLD_INTERACTABLES) {
    assert.ok(location.name.length > 0);
    assert.ok(location.description.length > 0);
    assert.ok(location.interactionText.length > 0);
    assert.ok(location.radius > 0);
  }
});

test('nearby interaction selects the closest location within its own radius', () => {
  assert.equal(findNearbyWorldLocation(36, 48)?.id, 'cart');
  assert.equal(findNearbyWorldLocation(74, 48)?.id, 'drink_stall');
  assert.equal(findNearbyWorldLocation(50, 40), null);
});

test('all authored interaction points are on reachable sidewalk tiles', () => {
  for (const location of WORLD_INTERACTABLES) {
    assert.equal(isWorldPositionWalkable({ x: location.x, y: location.y }), true, location.id);
  }
  assert.equal(findNearbyWorldLocation(48, 45), null);
});


test('player can reach the grocery shop by walking around the cart along the lower sidewalk', () => {
  let position = { x: 48, y: 45 };
  position = moveWorldPlayer(position, 0, 11);
  position = moveWorldPlayer(position, -36, 0);
  position = moveWorldPlayer(position, 0, -23);

  assert.deepEqual(position, { x: 12, y: 33 });
  assert.equal(isWorldPositionWalkable(position), true);
  assert.equal(findNearbyWorldLocation(position.x, position.y)?.id, 'grocery');
});
