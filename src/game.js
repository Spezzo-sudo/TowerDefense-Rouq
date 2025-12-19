// Export for Node.js testing
if (typeof module !== 'undefined' && module.exports) {
    // We will attach classes to exports later
}

class Tile {
    constructor(x, y, type = 'grass') {
        this.x = x;
        this.y = y;
        this.type = type; // 'grass', 'path', 'base', 'tower_spot'
        this.size = 40; // Pixel size for rendering
        this.occupied = false;
        this.heightLevel = 0; // Elevation
    }

    render(ctx, cameraOffsetX = 0, cameraOffsetY = 0) {
        const screenX = this.x * this.size + cameraOffsetX;
        const screenY = this.y * this.size + cameraOffsetY;

        // Simple rendering based on type
        if (this.type === 'grass') ctx.fillStyle = '#2ecc71';
        else if (this.type === 'path') ctx.fillStyle = '#ecf0f1';
        else if (this.type === 'base') ctx.fillStyle = '#3498db';
        else if (this.type === 'tower_spot') ctx.fillStyle = '#95a5a6';

        ctx.fillRect(screenX, screenY, this.size, this.size);
        ctx.strokeStyle = '#27ae60';
        ctx.strokeRect(screenX, screenY, this.size, this.size);

        // Elevation indicator
        if (this.heightLevel > 0) {
            ctx.fillStyle = 'rgba(0,0,0,0.2)';
            ctx.fillText(`+${this.heightLevel}`, screenX + 5, screenY + 15);
        }
    }
}

class Enemy {
    constructor(path) {
        this.path = path; // Reference to the full path array
        this.pathIndex = path.length - 1; // Start at the end
        this.progress = 0; // Progress to next tile (0 to 1)
        this.speed = 1.0; // Tiles per second
        this.hp = 10;
        this.maxHp = 10;
        this.alive = true;
        this.reachedBase = false;

        // Position for rendering
        const startTile = this.path[this.pathIndex];
        this.x = startTile.x;
        this.y = startTile.y;
    }

    update(deltaTime) {
        if (!this.alive || this.reachedBase) return;

        const moveAmount = this.speed * (deltaTime / 1000);
        this.progress += moveAmount;

        if (this.progress >= 1.0) {
            this.progress -= 1.0;
            this.pathIndex--;

            if (this.pathIndex < 0) {
                this.reachedBase = true;
                this.alive = false;
                return;
            }
        }

        // Interpolate position
        const currentTile = this.path[this.pathIndex];
        const targetTile = this.path[this.pathIndex - 1] || this.path[0]; // move towards base (index 0)
        // Wait, if pathIndex is N, we are at N. Next is N-1.
        // Actually, let's look at logic:
        // Spawn at end (length-1). Move to length-2.
        // So 'current' is index N. 'next' is index N-1.

        // However, if we are at index 0, we are at base.
        if (this.pathIndex > 0) {
            const nextTile = this.path[this.pathIndex - 1];
            const dx = nextTile.x - currentTile.x;
            const dy = nextTile.y - currentTile.y;

            this.x = currentTile.x + dx * this.progress;
            this.y = currentTile.y + dy * this.progress;
        } else {
            // Should have been caught by pathIndex < 0 check usually, but if we are at 0 moving to... base center?
            this.x = currentTile.x;
            this.y = currentTile.y;
            this.reachedBase = true;
            this.alive = false;
        }
    }

    render(ctx, size = 40) {
        if (!this.alive) return;
        const screenX = this.x * size + size/2;
        const screenY = this.y * size + size/2;

        ctx.fillStyle = '#e74c3c';
        ctx.beginPath();
        ctx.arc(screenX, screenY, size * 0.3, 0, Math.PI * 2);
        ctx.fill();

        // HP Bar
        const hpPercent = this.hp / this.maxHp;
        ctx.fillStyle = 'red';
        ctx.fillRect(screenX - 10, screenY - 20, 20, 4);
        ctx.fillStyle = 'lime';
        ctx.fillRect(screenX - 10, screenY - 20, 20 * hpPercent, 4);
    }
}

class Projectile {
    constructor(x, y, target, damage) {
        this.x = x;
        this.y = y;
        this.target = target;
        this.damage = damage;
        this.speed = 10.0; // Fast
        this.hit = false;
    }

