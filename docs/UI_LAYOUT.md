# UI/UX Layout - HUD & Menus

## 📱 Main Game HUD

### HUD Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│ NEON DEFENSE  🔧 ⏸ PAUSE │ 🔊 SOUND                        │
├─────────────────────────────────────────────────────────────┤
│ Wave: 12/45                 │ Time: 2:34 Build Phase       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                       [GAME VIEW]                           │
│                                                             │
│                    (Isometric Map Display)                  │
│                                                             │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  [📊 TOWERS 9/10] [💰 GOLD 2,450] [⚡ MANA 45/100]         │
│  [🎯 EXPAND] [▶ NEXT WAVE (5s)] [❌ SURRENDER]             │
├─────────────────────────────────────────────────────────────┤
│ [Build Tower] [Upgrade] [Demolish] [View Research]         │
└─────────────────────────────────────────────────────────────┘
```

### Top HUD Bar (Game State)

```
LEFT SIDE:
├─ Game Title: "NEON DEFENSE"
└─ Currently hidden/minimized on gameplay

CENTER:
├─ Wave Display: "WAVE 12/45"
├─ Phase Display: "Build Phase" or "Combat Phase" or "Expansion"
└─ Timer: "2:34" (remaining time in phase)

RIGHT SIDE:
├─ Settings Icon 🔧 (opens pause menu)
├─ Sound Icon 🔊 (toggles sound on/off)
└─ Spacer
```

### Bottom HUD Bar (Resources)

```
LEFT SECTION (Resources):
├─ Tower Icon 🏰 + Count: "TOWERS 9/10"
├─ Building Icon 🏢 + Count: "BUILDINGS 3/Unlimited"
└─ Spacing: 20px between items

CENTER SECTION (Core Resources):
├─ Credits Icon 💰 + Amount: "GOLD 2,450"
├─ Mana Icon ⚡ + Bar: "MANA 45/100" with visual bar
└─ Health Icon ❤️ + Bar: "BASE 25/30" (if damaged)

RIGHT SECTION (Action Buttons):
├─ [🎯 EXPAND] - Only in Expansion Phase (green when active)
├─ [▶ NEXT WAVE] - With countdown timer
└─ [❌ SURRENDER] - End run early
```

### Build Menu (Bottom Panel)

```
╔═════════════════════════════════════════╗
║ AVAILABLE TOWERS & BUILDINGS            ║
╠═════════════════════════════════════════╣
║                                         ║
║ Rail Gun                              ║
║ [🏰] 10 💰  Damage: 10  Range: 5     ║
║ Single-target precision weapon.        ║
║ [SELECT]                               ║
║                                         ║
║ Rocket Pod                             ║
║ [🏰] 200 💰  Damage: 20  Range: 10   ║
║ AoE explosions with travel time.      ║
║ [SELECT]                               ║
║                                         ║
║ Tesla Coil                             ║
║ [⚡] 200 💰 [5⚡/shot]                  ║
║ Hits all enemies in short range.      ║
║ [SELECT]                               ║
║                                         ║
║ [SUPPORT BUILDINGS]                    ║
║ Power Siphon (100 💰)  Energy Bank...  ║
║                                         ║
╚═════════════════════════════════════════╝
```

### Tower Targeting Priority Panel

```
╔════════════════════════════════════════╗
║ TOWER: Rail Gun #3 (Level 2)          ║
╠════════════════════════════════════════╣
║ Position: (5, 7)                       ║
║ Damage: 15 (12 base + 3 lvl bonus)    ║
║ Range: 5 tiles                         ║
║ XP: Health 45%, Armor 30%, Shield 0%  ║
║                                        ║
║ TARGETING PRIORITY:                    ║
║ 1st Priority: [PROGRESS ▼]             ║
║ 2nd Priority: [NEAR_DEATH ▼]          ║
║ 3rd Priority: [SLOWEST ▼]             ║
║                                        ║
║ [SET] [CLEAR] [DELETE TOWER] [CLOSE] ║
╚════════════════════════════════════════╝
```

### Resource Display Details

#### Credits Bar
```
[💰 GOLD 2,450]

Visual:
├─ Icon: 💰 (bright green)
├─ Number: Large, bright green text
├─ Earned this wave: "+45" in smaller text below
└─ Format: Thousands separator (2,450 not 2450)

Interactions:
├─ Click to see breakdown of gold sources
├─ Hover shows spending capacity
└─ Critical alert if below minimum for towers
```

#### Mana Bar
```
[⚡ MANA 45/100]

