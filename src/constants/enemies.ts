/**
 * Enemy Definitions - Complete reference from ENEMIES.md
 */

import { EnemyType, EnemyDefinition, EnemyAbility } from '../types/enemy'

export const ENEMY_DEFINITIONS: Record<EnemyType, EnemyDefinition> = {
  // ===== PHASE 1: Waves 1-15 (Foundation Phase) =====
  [EnemyType.SCOUT_DRONE]: {
    type: EnemyType.SCOUT_DRONE,
    name: 'Scout Drone',
    description: 'Very fast basic enemy. Dies quickly.',
    healthPool: 10,
    armorPool: 0,
    shieldPool: 0,
    speed: 3,
    regenRate: { health: 0, armor: 0, shield: 0 },
    abilities: [],
    goldDrop: 1,
    damageToBase: 1,
    waveIntroduced: 1,
    isBoss: false,
  },

  [EnemyType.ASSAULT_BOT]: {
    type: EnemyType.ASSAULT_BOT,
    name: 'Assault Bot',
    description: 'Tanky with armor. Moderately fast.',
    healthPool: 50,
    armorPool: 30,
    shieldPool: 0,
    speed: 1.5,
    regenRate: { health: 0, armor: 0, shield: 0 },
    abilities: [],
    goldDrop: 4,
    damageToBase: 1,
    waveIntroduced: 4,
    isBoss: false,
  },

  [EnemyType.SPEED_RUNNER]: {
    type: EnemyType.SPEED_RUNNER,
    name: 'Speed Runner',
    description: 'Extremely fast with sprint ability. Low HP.',
    healthPool: 20,
    armorPool: 0,
    shieldPool: 10,
    speed: 6,
    regenRate: { health: 0, armor: 0, shield: 0 },
    abilities: [EnemyAbility.SPRINT],
    goldDrop: 5,
    damageToBase: 1,
    waveIntroduced: 5,
    isBoss: false,
  },

  [EnemyType.SHIELD_CARRIER]: {
    type: EnemyType.SHIELD_CARRIER,
    name: 'Shield Carrier',
    description: 'Large shields that regenerate.',
    healthPool: 30,
    armorPool: 0,
    shieldPool: 80,
    speed: 2,
    regenRate: { health: 0, armor: 0, shield: 5 },
    abilities: [EnemyAbility.SHIELD_REGEN],
    goldDrop: 8,
    damageToBase: 1,
    waveIntroduced: 8,
    isBoss: false,
  },

  [EnemyType.HEAVY_MECH]: {
    type: EnemyType.HEAVY_MECH,
    name: 'Heavy Mech',
    description: 'Extremely tanky armor pool with regeneration.',
    healthPool: 40,
    armorPool: 100,
    shieldPool: 20,
    speed: 1,
    regenRate: { health: 0, armor: 5, shield: 0 },
    abilities: [EnemyAbility.ARMOR_REGEN],
    goldDrop: 10,
    damageToBase: 1,
    waveIntroduced: 10,
    isBoss: false,
  },

  [EnemyType.ELITE_SCOUT_PACK]: {
    type: EnemyType.ELITE_SCOUT_PACK,
    name: 'Elite Scout Pack',
    description: 'Boss Wave 15. Balanced HP pools.',
    healthPool: 100,
    armorPool: 50,
    shieldPool: 50,
    speed: 2,
    regenRate: { health: 0, armor: 0, shield: 0 },
    abilities: [],
    goldDrop: 50,
    damageToBase: 1,
    waveIntroduced: 15,
    isBoss: true,
  },

  // ===== PHASE 2: Waves 16-25 (Anomaly Phase) =====
  // Group A: HAUNTED
  [EnemyType.GHOST_DRONE]: {
    type: EnemyType.GHOST_DRONE,
    name: 'Ghost Drone',
    description: 'Teleports forward 20% on death.',
    healthPool: 30,
    armorPool: 30,
    shieldPool: 30,
    speed: 3,
    regenRate: { health: 0, armor: 0, shield: 0 },
    abilities: [EnemyAbility.TELEPORT_ON_DEATH],
    goldDrop: 16,
    damageToBase: 1,
    waveIntroduced: 16,
    isBoss: false,
  },

  [EnemyType.PHANTOM_CARRIER]: {
    type: EnemyType.PHANTOM_CARRIER,
    name: 'Phantom Carrier',
    description: 'Spawns 3 scouts on death.',
    healthPool: 60,
    armorPool: 40,
    shieldPool: 60,
    speed: 2,
    regenRate: { health: 0, armor: 0, shield: 0 },
    abilities: [EnemyAbility.SPAWN_ON_DEATH],
    goldDrop: 18,
    damageToBase: 1,
    waveIntroduced: 18,
    isBoss: false,
  },

  // Group B: UNDEAD
  [EnemyType.ZOMBIE_BOT]: {
    type: EnemyType.ZOMBIE_BOT,
    name: 'Zombie Bot',
    description: 'Strong health regeneration.',
    healthPool: 80,
    armorPool: 60,
    shieldPool: 0,
    speed: 1.5,
    regenRate: { health: 5, armor: 0, shield: 0 },
    abilities: [EnemyAbility.HEALTH_REGEN],
    goldDrop: 16,
    damageToBase: 1,
    waveIntroduced: 16,
    isBoss: false,
  },

  [EnemyType.VAMPIRE_MECH]: {
    type: EnemyType.VAMPIRE_MECH,
    name: 'Vampire Mech',
    description: 'Heals nearby allies 1%/sec.',
    healthPool: 50,
    armorPool: 50,
    shieldPool: 50,
    speed: 2,
    regenRate: { health: 0, armor: 0, shield: 0 },
    abilities: [EnemyAbility.LIFESTEAL_AURA],
    goldDrop: 20,
    damageToBase: 1,
    waveIntroduced: 20,
    isBoss: false,
  },

  // Group C: EPHEMERAL
  [EnemyType.PHASE_SHIFTER]: {
    type: EnemyType.PHASE_SHIFTER,
    name: 'Phase Shifter',
    description: 'Blinks randomly forward 10-30%.',
    healthPool: 40,
    armorPool: 20,
    shieldPool: 80,
    speed: 4,
    regenRate: { health: 0, armor: 0, shield: 0 },
    abilities: [EnemyAbility.BLINK],
    goldDrop: 16,
    damageToBase: 1,
    waveIntroduced: 16,
    isBoss: false,
  },

  [EnemyType.CORRUPTED_TITAN]: {
    type: EnemyType.CORRUPTED_TITAN,
    name: 'Corrupted Titan',
    description: 'Boss Wave 25. Spawns minions and buffs nearby.',
    healthPool: 200,
    armorPool: 150,
    shieldPool: 200,
    speed: 2,
    regenRate: { health: 0, armor: 0, shield: 0 },
    abilities: [EnemyAbility.SPAWN_MINIONS, EnemyAbility.BUFF_NEARBY],
    goldDrop: 100,
    damageToBase: 10,
    waveIntroduced: 25,
    isBoss: true,
  },

  // ===== PHASE 3: Waves 26-35 (Evolution Phase) =====
  [EnemyType.ELITE_ASSAULT_UNIT]: {
    type: EnemyType.ELITE_ASSAULT_UNIT,
    name: 'Elite Assault Unit',
    description: 'Fast, tanky, regenerates armor.',
    healthPool: 100,
    armorPool: 120,
    shieldPool: 80,
    speed: 2.5,
    regenRate: { health: 0, armor: 5, shield: 0 },
    abilities: [EnemyAbility.ARMOR_REGEN, EnemyAbility.SPRINT],
    goldDrop: 26,
    damageToBase: 1,
    waveIntroduced: 26,
    isBoss: false,
  },

  [EnemyType.SWARM_SPAWNER]: {
    type: EnemyType.SWARM_SPAWNER,
    name: 'Swarm Spawner',
    description: 'Spawns weak enemies periodically while moving.',
    healthPool: 80,
    armorPool: 60,
    shieldPool: 100,
    speed: 1,
    regenRate: { health: 0, armor: 0, shield: 0 },
    abilities: [EnemyAbility.SPAWN_CONTINUOUS],
    goldDrop: 28,
    damageToBase: 1,
    waveIntroduced: 28,
    isBoss: false,
  },

  [EnemyType.SHIELDED_BEHEMOTH]: {
    type: EnemyType.SHIELDED_BEHEMOTH,
    name: 'Shielded Behemoth',
    description: 'Massive shields. Buffs nearby ally shields.',
    healthPool: 150,
    armorPool: 100,
    shieldPool: 300,
    speed: 1,
    regenRate: { health: 0, armor: 0, shield: 10 },
    abilities: [EnemyAbility.SHIELD_REGEN, EnemyAbility.BUFF_SHIELDS],
    goldDrop: 30,
    damageToBase: 1,
    waveIntroduced: 30,
    isBoss: false,
  },

  [EnemyType.TELEPORTER]: {
    type: EnemyType.TELEPORTER,
    name: 'Teleporter',
    description: 'Teleports 25% forward on spawn.',
    healthPool: 60,
    armorPool: 40,
    shieldPool: 60,
    speed: 3,
    regenRate: { health: 0, armor: 0, shield: 0 },
    abilities: [EnemyAbility.TELEPORT_FORWARD],
    goldDrop: 32,
    damageToBase: 1,
    waveIntroduced: 32,
    isBoss: false,
  },

  [EnemyType.QUANTUM_LEVIATHAN]: {
    type: EnemyType.QUANTUM_LEVIATHAN,
    name: 'Quantum Leviathan',
    description: 'Boss Wave 35. Teleports randomly, spawns elite adds, damage aura.',
    healthPool: 300,
    armorPool: 250,
    shieldPool: 350,
    speed: 2,
    regenRate: { health: 0, armor: 0, shield: 0 },
    abilities: [EnemyAbility.BLINK, EnemyAbility.SPAWN_MINIONS, EnemyAbility.DAMAGE_AURA],
    goldDrop: 150,
    damageToBase: 15,
    waveIntroduced: 35,
    isBoss: true,
  },

  // ===== PHASE 4: Waves 36-45 (Apex Phase) =====
  [EnemyType.APEX_PREDATOR]: {
    type: EnemyType.APEX_PREDATOR,
    name: 'Apex Predator',
    description: 'Fast, spawns adds on death, buffs nearby speed.',
    healthPool: 200,
    armorPool: 180,
    shieldPool: 200,
    speed: 3,
    regenRate: { health: 0, armor: 0, shield: 0 },
    abilities: [EnemyAbility.SPRINT, EnemyAbility.BUFF_SPEED, EnemyAbility.SPAWN_ON_DEATH],
    goldDrop: 36,
    damageToBase: 1,
    waveIntroduced: 36,
    isBoss: false,
  },

  [EnemyType.NANO_REGENERATOR]: {
    type: EnemyType.NANO_REGENERATOR,
    name: 'Nano-Regenerator',
    description: 'Regenerates all HP types fast. Heals nearby allies.',
    healthPool: 250,
    armorPool: 200,
    shieldPool: 250,
    speed: 2,
    regenRate: { health: 5, armor: 5, shield: 10 },
    abilities: [
      EnemyAbility.HEALTH_REGEN,
      EnemyAbility.ARMOR_REGEN,
      EnemyAbility.SHIELD_REGEN,
      EnemyAbility.LIFESTEAL_AURA,
    ],
    goldDrop: 38,
    damageToBase: 1,
    waveIntroduced: 38,
    isBoss: false,
  },

  [EnemyType.NEXUS_CORE]: {
    type: EnemyType.NEXUS_CORE,
    name: 'NEXUS CORE',
    description: 'Final Boss Wave 45. Instant-kill damage. All abilities.',
    healthPool: 500,
    armorPool: 500,
    shieldPool: 1000,
    speed: 2,
    regenRate: { health: 0, armor: 0, shield: 20 },
    abilities: [
      EnemyAbility.BLINK,
      EnemyAbility.SPAWN_MINIONS,
      EnemyAbility.DAMAGE_AURA_STRONG,
      EnemyAbility.BUFF_ALL,
      EnemyAbility.SHIELD_REGEN,
    ],
    goldDrop: 500,
    damageToBase: 999, // Instant kill!
    waveIntroduced: 45,
    isBoss: true,
  },
}

// Calculate enemy scaling for a given wave
export function calculateEnemyScaling(waveNumber: number) {
  return {
    enemyCount: 5 + waveNumber * 2,
    healthScale: 1 + waveNumber * 0.15,
    armorScale: 1 + waveNumber * 0.12,
    shieldScale: 1 + waveNumber * 0.2,
    speedScale: 1 + waveNumber * 0.05,
    goldScale: 1 + waveNumber * 0.08,
  }
}

// Get available enemy types for a given wave and phase
export function getAvailableEnemyTypes(waveNumber: number): EnemyType[] {
  const available: EnemyType[] = []

  Object.values(ENEMY_DEFINITIONS).forEach((def) => {
    if (def.waveIntroduced <= waveNumber && !def.isBoss) {
      available.push(def.type)
    }
  })

  return available
}

// Get boss for a specific wave
export function getBossForWave(waveNumber: number): EnemyType | null {
  const bosses = Object.values(ENEMY_DEFINITIONS).filter((def) => def.isBoss)

  for (const boss of bosses) {
    if (boss.waveIntroduced === waveNumber) {
      return boss.type
    }
  }

  return null
}
