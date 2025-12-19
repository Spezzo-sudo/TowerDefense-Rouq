# Enemy System - Complete Reference

## 👾 Enemy Architecture

### Core Enemy Interface
```typescript
interface Enemy {
  id: string;
  type: EnemyType;

  // HP System (3-Layer)
  healthPool: number;
  armorPool: number;
  shieldPool: number;
  currentHp: number;
  maxHp: number;
  currentHpType: "shield" | "armor" | "health";

  // Movement
  path: Path;
  pathProgress: number;      // 0 = start, 1 = base
  speed: number;             // Tiles per second
  position: { x: number; y: number };

  // Regeneration
  canRegenHealth: boolean;
  canRegenArmor: boolean;
  canRegenShield: boolean;
  regenRate: {
    health: number;
    armor: number;
    shield: number;
  };

  // Effects
  statusEffects: StatusEffect[];
  slowPercent: number;       // 0-100%
  isMarked: boolean;

  // Abilities
  abilities: EnemyAbility[];

  // Rewards
  goldDrop: number;
  damageToBase: number;      // 1 for normal, 999 for boss
}

interface StatusEffect {
  type: "bleed" | "burn" | "poison";
  damagePerSecond: number;
  duration: number;
  source: Tower;
}
```

## 🌊 Enemy Phases & Progression

The game features 4 distinct phases with different enemy types:

### Phase 1: Waves 1-15 (Foundation Phase)
**Theme:** Basic cybernetic threats

**Available Enemy Types:**
1. Scout Drone (Wave 1)
2. Assault Bot (Wave 4)
3. Speed Runner (Wave 5)
4. Shield Carrier (Wave 8)
5. Heavy Mech (Wave 10)
6. Elite Scout Pack (Boss, Wave 15)

**Characteristics:**
- Single path only
- Basic abilities (sprint, regen)
- No group-specific mechanics
- Escalating stats
- Boss appears at Wave 15

### Phase 2: Waves 16-25 (Anomaly Phase)
**Theme:** Supernatural/temporal corruption

**Three Groups - Only ONE per run:**

#### Group A: HAUNTED
- Ghost Drone (Wave 16)
  - Teleports forward on death
  - Balanced HP pools
- Phantom Carrier (Wave 18)
  - Spawns 3 scouts when destroyed
  - High health pool

#### Group B: UNDEAD
- Zombie Bot (Wave 16)
  - Strong health regeneration
  - Health-heavy (80/60/0)
- Vampire Mech (Wave 20)
  - Heals nearby allies
  - Balanced pools

#### Group C: EPHEMERAL
- Phase Shifter (Wave 16)
  - Blinks randomly forward
  - Shield-heavy (40/20/80)
- Swarm Spawner (added later)
  - Spawns continuous weak enemies
  - Shield-heavy

**Boss:** Corrupted Titan (Wave 25)
- 200 health, 150 armor, 200 shield
- Spawns minions, buffs nearby
- Deals 10 damage per hit

### Phase 3: Waves 26-35 (Evolution Phase)
**Theme:** Advanced hybrid threats

**Available Enemy Types:**
1. Elite Assault Unit (Wave 26)
   - Fast, tanky, regenerates
2. Swarm Spawner (Wave 28)
   - Spawns weak enemies while moving
3. Shielded Behemoth (Wave 30)
   - Massive shields, buffs ally shields
4. Teleporter (Wave 32)
   - Jumps 25% of path forward
5. Quantum Leviathan (Boss, Wave 35)
   - Teleports randomly
   - Spawns elite adds
   - Damage aura

### Phase 4: Waves 36-45 (Apex Phase)
**Theme:** Ultimate threats

**Available Enemy Types:**
1. Apex Predator (Wave 36)
   - Fast, spawns adds, buffs speed
2. Nano-Regenerator (Wave 38)
   - Regenerates all HP types
   - Heals nearby allies
3. NEXUS CORE (Boss, Wave 45)
   - 500/500/1000 HP
   - Instant-kill damage (999)
   - Spawns all enemy types
   - Ultimate threat

## 📋 Detailed Enemy Types

