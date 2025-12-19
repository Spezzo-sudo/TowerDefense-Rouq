# Card System - Unlocks & Upgrades

## 🃏 Card Architecture

### Core Card Interface
```typescript
enum CardRarity {
  COMMON = "common",              // White
  UNCOMMON = "uncommon",          // Green
  RARE = "rare",                  // Blue
  EPIC = "epic",                  // Purple
  LEGENDARY = "legendary"         // Gold
}

enum CardType {
  TOWER_UNLOCK = "tower_unlock",           // Unlocks a tower type
  TOWER_UPGRADE = "tower_upgrade",         // Upgrades specific tower
  BUILDING_UNLOCK = "building_unlock",     // Unlocks building
  GLOBAL_BUFF = "global_buff",             // Permanent stat buffs
  ECONOMY = "economy"                      // Gold/Mana bonuses
}

interface Card {
  id: string;
  name: string;
  type: CardType;
  rarity: CardRarity;

  // Requirements
  prerequisiteCards?: string[];    // Other cards that must be unlocked
  minWave?: number;               // Can only draw after this wave
  cost?: number;                  // XP cost if purchased from shop

  // Effect
  effect: CardEffect;

  // Presentation
  description: string;
  flavor: string;                 // Lore text
  icon: string;                   // Icon filename
}

interface CardEffect {
  target: "specific_tower" | "all_towers" | "tower_type" | "global";
  targetId?: string;              // Tower type if specific
  modification: {
    baseDamage?: number;
    multiplierHealth?: number;
    multiplierArmor?: number;
    multiplierShield?: number;
    range?: number;
    rpm?: number;
    critChance?: number;
    statusBleed?: number;
    statusBurn?: number;
    statusPoison?: number;
    slow?: number;
  } | "unlock";                   // Or "unlock" for unlock cards
}
```

## 🎴 Card Database

### Tower Unlock Cards (Yellow)

#### Railgun Unlock
- **ID:** unlock_railgun
- **Type:** Tower Unlock
- **Rarity:** Common
- **Prerequisites:** None
- **Min Wave:** 1
- **Effect:** Unlocks RAILGUN tower for building
- **Description:** "Unlock Rail Gun tower"

#### Cryo Trap Unlock
- **ID:** unlock_cryo
- **Type:** Tower Unlock
- **Rarity:** Uncommon
- **Prerequisites:** unlock_railgun
- **Min Wave:** 1
- **Effect:** Unlocks CRYO_TRAP tower for building
- **Description:** "Unlock Cryo Trap tower - Slows enemies"
- **Notes:** Always available after Rail Gun

#### Rocket Pod Unlock
- **ID:** unlock_rocket
- **Type:** Tower Unlock
- **Rarity:** Uncommon
- **Prerequisites:** unlock_railgun
- **Min Wave:** 3
- **Effect:** Unlocks ROCKET_POD tower for building
- **Description:** "Unlock Rocket Pod - AoE explosions"

#### Tesla Coil Unlock
- **ID:** unlock_tesla
- **Type:** Tower Unlock
- **Rarity:** Uncommon
- **Prerequisites:** unlock_railgun
- **Min Wave:** 4
- **Effect:** Unlocks TESLA_COIL tower for building
- **Description:** "Unlock Tesla Coil - Hits all in range"

#### Flamethrower Unlock
- **ID:** unlock_flame
- **Type:** Tower Unlock
- **Rarity:** Uncommon
- **Prerequisites:** unlock_rocket
- **Min Wave:** 6
- **Effect:** Unlocks FLAMETHROWER tower for building
- **Description:** "Unlock Flamethrower - Applies Burn status"

#### Toxin Sprayer Unlock
- **ID:** unlock_toxin
- **Type:** Tower Unlock
- **Rarity:** Uncommon
- **Prerequisites:** unlock_tesla
- **Min Wave:** 6
- **Effect:** Unlocks TOXIN_SPRAYER tower for building
- **Description:** "Unlock Toxin Sprayer - Applies Poison status"

#### Nano Shredder Unlock
- **ID:** unlock_shredder
- **Type:** Tower Unlock
- **Rarity:** Rare
- **Prerequisites:** unlock_railgun, unlock_cryo
- **Min Wave:** 8
- **Effect:** Unlocks SHREDDER tower for building
- **Description:** "Unlock Nano Shredder - Applies Bleed status"

