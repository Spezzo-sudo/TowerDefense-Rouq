/**
 * Tower Definitions - Complete reference from TOWERS.md
 */

import { TowerType, TowerDefinition } from '../types/tower'

export const TOWER_DEFINITIONS: Record<TowerType, TowerDefinition> = {
  // ===== STARTER TOWERS (Always Available) =====
  [TowerType.RAILGUN]: {
    type: TowerType.RAILGUN,
    name: 'Rail Gun',
    description: 'Single-target precision weapon. Best against health pools.',
    baseDamage: 10,
    multipliers: { health: 10, armor: 5, shield: 5 },
    range: 5,
    rpm: 20,
    manaCost: 0,
    baseCost: 10,
    costIncrement: 15,
  },

  [TowerType.ROCKET_POD]: {
    type: TowerType.ROCKET_POD,
    name: 'Rocket Pod',
    description: 'AoE explosions with travel time. Best against armor pools and clustered enemies.',
    baseDamage: 20,
    multipliers: { health: 10, armor: 15, shield: 5 },
    range: 10,
    rpm: 10,
    manaCost: 0,
    baseCost: 200,
    costIncrement: 75,
    aoeRadius: 2,
    travelTime: 0.5, // per 5 tiles
  },

  [TowerType.TESLA_COIL]: {
    type: TowerType.TESLA_COIL,
    name: 'Tesla Coil',
    description: 'Hits ALL enemies in range simultaneously. Best against shield pools and dense waves.',
    baseDamage: 10,
    multipliers: { health: 6, armor: 3, shield: 10 },
    range: 1.5,
    rpm: 30,
    manaCost: 5,
    baseCost: 200,
    costIncrement: 75,
  },

  // ===== UNLOCKABLE TOWERS (Mid-Game) =====
  [TowerType.CRYO_TRAP]: {
    type: TowerType.CRYO_TRAP,
    name: 'Cryo Trap',
    description: 'Slows enemies by 50%. RPM scales with path coverage.',
    baseDamage: 6,
    multipliers: { health: 10, armor: 5, shield: 5 },
    range: 2,
    rpm: 180,
    manaCost: 2, // per second (constant)
    baseCost: 250,
    costIncrement: 100,
    specialMechanic: 'Slows enemies by 50%, +10% RPM per path tile in range',
  },

  [TowerType.FLAMETHROWER]: {
    type: TowerType.FLAMETHROWER,
    name: 'Flamethrower',
    description: 'Line AoE that applies Burn status, stopping armor regeneration.',
    baseDamage: 5,
    multipliers: { health: 6, armor: 9, shield: 3 },
    range: 4,
    rpm: 60,
    manaCost: 1,
    baseCost: 300,
    costIncrement: 75,
  },

  [TowerType.TOXIN_SPRAYER]: {
    type: TowerType.TOXIN_SPRAYER,
    name: 'Toxin Sprayer',
    description: 'Line AoE that applies Poison status, stopping shield regeneration.',
    baseDamage: 5,
    multipliers: { health: 6, armor: 3, shield: 9 },
    range: 4,
    rpm: 60,
    manaCost: 1,
    baseCost: 300,
    costIncrement: 75,
  },

  [TowerType.NANO_SHREDDER]: {
    type: TowerType.NANO_SHREDDER,
    name: 'Nano Shredder',
    description: 'Sends discs along path. Applies Bleed, stopping health regeneration.',
    baseDamage: 10,
    multipliers: { health: 20, armor: 10, shield: 10 },
    range: 5,
    rpm: 5,
    manaCost: 0,
    baseCost: 500,
    costIncrement: 100,
  },

  [TowerType.MINE_DEPLOYER]: {
    type: TowerType.MINE_DEPLOYER,
    name: 'Mine Deployer',
    description: 'Deploys mines randomly in range. RPM scales with path coverage.',
    baseDamage: 20,
    multipliers: { health: 10, armor: 15, shield: 5 },
    range: 2,
    rpm: 5,
    manaCost: 0,
    baseCost: 500,
    costIncrement: 100,
    aoeRadius: 1.5,
    specialMechanic: '+15% RPM per path tile in range',
  },

  [TowerType.SCANNER]: {
    type: TowerType.SCANNER,
    name: 'Target Scanner',
    description: 'Marks enemies. ALL other towers deal +1 multiplier to marked targets.',
    baseDamage: 1,
    multipliers: { health: 2, armor: 1, shield: 3 },
    range: 8,
    rpm: 0,
    manaCost: 0,
    baseCost: 500,
    costIncrement: 100,
    specialMechanic: 'Utility tower - buffs all other towers',
  },

  // ===== ADVANCED TOWERS (Late-Game) =====
  [TowerType.DRONE_BAY]: {
    type: TowerType.DRONE_BAY,
    name: 'Drone Bay',
    description: 'Sends drones at extreme range with slow but reliable navigation.',
    baseDamage: 20,
    multipliers: { health: 20, armor: 10, shield: 10 },
    range: 30,
    rpm: 700,
    manaCost: 0,
    baseCost: 1000,
    costIncrement: 250,
  },

  [TowerType.PULSE_CANNON]: {
    type: TowerType.PULSE_CANNON,
    name: 'Pulse Cannon',
    description: 'High RPM burst damage focused on armor pools.',
    baseDamage: 8,
    multipliers: { health: 5, armor: 10, shield: 2 },
    range: 5,
    rpm: 360,
    manaCost: 2,
    baseCost: 1000,
    costIncrement: 250,
  },

  [TowerType.PARTICLE_BEAM]: {
    type: TowerType.PARTICLE_BEAM,
    name: 'Particle Beam',
    description: 'Sniper tower with extreme single-target damage and high shield multiplier.',
    baseDamage: 50,
    multipliers: { health: 15, armor: 10, shield: 20 },
    range: 20,
    rpm: 12,
    manaCost: 12,
    baseCost: 1000,
    costIncrement: 250,
  },

  [TowerType.VAMPIRE_DRONE]: {
    type: TowerType.VAMPIRE_DRONE,
    name: 'Vampire Drone',
    description: 'Leeches health, returns 20% as healing to base or mana.',
    baseDamage: 12,
    multipliers: { health: 10, armor: 5, shield: 5 },
    range: 9,
    rpm: 6,
    manaCost: 12,
    baseCost: 750,
    costIncrement: 150,
    specialMechanic: '20% lifesteal',
  },

  [TowerType.GAUSS_CANNON]: {
    type: TowerType.GAUSS_CANNON,
    name: 'Gauss Cannon',
    description: 'Heavy kinetic damage with pure armor scaling.',
    baseDamage: 20,
    multipliers: { health: 10, armor: 20, shield: 5 },
    range: 6,
    rpm: 20,
    manaCost: 0,
    baseCost: 750,
    costIncrement: 150,
  },

  [TowerType.OBELISK]: {
    type: TowerType.OBELISK,
    name: 'Data Obelisk',
    description: 'Balanced damage with shield focus. Universal balanced tower.',
    baseDamage: 15,
    multipliers: { health: 10, armor: 5, shield: 15 },
    range: 7,
    rpm: 12,
    manaCost: 3,
    baseCost: 750,
    costIncrement: 150,
  },
}

