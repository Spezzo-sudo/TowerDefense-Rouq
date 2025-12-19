/**
 * HUD Component - Main game HUD overlay
 */

import { useGameStore } from '../../store/gameStore'

export function HUD() {
  const { state, setPhase, nextWave } = useGameStore()

  const handleNextWave = () => {
    nextWave()
  }

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 bg-bg-dark/95 border-b-2 border-neon-cyan p-4 pointer-events-auto">
        <div className="flex items-center justify-between">
          {/* Left: Title */}
          <div className="text-xl font-bold neon-glow text-neon-cyan">
            NEON DEFENSE
          </div>

          {/* Center: Wave Info */}
          <div className="flex items-center gap-6">
            <div className="text-lg">
              <span className="text-neon-magenta">WAVE</span>{' '}
              <span className="text-white font-bold">
                {state.currentWave}/{state.totalWaves}
              </span>
            </div>
            <div className="text-lg">
              <span className="text-neon-cyan">{state.phase.toUpperCase()}</span>
            </div>
            {state.phase === 'build' && (
              <div className="text-lg">
                <span className="text-neon-orange">
                  {Math.ceil(state.buildPhaseTimer)}s
                </span>
              </div>
            )}
          </div>

          {/* Right: Settings */}
          <div className="flex gap-4">
            <button className="px-4 py-2 border border-neon-cyan text-neon-cyan neon-button">
              ⏸ PAUSE
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Resources & Actions */}
      <div className="absolute bottom-0 left-0 right-0 bg-bg-dark/95 border-t-2 border-neon-cyan p-4 pointer-events-auto">
        <div className="flex items-center justify-between">
          {/* Left: Resources */}
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <span className="text-neon-green font-bold text-lg">💰 GOLD</span>
              <span className="text-white text-xl font-bold">{state.credits}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-neon-blue font-bold text-lg">⚡ MANA</span>
              <span className="text-white text-xl font-bold">
                {Math.floor(state.mana.current)}/{state.mana.maximum}
              </span>
              <div className="w-32 h-4 bg-bg-darker border border-neon-blue">
                <div
                  className="h-full bg-neon-blue"
                  style={{
                    width: `${(state.mana.current / state.mana.maximum) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-hp-health font-bold text-lg">❤️ BASE</span>
              <span className="text-white text-xl font-bold">
                {state.baseHealth}/{state.baseMaxHealth}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-neon-cyan font-bold text-lg">🏰 TOWERS</span>
              <span className="text-white text-xl font-bold">
                {state.towers.length}/{state.maxTowers}
              </span>
            </div>
          </div>

          {/* Right: Action Buttons */}
          <div className="flex gap-4">
            {state.phase === 'build' && (
              <button
                onClick={handleNextWave}
                className="px-6 py-3 bg-neon-green/20 border-2 border-neon-green text-neon-green font-bold neon-button hover:bg-neon-green/40"
              >
                ▶ NEXT WAVE
              </button>
            )}

            {state.phase === 'expansion' && (
              <button className="px-6 py-3 bg-neon-cyan/20 border-2 border-neon-cyan text-neon-cyan font-bold neon-button">
                🎯 EXPAND
              </button>
            )}

            <button className="px-4 py-3 border-2 border-hp-health text-hp-health neon-button hover:bg-hp-health/20">
              ❌ SURRENDER
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