#### Mine Deployer Unlock
- **ID:** unlock_mine
- **Type:** Tower Unlock
- **Rarity:** Rare
- **Prerequisites:** unlock_rocket, unlock_cryo
- **Min Wave:** 9
- **Effect:** Unlocks MINE_DEPLOYER tower for building
- **Description:** "Unlock Mine Deployer - Deploys mines randomly"

#### Target Scanner Unlock
- **ID:** unlock_scanner
- **Type:** Tower Unlock
- **Rarity:** Rare
- **Prerequisites:** unlock_railgun
- **Min Wave:** 10
- **Effect:** Unlocks SCANNER tower for building
- **Description:** "Unlock Scanner - Marks targets for bonus damage"

#### Drone Bay Unlock
- **ID:** unlock_drone
- **Type:** Tower Unlock
- **Rarity:** Epic
- **Prerequisites:** unlock_rocket
- **Min Wave:** 15
- **Effect:** Unlocks DRONE_BAY tower for building
- **Description:** "Unlock Drone Bay - Extreme range drones"

#### Pulse Cannon Unlock
- **ID:** unlock_pulse
- **Type:** Tower Unlock
- **Rarity:** Epic
- **Prerequisites:** unlock_tesla, unlock_flame
- **Min Wave:** 16
- **Effect:** Unlocks PULSE_CANNON tower for building
- **Description:** "Unlock Pulse Cannon - Rapid-fire burst"

#### Particle Beam Unlock
- **ID:** unlock_beam
- **Type:** Tower Unlock
- **Rarity:** Epic
- **Prerequisites:** unlock_tesla
- **Min Wave:** 18
- **Effect:** Unlocks PARTICLE_BEAM tower for building
- **Description:** "Unlock Particle Beam - Sniper tower"

#### Vampire Drone Unlock
- **ID:** unlock_vampire
- **Type:** Tower Unlock
- **Rarity:** Epic
- **Prerequisites:** unlock_drone
- **Min Wave:** 20
- **Effect:** Unlocks VAMPIRE_DRONE tower for building
- **Description:** "Unlock Vampire Drone - Leeches health"

#### Gauss Cannon Unlock
- **ID:** unlock_gauss
- **Type:** Tower Unlock
- **Rarity:** Rare
- **Prerequisites:** unlock_rocket
- **Min Wave:** 12
- **Effect:** Unlocks GAUSS_CANNON tower for building
- **Description:** "Unlock Gauss Cannon - Heavy kinetic damage"

#### Data Obelisk Unlock
- **ID:** unlock_obelisk
- **Type:** Tower Unlock
- **Rarity:** Rare
- **Prerequisites:** unlock_tesla
- **Min Wave:** 14
- **Effect:** Unlocks OBELISK tower for building
- **Description:** "Unlock Data Obelisk - Balanced tower"

### Tower Upgrade Cards (Blue)

#### Rail Gun Upgrades
- **railgun_health_1:**
  - Type: Tower Upgrade
  - Rarity: Common
  - Prerequisites: unlock_railgun
  - Effect: +1 Health Multiplier
  - Description: "Rail Gun: Health Damage I"

- **railgun_health_2:**
  - Type: Tower Upgrade
  - Rarity: Uncommon
  - Prerequisites: railgun_health_1
  - Effect: +1 Health Multiplier
  - Description: "Rail Gun: Health Damage II"

- **railgun_armor_1:**
  - Type: Tower Upgrade
  - Rarity: Common
  - Prerequisites: unlock_railgun
  - Effect: +1 Armor Multiplier
  - Description: "Rail Gun: Armor Piercing I"

- **railgun_crit:**
  - Type: Tower Upgrade
  - Rarity: Uncommon
  - Prerequisites: unlock_railgun
  - Effect: +15% Crit Chance
  - Description: "Rail Gun: Critical Strikes"

- **railgun_slow:**
  - Type: Tower Upgrade
  - Rarity: Rare
  - Prerequisites: railgun_health_1
  - Effect: +30% Slow chance
  - Description: "Rail Gun: Cryo Rounds"

#### Rocket Pod Upgrades
- **rocket_aoe_1:**
  - Type: Tower Upgrade
  - Rarity: Common
  - Prerequisites: unlock_rocket
  - Effect: +1 AoE Radius
  - Description: "Rocket Pod: Larger Explosions I"

- **rocket_damage_1:**
  - Type: Tower Upgrade
  - Rarity: Uncommon
  - Prerequisites: unlock_rocket
  - Effect: +5 Base Damage
  - Description: "Rocket Pod: Blast Force I"

