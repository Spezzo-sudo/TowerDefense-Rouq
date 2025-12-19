# Neon Defense - Game Design Documentation

## 📋 Overview

**Neon Defense** is a Tower Defense + Roguelite hybrid game with a cyberpunk aesthetic, designed for web browsers using React and TypeScript.

- **Genre:** Tower Defense + Roguelite
- **Plattform:** Web Browser
- **Target Audience:** Tower Defense & Roguelite fans
- **Game Duration:** 30-60 minutes per run
- **Core Loop:** Survive waves → Expand map → Upgrade towers → Meta-progression

## 📚 Documentation Structure

This documentation is organized into the following sections:

### Core Systems
- **[GAME_DESIGN.md](./GAME_DESIGN.md)** - Core gameplay mechanics, win conditions, and game loop
- **[MAP_SYSTEM.md](./MAP_SYSTEM.md)** - Procedural map generation, path system, and expansion mechanics
- **[TOWERS.md](./TOWERS.md)** - Complete tower system with 15+ tower types and mechanics

### Gameplay Elements
- **[ENEMIES.md](./ENEMIES.md)** - Enemy system with 25+ enemy types across 4 phases
- **[SUPPORT_BUILDINGS.md](./SUPPORT_BUILDINGS.md)** - Support buildings and University/Research Lab system
- **[CARDS.md](./CARDS.md)** - Card draw system, upgrades, and unlocks

### Progression
- **[META_PROGRESSION.md](./META_PROGRESSION.md)** - XP system, permanent upgrades, and progression trees

### Polish & Presentation
- **[VISUAL_DESIGN.md](./VISUAL_DESIGN.md)** - Cyberpunk art direction, color palette, and visual guidelines
- **[UI_LAYOUT.md](./UI_LAYOUT.md)** - HUD layout and user interface design

## 🎯 Key Features

### Dynamic Gameplay
- **Procedural Map Expansion** - Map grows and evolves as you expand in different directions
- **Path Splitting** - Paths can split into multiple directions (0-4 simultaneous paths)
- **Wave-based Combat** - 45 waves total with boss waves at 15, 25, 35, and 45

### Deep Tower System
- **15 Unique Tower Types** - Each with distinct mechanics and upgrade paths
- **3-Layer Damage System** - Health, Armor, and Shield pools with type-specific multipliers
- **XP & Leveling** - Towers gain experience and level up independently
- **Status Effects** - Bleed, Burn, and Poison apply damage-over-time effects

### Strategic Depth
- **3-Card Upgrade System** - Choose 1 of 3 random upgrades every few waves
- **Tower Prioritization** - Set targeting priorities for each tower
- **Support Buildings** - Generate resources and provide passive bonuses
- **University System** - Research labs provide dynamic buffs each wave

### Meta-Progression
- **XP-Based Unlocks** - Permanent upgrades earned across runs
- **Upgrade Tree** - Progression path from starter towers to legendary builds
- **Card Pool Growth** - Unlock new cards to improve future runs
- **Multiple Difficulties** - Single/Double/Triple Defense modes

## 🎮 Quick Start Guide

### Building Phase
1. Place towers using available credits
2. Choose tower targeting priorities
3. Upgrade towers with multipliers and special abilities
4. Build support buildings for passive bonuses

### Combat Phase
1. Start the wave
2. Enemies spawn from portals
3. Towers attack automatically
4. Collect gold from kills
5. Wave ends when all enemies defeated

### Expansion Phase
1. Click the "Expand" button
2. Choose direction (North/East/South/West)
3. 1-3 new tiles are revealed
4. Map features may spawn (crystals, shrines, etc.)

### Card Draw
1. Every 3 waves, draw 3 random cards
2. Select 1 card to apply permanently
3. Cards can unlock towers or apply upgrades
4. Card pool grows as you unlock more

## 🏆 Win Condition

**Survive Wave 45** - Defeat the NEXUS CORE boss to win the run

Each difficulty level provides different XP multipliers for progression rewards.

## 📖 For Developers

Each documentation file contains:
- **Interfaces & Data Structures** - TypeScript interfaces for implementation
- **Mechanics Details** - How systems work and interact
- **Formulas & Calculations** - Exact algorithms for balance
- **Edge Cases** - Specific handling for unusual situations
- **Integration Notes** - How different systems connect

Use these documents as specifications for implementation. All code should follow the interfaces and mechanics described.
