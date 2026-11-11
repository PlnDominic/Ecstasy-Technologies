# Builds scene7.html (rate) and scene8.html (mistakes) from scene3's shared parts.
import re
s3 = open('scene3.html').read()
def between(a, b, incl_b=False):
    i = s3.index(a); j = s3.index(b, i)
    return s3[i:j + (len(b) if incl_b else 0)]
HELPERS = between("const FMT", "// ---------------- timeline")
END_CSS = between("#e-logo {", "</style>")
END_HTML = between("<!-- end card -->", "</div>\n\n<script>")
END_SETUP = between("// end card\nconst logoW", "// ---------------- sound events")
END_SEEK = between("  // end card\n  const E = T.end;", "}\n\nwindow.__duration")
FOOT = """
window.__events = EVENTS;
window.__seek = seek;
Promise.all([document.fonts.load('700 40px Inter'), document.fonts.load('500 20px Inter')])
  .then(() => document.fonts.ready)
  .then(() => Promise.all([...document.images].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; }))))
  .then(() => { seek(0); window.__ready = true; });
</script>
</body>
</html>
"""
BASE_CSS = """
:root { --ink:#1D1D1F; --muted:#86868B; --soft:#AEAEB2; --blue:#0071E3; --grey:#E9E9EB; --hair:#E5E5EA; --green:#34C759; --red:#FF3B30; }
* { margin:0; padding:0; box-sizing:border-box; }
html, body { overflow:hidden; background:#fff; }
#stage { position:relative; overflow:hidden; background:#fff; font-family:'Inter',sans-serif; color:var(--ink); }
.abs { position:absolute; left:0; top:0; transform-origin:0 0; }
.big { font-weight:700; letter-spacing:-.045em; line-height:1.02; white-space:nowrap; }
.big .g { color:var(--soft); } .big .b { color:var(--blue); }
.win { border-radius:16px; overflow:hidden; background:#fff; box-shadow:0 40px 90px -30px rgba(0,0,0,.28), 0 0 0 1px rgba(0,0,0,.06); }
.win .bar { height:40px; background:#F2F2F4; display:flex; align-items:center; gap:8px; padding:0 16px; position:relative; }
.win .bar i { width:12px; height:12px; border-radius:50%; background:#D9D9DE; display:block; }
.win .bar .url { position:absolute; left:50%; transform:translateX(-50%); background:#E8E8ED; border-radius:8px; padding:5px 18px; font-size:15px; color:var(--muted); font-weight:500; white-space:nowrap; }
.win .view { position:relative; overflow:hidden; }
.win .view img { position:absolute; left:0; top:0; display:block; }
.cap { display:flex; align-items:center; gap:12px; font-weight:600; letter-spacing:-.015em; white-space:nowrap; font-size:36px; }
.cap .pip { width:10px; height:10px; border-radius:50%; background:var(--blue); } .cap span { color:var(--muted); font-weight:500; }
"""
def page(css, body, js):
    return f"""<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<link rel="stylesheet" href="fonts/local.css">
<style>{BASE_CSS}{css}
{END_CSS}</style>
</head>
<body>
<div id="stage">
{body}
{END_HTML}</div>

<script>
{HELPERS}{js.replace("function seek(t) {", END_SETUP + chr(10) + "function seek(t) {")}
"""

