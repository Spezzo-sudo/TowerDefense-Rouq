const { GameMap, Tile, Enemy } = require('../src/game.js');
const assert = require('assert');

// Setup map and path
const map = new GameMap(20, 15);
map.expandPath(5); // Ensure there is a path
const pathLength = map.path.length;

// Create enemy
const enemy = new Enemy(map.path);

// Verify initial state
assert.strictEqual(enemy.pathIndex, pathLength - 1);
assert.strictEqual(enemy.progress, 0);
assert.strictEqual(enemy.x, map.path[pathLength - 1].x);
assert.strictEqual(enemy.y, map.path[pathLength - 1].y);

// Simulate movement
// Speed is 1.0 tile/sec. Update with 500ms (0.5s)
enemy.update(500);

assert.strictEqual(enemy.pathIndex, pathLength - 1);
assert.ok(Math.abs(enemy.progress - 0.5) < 0.001);

// Move another 600ms (total 1.1s)
enemy.update(600);

// Should have moved to next tile (index - 1)
assert.strictEqual(enemy.pathIndex, pathLength - 2);
assert.ok(Math.abs(enemy.progress - 0.1) < 0.001);

console.log('Enemy tests passed!');
