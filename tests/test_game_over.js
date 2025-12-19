const { Game, Enemy } = require('../src/game.js');
const assert = require('assert');

// Setup
global.document = {
    getElementById: () => ({ classList: { add: () => {}, remove: () => {} }, innerHTML: '', appendChild: () => {} }),
    createElement: () => ({ onclick: null, className: '', innerHTML: '' })
};
global.window = { location: { reload: () => { console.log("Reload called"); } } };
global.alert = (msg) => { console.log("Alert: " + msg); };

const game = new Game();
game.baseHealth = 2; // Low health for testing

// Setup enemies
const enemy1 = new Enemy(game.map.path);
enemy1.reachedBase = true; // Force reach base
game.waveManager.enemies.push(enemy1);

// Update wave manager (triggers damage)
game.waveManager.update(100);

assert.strictEqual(game.baseHealth, 1, "Base health should decrease by 1");
assert.strictEqual(game.waveManager.enemies.length, 0, "Enemy should be removed");

// Kill shot
const enemy2 = new Enemy(game.map.path);
enemy2.reachedBase = true;
game.waveManager.enemies.push(enemy2);

game.waveManager.update(100);

assert.strictEqual(game.baseHealth, 0, "Base health should be 0");
assert.strictEqual(game.running, false, "Game should stop (Game Over)");

console.log('Game Over tests passed!');