### Phase 1 Enemies

#### Scout Drone
- **Wave Introduced:** 1
- **HP:** 10 health, 0 armor, 0 shield
- **Speed:** 3 tiles/second
- **Gold Drop:** 1
- **Abilities:** None
- **Strategy:** Ignore, they die quickly
- **Weakness:** Any tower
- **Strength:** Very fast

#### Assault Bot
- **Wave Introduced:** 4
- **HP:** 50 health, 30 armor, 0 shield
- **Speed:** 1.5 tiles/second
- **Gold Drop:** 4
- **Abilities:** None
- **Strategy:** Use Rocket Pod or armor-focused towers
- **Weakness:** Armor damage
- **Strength:** Tanky, moderately fast

#### Speed Runner
- **Wave Introduced:** 5
- **HP:** 20 health, 0 armor, 10 shield
- **Speed:** 6 tiles/second (very fast!)
- **Gold Drop:** 5
- **Abilities:** Sprint (speed ×1.5)
- **Strategy:** Use slowing effects or high-range towers
- **Weakness:** Slowing effects
- **Strength:** Extremely fast, hard to hit

#### Shield Carrier
- **Wave Introduced:** 8
- **HP:** 30 health, 0 armor, 80 shield
- **Speed:** 2 tiles/second
- **Gold Drop:** 8
- **Abilities:** Shield Regen (shields regenerate)
- **Strategy:** Use Tesla Coil or shield-focused towers
- **Weakness:** Shield damage
- **Strength:** Regenerates shields

#### Heavy Mech
- **Wave Introduced:** 10
- **HP:** 40 health, 100 armor, 20 shield
- **Speed:** 1 tile/second
- **Gold Drop:** 10
- **Abilities:** Armor Regen (armor regenerates)
- **Strategy:** Use multiple damage types to break through
- **Weakness:** Combined fire
- **Strength:** Extremely tanky armor pool

#### Elite Scout Pack (Boss - Wave 15)
- **Wave:** 15 (Boss wave)
- **HP:** 100 health, 50 armor, 50 shield
- **Speed:** 2 tiles/second
- **Gold Drop:** 50
- **Damage to Base:** 1
- **Abilities:** None
- **Strategy:** Balanced damage against all types
- **First Major Threat:** Introduces balanced HP pools

### Phase 2 Enemies

#### Group A: HAUNTED

##### Ghost Drone
- **Wave Introduced:** 16
- **HP:** 30 health, 30 armor, 30 shield
- **Speed:** 3 tiles/second
- **Gold Drop:** 16
- **Abilities:** Teleport on Death (+20% path progress)
- **Strategy:** Focus fire to prevent multiple spawns
- **Weakness:** Multi-target weapons
- **Strength:** Can bypass defenses via teleport

##### Phantom Carrier
- **Wave Introduced:** 18
- **HP:** 60 health, 40 armor, 60 shield
- **Speed:** 2 tiles/second
- **Gold Drop:** 18
- **Abilities:** Spawn Scouts on Death (3 units)
- **Strategy:** Kill carefully to avoid wave generation
- **Weakness:** Crowd control
- **Strength:** Creates additional waves

#### Group B: UNDEAD

##### Zombie Bot
- **Wave Introduced:** 16
- **HP:** 80 health, 60 armor, 0 shield
- **Speed:** 1.5 tiles/second
- **Gold Drop:** 16
- **Abilities:** Strong Health Regen (+5 HP/sec)
- **Strategy:** Use high sustained damage
- **Weakness:** Bleed to stop regen, high DPS
- **Strength:** Excellent health sustain

##### Vampire Mech
- **Wave Introduced:** 20
- **HP:** 50 health, 50 armor, 50 shield
- **Speed:** 2 tiles/second
- **Gold Drop:** 20
- **Abilities:** Lifesteal Aura (heals nearby allies 1%/sec)
- **Strategy:** Isolate or use aoe to break aura
- **Weakness:** Area damage
- **Strength:** Supports other units

#### Group C: EPHEMERAL