// Tower unlock prerequisites (for card system)
export const TOWER_PREREQUISITES: Partial<Record<TowerType, TowerType[]>> = {
  [TowerType.CRYO_TRAP]: [TowerType.RAILGUN],
  [TowerType.ROCKET_POD]: [TowerType.RAILGUN],
  [TowerType.TESLA_COIL]: [TowerType.RAILGUN],
  [TowerType.FLAMETHROWER]: [TowerType.ROCKET_POD],
  [TowerType.TOXIN_SPRAYER]: [TowerType.TESLA_COIL],
  [TowerType.NANO_SHREDDER]: [TowerType.RAILGUN, TowerType.CRYO_TRAP],
  [TowerType.MINE_DEPLOYER]: [TowerType.ROCKET_POD, TowerType.CRYO_TRAP],
  [TowerType.SCANNER]: [TowerType.RAILGUN],
  [TowerType.DRONE_BAY]: [TowerType.ROCKET_POD],
  [TowerType.PULSE_CANNON]: [TowerType.TESLA_COIL, TowerType.FLAMETHROWER],
  [TowerType.PARTICLE_BEAM]: [TowerType.TESLA_COIL],
  [TowerType.VAMPIRE_DRONE]: [TowerType.DRONE_BAY],
  [TowerType.GAUSS_CANNON]: [TowerType.ROCKET_POD],
  [TowerType.OBELISK]: [TowerType.TESLA_COIL],
}

// Calculate tower cost at a given level
export function calculateTowerCost(type: TowerType, level: number): number {
  const def = TOWER_DEFINITIONS[type]
  return def.baseCost + level * def.costIncrement
}

// Get tower XP requirement for level up
export function getTowerXPRequirement(level: number): number {
  return level * 100
}
