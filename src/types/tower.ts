/**
 * Tower System Types
 */

import { Position } from './core'
import { Enemy } from './enemy'

export enum TowerType {
  // Starter (Always Available)
  RAILGUN = 'railgun',
  ROCKET_POD = 'rocket_pod',
  TESLA_COIL = 'tesla_coil',

  // Mid-Game
  CRYO_TRAP = 'cryo_trap',
  FLAMETHROWER = 'flamethrower',
  TOXIN_SPRAYER = 'toxin_sprayer',
  NANO_SHREDDER = 'nano_shredder',
  MINE_DEPLOYER = 'mine_deployer',
  SCANNER = 'scanner',

  // Advanced
  DRONE_BAY = 'drone_bay',
  PULSE_CANNON = 'pulse_cannon',
  PARTICLE_BEAM = 'particle_beam',
  VAMPIRE_DRONE = 'vampire_drone',
  GAUSS_CANNON = 'gauss_cannon',
  OBELISK = 'obelisk',
}

export enum TargetPriority {
  PROGRESS = 'progress',         // Closest to base
  NEAR_DEATH = 'near_death',     // Lowest HP%
  MOST_HEALTH = 'most_health',   // Highest health pool
  MOST_ARMOR = 'most_armor',     // Highest armor pool
  MOST_SHIELD = 'most_shield',   // Highest shield pool
  LEAST_HEALTH = 'least_health', // Lowest health pool
  LEAST_ARMOR = 'least_armor',   // Lowest armor pool
  LEAST_SHIELD = 'least_shield', // Lowest shield pool
  FASTEST = 'fastest',           // Highest speed
  SLOWEST = 'slowest',           // Lowest speed
  MARKED = 'marked',             // Marked by Scanner
}

export interface Tower {
  id: string
  type: TowerType
  position: Position

  // Base Stats
  baseDamage: number
  multipliers: {
    health: number  // Damage vs Health pools
    armor: number   // Damage vs Armor pools
    shield: number  // Damage vs Shield pools
  }
  range: number     // Tiles
  rpm: number       // Rounds Per Minute
  manaCost: number  // Per shot (0 = no cost)

  // Leveling
  level: number
  experience: {
    health: number
    armor: number
    shield: number
  }

  // Upgrades
  statusEffects: {
    bleed: number   // % as DoT
    burn: number
    poison: number
  }
  critChance: number  // 0-150%
  slowPercent: number // 0-100%

  // Targeting
  priorities: [TargetPriority, TargetPriority, TargetPriority]
  currentTarget: Enemy | null

  // State
  lastShotTime: number
  isActive: boolean
}

export interface TowerDefinition {
  type: TowerType
  name: string
  description: string

  // Base Stats
  baseDamage: number
  multipliers: {
    health: number
    armor: number
    shield: number
  }
  range: number
  rpm: number
  manaCost: number

  // Cost
  baseCost: number
  costIncrement: number

  // Special Properties
  aoeRadius?: number
  travelTime?: number  // Projectiles per 5 tiles
  specialMechanic?: string
}
