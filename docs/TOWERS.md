# Tower System - Complete Reference

## 🏰 Tower Architecture

### Core Tower Interface
```typescript
interface Tower {
  id: string;
  type: TowerType;
  position: { x: number; y: number };

  // Base Stats
  baseDamage: number;
  multipliers: {
    health: number;    // Damage vs Health pools
    armor: number;     // Damage vs Armor pools
    shield: number;    // Damage vs Shield pools
  };
  range: number;       // Tiles
  rpm: number;         // Rounds Per Minute
  manaCost: number;    // Per shot (0 = no cost)

  // Leveling
  level: number;
  experience: {
    health: number;
    armor: number;
    shield: number;
  };

  // Upgrades
  statusEffects: {
    bleed: number;     // % as DoT
    burn: number;
    poison: number;
  };
  critChance: number;  // 0-150%

  // Targeting
  priorities: [Priority, Priority, Priority];
  currentTarget: Enemy | null;

  // State
  lastShotTime: number;
  manaReserved: number;
}
```

## 🔫 The 15 Tower Types

### Starter Towers (Always Available)

#### 1. Rail Gun
- **Base Damage:** 10
- **Multipliers:** Health: 10 | Armor: 5 | Shield: 5
- **Range:** 5 tiles
- **RPM:** 20
- **Cost:** 10 + (level × 15)
- **Mana Cost:** 0
- **Special:** Single-target precision weapon
- **Best Against:** Health pools
- **Upgrade Path:** Slow, Crit, +Damage

#### 2. Rocket Pod
- **Base Damage:** 20
- **Multipliers:** Health: 10 | Armor: 15 | Shield: 5
- **Range:** 10 tiles
- **RPM:** 10
- **AoE Radius:** 2 tiles
- **Cost:** 200 + (level × 75)
- **Mana Cost:** 0
- **Special:** Projectile travel time creates delay
- **Best Against:** Armor pools, clustered enemies
- **Travel Time:** ~0.5 seconds per 5 tiles

#### 3. Tesla Coil
- **Base Damage:** 10
- **Multipliers:** Health: 6 | Armor: 3 | Shield: 10
- **Range:** 1.5 tiles
- **RPM:** 30
- **Cost:** 200 + (level × 75)
- **Mana Cost:** 5 per shot
- **Special:** Hits ALL enemies in range simultaneously
- **Best Against:** Shield pools, dense waves
- **Synergy:** Works well in tight corridors

### Unlockable Towers (Mid-Game)

#### 4. Cryo Trap
- **Base Damage:** 6
- **Multipliers:** Health: 10 | Armor: 5 | Shield: 5
- **Range:** 2 tiles
- **RPM:** 180 (scales with path coverage)
- **Cost:** 250 + (level × 100)
- **Mana Cost:** 2 per second (constant)
- **Special:** Slows enemies by 50%
- **RPM Scaling:** +10% RPM per path tile within range
- **Best Against:** Fast enemies, crowd control
- **Prerequisite:** Rail Gun

#### 5. Flamethrower
- **Base Damage:** 5
- **Multipliers:** Health: 6 | Armor: 9 | Shield: 3
- **Range:** 4 tiles
- **RPM:** 60
- **Cost:** 300 + (level × 75)
- **Mana Cost:** 1 per shot
- **Special:** Line AoE, applies Burn status
- **Status Effect:** Stops Armor regeneration
- **Best Against:** Armor pools with regen
- **Synergy:** Disable armor shields for other towers

#### 6. Toxin Sprayer
- **Base Damage:** 5
- **Multipliers:** Health: 6 | Armor: 3 | Shield: 9
- **Range:** 4 tiles
- **RPM:** 60
- **Cost:** 300 + (level × 75)
- **Mana Cost:** 1 per shot
- **Special:** Line AoE, applies Poison status
- **Status Effect:** Stops Shield regeneration
- **Best Against:** Shield pools with regen
- **Synergy:** Works with Shield-focused enemies

#### 7. Nano Shredder
- **Base Damage:** 10
- **Multipliers:** Health: 20 | Armor: 10 | Shield: 10
- **Range:** 5 tiles
- **RPM:** 5
- **Cost:** 500 + (level × 100)
- **Mana Cost:** 0
- **Special:** Sends discs along path, applies Bleed
- **Status Effect:** Stops Health regeneration
- **Projectile Type:** Follows path like enemies
- **Best Against:** Health-heavy enemies, mobile paths
- **Prerequisite:** Rail Gun + Cryo Trap

