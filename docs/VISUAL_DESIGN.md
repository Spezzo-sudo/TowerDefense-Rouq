# Visual Design - Cyberpunk Art Direction

## 🎨 Color Palette

### Primary Neon Colors

```css
:root {
  /* Main Neon Colors */
  --neon-cyan: #00ffff;       /* Bright cyan - Primary UI */
  --neon-magenta: #ff00ff;    /* Bright magenta - Secondary UI */
  --neon-pink: #ff0080;       /* Hot pink - Accents */
  --neon-blue: #0088ff;       /* Electric blue - Mana/Energy */
  --neon-green: #00ff00;      /* Lime green - Gold/Credits */
  --neon-orange: #ff6600;     /* Neon orange - Explosions/Damage */

  /* Background */
  --bg-dark: #0a0e27;         /* Very dark blue-gray */
  --bg-darker: #050810;       /* Almost black */
  --bg-panel: rgba(10, 14, 39, 0.95); /* Slightly transparent */

  /* Grid & Terrain */
  --grid-primary: #1a1f3a;    /* Dark blue for tiles */
  --grid-lines: rgba(0, 255, 255, 0.3);      /* Cyan grid lines */
  --grid-highlight: rgba(255, 0, 255, 0.5);  /* Magenta selection */

  /* Elevation Levels (getting lighter) */
  --elevation-0: #12162b;
  --elevation-1: #14182f;
  --elevation-2: #1a1f3a;
  --elevation-3: #222849;
  --elevation-4: #2a3258;
  --elevation-5: #323d68;
  --elevation-6: #3a4878;

  /* Paths */
  --path: #2a2f4f;            /* Dark blue path */
  --path-glow: rgba(0, 255, 255, 0.4); /* Cyan glow */

  /* UI Elements */
  --ui-border: #00ffff;
  --ui-text: #00ffff;
  --ui-text-dim: #0088aa;
  --ui-credits: #00ff00;      /* Green for gold */
  --ui-energy: #0088ff;       /* Blue for mana */

  /* Buttons */
  --button-bg: rgba(0, 255, 255, 0.1);
  --button-hover: rgba(0, 255, 255, 0.3);
  --button-active: rgba(0, 255, 255, 0.5);
  --button-border: #00ffff;

  /* HP Type Colors */
  --hp-health: #ff0044;       /* Red - Health */
  --hp-armor: #ffaa00;        /* Orange - Armor */
  --hp-shield: #0088ff;       /* Blue - Shield */

  /* Status Effects */
  --status-bleed: #ff0044;    /* Red - Bleed */
  --status-burn: #ff6600;     /* Orange - Burn */
  --status-poison: #00ff00;   /* Green - Poison */
  --status-slow: #0088ff;     /* Blue - Slow */

  /* Visual Effects */
  --laser-red: #ff0044;
  --laser-cyan: #00ffff;
  --explosion: #ff6600;
  --slow-blue: #0088ff;
  --burn-orange: #ff6600;
  --poison-green: #00ff00;
  --bleed-red: #ff0044;
}
```

## 🏗️ Visual Style Guide

### Terrain & Map

**Overall Aesthetic:** Low-poly isometric cyberpunk grid

```
Visual Elements:
├─ Grid System
│  ├─ Horisontal cyan lines (0.3 opacity)
│  ├─ Vertical cyan lines (0.3 opacity)
│  ├─ Line thickness: 1-2 pixels
│  └─ Glow effect on lines (soft cyan)
│
├─ Tile Types
│  ├─ PATH: Darker cyan with bright glow
│  ├─ TERRAIN: Dark blue-gray base color
│  ├─ BLOCKED: Slightly darker than terrain
│  └─ BASE: Bright cyan with pulsing glow
│
├─ Elevation
│  ├─ Height = darker to lighter progression
│  ├─ Elevation 0: Very dark (#12162b)
│  ├─ Elevation 6: Lighter (#3a4878)
│  ├─ Smooth color transitions
│  └─ Shadow gradients for depth
│
└─ Animations
   ├─ Grid pulse: 2-3 second cycle
   ├─ Path glow: Breathing animation
   ├─ Tile hover: +20% brightness
   └─ Selection: Magenta outline
```

