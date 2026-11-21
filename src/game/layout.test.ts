import test from 'node:test';
import assert from 'node:assert/strict';
import { computePrepLayout } from './layout';

test('portrait cooking layout keeps the cutting board and action buttons inside the viewport', () => {
  for (const [width, height] of [[320, 640], [375, 812], [390, 844], [430, 932]]) {
    const layout = computePrepLayout(width, height);
    const boardWidth = layout.boardRadius * 2.6;
    const boardHeight = layout.boardRadius * 2.08;
    assert.ok(layout.boardCenterX - boardWidth / 2 >= 0, `board left at ${width}px`);
    assert.ok(layout.boardCenterX + boardWidth / 2 <= width, `board right at ${width}px`);
    assert.ok(layout.boardCenterY + boardHeight / 2 < layout.primaryBtn.y, `board/action overlap at ${width}px`);
    for (const button of [layout.primaryBtn, layout.secondaryBtn]) {
      assert.ok(button.x >= 0, `button left at ${width}px`);
      assert.ok(button.x + button.w <= width, `button right at ${width}px`);
      assert.ok(button.y + button.h <= height, `button bottom at ${width}px`);
    }
  }
});

test('landscape cooking layout retains the wider workstation controls', () => {
  const layout = computePrepLayout(844, 390);
  assert.ok(layout.boardRadius >= 92);
  assert.ok(layout.primaryBtn.x > layout.secondaryBtn.x);
  assert.ok(layout.primaryBtn.y + layout.primaryBtn.h <= 390);
});
