/**
 * Map & Path System Types
 */

import { Position, TileType, MapFeature, Direction } from './core'
import { SupportBuilding } from './building'
import { Tower } from './tower'
import { Enemy } from './enemy'

export interface Tile {
  x: number
  y: number
  type: TileType
  elevation: number  // 0-6 (height level)
  feature?: MapFeature
  occupied?: Tower | SupportBuilding
}

export interface Path {
  id: string
  direction: Direction
  tiles: Tile[]

  // Path properties
  length: number
  start: Position
  end: Position

  // Portal management
  portals: Portal[]
  isComplete: boolean
}

export interface Portal {
  id: string
  position: Position
  path: Path
  spawnWave: number

  // Spawn management
  enemies: Enemy[]
  spawnRate: number  // Enemies per second
}

export interface GameMap {
  width: number
  height: number
  tiles: Tile[][]
  paths: Path[]
  portals: Portal[]
  basePosition: Position
}
