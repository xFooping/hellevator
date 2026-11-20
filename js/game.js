/* =========================================================================
   HELLEVATOR — game logic
   ========================================================================= */
(function () {
  "use strict";

  const CFG = {
    ROUNDS: 7,
    ROUND_MS: 25000,
    START_DATE: "2026-11-19",          // Dive #1 = launch day. Set before deploying.
    TZ: "America/New_York",            // daily reset: midnight Eastern
    STORE_KEY: "hellevator:v2",
    SITE_URL: "hellevator.io",
    MAX: 700
  };
  const MISS_HEART = "🖤";
  const MISS_LINES = [
    "The rope ran out.",
    "Blanked. Happens to the best of us.",
    "Not even the Guide had anything.",
    "The clock hit bedrock first.",
    "Nothing came up the shaft."
  ];

  const TIERS = window.TIERS;
  const TIER = Object.fromEntries(TIERS.map((t) => [t.key, t]));
  const PROMPTS = window.PROMPTS;
  const BY_ID = Object.fromEntries(PROMPTS.map((p) => [p.id, p]));
  const MATCH = window.Match.makeContext(TIERS, PROMPTS, window.GAME_NAMES || []);

  // ---------- helpers ----------
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const sum = (rounds) => rounds.reduce((a, r) => a + (r.pts || 0), 0);
  const primary = (raw) => raw.split("|")[0];

  // ---------- dates (Eastern) ----------
  // Local dev only: ?date=YYYY-MM-DD pretends it's that day (to test the archive).
  const DEV = location.protocol === "file:" || ["localhost", "127.0.0.1", ""].includes(location.hostname);
  const OVERRIDE = DEV && /^\d{4}-\d{2}-\d{2}$/.test(new URLSearchParams(location.search).get("date") || "") ? new URLSearchParams(location.search).get("date") : null;
  const etDate = (ms) => new Intl.DateTimeFormat("en-CA", { timeZone: CFG.TZ, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(ms));
  const today = () => OVERRIDE || etDate(Date.now());
  const addDays = (date, n) => new Date(Date.parse(date + "T12:00:00Z") + n * 86400000).toISOString().slice(0, 10);
  const dayDiff = (a, b) => Math.round((Date.parse(b + "T12:00:00Z") - Date.parse(a + "T12:00:00Z")) / 86400000);
  const diveNumber = (date) => dayDiff(CFG.START_DATE, date) + 1;
  const prettyDate = (date) => new Date(date + "T12:00:00Z").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
  function msToMidnight() {
    const now = etDate(Date.now()); let t = Date.now();
    for (const step of [3600000, 60000, 1000]) while (etDate(t + step) === now) t += step;
    return t + 1000 - Date.now();
  }
  const fmtHMS = (ms) => { const s = Math.max(0, Math.floor(ms / 1000)); return [s / 3600, (s % 3600) / 60, s % 60].map((n) => String(Math.floor(n)).padStart(2, "0")).join(":"); };

  // ---------- the daily schedule ----------
  // Simulated day by day from launch so past days NEVER change:
  //  - a prompt is only available from its `added` date (default: launch day)
  //  - never-dealt prompts go first, in file order
  //  - then the least-recently-dealt ones, ties broken by a seeded hash
  //  - avoid two prompts from the same category in one day when possible
  // Rules for editing data.js: append new prompts at the end with `added` set
  // to a FUTURE date; never delete or reorder prompts. Editing answers is fine.
  function strHash(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  const schedule = [];
  const lastDealt = new Map();
  function dealDay(n) {
    while (schedule.length <= n) {
      const d = schedule.length, date = addDays(CFG.START_DATE, d);
      const avail = PROMPTS.filter((p) => (p.added || CFG.START_DATE) <= date);
      const fresh = avail.filter((p) => !lastDealt.has(p.id));
      const old = avail.filter((p) => lastDealt.has(p.id))
        .sort((a, b) => lastDealt.get(a.id) - lastDealt.get(b.id) || strHash(a.id + date) - strHash(b.id + date));
      const picked = [], cats = new Set();
      for (const strict of [true, false]) for (const p of [...fresh, ...old]) {
        if (picked.length >= CFG.ROUNDS) break;
        if (picked.includes(p) || (strict && cats.has(p.cat))) continue;
        picked.push(p); cats.add(p.cat);
      }
      picked.forEach((p) => lastDealt.set(p.id, d));
      schedule.push(picked.map((p) => p.id));
    }
    return schedule[n];
  }
  const idsForDate = (date) => dealDay(Math.max(0, diveNumber(date) - 1));
  function dealRandom() {
    const a = PROMPTS.map((p) => p.id);
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a.slice(0, CFG.ROUNDS);
  }

  // ---------- storage ----------
  function load() {
    try { const s = JSON.parse(localStorage.getItem(CFG.STORE_KEY)); if (s && s.daily) return s; } catch (e) {}
    return { daily: {}, archive: {}, unlimited: { played: 0, best: 0 }, deepest: 0 };
  }
  let store = load();
  const save = () => { try { localStorage.setItem(CFG.STORE_KEY, JSON.stringify(store)); } catch (e) {} };
  const done = (rec) => rec && rec.rounds.length >= CFG.ROUNDS;

  // ---------- run state ----------
  let run = null;        // { mode, date, number, rec }
  let locked = false, pending = null, timerId = null;
  const prompt = () => BY_ID[run.rec.ids[run.rec.rounds.length]];

  function recFor(mode, date) {
    const bucket = mode === "daily" ? store.daily : store.archive;
    if (!bucket[date]) bucket[date] = { ids: idsForDate(date), rounds: [] };
    return bucket[date];
  }
  function startDated(mode, date) {
    const rec = recFor(mode, date);
    run = { mode, date, number: diveNumber(date), rec };
    if (rec.deadline && Date.now() >= rec.deadline && !done(rec)) record(null, "time");   // closed the tab mid-round
    if (done(rec)) return showResults(true);
    World.setScore(sum(rec.rounds), true);
    show("round"); beginRound();
  }
  function startUnlimited() {
    run = { mode: "unlimited", rec: { ids: dealRandom(), rounds: [] } };
    World.setScore(0, true);
    show("round"); beginRound();
  }

  function beginRound() {
    const i = run.rec.rounds.length, p = prompt();
    locked = false; pending = null;
    $("rCat").textContent = p.cat;
    $("rNo").textContent = `${i + 1} / ${CFG.ROUNDS}`;
    $("rScore").textContent = sum(run.rec.rounds);
    $("rPrompt").textContent = p.text;
    setFeedback("");
    $("rReveal").hidden = true; $("rPlay").hidden = false;
    $("guess").value = ""; $("guess").disabled = false;
    setTimeout(() => $("guess").focus(), 30);
    let deadline = Date.now() + CFG.ROUND_MS;
    if (run.mode !== "unlimited") {
      if (run.rec.deadline && run.rec.deadline > Date.now()) deadline = run.rec.deadline;
      run.rec.deadline = deadline; save();
    }
    run.deadline = deadline;
    clearInterval(timerId); timerId = setInterval(tick, 100); tick();
    updateMeter(sum(run.rec.rounds));
  }

  function tick() {
    const left = run.deadline - Date.now();
    $("rTimer").style.transform = `scaleX(${Math.max(0, left / CFG.ROUND_MS)})`;
    $("rSecs").textContent = Math.ceil(Math.max(0, left) / 1000);
    $("rTimerWrap").classList.toggle("low", left < 6000);
    if (left <= 0 && !locked) finishRound(null, "time");
  }

  function setFeedback(html, cls = "") { const f = $("rFeedback"); f.className = "feedback " + cls; f.innerHTML = html; }
  function shake() { const f = $("guessForm"); f.classList.remove("shake"); void f.offsetWidth; f.classList.add("shake"); $("guess").select(); }

  function submitGuess(e) {
    e.preventDefault();
    if (locked) return;
    const guess = $("guess").value.trim();
    if (!guess) return;
    // Enter on an unchanged guess confirms the "did you mean"
    if (pending && pending.key === window.Match.normalize(guess)) return resolve(pending.target, guess);
    const r = window.Match.judge(prompt(), guess, MATCH);
    if (r.type === "suggest") {
      pending = { key: window.Match.normalize(guess), target: r.target };
      setFeedback(`Did you mean <b>${esc(r.name)}</b>? <button class="btn yes" type="button" id="btnYes">YES ↵</button>`);
      $("btnYes").onclick = () => resolve(pending.target, guess);
      return;
    }
    resolve(r, guess);
  }
  function resolve(r, guess) {
    pending = null;
    if (r.type === "hit") return finishRound(r.entry, "hit", guess);
    if (r.type === "reject") setFeedback(`<b>${esc(r.name)}</b>: ${esc(r.msg)}`, "real");
    else setFeedback("Not on the list. Keep digging.", "bad");   // misses and real-but-wrong items look the same
    shake();
  }

  function record(entry, why, guess) {
    const p = prompt();
    const r = entry
      ? { id: p.id, guess: guess || entry.name, answer: entry.name, tier: entry.tier, pts: TIER[entry.tier].pts }
      : { id: p.id, guess: null, answer: null, tier: null, pts: 0, why };
    run.rec.rounds.push(r);
    delete run.rec.deadline;
    if (run.mode !== "unlimited") save();
    return r;
  }

  function finishRound(entry, why, guess) {
    if (locked) return;
    locked = true; pending = null;
    clearInterval(timerId);
    const r = record(entry, why, guess), total = sum(run.rec.rounds);
    World.setScore(total); updateMeter(total);
    $("rScore").textContent = total;
    $("rPlay").hidden = true;
    const tierEl = $("rvTier");
    if (r.tier) {
      const t = TIER[r.tier];
      tierEl.className = "reveal-tier t-" + t.key;
      tierEl.innerHTML = `<span class="name">${t.label}</span>`;
      $("rvAnswer").textContent = r.answer;
      $("rvPts").textContent = `+${t.pts} pts · ▼ ${World.feetFor(t.pts)}'`;
      $("rvBlurb").textContent = t.blurb;
    } else {
      tierEl.className = "reveal-tier";
      tierEl.textContent = "Time's up";
      $("rvAnswer").textContent = "";
      $("rvPts").textContent = "+0 pts";
      $("rvBlurb").textContent = MISS_LINES[Math.floor(Math.random() * MISS_LINES.length)];
    }
    $("rReveal").hidden = false;
    $("btnNext").textContent = done(run.rec) ? "SEE RESULTS ▸" : "NEXT ▸";
    setTimeout(() => $("btnNext").focus(), 50);
  }
  const nextRound = () => (done(run.rec) ? showResults(false) : beginRound());

  // ---------- results + answer key ----------
  let countdownId = null;
  function showResults(instant) {
    clearInterval(timerId);
    const rounds = run.rec.rounds, total = sum(rounds), band = World.bandFor(total);
    World.setScore(total, instant); updateMeter(total);
    if (!run.counted) {
      run.counted = true;
      store.deepest = Math.max(store.deepest || 0, total);
      if (run.mode === "unlimited") { store.unlimited.played++; store.unlimited.best = Math.max(store.unlimited.best, total); }
      save();
    }
    $("resKicker").textContent = run.mode === "daily" ? `DAILY DIVE #${run.number}` : run.mode === "archive" ? `ARCHIVE · DIVE #${run.number} · ${prettyDate(run.date)}` : "UNLIMITED DIVE";
    $("resFeet").textContent = World.feetFor(total);
    $("resLayer").textContent = band.name;
    $("resFlavor").textContent = total >= CFG.MAX ? "Perfect dive. You found the Wall of Flesh. It found you too." : band.flavor;
    $("resScore").textContent = total;
    $("resHearts").textContent = hearts(rounds);
    $("btnAgain").hidden = run.mode !== "unlimited";
    clearInterval(countdownId);
    if (run.mode === "daily") {
      const upd = () => ($("nextDive").textContent = `Next dive in ${fmtHMS(msToMidnight())}`);
      upd(); countdownId = setInterval(upd, 1000);
    } else $("nextDive").textContent = run.mode === "unlimited" ? `Unlimited best: ${store.unlimited.best} pts` : "";
    renderKey(rounds);
    show("results");
  }
  const hearts = (rounds) => rounds.map((r) => (r.tier ? TIER[r.tier].heart : MISS_HEART)).join("");

  function renderKey(rounds) {
    $("keyList").innerHTML = rounds.map((r, i) => {
      const p = BY_ID[r.id];
      const yours = r.tier ? `<span class="tier-chip t-${r.tier}"><span class="name">${esc(r.answer)}</span></span>` : `<span class="miss">no answer</span>`;
      return `<div class="key-item" data-i="${i}">
        <button class="key-head" type="button"><span class="num">${i + 1}</span><span class="q">${esc(p.text)}</span>${yours}<span class="caret">▸</span></button>
        <div class="key-body" hidden></div></div>`;
    }).join("");
    $("keyList").querySelectorAll(".key-item").forEach((el) => {
      el.querySelector(".key-head").onclick = () => {
        const body = el.querySelector(".key-body"), open = !el.classList.contains("open");
        el.classList.toggle("open", open); body.hidden = !open;
        if (open && !body.dataset.ready) { body.dataset.ready = "1"; renderKeyBody(body, rounds[+el.dataset.i]); }
      };
    });
  }
  // Krillion-style list: tabs for All + each rarity, one answer per row.
  function renderKeyBody(body, r) {
    const p = BY_ID[r.id];
    const rows = [];
    TIERS.forEach((t, rank) => (p.answers[t.key] || []).forEach((raw) => {
      const [name, ...alias] = raw.split("|");
      rows.push({ name, alias, tier: t.key, rank });
    }));
    const byName = (a, b) => a.name.localeCompare(b.name);
    let sel = r.tier || "all", q = "";
    const draw = () => {
      const tabs = [`<button type="button" class="tier-chip all ${sel === "all" ? "on" : ""}" data-t="all"><span class="name">All</span><span class="count">${rows.length}</span></button>`]
        .concat(TIERS.map((t) => {
          const n = rows.filter((x) => x.tier === t.key).length;
          return `<button type="button" class="tier-chip t-${t.key} ${t.key === sel ? "on" : ""}" data-t="${t.key}" ${n ? "" : "disabled"}><span class="name">${t.name}</span><span class="count">${n}</span></button>`;
        })).join("");
      let list = sel === "all" ? rows.slice().sort((a, b) => b.rank - a.rank || byName(a, b)) : rows.filter((x) => x.tier === sel).sort(byName);
      const needle = window.Match.normalize(q);
      if (needle) list = list.filter((x) => [x.name, ...x.alias].some((n) => window.Match.normalize(n).includes(needle)));
      const items = list.map((x) => {
        const t = TIER[x.tier], you = x.name === r.answer;
        const alias = x.alias.length ? `<span class="alias">${esc(x.alias.slice(0, 2).join(", "))}</span>` : "";
        return `<li class="${you ? "you" : ""}"><span>${esc(x.name)}${alias}${you ? '<span class="badge">YOU</span>' : ""}</span><span class="tag t-${t.key}"><span class="name">${sel === "all" ? t.name + " · " : ""}${t.pts}</span></span></li>`;
      }).join("") || `<li class="empty">No matches.</li>`;
      body.querySelector(".tier-tabs").innerHTML = tabs;
      body.querySelector(".ans-list").innerHTML = items;
      body.querySelectorAll(".tier-tabs button").forEach((b) => (b.onclick = () => { sel = b.dataset.t; draw(); }));
    };
    body.innerHTML = `<div class="tier-tabs"></div>${rows.length > 20 ? '<input class="key-search" type="search" placeholder="filter answers…" aria-label="Filter answers">' : ""}<ul class="ans-list"></ul>`;
    const search = body.querySelector(".key-search");
    if (search) search.oninput = () => { q = search.value; draw(); };
    draw();
  }

  function shareText() {
    const total = sum(run.rec.rounds), band = World.bandFor(total);
    const url = /^https?:/.test(location.protocol) && !DEV
      ? (location.host + location.pathname.replace(/index\.html$/, "")).replace(/\/$/, "")   // e.g. xfooping.github.io/hellevator
      : CFG.SITE_URL;
    const head = run.mode === "unlimited" ? "Hellevator ∞ ⛏️" : `Hellevator #${run.number} ⛏️`;
    return `${head}\n${total} pts · ${World.feetFor(total)}' ${band.name}\n${hearts(run.rec.rounds)}\n${url}`;
  }
  async function share() {
    const text = shareText();
    try {
      if (navigator.share && matchMedia("(pointer: coarse)").matches) { await navigator.share({ text }); return; }
      await navigator.clipboard.writeText(text); toast("Copied to clipboard");
    } catch (e) { toast("Couldn't copy"); }
  }

  // ---------- title ----------
  let titleTimer = null;
  function renderTitle() {
    clearInterval(timerId); clearInterval(titleTimer);
    const date = today(), n = diveNumber(date), rec = store.daily[date];
    $("titleDate").textContent = `Dive #${n} · ${prettyDate(date)}`;
    const btn = $("btnStart"), st = $("titleStatus");
    if (done(rec)) {
      const total = sum(rec.rounds), band = World.bandFor(total);
      btn.textContent = "Today's Results";
      const upd = () => (st.innerHTML = `${World.feetFor(total)}' · ${esc(band.name)} · ${hearts(rec.rounds)}<br>Next dive in ${fmtHMS(msToMidnight())}`);
      upd(); titleTimer = setInterval(upd, 1000);
    } else {
      btn.textContent = rec && rec.rounds.length ? "Continue Dig" : "Start Dig";
      st.textContent = "7 prompts · 25 seconds each · rarer goes deeper";
    }
    World.setScore(0); updateMeter(0);
    show("title");
  }

  // ---------- archive ----------
  function renderArchive() {
    const t = today(), count = diveNumber(t) - 1;
    const rows = [];
    for (let k = count; k >= 1; k--) {
      const date = addDays(CFG.START_DATE, k - 1);
      const rec = done(store.daily[date]) ? store.daily[date] : done(store.archive[date]) ? store.archive[date] : null;
      const res = rec ? `${World.feetFor(sum(rec.rounds))}' · ${hearts(rec.rounds)}` : "";
      rows.push(`<li><span class="no">#${k}</span><span class="date">${prettyDate(date)}</span><span class="res">${res}</span>
        <button class="btn" data-date="${date}">${rec ? "RESULTS" : store.archive[date] && store.archive[date].rounds.length ? "RESUME" : "DIG"}</button></li>`);
    }
    $("archiveList").innerHTML = rows.join("") || `<li class="archive-empty">No past dives yet. Come back tomorrow.</li>`;
    $("archiveList").querySelectorAll("button[data-date]").forEach((b) => (b.onclick = () => {
      const d = b.dataset.date;
      if (done(store.daily[d])) { run = { mode: "daily", date: d, number: diveNumber(d), rec: store.daily[d] }; showResults(true); }
      else startDated("archive", d);
    }));
    World.setScore(0); updateMeter(0);
    show("archive");
  }

  // ---------- modals ----------
  function renderHowto() {
    $("howtoLegend").innerHTML = TIERS.map((t) => `<div class="row"><span class="tier-chip t-${t.key}"><span class="name">${t.heart} ${t.label}</span><span class="pts">${t.pts}</span></span><span class="desc">${esc(t.blurb)}</span></div>`).join("");
    const sw = { surface: "#976b4b", under: "#6e4f38", cavern: "#727272", mushroom: "#5875ff", jungle: "#8fd71d", hallow: "#e9a7e4", hell: "#ff6a00" };
    $("howtoBands").innerHTML = World.BANDS.map((b) => `<li><span class="sw" style="background:${sw[b.key]}"></span>${b.name}<span class="ft">${World.feetFor(b.min)}'+</span></li>`).join("");
  }
  function renderStats() {
    const finished = Object.entries(store.daily).filter(([, r]) => done(r));
    const scores = finished.map(([, r]) => sum(r.rounds));
    const best = scores.length ? Math.max(...scores) : 0;
    const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
    const set = new Set(finished.map(([d]) => d));
    let streak = 0, cur = today();
    if (!set.has(cur)) cur = addDays(cur, -1);
    while (set.has(cur)) { streak++; cur = addDays(cur, -1); }
    $("statGrid").innerHTML = [["Played", finished.length], ["Best", best], ["Average", avg], ["Streak", streak]].map(([l, v]) => `<div><b>${v}</b><span>${l}</span></div>`).join("");
    const deep = store.deepest || 0;
    $("statDeepest").textContent = `${World.bandFor(deep).name} (${World.feetFor(deep)}')`;
  }
  function openModal(name) { if (name === "howto") renderHowto(); if (name === "stats") renderStats(); $("modal-" + name).hidden = false; }

  // ---------- plumbing ----------
  const ANCHOR = { title: 0.74, round: 0.9, results: 0.9, archive: 0.9 };
  function show(name) {
    document.querySelectorAll(".screen").forEach((s) => (s.hidden = s.id !== "screen-" + name));
    if (name !== "results") clearInterval(countdownId);
    if (name !== "title") clearInterval(titleTimer);
    World.setAnchor(ANCHOR[name] || 0.8);
    window.scrollTo(0, 0);
  }
  function updateMeter(score) {
    const band = World.bandFor(score), nb = World.nextBand(score);
    $("dmFeet").textContent = World.feetFor(score);
    $("dmLayer").textContent = band.name;
    $("dmNext").textContent = nb ? `${World.feetFor(nb.min - score)}' to ${nb.name}` : "Rock bottom";
  }
  let toastT;
  function toast(msg) { const t = $("toast"); t.textContent = msg; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => (t.hidden = true), 1800); }
  function goTitle() {
    if (run && !$("screen-round").hidden && !locked && run.mode === "unlimited" && !confirm("Abandon this dive?")) return;
    renderTitle();
  }

  function bind() {
    $("btnStart").onclick = () => startDated("daily", today());
    $("btnArchive").onclick = renderArchive;
    $("btnUnlimited").onclick = startUnlimited;
    $("btnAgain").onclick = startUnlimited;
    $("logo").onclick = goTitle;
    $("guessForm").addEventListener("submit", submitGuess);
    $("guess").addEventListener("input", () => { if (pending && pending.key !== window.Match.normalize($("guess").value)) { pending = null; setFeedback(""); } });
    $("btnNext").onclick = nextRound;
    $("btnShare").onclick = share;
    document.querySelectorAll("[data-go=title]").forEach((b) => (b.onclick = goTitle));
    document.querySelectorAll("[data-modal]").forEach((b) => (b.onclick = () => openModal(b.dataset.modal)));
    document.querySelectorAll(".modal").forEach((m) => m.addEventListener("click", (e) => { if (e.target === m || e.target.hasAttribute("data-close")) m.hidden = true; }));
    window.addEventListener("scroll", () => document.querySelector(".hud").classList.toggle("solid", window.scrollY > 8), { passive: true });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") document.querySelectorAll(".modal").forEach((m) => (m.hidden = true)); });
  }

  // ---------- boot ----------
  World.init($("world"));
  World.setAnchor(ANCHOR.title, true);
  bind();
  renderTitle();
  if (!localStorage.getItem(CFG.STORE_KEY + ":seen")) { openModal("howto"); try { localStorage.setItem(CFG.STORE_KEY + ":seen", "1"); } catch (e) {} }

  window.Hellevator = { idsForDate, today, store: () => store, judge: (id, g) => window.Match.judge(BY_ID[id], g, MATCH) };
})();
