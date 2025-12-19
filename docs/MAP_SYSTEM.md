# Map System - Generation & Mechanics

## 🗺️ Map Architecture

### Grid System

```typescript
interface Tile {
  x: number;                    // Grid X position
  y: number;                    // Grid Y position
  type: TileType;               // What type of tile
  elevation: number;            // 0-6 (height level)
  feature?: MapFeature;         // Special feature on tile
  occupied?: Building;          // Tower or support building
}

enum TileType {
  PATH = "path",                // Enemies walk here
  TERRAIN = "terrain",          // Towers can be built
  BLOCKED = "blocked",          // Impassable
  BASE = "base"                 // Player's base tower
}

enum MapFeature {
  MANA_CRYSTAL = "mana_crystal",    // Powers siphons
  HOUSE = "house",                  // Aesthetic/lore
  IRON_VEIN = "iron_vein",          // Powers repair stations
  GRAVE = "grave",                  // Powers mainframes
  OCCULT_SHRINE = "occult_shrine"   // Powers research labs
}

interface Path {
  id: string;
  tiles: Tile[];                // Tiles on this path
  portals: Portal[];            // Enemy spawn points
}

interface Portal {
  x: number;
  y: number;
  path: Path;                   // Which path this spawns from
  wave: number;                 // When it becomes active
}
```

## 🎲 Procedural Map Generation

### Initial Setup

```typescript
const INITIAL_MAP = {
  size: { width: 5, height: 5 },    // Starts small (5×5)
  baseTower: { x: 2, y: 2 },        // Center of map

  paths: [
    {
      id: "main_path_0",
      direction: "north",
      length: 3,                      // 3 tiles long
      tiles: [
        { x: 2, y: 2, type: BASE },
        { x: 2, y: 1, type: PATH },
        { x: 2, y: 0, type: PATH }
      ]
    }
  ],

  features: {
    houses: 2-4,                      // Around base
    manaPoints: 1-2                   // Scattered
  }
};
```

### Map Expansion Mechanics

```typescript
function expandMap(direction: Direction) {
  // 1. Add 1-3 new tiles in chosen direction
  const newTileCount = random(1, 3);
  const newTiles = generateTiles(direction, newTileCount);

  // 2. Extend existing path or create new one
  if (canPathContinue(direction)) {
    extendPath(currentPath, newTiles);
  } else {
    // Path ends, spawn portal
    spawnPortal(currentPath.end);
  }

  // 3. Path may split (chance increases over time)
  if (shouldPathSplit(currentWave)) {
    createBranch(currentPath, newTiles);
  }

  // 4. Spawn map features
  spawnMapFeatures(newTiles, currentWave);

  // 5. Update map boundaries
  expandMapBoundaries();
}
```

### Expansion Formula

```
Expansion happens AFTER each wave
New tiles added: 1-3 random
Direction: Player chooses (N/E/S/W)
Path length: ~3-5 tiles typically
Portal creation: When path ends

Map growth:
Wave 1:  5×5   → expansion → ~7×7
Wave 5:  ~8×9  → expansion → ~10×11
Wave 10: ~12×13 → expansion → ~14×15
Wave 20: ~20×21 → expansion → ~22×23
Wave 45: ~45×46+ (huge map!)
```

### Path Splitting Mechanics

```typescript
function calculateSplitChance(wave: number): number {
  if (wave < 11) return 0;           // No splits until Wave 11
  if (wave < 21) return 0.20;        // 20% chance (Waves 11-20)
  if (wave < 31) return 0.30;        // 30% chance (Waves 21-30)
  return 0.40;                       // 40% chance (Wave 31+)
}

// Maximum paths increases with progression
function getMaxPaths(wave: number): number {
  if (wave < 11) return 1;
  if (wave < 21) return 2;
  if (wave < 31) return 3;
  return 4;
}
```

