# Meta-Progression System - XP & Permanent Upgrades

## 📊 XP System Overview

### Earning XP per Run

```typescript
interface MetaProgression {
  totalXP: number;              // All-time XP earned
  spentXP: number;              // XP spent on upgrades
  availableXP: number;          // Unspent XP
  unlockedCards: string[];      // Permanent card unlocks
  permanentBuffs: {
    startingGold: number;
    startingMana: number;
    baseHealth: number;
    maxTowers: number;
    // ... etc
  };
}

function calculateXPGain(wave: number, difficulty: number): number {
  // Base formula: (Wave × (Wave + 1) × Difficulty) / 2
  let xp = (wave * (wave + 1) * difficulty) / 2;

  // Bonus for new record
  if (wave > highestWaveSurvived) {
    const recordBonus = (wave - highestWaveSurvived) * 10;
    xp += recordBonus;
  }

  // Bonus for completing run
  if (wave >= 45) {
    const winBonus = difficulty === 1 ? 450 :
                     difficulty === 2 ? 900 :
                     difficulty === 3 ? 1350 : 0;
    xp += winBonus;
  }

  return xp;
}
```

### XP Gain Examples

#### Wave-Based XP (Normal gain, no record, no win)
```
Wave 5, Single Defense:
  XP = (5 × 6 × 1) / 2 = 15 XP

Wave 10, Double Defense:
  XP = (10 × 11 × 2) / 2 = 110 XP

Wave 20, Triple Defense:
  XP = (20 × 21 × 3) / 2 = 630 XP

Wave 45, Single Defense:
  XP = (45 × 46 × 1) / 2 = 1035 XP
```

#### Record Bonus XP
```
Record: Wave 12 (new personal best)
  Base XP = (12 × 13 × 1) / 2 = 78 XP
  Record Bonus = (12 - 10) × 10 = 20 XP
  Total = 98 XP
```

#### Win Bonus XP
```
Complete Wave 45, Single Defense:
  Base XP = 1035
  Win Bonus = 450
  Total = 1485 XP

Complete Wave 45, Double Defense:
  Base XP = 2070
  Win Bonus = 900
  Total = 2970 XP

Complete Wave 45, Triple Defense:
  Base XP = 3105
  Win Bonus = 1350
  Total = 4455 XP
```

### Difficulty Multiplier Scaling
```
Single Defense:   1.0x XP (baseline)
Double Defense:   2.0x XP (twice as hard)
Triple Defense:   3.0x XP (triple as hard)

Example:
- Wave 30 Single: (30 × 31 × 1) / 2 = 465 XP
- Wave 30 Double: (30 × 31 × 2) / 2 = 930 XP
- Wave 30 Triple: (30 × 31 × 3) / 2 = 1395 XP
```

## 🌳 Permanent Upgrade Tree

### Tier 1: Starter Upgrades (5-15 XP)

#### Starting Credits
- **ID:** start_gold_1
- **Cost:** 5 XP
- **Effect:** +100 starting credits
- **Max Level:** 5 (+500 total)
- **Description:** "Start with more credits each run"

#### Base Health
- **ID:** base_health_1
- **Cost:** 10 XP
- **Effect:** +1 max base HP
- **Max Level:** 10 (+10 total)
- **Description:** "Core Integrity - Increase base maximum HP"

#### Tower Slots
- **ID:** tower_slots_1
- **Cost:** 15 XP
- **Effect:** Can build 11 towers (1 extra)
- **Max Level:** 5 (total 15 towers)
- **Description:** "Network Expansion I"
- **Prerequisites:** base_health_1

#### Mana Start
- **ID:** mana_start_1
- **Cost:** 10 XP
- **Effect:** +25 starting mana
- **Max Level:** 4 (+100 total)
- **Description:** "Power Reserve - Start with mana"

### Tier 2: Mid-Game Upgrades (50-150 XP)

#### Card Draw Unlock
- **ID:** card_draw_unlock
- **Cost:** 100 XP
- **Effect:** Unlocks "Enhanced Analysis" card in pool
- **Description:** "Advanced Analysis - Unlock card draw frequency upgrade"
- **Prerequisites:** start_gold_1

#### Mana Efficiency
- **ID:** mana_efficiency
- **Cost:** 100 XP
- **Effect:** All towers use 10% less mana
- **Description:** "Power Optimization"
- **Prerequisites:** mana_start_1

#### Economy Boost
- **ID:** economy_boost_1
- **Cost:** 75 XP
- **Effect:** +1 gold per kill
- **Max Level:** 3 (+3 gold total)
- **Description:** "Black Market Connections I"