- **rocket_armor_2:**
  - Type: Tower Upgrade
  - Rarity: Uncommon
  - Prerequisites: unlock_rocket
  - Effect: +2 Armor Multiplier
  - Description: "Rocket Pod: Armor Penetration"

#### Tesla Coil Upgrades
- **tesla_range_1:**
  - Type: Tower Upgrade
  - Rarity: Uncommon
  - Prerequisites: unlock_tesla
  - Effect: +0.5 Range
  - Description: "Tesla Coil: Extended Range I"

- **tesla_shield_1:**
  - Type: Tower Upgrade
  - Rarity: Common
  - Prerequisites: unlock_tesla
  - Effect: +2 Shield Multiplier
  - Description: "Tesla Coil: Shield Surge I"

- **tesla_efficiency:**
  - Type: Tower Upgrade
  - Rarity: Rare
  - Prerequisites: unlock_tesla
  - Effect: -2 Mana Cost per shot
  - Description: "Tesla Coil: Power Efficiency"

#### Cryo Trap Upgrades
- **cryo_slow_increase:**
  - Type: Tower Upgrade
  - Rarity: Uncommon
  - Prerequisites: unlock_cryo
  - Effect: +20% Slow
  - Description: "Cryo Trap: Deeper Freeze"

- **cryo_efficiency:**
  - Type: Tower Upgrade
  - Rarity: Rare
  - Prerequisites: unlock_cryo
  - Effect: -1 Mana Cost per second
  - Description: "Cryo Trap: Efficient Cooling"

#### Status Effect Upgrades
- **bleed_increase:**
  - Type: Tower Upgrade
  - Rarity: Uncommon
  - Prerequisites: unlock_shredder
  - Effect: +10% Bleed DoT
  - Description: "Bleed: Deeper Wounds"

- **burn_increase:**
  - Type: Tower Upgrade
  - Rarity: Uncommon
  - Prerequisites: unlock_flame
  - Effect: +10% Burn DoT
  - Description: "Burn: Hotter Flames"

- **poison_increase:**
  - Type: Tower Upgrade
  - Rarity: Uncommon
  - Prerequisites: unlock_toxin
  - Effect: +10% Poison DoT
  - Description: "Poison: Stronger Toxin"

### Global Buff Cards (Purple)

#### Card Draw System
- **card_draw_frequency:**
  - Type: Global Buff
  - Rarity: Legendary
  - Cost: 500 XP (to unlock permanently)
  - Effect: Draw cards every 1 wave instead of 3
  - Description: "Enhanced Analysis - Draw upgrades more frequently"
  - Note: Very powerful, game-changing

- **card_draw_amount:**
  - Type: Global Buff
  - Rarity: Legendary
  - Prerequisites: card_draw_frequency
  - Cost: 500 XP (to unlock permanently)
  - Effect: Draw 6 cards instead of 3 (choose 1)
  - Description: "Data Overflow - More upgrade options"
  - Note: Stacks with frequency upgrade

#### Crit System
- **quality_over_quantity:**
  - Type: Global Buff
  - Rarity: Epic
  - Effect: +15% Crit Chance to all towers
  - Description: "Quality over Quantity"
  - Flavor: "Precision matters more than volume"

- **ultra_crit:**
  - Type: Global Buff
  - Rarity: Epic
  - Prerequisites: quality_over_quantity
  - Effect: +15% Crit Chance to all towers (stacks)
  - Description: "Perfect Synchronization"
  - Note: Can stack multiple times

#### Range & Accuracy
- **tower_range_1:**
  - Type: Global Buff
  - Rarity: Uncommon
  - Effect: +1 Range to all towers
  - Description: "Extended Networks I"

- **tower_range_2:**
  - Type: Global Buff
  - Rarity: Rare
  - Prerequisites: tower_range_1
  - Effect: +1 Range to all towers
  - Description: "Extended Networks II"

#### Mana System
- **mana_max_increase:**
  - Type: Global Buff
  - Rarity: Uncommon
  - Effect: +25 Max Mana
  - Description: "Energy Reserves I"

- **mana_regen_increase:**
  - Type: Global Buff
  - Rarity: Uncommon
  - Effect: +0.5 Mana/second
  - Description: "Efficient Charging I"

### Building Unlock Cards (Yellow)

#### Power Siphon Unlock
- **unlock_siphon:**
  - Type: Building Unlock
  - Rarity: Uncommon
  - Effect: Unlocks Power Siphon building
  - Description: "Unlock Power Siphon - Generates mana from crystals"
  - Requirement: Must be adjacent to Mana Crystal

