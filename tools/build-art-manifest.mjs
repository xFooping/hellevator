// Scans assets/ and writes assets/manifest.json so the live site loads art
// with one request. Run after adding/removing art:  node tools/build-art-manifest.mjs
import { readdirSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const list = (d) => (existsSync(join(root, "assets", d)) ? readdirSync(join(root, "assets", d)).filter((f) => f.endsWith(".png")).sort() : []);
const tiles = {};
for (const f of list("tiles")) {
  const m = f.match(/^(.+?)(?:_(\d+))?\.png$/);
  const key = m[2] ? m[1] : f.slice(0, -4);
  (tiles[key] ||= []).push(f);
}
const flat = (d) => Object.fromEntries(list(d).map((f) => [f.slice(0, -4), f]));
const manifest = { tiles, sprites: flat("sprites"), backgrounds: flat("backgrounds") };
writeFileSync(join(root, "assets/manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(`tiles: ${Object.keys(tiles).length}, sprites: ${Object.keys(manifest.sprites).length}, backgrounds: ${Object.keys(manifest.backgrounds).length}`);
