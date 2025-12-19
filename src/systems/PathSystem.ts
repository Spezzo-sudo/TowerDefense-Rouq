/**
 * Path System - Path creation, splitting, portal management
 * TODO: Implement path system from MAP_SYSTEM.md
 */

import { Path, Portal, Tile, GameMap } from '../types/map'
import { Direction, Position } from '../types/core'
import { Enemy } from '../types/enemy'

export class PathSystem {
  /**
   * Extend path with new tiles
   * TODO: Implement path extension logic
   */
  static extendPath(path: Path, newTiles: Tile[]): boolean {
    // TODO: Implement:
    // 1. Validate tiles are adjacent to path end
    // 2. Change tile type to PATH
    // 3. Add to path.tiles array
    // 4. Update path length and end position

    console.log('TODO: Extend path')
    return false
  }

  /**
   * Create a new branch from existing path
   * TODO: Implement path splitting
   */
  static createBranch(sourcePath: Path, newTiles: Tile[], direction: Direction): Path {
    // TODO: Implement:
    // 1. Get split point (end of source path)
    // 2. Create new path starting at split point
    // 3. Register branch in paths array
    // 4. Return new path

    console.log('TODO: Create branch')

    return {
      id: `path_${Date.now()}`,
      direction,
      tiles: newTiles,
      length: newTiles.length,
      start: { x: 0, y: 0 },
      end: { x: 0, y: 0 },
      portals: [],
      isComplete: false,
    }
  }

  /**
   * Spawn portal at path end
   * TODO: Implement portal spawning
   */
  static spawnPortal(path: Path, waveNumber: number): Portal {
    // TODO: Implement:
    // 1. Mark path as complete
    // 2. Create portal at path end
    // 3. Calculate spawn rate based on wave
    // 4. Add to path.portals array

    console.log('TODO: Spawn portal')

    return {
      id: `portal_${Date.now()}`,
      position: path.end,
      path,
      spawnWave: waveNumber,
      enemies: [],
      spawnRate: 1.0,
    }
  }

  /**
   * Calculate if path should split based on wave
   */
  static shouldPathSplit(waveNumber: number, currentPathCount: number): boolean {
    // TODO: Implement split chance from GAME_CONSTANTS

    if (waveNumber < 11) return false
    if (waveNumber < 21 && currentPathCount >= 2) return false
    if (waveNumber < 31 && currentPathCount >= 3) return false
    if (currentPathCount >= 4) return false

    const chance = waveNumber < 21 ? 0.2 : waveNumber < 31 ? 0.3 : 0.4
    return Math.random() < chance
  }

  /**
   * Get enemy position along path
   */
  static getPositionOnPath(path: Path, progress: number): Position {
    // TODO: Implement:
    // 1. Calculate which tile based on progress (0-1)
    // 2. Interpolate position between tiles
    // 3. Return world position

    const tileIndex = Math.floor(progress * (path.tiles.length - 1))
    const tile = path.tiles[tileIndex]

    if (!tile) {
      return { x: 0, y: 0 }
    }

    return { x: tile.x, y: tile.y }
  }

  /**
   * Move enemy along path
   */
  static moveEnemyAlongPath(enemy: Enemy, deltaTime: number): void {
    // TODO: Implement:
    // 1. Calculate distance to move (speed * deltaTime)
    // 2. Convert to progress increment
    // 3. Update enemy.pathProgress
    // 4. Update enemy.position based on new progress
    // 5. Check if reached end (progress >= 1)

    console.log('TODO: Move enemy along path')
  }
}
