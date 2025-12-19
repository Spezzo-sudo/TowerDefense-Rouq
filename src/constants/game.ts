/**
 * Core Game Constants
 */

export const GAME_CONSTANTS = {
  // Wave System
  TOTAL_WAVES: 45,
  BOSS_WAVES: [15, 25, 35, 45],
  CARD_DRAW_FREQUENCY: 3, // Every X waves
  CARDS_PER_DRAW: 3,

  // Starting Resources
  STARTING_CREDITS: 100,
  STARTING_MANA: 0,
  STARTING_BASE_HEALTH: 30,
  STARTING_MAX_TOWERS: 10,

  // Mana System
  DEFAULT_MANA_MAX: 100,
  DEFAULT_MANA_REGEN: 0.5, // per second

  // Build Phase
  BUILD_PHASE_DURATION: 60, // seconds

  // Map
  INITIAL_MAP_SIZE: { width: 5, height: 5 },
  BASE_POSITION: { x: 2, y: 2 },
  MAX_ELEVATION: 6,

  // Difficulty Multipliers
  DIFFICULTY_MULTIPLIERS: {
    ENEMY_COUNT: {
      SINGLE: 1.0,
      DOUBLE: 1.5,
      TRIPLE: 2.0,
    },
    ENEMY_STATS: {
      SINGLE: 1.0,
      DOUBLE: 1.3,
      TRIPLE: 1.6,
    },
    XP: {
      SINGLE: 1.0,
      DOUBLE: 2.0,
      TRIPLE: 3.0,
    },
  },

  // XP Win Bonuses
  WIN_BONUS_XP: {
    SINGLE: 450,
    DOUBLE: 900,
    TRIPLE: 1350,
  },

  // Wave Scaling (see docs)
  WAVE_SCALING: {
    ENEMY_COUNT_BASE: 5,
    ENEMY_COUNT_PER_WAVE: 2,
    HEALTH_SCALE: 0.15,    // per wave
    ARMOR_SCALE: 0.12,
    SHIELD_SCALE: 0.20,
    SPEED_SCALE: 0.05,
    GOLD_SCALE: 0.08,
  },

  // Path System
  MAX_PATHS_BY_WAVE: {
    0: 1,   // Waves 1-10: Single path only
    11: 2,  // Waves 11-20: Up to 2 paths
    21: 3,  // Waves 21-30: Up to 3 paths
    31: 4,  // Waves 31+: Up to 4 paths
  },

  PATH_SPLIT_CHANCE: {
    0: 0,    // Waves 1-10: No splits
    11: 0.20, // Waves 11-20: 20% chance
    21: 0.30, // Waves 21-30: 30% chance
    31: 0.40, // Waves 31+: 40% chance
  },

  // Feature Spawn Chances
  FEATURE_SPAWN_CHANCES: {
    EARLY: { // Waves 1-15
      MANA_CRYSTAL: 0.15,
      HOUSE: 0.20,
      IRON_VEIN: 0.10,
      GRAVE: 0,
      OCCULT_SHRINE: 0,
    },
    MID: { // Waves 16-25
      MANA_CRYSTAL: 0.15,
      HOUSE: 0.15,
      IRON_VEIN: 0.10,
      GRAVE: 0.15,
      OCCULT_SHRINE: 0,
    },
    LATE: { // Waves 26-35
      MANA_CRYSTAL: 0.15,
      HOUSE: 0.10,
      IRON_VEIN: 0.12,
      GRAVE: 0.20,
      OCCULT_SHRINE: 1.0, // GUARANTEED
    },
    ENDGAME: { // Waves 36-45
      MANA_CRYSTAL: 0.15,
      HOUSE: 0.10,
      IRON_VEIN: 0.12,
      GRAVE: 0.20,
      OCCULT_SHRINE: 1.0,
    },
  },

  // Critical Hit System
  CRIT_MULTIPLIERS: {
    TIER_1: 2, // 0-50% crit chance
    TIER_2: 3, // 51-100% crit chance
    TIER_3: 4, // 101-150% crit chance
  },

  // DoT Duration
  DOT_DURATION: 5, // seconds

  // Canvas
  TILE_SIZE: 32, // pixels
  TARGET_FPS: 60,
}
