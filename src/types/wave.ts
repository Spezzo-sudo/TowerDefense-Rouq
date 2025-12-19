/**
 * Wave System Types
 */

import { EnemyType } from './enemy'

export interface WaveEnemySpawn {
  type: EnemyType
  count: number
  spawnDelay: number  // seconds between individual spawns
}

export interface Wave {
  number: number
  enemies: WaveEnemySpawn[]
  isBossWave: boolean
}

export interface WaveScaling {
  enemyCount: number      // Base count for this wave
  healthScale: number     // Multiplier for health
  armorScale: number      // Multiplier for armor
  shieldScale: number     // Multiplier for shield
  speedScale: number      // Multiplier for speed
  goldScale: number       // Multiplier for gold drops
}