    update(deltaTime) {
        if (this.hit || !this.target.alive) {
            this.hit = true;
            return;
        }

        const dx = this.target.x - this.x;
        const dy = this.target.y - this.y;
        const dist = Math.sqrt(dx*dx + dy*dy);

        const moveAmount = this.speed * (deltaTime / 1000);

        if (dist <= moveAmount) {
            this.x = this.target.x;
            this.y = this.target.y;
            this.hit = true;
            this.target.hp -= this.damage;
            if (this.target.hp <= 0) {
                this.target.alive = false;
            }
        } else {
            this.x += (dx / dist) * moveAmount;
            this.y += (dy / dist) * moveAmount;
        }
    }

    render(ctx, size=40) {
        if (this.hit) return;
        const screenX = this.x * size + size/2;
        const screenY = this.y * size + size/2;

        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.arc(screenX, screenY, 5, 0, Math.PI * 2);
        ctx.fill();
    }
}

class Tower {
    constructor(x, y, heightLevel = 0) {
        this.x = x;
        this.y = y;
        this.heightLevel = heightLevel;
        this.range = 3.5; // Tiles
        this.damage = 2;
        this.cooldown = 1000; // ms
        this.cooldownTimer = 0;
        this.projectiles = [];
        this.type = 'Ballista';
    }

    update(deltaTime, enemies) {
        if (this.cooldownTimer > 0) {
            this.cooldownTimer -= deltaTime;
        }

        // Projectiles update
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const p = this.projectiles[i];
            p.update(deltaTime);
            if (p.hit) {
                this.projectiles.splice(i, 1);
            }
        }

        if (this.cooldownTimer <= 0) {
            // Find target
            let target = null;
            let minDist = Infinity;

            for (const enemy of enemies) {
                const dx = enemy.x - this.x;
                const dy = enemy.y - this.y;
                const dist = Math.sqrt(dx*dx + dy*dy);

                if (dist <= this.range && dist < minDist) {
                    minDist = dist;
                    target = enemy;
                }
            }

            if (target) {
                this.shoot(target);
                this.cooldownTimer = this.cooldown;
            }
        }
    }

    shoot(target) {
        // Calculate damage with height bonus
        // Enemy height is implicitly 0 (on path) unless we make path have height.
        // For now assume path is 0.
        // Rogue Tower Rule: +Damage for height advantage.
        // Simple rule: +1 damage per height level difference.
        const heightBonus = Math.max(0, this.heightLevel) * 1;

        this.projectiles.push(new Projectile(this.x, this.y, target, this.damage + heightBonus));
    }

    render(ctx, size=40) {
        const screenX = this.x * size;
        const screenY = this.y * size;

        // Draw Tower Base
        ctx.fillStyle = '#8e44ad';
        ctx.fillRect(screenX + 5, screenY + 5, size - 10, size - 10);

        // Draw Turret
        ctx.fillStyle = '#9b59b6';
        ctx.beginPath();
        ctx.arc(screenX + size/2, screenY + size/2, size/3, 0, Math.PI*2);
        ctx.fill();

        // Projectiles
        this.projectiles.forEach(p => p.render(ctx, size));
    }
}

class WaveManager {
    constructor(game) {
        this.game = game;
        this.enemies = [];
        this.waveNumber = 1;
        this.spawnTimer = 0;
        this.enemiesToSpawn = 0;
        this.waveActive = false;
    }

    startWave() {
        if (this.waveActive) return;
        this.waveActive = true;
        this.enemiesToSpawn = 5 + this.waveNumber * 2;
        this.spawnTimer = 0;
        console.log(`Starting Wave ${this.waveNumber} with ${this.enemiesToSpawn} enemies`);
    }

