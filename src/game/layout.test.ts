import test from 'node:test';
import assert from 'node:assert/strict';
import { computePrepLayout } from './layout';

const phoneViewports = [
  [280, 480], [320, 568], [320, 640], [360, 740], [375, 667],
  [375, 812], [390, 844], [414, 896], [430, 932], [480, 960],
  [568, 320], [667, 375], [740, 360], [844, 390], [932, 430],
];

test('cooking action buttons and cutting board stay within common phone viewports', () => {
  for (const [width, height] of phoneViewports) {
    const layout = computePrepLayout(width, height);
    const boardWidth = layout.boardRadius * 2.6;
    const boardHeight = layout.boardRadius * 2.08;
    const boardLeft = layout.boardCenterX - boardWidth / 2;
    const boardRight = layout.boardCenterX + boardWidth / 2;
    const boardTop = layout.boardCenterY - boardHeight / 2;
    const boardBottom = layout.boardCenterY + boardHeight / 2;

    assert.ok(boardLeft >= -1, `board left at ${width}x${height}: ${boardLeft}`);
    assert.ok(boardRight <= width + 1, `board right at ${width}x${height}: ${boardRight}`);
    assert.ok(boardTop >= layout.counterY, `board overlaps step/header area at ${width}x${height}`);
    assert.ok(boardBottom < layout.primaryBtn.y, `board/action overlap at ${width}x${height}`);

    for (const button of [layout.primaryBtn, layout.secondaryBtn]) {
      assert.ok(button.x >= -1, `button left at ${width}x${height}: ${button.x}`);
      assert.ok(button.x + button.w <= width + 1, `button right at ${width}x${height}`);
      assert.ok(button.y >= 0, `button top at ${width}x${height}`);
      assert.ok(button.y + button.h <= height + 1, `button bottom at ${width}x${height}`);
    }
  }
});

test('narrow phones retain usable action targets without forcing a 320px canvas width', () => {
  for (const width of [280, 300, 320]) {
    const layout = computePrepLayout(width, 640);
    assert.ok(layout.primaryBtn.w > 0);
    assert.ok(layout.secondaryBtn.w > 0);
    assert.ok(layout.primaryBtn.x + layout.primaryBtn.w <= width);
    assert.ok(layout.secondaryBtn.x >= 0);
  }
});

test('landscape cooking layout retains wider workstation controls', () => {
  for (const [width, height] of [[844, 390], [932, 430], [1024, 600]]) {
    const layout = computePrepLayout(width, height);
    assert.ok(layout.primaryBtn.x > layout.secondaryBtn.x);
    assert.ok(layout.primaryBtn.y + layout.primaryBtn.h <= height);
    assert.ok(layout.boardCenterX - layout.boardRadius * 1.3 >= 0);
    assert.ok(layout.boardCenterX + layout.boardRadius * 1.3 <= width);
  }
});
