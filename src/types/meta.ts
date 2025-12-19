/**
 * Meta-Progression System Types
 */

export interface MetaProgression {
  totalXP: number
  spentXP: number
  availableXP: number
  unlockedUpgrades: string[]

  // Permanent Buffs
  permanentBuffs: {
    startingGold: number
    startingMana: number
    baseHealth: number
    maxTowers: number
    manaRegen: number
    goldPerKill: number
  }
}

export interface Upgrade {
  id: string
  name: string
  description: string
  cost: number
  maxLevel: number
  currentLevel: number
  prerequisite?: string
}

export interface RunStats {
  waveReached: number
  difficulty: number
  duration: number  // seconds
  totalGold: number
  towersBuilt: number
  enemiesDefeated: number
  baseFinalHP: number
}
