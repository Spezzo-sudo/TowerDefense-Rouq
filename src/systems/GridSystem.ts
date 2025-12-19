/**
 * Grid System - Tile Management and Map Generation
 */

import { Tile, GameMap, Path, Portal } from '../types/map'
import { TileType, MapFeature, Direction, Position } from '../types/core'
import { GAME_CONSTANTS } from '../constants/game'

export class GridSystem {
  /**
   * Initialize the starting 5x5 map with base tower at center
   */
  static initializeMap(): GameMap {
    const { width, height } = GAME_CONSTANTS.INITIAL_MAP_SIZE
    const tiles: Tile[][] = []

    // Create base grid
    for (let y = 0; y < height; y++) {
      tiles[y] = []
      for (let x = 0; x < width; x++) {
        tiles[y]![x] = {
          x,
          y,
          type: TileType.TERRAIN,
          elevation: Math.floor(Math.random() * 3), // 0-2 elevation
        }
      }
    }

    // Set base tile
    const basePos = GAME_CONSTANTS.BASE_POSITION
    tiles[basePos.y]![basePos.x]!.type = TileType.BASE
    tiles[basePos.y]![basePos.x]!.elevation = 0

    // Create initial path (north direction)
    const initialPath = this.createInitialPath(tiles, basePos)

    return {
      width,
      height,
      tiles,
      paths: [initialPath],
      portals: [],
      basePosition: basePos,
    }
  }

  /**
   * Create the initial path from base going north
   */
  private static createInitialPath(tiles: Tile[][], basePos: Position): Path {
    const pathTiles: Tile[] = []

    // Start at base, go north
    for (let y = basePos.y; y >= 0; y--) {
      const tile = tiles[y]![basePos.x]!
      tile.type = TileType.PATH
      tile.elevation = 0
      pathTiles.push(tile)
    }

    return {
      id: 'path_0',
      direction: Direction.NORTH,
      tiles: pathTiles,
      length: pathTiles.length,
      start: basePos,
      end: { x: basePos.x, y: 0 },
      portals: [],
      isComplete: false,
    }
  }

  /**
   * Expand map in a given direction
   * TODO: Implement full expansion logic with feature spawning
   */
  static expandMap(
    map: GameMap,
    direction: Direction
  ): { newTiles: Tile[]; updatedMap: GameMap } {
    // TODO: Implement map expansion
    console.log('Expanding map in direction:', direction)

    return {
      newTiles: [],
      updatedMap: map,
    }
  }

  /**
   * Get tile at position (with bounds checking)
   */
  static getTileAt(map: GameMap, x: number, y: number): Tile | null {
    if (x < 0 || x >= map.width || y < 0 || y >= map.height) {
      return null
    }
    return map.tiles[y]?.[x] ?? null
  }

  /**
   * Get adjacent tiles (4-directional)
   */
  static getAdjacentTiles(map: GameMap, position: Position): Tile[] {
    const { x, y } = position
    const adjacent: Tile[] = []

    const positions = [
      { x: x - 1, y }, // West
      { x: x + 1, y }, // East
      { x, y: y - 1 }, // North
      { x, y: y + 1 }, // South
    ]

    positions.forEach((pos) => {
      const tile = this.getTileAt(map, pos.x, pos.y)
      if (tile) adjacent.push(tile)
    })

    return adjacent
  }

  /**
   * Check if a position is valid for tower placement
   */
  static canPlaceTower(map: GameMap, position: Position): boolean {
    const tile = this.getTileAt(map, position.x, position.y)
    if (!tile) return false

    // Must be TERRAIN type
    if (tile.type !== TileType.TERRAIN) return false

    // Must not be occupied
    if (tile.occupied) return false

    return true
  }

  /**
   * Calculate distance between two positions (Manhattan distance)
   */
  static manhattanDistance(a: Position, b: Position): number {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
  }

  /**
   * Calculate Euclidean distance between two positions
   */
  static euclideanDistance(a: Position, b: Position): number {
    const dx = a.x - b.x
    const dy = a.y - b.y
    return Math.sqrt(dx * dx + dy * dy)
  }

  /**
   * Spawn map features on new tiles
   * TODO: Implement feature spawning logic
   */
  static spawnMapFeatures(tiles: Tile[], waveNumber: number): void {
    // TODO: Implement feature spawning based on wave and spawn chances
    console.log('Spawning map features for wave:', waveNumber)
  }

  /**
   * Get all tiles of a specific type
   */
  static getTilesByType(map: GameMap, type: TileType): Tile[] {
    const result: Tile[] = []

    for (let y = 0; y < map.height; y++) {
      for (let x = 0; x < map.width; x++) {
        const tile = map.tiles[y]?.[x]
        if (tile && tile.type === type) {
          result.push(tile)
        }
      }
    }

    return result
  }

  /**
   * Get all tiles with a specific feature
   */
  static getTilesByFeature(map: GameMap, feature: MapFeature): Tile[] {
    const result: Tile[] = []

    for (let y = 0; y < map.height; y++) {
      for (let x = 0; x < map.width; x++) {
        const tile = map.tiles[y]?.[x]
        if (tile && tile.feature === feature) {
          result.push(tile)
        }
      }
    }

    return result
  }
}
