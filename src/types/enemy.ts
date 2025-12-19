/**
 * Enemy System Types
 */

import { Position } from './core'
import { Path } from './map'

export enum EnemyType {
  // Phase 1 (Waves 1-15)
  SCOUT_DRONE = 'scout_drone',
  ASSAULT_BOT = 'assault_bot',
  SPEED_RUNNER = 'speed_runner',
  SHIELD_CARRIER = 'shield_carrier',
  HEAVY_MECH = 'heavy_mech',
  ELITE_SCOUT_PACK = 'elite_scout_pack', // Boss

  // Phase 2 (Waves 16-25) - HAUNTED
  GHOST_DRONE = 'ghost_drone',
  PHANTOM_CARRIER = 'phantom_carrier',

  // Phase 2 - UNDEAD
  ZOMBIE_BOT = 'zombie_bot',
  VAMPIRE_MECH = 'vampire_mech',

  // Phase 2 - EPHEMERAL
  PHASE_SHIFTER = 'phase_shifter',

  // Phase 2 Boss
  CORRUPTED_TITAN = 'corrupted_titan',

  // Phase 3 (Waves 26-35)
  ELITE_ASSAULT_UNIT = 'elite_assault_unit',
  SWARM_SPAWNER = 'swarm_spawner',
  SHIELDED_BEHEMOTH = 'shielded_behemoth',
  TELEPORTER = 'teleporter',
  QUANTUM_LEVIATHAN = 'quantum_leviathan', // Boss

  // Phase 4 (Waves 36-45)
  APEX_PREDATOR = 'apex_predator',
  NANO_REGENERATOR = 'nano_regenerator',
  NEXUS_CORE = 'nexus_core', // Final Boss
}

export type HpType = 'shield' | 'armor' | 'health'

export enum EnemyAbility {
  SPRINT = 'sprint',
  ARMOR_REGEN = 'armor_regen',
  SHIELD_REGEN = 'shield_regen',
  HEALTH_REGEN = 'health_regen',
  LIFESTEAL_AURA = 'lifesteal_aura',
  TELEPORT_ON_DEATH = 'teleport_on_death',
  SPAWN_ON_DEATH = 'spawn_on_death',
  BLINK = 'blink',
  TELEPORT_FORWARD = 'teleport_forward',
  SPAWN_CONTINUOUS = 'spawn_continuous',
  SPAWN_MINIONS = 'spawn_minions',
  BUFF_NEARBY = 'buff_nearby',
  BUFF_SPEED = 'buff_speed',
  BUFF_SHIELDS = 'buff_shields',
  BUFF_ALL = 'buff_all',
  DAMAGE_AURA = 'damage_aura',
  DAMAGE_AURA_STRONG = 'damage_aura_strong',
}

export interface StatusEffect {
  type: 'bleed' | 'burn' | 'poison'
  damagePerSecond: number
  duration: number
  sourceId: string  // Tower ID
}

export interface Enemy {
  id: string
  type: EnemyType

  // HP System (3-Layer)
  healthPool: number
  armorPool: number
  shieldPool: number
  currentHp: number
  maxHp: number
  currentHpType: HpType

  // Movement
  path: Path
  pathProgress: number  // 0 = start, 1 = base
  speed: number         // Tiles per second
  position: Position

  // Regeneration
  canRegenHealth: boolean
  canRegenArmor: boolean
  canRegenShield: boolean
  regenRate: {
    health: number
    armor: number
    shield: number
  }

  // Effects
  statusEffects: StatusEffect[]
  slowPercent: number  // 0-100%
  isMarked: boolean

  // Abilities
  abilities: EnemyAbility[]

  // Rewards
  goldDrop: number
  damageToBase: number  // 1 for normal, 999 for boss
}

export interface EnemyDefinition {
  type: EnemyType
  name: string
  description: string

  // Base HP Pools
  healthPool: number
  armorPool: number
  shieldPool: number

  // Movement
  speed: number

  // Regeneration
  regenRate: {
    health: number
    armor: number
    shield: number
  }

  // Abilities
  abilities: EnemyAbility[]

  // Rewards
  goldDrop: number
  damageToBase: number

  // Spawn Info
  waveIntroduced: number
  isBoss: boolean
}