#### Path Evolution Timeline
```
Wave 1-10:   Single path only
             └─ Main path: Base → ... → Portal A

Wave 11-20:  Up to 2 paths (20% chance split)
             ├─ Main path: Base → ... → Portal A
             └─ Branch:            → ... → Portal B (20% chance)

Wave 21-30:  Up to 3 paths (30% chance split)
             ├─ Main path: ... → Portal A
             ├─ Branch 1:  ... → Portal B
             └─ Branch 2:  ... → Portal C (30% more likely)

Wave 31+:    Up to 4 paths (40% chance split)
             ├─ Path A: ... → Portal A
             ├─ Path B: ... → Portal B
             ├─ Path C: ... → Portal C
             └─ Path D: ... → Portal D
```

## 🌿 Map Features & Spawning

### Feature Definitions

#### Mana Crystal
- **Purpose:** Powers Power Siphon building
- **Elevation:** Random (0-3)
- **Placement:** Never on PATH tiles, prefer TERRAIN
- **Rarity:** 1-6 per map

#### House
- **Purpose:** Aesthetic, possible future lore
- **Elevation:** Varies (0-4)
- **Placement:** Scattered around map
- **Rarity:** 2-10 per map

#### Iron Vein
- **Purpose:** Powers Repair Station building
- **Elevation:** Usually high (2-5)
- **Placement:** Sparse, valuable locations
- **Rarity:** 1-8 per map

#### Grave
- **Purpose:** Powers Mainframe building
- **Elevation:** Varies (1-4)
- **Placement:** Scattered, mysterious locations
- **Rarity:** 1-5 per map

#### Occult Shrine
- **Purpose:** Powers Research Lab building
- **Elevation:** Usually high (3-6)
- **Placement:** Rare, special locations
- **Rarity:** 1-3 per map (appears late game)

### Feature Spawn Rules

```typescript
const SPAWN_RULES = {
  // Waves 1-15 (Early)
  EARLY: {
    mana_crystal: {
      spawnChance: 0.15,         // 15% per new tile
      maxTotal: 6
    },
    house: {
      spawnChance: 0.20,
      maxTotal: 10
    },
    iron_vein: {
      spawnChance: 0.10,
      maxTotal: 8
    },
    grave: {
      spawnChance: 0,            // None in early
      maxTotal: 0
    },
    occult_shrine: {
      spawnChance: 0,
      maxTotal: 0
    }
  },

  // Waves 16-25 (Mid)
  MID: {
    mana_crystal: {
      spawnChance: 0.15,
      maxTotal: 8              // Increased from 6
    },
    house: {
      spawnChance: 0.15,       // Decreased
      maxTotal: 12
    },
    iron_vein: {
      spawnChance: 0.10,
      maxTotal: 8
    },
    grave: {
      spawnChance: 0.15,       // NEW in mid
      maxTotal: 12
    },
    occult_shrine: {
      spawnChance: 0,
      maxTotal: 0
    }
  },

  // Waves 26-35 (Late)
  LATE: {
    mana_crystal: {
      spawnChance: 0.15,
      maxTotal: 10
    },
    house: {
      spawnChance: 0.10,
      maxTotal: 12
    },
    iron_vein: {
      spawnChance: 0.12,
      maxTotal: 10
    },
    grave: {
      spawnChance: 0.20,
      maxTotal: 15
    },
    occult_shrine: {
      spawnChance: 1.0,        // GUARANTEED! 100%
      maxTotal: 10
    }
  },

  // Waves 36-45 (End Game)
  ENDGAME: {
    // All spawn at higher rates
    occult_shrine: {
      spawnChance: 1.0,
      maxTotal: 15             // More shrines
    }
  }
};

function spawnMapFeatures(newTiles: Tile[], wave: number) {
  const rules = getSpawnRules(wave);

  newTiles.forEach(tile => {
    // Skip PATH tiles and BLOCKED tiles
    if (tile.type === PATH || tile.type === BLOCKED) return;

    // Try each feature type
    Object.entries(rules).forEach(([featureType, rule]) => {
      // Check if under max
      const count = countFeatureOnMap(featureType);
      if (count >= rule.maxTotal) return;

      // Roll for spawn chance
      if (Math.random() < rule.spawnChance) {
        tile.feature = featureType;
      }
    });
  });
}
```

