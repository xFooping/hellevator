// Builds a self-contained answer-review page: tools/review.html
// Usage: node tools/build-review.mjs
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import vm from "node:vm";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const sandbox = { window: {} };
const files = ["data.js", ...readdirSync(join(root, "js")).filter((f) => /^prompts-.*\.js$/.test(f)).sort()];
const batches = [];
for (const f of files) {
  const before = (sandbox.window.PROMPTS || []).length;
  vm.runInNewContext(readFileSync(join(root, "js", f), "utf8"), sandbox);
  batches.push({ name: f === "data.js" ? "Core 12" : f.replace(/^prompts-|\.js$/g, "").replace("batch", "Batch "), from: before, to: sandbox.window.PROMPTS.length });
}
const { TIERS, PROMPTS } = sandbox.window;
const data = JSON.stringify({ TIERS, PROMPTS, batches });

const html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Hellevator · answer review</title>
<style>
:root{--bg:#0e1226;--card:#1a2150;--ink:#eef0fa;--muted:#9aa3c7;--edge:#2c3670}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.45 system-ui,-apple-system,Segoe UI,sans-serif}
header{position:sticky;top:0;background:#0e1226ee;backdrop-filter:blur(6px);padding:12px 18px;border-bottom:1px solid var(--edge);z-index:2}
h1{font-size:20px;margin:0 0 8px}.bar{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.bar button,.bar input{background:var(--card);color:var(--ink);border:1px solid var(--edge);border-radius:8px;padding:6px 10px;font:inherit}
.bar button.on{border-color:#ffde5a;color:#ffde5a}.bar input{min-width:220px}
main{max-width:1000px;margin:0 auto;padding:16px}
.card{background:var(--card);border:1px solid var(--edge);border-radius:12px;padding:14px 16px;margin-bottom:14px}
.head{display:flex;gap:10px;align-items:baseline;flex-wrap:wrap}.ref{font-weight:700;color:#ffde5a}.q{font-size:18px;font-weight:600}
.meta{color:var(--muted);font-size:13px}.row{display:flex;gap:10px;margin-top:8px}.lab{flex:none;width:92px;font-weight:600;font-size:13px;padding-top:3px}
.ans{display:flex;flex-wrap:wrap;gap:4px 6px}.ans span{background:#0006;border-radius:6px;padding:2px 7px}.ans small{color:var(--muted)}
.rej{margin-top:10px;font-size:13px;color:var(--muted)}.rej b{color:#ffcf8a;font-weight:500}.rul{margin-top:8px;font-size:12.5px;color:var(--muted);font-style:italic}
.t-white{color:#fff}.t-gray{color:#9a9a9a}.t-green{color:#96ff96}.t-pink{color:#ff96ff}.t-red{color:#ff4a7d}.t-rainbow{color:#fff35a}
mark{background:#ffde5a;color:#000;border-radius:3px}
</style></head><body>
<header><h1>Hellevator · answer review</h1><div class="bar" id="bar"></div></header>
<main id="main"></main>
<script>
const D=${data};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
let batch=D.batches.length-1,q="";
function bar(){document.getElementById("bar").innerHTML=D.batches.map((b,i)=>'<button data-b="'+i+'" class="'+(i===batch?"on":"")+'">'+b.name+' ('+(b.to-b.from)+')</button>').join("")+'<button data-b="-1" class="'+(batch===-1?"on":"")+'">All</button><input id="q" placeholder="filter answers…" value="'+esc(q)+'">';
document.querySelectorAll("[data-b]").forEach(b=>b.onclick=()=>{batch=+b.dataset.b;bar();draw()});
const i=document.getElementById("q");i.oninput=()=>{q=i.value;draw()};}
function draw(){const out=[];D.PROMPTS.forEach((p,n)=>{
 const bi=D.batches.findIndex(b=>n>=b.from&&n<b.to);if(batch!==-1&&bi!==batch)return;
 const ref=(bi===0?"C":"B"+bi)+"-"+String(n-D.batches[bi].from+1).padStart(2,"0");
 const hl=s=>{const e=esc(s);if(!q)return e;const k=q.toLowerCase(),i=s.toLowerCase().indexOf(k);return i<0?e:esc(s.slice(0,i))+"<mark>"+esc(s.slice(i,i+q.length))+"</mark>"+esc(s.slice(i+q.length))};
 if(q&&!JSON.stringify(p.answers).toLowerCase().includes(q.toLowerCase())&&!p.text.toLowerCase().includes(q.toLowerCase()))return;
 let total=0;const rows=D.TIERS.map(t=>{const a=p.answers[t.key]||[];total+=a.length;if(!a.length)return"";
  return '<div class="row"><div class="lab t-'+t.key+'">'+t.name+' · '+a.length+'</div><div class="ans">'+a.map(x=>{const[n0,...al]=x.split("|");return '<span>'+hl(n0)+(al.length?' <small>('+al.map(hl).join(", ")+')</small>':'')+'</span>'}).join("")+'</div></div>'}).join("");
 const rej=(p.reject||[]).map(([n,m])=>'<div>✗ '+n.split("|").map(hl).join(", ")+' → <b>'+esc(m)+'</b></div>').join("");
 out.push('<div class="card"><div class="head"><span class="ref">'+ref+'</span><span class="q">'+esc(p.text)+'</span><span class="meta">'+esc(p.cat)+' · '+p.kind+' · '+total+' answers'+(p.suffix?' · optional word: "'+esc(p.suffix)+'"':'')+'</span></div>'+rows+(rej?'<div class="rej">Near-misses (rejected with a reason):'+rej+'</div>':'')+(p.rulings?'<div class="rul">'+esc(p.rulings)+'</div>':'')+'</div>')});
 document.getElementById("main").innerHTML=out.join("")||"<p>No matches.</p>";}
bar();draw();
</script></body></html>`;
writeFileSync(join(root, "tools/review.html"), html);
console.log(`review.html: ${PROMPTS.length} prompts in ${batches.length} groups`);