#### Energy Bank Unlock
- **unlock_energy_bank:**
  - Type: Building Unlock
  - Rarity: Uncommon
  - Effect: Unlocks Energy Bank building
  - Description: "Unlock Energy Bank - Increases mana storage"

#### Research Lab Unlock
- **unlock_research_lab:**
  - Type: Building Unlock
  - Rarity: Rare
  - Effect: Unlocks Research Lab building
  - Description: "Unlock Research Lab - Provides damage buffs"
  - Requirement: Must be adjacent to Occult Shrine

#### Repair Station Unlock
- **unlock_repair:**
  - Type: Building Unlock
  - Rarity: Uncommon
  - Effect: Unlocks Repair Station building
  - Description: "Unlock Repair Station - Repairs base damage"
  - Requirement: Must be adjacent to Iron Vein

### Economy Cards (Green)

#### Bounty System
- **bounty_system_1:**
  - Type: Economy
  - Rarity: Common
  - Effect: +2 Credits per kill
  - Description: "Bounty System I"
  - Stacking: Yes

- **bounty_system_2:**
  - Type: Economy
  - Rarity: Uncommon
  - Prerequisites: bounty_system_1
  - Effect: +4 Credits per kill (total, replaces old)
  - Description: "Bounty System II"

- **bounty_system_3:**
  - Type: Economy
  - Rarity: Rare
  - Prerequisites: bounty_system_2
  - Effect: +6 Credits per kill, +1 damage per Bounty card taken
  - Description: "Bounty System III"
  - Special: Damage scales with bounty level

#### Startup Capital
- **starting_capital_1:**
  - Type: Economy
  - Rarity: Uncommon
  - Effect: Start each run with +500 Credits
  - Description: "Starting Capital I"

- **starting_capital_2:**
  - Type: Economy
  - Rarity: Rare
  - Prerequisites: starting_capital_1
  - Effect: Start each run with +1000 Credits
  - Description: "Starting Capital II"

#### Tower Slots
- **tower_slots_1:**
  - Type: Economy
  - Rarity: Rare
  - Effect: Can build 11 towers (1 extra)
  - Description: "Network Expansion I"

- **tower_slots_2:**
  - Type: Economy
  - Rarity: Epic
  - Prerequisites: tower_slots_1
  - Effect: Can build 12 towers
  - Description: "Network Expansion II"

## 📊 Card Draw System

### Draw Frequency
```typescript
interface CardDrawState {
  drawFrequency: number;        // Every X waves
  cardsPerDraw: number;         // Cards to show
  nextDrawWave: number;         // When next draw occurs
  cardPool: Card[];             // Available cards
}

// Default
DrawFrequency = 3              // Draw every 3 waves (3, 6, 9...)
CardsPerDraw = 3               // Show 3 options, choose 1

// With Upgrades
DrawFrequency = 1              // Draw every wave
CardsPerDraw = 6               // Show 6 options, choose 1
```

### Drawing Logic
```typescript
function drawCards(): Card[] {
  const available = cardPool.filter(card => {
    // Check prerequisites
    if (card.prerequisiteCards) {
      const hasPrereqs = card.prerequisiteCards.every(
        prereq => unlockedCards.includes(prereq)
      );
      if (!hasPrereqs) return false;
    }

    // Check minimum wave
    if (card.minWave && currentWave < card.minWave) {
      return false;
    }

    // Don't re-draw unlocks already obtained
    if (card.type === CardType.TOWER_UNLOCK &&
        unlockedCards.includes(card.id)) {
      return false;
    }

    return true;
  });

  // Weighted random selection by rarity
  const rarityWeights = {
    [CardRarity.COMMON]: 50,
    [CardRarity.UNCOMMON]: 30,
    [CardRarity.RARE]: 15,
    [CardRarity.EPIC]: 4,
    [CardRarity.LEGENDARY]: 1
  };

  const drawn: Card[] = [];
  for (let i = 0; i < drawState.cardsPerDraw; i++) {
    const card = weightedRandom(available, rarityWeights);
    if (card && !drawn.includes(card)) {
      drawn.push(card);
    }
  }

  return drawn;
}
```

### Draw Timing
- **Wave 3:** First draw (always)
- **Every 3 waves:** Default frequency (6, 9, 12, 15...)
- **Every 1 wave:** With "Enhanced Analysis" card
- **Boss Waves:** Draw happens after boss is defeated
- **Card Chest Bonus:** 1-5 extra card draws from boss

## 🎮 Card Application

