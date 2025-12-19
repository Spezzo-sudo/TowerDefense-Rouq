/**
 * Zustand Game Store - Complete Game State Management
 */

import { create } from 'zustand'
import { GameState } from '../types/gameState'
import { GamePhase, Difficulty } from '../types/core'
import { GAME_CONSTANTS } from '../constants/game'

const initialGameState: GameState = {
  // Game Flow
  phase: GamePhase.BUILD,
  currentWave: 1,
  totalWaves: GAME_CONSTANTS.TOTAL_WAVES,
  difficulty: Difficulty.SINGLE,
  isPaused: false,

  // Resources
  credits: GAME_CONSTANTS.STARTING_CREDITS,
  mana: {
    current: GAME_CONSTANTS.STARTING_MANA,
    maximum: GAME_CONSTANTS.DEFAULT_MANA_MAX,
    regenRate: GAME_CONSTANTS.DEFAULT_MANA_REGEN,
    reserved: 0,
  },
  baseHealth: GAME_CONSTANTS.STARTING_BASE_HEALTH,
  baseMaxHealth: GAME_CONSTANTS.STARTING_BASE_HEALTH,

  // Map & Entities
  map: {
    width: GAME_CONSTANTS.INITIAL_MAP_SIZE.width,
    height: GAME_CONSTANTS.INITIAL_MAP_SIZE.height,
    tiles: [],
    paths: [],
    portals: [],
    basePosition: GAME_CONSTANTS.BASE_POSITION,
  },
  towers: [],
  enemies: [],
  supportBuildings: [],

  // Tower Management
  maxTowers: GAME_CONSTANTS.STARTING_MAX_TOWERS,
  selectedTowerId: null,

  // Wave System
  waveQueue: [],
  currentWaveData: null,
  buildPhaseTimer: GAME_CONSTANTS.BUILD_PHASE_DURATION,

  // Card System
  cardDrawState: {
    drawFrequency: GAME_CONSTANTS.CARD_DRAW_FREQUENCY,
    cardsPerDraw: GAME_CONSTANTS.CARDS_PER_DRAW,
    nextDrawWave: GAME_CONSTANTS.CARD_DRAW_FREQUENCY,
    unlockedCards: [],
  },
  availableCards: [],
  selectedCardId: null,

  // Meta-Progression
  metaProgression: {
    totalXP: 0,
    spentXP: 0,
    availableXP: 0,
    unlockedUpgrades: [],
    permanentBuffs: {
      startingGold: 0,
      startingMana: 0,
      baseHealth: 0,
      maxTowers: 0,
      manaRegen: 0,
      goldPerKill: 0,
    },
  },
  currentRunStats: {
    waveReached: 1,
    difficulty: Difficulty.SINGLE,
    duration: 0,
    totalGold: GAME_CONSTANTS.STARTING_CREDITS,
    towersBuilt: 0,
    enemiesDefeated: 0,
    baseFinalHP: GAME_CONSTANTS.STARTING_BASE_HEALTH,
  },

  // Time
  gameTime: 0,
  deltaTime: 0,
}

interface GameStore {
  state: GameState

  // State Mutations
  setPhase: (phase: GamePhase) => void
  setDifficulty: (difficulty: Difficulty) => void
  setPaused: (paused: boolean) => void

  // Resource Management
  addCredits: (amount: number) => void
  spendCredits: (amount: number) => boolean
  updateMana: (deltaTime: number) => void

  // Tower Management
  selectTower: (towerId: string | null) => void
  // TODO: addTower, removeTower, upgradeTower

  // Wave Management
  nextWave: () => void
  // TODO: spawnEnemies, updateEnemies, checkWaveComplete

  // Expansion
  // TODO: expandMap, spawnMapFeatures

  // Card System
  // TODO: drawCards, selectCard, applyCard

  // Game Loop
  update: (deltaTime: number) => void
  resetGame: () => void
}

export const useGameStore = create<GameStore>((set, get) => ({
  state: initialGameState,

  // ===== State Mutations =====
  setPhase: (phase) =>
    set((store) => ({
      state: { ...store.state, phase },
    })),

  setDifficulty: (difficulty) =>
    set((store) => ({
      state: { ...store.state, difficulty },
    })),

  setPaused: (isPaused) =>
    set((store) => ({
      state: { ...store.state, isPaused },
    })),

  // ===== Resource Management =====
  addCredits: (amount) =>
    set((store) => ({
      state: {
        ...store.state,
        credits: store.state.credits + amount,
        currentRunStats: {
          ...store.state.currentRunStats,
          totalGold: store.state.currentRunStats.totalGold + amount,
        },
      },
    })),

  spendCredits: (amount) => {
    const { state } = get()
    if (state.credits >= amount) {
      set((store) => ({
        state: { ...store.state, credits: store.state.credits - amount },
      }))
      return true
    }
    return false
  },

  updateMana: (deltaTime) =>
    set((store) => {
      const { mana } = store.state
      const newCurrent = Math.min(
        mana.maximum,
        mana.current + mana.regenRate * deltaTime - mana.reserved * deltaTime
      )

      return {
        state: {
          ...store.state,
          mana: { ...mana, current: Math.max(0, newCurrent) },
        },
      }
    }),

  // ===== Tower Management =====
  selectTower: (towerId) =>
    set((store) => ({
      state: { ...store.state, selectedTowerId: towerId },
    })),

  // ===== Wave Management =====
  nextWave: () => {
    const { state } = get()

    // TODO: Implement wave generation and enemy spawning
    console.log('Next wave started:', state.currentWave + 1)

    set((store) => ({
      state: {
        ...store.state,
        currentWave: store.state.currentWave + 1,
        phase: GamePhase.COMBAT,
        buildPhaseTimer: GAME_CONSTANTS.BUILD_PHASE_DURATION,
      },
    }))
  },

  // ===== Game Loop =====
  update: (deltaTime) =>
    set((store) => {
      const newState = { ...store.state }
      newState.gameTime += deltaTime
      newState.deltaTime = deltaTime

      // Update mana regeneration
      get().updateMana(deltaTime)

      // TODO: Update enemies, towers, projectiles, etc.

      // Update build phase timer
      if (newState.phase === GamePhase.BUILD && newState.buildPhaseTimer > 0) {
        newState.buildPhaseTimer -= deltaTime
        if (newState.buildPhaseTimer <= 0) {
          // Auto-start wave when timer expires
          get().nextWave()
        }
      }

      return { state: newState }
    }),

  resetGame: () => set({ state: initialGameState }),
}))
