// Verifies the prompt bank. Run before every deploy:  node tools/check-data.mjs
//  1. every answer in an "item" prompt is a real in-game item name (exact spelling)
//  2. no two different answers/rejects collide after normalization
//  3. regression cases (things that MUST / MUST NOT count) still behave
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const Match = require(join(root, "js/match.js"));

const sandbox = { window: {} };
vm.runInNewContext(readFileSync(join(root, "js/data.js"), "utf8"), sandbox);
for (const f of readdirSync(join(root, "js")).filter((f) => /^prompts-.*\.js$/.test(f)).sort())
  vm.runInNewContext(readFileSync(join(root, "js", f), "utf8"), sandbox);
vm.runInNewContext(readFileSync(join(root, "js/names.js"), "utf8"), sandbox);
const { TIERS, PROMPTS, GAME_NAMES } = sandbox.window;
const game = JSON.parse(readFileSync(join(root, "tools/game-items.json"), "utf8"));
const itemSet = new Set([...game.items, ...game.legacy]);
const buffSet = new Set(JSON.parse(readFileSync(join(root, "tools/game-buffs.json"), "utf8")));
// items that exist in the game files but can't be obtained (wiki Unobtainable features)
const unobtainable = new Set(JSON.parse(readFileSync(join(root, "tools/unobtainable.json"), "utf8")).names);

let errors = 0, warnings = 0;
const err = (m) => { errors++; console.log("  ✗ " + m); };
const warn = (m) => { warnings++; console.log("  ! " + m); };

