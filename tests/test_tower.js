const { GameMap, Enemy, Tower, Projectile } = require('../src/game.js');
const assert = require('assert');

// Setup
const map = new GameMap(20, 15);
map.expandPath(5);
const tower = new Tower(5, 5); // Place tower somewhere
const enemy = new Enemy(map.path);

// Force enemy position to be close to tower
enemy.x = 5.5;
enemy.y = 5.5;

// Test Targeting
const enemies = [enemy];
tower.update(50, enemies); // Small update

assert.strictEqual(tower.projectiles.length, 1, "Tower should have fired a projectile");
assert.ok(tower.cooldownTimer > 0, "Tower should be on cooldown");

// Test Projectile Hitting
const projectile = tower.projectiles[0];
const initialHp = enemy.hp;

// Update tower (which updates projectiles) enough for projectile to hit
// Projectile speed 10 tiles/sec. Distance ~0 (same tile).
tower.update(100, enemies);

assert.ok(projectile.hit, "Projectile should have hit");
assert.strictEqual(enemy.hp, initialHp - projectile.damage, "Enemy should have taken damage");

console.log('Tower tests passed!');
