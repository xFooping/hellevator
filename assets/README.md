# Art drop-in

Put PNGs here with these exact names and they replace the placeholder art on the next page load. Nothing else needs to change. Missing files fall back to placeholder colors, so you can add art one block at a time.

## Blocks and walls: `assets/tiles/<name>.png`
16×16 PNG, one tile per file (no sprite sheets yet). They're drawn at 16×16 CSS px with no smoothing, so 8×8 art doubled to 16×16 also works.

Optional variants: `dirt_2.png`, `dirt_3.png`, `dirt_4.png`. Each tile picks one at random (stable per position), which breaks up repetition.

| Name | Where it shows up |
|---|---|
| `grass` | top row of the surface |
| `dirt` | Surface + Underground |
| `stone` | Caverns, and patches in Underground |
| `copper_ore` `iron_ore` `silver_ore` `gold_ore` | specks in Caverns |
| `mud` | Glowing Mushroom + Underground Jungle |
| `mushroom_grass` | mud touching air in the Mushroom layer |
| `jungle_grass` | mud touching air in the Jungle layer |
| `pearlstone` | Underground Hallow |
| `ash` | Underworld |
| `hellstone` | patches in Underworld |
| `dirt_wall` `stone_wall` `mushroom_wall` `jungle_wall` `pearlstone_wall` `hell_wall` | background walls (caves + the shaft) per layer |
| `lava` | Underworld floor |
| `glowing_mushroom` | sits on Mushroom-layer floors (transparent PNG) |
| `vine` | hangs from Jungle ceilings (transparent PNG) |
| `crystal_shard` | sits on Hallow floors (transparent PNG) |
| `tree_trunk` `tree_leaves` | surface trees, one tile each |

## Sprites: `assets/sprites/`
- `player.png`: standing player, any size, drawn at 2× and centered on the rope with feet on the ground.
- `player_fall.png`: optional falling pose.

## Backgrounds: `assets/backgrounds/`
- `sky.png`: stretched behind the surface.