Visual:
├─ Icon: ⚡ (bright blue)
├─ Number: "45/100" with bar underneath
├─ Bar: 45% filled (blue)
├─ Regenerating: Animated fill animation
└─ Format: Current/Maximum

Interactions:
├─ Click for mana generator info
├─ Hover shows mana-consuming towers
├─ Warning when below 20
└─ Critical alert at 0
```

#### Tower Count
```
[🏰 TOWERS 9/10]

Visual:
├─ Icon: 🏰 (cyan)
├─ Count: "9/10" (white/green when space available, red when full)
└─ Format: Current/Maximum

Interactions:
├─ Click to see all towers list
├─ Shows tower types and levels
└─ Warning when only 1 slot remaining
```

## 🎮 Phase-Specific UI

### Build Phase UI

```
PHASE HEADER: "BUILD PHASE - 60 seconds remaining"

VISIBLE ELEMENTS:
├─ Build menu (tower/building selector)
├─ Resource bars (full size)
├─ Existing towers (interactive, can select)
├─ [🎯 EXPAND] button (disabled)
├─ [▶ NEXT WAVE] button (active, countdown)
└─ [SELECT TOWER] panel appears when tower clicked

DISABLED ELEMENTS:
├─ Expand button (grayed out, explains "available after combat")
├─ Cannot place towers in combat zones
└─ Cannot sell towers during build (can pause to manage)
```

### Combat Phase UI

```
PHASE HEADER: "COMBAT PHASE - Wave 12 Active"

VISIBLE ELEMENTS:
├─ Combat display (minimal UI)
├─ Enemy count: "Enemies: 23/35"
├─ Combat timer: "1:45 elapsed"
├─ Resource bars (read-only, no building)
├─ Towers firing (visual feedback)
├─ Slow-motion control (if available)
└─ [⏸ PAUSE] button (can pause to plan)

DISABLED ELEMENTS:
├─ Build menu (grayed out)
├─ [🎯 EXPAND] button
├─ [NEXT WAVE] button
└─ Tower selection (read-only if selected)

HIDDEN ELEMENTS:
├─ Tower targeting panels
└─ Building UI
```

### Expansion Phase UI

```
PHASE HEADER: "EXPANSION PHASE - Choose Direction"

VISIBLE ELEMENTS:
├─ Map view centered on last path endpoint
├─ [⬆️ NORTH] button (highlights new tiles)
├─ [⬅️ WEST]  button
├─ [➡️ EAST]  button
├─ [⬇️ SOUTH] button
├─ Preview of new tiles (grayed out)
├─ Preview of potential portal location
└─ [CONFIRM EXPANSION] button (after selection)

INTERACTION:
├─ Click direction to preview
├─ Visual shows new tiles + features spawned
├─ [CONFIRM] to finalize
└─ After: Automatic return to Build Phase
```

### Card Draw Phase UI

```
╔════════════════════════════════════════════════════════════╗
║                      CARD DRAW - CHOOSE 1                  ║
╠════════════════════════════════════════════════════════════╣
║                                                            ║
║  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   ║
║  │              │  │              │  │              │   ║
║  │  UNCOMMON    │  │   COMMON     │  │    EPIC      │   ║
║  │              │  │              │  │              │   ║
║  │ Cryo Trap    │  │ Rail Gun     │  │ Card Draw    │   ║
║  │ Unlock       │  │ Health Dmg   │  │ Frequency    │   ║
║  │              │  │              │  │              │   ║
║  │ Unlock tower │  │ +1 Health    │  │ Draw every   │   ║
║  │ Cryo Trap    │  │ multiplier   │  │ wave instead │   ║
║  │ (slowing)    │  │ for railgun  │  │ of every 3   │   ║
║  │              │  │              │  │              │   ║
║  │ [SELECT]     │  │ [SELECT]     │  │ [SELECT]     │   ║
║  └──────────────┘  └──────────────┘  └──────────────┘   ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝

Card Details (on hover):
├─ Full description
├─ Prerequisites (if any)
├─ Effect values
├─ Synergies with unlocked cards
└─ Rarity explanation
```

## 📊 Pause Menu

### Main Pause Screen

```
╔════════════════════════════════════════╗
║          GAME PAUSED                   ║
║          WAVE 12/45 - Build Phase      ║
╠════════════════════════════════════════╣
║                                        ║
║ Current Stats:                         ║
║ ├─ Wave: 12/45                         ║
║ ├─ Base HP: 25/30                      ║
║ ├─ Gold: 2,450                         ║
║ ├─ Towers: 9/10                        ║
║ └─ Time Elapsed: 5:47                  ║
║                                        ║
║ [RESUME] [RESTART] [SURRENDER]         ║
║ [SETTINGS] [HELP] [MAIN MENU]          ║
║                                        ║
╚════════════════════════════════════════╝
```

### Settings Panel

```
╔════════════════════════════════════════╗
║              SETTINGS                  ║
╠════════════════════════════════════════╣
║                                        ║
║ SOUND:                                 ║
║ Master Volume: [████░░] 80%            ║
║ Music:         [██████░] 90%           ║
║ SFX:           [█████░░] 80%           ║
║                                        ║
║ VISUAL:                                ║
║ Particle Effects: [ON] [OFF]           ║
║ Screen Shake:     [ON] [OFF]           ║
║ Bloom/Glow:       [ON] [OFF]           ║
║ Motion Blur:      [ON] [OFF]           ║
║                                        ║
║ GAMEPLAY:                              ║
║ Difficulty: [SINGLE] [DOUBLE] [TRIPLE]║
║ Auto-Pause on Wave End: [ON]  [OFF]   ║
║ Tower Targetin Hints: [ON]  [OFF]     ║
║                                        ║
║ [APPLY] [RESET TO DEFAULT] [BACK]     ║
║                                        ║
╚════════════════════════════════════════╝
```

## 🏆 End Run Summary Screen

### Victory Screen (Wave 45 Complete)

```
╔══════════════════════════════════════════════════╗
║                  YOU WIN! 🎉                     ║
║              NEXUS CORE DEFEATED                 ║
╠══════════════════════════════════════════════════╣
║                                                  ║
║ RUN STATISTICS:                                  ║
║ ├─ Wave Reached: 45/45 ✓                         ║
║ ├─ Difficulty: DOUBLE DEFENSE (2.0x)            ║
║ ├─ Run Duration: 47m 23s                         ║
║ ├─ Total Gold Earned: 12,450                     ║
║ ├─ Towers Built: 14                              ║
║ ├─ Enemies Defeated: 2,145                       ║
║ └─ Base Final HP: 8/30                           ║
║                                                  ║
║ XP EARNED:                                       ║
║ ├─ Base: 2,070 XP (wave scaling)                 ║
║ ├─ Win Bonus: 900 XP (Double Defense)            ║
║ └─ Total: 2,970 XP ⬆️                            ║
║                                                  ║
║ AVAILABLE XP: 5,420 (was 2,450)                  ║
║                                                  ║
║ [CLAIM REWARD] [VIEW STATS] [RESTART] [MENU]    ║
║                                                  ║
╚══════════════════════════════════════════════════╝
```

### Defeat Screen (Base Destroyed)

```
╔══════════════════════════════════════════════════╗
║                   YOU LOST 💔                    ║
║                WAVE 23 - BASE DESTROYED         ║
╠══════════════════════════════════════════════════╣
║                                                  ║
║ RUN STATISTICS:                                  ║
║ ├─ Wave Reached: 23/45                           ║
║ ├─ Difficulty: SINGLE DEFENSE (1.0x)             ║
║ ├─ Run Duration: 12m 45s                         ║
║ ├─ Total Gold Earned: 3,210                      ║
║ ├─ Towers Built: 8                               ║
║ ├─ Enemies Defeated: 487                         ║
║ └─ Base Final HP: 0/30 (DESTROYED)               ║
║                                                  ║
║ XP EARNED:                                       ║
║ ├─ Base: 253 XP (wave scaling)                   ║
║ ├─ Record Bonus: 30 XP (Beat previous!)          ║
║ └─ Total: 283 XP ⬆️                              ║
║                                                  ║
║ AVAILABLE XP: 2,733 (was 2,450)                  ║
║                                                  ║
║ [CLAIM REWARD] [RETRY] [RESTART] [MENU]         ║
║                                                  ║
╚══════════════════════════════════════════════════╝
```

## 💾 Meta-Progression Screen

### Upgrade Shop

```
╔══════════════════════════════════════════════════╗
║          UPGRADE SHOP - XP: 2,733                ║
╠══════════════════════════════════════════════════╣
║                                                  ║
║ TIER 1 - STARTER UPGRADES                        ║
║                                                  ║
║ ✓ Starting Credits I       [5 XP]  OWNED        ║
║ ✓ Starting Credits II      [5 XP]  OWNED        ║
║   Starting Credits III     [5 XP]  [BUY]        ║
║                                                  ║
║ ✓ Base Health I           [10 XP]  OWNED        ║
║   Base Health II          [10 XP]  [BUY]        ║
║                                                  ║
║ TIER 2 - MID-GAME UPGRADES                       ║
║                                                  ║
║   Card Draw Unlock        [100 XP] [BUY]        ║
║   Description: Unlock card draw frequency...    ║
║                                                  ║
║   Mana Start I            [10 XP]  [BUY]        ║
║                                                  ║
║ [UPGRADE SELECTED] [RESET] [BACK]                ║
║                                                  ║
╚══════════════════════════════════════════════════╝
```

## 📋 Main Menu

### Start Screen

```
╔════════════════════════════════════════════════════════╗
║                                                        ║
║                    NEON DEFENSE                        ║
║          Tower Defense + Roguelite Hybrid              ║
║                                                        ║
║                                                        ║
║              [START NEW GAME]                          ║
║              [CONTINUE LAST RUN]                       ║
║              [SELECT DIFFICULTY]                       ║
║                  ├─ Single Defense (1.0x)              ║
║                  ├─ Double Defense (2.0x)              ║
║                  └─ Triple Defense (3.0x)              ║
║                                                        ║
║              [UPGRADES & PROGRESSION]                  ║
║              [SETTINGS]                                ║
║              [HELP & TUTORIAL]                         ║
║              [CREDITS]                                 ║
║                                                        ║
║                    [EXIT GAME]                         ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
```

## 🎯 Interaction Patterns

### Tower Selection
```
1. Click on tower on map
2. Panel appears with tower info
3. Can set priorities via dropdown
4. Can upgrade tower (if gold available)
5. Can sell tower (refunds % of cost)
6. Click away to deselect
```

### Building Placement
```
1. Click "Build" in menu or [B] hotkey
2. Choose building type
3. Click on valid terrain tile
4. Building placed, cost deducted
5. Building immediately active
6. Can select to view/upgrade
```

### Map Navigation
```
1. WASD or Arrow keys to pan
2. Mouse scroll wheel to zoom
3. Click-drag to pan camera
4. Spacebar centers on base
5. TAB cycles through towers
6. E to expand (when available)
```

## 🎮 Keyboard Controls

### Main Game
```
[SPACE]  - Center camera on base
[W/↑]    - Pan up
[A/←]    - Pan left
[S/↓]    - Pan down
[D/→]    - Pan right
[SCROLL] - Zoom in/out
[TAB]    - Cycle through towers
[B]      - Open build menu
[E]      - Expand map (if available)
[N]      - Next wave
[X]      - Surrender run
[P]      - Pause
[ESC]    - Pause/Unpause
```

### Tower Management
```
[1-9]    - Quick select tower slot
[Q]      - Sell selected tower
[U]      - Upgrade selected tower
[T]      - Set tower targeting
[L]      - Show tower level details
[R]      - Reset tower targeting
```

### UI Navigation
```
[ESC]    - Close menu/dialog
[ENTER]  - Confirm selection
[TAB]    - Cycle through UI elements
[H]      - Toggle help text
[?]      - Open help menu
```

## 📱 Responsive Design

### Desktop (1920×1080)
```
Full HUD display
Detailed tower panels
Complete build menu
Expansion map preview
```

### Laptop (1366×768)
```
Compressed HUD
Hidden tower details (on hover)
Collapsed build menu
Minimal expansion preview
```

### Tablet (1024×768)
```
Simplified UI
Touch-optimized buttons
Stacked layout
Scrollable panels
```

## ♿ Accessibility Features

### Text & Fonts
- Monospace font improves readability
- Minimum 14px for UI text
- All text has sufficient contrast (>4.5:1)
- No text-only instructions

### Color Blindness
- Cyan/Magenta as primary distinction (colorblind-safe)
- Icons + text labels always
- Patterns/textures supplement colors
- Settings to enable colorblind mode

### Motor Control
- All buttons keyboard accessible
- Tab key cycles through interactive elements
- Mouse & keyboard both fully supported
- Button target size: minimum 44×44px

### Audio
- All audio has visual equivalent
- Sound warnings for critical events
- Option to disable sound completely
- Closed captions for future dialog