### Map Features

**Visual Representation:**

```
Mana Crystal:
├─ Model: Floating crystal geometry
├─ Color: Bright blue (#0088ff)
├─ Animation: Slow rotation (360°/10s)
├─ Glow: Pulsing bright blue
├─ Height: Hovers 1-2 units above tile
└─ Particles: Slow cyan sparkles around it

House:
├─ Model: Small 3D house structure
├─ Color: Gray base with neon trim
├─ Animation: None (static)
├─ Lighting: Slight internal glow
└─ Variation: 3-4 different house designs

Iron Vein:
├─ Model: Rocky outcropping
├─ Color: Dark gray with metallic highlights
├─ Animation: Static with glinting effect
├─ Glow: Occasional orange sparkle
└─ Height: Slightly elevated (elevation +1)

Grave:
├─ Model: Cross or tombstone
├─ Color: Dark gray stone
├─ Animation: Eerie purple glow pulses
├─ Particle: Purple mist around it
└─ Vibe: Supernatural, ominous

Occult Shrine:
├─ Model: Futuristic shrine with symbols
├─ Color: Purple primary, cyan accents
├─ Animation: Symbols rotate around center
├─ Glow: Intense purple pulsing
├─ Particles: Purple/cyan energy swirls
└─ Vibe: Mysterious, powerful
```

### Towers

**Base Tower Style:** Futuristic weapon platforms with neon accents

```
Generic Tower Properties:
├─ Base: Metallic gray platform
├─ Weapon: Varies by type
├─ Accent: Neon glow in signature color
├─ Idle: Gentle pulsing glow (0.5 opacity)
├─ Active: Brighter pulsing (0.8 opacity)
└─ Height: Elevated on platform (elevation visible)

Tower Examples:

Rail Gun:
├─ Model: Sniper rifle on turret mount
├─ Color: Dark gray + cyan accents
├─ Idle: Cyan glow on targeting lens
├─ Firing: Bright cyan flash
├─ Projectile: Thin cyan tracer
└─ Audio: Sharp "ping" sound

Rocket Pod:
├─ Model: Multiple rocket launcher array
├─ Color: Dark gray + orange accents
├─ Idle: Orange warning lights pulse
├─ Firing: Bright orange muzzle flash
├─ Projectile: Orange trail with smoke
└─ Audio: Deep "whoosh" sound

Tesla Coil:
├─ Model: Tall coil structure
├─ Color: Gray + bright blue
├─ Idle: Gentle blue sparks
├─ Active: Arcs of electricity between points
├─ Firing: Lightning bolts (bright blue)
└─ Audio: Electric crackle and hum

Drone Bay:
├─ Model: Hexagonal hangar structure
├─ Color: Dark gray + magenta lights
├─ Idle: Magenta lights pulse
├─ Firing: Drones emerge with trail
├─ Drone: Cyan colored with propellers
└─ Audio: Mechanical hum + drone engine

Particle Beam:
├─ Model: Large cannon with reactor
├─ Color: Gray + bright cyan/magenta
├─ Idle: Reactor glows steadily
├─ Charging: Increasing intensity
├─ Firing: Massive cyan beam
└─ Audio: Building charge + laser sound
```

**Tower Leveling:**
```
Visual Feedback for Each Level:

Level 1: Base appearance
Level 2: 10% brighter neon accents
Level 3: 20% more glow intensity
...
Level 10: Very bright, intense glow
          └─ Holographic effect around tower
             └─ Transparency shimmer
                └─ Particle aura increases

Level 20+: Maximum visual impact
           └─ Intense glow with secondary color
              └─ Heavy particle effects
                 └─ Possible geometry detail increase

Level Up Animation:
├─ Burst of particles in tower color
├─ Brightness flash (1 second)
├─ +1 visual tier (glow intensity)
├─ Optional: Holographic shimmer effect
└─ Sound: "ding" + ascending tone
```

### Enemies

**Visual Design Philosophy:** Increasingly menacing as waves progress

