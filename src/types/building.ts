/**
 * Support Building System Types
 */

import { Position, MapFeature } from './core'

export enum BuildingType {
  POWER_SIPHON = 'power_siphon',
  ENERGY_BANK = 'energy_bank',
  DATA_CENTER = 'data_center',
  MAINFRAME = 'mainframe',
  REPAIR_STATION = 'repair_station',
  RESEARCH_LAB = 'research_lab',
}

export interface SupportBuilding {
  id: string
  type: BuildingType
  position: Position

  // Requirements
  cost: number
  requiredAdjacent?: MapFeature

  // State
  level: number
  isActive: boolean

  // Research Lab specific
  researchLevels?: {
    health: number
    armor: number
    shield: number
  }
  activeBuffs?: {
    health: boolean
    armor: boolean
    shield: boolean
  }
}

export interface BuildingDefinition {
  type: BuildingType
  name: string
  description: string
  cost: number
  requiredAdjacent?: MapFeature
  effect: string
}
