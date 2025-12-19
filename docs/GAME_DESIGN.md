# Game Design - Core Mechanics & Game Loop

## 🎮 Game Loop Overview

The core gameplay cycle repeats every wave and consists of 4 phases:

### Phase 1: Build Phase
- **Duration:** Player-controlled (timed countdown shown)
- **Actions Available:**
  - Place towers (costs credits)
  - Upgrade existing towers (costs credits)
  - Build support buildings
  - Set tower targeting priorities
  - Sell/demolish towers
- **Ends When:** Player presses "Next Wave" button or timer expires

### Phase 2: Combat Phase
- **Duration:** Automatic, varies by wave difficulty
- **Actions:**
  - Towers fire automatically at enemies
  - No manual controls available
  - Enemies move along paths
  - Gold is collected from kills
- **Ends When:** All enemies defeated

### Phase 3: Expansion Phase
- **Actions:**
  - Click "Expand" button
  - Choose direction: North, East, South, or West
  - 1-3 new tiles are revealed
  - Paths may extend or branch
  - New map features spawn
- **Frequency:** After every wave (mandatory after wave 1)
- **Returns to:** Build Phase

### Phase 4: Card Draw Phase
- **Frequency:** Every 3 waves (Wave 3, 6, 9, etc.)
  - Can be upgraded to every 1 wave
- **Actions:**
  - View 3 random cards (can be upgraded to 6)
  - Select 1 card to apply permanently
- **Card Types:**
  - Tower Unlocks
  - Tower Upgrades
  - Support Building Unlocks
  - Global Buffs
  - Economy Bonuses
- **Returns to:** Build Phase

## 🌊 Wave System

### Normal Waves (1-14, 16-24, 26-34, 36-44)
- Enemies spawn gradually from portals
- Multiple enemy types mix in the wave
- Difficulty scales with wave number
- Approximately 5 + (wave × 2) enemies per wave

### Boss Waves (15, 25, 35, 45)
- Single boss enemy spawns
- Boss has doubled HP pools
- Boss can instant-kill the base (damage = 999)
- Boss drops guaranteed Card Chest (1-5 extra card draws)
- Boss spawns from the furthest portal

### Wave Difficulty Scaling
```
Enemy Count = 5 + (Wave Number × 2)
Enemy Stats Scale:
  - Health Pools: base × (1 + wave × 0.15)
  - Armor Pools: base × (1 + wave × 0.12)
  - Shield Pools: base × (1 + wave × 0.20)
  - Speed: base × (1 + wave × 0.05)
  - Gold Drop: base × (1 + wave × 0.08)
```

## 💰 Economy System

### Credits (Gold)
- **Earned:** By killing enemies (base 1 credit per enemy, scaling by wave)
- **Spent:** Building towers, upgrading towers, upgrading research
- **Starting Amount:** 100 credits (can be upgraded)
- **Max Towers:** 10 (plus 1 for each upgrade, max 15)

#### Tower Pricing Formula
```
Price = basePrice + (level × priceIncrement)
```

Examples:
- Rail Gun: 10 + (level × 15)
- Rocket Pod: 200 + (level × 75)
- Tesla Coil: 200 + (level × 75)

### Mana/Energy
- **Used By:** Tesla Coil, Cryo Trap, Mana-intensive towers
- **Regeneration:** Passive over time (default 0.5/second)
- **Maximum:** 100 (can be upgraded)
- **Generation:** Via support buildings (Power Siphon, Energy Bank)
- **Management:** Constant costs reduce available energy

#### Mana Cost Types
- **Per Shot:** Deducted when tower fires (Tesla Coil: 5 mana/shot)
- **Per Second:** Constant drain (Cryo Trap: 2 mana/second)

## 🎯 Win & Loss Conditions

### Win Condition
**Survive all 45 waves** by defeating the NEXUS CORE boss

- All 45 waves must be completed
- Base must still have > 0 HP
- Boss must be defeated

### Loss Condition
**Base reaches 0 HP** from enemy damage

- Each enemy that reaches the base deals damage equal to their `damageToBase` value
- Normal enemies: 1 damage
- Boss enemies: 999 damage (instant kill)
- Some special enemies have custom damage values (5, 10, 15, etc.)

### Mid-Run Forfeit
- Player can surrender at any time
- Run ends, XP is calculated and saved
- Run statistics are recorded

## 📊 Resources & Budget

### Starting Resources (Wave 1)
- **Credits:** 100 (+ any permanent upgrades)
- **Mana:** 0-50 (depends on upgrades)
- **Tower Slots:** 10
- **Building Slots:** Unlimited

### Wave-to-Wave Budget
- Kill enemies → Earn gold
- Spend gold on towers/upgrades
- Build support buildings for passive income
- Research labs provide damage buffs
- Data Centers generate gold based on adjacent towers