```
Scout Drone (Wave 1):
├─ Model: Small triangular drone
├─ Color: Dark gray body + cyan accents
├─ Size: Small (0.5 unit)
├─ Animation: Smooth floating motion
├─ Trail: Light cyan glow
└─ HP Bar: Minimal (above head)

Assault Bot (Wave 4):
├─ Model: Cubic robot chassis
├─ Color: Dark gray + orange highlights
├─ Size: Medium (1 unit)
├─ Animation: Mechanical walking
├─ Trail: Orange glow around edges
└─ HP Bar: Above head with armor segment

Heavy Mech (Wave 10):
├─ Model: Large angular mech
├─ Color: Dark gray + magenta armor plating
├─ Size: Large (1.5 units)
├─ Animation: Heavy plodding walk
├─ Trail: Strong magenta glow
├─ HP Bar: Very large, 3 segments visible
└─ Armor: Metallic plating visible

Boss Enemies:
├─ Model: Dramatic imposing design
├─ Color: Neon primary + secondary colors
├─ Size: Very large (2+ units)
├─ Animation: Floating/hovering movement
├─ Trail: Strong glow in signature color
├─ Particles: Aura around boss
├─ HP Bar: Massive bar, very detailed
└─ Crown: Boss indicator above model

NEXUS CORE (Final Boss):
├─ Model: Massive crystalline structure
├─ Color: All neon colors (rainbow effect)
├─ Size: Dominates screen (3+ units)
├─ Animation: Ominous floating with rotation
├─ Trail: Multi-colored energy swirls
├─ Particles: Intense everywhere
├─ HP Bar: Split into 3 massive segments
├─ Aura: Pulsing colored fields
└─ Presence: Intimidating focal point
```

**Enemy HP Bars:**
```
Visuals:
├─ Position: Floating above enemy head
├─ Width: Scales with enemy size
├─ Height: ~20 pixels
├─ Border: Neon cyan outline
├─ Background: Dark semi-transparent

Segments (Left to Right):
├─ Shield Pool: Blue (#0088ff)
├─ Armor Pool: Orange (#ffaa00)
└─ Health Pool: Red (#ff0044)

Status Effects:
├─ Bleed: Red pulsing on health segment
├─ Burn: Orange flame effect on armor
├─ Poison: Green glow on whole bar
├─ Slow: Blue ice shards around bar
└─ Marked: Magenta aura around entire bar

Animation:
├─ Damage hit: Brief flash in damage color
├─ Segment depletion: Color fade-out
├─ Boss special: Glow increases with power-up
└─ Death: Shrinking animation + fade
```

### Projectiles

**Projectile Effects:**

```
Bullet (Rail Gun):
├─ Model: Thin fast projectile
├─ Color: Cyan (#00ffff)
├─ Trail: Thin cyan line
├─ Size: 1-2 pixels
├─ Speed: Very fast (4+ units/sec)
└─ Hit: Brief white flash + particle burst

Rocket (Rocket Pod):
├─ Model: Small rocket shape
├─ Color: Orange with gray body
├─ Trail: Orange smoke (thick)
├─ Size: 5-10 pixels
├─ Speed: Medium (3 units/sec)
├─ Travel: Visible arc trajectory
└─ Explosion: Orange burst with particles

Lightning (Tesla):
├─ Model: Branching electric arc
├─ Color: Cyan (#00ffff)
├─ Trail: None (instant)
├─ Width: 5-10 pixels (thick lines)
├─ Speed: Instant
├─ Branching: 2-3 secondary bolts
└─ Duration: Flicker effect (brief)

Laser (Particle Beam):
├─ Model: Continuous beam
├─ Color: Cyan with magenta core
├─ Width: 20-30 pixels
├─ Duration: While tower fires
├─ Glow: Bright aura around beam
├─ Hit: Area damage indication
└─ Travel: Line from tower to target

Drone (Drone Bay):
├─ Model: Small hovering drone
├─ Color: Cyan + magenta
├─ Trail: Slight glow
├─ Size: 5-10 pixels
├─ Speed: Slow (1-2 units/sec)
├─ Navigation: Smooth path following
└─ Impact: Burst of particles

Mine (Mine Deployer):
├─ Model: Metallic sphere/cube
├─ Color: Gray + orange glow
├─ Placement: Scattered on ground
├─ Animation: Slight pulsing
└─ Detonation: Orange explosion
```

