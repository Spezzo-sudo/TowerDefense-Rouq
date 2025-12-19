/**
 * GameCanvas Component - Main canvas rendering and input handling
 */

import { useEffect, useRef } from 'react'
import { useGameStore } from '../../store/gameStore'
import { CanvasRenderer } from '../../systems/CanvasRenderer'
import { GridSystem } from '../../systems/GridSystem'
import { GAME_CONSTANTS } from '../../constants/game'

export function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rendererRef = useRef<CanvasRenderer | null>(null)
  const animationFrameRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(0)

  const { state, update } = useGameStore()

  // Initialize canvas and renderer
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Set canvas size to fill container
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      rendererRef.current?.resize(canvas.width, canvas.height)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Create renderer
    rendererRef.current = new CanvasRenderer(canvas)

    // Initialize map if not already initialized
    if (state.map.tiles.length === 0) {
      const initialMap = GridSystem.initializeMap()
      // TODO: Update game store with initial map
      console.log('Map initialized:', initialMap)

      // Center camera on base
      rendererRef.current.centerOn(
        GAME_CONSTANTS.BASE_POSITION.x,
        GAME_CONSTANTS.BASE_POSITION.y
      )
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  // Game loop
  useEffect(() => {
    let lastTime = performance.now()

    const gameLoop = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000 // Convert to seconds

      if (!state.isPaused && rendererRef.current) {
        // Update game state
        update(deltaTime)

        // Render
        rendererRef.current.render(state.map, state.towers, state.enemies)
      }

      lastTime = currentTime
      animationFrameRef.current = requestAnimationFrame(gameLoop)
    }

    animationFrameRef.current = requestAnimationFrame(gameLoop)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [state, update])

  // Mouse click handler
  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!rendererRef.current) return

    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const tileCoords = rendererRef.current.screenToTile(x, y)
    console.log('Clicked tile:', tileCoords)

    // TODO: Handle tile selection, tower placement, etc.
  }

  // Mouse move handler for hover effects
  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    // TODO: Implement hover effects
  }

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const panSpeed = 10

      switch (event.key) {
        case 'w':
        case 'ArrowUp':
          rendererRef.current?.panCamera(0, panSpeed)
          break
        case 's':
        case 'ArrowDown':
          rendererRef.current?.panCamera(0, -panSpeed)
          break
        case 'a':
        case 'ArrowLeft':
          rendererRef.current?.panCamera(panSpeed, 0)
          break
        case 'd':
        case 'ArrowRight':
          rendererRef.current?.panCamera(-panSpeed, 0)
          break
        case ' ': // Spacebar - center on base
          rendererRef.current?.centerOn(
            GAME_CONSTANTS.BASE_POSITION.x,
            GAME_CONSTANTS.BASE_POSITION.y
          )
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      className="absolute inset-0 w-full h-full"
    />
  )
}
