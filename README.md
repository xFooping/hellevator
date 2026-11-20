# Hellevator

Daily rare-answer Terraria trivia. Seven prompts, 25 seconds each. The rarer your correct answer, the further the hellevator drops: Surface → Underground → Caverns → Glowing Mushroom → Underground Jungle → Underground Hallow → Underworld.

Plain HTML/CSS/JS. No build step, no backend. Progress lives in `localStorage`.

## Run locally
```
npx serve .            # or: python -m http.server 8000
```
Dev-only: on localhost you can add `?date=2026-11-25` to pretend it's another day (for testing the archive and daily rollover). It's ignored on the live site.

## Before every deploy
```
node tools/check-data.mjs         # verifies every answer + runs regression cases
node tools/build-art-manifest.mjs # only if art changed
```
Set `START_DATE` in `js/game.js` to launch day (Dive #1).

## Deploy
Any static host: Cloudflare Pages, Netlify (drag the folder in), GitHub Pages.

## Files
| Path | What |
|---|---|
| `js/data.js` | tiers + prompt bank, with sources and rulings per prompt |
| `js/match.js` | answer matching (shared with the test script) |
| `js/names.js` | every Terraria item name (generated). Powers "real, but doesn't fit" and typo correction that can't leak answers |
| `js/world.js` | the shaft renderer + art loader |
| `js/game.js` | screens, timer, daily schedule, archive, results, answer key, stats |
| `assets/` | drop-in art, see `assets/README.md` |
| `tools/` | `check-data.mjs`, `build-names.mjs`, `build-art-manifest.mjs`, `game-items.json` (source data) |

## How answers are judged
1. Exact match (ignoring case, accents, punctuation, spaces, leading "the", trailing "s"; a prompt's `suffix` word is optional, e.g. "Ironskin" works for potions) → scored.
2. A known near-miss in the prompt's `reject` list → the player sees why it doesn't count.
3. Anything else → "Not on the list." (Real items that don't fit look identical to nonsense on purpose.)
4. Within 1 typo (5+ letters) or 2 (8+ letters) of anything in the whole dictionary → "Did you mean X?". Enter or YES confirms. Because suggestions come from all 6,000+ names, a suggestion never tells you whether something is a valid answer.

## Adding prompts (keeps past days stable)
Append to the END of `PROMPTS` with `added: "YYYY-MM-DD"` set to a future date. Never delete or reorder prompts. Editing answers or tiers is always safe. Then run `node tools/check-data.mjs`; for `kind: "item"` prompts it fails if any answer isn't an exact in-game item name.

## Data sources
- Official Terraria Wiki (terraria.wiki.gg) list/category pages and Legacy: pages (old-gen console + 3DS).
- The wiki's game-text dump `Module:GameText/db-en` via github.com/dsafxP/terrariamuzz (MIT-0), current through desktop 1.4.5.7.