##### Phase Shifter
- **Wave Introduced:** 16
- **HP:** 40 health, 20 armor, 80 shield
- **Speed:** 4 tiles/second (fastest!)
- **Gold Drop:** 16
- **Abilities:** Blink (random teleport 10-30% forward, 5sec cooldown)
- **Strategy:** Use slow or predictive towers
- **Weakness:** Slowing effects
- **Strength:** Evasive and very fast

### Phase 3 Enemies

#### Elite Assault Unit
- **Wave Introduced:** 26
- **HP:** 100 health, 120 armor, 80 shield
- **Speed:** 2.5 tiles/second
- **Gold Drop:** 26
- **Abilities:** Armor Regen + Sprint Burst
- **Strategy:** High damage output required
- **Weakness:** Multiple damage types
- **Strength:** Regenerating armor + fast

#### Swarm Spawner
- **Wave Introduced:** 28
- **HP:** 80 health, 60 armor, 100 shield
- **Speed:** 1 tile/second
- **Gold Drop:** 28
- **Abilities:** Spawn Continuous (spawns weak enemies periodically)
- **Strategy:** Eliminate quickly to prevent spam
- **Weakness:** Focused fire
- **Strength:** Creates additional units

#### Shielded Behemoth
- **Wave Introduced:** 30
- **HP:** 150 health, 100 armor, 300 shield
- **Speed:** 1 tile/second
- **Gold Drop:** 30
- **Abilities:** Shield Regen Fast + Buff Shields Nearby
- **Strategy:** Use shield damage before it reaches base
- **Weakness:** Shield damage
- **Strength:** Massive shields, supports allies

#### Teleporter
- **Wave Introduced:** 32
- **HP:** 60 health, 40 armor, 60 shield
- **Speed:** 3 tiles/second
- **Gold Drop:** 32
- **Abilities:** Teleport Forward 25% (on spawn)
- **Strategy:** Account for skipped path
- **Weakness:** Early detection
- **Strength:** Bypasses 25% of map

### Phase 4 Enemies

#### Apex Predator
- **Wave Introduced:** 36
- **HP:** 200 health, 180 armor, 200 shield
- **Speed:** 3 tiles/second
- **Gold Drop:** 36
- **Abilities:** Sprint + Buff Speed Nearby + Spawn on Death
- **Strategy:** High DPS tower focus
- **Weakness:** Slow effects
- **Strength:** Fast, spawns adds

#### Nano-Regenerator
- **Wave Introduced:** 38
- **HP:** 250 health, 200 armor, 250 shield
- **Speed:** 2 tiles/second
- **Gold Drop:** 38
- **Abilities:** Regen All Types Fast + Heal Nearby
- **Strategy:** Prevent grouping, use DoT to lock regen
- **Weakness:** Damage-over-time effects
- **Strength:** Regenerates and heals allies

#### NEXUS CORE (Final Boss)
- **Wave:** 45
- **HP:** 500 health, 500 armor, 1000 shield
- **Speed:** 2 tiles/second
- **Gold Drop:** 500
- **Damage to Base:** 999 (instant kill)
- **Abilities:**
  - Teleport Random (random jumps)
  - Spawn All Enemy Types (summons adds)
  - Damage Aura Strong (damages nearby towers)
  - Buff All Nearby Massive (massive multiplier buff)
  - Shield Regen Ultra (extreme shield regen)
- **Strategy:** Extreme preparation required
  - 3000-5000 total DPS
  - Multiple tower types
  - Crowd control and shutdown effects
- **Victory Condition:** Survive all 45 waves by defeating boss

## 🎯 Enemy Abilities Detailed

### Always-Active Abilities

#### Sprint
- **Effect:** Permanent speed ×1.5
- **Source:** Speed Runner, Apex Predator
- **Impact:** Very hard to slow below normal

#### Armor Regen
- **Effect:** Armor pools regenerate
- **Regen Rate:** ~5-10/second (stops with Burn status)
- **Source:** Heavy Mech, Elite Assault, Zombie Bot
- **Counter:** Flamethrower + Burn