#### Tower Health
- **ID:** tower_health_1
- **Cost:** 75 XP
- **Effect:** All towers start with +10 HP
- **Description:** "Reinforced Construction"

#### Research Lab Unlock
- **ID:** research_unlock
- **Cost:** 125 XP
- **Effect:** Research Labs always spawn at base
- **Description:** "Data Infrastructure"
- **Prerequisites:** tower_health_1

### Tier 3: Advanced Upgrades (200-500 XP)

#### Unlock All T1 Towers
- **ID:** unlock_all_t1
- **Cost:** 300 XP
- **Effect:** Rail Gun + Rocket Pod + Tesla Coil start unlocked
- **Description:** "Standard Arsenal - Begin with basic towers"

#### Mana Generation
- **ID:** mana_generation_1
- **Cost:** 150 XP
- **Effect:** Base mana regen +1.0/second
- **Max Level:** 2 (+2 total)
- **Description:** "Power Generation I"
- **Prerequisites:** mana_start_1

#### Wave Speed Up
- **ID:** wave_speed_1
- **Cost:** 100 XP
- **Effect:** Build phase 10 seconds shorter
- **Description:** "Faster Deployment"
- **Prerequisites:** tower_slots_1

#### Prestige System
- **ID:** prestige
- **Cost:** 0 XP (special)
- **Effect:** Reset all progress, unlock cosmetics
- **Description:** "Prestige Reset - Start fresh for prestige points"
- **Special:** Repeatable, grants prestige ranks

### Tier 4: Late-Game Upgrades (500+ XP)

#### Double Cards Draw
- **ID:** card_double_draw
- **Cost:** 500 XP
- **Effect:** Draw 6 cards instead of 3
- **Prerequisites:** card_draw_unlock
- **Description:** "Data Overflow - More card options"

#### Ultimate Arsenal
- **ID:** unlock_all_advanced
- **Cost:** 500 XP
- **Effect:** All non-boss towers start unlocked
- **Description:** "Complete Arsenal - All towers available from start"
- **Prerequisites:** unlock_all_t1

#### Base Fortress
- **ID:** base_fortress
- **Cost:** 400 XP
- **Effect:** Base starts with +25 HP (cumulative with base_health)
- **Description:** "Fortress Protocol - Hardened base"
- **Prerequisites:** base_health_1 × 5

#### Infinite Towers
- **ID:** tower_unlimited
- **Cost:** 750 XP
- **Effect:** Can build unlimited towers (no cap)
- **Description:** "Unrestricted Network"
- **Prerequisites:** tower_slots_1 × 5

## 💰 Upgrade Economics

### Early Game Path (0-200 XP)
```
Run 1 (Wave 10): 55 XP earned
  → Buy: start_gold_1 (5 XP) → 50 XP left
  → Buy: base_health_1 (10 XP) → 40 XP left
  → Save 40 XP for next upgrade

Run 2 (Wave 15): 120 XP earned
  → Current: 40 XP + 120 XP = 160 XP
  → Buy: start_gold_1 Level 2 (5 XP) → 155 XP
  → Buy: mana_start_1 (10 XP) → 145 XP
  → Buy: tower_slots_1 (15 XP) → 130 XP
  → Save 130 XP
```

### Mid Game Path (200-500 XP)
```
Run 10 (Wave 25): 650 XP earned
  → Current: 200 XP + 650 XP = 850 XP
  → Buy: unlock_all_t1 (300 XP) → 550 XP
  → Buy: card_draw_unlock (100 XP) → 450 XP
  → Buy: mana_efficiency (100 XP) → 350 XP
  → Save 350 XP for late game
```

### Late Game Path (500+ XP)
```
Run 20 (Wave 45 Win): 2970 XP earned
  → Current: 500 XP + 2970 XP = 3470 XP
  → Buy: unlock_all_advanced (500 XP) → 2970 XP
  → Buy: card_double_draw (500 XP) → 2470 XP
  → Buy: ultimate_arsenal (500 XP) → 1970 XP
  → Save 1970 XP for cosmetics/prestige
```

## 📈 Optimal Upgrade Order

### Recommended Progression Path

**Early Priority (Waves 1-15):**
1. start_gold_1 (5 XP) - Essential economy boost
2. base_health_1 (10 XP) - Survival is key
3. mana_start_1 (10 XP) - Enables mana towers
4. tower_slots_1 (15 XP) - More tower variety

**Mid Priority (Waves 16-30):**
5. economy_boost_1 (75 XP) - Scale income
6. card_draw_unlock (100 XP) - Unlock powerful cards
7. mana_efficiency (100 XP) - Reduce mana pressure
8. research_unlock (125 XP) - Passive damage boost