#### 8. Mine Deployer
- **Base Damage:** 20
- **Multipliers:** Health: 10 | Armor: 15 | Shield: 5
- **Range:** 2 tiles
- **RPM:** 5 (scales with path coverage)
- **Cost:** 500 + (level × 100)
- **Mana Cost:** 0
- **Special:** Deploys mines randomly in range
- **Mine AoE:** 1.5 tiles per mine
- **RPM Scaling:** +15% RPM per path tile within range
- **Best Against:** Clustered enemies, choke points
- **Prerequisite:** Rocket Pod + Cryo Trap

#### 9. Target Scanner
- **Base Damage:** 1
- **Multipliers:** Health: 2 | Armor: 1 | Shield: 3
- **Range:** 8 tiles
- **RPM:** 0 (utility tower - doesn't fire)
- **Cost:** 500 + (level × 100)
- **Mana Cost:** 0
- **Special:** Marks enemies, ALL other towers deal +1 multiplier to marked targets
- **Marked Buff:** Adds tower's multipliers to all towers' damage
- **Best Against:** All situations (universal buff)
- **Synergy:** Multiplicative effect with many towers
- **Prerequisite:** Rail Gun

### Advanced Towers (Late-Game)

#### 10. Drone Bay
- **Base Damage:** 20
- **Multipliers:** Health: 20 | Armor: 10 | Shield: 10
- **Range:** 30 tiles (extreme range)
- **RPM:** 700
- **Cost:** 1000 + (level × 250)
- **Mana Cost:** 0
- **Special:** Sends drones at extreme range
- **Drone Speed:** Slow but reliable
- **Drone Navigation:** Physical (follows path to target)
- **Best Against:** Boss waves, spread-out enemies
- **Prerequisite:** Particle Beam

#### 11. Pulse Cannon
- **Base Damage:** 8
- **Multipliers:** Health: 5 | Armor: 10 | Shield: 2
- **Range:** 5 tiles
- **RPM:** 360 (rapid-fire)
- **Cost:** 1000 + (level × 250)
- **Mana Cost:** 2 per shot
- **Special:** High RPM burst damage
- **Best Against:** Armor pools with sustained damage
- **Synergy:** Armor scaling
- **Prerequisite:** Tesla Coil + Flamethrower

#### 12. Particle Beam
- **Base Damage:** 50
- **Multipliers:** Health: 15 | Armor: 10 | Shield: 20
- **Range:** 20 tiles
- **RPM:** 12
- **Cost:** 1000 + (level × 250)
- **Mana Cost:** 12 per shot
- **Special:** Sniper tower with extreme single-target damage
- **Best Against:** Bosses, single powerful enemies
- **Synergy:** High shield multiplier
- **Prerequisite:** Tesla Coil + Particle Beam research

### New Towers (Update Content)

#### 13. Vampire Drone
- **Base Damage:** 12
- **Multipliers:** Health: 10 | Armor: 5 | Shield: 5
- **Range:** 9 tiles
- **RPM:** 6
- **Cost:** 750 + (level × 150)
- **Mana Cost:** 12 per shot
- **Special:** Leeches health, returns % as healing to base or mana
- **Lifesteal Percent:** 20% of damage
- **Best Against:** Long waves, sustain scenarios
- **Synergy:** Economic tower (generates resources)
- **Prerequisite:** Drone Bay

#### 14. Gauss Cannon
- **Base Damage:** 20
- **Multipliers:** Health: 10 | Armor: 20 | Shield: 5
- **Range:** 6 tiles
- **RPM:** 20
- **Cost:** 750 + (level × 150)
- **Mana Cost:** 0
- **Special:** Heavy kinetic damage, pure armor scaling
- **Best Against:** Armor-heavy enemies
- **Synergy:** Armor multiplier focus
- **Prerequisite:** Rocket Pod + Gauss research

#### 15. Data Obelisk
- **Base Damage:** 15
- **Multipliers:** Health: 10 | Armor: 5 | Shield: 15
- **Range:** 7 tiles
- **RPM:** 12
- **Cost:** 750 + (level × 150)
- **Mana Cost:** 3 per shot
- **Special:** Balanced damage with shield focus
- **Best Against:** Shield-heavy enemies
- **Synergy:** Universal balanced tower
- **Prerequisite:** Tesla Coil + Data research

## 💥 Damage Calculation System

### Step-by-Step Damage Formula
```typescript
function calculateDamage(tower: Tower, enemy: Enemy): number {
  // Step 1: Base damage + elevation bonus
  const elevationBonus = getTile(tower.position).elevation;
  const totalBase = tower.baseDamage + elevationBonus;

  // Step 2: Determine which multiplier to use
  let multiplier = 0;
  if (enemy.currentHpType === "shield") {
    multiplier = tower.multipliers.shield;
  } else if (enemy.currentHpType === "armor") {
    multiplier = tower.multipliers.armor;
  } else {
    multiplier = tower.multipliers.health;
  }

  // Step 3: Apply University global buffs (Research Labs)
  multiplier += getUniversityBonus(enemy.currentHpType);

  // Step 4: Apply Scanner mark bonus
  if (enemy.isMarked) {
    const scannerBonus = getScannerBonus(tower);
    multiplier += scannerBonus; // Adds tower's multipliers
  }

  // Step 5: Calculate raw damage
  let damage = totalBase * multiplier;

  // Step 6: Apply critical hit check
  damage = applyCritical(damage, tower.critChance);

  // Step 7: Return final damage (DoT handled separately)
  return damage;
}
```

### Elevation Bonus
- Each tile has elevation 0-6
- Tower on elevation 2, +2 base damage
- Stacks multiplicatively with multipliers
- Maximum elevation bonus: +6 damage per shot

### Multiplier Stacking
```
Final Multiplier = Base Multiplier
                 + University Bonus (0-3, one per lab)
                 + Scanner Bonus (tower's multipliers)
```

### Critical Hit System
```
Crit Chance 0-50%:    30% hit chance = x2 damage (50% per level)
Crit Chance 51-100%:  30% hit chance = x3 damage
Crit Chance 101-150%: 30% hit chance = x4 damage

Example: 75% Crit Chance
- 50% of time: normal damage
- 25% (75-50) of time: x3 damage
```

## 📊 Experience & Leveling

### XP Gain System
```typescript
function updateTowerXP(tower: Tower, deltaTime: number) {
  const target = tower.currentTarget;
  if (!target) return;

  // XP based on targeting, not damage!
  const xpGain = (0.5 + 1 / (2 * tower.range)) * deltaTime;

  // XP goes into matching pool
  if (target.currentHpType === "health") {
    tower.experience.health += xpGain;
  } else if (target.currentHpType === "armor") {
    tower.experience.armor += xpGain;
  } else {
    tower.experience.shield += xpGain;
  }

  checkForLevelUp(tower);
}
```

### XP Rates by Range
- Short range (1.5): 1.33 XP/sec
- Medium range (5): 0.6 XP/sec
- Long range (20): 0.525 XP/sec

### Level Up Mechanics
```typescript
function checkForLevelUp(tower: Tower) {
  const xpNeeded = tower.level * 100;

  ["health", "armor", "shield"].forEach(type => {
    if (tower.experience[type] >= xpNeeded) {
      tower.experience[type] -= xpNeeded;
      tower.multipliers[type]++;  // +1 to multiplier
      tower.baseDamage++;         // +1 to base damage
      tower.level++;
      showLevelUpEffect(tower);
    }
  });
}
```

### Level Up Benefits
- Multiplier increases by 1 per level
- Base damage increases by 1 per level
- Can level in up to 3 separate categories
- Total max level per tower: theoretically unlimited

## ⚡ Mana System

### Mana Mechanics
```typescript
interface ManaSystem {
  current: number;              // Current mana
  maximum: number;              // Max capacity (default 100)
  regenRate: number;            // per second (default 0.5)
  reserved: number;             // By constant towers
}

function updateMana(deltaTime: number) {
  // Regenerate mana
  manaSystem.current = Math.min(
    manaSystem.maximum,
    manaSystem.current + manaSystem.regenRate * deltaTime
  );

  // Subtract constant costs
  manaSystem.current -= manaSystem.reserved * deltaTime;

  // Deactivate towers if not enough mana
  towers.forEach(tower => {
    if (tower.manaCost > 0) {
      tower.isActive = tower.manaCost <= manaSystem.current;
    }
  });
}
```

### Mana-Based Towers
- **Tesla Coil:** 5 mana/shot
- **Cryo Trap:** 2 mana/second (constant)
- **Flamethrower:** 1 mana/shot
- **Toxin Sprayer:** 1 mana/shot
- **Pulse Cannon:** 2 mana/shot
- **Particle Beam:** 12 mana/shot
- **Vampire Drone:** 12 mana/shot
- **Data Obelisk:** 3 mana/shot

### Mana Upgrades
- **Energy Bank:** +50 max mana, +0.5 regen
- **Power Siphon:** +1 mana/second (when adjacent to crystal)
- **Card Upgrades:** Can grant mana bonuses

## 🎯 Targeting & Priorities

### Priority Types
```typescript
enum Priority {
  PROGRESS,       // Closest to base
  NEAR_DEATH,     // Lowest HP%
  MOST_HEALTH,    // Highest health pool
  MOST_ARMOR,     // Highest armor pool
  MOST_SHIELD,    // Highest shield pool
  LEAST_HEALTH,   // Lowest health pool
  LEAST_ARMOR,    // Lowest armor pool
  LEAST_SHIELD,   // Lowest shield pool
  FASTEST,        // Highest speed
  SLOWEST,        // Lowest speed
  MARKED          // Marked by Scanner
}
```

### Target Selection Algorithm
```typescript
function selectTarget(tower: Tower, enemies: Enemy[]): Enemy | null {
  if (enemies.length === 0) return null;

  const scored = enemies.map(enemy => ({
    enemy,
    score: calculateScore(enemy, tower.priorities[0]) * 1000 +
           calculateScore(enemy, tower.priorities[1]) * 100 +
           calculateScore(enemy, tower.priorities[2]) * 10
  }));

  scored.sort((a, b) => b.score - a.score);
  return scored[0].enemy;
}
```

### Weight Distribution
- Primary priority: ×1000 weight
- Secondary priority: ×100 weight
- Tertiary priority: ×10 weight

## 🔥 Status Effects (DoT)

### Bleed
- **Source:** Nano Shredder
- **Effect:** Stops health regeneration
- **Damage:** % of tower's base damage per second
- **Duration:** 5 seconds
- **Stacking:** Multiple bleeds stack in damage

### Burn
- **Source:** Flamethrower
- **Effect:** Stops armor regeneration
- **Damage:** % of tower's base damage per second
- **Duration:** 5 seconds
- **Stacking:** Multiple burns stack

### Poison
- **Source:** Toxin Sprayer
- **Effect:** Stops shield regeneration
- **Damage:** % of tower's base damage per second
- **Duration:** 5 seconds
- **Stacking:** Multiple poisons stack

### Application & Removal
```typescript
function applyStatusEffect(enemy: Enemy, tower: Tower, type: DotType) {
  const dotPercent = tower.statusEffects[type];
  if (dotPercent === 0) return;

  const baseDamage = tower.baseDamage + getTile(tower.position).elevation;
  const dotDamage = baseDamage * (dotPercent / 100);

  enemy.statusEffects.push({
    type,
    damagePerSecond: dotDamage,
    duration: 5,
    source: tower
  });

  // Lock regen based on DoT type
  if (type === "bleed") enemy.canRegenHealth = false;
  if (type === "burn") enemy.canRegenArmor = false;
  if (type === "poison") enemy.canRegenShield = false;
}
```

## 📈 Tower Progression Paths

### Upgrade Chains
Example for Rail Gun:
1. **UNLOCK_RAILGUN** (card draw) → Unlocks Rail Gun
2. **RAILGUN_HEALTH_1** → +1 Health Multiplier
3. **RAILGUN_HEALTH_2** → +1 Health Multiplier (2 total)
4. **RAILGUN_SLOW** → Apply 30% slow
5. **RAILGUN_CRIT** → +15% Crit Chance

### Recommended Build Orders
- **Health-Focused:** Rail Gun → Shredder → Particle Beam
- **Armor-Focused:** Rocket Pod → Gauss Cannon → Pulse Cannon
- **Shield-Focused:** Tesla Coil → Toxin Sprayer → Particle Beam
- **Balanced:** Rail Gun → Tesla Coil → Scanner
- **Mana-Intensive:** Power Siphon + Energy Bank → Tesla Coil + Particle Beam

## 🔧 Implementation Notes

### Active Towers
- Deactivates when mana insufficient
- Retarget every 0.1 seconds
- Update XP every frame
- Projectiles spawn from tower center

### Inactive Towers
- Still level from kills (if targeting somehow)
- Don't fire
- Don't gain XP from targeting idle enemies
- Visual indicator: desaturated/dimmed

### Edge Cases
- No valid target: Tower remains idle, XP gain = 0
- Enemy dies mid-shot: Damage still applies
- Tower target dies: Re-target next frame
- Mana depleted mid-wave: Tower goes inactive immediately
