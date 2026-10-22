# Same Room

A 2D browser puzzle-platformer for a student game jam.

The whole game is one small room played 30 times. After every win, the game
changes the rules — often based on the path you took (your previous path may
turn into lava, controls get mirrored, a ghost of your last run appears...).
The room itself narrates with dry humor.

## Run it

No build, no server, no dependencies — it's a single file:

- Double-click `index.html`, or
- Open it in any modern browser (works over `file://`).

## Controls

| Action  | Keys                          |
| ------- | ----------------------------- |
| Move    | ← / → or A / D                |
| Jump    | ↑, W, or Space (hold = higher) |
| Restart | R                             |

## Tech

- Plain HTML + JavaScript + Canvas 2D. No frameworks, no libraries, no build
  tools, no external files.
- Everything lives in `index.html` (inline `<style>` and `<script>`).
- 1280×720 logical canvas, letterboxed and scaled to the window.
- Fixed-timestep game loop, 60 updates/second.

## Status

Built in steps. Done so far:

- **Step 1** — tile-based room (32×18 grid of 40px tiles), player physics
  (coyote time, jump buffering, variable jump height, axis-separated AABB
  collision), spikes with instant respawn + particle burst, death counter,
  door win transition, "To be continued..." placeholder, HUD with room number
  and narrator line.
- **Step 2** — all user-visible text centralized in `STRINGS`, player look in
  `CONFIG.PLAYER` + `drawPlayer()`, per-attempt path recording
  (`run.currentPath` / `lastWinPath` / `deathPoints`), a `RULES` registry with
  lifecycle hooks, two rules (`pathLava`, `mirrorControls`), and Room 2: the
  same room plus a higher route where your Room 1 path becomes pulsing lava.
  Debug mode: **F2** toggles path lines/death marks/rule list, **N** skips a
  level (debug only).
- **Step 3** — acts + theming (`act` per level, `CONFIG.THEMES` palettes,
  act 1 gets a warm accent), the door is now a dynamic entity
  (`game.door` — win = overlap vs its CURRENT position), new tile symbols:
  `B` button, `G` gate, `S` spawn-slot, `M` shifting stone (all rule-drawn and
  fully backwards compatible), and four new rules:
  - **Room 3 `buttonGate`** — the narrator begs you not to touch the big red
    button. Touch it and the gate column blocking the correct route opens
    (per attempt), while the narrator loses it.
  - **Room 4 `shyDoor`** — the door is shy: it slides away to its target
    whenever you move or press anything, but creeps home over ~6 seconds
    while you stand perfectly still. Dying slams it all the way back.
  - **Room 5 `deathSpike`** — every death turns the nearest unused floor
    slot into a fresh spike (pops in, persists per level, max 4, oldest
    drops first). Placement is provably safe: solvability with ALL slots
    active was simulated against measured jump physics.
  - **Room 6 `jumpShift`** — stepping-stones over a spike pit shuffle one
    lane cell right on every jump (instant, with a highlight, and a squash
    safety that defers a move if you'd be standing inside a stone).
  Levels 3–6 must be completed WITHOUT `pathLava` touching them...
  New debug goodies: **1–6** jump straight to a level (debug mode),
  faint outlines show free deathSpike slots.

