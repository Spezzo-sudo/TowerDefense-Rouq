import { GameCanvas } from './components/canvas/GameCanvas'
import { HUD } from './components/ui/HUD'
import { BuildMenu } from './components/ui/BuildMenu'

function App() {
  return (
    <div className="w-screen h-screen bg-bg-darker text-ui-text font-mono overflow-hidden">
      <div className="relative w-full h-full">
        {/* Canvas Layer */}
        <GameCanvas />

        {/* UI Overlay */}
        <HUD />
        <BuildMenu />
      </div>
    </div>
  )
}

export default App