#### Shield Regen
- **Effect:** Shield pools regenerate
- **Regen Rate:** ~5-10/second (stops with Poison status)
- **Source:** Shield Carrier, Shielded Behemoth
- **Counter:** Toxin Sprayer + Poison

#### Health Regen
- **Effect:** Health pools regenerate
- **Regen Rate:** Strong regeneration (stops with Bleed status)
- **Source:** Zombie Bot, Nano-Regenerator
- **Counter:** Nano Shredder + Bleed

#### Lifesteal Aura
- **Effect:** Heals nearby allies 1%/second of their missing HP
- **Range:** 3-4 tiles
- **Source:** Vampire Mech, Nano-Regenerator
- **Counter:** Isolate or use AoE to break formation

### Event-Based Abilities

#### Teleport on Death
- **Trigger:** When enemy dies
- **Effect:** Spawns new unit 20% further on path
- **Source:** Ghost Drone
- **Impact:** Dead enemy reappears ahead

#### Spawn Scouts on Death
- **Trigger:** When enemy dies
- **Effect:** Spawns 3 Scout Drones at death location
- **Source:** Phantom Carrier
- **Impact:** 1 enemy becomes 3

#### Blink
- **Trigger:** Random, 5-second cooldown
- **Effect:** Teleports 10-30% forward randomly
- **Source:** Phase Shifter
- **Impact:** Unpredictable movement

#### Teleport Forward 25%
- **Trigger:** On spawn
- **Effect:** Immediately jumps 25% of path forward
- **Source:** Teleporter
- **Impact:** Skips 25% of map

### Spawning Abilities

#### Spawn Continuous
- **Trigger:** While moving (every X seconds)
- **Effect:** Spawns weak Scout Drones periodically
- **Source:** Swarm Spawner
- **Impact:** Wave inflation

#### Spawn Minions
- **Trigger:** Interval (every 10 seconds)
- **Effect:** Spawns 2 Scout Drones nearby
- **Source:** Corrupted Titan
- **Impact:** Additional threats

#### Spawn All Enemy Types
- **Trigger:** On spawn
- **Effect:** Summons variety of elite adds
- **Source:** NEXUS CORE
- **Impact:** Multiple threats

### Buff Abilities

#### Buff Nearby (Generic)
- **Effect:** Nearby allies gain 20% damage reduction
- **Range:** 4 tiles
- **Source:** Corrupted Titan
- **Impact:** Defensive bonus to group

#### Buff Speed Nearby
- **Effect:** Nearby allies gain 30% speed boost
- **Range:** 4 tiles
- **Source:** Apex Predator
- **Impact:** Group moves faster

#### Buff Shields Nearby
- **Effect:** Nearby allies gain shield regeneration boost
- **Range:** 4 tiles
- **Source:** Shielded Behemoth
- **Impact:** Group sustains better

#### Buff All Nearby Massive
- **Effect:** All multipliers +50%, speed +30%, regen +100%
- **Range:** 8 tiles (huge!)
- **Source:** NEXUS CORE
- **Impact:** Nearby units become threats

### Damage Aura

#### Damage Aura
- **Effect:** Nearby towers take 1 damage/second
- **Range:** 3 tiles
- **Source:** Quantum Leviathan
- **Impact:** Slow tower attrition

#### Damage Aura Strong
- **Effect:** Nearby towers take 5 damage/second
- **Range:** 4 tiles
- **Source:** NEXUS CORE
- **Impact:** Rapid tower destruction

## 📊 Wave Generation System

### Normal Wave Structure
```typescript
interface Wave {
  number: number;
  enemies: {
    type: EnemyType;
    count: number;
    spawnDelay: number;  // seconds between individual spawns
  }[];
  isBossWave: boolean;
}

function generateWave(waveNumber: number): Wave {
  const enemyCount = 5 + waveNumber * 2;  // Scales with wave
  const types = getAvailableEnemyTypes(waveNumber);

  // Mix different enemy types proportionally
  return {
    number: waveNumber,
    enemies: distributEnemies(types, enemyCount),
    isBossWave: [15, 25, 35, 45].includes(waveNumber)
  };
}
```

