/**
 * Support Building Definitions - From SUPPORT_BUILDINGS.md
 */

import { BuildingType, BuildingDefinition } from '../types/building'
import { MapFeature } from '../types/core'

export const BUILDING_DEFINITIONS: Record<BuildingType, BuildingDefinition> = {
  [BuildingType.POWER_SIPHON]: {
    type: BuildingType.POWER_SIPHON,
    name: 'Power Siphon',
    description: 'Adjacent to Mana Crystal: Generates 1 energy/sec',
    cost: 100,
    requiredAdjacent: MapFeature.MANA_CRYSTAL,
    effect: '+1 mana/second',
  },

  [BuildingType.ENERGY_BANK]: {
    type: BuildingType.ENERGY_BANK,
    name: 'Energy Bank',
    description: 'Increases max energy (+50) and provides passive generation (+0.5/sec)',
    cost: 125,
    effect: '+50 max mana, +0.5 mana/sec',
  },

  [BuildingType.DATA_CENTER]: {
    type: BuildingType.DATA_CENTER,
    name: 'Data Center',
    description: 'Generates credits at wave start based on adjacent towers',
    cost: 0, // Spawns automatically
    effect: 'wave × adjacent tower count gold per wave',
  },

  [BuildingType.MAINFRAME]: {
    type: BuildingType.MAINFRAME,
    name: 'Mainframe',
    description: 'Adjacent to Grave: Converts energy to credits (1 energy → 5 credits/sec)',
    cost: 150,
    requiredAdjacent: MapFeature.GRAVE,
    effect: 'Costs 1 mana/sec, generates 5 gold/sec',
  },

  [BuildingType.REPAIR_STATION]: {
    type: BuildingType.REPAIR_STATION,
    name: 'Repair Station',
    description: 'Adjacent to Iron Vein: +1 Max HP, 10% chance to repair 1 damage',
    cost: 100,
    requiredAdjacent: MapFeature.IRON_VEIN,
    effect: '+1 max HP, 10% repair chance per wave',
  },

  [BuildingType.RESEARCH_LAB]: {
    type: BuildingType.RESEARCH_LAB,
    name: 'Research Lab',
    description: 'Adjacent to Occult Shrine: Provides random wave-to-wave damage buffs',
    cost: 200,
    requiredAdjacent: MapFeature.OCCULT_SHRINE,
    effect: '25% base chance per type to grant +1 multiplier',
  },
}
