# Support Buildings System

## 🏗️ Support Building Architecture

### Core Support Building Interface

```typescript
interface SupportBuilding {
  id: string;
  type: BuildingType;
  position: { x: number; y: number };

  // Requirements
  cost: number;                 // Gold to build
  requiredAdjacent?: MapFeature;   // Feature requirement
  requiredLevel?: number;       // Min wave to build

  // Mechanics
  effect: BuildingEffect;

  // State
  level: number;               // Upgradable (optional)
  isActive: boolean;
}

interface BuildingEffect {
  type: EffectType;
  parameters: any;            // Effect-specific data
}
```

## 🏛️ Support Building Types

### 1. Power Siphon

**Purpose:** Mana generation from Mana Crystals

```typescript
const POWER_SIPHON = {
  name: "Power Siphon",
  cost: 100,
  requiredAdjacent: MapFeature.MANA_CRYSTAL,
  effect: {
    type: "mana_generation",
    amount: 1.0              // 1 mana per second
  },
  description: "Adjacent to Mana Crystal: Generates 1 energy/sec",
  availability: Wave 1,
  limitations: "Must be placed on TERRAIN tile adjacent to Mana Crystal"
};
```

**Mechanics:**
- Must be placed on TERRAIN adjacent to Mana Crystal
- If not adjacent, provides no mana
- Can build multiple siphons per crystal
- Mana generation is passive (always active)

```typescript
function updatePowerSiphon(siphon: SupportBuilding, deltaTime: number) {
  // Check if adjacent to active Mana Crystal
  const adjacentFeature = getAdjacentMapFeature(siphon.position);

  if (adjacentFeature?.type === MapFeature.MANA_CRYSTAL) {
    manaSystem.current += 1.0 * deltaTime;
  }
  // Otherwise does nothing
}
```

**Strategic Use:**
- Best early game for enabling mana towers
- Placement around crystals enables Tesla/Cryo builds
- Scales with number of crystals available

### 2. Energy Bank

**Purpose:** Passive mana increase and regeneration

```typescript
const ENERGY_BANK = {
  name: "Energy Bank",
  cost: 125,
  requiredAdjacent: null,      // No requirement
  effect: {
    type: "mana_max_and_generation",
    maxIncrease: 50,
    regenIncrease: 0.5
  },
  description: "Increases max energy (+50) and provides passive generation (+0.5/sec)",
  availability: Wave 3,
  limitations: "None"
};
```

**Mechanics:**
- Can be placed anywhere on TERRAIN
- Permanent buff to mana system
- Stacks with multiple buildings
- No feature requirement

```typescript
function applyEnergyBank(building: SupportBuilding) {
  manaSystem.maximum += 50;
  manaSystem.regenRate += 0.5;
}
```

**Strategic Use:**
- Early game mana investment
- Essential for building up to mana towers
- Multiple banks create exponential mana advantage
- Better ROI than Power Siphon if no crystals available

### 3. Data Center

**Purpose:** Gold generation from adjacent towers

```typescript
const DATA_CENTER = {
  name: "Data Center",
  cost: 0,                     // Spawns automatically!
  requiredAdjacent: null,
  effect: {
    type: "gold_generation",
    formula: "wave * adjacentTowerCount"
  },
  description: "Generates credits at wave start based on adjacent towers",
  availability: Wave 1,
  specialNote: "Spawns automatically near base, not placed manually"
};
```

**Mechanics:**
- Spawns automatically next to base tower at start
- Generates gold = current wave × number of adjacent towers
- No cost to build (automatic)
- Stacks with multiple data centers if they somehow exist

```typescript
function updateDataCenter(building: SupportBuilding) {
  const adjacentTowers = getAdjacentTowers(building.position);
  const goldGenerated = currentWave * adjacentTowers.length;
  gold += goldGenerated;

  logEvent(`Data Center generated ${goldGenerated} gold`);
}
```

**Strategic Use:**
- Passive income scales with tower density
- Build more towers → more gold from center
- Encourages tower clustering around base
- Best early game gold source

### 4. Mainframe

**Purpose:** Convert mana to gold

```typescript
const MAINFRAME = {
  name: "Mainframe",
  cost: 150,
  requiredAdjacent: MapFeature.GRAVE,
  effect: {
    type: "gold_generation_active",
    costPerSecond: -1,         // Costs 1 mana/sec
    creditsPerSecond: 5        // Generates 5 gold/sec
  },
  description: "Adjacent to Grave: Converts energy to credits (1 energy → 5 credits/sec)",
  availability: Wave 8,
  efficiency: "5:1 mana to gold ratio"
};
```

**Mechanics:**
- Must be adjacent to GRAVE feature
- Costs 1 mana per second (constant drain)
- Generates 5 gold per second if mana available
- If mana insufficient, generator stops

```typescript
function updateMainframe(building: SupportBuilding, deltaTime: number) {
  // Check adjacency
  const adjacentFeature = getAdjacentMapFeature(building.position);
  if (adjacentFeature?.type !== MapFeature.GRAVE) {
    return;  // No effect
  }

  // Check mana available
  if (manaSystem.current >= 1.0) {
    // Drain mana, generate gold
    manaSystem.current -= 1.0;
    gold += 5.0 * deltaTime;
  }
}
```

