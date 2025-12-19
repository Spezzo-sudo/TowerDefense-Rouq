const { Tower, Enemy } = require('../src/game.js');
const assert = require('assert');

// Setup
const enemy = new Enemy([{x: 10, y: 10}]); // Mock path
enemy.x = 10;
enemy.y = 10;

// Tower at ground level (0)
const groundTower = new Tower(10, 10, 0);
groundTower.shoot(enemy);
assert.strictEqual(groundTower.projectiles[0].damage, 2, "Ground tower should deal base damage (2)");

// Tower at high ground (2)
const highTower = new Tower(10, 10, 2);
highTower.shoot(enemy);
assert.strictEqual(highTower.projectiles[0].damage, 4, "High tower should deal base (2) + height (2) damage");

console.log('Elevation tests passed!');
