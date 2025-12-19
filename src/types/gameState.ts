/**
 * Complete Game State Type
 */

import { GamePhase, Difficulty } from './core'
import { GameMap } from './map'
import { Tower } from './tower'
import { Enemy } from './enemy'
import { SupportBuilding } from './building'
import { Wave } from './wave'
import { Card, CardDrawState } from './card'
import { MetaProgression, RunStats } from './meta'

export interface ManaSystem {
  current: number
  maximum: number
  regenRate: number
  reserved: number  // By constant towers
}

export interface GameState {
  // Game Flow
  phase: GamePhase
  currentWave: number
  totalWaves: number
  difficulty: Difficulty
  isPaused: boolean

  // Resources
  credits: number
  mana: ManaSystem
  baseHealth: number
  baseMaxHealth: number

  // Map & Entities
  map: GameMap
  towers: Tower[]
  enemies: Enemy[]
  supportBuildings: SupportBuilding[]

  // Tower Management
  maxTowers: number
  selectedTowerId: string | null

  // Wave System
  waveQueue: Wave[]
  currentWaveData: Wave | null
  buildPhaseTimer: number  // seconds remaining

  // Card System
  cardDrawState: CardDrawState
  availableCards: Card[]
  selectedCardId: string | null

  // Meta-Progression
  metaProgression: MetaProgression
  currentRunStats: RunStats

  // Time
  gameTime: number  // Total elapsed time in seconds
  deltaTime: number // Time since last frame
}
