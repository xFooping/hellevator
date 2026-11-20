// Verifies the prompt bank. Run before every deploy:  node tools/check-data.mjs
//  1. every answer in an "item" prompt is a real in-game item name (exact spelling)
//  2. no two different answers/rejects collide after normalization
//  3. regression cases (things that MUST / MUST NOT count) still behave
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const Match = require(join(root, "js/match.js"));

const sandbox = { window: {} };
vm.runInNewContext(readFileSync(join(root, "js/data.js"), "utf8"), sandbox);
vm.runInNewContext(readFileSync(join(root, "js/names.js"), "utf8"), sandbox);
const { TIERS, PROMPTS, GAME_NAMES } = sandbox.window;
const game = JSON.parse(readFileSync(join(root, "tools/game-items.json"), "utf8"));
const itemSet = new Set([...game.items, ...game.legacy]);

let errors = 0, warnings = 0;
const err = (m) => { errors++; console.log("  ✗ " + m); };
const warn = (m) => { warnings++; console.log("  ! " + m); };

const ids = new Set();
for (const p of PROMPTS) {
  console.log(`[${p.id}]`);
  if (ids.has(p.id)) err(`duplicate id ${p.id}`); ids.add(p.id);
  const idx = Match.buildIndex(p, TIERS);
  for (const c of idx.collisions) err(`"${c.a}" and "${c.b}" both normalize to "${c.key}"`);
  if (p.kind === "item") {
    for (const e of idx.entries) {
      if (!itemSet.has(e.name)) err(`answer "${e.name}" is not an in-game item name`);
      else if ((p.legacy || []).includes(e.name) !== game.legacy.includes(e.name)) warn(`legacy flag mismatch for "${e.name}"`);
    }
  }
  const total = idx.entries.length;
  const byTier = TIERS.map((t) => `${t.key}:${(p.answers[t.key] || []).length}`).join(" ");
  if (total < 10) warn(`only ${total} answers`);
  if (!(p.answers.white || []).length) warn("no white (obvious) answers");
  console.log(`  ${total} answers (${byTier}), ${idx.rejects.length} near-misses`);
}

// ---- regression cases -----------------------------------------------------
// [promptId, guess, expected]  expected: answer display name | "reject" | "real" | "suggest:<name>" | null (plain miss)
const CASES = [
  ["bosses", "eoc", "Eye of Cthulhu"],
  ["bosses", "the twins", "The Twins"],
  ["bosses", "retinazer", "Retinazer"],
  ["bosses", "santa nk1", "Santa-NK1"],
  ["bosses", "Turkor", "Turkor the Ungrateful"],
  ["bosses", "ocram", "Ocram"],
  ["bosses", "lunar pillars", "Celestial Pillars"],
  ["bosses", "mothron", "reject"],
  ["bosses", "dreadnautilus", "reject"],
  ["bosses", "plantra", "suggest:Plantera"],
  ["town-npcs", "travelling merchant", "Traveling Merchant"],
  ["town-npcs", "bound goblin", "Goblin Tinkerer"],
  ["town-npcs", "squire slime", "Squire Slime"],
  ["yoyos", "hive five", "Hive-Five"],
  ["yoyos", "format c", "Format:C"],
  ["yoyos", "yoyo bag", "reject"],
  ["yoyos", "eye of cthulhu", "The Eye of Cthulhu"],
  ["hooks", "amethyst", "Amethyst Hook"],
  ["hooks", "hook", "reject"],
  ["hooks", "antigravity hook", "Anti-Gravity Hook"],
  ["wings", "angel", "Angel Wings"],
  ["wings", "arkhalis's lightwings", "Arkhalis' Lightwings"],
  ["wings", "ghost wings", "Spectre Wings"],
  ["wings", "sparkly wings", "Sparkly Wings"],
  ["wings", "yoraizor's spell", "Yoraiz0r's Spell"],
  ["wings", "rocket boots", "reject"],
  ["torches", "tiki torch", "Tiki Torch"],
  ["torches", "ultrabright", "Ultrabright Torch"],
  ["torches", "torch god's favor", "reject"],
  ["food", "pina colada", "Piña Colada"],
  ["food", "hot dog", "Hotdog"],
  ["food", "joja cola", "Joja Cola"],
  ["food", "ale", "reject"],
  ["food", "mushroom", "reject"],
  ["food", "life fruit", "reject"],
  ["food", "blackened fish", "Blackened Fish"],
  ["food", "BBQ Ribs", "BBQ Ribs"],
  ["food", "shrimp po boy", "Shrimp Po' Boy"],
  ["potions", "ironskin", "Ironskin Potion"],
  ["potions", "red potion", "Red Potion"],
  ["potions", "wiesnbrau", "Wiesnbräu"],
  ["potions", "flask of ichor", "Flask of Ichor"],
  ["potions", "mushroom", "Mushroom"],
  ["potions", "potion of return", "Potion of Return"],
  ["potions", "potion statue", "reject"],
  ["potions", "apple", "real"],
  ["ores", "gold", "Gold Ore"],
  ["ores", "obsidian", "Obsidian"],
  ["ores", "mithril", "Mythril Ore"],
  ["ores", "copper bar", "reject"],
  ["ores", "amethyst", "reject"],
  ["critters", "faeling", "Faeling"],
  ["critters", "gold goldfish", "Gold Goldfish"],
  ["critters", "julia butterfly", "Julia Butterfly"],
  ["critters", "vicious bunny", "reject"],
  ["critters", "town cat", "reject"],
  ["slime-items", "king slime treasure bag", "Treasure Bag (King Slime)"],
  ["slime-items", "slimy saddle", "reject"],
  ["slime-items", "slime banner", "Slime Banner"],
  ["slime-items", "slime chair", "Slime Chair"],
  ["slime-items", "gel", "reject"],
  ["quest-fish", "fish of cthulhu", "The Fish of Cthulhu"],
  ["quest-fish", "capn tunabeard", "Cap'n Tunabeard"],
  ["quest-fish", "bass", "reject"],
  ["quest-fish", "goldfish", "reject"],
  ["quest-fish", "zzzz", null]
];

const ctx = Match.makeContext(TIERS, PROMPTS, GAME_NAMES);
const byId = Object.fromEntries(PROMPTS.map((p) => [p.id, p]));
console.log("\n[regression]");
let pass = 0;
for (const [id, guess, want] of CASES) {
  const r = Match.judge(byId[id], guess, ctx);
  const got = r.type === "hit" ? r.entry.name : r.type === "suggest" ? "suggest:" + r.name : r.type === "miss" ? null : r.type;
  if (got === want) pass++;
  else err(`${id}: "${guess}" -> ${JSON.stringify(got)}, expected ${JSON.stringify(want)}`);
}
console.log(`  ${pass}/${CASES.length} cases pass`);
console.log(`\n${errors} error(s), ${warnings} warning(s)`);
process.exit(errors ? 1 : 0);