const ids = new Set();
for (const p of PROMPTS) {
  console.log(`[${p.id}]`);
  if (ids.has(p.id)) err(`duplicate id ${p.id}`); ids.add(p.id);
  const idx = Match.buildIndex(p, TIERS);
  for (const c of idx.collisions) err(`"${c.a}" and "${c.b}" both normalize to "${c.key}"`);
  const exempt = new Set([...(p.legacy || []), ...(p.nonItem || [])]);
  for (const e of idx.entries) {
    if (unobtainable.has(e.name) && !(p.legacy || []).includes(e.name)) err(`answer "${e.name}" is unobtainable in the game`);
    if (exempt.has(e.name)) continue;
    if (p.kind === "item" && !itemSet.has(e.name)) err(`answer "${e.name}" is not an in-game item name`);
    if (p.kind === "buff" && !buffSet.has(e.name)) err(`answer "${e.name}" is not an in-game buff name`);
    // pair: "Mount/Pet name|Summon item|..." -> at least one name must be a real item
    if (p.kind === "pair" && !e.names.some((n) => itemSet.has(n))) err(`pair "${e.names.join("|")}" has no real item name`);
  }
  for (const n of exempt) if (!idx.entries.some((e) => e.name === n)) warn(`legacy/nonItem "${n}" isn't an answer`);
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
  ["critters", "dragonfly", "reject"],
  ["critters", "butterfly", "Butterfly"],
  ["critters", "black dragonfly", "Black Dragonfly"],
  ["bosses", "spazmatism", "Spazmatism"],
  ["slime-items", "king slime treasure bag", "Treasure Bag (King Slime)"],
  ["slime-items", "slimy saddle", "reject"],
  ["slime-items", "slime banner", "Slime Banner"],
  ["slime-items", "slime chair", "Slime Chair"],
  ["slime-items", "gel", "reject"],
  ["quest-fish", "fish of cthulhu", "The Fish of Cthulhu"],
  ["quest-fish", "capn tunabeard", "Cap'n Tunabeard"],
  ["quest-fish", "bass", "reject"],
  ["quest-fish", "goldfish", "reject"],
  ["quest-fish", "zzzz", null],
  // batch 1
  ["whips", "vulgar display of flower", "Vulgar Display of Flower"],
  ["flails", "morning star", "reject"],
  ["flails", "ball of hurt", "Ball O' Hurt"],
  ["spears", "tonbogiri", "Tonbogiri"],
  ["bows", "bees knees", "The Bee's Knees"],
  ["bows", "hallowed repeater", "reject"],
  ["guns", "sdmg", "S.D.M.G."],
  ["guns", "star cannon", "reject"],
  ["minions", "terraprisma", "Terraprisma"],
  ["minions", "queen spider staff", "reject"],
  ["boss-summons", "pumpkin moon medallion", "Pumpkin Moon Medallion"],
  ["boss-summons", "goblin battle standard", "reject"],
  ["boss-summons", "suspicious looking egg", "Suspicious Looking Egg"],
  ["merchant", "pylon", "reject"],
  ["merchant", "jungle pylon", "Jungle Pylon"],
  ["plantera-drops", "the axe", "The Axe"],
  ["wof-drops", "badgers hat", "Badger's Hat"],
  ["stations", "heavy work bench", "Heavy Assembler"],
  ["stations", "teapot", "Teapot"],
  ["stations", "tea kettle", null],
  ["stations", "shimmer", "Shimmer"],
  ["mounts", "slimy saddle", "Slime"],
  ["mounts", "terra fart kart", "Terra Fart Kart"],
  ["mounts", "digtoise", "Digtoise"],
  ["pets", "eye bone", "Chester"],
  ["pets", "dirtiest block", "The Dirtiest Block"],
  ["pets", "town cat", "reject"],
  ["crates", "hematic crate", "Hematic Crate"],
  ["dyes", "dye vat", "reject"],
  ["dyes", "life hair dye", "Life Hair Dye"],
  ["pickaxes", "shroomite digging claw", "Shroomite Digging Claw"],
  ["pickaxes", "drax", "Drax"],
  ["bone-items", "chicken bones' wings", "Chicken Bones' Wings"],
  ["star-items", "ghostar's soul jar", "Ghostar's Soul Jar"],
  ["slimes", "shadow slime", "Shadow Slime"],
  ["slimes", "slime", "reject"],
  ["biomes", "heart shrine", "Heart Shrine"],
  ["events", "coin rain", "Coin Rain"],
  ["seeds", "05162020", "Drunk World"],
  ["seeds", "get fixed boi", "Zenith"],
  ["debuffs", "on fire", "On Fire!"],
  ["debuffs", "venom", "Acid Venom"],
  ["debuffs", "well fed", "reject"],
  // batch 2
  ["golem-drops", "mobius strip", "Mobius Strip"],
  ["golem-drops", "lihzahrd power cell", "reject"],
  ["moonlord-drops", "zenith", "reject"],
  ["moonlord-drops", "sdmg", "S.D.M.G."],
  ["duke-drops", "kraken", "Kraken"],
  ["queen-bee-drops", "beeswax", "Bee Wax"],
  ["queen-bee-drops", "bees knees", "The Bee's Knees"],
  ["arms-dealer", "forest pylon", "Forest Pylon"],
  ["arms-dealer", "universal pylon", "reject"],
  ["witch-doctor", "flask of venom", "reject"],
  ["wizard-shop", "wizards hat", "Wizard's Hat"],
  ["wizard-shop", "wizard hat", "reject"],
  ["statues", "angel", "Angel Statue"],
  ["statues", "statue", "reject"],
  ["underworld-enemies", "hungry", "The Hungry"],
  ["underworld-enemies", "arch demon", "Arch Demon"],
  ["underworld-enemies", "lavafly", "reject"],
  ["dungeon-enemies", "armored bones", "reject"],
  ["dungeon-enemies", "dragon skull", "Dragon Skull"],
  ["eclipse-enemies", "dr man fly", "Dr. Man Fly"],
  ["eclipse-enemies", "possessed", "The Possessed"],
  ["moon-event-enemies", "santa nk1", "Santa-NK1"],
  ["invasion-enemies", "goblin scout", "reject"],
  ["invasion-enemies", "pirates curse", "Pirate's Curse"],
  ["armor-sets", "shadow", "Shadow Armor"],
  ["armor-sets", "hallow armor", "Hallowed Armor"],
  ["armor-sets", "spectral", "Spectral Armor"],
  ["armor-sets", "spectre armor", "Spectre Armor"],
  ["info-accessories", "shellphone (spawn)", "Shellphone"],
  ["info-accessories", "rek 3000", "R.E.K. 3000"],
  ["hammers", "breaker", "The Breaker"],
  ["hammers", "breaker blade", "reject"],
  ["hammers", "nebula hammer", "reject"],
  ["hammers", "pwnhammer", "Pwnhammer"],
  ["bullets", "silver", "Silver Bullet"],
  ["bullets", "empty bullet", "reject"],
  ["arrows", "jesters arrow", "Jester's Arrow"],
  ["arrows", "magic quiver", "reject"],
  ["bars", "iron", "Iron Bar"],
  ["fish", "goldfish", "Goldfish"],
  ["fish", "shrimp", "reject"],
  ["fish", "silent fish", "reject"],
  ["fish", "captain tunabeard", "Cap'n Tunabeard"],
  ["moon-items", "moonman and company", "Moonman & Company"],
  ["moon-items", "celestial sigil", "reject"],
  ["shadow-items", "shadow hammer banner", "Shadow Hammer Banner"],
  ["ice-items", "office chair", "Office Chair"],
  ["ice-items", "apprentices hat", "Apprentice's Hat"],
  ["ice-items", "apple pie slice", "real"],
  ["expert-items", "treasure bag (golem)", "Treasure Bag"],
  ["expert-items", "guardian golem", "reject"],
  ["swords", "fiery greatsword", "Volcano"],
  ["swords", "cat sword", "reject"],
  ["swords", "swordfish", "reject"],
  ["swords", "true copper shortsword", "True Copper Shortsword"],
  ["star-items", "stardust hammer", "reject"],
  ["bone-items", "bone block", "reject"]
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
