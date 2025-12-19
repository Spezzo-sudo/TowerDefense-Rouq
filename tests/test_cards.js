const { Game, Tower } = require('../src/game.js');
const assert = require('assert');

// Setup Game
// Mock document/canvas since we are in node
global.document = {
    getElementById: () => ({ classList: { add: () => {}, remove: () => {} }, innerHTML: '', appendChild: () => {} }),
    createElement: () => ({ onclick: null, className: '', innerHTML: '' })
};
global.window = {};

const game = new Game();
// Initialize some towers
game.towers.push(new Tower(0,0));
const initialDamage = game.towers[0].damage;

// Mock UI elements
game.ui.cardsContainer = { appendChild: (el) => {
    // Trigger the click immediately to simulate user selection
    if (el.onclick && el.innerHTML.includes("Ballista +")) {
        el.onclick();
    }
}, innerHTML: '' };

// Trigger Card Selection
game.showCardSelection();

// Verify Upgrade applied
assert.strictEqual(game.towers[0].damage, initialDamage + 1, "Upgrade should have increased damage");

console.log('Card System tests passed!');