## ✨ Particle Effects

### Spawn Effects
```
Unit Spawn:
├─ Teleport Vortex
│  ├─ Spiral pattern
│  ├─ Color: Cyan
│  ├─ Duration: 0.5 seconds
│  └─ Rings: 3-4 expanding circles
│
└─ Materialization
   ├─ Particles form from center
   ├─ Color: White → Cyan fade
   ├─ Duration: 0.3 seconds
   └─ Pattern: Expanding sphere
```

### Combat Effects
```
Hit Flash:
├─ Brief bright flash
├─ Color: Matches damage type
├─ Duration: 0.1 seconds
├─ Brightness: 150% of normal

DoT Emission:
├─ Bleed: Red particle trail from enemy
├─ Burn: Orange flames around enemy
├─ Poison: Green mist/clouds
├─ Duration: While DoT active
└─ Intensity: Scales with DoT damage

Critical Hit:
├─ Bright flash (all colors)
├─ Particle burst in star pattern
├─ Duration: 0.2 seconds
├─ Sound: Distinctive "cling" sound
└─ Multiplier glow: Brief color spike

Slow Effect:
├─ Blue crystalline particles
├─ Around enemy feet
├─ Slower fall pattern
└─ Duration: While slow active
```

### Death Effects
```
Enemy Death:
├─ Explosion
│  ├─ Orange burst (center)
│  ├─ Expanding circle of particles
│  ├─ Duration: 0.5 seconds
│  └─ Size: Scales with enemy size
│
├─ Flying Debris
│  ├─ Gray chunks fly outward
│  ├─ Gravity pulls them down
│  ├─ Duration: 1 second
│  └─ Count: 5-15 pieces
│
└─ Fade
   ├─ Enemy fades to black
   ├─ Duration: 0.3 seconds
   └─ Final state: Vanish completely
```

### Buff/Debuff Effects
```
Positive Buff (Card selection):
├─ Aura: Bright color (card type)
├─ Particles: Upward spiraling
├─ Duration: 1 second
├─ Size: Fills selection area
└─ Sound: Ascending "ping" tone

Negative Debuff (Enemy buff):
├─ Aura: Dark purple/red
├─ Particles: Chaotic swirling
├─ Duration: While active
├─ Intensity: Scales with buff power
└─ Sound: Deep ominous tone

Wave Start:
├─ Screen flash: Subtle white flash
├─ Music cue: Dramatic note
├─ Particle burst: Cyan burst at all portals
└─ Duration: 0.5 seconds
```

## 🎬 Camera & Perspective

### Isometric View
```
Angle:
├─ Horizontal: 45° from north
├─ Vertical: 30-35° from horizontal
└─ Result: Classic isometric look

Zoom:
├─ Default: 5 tiles visible width
├─ Zoom out: 8-10 tiles visible
├─ Zoom in: 2-3 tiles visible
├─ Smooth transition: 0.3 second transition

Pan:
├─ Follows tower mouse-over
├─ Centered on base when idle
├─ Smooth movement: Not instant
└─ Boundaries: Prevent extreme panning
```

## 🎯 UI Visual Design

### Panels & Containers
```
Standard Panel:
├─ Background: rgba(10, 14, 39, 0.95)
├─ Border: 2px solid #00ffff
├─ Border-radius: 8px
├─ Box-shadow: 0 0 20px rgba(0, 255, 255, 0.3)
├─ Padding: 16px
└─ Font: Monospace, bright cyan text

Hover Panel:
├─ Border-glow: 2px solid #ff00ff
├─ Box-shadow: 0 0 30px rgba(255, 0, 255, 0.4)
├─ Background: rgba(10, 14, 39, 0.98)
└─ Transition: 0.2 seconds
```