### Applying Card Effects
```typescript
function applyCard(card: Card) {
  if (card.effect.modification === "unlock") {
    // Unlock a tower type
    unlockTowerType(card.unlocksTower);

    // Add upgrade cards to pool if unlock
    if (card.type === CardType.TOWER_UNLOCK) {
      const upgrades = CARD_DATABASE.filter(c =>
        c.prerequisiteCards?.includes(card.id)
      );
      cardPool.push(...upgrades);
    }
  } else if (card.effect.target === "specific_tower") {
    // Apply to single tower
    const tower = getTowerById(card.effect.targetId);
    applyModification(tower, card.effect.modification);
  } else if (card.effect.target === "tower_type") {
    // Apply to all towers of type
    towers.filter(t => t.type === card.effect.targetId)
      .forEach(t => applyModification(t, card.effect.modification));
  } else if (card.effect.target === "all_towers") {
    // Apply to all towers
    towers.forEach(t => applyModification(t, card.effect.modification));
  } else if (card.effect.target === "global") {
    // Apply global effect
    applyGlobalModification(card.effect.modification);
  }

  // Track unlocked cards
  unlockedCards.push(card.id);
}

function applyModification(tower: Tower, mod: any) {
  if (mod.baseDamage) tower.baseDamage += mod.baseDamage;
  if (mod.multiplierHealth) tower.multipliers.health += mod.multiplierHealth;
  if (mod.multiplierArmor) tower.multipliers.armor += mod.multiplierArmor;
  if (mod.multiplierShield) tower.multipliers.shield += mod.multiplierShield;
  if (mod.range) tower.range += mod.range;
  if (mod.rpm) tower.rpm += mod.rpm;
  if (mod.critChance) tower.critChance += mod.critChance;
  if (mod.statusBleed) tower.statusEffects.bleed += mod.statusBleed;
  if (mod.statusBurn) tower.statusEffects.burn += mod.statusBurn;
  if (mod.statusPoison) tower.statusEffects.poison += mod.statusPoison;
  if (mod.slow) tower.statusEffects.slow = mod.slow;
}
```

## 🔗 Card Dependency Chain

### Path: Health-Focused Build
```
1. unlock_railgun (draw early)
2. railgun_health_1 (draw next)
3. railgun_health_2 (upgrade path)
4. railgun_crit (optional upgrade)
→ Rail Gun becomes high-damage health tower
```

### Path: Mana Tower Economy
```
1. unlock_tesla (early)
2. unlock_cryo (requirement for tesla)
3. tesla_efficiency (reduce mana cost)
4. unlock_energy_bank (building)
5. mana_regen_increase (global buff)
→ Setup mana-intensive towers efficiently
```

### Path: Late Game Arsenal
```
1. unlock_rocket (early)
2. unlock_beam (mid-game, >18 waves)
3. unlock_drone (late, >15 waves)
4. unlock_vampire (very late, >20 waves)
→ Build diverse late-game tower set
```

## 📈 Meta-Progression Integration

### Card Pool Pollution Problem
- As you unlock towers, upgrade cards are added to pool
- Later draws get diluted with many upgrade options
- Solution: Prioritize high-rarity unlocks early
- Result: Unlock all basic towers by Wave 15

### Unlocking New Cards in Meta
- Permanent upgrades can unlock cards in pool
- "Card Draw Frequency" unlocks 2-3 new global cards
- "Card Draw Amount" becomes available after frequency
- Total new cards available: ~30+ after grinding

## 🎯 Strategic Card Selection

### Early Game (Waves 1-10)
**Focus:** Tower Unlocks
- First 3 draws: Unlock Rail Gun, Cryo, Rocket/Tesla
- Establish tower diversity
- Build economy with bounty cards

### Mid Game (Waves 11-25)
**Focus:** Upgrade cards
- Enhance existing towers
- Unlock advanced towers (Drone Bay, Beam, etc.)
- Add support buildings

### Late Game (Waves 26-45)
**Focus:** Efficiency upgrades
- Crit chance cards
- Mana efficiency
- Range extensions
- Final tower unlocks

## 💾 Card Persistence

### Per-Run Unlocks
- Cards drawn in-run: Apply immediately, permanent for run
- Card pool grows as you unlock towers
- Previous run's unlocks don't carry over
- Boss chests give extra draws

### Meta-Progression Unlocks
- Some cards unlock permanently via XP spending
- "Card Draw Frequency" costs 500 XP
- "Card Draw Amount" costs 500 XP
- These persist across runs

### Card Banking
- No "save for later" system
- Must choose immediately
- Forces strategic decision-making
- Creates run variety