### Feature Phase Distribution

```
Phase 1 (Waves 1-15):
  - Heavy Mana Crystals (needed for early power)
  - Houses (aesthetic)
  - Iron Veins (rare)
  - NO graves or shrines

Phase 2 (Waves 16-25):
  - Graves appear! (Mainframe enabler)
  - More diverse features
  - Still mana-heavy

Phase 3 (Waves 26-35):
  - Occult Shrines GUARANTEED (Research labs)
  - Peak feature density
  - Reward late map expansion

Phase 4 (Waves 36-45):
  - Maximum feature spawning
  - All types available
  - Endgame map customization
```

## 🛤️ Path System

### Path Structure

```typescript
interface Path {
  id: string;
  direction: Direction;          // N/E/S/W original direction
  tiles: Tile[];                 // Ordered tiles from start

  // Path properties
  length: number;
  start: { x: number, y: number };
  end: { x: number, y: number };

  // Portal management
  portals: Portal[];
  isComplete: boolean;           // True if portal spawned
}

interface Portal {
  id: string;
  position: { x: number, y: number };
  path: Path;
  spawnWave: number;             // When enemies spawn from here

  // Spawn management
  enemies: Enemy[];              // Enemies from this portal
  spawnRate: number;             // Enemies per second
}
```

### Path Mechanics

#### Path Continuation
```typescript
function extendPath(path: Path, newTiles: Tile[]): boolean {
  // Add new tiles to path
  const lastTile = path.tiles[path.tiles.length - 1];

  newTiles.forEach(tile => {
    // Check if adjacent
    if (distance(lastTile, tile) !== 1) return false;

    // Change to PATH
    tile.type = PATH;

    // Add to path
    path.tiles.push(tile);
  });

  return true;
}
```

#### Path Splitting
```typescript
function createBranch(sourcePath: Path, newTiles: Tile[]): Path {
  // Split at end of source path
  const splitPoint = sourcePath.tiles[sourcePath.tiles.length - 1];

  // Create new branch
  const branch = {
    id: `path_${pathCounter++}`,
    direction: randomDirection(),
    tiles: [splitPoint, ...newTiles],
    length: newTiles.length + 1,
    portals: [],
    isComplete: false
  };

  // Register branch
  allPaths.push(branch);

  return branch;
}
```

### Portal Spawning

```typescript
function spawnPortal(pathEnd: Tile) {
  const portal = {
    id: `portal_${portalCounter++}`,
    position: pathEnd,
    path: path,
    spawnWave: currentWave,
    enemies: [],
    spawnRate: calculateSpawnRate(currentWave)
  };

  // Mark path as complete
  path.isComplete = true;
  path.portals.push(portal);

  // Enemies will spawn from this portal
}

function calculateSpawnRate(wave: number): number {
  // Earlier portals spawn slower to spread out waves
  return 1.0 + (wave / 50);  // Scales up slightly over time
}
```

## 📍 Tile Elevation System

### Elevation Mechanics

```typescript
interface Tile {
  elevation: number;            // 0-6 (affects visuals, tower damage)
}

// Elevation provides damage bonus
function getTowerDamageBonus(tower: Tower): number {
  const tile = getTile(tower.position);
  return tile.elevation;        // Directly adds to base damage
}

// Example:
Tower on elevation 0: 10 base damage
Tower on elevation 3: 13 base damage (+3 from height)
Tower on elevation 6: 16 base damage (+6 from height)
```

### Elevation Generation

```typescript
function generateElevation(tile: Tile, wave: number) {
  // Base elevation: random 0-2
  let elevation = random(0, 2);

  // Mana crystals prefer higher elevation
  if (tile.feature === MANA_CRYSTAL) {
    elevation = random(2, 4);
  }

  // Occult shrines very high
  if (tile.feature === OCCULT_SHRINE) {
    elevation = random(4, 6);
  }

  // Iron veins medium-high
  if (tile.feature === IRON_VEIN) {
    elevation = random(3, 5);
  }

  // Neighbor influence: elevation varies smoothly
  const neighbors = getAdjacentTiles(tile);
  const avgNeighbor = neighbors.reduce((a, t) => a + t.elevation, 0) / neighbors.length;
  elevation = Math.max(0, Math.min(6, avgNeighbor + random(-1, 1)));

  tile.elevation = elevation;
}
```

