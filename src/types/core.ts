/**
 * Core Game Types & Enums
 */

export enum GamePhase {
  BUILD = 'build',
  COMBAT = 'combat',
  EXPANSION = 'expansion',
  CARD_DRAW = 'card_draw',
}

export enum TileType {
  PATH = 'path',
  TERRAIN = 'terrain',
  BLOCKED = 'blocked',
  BASE = 'base',
}

export enum MapFeature {
  MANA_CRYSTAL = 'mana_crystal',
  HOUSE = 'house',
  IRON_VEIN = 'iron_vein',
  GRAVE = 'grave',
  OCCULT_SHRINE = 'occult_shrine',
}

export enum Direction {
  NORTH = 'north',
  EAST = 'east',
  SOUTH = 'south',
  WEST = 'west',
}

export enum Difficulty {
  SINGLE = 1,
  DOUBLE = 2,
  TRIPLE = 3,
}

export interface Position {
  x: number
  y: number
}