**Strategic Use:**
- Mid-late game economy backup
- Convert excess mana to gold if needed
- Requires grave placement (limits to 1-5 per map)
- Alternative to traditional gold generation

### 5. Repair Station

**Purpose:** Increase base health and repair damage

```typescript
const REPAIR_STATION = {
  name: "Repair Station",
  cost: 100,
  requiredAdjacent: MapFeature.IRON_VEIN,
  effect: {
    type: "base_health",
    maxHealthIncrease: 1,
    repairChance: 0.1           // 10% chance per wave
  },
  description: "Adjacent to Iron Vein: +1 Max HP, 10% chance to repair 1 damage",
  availability: Wave 5,
  limitations: "Must be adjacent to Iron Vein"
};
```

**Mechanics:**
- Increases base max HP permanently by 1
- Each wave, 10% chance to repair 1 damage (roll per station)
- Can build multiple for cumulative max HP gain
- Base health restored passively each wave

```typescript
function updateRepairStation(building: SupportBuilding) {
  // Check adjacency
  const adjacentFeature = getAdjacentMapFeature(building.position);
  if (adjacentFeature?.type !== MapFeature.IRON_VEIN) {
    return;  // No effect
  }

  // Repair roll
  if (Math.random() < 0.1) {
    baseHealth = Math.min(baseMaxHealth, baseHealth + 1);
    logEvent("Repair Station repaired 1 damage");
  }
}
```

**Strategic Use:**
- Scaling base health with stations
- Passive healing supplement to defense
- Low cost (100 gold) for high value (safety)
- Best early investment for survival

### 6. Research Lab (University System)

**Purpose:** Provide damage buffs to all towers

```typescript
const RESEARCH_LAB = {
  name: "Research Lab",
  cost: 200,
  requiredAdjacent: MapFeature.OCCULT_SHRINE,
  effect: {
    type: "research_buff",
    researchLevels: {
      health: 0,               // 0-100%
      armor: 0,
      shield: 0
    },
    activeBuffs: {
      health: false,           // true if buff active this wave
      armor: false,
      shield: false
    }
  },
  description: "Adjacent to Occult Shrine: Provides randomwave-to-wave damage buffs",
  availability: Wave 20,
  rollChance: "25% per type per wave"
};
```

**Mechanics:**
- Must be adjacent to OCCULT_SHRINE
- Rolls every wave for each damage type
- 25% base chance per type (increased by research level)
- If buff activates, all towers get +1 multiplier to that type

```typescript
function rollResearchBuffs() {
  researchLabs.forEach(lab => {
    ["health", "armor", "shield"].forEach(type => {
      const roll = Math.random() * 100;
      const chance = lab.researchLevels[type];

      if (roll < chance) {
        lab.activeBuffs[type] = true;
        logEvent(`Research Lab: ${type} buff activated!`);
      } else {
        lab.activeBuffs[type] = false;
      }
    });
  });
}

function getUniversityBonus(hpType: string): number {
  let bonus = 0;
  researchLabs.forEach(lab => {
    if (lab.activeBuffs[hpType]) {
      bonus += 1;  // +1 multiplier per active lab
    }
  });
  return bonus;
}
```

**Research Lab Upgrades:**
- Players can spend gold to increase research level
- Each lab can reach 100% (guaranteed buff)
- Cost scales: 50 → 100 → 200 → etc.

```typescript
function upgradeResearch(lab: ResearchLab, type: string, amount: number = 5) {
  const cost = 50 * (Math.floor(lab.researchLevels[type] / 25) + 1);

  if (gold >= cost) {
    gold -= cost;
    lab.researchLevels[type] = Math.min(100, lab.researchLevels[type] + amount);
    logEvent(`Research upgraded to ${lab.researchLevels[type]}%`);
  }
}
```

**Strategic Use:**
- Late game multiplicative damage boost
- Multiple labs create high buff probability
- Expensive but very powerful
- Synergizes with specific tower builds

## 📊 Building Economics

### Cost Comparison

```
Power Siphon: 100 gold
  └─ Generates: 1 mana/sec
  └─ Payoff: Enables mana tower builds
  └─ ROI: Very high (enables new strategies)

Energy Bank: 125 gold
  └─ Effect: +50 mana, +0.5 mana/sec
  └─ Payoff: Mana independence
  └─ ROI: High (+50 mana potential)

Data Center: 0 gold (automatic)
  └─ Effect: wave × adjacent towers
  └─ Payoff: Passive income scaling
  └─ ROI: Infinite (free!)

Mainframe: 150 gold
  └─ Effect: 5 gold/sec (costs 1 mana/sec)
  └─ Payoff: Mana → gold conversion
  └─ ROI: Depends on mana availability

Repair Station: 100 gold
  └─ Effect: +1 max HP, 10% heal/wave
  └─ Payoff: Survival improvement
  └─ ROI: High (defense is critical)

Research Lab: 200 gold
  └─ Effect: +1 tower multiplier (probabilistic)
  └─ Payoff: Massive damage boost
  └─ ROI: Very high late game
```