### Scaling Formula
```
Enemy Count per Wave = 5 + (Wave Number × 2)

Health Scaling = Base × (1 + Wave × 0.15)
Armor Scaling = Base × (1 + Wave × 0.12)
Shield Scaling = Base × (1 + Wave × 0.20)
Speed Scaling = Base × (1 + Wave × 0.05)
Gold Drop = Base × (1 + Wave × 0.08)
```

### Boss Wave Formula
```
Boss Wave = [15, 25, 35, 45]
Boss HP = 2 × Normal Enemy HP for that type
Boss Speed = Normal Speed
Boss Gold = 10× Normal
Boss Damage = Special (instant-kill or high)
```

### Spawn Timing
- Enemies spawn from portals progressively
- Spawn delay: 0.5-1.5 seconds between individual units
- Multiple portals spawn enemies simultaneously
- All enemies spawn before wave is considered "started"

## 🏥 Enemy Death & Drops

### Death Conditions
1. **Health Pool Depleted:** HP drops to 0
2. **Reached Base:** Enemy despawned, base takes damage
3. **Ability Triggered Death:** Spawn abilities create new units

### Gold Drops
- **On Kill:** Gold = enemy.goldDrop × wave multiplier
- **Wave 1-10:** Base gold (1, 4, 5, 8, 10, etc.)
- **Wave 20:** Gold ×1.6
- **Wave 30:** Gold ×2.4
- **Wave 45:** Gold ×3.6

### Special Drops
- **Boss Waves:** Card Chest (1-5 extra card draws)
- **Normal Enemies:** No special drops
- **Ability Deaths:** Spawned units give normal gold

## 🎮 Enemy Interactions

### Group Synergies
- **Lifesteal Aura + Grouped Units:** Allies heal while grouped
- **Buff Abilities + Clustered Enemies:** Create dangerous packs
- **Regen + Continuous Damage:** Race between regen and DoT
- **Spawn Abilities + Wave Scaling:** Can inflate late waves significantly

### Path Interactions
- **Multiple Paths:** Enemies distribute across portals
- **Path Splits:** Enemies may take different routes
- **Teleport Abilities:** Can bypass path segments
- **Elevation:** Affects tower accuracy (not enemy speed)

### Tower Interactions
- **Scanner Mark:** Marked enemies take bonus damage
- **DoT Status:** Can lock regeneration types
- **Crowd Control:** Slowing effects reduce speed multiplicatively
- **AoE Damage:** More effective on grouped enemies

## 📈 Difficulty Scaling

### Scaling per Difficulty Mode

#### Single Defense (1.0x)
- Standard enemy count and stats
- XP Multiplier: 1.0
- Base difficulty reference

#### Double Defense (1.5x enemies, 1.3x stats)
- Enemy Count: ×1.5
- Health/Armor/Shield: ×1.3
- XP Multiplier: 2.0
- Requires ~30% more DPS

#### Triple Defense (2.0x enemies, 1.6x stats)
- Enemy Count: ×2.0
- Health/Armor/Shield: ×1.6
- XP Multiplier: 3.0
- Requires ~50% more DPS

## 💡 Strategic Counters

### Against Tanks
- **Use:** High-multiplier towers, sustained DPS
- **Best Towers:** Rail Gun, Particle Beam, Gauss Cannon
- **Cards:** Damage upgrades

### Against Fast Units
- **Use:** Slowing effects, high-range towers
- **Best Towers:** Cryo Trap, Tesla Coil
- **Cards:** Speed reduction upgrades

### Against Regeneration
- **Use:** Status effects to lock regen
- **Best Towers:** Shredder (bleed), Flamethrower (burn), Toxin Sprayer (poison)
- **Cards:** DoT enhancement cards

### Against Spawners
- **Use:** Rapid elimination, crowd control
- **Best Towers:** Tesla Coil (multi-target), Rocket Pod (burst)
- **Cards:** Attack speed, damage bonuses

### Against Bosses
- **Use:** Multiple tower types, high sustained DPS
- **Best Towers:** Particle Beam, Drone Bay, Shredder
- **Cards:** Damage-focused upgrades, economy cards for tower building
