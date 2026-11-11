# Three visually distinct scenes: scene11 (code editor), scene12 (paper sketch), scene13 (Ghana poster).
s3 = open('scene3.html').read()
i = s3.index("const FMT"); j = s3.index("// ---------------- timeline", i)
HELPERS = s3[i:j]
FONTS = """@font-face{font-family:'Syne';font-weight:800;src:url('fonts/Syne-800.woff2') format('woff2');}
@font-face{font-family:'Syne';font-weight:700;src:url('fonts/Syne-700.woff2') format('woff2');}
@font-face{font-family:'Figtree';font-weight:700;src:url('fonts/Figtree-700.woff2') format('woff2');}
@font-face{font-family:'Figtree';font-weight:500;src:url('fonts/Figtree-500.woff2') format('woff2');}
* { margin:0; padding:0; box-sizing:border-box; } html, body { overflow:hidden; }
#stage { position:relative; overflow:hidden; } .abs { position:absolute; left:0; top:0; transform-origin:0 0; }
"""
def page(bg, css, body, js, dur, fontload):
    return f"""<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="fonts/local.css"><style>{FONTS}
body, #stage {{ background:{bg}; }}
{css}</style></head><body><div id="stage">
{body}</div><script>
{HELPERS}
function vis(t, a, b) {{ return t >= a - 0.001 && t < b; }}
function reveal(el, t, t0, t1, x, y, d = 0.7) {{ const k = 1 - Math.pow(1 - clamp((t - t0) / d), 4), out = easeIn((t - t1 + 0.35) / 0.35), on = vis(t, t0, t1 + 0.01);
  el.style.transform = `translate(${{x}}px,${{y + (1 - k) * 70 - out * 40}}px)`; el.style.clipPath = `inset(${{out * 100}}% 0 ${{(1 - k) * 100}}% 0)`; el.style.opacity = on ? 1 : 0; }}
const EXPO = t => t <= 0 ? 0 : t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
function fit(el, maxW) {{ const fs = parseFloat(getComputedStyle(el).fontSize), w = el.scrollWidth; if (w > maxW) el.style.fontSize = (fs * maxW / w) + 'px'; }}
{js}
window.__duration = {dur};
window.__events = EVENTS;
window.__seek = seek;
Promise.all([{fontload}].map(f => document.fonts.load(f)))
  .then(() => document.fonts.ready)
  .then(() => Promise.all([...document.images].map(i => i.complete ? 0 : new Promise(r => {{ i.onload = i.onerror = r; }}))))
  .then(() => {{ if (typeof prep === 'function') prep(); seek(0); window.__ready = true; }});
</script></body></html>"""