# ============ scene7: "Rate this website 1-10" (engagement hook), 18s ============
CSS7 = """
.chip { width:158px; height:158px; border-radius:50%; background:#F5F5F7; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:68px; letter-spacing:-.03em; box-shadow:0 0 0 2px var(--hair); }
#arrow { font-size:120px; line-height:1; }
"""
BODY7 = """  <div class="abs big" id="h1" style="font-size:104px"><div id="h1a">Rate this hotel</div><div id="h1b" class="g">website 1 to 10<span class="b">.</span></div></div>
  <div class="abs win" id="w"><div class="bar"><i></i><i></i><i></i><div class="url">nhyirabahotel.com</div></div><div class="view"><img id="img" src="assets/s7-nhyiraba.jpg"></div></div>
  <div class="abs cap" id="cap"><div class="pip"></div>Nhyiraba Hotel <span>· website by Ecstasy Technologies</span></div>
  <div class="abs big" id="h2" style="font-size:150px">Your score?</div>
  <div id="chips"></div>
  <div class="abs big" id="h3" style="font-size:96px">Comment it <span class="b">below</span></div>
  <div class="abs" id="arrow">&#128071;</div>
  <div class="abs big" id="h4" style="font-size:84px"><div>Built by</div><div class="g">Ecstasy Technologies<span class="b">.</span></div></div>
"""
JS7 = """
const T = { in: 1.0, scroll0: 1.6, scroll1: 8.6, out: 9.0, score: 9.0, comment: 11.6, built: 13.0, end: 15.6, dur: 18.0 };
const WIN = { x: 80, y: 560, w: 920, h: 1040 };
['w'].forEach(id => { size($(id), WIN.w, WIN.h); $(id).querySelector('.view').style.height = (WIN.h - 40) + 'px'; });
$('img').style.width = WIN.w + 'px';
const chipsEl = $('chips'); const chips = [];
for (let i = 1; i <= 10; i++) { const c = document.createElement('div'); c.className = 'abs chip'; c.textContent = i; chipsEl.appendChild(c); chips.push(c); }
const EVENTS = [{ t: 0.1, k: 'thump' }, { t: T.in - 0.12, k: 'whoosh' }, { t: T.in + 0.05, k: 'slam' },
  { t: T.out - 0.1, k: 'whoosh' }, { t: T.score + 0.05, k: 'slam' }];
chips.forEach((_, i) => EVENTS.push({ t: T.score + 0.7 + i * 0.12, k: 'blip' }));
EVENTS.push({ t: T.comment, k: 'chime' }, { t: T.built - 0.12, k: 'whoosh' }, { t: T.built + 0.05, k: 'thump' });
EVENTS.push({ t: T.end - 0.15, k: 'riser_end' }, { t: T.end + 0.2, k: 'chord' }, { t: T.end + 0.95, k: 'tick' }, { t: T.end + 1.25, k: 'tick' });
function textIn(el, t, t0, t1, x, y, center) {
  const w = el.offsetWidth;
  const k = TYPE(t - t0), out = easeIn((t - t1 + 0.22) / 0.22);
  const vis = t >= t0 - 0.01 && t < t1 + 0.01;
  set(el, { x: center ? (W - w) / 2 : x, y: y + ((1 - k) * 60) - out * 50, o: vis ? clamp((t - t0) / 0.15) * (1 - out) : 0 });
}
function seek(t) {
  // hook (top), stays while the site scrolls
  textIn($('h1'), t, 0.15, T.out, 80, 190, false);
  // site window
  { const k = HEAVY(t - T.in), out = easeIn((t - T.out + 0.3) / 0.3);
    set($('w'), { x: WIN.x, y: WIN.y + (1 - k) * 900 - out * 900, o: t > T.in - 0.02 && t < T.out + 0.05 ? 1 : 0 });
    const viewH = WIN.h - 40, imgH = WIN.w * (2250 / 900);
    const p = easeInOut((t - T.scroll0) / (T.scroll1 - T.scroll0));
    $('img').style.transform = `translateY(${-p * (imgH - viewH)}px)`;
    const ck = TYPE(t - (T.in + 0.5));
    set($('cap'), { x: WIN.x, y: WIN.y + WIN.h + 36 + (1 - ck) * 24 - out * 40, o: t > T.in + 0.5 && t < T.out + 0.05 ? clamp((t - (T.in + 0.5)) / .2) * (1 - out) : 0 });
  }
  // score
  textIn($('h2'), t, T.score, T.comment, 0, 420, true);
  chips.forEach((c, i) => {
    const t0 = T.score + 0.7 + i * 0.12, k = POP(t - t0), out = easeIn((t - T.built + 0.3) / 0.3);
    const col = i % 5, row = Math.floor(i / 5), cs = 158, gap = 30;
    const x0 = (W - (5 * cs + 4 * gap)) / 2;
    set(c, { x: x0 + col * (cs + gap), y: 780 + row * (cs + gap) + (1 - k) * 40 - out * 60, s: lerp(0.6, 1, k), o: t >= t0 && t < T.built ? clamp((t - t0) / .12) * (1 - out) : 0 });
  });
  textIn($('h3'), t, T.comment, T.built, 0, 1210, true);
  { const w3 = $('arrow'), k = POP(t - (T.comment + 0.25)), bob = Math.sin((t - T.comment) * 6) * 14, out = easeIn((t - T.built + 0.3) / 0.3);
    set(w3, { x: (W - 130) / 2, y: 1360 + bob + (1 - k) * 40, o: t >= T.comment + 0.25 && t < T.built ? clamp((t - T.comment - 0.25) / .12) * (1 - out) : 0 }); }
  // built by
  textIn($('h4'), t, T.built, T.end, 80, 720, false);
"""
open('scene7.html', 'w').write(page(CSS7, BODY7, JS7) + "\n" + END_SEEK + "}\n\nwindow.__duration = T.dur;" + FOOT)

