/**
 * Card System Types
 */

export enum CardRarity {
  COMMON = 'common',
  UNCOMMON = 'uncommon',
  RARE = 'rare',
  EPIC = 'epic',
  LEGENDARY = 'legendary',
}

export enum CardType {
  TOWER_UNLOCK = 'tower_unlock',
  TOWER_UPGRADE = 'tower_upgrade',
  BUILDING_UNLOCK = 'building_unlock',
  GLOBAL_BUFF = 'global_buff',
  ECONOMY = 'economy',
}

export interface CardEffect {
  target: 'specific_tower' | 'all_towers' | 'tower_type' | 'global'
  targetId?: string  // Tower type if specific

  modification: {
    baseDamage?: number
    multiplierHealth?: number
    multiplierArmor?: number
    multiplierShield?: number
    range?: number
    rpm?: number
    critChance?: number
    statusBleed?: number
    statusBurn?: number
    statusPoison?: number
    slow?: number
  } | 'unlock'
}

export interface Card {
  id: string
  name: string
  type: CardType
  rarity: CardRarity

  // Requirements
  prerequisiteCards?: string[]
  minWave?: number
  cost?: number  // XP cost if purchased from shop

  // Effect
  effect: CardEffect

  // Presentation
  description: string
  flavor: string
  icon: string
}

export interface CardDrawState {
  drawFrequency: number     // Every X waves
  cardsPerDraw: number      // Cards to show
  nextDrawWave: number      // When next draw occurs
  unlockedCards: string[]   // Card IDs already unlocked
}