### Buttons
```
Default Button:
├─ Background: rgba(0, 255, 255, 0.1)
├─ Border: 1px solid #00ffff
├─ Color: #00ffff
├─ Padding: 10px 20px
├─ Border-radius: 4px
└─ Font-size: 14px

Hover State:
├─ Background: rgba(0, 255, 255, 0.3)
├─ Border: 1px solid #00ffff
├─ Box-shadow: 0 0 10px rgba(0, 255, 255, 0.5)
├─ Cursor: Pointer
└─ Transition: 0.15 seconds

Active/Pressed:
├─ Background: rgba(0, 255, 255, 0.5)
├─ Border: 1px solid #ff00ff
├─ Box-shadow: 0 0 15px rgba(255, 0, 255, 0.5)
└─ Text: Bright white

Disabled:
├─ Background: rgba(0, 255, 255, 0.05)
├─ Color: #0088aa (dim)
├─ Cursor: Not-allowed
└─ Opacity: 0.5
```

### Text & Typography
```
Primary Text:
├─ Font: Monospace (Courier New, Courier)
├─ Color: #00ffff
├─ Weight: 400
├─ Size: 14-16px
└─ Letter-spacing: 1px

Heading Text:
├─ Font: Monospace
├─ Color: #ff00ff
├─ Weight: 700
├─ Size: 20-24px
├─ Letter-spacing: 2px

Accent Text:
├─ Color: #ff0080
├─ Weight: 600
└─ Size: Normal or +2px

Dim Text:
├─ Color: #0088aa
├─ Opacity: 0.8
└─ Weight: 400
```

## 🎬 Animations & Transitions

### General Rules
```
Standard Transitions:
├─ Color changes: 0.2 seconds
├─ Size changes: 0.3 seconds
├─ Position changes: 0.3-0.5 seconds
├─ Opacity changes: 0.2 seconds
└─ Easing: Cubic-in-out for most

Load Animations:
├─ Panel slide-in: 0.4 seconds
├─ Fade-in: 0.3 seconds
├─ Scale-up: 0.3 seconds
└─ Stagger child elements: 0.05s apart
```

### Continuous Animations
```
Pulsing Glow:
├─ Duration: 2-3 seconds
├─ Opacity: 0.5 → 1.0 → 0.5
├─ Ease: Sine-in-out
└─ Applied to: Towers idle, paths, UI borders

Rotating Elements:
├─ Duration: 10-20 seconds
├─ Angle: 0° → 360°
├─ Linear: Continuous rotation
└─ Applied to: Crystals, shrines, boss

Breathing Effect:
├─ Scale: 0.95 → 1.05 → 0.95
├─ Duration: 2 seconds
├─ Ease: Sine-in-out
└─ Applied to: Enemy slow effect, buffs
```

## 📐 Size & Scale Guidelines

### World Units
```
Base Unit: 1 = 1 tile (32×32 pixels)

Enemy Sizes:
├─ Scout: 0.5 units diameter
├─ Medium: 0.8-1.0 units
├─ Heavy: 1.2-1.5 units
└─ Boss: 2.0-3.0 units

Tower Sizes:
├─ Small towers: 0.6 units
├─ Medium towers: 0.8 units
├─ Large towers: 1.0-1.2 units
└─ Base tower: 1.5 units
```

## 🌙 Dark Mode (Always On)

Since this is cyberpunk, we only have dark mode:
- Minimum brightness: #0a0e27 (background)
- Maximum brightness: #00ffff (neon accents)
- Avoid pure white (#ffffff)
- Avoid oversaturated neons (tone down if needed)

## ♿ Accessibility Notes

### Color Blindness
- Don't rely solely on red/green
- Use cyan/magenta as primary distinction
- Add patterns/icons for color-coded elements
- Provide text labels always

### Contrast
- Minimum contrast ratio: 4.5:1 for UI text
- Neon cyan on dark background: ~15:1 (excellent)
- Dim text on dark background: ~3:1 (borderline, use sparingly)
- Test with accessibility checker

### Visual Clarity
- Don't use too many effects simultaneously
- Particle effects can be toggled off
- Animation can be disabled if preferred
- Text always remains readable
