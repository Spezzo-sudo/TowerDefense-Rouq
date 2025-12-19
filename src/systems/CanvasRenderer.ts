/**
 * Canvas Renderer - Isometric rendering system
 */

import { GameMap } from '../types/map'
import { Tower } from '../types/tower'
import { Enemy } from '../types/enemy'
import { TileType } from '../types/core'
import { GAME_CONSTANTS } from '../constants/game'

export class CanvasRenderer {
  private ctx: CanvasRenderingContext2D
  private tileSize = GAME_CONSTANTS.TILE_SIZE

  // Camera offset for panning
  private cameraX = 0
  private cameraY = 0

  constructor(private canvas: HTMLCanvasElement) {
    const context = canvas.getContext('2d')
    if (!context) {
      throw new Error('Failed to get 2D context')
    }
    this.ctx = context
  }

  /**
   * Main render loop
   */
  render(map: GameMap, towers: Tower[], enemies: Enemy[]): void {
    this.clear()
    this.renderMap(map)
    this.renderTowers(towers)
    this.renderEnemies(enemies)

    // TODO: Render projectiles, effects, etc.
  }

  /**
   * Clear canvas
   */
  private clear(): void {
    this.ctx.fillStyle = '#050810' // bg-darker
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  /**
   * Render the map grid in isometric view
   */
  private renderMap(map: GameMap): void {
    for (let y = 0; y < map.height; y++) {
      for (let x = 0; x < map.width; x++) {
        const tile = map.tiles[y]?.[x]
        if (!tile) continue

        const screenPos = this.tileToScreen(x, y)
        this.renderTile(tile, screenPos.x, screenPos.y)
      }
    }
  }

  /**
   * Render a single tile
   */
  private renderTile(tile: any, screenX: number, screenY: number): void {
    const { ctx, tileSize } = this

    // Color based on tile type
    let fillColor = '#1a1f3a' // Default TERRAIN
    let strokeColor = 'rgba(0, 255, 255, 0.3)' // Cyan grid lines

    if (tile.type === TileType.PATH) {
      fillColor = '#2a2f4f'
      strokeColor = 'rgba(0, 255, 255, 0.6)'
    } else if (tile.type === TileType.BASE) {
      fillColor = '#00ffff'
      strokeColor = '#00ffff'
    } else if (tile.type === TileType.BLOCKED) {
      fillColor = '#0a0e27'
    }

    // Adjust color based on elevation
    const elevation = tile.elevation || 0
    const brightnessAdjust = elevation * 10

    // Draw tile (simple square for now, TODO: isometric diamond shape)
    ctx.fillStyle = fillColor
    ctx.fillRect(screenX, screenY, tileSize, tileSize)

    // Grid outline
    ctx.strokeStyle = strokeColor
    ctx.lineWidth = 1
    ctx.strokeRect(screenX, screenY, tileSize, tileSize)

    // Render feature if present
    if (tile.feature) {
      this.renderFeature(tile.feature, screenX, screenY)
    }
  }

  /**
   * Render map feature icon
   */
  private renderFeature(feature: string, screenX: number, screenY: number): void {
    const { ctx, tileSize } = this

    ctx.font = '16px monospace'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    // Simple icon representation
    let icon = '?'
    let color = '#ffffff'

    switch (feature) {
      case 'mana_crystal':
        icon = '💎'
        color = '#0088ff'
        break
      case 'house':
        icon = '🏠'
        color = '#888888'
        break
      case 'iron_vein':
        icon = '⛏️'
        color = '#ffaa00'
        break
      case 'grave':
        icon = '🪦'
        color = '#ff00ff'
        break
      case 'occult_shrine':
        icon = '🔮'
        color = '#ff00ff'
        break
    }

    ctx.fillStyle = color
    ctx.fillText(icon, screenX + tileSize / 2, screenY + tileSize / 2)
  }

  /**
   * Render towers
   */
  private renderTowers(towers: Tower[]): void {
    towers.forEach((tower) => {
      const screenPos = this.tileToScreen(tower.position.x, tower.position.y)
      this.renderTower(tower, screenPos.x, screenPos.y)
    })
  }

  /**
   * Render a single tower
   */
  private renderTower(tower: Tower, screenX: number, screenY: number): void {
    const { ctx, tileSize } = this

    // Simple representation: colored square
    ctx.fillStyle = '#00ffff'
    const size = tileSize * 0.6
    const offset = (tileSize - size) / 2
    ctx.fillRect(screenX + offset, screenY + offset, size, size)

    // Tower type indicator (first letter)
    ctx.fillStyle = '#000000'
    ctx.font = 'bold 12px monospace'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(
      tower.type[0]?.toUpperCase() ?? 'T',
      screenX + tileSize / 2,
      screenY + tileSize / 2
    )
  }

  /**
   * Render enemies
   */
  private renderEnemies(enemies: Enemy[]): void {
    enemies.forEach((enemy) => {
      const screenPos = this.tileToScreen(enemy.position.x, enemy.position.y)
      this.renderEnemy(enemy, screenPos.x, screenPos.y)
    })
  }

  /**
   * Render a single enemy
   */
  private renderEnemy(enemy: Enemy, screenX: number, screenY: number): void {
    const { ctx, tileSize } = this

    // Simple representation: red circle
    ctx.fillStyle = '#ff0044'
    const radius = tileSize * 0.3
    ctx.beginPath()
    ctx.arc(screenX + tileSize / 2, screenY + tileSize / 2, radius, 0, Math.PI * 2)
    ctx.fill()

    // HP bar (simple)
    const hpPercent = enemy.currentHp / enemy.maxHp
    const barWidth = tileSize * 0.8
    const barHeight = 4
    const barX = screenX + (tileSize - barWidth) / 2
    const barY = screenY - 8

    ctx.fillStyle = '#333333'
    ctx.fillRect(barX, barY, barWidth, barHeight)

    ctx.fillStyle = '#00ff00'
    ctx.fillRect(barX, barY, barWidth * hpPercent, barHeight)
  }

  /**
   * Convert tile coordinates to screen coordinates (isometric)
   * TODO: Implement proper isometric projection
   */
  private tileToScreen(tileX: number, tileY: number): { x: number; y: number } {
    // Simple orthogonal for now, TODO: isometric conversion
    return {
      x: tileX * this.tileSize + this.cameraX,
      y: tileY * this.tileSize + this.cameraY,
    }
  }

  /**
   * Convert screen coordinates to tile coordinates
   */
  screenToTile(screenX: number, screenY: number): { x: number; y: number } {
    // Simple orthogonal for now, TODO: isometric conversion
    return {
      x: Math.floor((screenX - this.cameraX) / this.tileSize),
      y: Math.floor((screenY - this.cameraY) / this.tileSize),
    }
  }

  /**
   * Pan camera
   */
  panCamera(deltaX: number, deltaY: number): void {
    this.cameraX += deltaX
    this.cameraY += deltaY
  }

  /**
   * Center camera on position
   */
  centerOn(tileX: number, tileY: number): void {
    const screenPos = this.tileToScreen(tileX, tileY)
    this.cameraX = this.canvas.width / 2 - screenPos.x - this.tileSize / 2
    this.cameraY = this.canvas.height / 2 - screenPos.y - this.tileSize / 2
  }

  /**
   * Resize canvas
   */
  resize(width: number, height: number): void {
    this.canvas.width = width
    this.canvas.height = height
  }
}