    update(deltaTime) {
        // Spawning
        if (this.waveActive && this.enemiesToSpawn > 0) {
            this.spawnTimer += deltaTime;
            if (this.spawnTimer > 1000) { // Spawn every 1 second
                this.spawnEnemy();
                this.spawnTimer = 0;
                this.enemiesToSpawn--;
            }
        } else if (this.waveActive && this.enemiesToSpawn === 0 && this.enemies.length === 0) {
            this.endWave();
        }

        // Update enemies
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            const enemy = this.enemies[i];
            enemy.update(deltaTime);
            if (enemy.reachedBase) {
                this.game.takeDamage(1);
                this.enemies.splice(i, 1);
            } else if (!enemy.alive) {
                // Grant gold on kill
                this.game.gold += 1;
                this.enemies.splice(i, 1);
            }
        }
    }

    spawnEnemy() {
        const enemy = new Enemy(this.game.map.path);
        // Scale HP with wave
        enemy.maxHp = 10 + (this.waveNumber * 5);
        enemy.hp = enemy.maxHp;
        this.enemies.push(enemy);
    }

    endWave() {
        this.waveActive = false;
        this.waveNumber++;
        console.log("Wave Ended");
        // Trigger card selection or path expansion
        this.game.onWaveEnd();
    }

    render(ctx) {
        this.enemies.forEach(e => e.render(ctx));
    }
}

class GameMap {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.grid = []; // 2D array
        this.path = []; // Ordered list of tiles making up the path