## 🏗️ Building & Placement Rules

### Tower Placement
- **Terrain:** Only on TERRAIN tiles
- **Adjacency:** No restrictions
- **Stacking:** Not allowed (one building per tile)
- **Cost:** Variable based on tower type and level
- **Limit:** 10 towers (upgradeable to 15)

### Support Building Placement
- **Terrain:** Only on TERRAIN tiles
- **Adjacency Requirements:**
  - Power Siphon: Must be adjacent to Mana Crystal
  - Mainframe: Must be adjacent to Grave
  - Research Lab: Must be adjacent to Occult Shrine
- **Cost:** 100-200 credits depending on type
- **Limit:** Unlimited

### Base Tower
- **Location:** Center of initial map (position 2,2)
- **Function:** Player's health pool
- **Cannot Move:** Fixed position
- **Cannot Destroy:** Indestructible

## 🔄 Resource Flow Example

**Wave 3 Example:**
```
Starting: 150 Credits, 25/100 Mana
Build Phase:
  - Place Rail Gun (10 credits) → 140 credits remaining
  - Upgrade Rail Gun +1 Health (15 credits) → 125 credits
  - Place Tesla Coil (200 credits) → Not enough! Stay at 125 credits

Combat Phase:
  - Tesla Coil active (needs 5 mana/shot)
  - Kill 12 enemies × 1 credit = 12 credits earned
  - Tesla fires 30 times = 150 mana spent (need regen)
  - Mana regenerated: 0.5/sec × ~20 sec wave = 10 mana

Wave End: 137 Credits, ~10/100 Mana

Expansion:
  - Expand North → 3 new tiles
  - New map features: 1 Mana Crystal spawned

Card Draw (Wave 3):
  - Options: [Rocket Pod Unlock, Rail Gun Crit, Energy Bank]
  - Select: Energy Bank
  - Effect: +50 max mana, +0.5 mana regen
```

## 🎪 Difficulty Modes

### Single Defense
- Standard difficulty
- XP Multiplier: 1.0
- Wave scaling: Standard

### Double Defense
- Increased enemy count: ×1.5
- Increased enemy stats: ×1.3
- XP Multiplier: 2.0
- Wave scaling: Accelerated

### Triple Defense
- Increased enemy count: ×2.0
- Increased enemy stats: ×1.6
- XP Multiplier: 3.0
- Wave scaling: Heavily accelerated

## 📈 Progression Curves

### Gold Income Progression
```
Wave 1:    ~12 gold/wave
Wave 10:   ~60 gold/wave
Wave 20:   ~150 gold/wave
Wave 30:   ~280 gold/wave
Wave 45:   ~450+ gold/wave
```

### Tower Cost Progression
```
Level 1 Railgun: 10 credits
Level 10 Railgun: 145 credits (10 + 9×15)
Level 1 Rocket: 200 credits
Level 10 Rocket: 875 credits (200 + 9×75)
```

### Mana Requirements
```
Early Game (Wave 1-10): Low mana towers (Tesla 5, Cryo 2)
Mid Game (Wave 11-25): Medium mana usage (Particle Beam 12)
Late Game (Wave 26-45): High mana drain balanced by generation
```

## 🎮 Key Mechanics Interactions

### Tower Synergies
- **Scanner + Any Tower** = Marked enemies take multiplied damage
- **Bleed + Burn + Poison** = Different regen locks, stack damage effects
- **High DPS + Path Coverage** = Mine Deployer and Cryo Trap scale with paths

### Enemy Counters
- **Health Pools** → Use Rail Gun, Shredder
- **Armor Pools** → Use Rocket Pod, Flamethrower, Gauss Cannon
- **Shield Pools** → Use Tesla Coil, Particle Beam, Obelisk
- **Fast Enemies** → Use Slowing effects, Tesla range

### Economy Interactions
- **More Towers** → More data from Data Centers
- **Research Labs** → Passive damage buffs every wave
- **Support Buildings** → Enable mana towers, unlock economy cards

## 🔧 Balance Targets

### DPS Requirements
- Wave 15 (Boss): ~300-400 total DPS required
- Wave 25 (Boss): ~800-1000 total DPS required
- Wave 35 (Boss): ~1500-2000 total DPS required
- Wave 45 (Final Boss): ~3000-5000 total DPS required

### Income Requirements
- Waves 1-10: Can afford 1-2 towers per wave
- Waves 11-25: Can afford 1-2 tower upgrades per wave
- Waves 26-35: Can afford limited new towers, focus on upgrades
- Waves 36-45: Defensive/maintenance phase with occasional upgrades

### Resource Gates
- **Early Game (1-10):** Limited by gold
- **Mid Game (11-25):** Limited by mana and tower slots
- **Late Game (26-45):** Limited by DPS requirements and map space