### Placement Strategy

```
Early Game (Waves 1-10):
  Priority: Data Center (automatic) → Repair Station
  Focus: Base survival + economy
  Mana: Not yet needed

Mid Game (Waves 11-25):
  Priority: Power Siphon + Energy Bank
  Focus: Enable mana towers
  Secondary: Repair Station upgrades

Late Game (Waves 26-45):
  Priority: Research Lab + Mainframe
  Focus: Maximum damage output
  Secondary: Additional Repair Stations
  Bonus: Mainframe if mana accumulates
```

## 🎯 Building Synergies

### Mana Economy Build
```
Power Siphon (100g) × 3 near crystals
  + Energy Bank (125g)
  + Mana towers (Tesla, Cryo, Beam)
  = Strong mana economy

Synergy: Siphons generate base mana,
Energy Banks scale it up, towers use it effectively
```

### Damage Scaling Build
```
Research Lab (200g) × 2 near shrines
  + Repair Station (100g) × 3 for survival
  + Upgraded research levels
  = Multiplicative damage increase

Synergy: Labs provide +1 to +2 multiplier per type,
Repair Stations keep base alive to use them
```

### Gold Generation Build
```
Data Center (automatic)
  + Mainframe (150g) near grave
  + Multiple towers (scaled income)
  = Economic powerhouse

Synergy: Data Center scales with towers,
Mainframe converts excess mana to gold
```

## 🔄 Building Interactions

### Feature Dependency Tree
```
Power Siphon ─→ Mana Crystal
              └─ Enables: Tesla Coil, Cryo Trap, etc.

Repair Station ─→ Iron Vein
                └─ Increases: Base Health

Research Lab ─→ Occult Shrine
             └─ Provides: Damage Multipliers

Mainframe ─→ Grave
          └─ Converts: Mana → Gold
```

### Building + Card Synergies
```
Power Siphon + "Enhanced Mana" card
  = Even more mana generation

Energy Bank + "Mana Efficiency" upgrade
  = More cost-effective towers

Research Lab + "Quality over Quantity" card
  = Higher crit chance boost from buffs

Repair Station + "Starting Capital" card
  = Earlier defense setup
```

## 📈 Scaling Patterns

### Wave-to-Wave Performance

```typescript
function getOptimalBuildingCount(wave: number): BuildingConfig {
  const config = {
    repairStations: Math.min(5, Math.floor(wave / 5)),
    energyBanks: Math.min(3, Math.floor(wave / 8)),
    powerSiphons: Math.min(6, Math.floor(wave / 3)),
    researchLabs: Math.min(4, Math.floor(wave / 10))
  };
  return config;
}

// Example:
Wave 5:   1-2 Repair Stations, 0 Energy Banks
Wave 10:  2 Repair Stations, 1 Energy Bank, 2-3 Siphons
Wave 20:  4 Repair Stations, 2 Energy Banks, 6 Siphons, 2 Labs
Wave 30:  6 Repair Stations, 3 Energy Banks, 6 Siphons, 3 Labs
```

## 🔧 Implementation Notes

### Placement Validation
- Check tile is TERRAIN
- Check no building already exists
- Check cost available
- Verify feature requirement if needed

### Building Updates
- Update every game frame
- Check adjacency each frame (in case destroyed)
- Apply effects only if valid
- Log building actions for debugging

### Edge Cases
- Feature removed: Building becomes inactive
- Building sold: Feature still available
- Mana insufficient for Mainframe: Stops draining
- Lab with no shrine: Provides no buffs
- Multiple buildings on one feature: All benefit

## 💾 Building Persistence

### Per-Run Persistence
- Buildings placed during run persist
- Effects apply until run ends
- Cannot be moved (only demolished/rebuilt)
- Research levels persist wave-to-wave

### Global Data
- Building costs are constants
- Research lab research levels saved
- Feature spawning rules are permanent
- Building types available from Wave 1

## 🎮 Building UI

### Building Placement UI
```
[SELECT BUILDING]
├─ Power Siphon (100g) - Adjacent to crystal
├─ Energy Bank (125g) - Anywhere
├─ Repair Station (100g) - Adjacent to vein
├─ Mainframe (150g) - Adjacent to grave
├─ Research Lab (200g) - Adjacent to shrine
└─ [Cancel]

[SELECT PLACEMENT]
├─ Highlight valid tiles
├─ Show range/effect
└─ [Place] or [Cancel]
```

### Research Lab UI
```
RESEARCH LAB - Name
━━━━━━━━━━━━━━━━━━━
Health:   ░░░░░░░░░░░░ 45%  [+ Upgrade 50g]
Armor:    ░░░░░░░░    32%  [+ Upgrade 75g]
Shield:   ░░░░░░░░░░░░░░░░ 62%  [+ Upgrade 100g]
━━━━━━━━━━━━━━━━━━━
This Wave Active:
  ✓ Health Buff (+1 multiplier)
  ✗ Armor Buff
  ✓ Shield Buff (+1 multiplier)
```