        this.generateGrid();
    }

    generateGrid() {
        for (let y = 0; y < this.height; y++) {
            const row = [];
            for (let x = 0; x < this.width; x++) {
                const tile = new Tile(x, y, 'grass');
                // Random height 0, 1, or 2 (simplified)
                tile.heightLevel = Math.random() > 0.8 ? (Math.random() > 0.5 ? 2 : 1) : 0;
                row.push(tile);
            }
            this.grid.push(row);
        }

        // Setup Base in the middle
        const midX = Math.floor(this.width / 2);
        const midY = Math.floor(this.height / 2);
        const baseTile = this.grid[midY][midX];
        baseTile.type = 'base';
        this.path.push(baseTile);
    }

    expandPath(length = 5) {
        // Expand path from the last tile (the spawn point end, not the base)
        // In Rogue Tower, enemies spawn at the ends and move to the base.
        // So when we expand, we are adding to the "end" of the path, where enemies will spawn.

        let currentTile = this.path[this.path.length - 1];
        let added = 0;

        // Simple random walk for now, avoiding self-intersection if possible
        while (added < length) {
            const neighbors = [
                {x: currentTile.x + 1, y: currentTile.y},
                {x: currentTile.x - 1, y: currentTile.y},
                {x: currentTile.x, y: currentTile.y + 1},
                {x: currentTile.x, y: currentTile.y - 1}
            ];

            // Filter valid neighbors
            const validNeighbors = neighbors.filter(n => {
                const tile = this.getTile(n.x, n.y);
                // Must be in bounds, grass, and not already part of path
                return tile && tile.type === 'grass';
            });

            if (validNeighbors.length === 0) break; // Stuck

            const nextPos = validNeighbors[Math.floor(Math.random() * validNeighbors.length)];
            const nextTile = this.getTile(nextPos.x, nextPos.y);

            nextTile.type = 'path';
            this.path.push(nextTile);
            currentTile = nextTile;
            added++;
        }

        // Mark the very last tile as a spawn point (optional visual)
        // In this logic, enemies spawn at the last element of this.path and move towards index 0 (base)
    }

    getTile(x, y) {
        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
            return this.grid[y][x];
        }
        return null;
    }

    render(ctx) {
        // We could implement camera offset later
        const offsetX = 0;
        const offsetY = 0;

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                this.grid[y][x].render(ctx, offsetX, offsetY);
            }
        }
    }
}

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        if (this.canvas && this.canvas.getContext) {
            this.ctx = this.canvas.getContext('2d');
            this.width = this.canvas.width;
            this.height = this.canvas.height;
        } else {
            // Headless mode or test environment
            this.width = 800;
            this.height = 600;
        }

        this.lastTime = 0;
        this.running = false;

        // Initialize Map
        this.map = new GameMap(20, 15); // 20x15 grid fits in 800x600 with 40px tiles

        // Game State
        this.gold = 100;
        this.baseHealth = 20;
        this.mana = 0;

        this.towers = [];
        this.waveManager = new WaveManager(this);

        this.ui = {
            gold: document.getElementById('gold'),
            health: document.getElementById('health'),
            mana: document.getElementById('mana'),
            wave: document.getElementById('wave'),
            nextWaveBtn: document.getElementById('next-wave-btn'),
            cardSelection: document.getElementById('card-selection'),
            cardsContainer: document.getElementById('cards-container')
        };

        if (this.ui.nextWaveBtn) {
            this.ui.nextWaveBtn.onclick = () => {
                this.waveManager.startWave();
                this.ui.nextWaveBtn.disabled = true;
            };
        }

        // Input Handling
        if (this.canvas && this.canvas.addEventListener) {
            this.canvas.addEventListener('mousedown', (e) => this.handleInput(e));
        }
    }

    start() {
        this.running = true;
        this.map.expandPath(5); // Initial path
        this.gameLoop(0);
    }

    handleInput(e) {
        if (this.waveManager.waveActive) return; // Only build between waves? Or anytime? Rogue Tower allows anytime?
        // Rogue Tower usually allows building anytime if you have gold.

        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const tileX = Math.floor(x / 40);
        const tileY = Math.floor(y / 40);

        const tile = this.map.getTile(tileX, tileY);

        if (tile && tile.type === 'grass' && !tile.occupied) {
            if (this.gold >= 50) {
                this.gold -= 50;
                this.buildTower(tileX, tileY, tile.heightLevel);
                tile.occupied = true;
            }
        }
    }

    buildTower(x, y, heightLevel) {
        this.towers.push(new Tower(x, y, heightLevel));
    }

    takeDamage(amount) {
        this.baseHealth -= amount;
        if (this.baseHealth <= 0) {
            this.baseHealth = 0;
            this.gameOver();
        }
    }

    gameOver() {
        this.running = false;
        alert("Game Over! You reached Wave " + this.waveManager.waveNumber);
        // Simple reload for now
        if (typeof window !== 'undefined') {
            window.location.reload();
        }
    }

    onWaveEnd() {
        // Expand path
        this.map.expandPath(3);

        // Show cards
        this.showCardSelection();
    }

    showCardSelection() {
        if (!this.ui.cardSelection) return;

        this.ui.cardSelection.classList.remove('hidden');
        this.ui.cardsContainer.innerHTML = '';

        const upgrades = [
            { name: "Ballista +", desc: "Damage +1", type: "upgrade", effect: (g) => {
                g.towers.forEach(t => { if(t.type === 'Ballista') t.damage += 1; });
                console.log("Ballistas upgraded!");
            }},
            { name: "New Ballista", desc: "Gold +100", type: "resource", effect: (g) => {
                g.gold += 100;
            }},
            { name: "Range Up", desc: "Range +1", type: "upgrade", effect: (g) => {
                g.towers.forEach(t => t.range += 1);
            }}
        ];

        // Randomly pick 3 (simplified here just showing all 3)
        upgrades.forEach(upgrade => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${upgrade.name}</h3>
                <p>${upgrade.desc}</p>
                <small>${upgrade.type}</small>
            `;
            card.onclick = () => {
                upgrade.effect(this);
                this.closeCardSelection();
            };
            this.ui.cardsContainer.appendChild(card);
        });
    }

    closeCardSelection() {
        if (this.ui.cardSelection) {
            this.ui.cardSelection.classList.add('hidden');
        }
        if (this.ui.nextWaveBtn) {
            this.ui.nextWaveBtn.disabled = false;
        }
    }

    gameLoop(timestamp) {
        if (!this.running) return;

        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;

        this.update(deltaTime);
        this.render();

        if (this.canvas) {
            requestAnimationFrame((ts) => this.gameLoop(ts));
        }
    }

    update(deltaTime) {
        if (deltaTime > 100) deltaTime = 100; // Cap delta to prevent huge jumps

        this.waveManager.update(deltaTime);

        this.towers.forEach(t => t.update(deltaTime, this.waveManager.enemies));

        // Update UI
        if (this.ui.gold) {
            this.ui.gold.innerText = Math.floor(this.gold);
            this.ui.health.innerText = this.baseHealth;
            this.ui.wave.innerText = this.waveManager.waveNumber;
        }
    }

    render() {
        if (!this.ctx) return;

        // Clear screen
        this.ctx.fillStyle = '#222';
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Render Map
        this.map.render(this.ctx);

        // Render Towers
        this.towers.forEach(t => t.render(this.ctx));

        // Render Enemies
        this.waveManager.render(this.ctx);
    }
}

// Initialize game on load if in browser
if (typeof window !== 'undefined') {
    window.onload = () => {
        const game = new Game();
        game.start();
        window.game = game; // Expose for debugging
    };
}

// Export for Node.js testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Game, GameMap, Tile, Enemy, Tower, Projectile };
}
