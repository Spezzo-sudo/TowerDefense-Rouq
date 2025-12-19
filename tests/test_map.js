const { GameMap, Tile } = require('../src/game.js');
const assert = require('assert');

// Basic test to verify map initialization
const map = new GameMap(20, 15);

assert.strictEqual(map.width, 20);
assert.strictEqual(map.height, 15);
assert.strictEqual(map.grid.length, 15);
assert.strictEqual(map.grid[0].length, 20);

// Check Base placement
const midX = 10;
const midY = 7;
const baseTile = map.getTile(midX, midY);
assert.strictEqual(baseTile.type, 'base');
assert.strictEqual(map.path.length, 1);
assert.strictEqual(map.path[0], baseTile);

// Test Path Expansion
const initialPathLength = map.path.length;
map.expandPath(5);
const newPathLength = map.path.length;

assert.ok(newPathLength > initialPathLength, "Path should have expanded");
// Note: It might be less than +5 if it got stuck, but in an empty grid it should be +5
assert.strictEqual(newPathLength, 6);

// Verify path connectivity
for (let i = 1; i < map.path.length; i++) {
    const prev = map.path[i - 1];
    const curr = map.path[i];
    const dist = Math.abs(prev.x - curr.x) + Math.abs(prev.y - curr.y);
    assert.strictEqual(dist, 1, `Path tiles at index ${i-1} and ${i} should be adjacent`);
}

console.log('Map tests passed!');
