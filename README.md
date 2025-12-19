# Neon Defense - Tower Defense + Roguelite Hybrid

A cyberpunk-themed tower defense game built with React, TypeScript, and Vite.

## 🎮 Game Overview

Defend your base against 45 waves of increasingly powerful enemies across 4 distinct phases. Build and upgrade towers, expand your map, and unlock powerful cards to enhance your arsenal.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── components/       # React Components
│   ├── canvas/      # Canvas rendering components
│   └── ui/          # UI components (HUD, menus, etc.)
├── types/           # TypeScript interfaces & types
├── constants/       # Game definitions (towers, enemies, etc.)
├── store/           # Zustand state management
├── systems/         # Core game systems
│   ├── GridSystem.ts       # Tile management
│   ├── CanvasRenderer.ts   # Rendering
│   ├── CombatSystem.ts     # Combat logic (TODO)
│   ├── WaveSystem.ts       # Wave generation (TODO)
│   ├── PathSystem.ts       # Path management (TODO)
│   └── CardSystem.ts       # Card system (TODO)
├── entities/        # Game entities (TODO)
└── utils/           # Utility functions
```

## 🎯 Current Implementation Status

### ✅ Completed
- Project setup with Vite + React + TypeScript
- TailwindCSS configuration with cyberpunk theme
- Complete TypeScript type system
- All constant definitions (Towers, Enemies, Buildings)
- Zustand game store with full GameState
- Grid/Tile management system
- Basic canvas rendering setup
- Input handling (mouse and keyboard)
- UI components (HUD, BuildMenu)

### 🚧 TODO (Implementation Needed)
- Combat system (tower targeting, damage calculation)
- Wave generation and enemy spawning
- Enemy AI and movement
- Path system (expansion, splitting)
- Card system (drawing, applying effects)
- Support buildings (mana generation, research labs)
- Projectile system
- Visual effects and particles
- Sound system
- Meta-progression (XP, permanent upgrades)

## 📖 Documentation

See `/docs` for complete game design documentation:

- **GAME_DESIGN.md** - Core mechanics and game loop
- **TOWERS.md** - Tower system (15 tower types)
- **ENEMIES.md** - Enemy system (25+ enemy types)
- **CARDS.md** - Card upgrade system
- **MAP_SYSTEM.md** - Procedural map generation
- **SUPPORT_BUILDINGS.md** - Support building system
- **META_PROGRESSION.md** - XP and permanent upgrades
- **UI_LAYOUT.md** - HUD and UI design
- **VISUAL_DESIGN.md** - Cyberpunk art direction

## 🎨 Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Zustand** - State management
- **TailwindCSS** - Styling
- **HTML5 Canvas** - Game rendering

## 🔧 Development

### Controls
- **WASD / Arrow Keys** - Pan camera
- **Spacebar** - Center on base
- **Click** - Select tile/tower
- **ESC** - Pause

### Architecture

The game uses a clean separation of concerns:
- **Store** - Zustand for global game state
- **Systems** - Pure functions for game logic
- **Components** - React for UI rendering
- **Canvas** - Custom renderer for game visuals

## 📝 License

This project is part of a game development exercise.

## 🎯 Next Steps

1. Implement CombatSystem (tower targeting and firing)
2. Implement WaveSystem (enemy spawning)
3. Implement PathSystem (enemy movement)
4. Add projectile rendering
5. Implement CardSystem
6. Add visual effects
7. Polish and balance

---

Built with ⚡ by Claude Code