# ============ scene8: "3 mistakes" (educational listicle hook), 15s ============
CSS8 = """
.badge { width:150px; height:150px; border-radius:50%; background:var(--blue); color:#fff; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:92px; letter-spacing:-.03em; }
.mtxt { font-weight:700; letter-spacing:-.04em; line-height:1.08; font-size:96px; }
.pill2 { display:inline-flex; align-items:center; gap:.45em; border-radius:999px; font-weight:700; letter-spacing:-.01em; padding:.35em .9em; font-size:50px; white-space:nowrap; }
.no { background:#FFE5E3; color:var(--red); } .yes { background:#DFF6E5; color:#1B9E3E; }
.ftxt { font-weight:700; letter-spacing:-.035em; line-height:1.1; font-size:88px; color:var(--ink); }
"""
MISTAKES = [
  ("Hiding your prices<br>and opening hours.", "Put them on the<br>first screen."),
  ("A site that only works<br>on a computer.", "Design for phones<br>first."),
  ("No quick way to book<br>or contact you.", "One clear button:<br>Book or WhatsApp."),
]
body8 = '  <div class="abs big" id="hook" style="font-size:100px"><div>3 mistakes that</div><div>make customers</div><div class="g">skip your website<span class="b">.</span></div></div>\n'
for i, (m, f) in enumerate(MISTAKES):
    body8 += f'  <div class="abs badge" id="b{i}">{i+1}</div>\n  <div class="abs pill2 no" id="n{i}">✗ Mistake</div>\n  <div class="abs mtxt" id="m{i}">{m}</div>\n  <div class="abs pill2 yes" id="y{i}">✓ Fix</div>\n  <div class="abs ftxt" id="f{i}">{f}</div>\n'
