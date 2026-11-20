/* =========================================================================
   HELLAVATOR — answer matching (shared by the browser and tools/check-data)
   ========================================================================= */
(function (root) {
  "use strict";

  // case, accents, punctuation, spaces, leading the/a/an, trailing "s"
  function normalize(s) {
    let k = String(s).normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase()
      .replace(/&/g, "and").trim().replace(/^(the|a|an)\s+/, "").replace(/[^a-z0-9]/g, "");
    if (k.length > 3 && k.endsWith("s")) k = k.slice(0, -1);
    return k;
  }

  // Optimal string alignment distance with early exit (swaps count as 1).
  function edits(a, b, max) {
    if (Math.abs(a.length - b.length) > max) return max + 1;
    let pp = [], prev = Array.from({ length: b.length + 1 }, (_, j) => j);
    for (let i = 1; i <= a.length; i++) {
      const row = [i];
      let best = i;
      for (let j = 1; j <= b.length; j++) {
        let v = Math.min(prev[j] + 1, row[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
        if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) v = Math.min(v, pp[j - 2] + 1);
        row[j] = v; if (v < best) best = v;
      }
      if (best > max) return max + 1;
      pp = prev; prev = row;
    }
    return prev[b.length];
  }
  const typoBudget = (len) => (len >= 8 ? 2 : len >= 5 ? 1 : 0);

  function tierOrder(tiers) { return tiers.map((t) => t.key); }

  // Build lookup tables for one prompt.
  // entry: { name, names[], tier }   reject: { name, names[], msg }
  function buildIndex(prompt, tiers) {
    const keys = new Map();   // normalized key -> { kind: "answer"|"reject", entry }
    const list = [];          // [{ key, kind, entry }]
    const collisions = [];
    const add = (key, kind, entry) => {
      if (!key) return;
      if (keys.has(key)) {
        const prev = keys.get(key);
        if (prev.entry !== entry) collisions.push({ key, a: prev.entry.name, b: entry.name });
        return;
      }
      keys.set(key, { kind, entry }); list.push({ key, kind, entry });
    };
    const entries = [];
    for (const t of tierOrder(tiers)) for (const raw of prompt.answers[t] || []) {
      const names = raw.split("|");
      entries.push({ name: names[0], names, tier: t });
    }
    const rejects = (prompt.reject || []).flatMap(([raw, msg]) => raw.split("|").map((n) => ({ name: n, names: [n], msg })));
    const suf = prompt.suffix ? normalize(prompt.suffix) : null;
    const variants = (n) => {
      const k = normalize(n), out = [k];
      if (suf && k.endsWith(suf) && k.length > suf.length + 2) out.push(k.slice(0, -suf.length));
      return out;
    };
    // exact names first, suffix-stripped forms after, so exact spellings always win
    for (const pass of [0, 1]) {
      for (const e of entries) for (const n of e.names) { const v = variants(n); if (v[pass]) add(v[pass], "answer", e); }
      for (const r of rejects) { const v = variants(r.name); if (v[pass]) add(v[pass], "reject", r); }
    }
    return { keys, list, entries, rejects, collisions };
  }

  /* judge(prompt, guess, ctx) -> one of
       { type: "hit", entry }
       { type: "reject", name, msg }        a real near-miss we explain
       { type: "real", name }               a real Terraria name that doesn't fit
       { type: "suggest", name, target }    typo; target = the result if confirmed
       { type: "miss" }
     ctx = { tiers, allNames: [{ key, name }], cache: Map }                       */
  function judge(prompt, guess, ctx) {
    const key = normalize(guess);
    if (!key) return { type: "miss" };
    const idx = getIndex(prompt, ctx);
    const exact = idx.keys.get(key);
    if (exact) return exact.kind === "answer" ? { type: "hit", entry: exact.entry } : { type: "reject", name: exact.entry.name, msg: exact.entry.msg };
    const real = ctx.realMap && ctx.realMap.get(key);
    if (real) return { type: "real", name: real };

    // Typo correction draws from the WHOLE dictionary (answers + every known
    // Terraria name), so a suggestion never reveals whether something is valid.
    const budget = typoBudget(key.length);
    if (!budget) return { type: "miss" };
    let best = null, bestD = budget + 1, tie = false;
    const consider = (k, name, target) => {
      const d = edits(key, k, Math.min(budget, bestD));
      if (d < bestD) { best = { name, target }; bestD = d; tie = false; }
      else if (d === bestD && best && best.name !== name) tie = true;
    };
    for (const { key: k, kind, entry } of idx.list) {
      consider(k, entry.name, kind === "answer" ? { type: "hit", entry } : { type: "reject", name: entry.name, msg: entry.msg });
    }
    for (const { key: k, name } of ctx.allNames || []) consider(k, name, { type: "real", name });
    if (best && !tie) return { type: "suggest", name: best.name, target: best.target };
    return { type: "miss" };
  }

  function getIndex(prompt, ctx) {
    ctx.cache = ctx.cache || new Map();
    if (!ctx.cache.has(prompt.id)) ctx.cache.set(prompt.id, buildIndex(prompt, ctx.tiers));
    return ctx.cache.get(prompt.id);
  }

  // Prepare the global dictionary once: game item names + every answer/reject name.
  function makeContext(tiers, prompts, extraNames) {
    const realMap = new Map();
    const addName = (n) => { const k = normalize(n); if (k && !realMap.has(k)) realMap.set(k, n); };
    (extraNames || []).forEach(addName);
    for (const p of prompts) {
      for (const t of tiers) for (const raw of p.answers[t.key] || []) raw.split("|").forEach(addName);
      for (const [raw] of p.reject || []) raw.split("|").forEach(addName);
    }
    const allNames = [...realMap].map(([key, name]) => ({ key, name }));
    return { tiers, realMap, allNames, cache: new Map() };
  }

  const api = { normalize, edits, buildIndex, judge, makeContext };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Match = api;
})(typeof window !== "undefined" ? window : globalThis);
