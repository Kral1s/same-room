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