body8 += '  <div class="abs big" id="outro" style="font-size:100px"><div>We build sites</div><div class="g">that avoid all three<span class="b">.</span></div></div>\n'
JS8 = """
const T = { c0: 2.2, c1: 5.4, c2: 8.6, outro: 11.2, end: 12.8, dur: 15.0 };
const CT = [T.c0, T.c1, T.c2, T.outro];
const EVENTS = [{ t: 0.1, k: 'thump' }];
CT.slice(0, 3).forEach((c, i) => { EVENTS.push({ t: c - 0.12, k: 'whoosh' }, { t: c + 0.05, k: 'slam' }, { t: c + 0.45, k: 'buzz' }, { t: c + 1.5, k: 'chime' }); });
EVENTS.push({ t: T.outro - 0.12, k: 'whoosh' }, { t: T.outro + 0.05, k: 'thump' });
EVENTS.push({ t: T.end - 0.15, k: 'riser_end' }, { t: T.end + 0.2, k: 'chord' }, { t: T.end + 0.95, k: 'tick' }, { t: T.end + 1.25, k: 'tick' });
function placeIn(el, t, t0, t1, x, y, delay = 0, center = false) {
  const w = el.offsetWidth, s = t0 + delay;
  const k = TYPE(t - s), out = easeIn((t - t1 + 0.22) / 0.22);
  const vis = t >= s - 0.01 && t < t1 + 0.01;
  set(el, { x: center ? (W - w) / 2 : x, y: y + (1 - k) * 60 - out * 50, o: vis ? clamp((t - s) / 0.15) * (1 - out) : 0 });
}
function seek(t) {
  placeIn($('hook'), t, 0.15, T.c0, 80, 640, 0, false);
  for (let i = 0; i < 3; i++) {
    const t0 = CT[i], t1 = CT[i + 1];
    const k = POP(t - t0), out = easeIn((t - t1 + 0.22) / 0.22);
    set($('b' + i), { x: 80, y: 330 + (1 - k) * 60 - out * 50, s: lerp(0.5, 1, k), o: t >= t0 && t < t1 + 0.01 ? clamp((t - t0) / .12) * (1 - out) : 0 });
    placeIn($('n' + i), t, t0, t1, 270, 380, 0.15);
    placeIn($('m' + i), t, t0, t1, 80, 600, 0.3);
    placeIn($('y' + i), t, t0, t1, 80, 1010, 1.5);
    placeIn($('f' + i), t, t0, t1, 80, 1150, 1.65);
  }
  placeIn($('outro'), t, T.outro, T.end, 80, 760, 0);
"""
open('scene8.html', 'w').write(page(CSS8, body8, JS8) + "\n" + END_SEEK + "}\n\nwindow.__duration = T.dur;" + FOOT)
print('built')

