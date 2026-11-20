/* =========================================================================
   HELLAVATOR — the shaft
   Procedural world. Every block/wall/decoration has a NAME (see TILE_KEYS).
   If assets/tiles/<name>.png exists it is drawn; otherwise a placeholder
   color is used. Drop art in and it shows up on the next page load.
   Score (0-700) maps to depth: 1 point = 2 feet = half a tile.
   ========================================================================= */
(function () {
  const TILE = 16;            // css px per tile (art is drawn at 16x16 css px)
  const PT_TO_TILE = 0.5;
  const CHUNK = 32;
  const MAX_VARIANTS = 4;     // dirt.png, dirt_2.png, dirt_3.png, dirt_4.png

  const BANDS = [
    { min: 0,   key: "surface",  name: "Surface",            flavor: "You barely left the house." },
    { min: 60,  key: "under",    name: "Underground",        flavor: "Past the dirt. Mom would be proud." },
    { min: 150, key: "cavern",   name: "Caverns",            flavor: "Torch-and-rope territory." },
    { min: 250, key: "mushroom", name: "Glowing Mushroom",   flavor: "Truffle wants to move in." },
    { min: 350, key: "jungle",   name: "Underground Jungle", flavor: "Hornets. So many hornets." },
    { min: 450, key: "hallow",   name: "Underground Hallow", flavor: "Crystal country. Deep-cut territory." },
    { min: 560, key: "hell",     name: "Underworld",         flavor: "You hit the bottom. The Wall is listening." }
  ];
  const feetFor = (s) => Math.round(s * 2);
  const bandFor = (s) => { let b = BANDS[0]; for (const x of BANDS) if (s >= x.min) b = x; return b; };
  const nextBand = (s) => BANDS.find((b) => b.min > s) || null;

  // ---- every drawable thing, with its placeholder color -----------------
  const TILE_KEYS = {
    // blocks
    grass: "#3fae46", dirt: "#976b4b", stone: "#727272", mud: "#5c4436",
    mushroom_grass: "#5875ff", jungle_grass: "#8fd71d", pearlstone: "#cbbccf",
    ash: "#4a4a52", hellstone: "#b8401e",
    copper_ore: "#c87a46", iron_ore: "#b9a597", silver_ore: "#cfd2e0", gold_ore: "#e6c34b",
    // background walls
    dirt_wall: "#4a3324", stone_wall: "#2b2b31", mushroom_wall: "#151a36",
    jungle_wall: "#1d2a17", pearlstone_wall: "#2c2140", hell_wall: "#2a0a08",
    // decoration / liquid
    lava: "#ff6a00", glowing_mushroom: "#7fe0ff", vine: "#4fa21a", crystal_shard: "#ff7ae0",
    tree_trunk: "#6b4a2b", tree_leaves: "#2f9a3a"
  };
  const BIOME = {
    surface:  { block: "dirt",       wall: "dirt_wall" },
    under:    { block: "dirt",       wall: "dirt_wall", alt: "stone" },
    cavern:   { block: "stone",      wall: "stone_wall", ores: ["copper_ore", "iron_ore", "silver_ore", "gold_ore"] },
    mushroom: { block: "mud",        wall: "mushroom_wall", grass: "mushroom_grass", decor: "glowing_mushroom" },
    jungle:   { block: "mud",        wall: "jungle_wall", grass: "jungle_grass", hang: "vine" },
    hallow:   { block: "pearlstone", wall: "pearlstone_wall", decor: "crystal_shard" },
    hell:     { block: "ash",        wall: "hell_wall", alt: "hellstone" }
  };

  // ---- art loader --------------------------------------------------------
  const art = {};            // key -> [Image, ...]
  const sprites = {};        // player, sky
  let artVersion = 0;
  function loadImage(src) {
    return new Promise((res) => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = src; });
  }
  // Production reads assets/manifest.json (one request, no 404 spam).
  // Local dev (localhost / file://) probes the folders directly, so dropping a
  // PNG in and refreshing just works. Rebuild the manifest with:
  //   node tools/build-art-manifest.mjs
  const DEV = location.protocol === "file:" || ["localhost", "127.0.0.1", ""].includes(location.hostname);
  async function readManifest() {
    if (DEV) return null;
    try { const r = await fetch("assets/manifest.json", { cache: "no-cache" }); return r.ok ? await r.json() : {}; } catch (e) { return {}; }
  }
  async function loadArt() {
    const man = await readManifest();
    await Promise.all(Object.keys(TILE_KEYS).map(async (k) => {
      let files;
      if (man) files = (man.tiles || {})[k] || [];
      else { files = []; if (await loadImage(`assets/tiles/${k}.png`)) { files.push(`${k}.png`); for (let v = 2; v <= MAX_VARIANTS; v++) { if (await loadImage(`assets/tiles/${k}_${v}.png`)) files.push(`${k}_${v}.png`); else break; } } }
      const list = (await Promise.all(files.map((f) => loadImage(`assets/tiles/${f}`)))).filter(Boolean);
      if (list.length) art[k] = list;
    }));
    const one = async (dir, name) => (man ? ((man[dir] || {})[name] ? loadImage(`assets/${dir}/${man[dir][name]}`) : null) : loadImage(`assets/${dir}/${name}.png`));
    sprites.player = await one("sprites", "player");
    sprites.playerFall = await one("sprites", "player_fall");
    sprites.sky = await one("backgrounds", "sky");
    artVersion++; cache.clear();
  }

  // ---- noise -------------------------------------------------------------
  function hash(x, y, s = 0) {
    let h = (Math.imul(x, 374761393) + Math.imul(y, 668265263) + Math.imul(s, 1442695041)) | 0;
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    h = h ^ (h >>> 16);
    return (h >>> 0) / 4294967296;
  }
  function vnoise(x, y, s) {
    const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
    const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
    const a = hash(xi, yi, s), b = hash(xi + 1, yi, s), c = hash(xi, yi + 1, s), d = hash(xi + 1, yi + 1, s);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  }

  // ---- world layout ------------------------------------------------------
  const bandTop = BANDS.map((b) => b.min * PT_TO_TILE);
  const BOTTOM = 700 * PT_TO_TILE;
  function biomeAt(tx, ty) {
    if (ty < 0) return "sky";
    const wob = (vnoise(tx / 9, ty / 40, 7) - 0.5) * 10;
    let key = "surface";
    for (let i = 0; i < BANDS.length; i++) if (ty + wob >= bandTop[i]) key = BANDS[i].key;
    return key;
  }
  const inShaft = (tx) => tx >= -1 && tx <= 1;
  function isAir(tx, ty) {
    if (ty < 0 || inShaft(tx)) return true;
    if (ty < 6) return false;
    const biome = biomeAt(tx, ty);
    const n = vnoise(tx / 7, ty / 5, 3) * 0.65 + vnoise(tx / 3, ty / 3, 5) * 0.35;
    if (biome === "hell" && ty > BOTTOM - 22) return n > 0.42 || Math.abs(tx) < 14;
    return n > (biome === "under" ? 0.70 : biome === "hell" ? 0.56 : 0.62);
  }

  // Decide what lives in a tile, by name.
  function tileAt(tx, ty) {
    if (ty < 0) return { tree: treeAt(tx, ty) };
    const biome = biomeAt(tx, ty), B = BIOME[biome], r = hash(tx, ty, 11);
    if (isAir(tx, ty)) {
      if (biome === "hell" && ty > BOTTOM - 8 && !inShaft(tx)) return { liquid: "lava" };
      if (ty < 3 && !inShaft(tx)) return {};
      const out = { wall: B.wall, shaft: inShaft(tx) };
      const floor = !isAir(tx, ty + 1), ceil = !isAir(tx, ty - 1);
      if (B.decor && floor && r < (biome === "hallow" ? 0.25 : 0.35)) out.decor = B.decor;
      if (B.hang && ceil && r < 0.5) out.decor = B.hang;
      return out;
    }
    let block = B.block;
    if (biome === "under" && hash(tx >> 2, ty >> 2, 9) > 0.8) block = B.alt;
    if (biome === "hell" && hash(tx >> 1, ty >> 1, 4) > 0.86) block = B.alt;
    if (biome === "cavern" && r > 0.94) block = B.ores[Math.floor(hash(tx, ty, 2) * 4)];
    if (ty === 0) block = "grass";
    const exposed = isAir(tx, ty - 1) || isAir(tx, ty + 1) || isAir(tx - 1, ty) || isAir(tx + 1, ty);
    if (B.grass && exposed) block = B.grass;
    return { block, wall: B.wall };
  }
  function treeAt(tx, ty) {
    for (let k = -2; k <= 2; k++) {
      const base = tx + k;
      if (Math.abs(base) < 6 || hash(base, 0, 21) > 0.16) continue;
      const h = 6 + Math.floor(hash(base, 1, 21) * 6), top = -h - 1, dy = ty - top, dx = Math.abs(k);
      if (dy >= -2 && dy <= 2 && dx + Math.abs(dy) <= 3) return "tree_leaves";
      if (k === 0 && ty >= -h && ty < 0) return "tree_trunk";
    }
    return null;
  }

  // ---- drawing -----------------------------------------------------------
  function pick(key, tx, ty) {
    const list = art[key]; if (!list) return null;
    return list[Math.floor(hash(tx, ty, 31) * list.length)];
  }
  function paint(g, key, tx, ty, x, y, shadeAmt) {
    const im = pick(key, tx, ty);
    if (im) { g.drawImage(im, x, y, TILE, TILE); return true; }
    g.fillStyle = TILE_KEYS[key] || "#f0f"; g.fillRect(x, y, TILE, TILE);
    return false;
  }

  function drawTile(g, tx, ty, x, y) {
    const t = tileAt(tx, ty), r = hash(tx, ty, 11);
    if (t.tree) { paint(g, t.tree, tx, ty, x, y); return; }
    if (t.liquid) { paint(g, t.liquid, tx, ty, x, y); if (!art.lava && r < 0.5) { g.fillStyle = "#ff8a1e"; g.fillRect(x, y, TILE, 4); } return; }
    if (t.wall) {
      if (!paint(g, t.wall, tx, ty, x, y)) { g.fillStyle = `rgba(0,0,0,${(r * 0.12).toFixed(3)})`; g.fillRect(x, y, TILE, TILE); }
      if (t.shaft) { g.fillStyle = "rgba(0,0,0,.35)"; g.fillRect(x, y, TILE, TILE); }
    }
    if (t.block) {
      const hasArt = paint(g, t.block, tx, ty, x, y);
      if (!hasArt) {                       // placeholder texture
        g.fillStyle = "rgba(0,0,0,.16)"; g.fillRect(x + Math.floor(r * 10), y + Math.floor(hash(tx, ty, 3) * 10), 4, 4);
        g.fillStyle = "rgba(255,255,255,.07)"; g.fillRect(x + 2, y + 2, 4, 2);
        if (t.block === "grass") { g.fillStyle = TILE_KEYS.dirt; g.fillRect(x, y + 6, TILE, 10); }
      }
      // soft outline where a block meets air (kept with art too; reads as AO)
      g.fillStyle = "rgba(0,0,0,.28)";
      if (isAir(tx, ty - 1) && ty > 0) g.fillRect(x, y, TILE, 2);
      if (isAir(tx, ty + 1)) g.fillRect(x, y + TILE - 2, TILE, 2);
      if (isAir(tx - 1, ty)) g.fillRect(x, y, 2, TILE);
      if (isAir(tx + 1, ty)) g.fillRect(x + TILE - 2, y, 2, TILE);
    }
    if (t.decor) {
      const im = pick(t.decor, tx, ty);
      if (im) g.drawImage(im, x, y, TILE, TILE);
      else drawDecorPlaceholder(g, t.decor, x, y, r);
    }
  }
  function drawDecorPlaceholder(g, key, x, y, r) {
    if (key === "glowing_mushroom") { g.fillStyle = "#c9d6ff"; g.fillRect(x + 7, y + 9, 3, 7); g.fillStyle = "#5875ff"; g.fillRect(x + 3, y + 5, 11, 4); g.fillStyle = "#7fe0ff"; g.fillRect(x + 5, y + 4, 7, 2); }
    if (key === "vine") { g.fillStyle = "#4fa21a"; g.fillRect(x + 6, y, 3, 6 + Math.floor(r * 10)); }
    if (key === "crystal_shard") { g.fillStyle = ["#ff7ae0", "#7ae8ff", "#c79bff"][Math.floor(r * 30) % 3]; g.fillRect(x + 6, y + 4, 4, 12); g.fillRect(x + 3, y + 9, 3, 7); }
  }

  const cache = new Map();
  let dpr = 1;
  function chunkCanvas(cx, cy) {
    const key = cx + "," + cy;
    if (cache.has(key)) return cache.get(key);
    const c = document.createElement("canvas");
    c.width = c.height = CHUNK * TILE * dpr;
    const g = c.getContext("2d");
    g.imageSmoothingEnabled = false;
    g.scale(dpr, dpr);
    for (let j = 0; j < CHUNK; j++) for (let i = 0; i < CHUNK; i++) drawTile(g, cx * CHUNK + i, cy * CHUNK + j, i * TILE, j * TILE);
    cache.set(key, c);
    if (cache.size > 90) cache.delete(cache.keys().next().value);
    return c;
  }

  // placeholder player (used until assets/sprites/player.png exists)
  const SPR = ["...hhhh...", "..hhhhhh..", "..hssssh..", "..sseses..", "..ssssss..", "...ssss...", "..tttttt..", ".sttttttss", ".sttbbtt..", "..tttttt..", "..pppppp..", "..pp..pp..", "..pp..pp..", "..pp..pp..", ".bbb..bbb.", ".bbb..bbb."];
  const SPR_FALL = SPR.slice(); SPR_FALL[6] = "s.tttttt.s"; SPR_FALL[7] = "s.tttttt.s";
  const SCOL = { h: "#5b3a1e", s: "#e8b48c", e: "#1b1b2a", t: "#2d9c8c", b: "#3a2a1c", p: "#3b4a8a" };
  function drawPlayer(g, cx, footY, falling) {
    const im = (falling && sprites.playerFall) || sprites.player;
    if (im) { const w = im.width * 2, h = im.height * 2; g.drawImage(im, Math.round(cx - w / 2), Math.round(footY - h), w, h); return; }
    const rows = falling ? SPR_FALL : SPR, px = 2, x0 = Math.round(cx - 10), y0 = Math.round(footY - 32);
    for (let j = 0; j < rows.length; j++) for (let i = 0; i < rows[j].length; i++) {
      const c = rows[j][i]; if (c === ".") continue;
      g.fillStyle = SCOL[c]; g.fillRect(x0 + i * px, y0 + j * px, px, px);
    }
  }

  // ---- runtime -----------------------------------------------------------
  let canvas, ctx, W = 0, H = 0;
  let camT = 0, targetT = 0, last = 0;
  let anchor = 0.62, anchorTarget = 0.62;
  const parts = [];

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = false;
    cache.clear();
  }

  function frame(now) {
    const dt = Math.min(0.05, (now - (last || now)) / 1000); last = now;
    const diff = targetT - camT;
    camT += diff * Math.min(1, dt * 2.2);
    if (Math.abs(diff) < 0.01) camT = targetT;
    anchor += (anchorTarget - anchor) * Math.min(1, dt * 3);
    const falling = Math.abs(diff) > 0.4;

    const sx = W / 2;
    const footY = H * anchor;
    const offX = Math.round(sx - TILE * 0.5);
    const offY = Math.round(footY - camT * TILE);

    const band = biomeAt(0, Math.max(0, Math.floor(camT)));
    ctx.fillStyle = TILE_KEYS[(BIOME[band] || BIOME.surface).wall];
    ctx.fillRect(0, 0, W, H);
    if (offY > 0) {
      if (sprites.sky) ctx.drawImage(sprites.sky, 0, offY - H, W, H);
      else { const gs = ctx.createLinearGradient(0, offY - H, 0, offY); gs.addColorStop(0, "#4a8fe0"); gs.addColorStop(1, "#a9d6ff"); ctx.fillStyle = gs; ctx.fillRect(0, 0, W, offY + 1); }
    }

    const tx0 = Math.floor(-offX / TILE) - 1, tx1 = Math.ceil((W - offX) / TILE) + 1;
    const ty0 = Math.floor(-offY / TILE) - 1, ty1 = Math.ceil((H - offY) / TILE) + 1;
    const cx0 = Math.floor(tx0 / CHUNK), cx1 = Math.floor(tx1 / CHUNK);
    const cy0 = Math.floor(ty0 / CHUNK), cy1 = Math.floor(Math.min(ty1, BOTTOM + 40) / CHUNK);
    for (let cy = cy0; cy <= cy1; cy++) for (let cx = cx0; cx <= cx1; cx++) {
      if (cy < -1) continue;
      ctx.drawImage(chunkCanvas(cx, cy), offX + cx * CHUNK * TILE, offY + cy * CHUNK * TILE, CHUNK * TILE, CHUNK * TILE);
    }

    // rope
    const ropeTop = Math.max(0, offY - 4);
    ctx.fillStyle = "#b08850"; ctx.fillRect(Math.round(sx + 6), ropeTop, 3, H);
    for (let y = ropeTop + ((offY % 12) + 12) % 12; y < H; y += 12) { ctx.fillStyle = "#8a6638"; ctx.fillRect(Math.round(sx + 5), y, 5, 3); }

    spawnParts(band, falling, sx, footY, dt);
    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i]; p.life -= dt; if (p.life <= 0) { parts.splice(i, 1); continue; }
      p.x += p.vx * dt; p.y += p.vy * dt;
      ctx.globalAlpha = Math.min(1, p.life * 2); ctx.fillStyle = p.c; ctx.fillRect(Math.round(p.x), Math.round(p.y), p.s, p.s);
    }
    ctx.globalAlpha = 1;

    const bob = falling ? Math.sin(now / 55) * 1.5 : 0;
    drawPlayer(ctx, sx, footY + bob, falling);

    const dark = { surface: camT < 6 ? 0 : 0.35, under: 0.5, cavern: 0.62, mushroom: 0.5, jungle: 0.56, hallow: 0.45, hell: 0.3 }[band] ?? 0;
    if (dark > 0) {
      const lg = ctx.createRadialGradient(sx, footY - 16, 60, sx, footY - 16, Math.max(W, H) * 0.7);
      lg.addColorStop(0, "rgba(0,0,0,0)"); lg.addColorStop(1, `rgba(0,0,0,${dark})`);
      ctx.fillStyle = lg; ctx.fillRect(0, 0, W, H);
    }
    requestAnimationFrame(frame);
  }

  function spawnParts(band, falling, sx, fy, dt) {
    if (parts.length > 140) return;
    const rnd = Math.random, add = (o) => parts.push(Object.assign({ s: 2, life: 2 }, o));
    if (falling && rnd() < dt * 40) add({ x: sx - 8 + rnd() * 16, y: fy - 30, vx: (rnd() - 0.5) * 20, vy: -60 - rnd() * 80, c: "rgba(255,255,255,.7)", life: 0.6 });
    if (rnd() > dt * 14) return;
    const x = rnd() * W, y = rnd() * H;
    if (band === "mushroom") add({ x, y, vx: 0, vy: -12, c: "#8fe8ff", s: 3, life: 3 });
    else if (band === "jungle") add({ x, y, vx: (rnd() - 0.5) * 16, vy: (rnd() - 0.5) * 16, c: "#d6ff5a", life: 2.5 });
    else if (band === "hallow") add({ x, y, vx: 0, vy: 6, c: ["#ff9cf0", "#9cf3ff", "#fff"][Math.floor(rnd() * 3)], life: 1.5 });
    else if (band === "hell") add({ x, y: H + 4, vx: (rnd() - 0.5) * 20, vy: -60 - rnd() * 60, c: rnd() < 0.5 ? "#ff8a2a" : "#ffd04a", s: 3, life: 4 });
  }

  window.World = {
    BANDS, TILE_KEYS, feetFor, bandFor, nextBand,
    init(c) {
      canvas = c; ctx = c.getContext("2d");
      resize(); window.addEventListener("resize", resize);
      loadArt();
      requestAnimationFrame(frame);
    },
    setScore(score, instant) { targetT = Math.max(0, score) * PT_TO_TILE; if (instant) camT = targetT; },
    // where the player's feet sit on screen (0 = top, 1 = bottom)
    setAnchor(r, instant) { anchorTarget = r; if (instant) anchor = r; },
    loadedArt: () => Object.keys(art)
  };
})();