## 🎯 Strategic Map Considerations

### Path Planning
- **Single Path (Waves 1-10):** Towers protect one clear route
  - Focus on tower density along path
  - Early slowing towers are crucial

- **Dual Paths (Waves 11-20):** Enemies split between 2 routes
  - Need towers on both paths
  - Decision: Focus resources or split?

- **Triple+ Paths (Waves 21+):** Enemies spread across 3-4 routes
  - Must cover all paths
  - Tower slots become limiting
  - Support buildings help manage resources

### Feature Positioning
- **Mana Crystals:** Enable Power Siphons for mana economy
  - Place Siphons adjacent to crystals
  - More crystals = more mana towers possible

- **Occult Shrines:** Essential for late game
  - Adjacent Research Labs provide damage buffs
  - Limited spawning makes them valuable

- **Graves:** Mainframe enablers
  - Convert mana to gold if needed
  - Good backup economy

### Elevation Strategy
- **High Elevation Towers:** Better baseline damage
  - Prefer elevated positions for long-range towers
  - Tower range isn't blocked by elevation

- **Low Elevation Paths:** Easier for slowing towers
  - Not mechanically different, but visually indicates height

## 🔄 Dynamic Map Evolution

### Wave-to-Wave Evolution
```
Wave 1: 5×5 map, single path
          ├─ Expand north → path grows
          └─ Portal spawns

Wave 5: ~8×8 map, single path
          ├─ Expand east → path branches
          └─ Portal A spawns

Wave 10: ~10×10 map, dual paths
          ├─ Expand south → path extends
          └─ Portal B spawns

Wave 15: ~12×12 map, expanding
          ├─ Boss wave (waves refresh)
          └─ Card draw

Wave 20: ~15×15 map, triple paths possible
          ├─ Multiple portals active
          └─ Complex pathing

Wave 45: ~45×46+ map, 4 potential paths
          ├─ Huge sprawling map
          └─ NEXUS CORE boss spawns
```

### Player Expansion Strategy
Players can influence map growth:
1. **Focused Expansion:** Keep expanding one direction
   - Single very long path
   - But limited options

2. **Balanced Expansion:** Expand different directions
   - Multiple moderate paths
   - More flexibility

3. **Blocked Expansion:** Avoid bad expansions
   - But map shrinks options
   - Risk of poor portal placement

## 📊 Map Statistics

### Typical Endgame Map
```
After completing Wave 45:

Map Size:        ~45×46 tiles (2070 tiles total)
  Terrain:       ~1000 tiles (48%)
  Paths:         ~300 tiles (14%)
  Blocked:       ~770 tiles (37%)

Map Features:
  Mana Crystals: 6-10
  Houses:        8-12
  Iron Veins:    6-10
  Graves:        10-15
  Occult Shrines: 8-12

Paths:
  Active Paths:  3-4
  Total Portals: 3-4
  Path Length:   ~20-30 tiles each

Buildings Possible:
  Towers:        10-15 slots
  Support:       6-12 buildings max
```

## 🔧 Implementation Notes

### Map Persistence
- Map generated once per run, doesn't reset
- Features and paths permanent
- Map grows monotonically (never shrinks)
- Final map saved with run statistics

### Rendering Optimization
- Isometric view requires tile-by-tile culling
- Only render visible tiles + viewport buffer
- Elevation uses vertex offset, not separate geometry
- Path tiles use distinct shader for glow effect

### Collision Detection
- Towers placed only on TERRAIN
- Enemies walk PATH tiles only
- Buildings don't block towers
- Portals are waypoints, not solid

### Edge Cases
- Map boundary wrapping: Not implemented (map expands infinitely)
- Path crossing: Allowed, doesn't create intersection zones
- Feature on PATH tile: Prevented by tile type
- Portal in corner: Allowed, enemies reach base correctly