# ============ scene9: "Google won't find you by magic" screen-tutorial hook (Seth Hoffman style), 20s ============
CSS9 = """
#sbar { border-radius:999px; background:#fff; box-shadow:0 0 0 2px var(--hair), 0 20px 50px -25px rgba(0,0,0,.25); display:flex; align-items:center; gap:.6em; padding:0 1.1em; font-size:46px; letter-spacing:-.015em; white-space:nowrap; }
#caret { display:inline-block; width:3px; height:1em; background:var(--ink); vertical-align:middle; }
#map { border-radius:28px; overflow:hidden; background:#EEF3EA; box-shadow:0 30px 70px -30px rgba(0,0,0,.3); }
#map .road { position:absolute; background:#fff; }
.pin { position:absolute; width:150px; text-align:center; font-weight:700; font-size:28px; letter-spacing:-.01em; }
.pin .dot { width:56px; height:56px; border-radius:50% 50% 50% 0; transform:rotate(-45deg); margin:0 auto 10px; background:var(--red); box-shadow:0 6px 14px rgba(0,0,0,.2); }
.pin.you .dot { background:#C7C7CC; }
.pin.you { color:var(--muted); }
.card { border-radius:28px; background:#fff; box-shadow:0 30px 70px -30px rgba(0,0,0,.3), 0 0 0 1px rgba(0,0,0,.05); padding:44px; }
.card .t { font-size:52px; font-weight:700; letter-spacing:-.03em; }
.card .r { font-size:36px; color:var(--muted); margin-top:18px; font-weight:500; display:flex; gap:16px; align-items:center; }
.card .btns { display:flex; gap:20px; margin-top:34px; }
.card .btn { border-radius:999px; padding:18px 30px; font-size:34px; font-weight:600; background:#E8F0FE; color:var(--blue); }
.card .btn.hl { background:var(--blue); color:#fff; }
.stepn { font-weight:800; color:var(--blue); }
.chip2 { border-radius:20px; background:#fff; box-shadow:0 0 0 2px var(--hair); padding:22px 28px; font-size:36px; font-weight:600; display:flex; justify-content:space-between; width:820px; }
.chip2 span { color:var(--muted); font-weight:500; font-variant-numeric:tabular-nums; }
.chip2 b { color:#1B9E3E; }
"""
BODY9 = """  <div class="abs big" id="k1" style="font-size:100px"><div>You won't like this<span class="b">…</span></div></div>
  <div class="abs big" id="k2" style="font-size:84px"><div>Google won't show your</div><div>business <span class="g">by magic.</span></div></div>
  <div class="abs" id="sbar"><svg width="46" height="46" viewBox="0 0 24 24"><path fill="#8E8E93" d="M15.5 14h-.8l-.3-.3A6.5 6.5 0 1 0 14 15.5l.3.3v.8l5 5 1.5-1.5-5-5zm-6 0a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z"/></svg><span id="q"></span><span id="caret"></span></div>
  <div class="abs" id="map"><div class="road" style="left:0;top:300px;width:100%;height:46px"></div><div class="road" style="left:380px;top:0;width:46px;height:100%"></div><div class="road" style="left:0;top:560px;width:100%;height:30px;transform:rotate(-8deg)"></div>
    <div class="pin" id="p1" style="left:120px;top:120px"><div class="dot"></div>Hotel A</div>
    <div class="pin" id="p2" style="left:560px;top:180px"><div class="dot"></div>Hotel B</div>
    <div class="pin" id="p3" style="left:250px;top:420px"><div class="dot"></div>Hotel C</div>
    <div class="pin you" id="p4" style="left:620px;top:470px"><div class="dot"></div>You?</div></div>
  <div class="abs big" id="k3" style="font-size:72px"><div>Not listed <span class="g">= not an option.</span></div></div>
  <div class="abs big" id="k4" style="font-size:110px"><div>Fix it in 3 steps<span class="b">.</span></div></div>
  <div class="abs big" id="s1" style="font-size:76px"><div><span class="stepn">1</span>&nbsp;&nbsp;Create a free</div><div>Google Business Profile.</div></div>
  <div class="abs card" id="cardA" style="width:920px"><div class="t">Your Business Name</div><div class="r">Hotel · Kumasi</div><div class="r">Open · Closes 10 PM</div><div class="r">+233 00 000 0000</div><div class="btns"><div class="btn">Call</div><div class="btn">Directions</div><div class="btn" id="wbtn">Website</div></div></div>
  <div class="abs big" id="s2" style="font-size:76px"><div><span class="stepn">2</span>&nbsp;&nbsp;Same name and phone</div><div>everywhere.</div></div>
  <div id="chips2"></div>
  <div class="abs big" id="s3" style="font-size:76px"><div><span class="stepn">3</span>&nbsp;&nbsp;Link a real website</div><div>to your profile.</div></div>
  <div class="abs big" id="k5" style="font-size:96px"><div>Need the website?</div><div class="g">We build it<span class="b">.</span></div></div>
"""
JS9 = """
const T = { k1: 0.1, k2: 1.0, search: 2.6, k3: 5.0, k4: 6.9, s1: 8.0, s2: 10.4, s3: 12.8, k5: 15.2, end: 16.3, dur: 20.0 };
const Q = 'hotel near me';
const CH = [['Google profile', '+233 00 000 0000'], ['Website', '+233 00 000 0000'], ['Facebook page', '+233 00 000 0000'], ['WhatsApp', '+233 00 000 0000']];
const c2 = $('chips2'); const chipEls = CH.map(([a, b]) => { const d = document.createElement('div'); d.className = 'abs chip2'; d.innerHTML = `${a}<span>${b} <b>✓</b></span>`; c2.appendChild(d); return d; });
size($('sbar'), 920, 120); size($('map'), 920, 700);
const EVENTS = [{ t: 0.1, k: 'thump' }, { t: 1.0, k: 'whoosh' }];
for (let i = 0; i < Q.length; i += 2) EVENTS.push({ t: T.search + 0.3 + i * 0.07, k: 'key' });
[0, 1, 2].forEach(i => EVENTS.push({ t: T.search + 1.5 + i * 0.25, k: 'pluck' }));
EVENTS.push({ t: T.search + 2.4, k: 'buzz' }, { t: T.k3, k: 'whoosh' }, { t: T.k4, k: 'thump' }, { t: T.s1 - 0.45, k: 'riser_end' }, { t: T.s1, k: 'slam' });
[T.s2, T.s3].forEach(t => EVENTS.push({ t: t - 0.12, k: 'whoosh' }, { t: t + 0.05, k: 'slam' }));
CH.forEach((_, i) => EVENTS.push({ t: T.s2 + 0.6 + i * 0.25, k: 'tick' }));
EVENTS.push({ t: T.s3 + 1.0, k: 'chime' }, { t: T.k5, k: 'whoosh' });
EVENTS.push({ t: T.end - 0.15, k: 'riser_end' }, { t: T.end + 0.2, k: 'chord' }, { t: T.end + 0.95, k: 'tick' }, { t: T.end + 1.25, k: 'tick' });
function inout(el, t, t0, t1, x, y, center, pop) {
  const w = el.offsetWidth, k = pop ? POP(t - t0) : TYPE(t - t0), out = easeIn((t - t1 + 0.22) / 0.22);
  const vis = t >= t0 - 0.01 && t < t1 + 0.01;
  set(el, { x: center ? (W - w) / 2 : x, y: y + (1 - k) * 60 - out * 50, o: vis ? clamp((t - t0) / 0.15) * (1 - out) : 0 });
}
function seek(t) {
  inout($('k1'), t, T.k1, T.search, 80, 640);
  inout($('k2'), t, T.k2, T.search, 80, 800);
  inout($('sbar'), t, T.search, T.k4, 80, 300);
  $('q').textContent = Q.slice(0, Math.floor(clamp((t - T.search - 0.3) / (Q.length * 0.07)) * Q.length));
  $('caret').style.opacity = Math.floor(t * 3) % 2 ? 1 : 0;
  inout($('map'), t, T.search + 1.2, T.k4, 80, 480);
  ['p1', 'p2', 'p3'].forEach((p, i) => { const k = POP(t - (T.search + 1.5 + i * 0.25)); $(p).style.transform = `scale(${k})`; $(p).style.opacity = clamp(k); });
  { const k = POP(t - (T.search + 2.4)); $('p4').style.transform = `scale(${k}) translateX(${Math.sin(t * 20) * 6 * clamp(1 - (t - T.search - 2.4) / 0.6)}px)`; $('p4').style.opacity = clamp(k); }
  inout($('k3'), t, T.k3, T.k4, 80, 1260);
  inout($('k4'), t, T.k4, T.s1, 0, 860, true, true);
  inout($('s1'), t, T.s1, T.s2, 80, 260);
  inout($('cardA'), t, T.s1 + 0.4, T.s2, 80, 620);
  inout($('s2'), t, T.s2, T.s3, 80, 260);
  chipEls.forEach((c, i) => inout(c, t, T.s2 + 0.6 + i * 0.25, T.s3, 130, 620 + i * 150));
  inout($('s3'), t, T.s3, T.k5, 80, 260);
  inout($('cardA'), t, t < T.s2 ? T.s1 + 0.4 : T.s3 + 0.4, t < T.s2 ? T.s2 : T.k5, 80, 620);
  const hl = t > T.s3 + 1.0 && t < T.k5; $('wbtn').classList.toggle('hl', hl);
  $('wbtn').style.transform = hl ? `scale(${1 + 0.06 * Math.abs(Math.sin((t - T.s3 - 1.0) * 4))})` : '';
  inout($('k5'), t, T.k5, T.end, 80, 780);
"""
open('scene9.html', 'w').write(page(CSS9, BODY9, JS9) + "\n" + END_SEEK + "}\n\nwindow.__duration = T.dur;" + FOOT)