# ---------------- scene11: code editor -> live site (dark, mono, neon) 18s ----------------
CODE = [
 ('<span class=c>&lt;!-- sleekconnectstore.com --&gt;</span>'),
 ('<span class=t>&lt;div</span> <span class=a>class</span>=<span class=s>"promo"</span><span class=t>&gt;</span>Free delivery in Accra<span class=t>&lt;/div&gt;</span>'),
 ('<span class=t>&lt;header&gt;</span>Sleek Connect Store<span class=t>&lt;/header&gt;</span>'),
 ('<span class=t>&lt;input</span> <span class=a>placeholder</span>=<span class=s>"Search products"</span><span class=t>&gt;</span>'),
 (''),
 ('<span class=t>&lt;nav&gt;</span>Beauty · Baby &amp; Kids · Electronics<span class=t>&lt;/nav&gt;</span>'),
 (''),
 ('<span class=t>&lt;section</span> <span class=a>id</span>=<span class=s>"new-arrivals"</span><span class=t>&gt;</span>'),
 ('  <span class=t>&lt;card</span> <span class=a>item</span>=<span class=s>"Polo T-Shirt"</span> <span class=a>price</span>=<span class=s>"GH₵ 180"</span><span class=t>/&gt;</span>'),
 ('  <span class=t>&lt;card</span> <span class=a>item</span>=<span class=s>"Omaya backpack"</span> <span class=a>price</span>=<span class=s>"GH₵ 310"</span><span class=t>/&gt;</span>'),
 ('  <span class=t>&lt;button&gt;</span>Quick Add<span class=t>&lt;/button&gt;</span>'),
 ('<span class=t>&lt;/section&gt;</span>'),
 (''),
 ('<span class=t>&lt;checkout</span> <span class=a>pay</span>=<span class=s>"MoMo, card"</span><span class=t>/&gt;</span>'),
 ('<span class=k>@media</span> (max-width: <span class=n>600px</span>) { <span class=c>/* phones first */</span> }'),
]
CSS11 = """
#hook { font-family:'Figtree'; font-weight:700; color:#E6EDF3; font-size:84px; line-height:1.05; letter-spacing:-.03em; }
#hook em { font-style:normal; color:#7EE787; }
#ed { width:960px; height:1050px; border-radius:22px; background:#11151B; box-shadow:0 0 0 1px #262C35; overflow:hidden; }
#ed .tabs { height:70px; background:#0D1117; display:flex; align-items:flex-end; padding-left:24px; gap:8px; border-bottom:1px solid #30363D; }
#ed .tab { font:500 28px 'JetBrains Mono', monospace; color:#7D8590; padding:14px 26px; border-radius:12px 12px 0 0; }
#ed .tab.on { background:#161B22; color:#E6EDF3; box-shadow:inset 0 3px 0 #F78166; }
#code { position:absolute; left:0; top:96px; font:500 31px/1.62 'JetBrains Mono', monospace; color:#E6EDF3; white-space:pre; }
#code .ln { display:inline-block; width:88px; text-align:right; padding-right:26px; color:#484F58; }
.t{color:#7EE787}.a{color:#79C0FF}.s{color:#A5D6FF}.c{color:#8B949E}.k{color:#FF7B72}.n{color:#79C0FF}
#cur { display:inline-block; width:16px; height:34px; background:#E6EDF3; vertical-align:-6px; }
#term { width:960px; height:250px; border-radius:22px; background:#010409; box-shadow:0 0 0 1px #30363D; font:500 30px/1.7 'JetBrains Mono', monospace; color:#E6EDF3; padding:26px 34px; }
#term .ok { color:#7EE787; } #term .dim { color:#7D8590; }
#phone { width:520px; height:1060px; border-radius:72px; background:#fff; box-shadow:0 0 0 10px #050607, 0 0 0 12px #3A3F47; overflow:hidden; }
#isl { width:150px; height:44px; border-radius:22px; background:#050607; }
#phone img { position:absolute; left:0; top:62px; width:520px; }
#live { font:600 34px 'JetBrains Mono', monospace; color:#E6EDF3; white-space:nowrap; display:flex; align-items:center; gap:16px; }
#live i { width:18px; height:18px; border-radius:50%; background:#3FB950; box-shadow:0 0 18px #3FB950; display:block; }
#endt { font:500 42px/1.8 'JetBrains Mono', monospace; color:#E6EDF3; white-space:pre; }
#endt .p { color:#7EE787; } #endt .s { color:#A5D6FF; } #endt .c { color:#8B949E; }
#brand { font-family:'Syne'; font-weight:800; font-size:64px; color:#E6EDF3; letter-spacing:-.02em; }
#brand em { font-style:normal; color:#7EE787; }
"""
lines_html = ''.join(f'<div class="cl" id="cl{k}"><span class="ln">{k+1}</span><span class="tx"></span></div>' for k in range(len(CODE)))
BODY11 = f"""<div class="abs" id="hook">POV: your website<br>being built <em>line by line</em></div>
<div class="abs" id="ed"><div class="tabs"><div class="tab on">index.html</div><div class="tab">style.css</div></div><div id="code">{lines_html}</div></div>
<div class="abs" id="term"><div id="t1"><span class="dim">$</span> npm run build</div><div id="t2" class="ok">✓ compiled for every screen size</div><div id="t3" class="ok">✓ live on sleekconnectstore.com</div></div>
<div class="abs" id="phone"><img id="pimg" src="assets/st-sleek-m.jpg"><div class="abs" id="isl"></div></div>
<div class="abs" id="live"><i></i>LIVE · Sleek Connect Store</div>
<div class="abs" id="brand">Ecstasy <em>Technologies</em></div>
<div class="abs" id="endt"></div>
"""
import json
JS11 = f"""
const CODE = {json.dumps(CODE)};
function prep() {{ $('brand').style.letterSpacing = '-.02em'; fit($('brand'), 900); }}
const T = {{ type0: 0.9, type1: 7.2, build: 7.4, flash: 9.1, phone: 9.2, scroll0: 10.0, scroll1: 14.0, end: 14.4, dur: 18.0 }};
// plain-text lengths for typing
const plain = CODE.map(h => {{ const d = document.createElement('div'); d.innerHTML = h; return d.textContent; }});
const total = plain.reduce((a, s) => a + Math.max(1, s.length), 0);
const ENDL = [['<span class=p>&gt;</span> need_a_website<span class=c>()</span>', 0.25], ['<span class=p>&gt;</span> whatsapp(<span class=s>"+233 54 285 5399"</span>)', 1.0], ['<span class=p>&gt;</span> open(<span class=s>"ecstasytechnologies.com"</span>)', 1.9], ['<span class=c>// websites · apps · software</span>', 2.8]];
const EVENTS = [{{ t: 0.1, k: 'thump' }}];
for (let tt = T.type0; tt < T.type1; tt += 0.16) EVENTS.push({{ t: tt, k: 'key' }});
EVENTS.push({{ t: T.build, k: 'click' }}, {{ t: T.build + 0.6, k: 'blip' }}, {{ t: T.build + 1.2, k: 'chime' }}, {{ t: T.flash - 0.4, k: 'riser_end' }}, {{ t: T.flash, k: 'slam' }}, {{ t: T.end, k: 'whoosh' }});
ENDL.forEach(([, d]) => EVENTS.push({{ t: T.end + d, k: 'key' }}));
EVENTS.push({{ t: T.end + 3.3, k: 'chord' }});
function seek(t) {{
  // hook
  reveal($('hook'), t, 0.1, T.flash, 60, 120, 0.9);
  // editor
  {{ const k = EXPO((t - 0.2) / 1.1), out = easeInOut((t - T.flash + 0.5) / 0.5), push = 1 + 0.03 * clamp((t - 1.3) / 6);
    $('ed').style.transform = `translate(60px,${{400 + (1 - k) * 160}}px) perspective(1800px) rotateX(${{(1 - k) * 28 + out * -12}}deg) scale(${{push * (1 - out * 0.25)}})`;
    $('ed').style.transformOrigin = '50% 0%'; $('ed').style.opacity = vis(t, 0.2, T.flash) ? clamp((t - 0.2) / .3) * (1 - out) : 0; }}
  // typing
  const p = clamp((t - T.type0) / (T.type1 - T.type0)); let budget = Math.floor(p * total);
  let curLine = 0;
  CODE.forEach((h, k) => {{
    const el = document.querySelector('#cl' + k + ' .tx'), len = Math.max(1, plain[k].length);
    const n = Math.max(0, Math.min(len, budget)); budget -= len;
    if (n >= len) el.innerHTML = h; else {{ el.textContent = plain[k].slice(0, n); if (n > 0 || budget + len > 0) curLine = k; }}
    if (n > 0 && n < len) curLine = k;
  }});
  document.querySelectorAll('#cur').forEach(c => c.remove());
  if (t < T.flash) {{ const c = document.createElement('span'); c.id = 'cur'; c.style.opacity = (p < 1 || Math.floor(t * 2.5) % 2) ? 1 : 0; document.querySelector('#cl' + (p >= 1 ? CODE.length - 1 : curLine) + ' .tx').appendChild(c); }}
  // terminal
  {{ const k = HEAVY(t - T.build), out = easeIn((t - T.flash + 0.25) / 0.25);
    set($('term'), {{ x: 60, y: 1490 + (1 - k) * 300, o: vis(t, T.build, T.flash) ? 1 - out : 0 }});
    $('t2').style.opacity = t > T.build + 0.6 ? 1 : 0; $('t3').style.opacity = t > T.build + 1.2 ? 1 : 0; }}
  // phone with live site
  {{ const k = POP(t - T.phone), out = easeIn((t - T.end + 0.3) / 0.3);
    const pk = EXPO((t - T.phone) / 1.2);
    $('phone').style.transform = `translate(280px,${{330 + (1 - pk) * 120 - out * 120}}px) perspective(2000px) rotateY(${{(1 - pk) * -38}}deg) rotateX(${{(1 - pk) * 10}}deg) scale(${{lerp(0.86, 1, pk)}})`;
    $('phone').style.transformOrigin = '50% 50%'; $('phone').style.opacity = vis(t, T.phone, T.end) ? clamp((t - T.phone) / .25) * (1 - out) : 0;
    set($('isl'), {{ x: 185, y: 22 }});
    const sp = easeInOut((t - T.scroll0) / (T.scroll1 - T.scroll0)); const ih = 520 * (8400 / 780);
    $('pimg').style.transform = `translateY(${{-sp * Math.min(ih - 1060, 3000)}}px)`;
    const lk = TYPE(t - (T.phone + 0.5));
    set($('live'), {{ x: (W - $('live').offsetWidth) / 2, y: 1470 + (1 - lk) * 30, o: vis(t, T.phone + 0.5, T.end) ? clamp((t - T.phone - 0.5) / .2) * (1 - out) : 0 }}); }}
  // end: terminal-style call to action
  {{ reveal($('brand'), t, T.end, 99, 80, 520, 0.9); $('brand').style.letterSpacing = (lerp(0.25, -0.02, EXPO((t - T.end) / 1.4))) + 'em';
    let html = '';
    ENDL.forEach(([h, d]) => {{ if (t >= T.end + d) {{ const div = document.createElement('div'); div.innerHTML = h; const txt = div.textContent; const n = Math.floor(clamp((t - T.end - d) / 0.55) * txt.length); html += (n >= txt.length ? h : txt.slice(0, n)) + '\\n'; }} }});
    $('endt').innerHTML = html + (t >= T.end && Math.floor(t * 2.5) % 2 ? '<span class=p>▌</span>' : '');
    set($('endt'), {{ x: 80, y: 700, o: t >= T.end ? 1 : 0 }}); }}
}}
"""
open('scene11.html', 'w').write(page('#0A0C10', CSS11, BODY11, JS11, 18, "'700 40px Figtree', '800 40px Syne', '500 30px \"JetBrains Mono\"'"))

