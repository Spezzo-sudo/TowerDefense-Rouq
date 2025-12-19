/**
 * BuildMenu Component - Tower and Building selection menu
 */

import { useState } from 'react'
import { useGameStore } from '../../store/gameStore'
import { TOWER_DEFINITIONS } from '../../constants/towers'
import { BUILDING_DEFINITIONS } from '../../constants/buildings'
import { TowerType } from '../../types/tower'
import { BuildingType } from '../../types/building'

export function BuildMenu() {
  const { state } = useGameStore()
  const [activeTab, setActiveTab] = useState<'towers' | 'buildings'>('towers')

  // Only show in build phase
  if (state.phase !== 'build') {
    return null
  }

  return (
    <div className="absolute left-4 top-24 w-96 bg-bg-dark/95 border-2 border-neon-cyan p-4 pointer-events-auto max-h-[calc(100vh-200px)] overflow-y-auto">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-neon-cyan neon-glow mb-2">
          BUILD MENU
        </h2>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab('towers')}
            className={`flex-1 px-4 py-2 border-2 font-bold ${
              activeTab === 'towers'
                ? 'border-neon-cyan text-neon-cyan bg-neon-cyan/20'
                : 'border-neon-cyan/40 text-neon-cyan/60'
            }`}
          >
            TOWERS
          </button>
          <button
            onClick={() => setActiveTab('buildings')}
            className={`flex-1 px-4 py-2 border-2 font-bold ${
              activeTab === 'buildings'
                ? 'border-neon-magenta text-neon-magenta bg-neon-magenta/20'
                : 'border-neon-magenta/40 text-neon-magenta/60'
            }`}
          >
            BUILDINGS
          </button>
        </div>
      </div>

      {/* Tower List */}
      {activeTab === 'towers' && (
        <div className="space-y-3">
          {/* TODO: Filter by unlocked towers */}
          {Object.values(TOWER_DEFINITIONS)
            .slice(0, 3)
            .map((tower) => (
              <TowerCard key={tower.type} tower={tower} />
            ))}

          <div className="text-center text-neon-cyan/60 text-sm mt-4">
            More towers unlocked via cards...
          </div>
        </div>
      )}

      {/* Building List */}
      {activeTab === 'buildings' && (
        <div className="space-y-3">
          {Object.values(BUILDING_DEFINITIONS)
            .slice(0, 3)
            .map((building) => (
              <BuildingCard key={building.type} building={building} />
            ))}

          <div className="text-center text-neon-magenta/60 text-sm mt-4">
            More buildings unlocked via cards...
          </div>
        </div>
      )}
    </div>
  )
}

function TowerCard({ tower }: { tower: any }) {
  const cost = tower.baseCost

  return (
    <div className="bg-bg-darker border-2 border-neon-cyan/40 p-3 hover:border-neon-cyan cursor-pointer">
      <div className="flex justify-between items-start mb-2">
        <div className="font-bold text-neon-cyan">{tower.name}</div>
        <div className="text-neon-green font-bold">{cost} 💰</div>
      </div>

      <div className="text-sm text-white/80 mb-2">{tower.description}</div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="text-neon-cyan">DMG:</span> {tower.baseDamage}
        </div>
        <div>
          <span className="text-neon-cyan">RNG:</span> {tower.range}
        </div>
        <div>
          <span className="text-hp-health">HP×:</span> {tower.multipliers.health}
        </div>
        <div>
          <span className="text-hp-armor">AR×:</span> {tower.multipliers.armor}
        </div>
        <div>
          <span className="text-hp-shield">SH×:</span> {tower.multipliers.shield}
        </div>
        {tower.manaCost > 0 && (
          <div>
            <span className="text-neon-blue">⚡:</span> {tower.manaCost}
          </div>
        )}
      </div>
    </div>
  )
}

function BuildingCard({ building }: { building: any }) {
  return (
    <div className="bg-bg-darker border-2 border-neon-magenta/40 p-3 hover:border-neon-magenta cursor-pointer">
      <div className="flex justify-between items-start mb-2">
        <div className="font-bold text-neon-magenta">{building.name}</div>
        <div className="text-neon-green font-bold">{building.cost} 💰</div>
      </div>

      <div className="text-sm text-white/80 mb-2">{building.description}</div>

      <div className="text-xs text-neon-cyan">{building.effect}</div>
    </div>
  )
}