# ============ scene10: relatable-humour chat ("my cousin will do the website"), share/tag hook, 15s ============
CSS10 = """
#phone { border-radius:56px; background:#ECE5DD; box-shadow:0 40px 90px -30px rgba(0,0,0,.35), 0 0 0 14px #1D1D1F; overflow:hidden; }
#phead { height:120px; background:#075E54; color:#fff; display:flex; align-items:center; gap:22px; padding:0 34px; font-size:40px; font-weight:600; }
#phead .av { width:70px; height:70px; border-radius:50%; background:#B0BEC5; }
.msg { position:absolute; max-width:640px; padding:20px 28px; border-radius:26px; font-size:40px; line-height:1.25; letter-spacing:-.01em; box-shadow:0 2px 2px rgba(0,0,0,.08); }
.msg.me { background:#DCF8C6; right:30px; border-top-right-radius:6px; }
.msg.them { background:#fff; left:30px; border-top-left-radius:6px; }
#later { position:absolute; left:50%; transform:translateX(-50%); background:#FFF3C4; border-radius:16px; padding:12px 26px; font-size:34px; font-weight:700; white-space:nowrap; }
"""
BODY10 = """  <div class="abs big" id="hk" style="font-size:88px"><div>Every business owner</div><div class="g">has heard this<span class="b">.</span></div></div>
  <div class="abs" id="phone"><div id="phead"><div class="av"></div>Business Owner</div><div id="msgs"></div></div>
  <div class="abs big" id="pay" style="font-size:96px"><div>Your customers</div><div class="g">can't wait for "soon"<span class="b">.</span></div></div>
  <div class="abs big" id="tag" style="font-size:110px"><div>Tag the cousin <span class="b">👀</span></div></div>
"""
JS10 = """
const T = { hk: 0.1, chat: 1.6, later: 5.4, pay: 8.6, tag: 11.2, end: 12.8, dur: 15.0 };
size($('phone'), 860, 1180);
const MS = [['me', 'Do you need a website for the shop?', 2.2], ['them', 'No o, my cousin will do it 😎', 3.3], ['later', '6 months later…', 5.4], ['me', 'How far with the website?', 6.0], ['them', 'He says he\\'s still working on it', 6.9], ['them', 'Also he travelled 🙃', 7.7]];
const mEls = []; let y = 160;
MS.forEach(([who, txt, t0]) => { const d = document.createElement('div'); d.className = who === 'later' ? '' : 'msg ' + who; if (who === 'later') d.id = 'later'; d.textContent = txt; d.style.top = y + 'px'; $('msgs').appendChild(d); mEls.push([d, t0, who]); y += who === 'later' ? 100 : 150; });
const EVENTS = [{ t: 0.1, k: 'thump' }, { t: T.chat - 0.1, k: 'whoosh' }];
MS.forEach(([who, , t0]) => EVENTS.push({ t: t0, k: who === 'me' ? 'send' : who === 'them' ? 'recv' : 'tick' }));
EVENTS.push({ t: T.pay - 0.12, k: 'whoosh' }, { t: T.pay + 0.05, k: 'slam' }, { t: T.tag, k: 'thump' }, { t: T.tag + 0.3, k: 'chime' });
EVENTS.push({ t: T.end - 0.15, k: 'riser_end' }, { t: T.end + 0.2, k: 'chord' }, { t: T.end + 0.95, k: 'tick' }, { t: T.end + 1.25, k: 'tick' });
function inout(el, t, t0, t1, x, y, center, pop) {
  const w = el.offsetWidth, k = pop ? POP(t - t0) : TYPE(t - t0), out = easeIn((t - t1 + 0.22) / 0.22);
  const vis = t >= t0 - 0.01 && t < t1 + 0.01;
  set(el, { x: center ? (W - w) / 2 : x, y: y + (1 - k) * 60 - out * 50, o: vis ? clamp((t - t0) / 0.15) * (1 - out) : 0 });
}
function seek(t) {
  inout($('hk'), t, T.hk, T.pay, 80, 150);
  { const k = HEAVY(t - T.chat), out = easeIn((t - T.pay + 0.3) / 0.3);
    set($('phone'), { x: 110, y: 470 + (1 - k) * 1200 - out * 1200, o: t > T.chat - 0.02 && t < T.pay + 0.05 ? 1 : 0 }); }
  mEls.forEach(([d, t0, who]) => { const k = POP(t - t0); d.style.opacity = t >= t0 ? clamp((t - t0) / 0.1) : 0; d.style.transform = (who === 'later' ? 'translateX(-50%) ' : '') + `translateY(${(1 - k) * 30}px) scale(${lerp(0.85, 1, k)})`; });
  inout($('pay'), t, T.pay, T.tag, 80, 780);
  inout($('tag'), t, T.tag, T.end, 0, 860, true, true);
"""
open('scene10.html', 'w').write(page(CSS10, BODY10, JS10) + "\n" + END_SEEK + "}\n\nwindow.__duration = T.dur;" + FOOT)
print('built 9,10')