# ---------------- scene12: paper sketch -> real site (warm paper, pencil) 22s ----------------
CSS12 = """
#paper { width:1080px; height:1920px; background:#F3EEE3; }
#hook { font-family:'Syne'; font-weight:800; color:#2A2A2A; font-size:92px; line-height:1.02; letter-spacing:-.03em; }
#hlw { background-image:linear-gradient(#FFE45C,#FFE45C); background-repeat:no-repeat; background-position:0 70%; background-size:0% 60%; }
svg { overflow:visible; }
.ink { fill:none; stroke:#2A2A2A; stroke-width:6; stroke-linecap:round; stroke-linejoin:round; }
.blue { fill:none; stroke:#2F6DB5; stroke-width:5; stroke-linecap:round; }
.note { font-family:'Syne'; font-weight:700; color:#2F6DB5; font-size:42px; white-space:nowrap; transform-origin:0 50%; }
#real { width:560px; height:1100px; border-radius:64px; overflow:hidden; box-shadow:0 0 0 9px #111, 0 0 0 11px #3A3F47; background:#fff; }
#isl2 { width:150px; height:42px; border-radius:21px; background:#111; }
#real img { position:absolute; left:0; top:60px; width:560px; height:1212px; object-fit:cover; object-position:top; }
#wipe { width:16px; height:1140px; background:#2A2A2A; border-radius:8px; }
#then { font-family:'Syne'; font-weight:800; color:#2A2A2A; font-size:110px; letter-spacing:-.03em; white-space:nowrap; }
#cap { font-family:'Figtree'; font-weight:700; color:#2A2A2A; font-size:40px; white-space:nowrap; }
#cap span { color:#6B6B6B; font-weight:500; }
#sticky { width:780px; height:620px; background:#FFE45C; box-shadow:0 30px 60px -25px rgba(0,0,0,.35); padding:70px 64px; transform-origin:50% 50%; }
#sticky .a { font-family:'Syne'; font-weight:800; font-size:84px; line-height:1.02; color:#2A2A2A; letter-spacing:-.03em; }
#sticky .b { font-family:'Figtree'; font-weight:700; font-size:50px; white-space:nowrap; color:#2A2A2A; margin-top:46px; }
#sticky .c { font-family:'Figtree'; font-weight:500; font-size:40px; color:#4A4A4A; margin-top:18px; }
.tape { width:220px; height:64px; background:rgba(255,255,255,.55); box-shadow:0 2px 6px rgba(0,0,0,.08); }
#sig { font-family:'Syne'; font-weight:700; font-size:44px; color:#2F6DB5; white-space:nowrap; }
"""
# wireframe of a phone page (local coords: 560x1100), drawn with slightly wobbly paths
WF = [
 ('ink', 'M8,10 Q280,2 552,12 Q558,550 548,1092 Q280,1098 12,1090 Q4,550 8,10'),   # phone
 ('ink', 'M40,70 L180,72'), ('ink', 'M470,62 L520,62 M470,78 L520,78 M470,94 L520,94'),   # logo + menu
 ('ink', 'M40,140 Q280,136 520,142 L518,520 Q280,524 42,518 Z'), ('ink', 'M42,142 L518,518 M518,142 L42,518'),   # hero image box
 ('ink', 'M60,580 L420,584'), ('ink', 'M60,630 L330,632'),   # headline lines
 ('ink', 'M60,690 Q170,682 290,690 Q300,740 290,760 Q170,768 60,760 Q50,725 60,690'),   # button
 ('ink', 'M40,820 L170,822 L168,1000 L42,998 Z'), ('ink', 'M210,820 L350,822 L348,1000 L212,998 Z'), ('ink', 'M390,820 L520,822 L518,1000 L392,998 Z'),   # 3 cards
]
NOTES = [('logo + bag', 640, 380, 3.9, 'M-20,10 Q-60,-20 -120,-60'), ('the gown, BIG', 640, 640, 5.0, 'M-20,10 Q-80,10 -150,30'), ('Get it tailored', 600, 1040, 6.2, 'M-20,10 Q-120,20 -200,10'), ('shop the designs', 640, 1260, 7.2, 'M-20,10 Q-70,30 -120,60')]
paths = ''.join(f'<path class="{c}" id="wf{k}" d="{d}"/>' for k, (c, d) in enumerate(WF))
notes = ''.join(f'<div class="abs note" id="n{k}">{txt}</div><svg class="abs" id="na{k}" width="10" height="10"><path class="blue" d="{arr}"/></svg>' for k, (txt, x, y, t0, arr) in enumerate(NOTES))
BODY12 = f"""<div class="abs" id="paper"></div>
<div class="abs" id="hook">It started as<br><span id="hlw">a sketch</span> on paper.</div>
<svg class="abs" id="wf" width="560" height="1100">{paths}</svg>
{notes}
<div class="abs" id="real"><img class="fr" src="assets/mv-00.jpg"><img class="fr" src="assets/mv-01.jpg"><img class="fr" src="assets/mv-02.jpg"><img class="fr" src="assets/mv-03.jpg"><img class="fr" src="assets/mv-04.jpg"><img class="fr" src="assets/mv-05.jpg"><img class="fr" src="assets/mv-06.jpg"><img class="fr" src="assets/mv-07.jpg"><img class="fr" src="assets/mv-08.jpg"><img class="fr" src="assets/mv-09.jpg"><div class="abs" id="isl2" style="left:205px;top:20px"></div></div>
<div class="abs" id="wipe"></div>
<div class="abs" id="then">Then we built it.</div>
<div class="abs" id="cap">Mave Collection <span>· made-to-measure fashion</span></div>
<div class="abs" id="sticky"><div class="a">Got an idea<br>on paper?</div><div class="b">WhatsApp +233 54 285 5399</div><div class="c">www.ecstasytechnologies.com</div></div>
<div class="abs tape" id="tp1"></div><div class="abs tape" id="tp2"></div>
<div class="abs" id="sig">— Ecstasy Technologies</div>
"""
JS12 = f"""
const NOTES = {json.dumps([[n[1], n[2], n[3]] for n in NOTES])};
function prep() {{ fit($('then'), 940); fit($('hook'), 920); }}
const T = {{ hook: 0.2, draw0: 2.2, draw1: 8.4, then: 9.0, wipe0: 10.0, wipe1: 11.4, scroll0: 11.8, scroll1: 16.4, end: 16.9, dur: 22.0 }};
const WX = 260, WY = 380;
const wf = [...document.querySelectorAll('#wf path')]; const lens = wf.map(p => p.getTotalLength());
wf.forEach((p, k) => {{ p.style.strokeDasharray = lens[k]; }});
const EVENTS = [{{ t: 0.2, k: 'pluck' }}, {{ t: 1.0, k: 'scratch' }}];
wf.forEach((_, k) => EVENTS.push({{ t: T.draw0 + k * (T.draw1 - T.draw0) / wf.length, k: 'scratch' }}));
NOTES.forEach(n => EVENTS.push({{ t: n[2], k: 'pluck' }}));
EVENTS.push({{ t: T.then, k: 'thump' }}, {{ t: T.wipe0, k: 'whoosh' }}, {{ t: T.wipe1, k: 'chime' }}, ...[1,2,3,4,5,6,7,8,9].map(k => ({{ t: T.scroll0 + k * (T.scroll1 - T.scroll0) / 10, k: 'tick' }})), {{ t: T.end - 0.1, k: 'whoosh' }}, {{ t: T.end + 0.2, k: 'thunk' }}, {{ t: T.end + 0.9, k: 'pluck' }}, {{ t: T.end + 1.6, k: 'chord' }});
function seek(t) {{
  const hookOut = easeIn((t - T.draw0 + 0.3) / 0.3);
  reveal($('hook'), t, T.hook, T.draw0, 80, 150, 0.9);
  $('hlw').style.backgroundSize = (100 * easeOut((t - 1.0) / 0.45)) + '% 60%';
  // wireframe drawing
  const sketchOut = clamp((t - T.wipe0) / (T.wipe1 - T.wipe0));
  set($('wf'), {{ x: WX, y: WY, o: t >= T.draw0 - 0.01 ? 1 - easeIn((t - T.wipe1) / 0.4) : 0 }});
  wf.forEach((p, k) => {{ const a = T.draw0 + k * (T.draw1 - T.draw0) / wf.length, d = (T.draw1 - T.draw0) / wf.length * 1.1; p.style.strokeDashoffset = lens[k] * (1 - easeInOut((t - a) / d)); }});
  NOTES.forEach(([x, y, t0], k) => {{ const kk = POP(t - t0), out = easeIn((t - T.then + 0.2) / 0.2);
    set($('n' + k), {{ x: x + 30, y: y - 30, r: -4, s: lerp(0.7, 1, kk), o: vis(t, t0, T.then) ? clamp((t - t0) / .12) * (1 - out) : 0 }});
    set($('na' + k), {{ x: x + 10, y: y, o: vis(t, t0, T.then) ? clamp((t - t0) / .12) * (1 - out) : 0 }}); }});
  // "then we built it"
  {{ const k = POP(t - T.then), out = easeIn((t - T.end + 0.3) / 0.3);
    set($('then'), {{ x: (W - $('then').offsetWidth) / 2, y: 170 + (1 - k) * 40, r: -2 * (1 - k), o: vis(t, T.then, T.end) ? clamp((t - T.then) / .12) * (1 - out) : 0 }}); }}
  // real site revealed by a pencil wipe, left to right
  {{ const out = easeIn((t - T.end + 0.3) / 0.3);
    set($('real'), {{ x: WX, y: WY, o: t >= T.wipe0 && t < T.end ? 1 - out : 0 }});
    $('real').style.clipPath = `inset(0 ${{(1 - sketchOut) * 100}}% 0 0 round 46px)`;
    set($('wipe'), {{ x: WX + 560 * sketchOut - 8, y: WY - 20, o: t >= T.wipe0 && t < T.wipe1 + 0.15 ? 1 : 0 }});
    const fi = Math.min(9, Math.floor(clamp((t - T.scroll0) / (T.scroll1 - T.scroll0)) * 10));
    document.querySelectorAll('#real .fr').forEach((im, k) => im.style.opacity = k === fi ? 1 : 0);
    const ck = TYPE(t - (T.wipe1 + 0.2));
    set($('cap'), {{ x: (W - $('cap').offsetWidth) / 2, y: 1560 + (1 - ck) * 30, o: vis(t, T.wipe1 + 0.2, T.end) ? clamp((t - T.wipe1 - 0.2) / .2) * (1 - out) : 0 }}); }}
  // end: sticky note slapped onto the paper
  {{ const k = POP(t - (T.end + 0.2)), sx = (W - 780) / 2, sy = 560;
    $('sticky').style.transform = `translate(${{sx}}px,${{sy + (1 - k) * -500}}px) rotate(${{lerp(-12, -3, k)}}deg)`; $('sticky').style.opacity = t >= T.end + 0.2 ? 1 : 0;
    const tk = POP(t - (T.end + 0.9));
    set($('tp1'), {{ x: sx + 80, y: sy - 34, r: -8, s: tk, o: t >= T.end + 0.9 ? 1 : 0 }}); set($('tp2'), {{ x: sx + 500, y: sy - 20, r: 6, s: tk, o: t >= T.end + 0.9 ? 1 : 0 }});
    const gk = TYPE(t - (T.end + 1.6));
    set($('sig'), {{ x: sx + 300, y: sy + 700 + (1 - gk) * 20, r: -3, o: t >= T.end + 1.6 ? clamp((t - T.end - 1.6) / .3) : 0 }}); }}
}}
"""
open('scene12.html', 'w').write(page('#F3EEE3', CSS12, BODY12, JS12, 22, "'800 40px Syne', '700 40px Syne', '700 40px Figtree', '500 40px Figtree'"))

exec(open('scene13_split.py').read())
print('built 11,12,13')