**Late Priority (Waves 31+):**
9. unlock_all_t1 (300 XP) - Faster starts later
10. mana_generation_1 (150 XP) - More mana for late game
11. card_double_draw (500 XP) - Better card selection
12. unlock_all_advanced (500 XP) - Complete arsenal

## 🎯 Strategic Considerations

### Early Game Focus
- Get starting gold upgrade for better tower economy
- Invest in base health for safety
- Mana start helps with Tesla/Cryo builds

### Mid Game Focus
- Tower slots enable more complex builds
- Card draw unlock is critical for long runs
- Mana efficiency reduces resource tension

### Late Game Focus
- Unlock all towers for maximum flexibility
- Double card draw gives better option selection
- Prestige for cosmetics after mastery

## 👑 Prestige System

### Prestige Reset
- **Cost:** None (automatic after completing wing)
- **Effect:** Resets all XP/upgrades to 0
- **Gain:** +1 Prestige Point per reset
- **Cosmetics:** Unlock cosmetic items with prestige points

### Prestige Levels
```
Prestige 0: Default appearance
Prestige 1: Bronze border/effects
Prestige 5: Silver effects/particles
Prestige 10: Gold cosmetics
Prestige 20: Platinum tier
Prestige 50: Godlike status/titles
```

### Strategy
- Grind to 5000 XP → Complete full run
- Reset for prestige point → Start fresh
- Repeat for cosmetics and bragging rights
- Not necessary for gameplay, purely cosmetic

## 📊 XP Curves by Run

### Single Defense (Baseline)
```
Wave 5:   15 XP
Wave 10:  55 XP
Wave 15:  120 + 450 (win) = 570 XP
Wave 20:  210 XP
Wave 25:  325 + 450 = 775 XP
Wave 30:  465 XP
Wave 35:  630 + 450 = 1080 XP
Wave 45:  1035 + 450 = 1485 XP (full win!)
```

### Double Defense (2x Multiplier)
```
Wave 10:  110 XP
Wave 15:  240 + 900 (win) = 1140 XP
Wave 20:  420 XP
Wave 25:  650 + 900 = 1550 XP
Wave 30:  930 XP
Wave 45:  2070 + 900 = 2970 XP (full win!)
```

### Triple Defense (3x Multiplier)
```
Wave 10:  165 XP
Wave 15:  360 + 1350 (win) = 1710 XP
Wave 20:  630 XP
Wave 25:  975 + 1350 = 2325 XP
Wave 30:  1395 XP
Wave 45:  3105 + 1350 = 4455 XP (full win!)
```

## 💾 Upgrade Persistence

### Global Persistence
- All upgrades persist across runs
- XP is global account-level resource
- Cannot lose upgrades or XP

### Per-Run Independence
- Each run starts fresh with purchased upgrades
- Unlocked towers from cards don't persist to next run
- Card draw upgrades activate immediately
- Permanent buff upgrades apply to next run

### Example Flow
```
Run 1:
  - Earn 100 XP
  - Buy: start_gold_1 (5 XP)
  - Run 1 ends with starting gold bonus

Run 2:
  - Start with 95 XP available
  - Previous run's starting gold bonus applies!
  - Earn 150 XP
  - Buy: base_health_1 (10 XP)
  - Run 2 ends

Run 3:
  - Start with 235 XP available
  - Both previous upgrades apply!
  - Continue building upgrade tree
```

## 🔄 Daily/Weekly Goals

### Suggested Progression
- **Week 1:** Reach Wave 15, earn 500 XP
- **Week 2:** Reach Wave 20, earn 1000 XP total
- **Week 3:** Reach Wave 30, earn 2000 XP total
- **Week 4:** Complete full run, earn 3500+ XP total

### Playstyle Milestones
- **Casual:** Focus on enjoying game, farm 50 XP/run avg
- **Regular:** Consistent 25+ wave runs, 200 XP/run avg
- **Hardcore:** Chase 45-wave wins, 1000+ XP/run avg
- **Prestige:** Reset for cosmetics, min 2000 XP/run

## ⚙️ Implementation Notes

### XP Display
- Show earned XP at run end
- Display total XP balance in menu
- Show upgrade costs and effects
- Allow queuing multiple upgrades

### Unlock Notifications
- Notify when new upgrade tier unlocks
- Show card draw frequency improvement
- Alert when prestige points earned
- Display cosmetic unlock milestone

### Edge Cases
- Dying at Wave 1: Still earn 0 XP (safety against accidental resets)
- Forfeiting mid-run: Calculate XP based on waves survived
- Prestige reset: Clear all upgrades, refund no XP
- Game crash: Autosave before wave end to preserve XP
