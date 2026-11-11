# scene14: Mave Collection editorial (magazine style). scene15: Sleek Connect Store "add to bag" shopping.
import json
src = open('build_scenes2.py').read()
exec(src[:src.index("# ---------------- scene11")])   # FONTS, HELPERS, page()

# ---------------- scene14: Mave editorial 15s ----------------
CSS14 = """
.serif { font-family:'Play', serif; } .sans { font-family:'Jakarta', sans-serif; }
#mast { font-size:210px; letter-spacing:.18em; color:#2B2420; white-space:nowrap; }
#coll { font-size:96px; font-style:italic; color:#A8834B; white-space:nowrap; }
.kick { font-family:'Jakarta'; font-weight:700; font-size:26px; letter-spacing:.34em; color:#2B2420; white-space:nowrap; }
#gown { width:620px; height:1080px; overflow:hidden; background:#F4EEE4; }
#gown img { position:absolute; left:-24px; top:-100px; width:668px; mix-blend-mode:multiply; }
.spec { white-space:nowrap; }
.spec .l { font-family:'Jakarta'; font-weight:700; font-size:22px; letter-spacing:.3em; color:#A8834B; }
.spec .v { font-family:'Play', serif; font-size:40px; color:#2B2420; margin-top:6px; }
.lead { height:2px; background:#A8834B; transform-origin:0 50%; }
#proc { width:1080px; height:1920px; background:#F4EEE4; }
.step { font-size:84px; color:#2B2420; white-space:nowrap; } .step em { color:#A8834B; font-style:italic; }
#url { background:#1F3D2E; color:#F4EEE4; border-radius:999px; padding:24px 46px; font-family:'Jakarta'; font-weight:700; font-size:42px; white-space:nowrap; letter-spacing:.02em; }
#eH { font-size:104px; line-height:1.0; font-style:italic; color:#2B2420; white-space:nowrap; text-align:center; }
#eB { font-family:'Jakarta'; font-weight:700; font-size:30px; letter-spacing:.3em; color:#A8834B; white-space:nowrap; }
#eW { font-family:'Jakarta'; font-weight:700; font-size:50px; color:#2B2420; white-space:nowrap; }
#eU { font-family:'Jakarta'; font-weight:500; font-size:34px; color:#6B6258; white-space:nowrap; }
.rule { height:2px; background:#2B2420; }
.fr4 { background:#2B2420; z-index:5; }
"""
SPECS = [('SILHOUETTE', 'Fitted mermaid', 70, 700, 1), ('BODICE', 'Hand-beaded corset', 70, 880, 1), ('TRAIN', 'Kente print', 70, 1060, 1), ('FINISH', 'Matching beaded fan', 70, 1240, 1)]
BODY14 = """<div class="abs fr4" id="f1"></div><div class="abs fr4" id="f2"></div><div class="abs fr4" id="f3"></div><div class="abs fr4" id="f4"></div><div class="abs serif" id="mast">MAVE</div><div class="abs serif" id="coll">Collection</div>
<div class="abs rule" id="r1"></div><div class="abs kick" id="iss">MADE TO MEASURE · ACCRA</div>
<div class="abs" id="gown">""" + ''.join(f'<img class="fr" src="assets/mv-{k:02d}.jpg">' for k in range(6)) + """</div>
""" + ''.join(f'<div class="abs lead" id="ld{k}"></div><div class="abs spec" id="sp{k}"><div class="l">{l}</div><div class="v">{v}</div></div>' for k, (l, v, x, y, d) in enumerate(SPECS)) + """
<div class="abs" id="proc"></div>
<div class="abs kick" id="pk">THE WEBSITE TAKES THE ORDER</div>
<div class="abs serif step" id="st0"><em>i.</em> Pick a design.</div>
<div class="abs serif step" id="st1"><em>ii.</em> Send your measurements.</div>
<div class="abs serif step" id="st2"><em>iii.</em> They stitch it to fit.</div>
<div class="abs" id="url">www.mavecollections.com</div>
<div class="abs serif" id="eH">Your brand,<br>beautifully online.</div>
<div class="abs" id="eB">WEBSITE BY ECSTASY TECHNOLOGIES</div>
<div class="abs" id="eW">WhatsApp +233 54 285 5399</div>
<div class="abs" id="eU">www.ecstasytechnologies.com</div>
"""
JS14 = f"""
const SPECS = {json.dumps(SPECS)};
function prep() {{ $('mast').style.letterSpacing = '.18em'; fit($('mast'), 900); ['st0','st1','st2','eH'].forEach(id => fit($(id), 940)); }}
const T = {{ mast: 0.1, gown: 0.6, spec0: 2.4, specGap: 1.3, proc: 8.4, url: 11.0, end: 11.8, dur: 15.0 }};
const EVENTS = [{{ t: 0.1, k: 'chord' }}, {{ t: 0.6, k: 'swell' }}];
SPECS.forEach((_, k) => EVENTS.push({{ t: T.spec0 + k * T.specGap, k: 'pluck' }}));
EVENTS.push({{ t: T.proc, k: 'whoosh' }}); [0, 1, 2].forEach(i => EVENTS.push({{ t: T.proc + 0.5 + i * 0.7, k: 'chime' }}));
EVENTS.push({{ t: T.url, k: 'click' }}, {{ t: T.end, k: 'swell' }}, {{ t: T.end + 1.4, k: 'tick' }});
function inout(el, t, t0, t1, x, y, pop) {{ const k = pop ? POP(t - t0) : TYPE(t - t0), out = easeIn((t - t1 + 0.3) / 0.3);
  set(el, {{ x, y: y + (1 - k) * 40 - out * 30, o: vis(t, t0, t1 + 0.01) ? clamp((t - t0) / .25) * (1 - out) : 0 }}); }}
function cx(el) {{ return (W - el.offsetWidth) / 2; }}
function seek(t) {{
  {{ const tk = EXPO((t - T.mast) / 1.8); $('mast').style.letterSpacing = lerp(0.55, 0.18, tk) + 'em'; reveal($('mast'), t, T.mast, T.proc, cx($('mast')) + 18, 90, 1.0); }}
  reveal($('coll'), t, T.mast + 0.45, T.proc, cx($('coll')), 300, 0.9);
  {{ const k = EXPO((t - 0.05) / 1.6); const m = 36;
    $('f1').style.cssText += `;width:${{(W - 2 * m) * k}}px;height:2px;transform:translate(${{m}}px,${{m}}px)`; $('f2').style.cssText += `;width:2px;height:${{(H - 2 * m) * k}}px;transform:translate(${{W - m - 2}}px,${{m}}px)`;
    $('f3').style.cssText += `;width:${{(W - 2 * m) * k}}px;height:2px;transform:translate(${{W - m - (W - 2 * m) * k}}px,${{H - m - 2}}px)`; $('f4').style.cssText += `;width:2px;height:${{(H - 2 * m) * k}}px;transform:translate(${{m}}px,${{H - m - (H - 2 * m) * k}}px)`; }}
  {{ const k = easeOut((t - 0.5) / 0.6), out = easeIn((t - T.proc + 0.3) / 0.3); $('r1').style.width = (900 * k) + 'px'; set($('r1'), {{ x: 90, y: 430, o: t < T.proc ? 1 - out : 0 }}); }}
  inout($('iss'), t, 0.8, T.proc, cx($('iss')), 455);
  // the gown turns (ping-pong through the site's own scroll frames)
  {{ const out = easeIn((t - T.proc + 0.3) / 0.3), gk = EXPO((t - T.gown) / 1.6); $('gown').style.transform = `translate(430px,${{520 + (1 - gk) * 50}}px) scale(${{lerp(1.08, 1, gk)}})`; $('gown').style.transformOrigin = '50% 60%'; $('gown').style.opacity = vis(t, T.gown, T.proc + 0.01) ? clamp((t - T.gown) / .6) * (1 - out) : 0;
    const ph = Math.floor((t - T.gown) * 2.2), n = 6, idx = ph < 0 ? 0 : (Math.floor(ph / (n - 1)) % 2 ? (n - 1) - ph % (n - 1) : ph % (n - 1));
    document.querySelectorAll('#gown .fr').forEach((im, k) => im.style.opacity = k === idx ? 1 : 0); }}
  SPECS.forEach(([l, v, x, y, d], k) => {{ const a = T.spec0 + k * T.specGap;
    const lk = easeOut((t - a) / 0.4); const ld = $('ld' + k); ld.style.width = (90 * lk) + 'px';
    const lx = 440;
    set(ld, {{ x: lx, y: y + 40, o: vis(t, a, T.proc) ? 1 - easeIn((t - T.proc + 0.3) / 0.3) : 0 }});
    if (d < 0) ld.style.transform += ' scaleX(-1)';
    reveal($('sp' + k), t, a + 0.15, T.proc, x, y, 0.8); }});
  // process panel
  {{ const k = easeInOut((t - T.proc) / 0.6); set($('proc'), {{ x: 0, y: (1 - k) * 1920, o: t >= T.proc ? 1 : 0 }}); }}
  inout($('pk'), t, T.proc + 0.4, T.end, 90, 520);
  [0, 1, 2].forEach(i => reveal($('st' + i), t, T.proc + 0.5 + i * 0.7, T.end, 90, 640 + i * 150, 0.8));
  inout($('url'), t, T.url, 99, cx($('url')), 1180, true);
  // end
  reveal($('eH'), t, T.end + 0.1, 99, cx($('eH')), 560, 1.0);
  inout($('eB'), t, T.end + 0.6, 99, cx($('eB')), 860);
  inout($('eW'), t, T.end + 1.0, 99, cx($('eW')), 1380);
  inout($('eU'), t, T.end + 1.4, 99, cx($('eU')), 1470);
}}
"""
open('scene14.html', 'w').write(page('#F4EEE4', CSS14, BODY14, JS14, 15, "'700 40px Jakarta', '500 40px Jakarta', 'italic 40px Play', '40px Play'"))

# ---------------- scene15: Sleek Connect "add to bag" 15s ----------------
PRODS = [('polo', 'Polo T-Shirt', 180), ('omaya', 'Omaya backpack', 310), ('medicube', 'Medicube Zero Pad', 360), ('suave', 'Suave Intense', 200), ('eos', 'Eos shea butter lotion', 220), ('tee', 'Round Neck Top', 180)]
CSS15 = """
.syne { font-family:'Jakarta'; font-weight:800; letter-spacing:-.035em; } .sans { font-family:'Jakarta'; }
#hk1 { font-size:46px; font-family:'Jakarta'; font-weight:700; color:#0E6B5E; letter-spacing:.2em; white-space:nowrap; }
#hk2 { font-size:150px; color:#0F1E3D; line-height:.92; white-space:nowrap; }
#bag { width:150px; height:150px; border-radius:40px; background:#0F1E3D; display:flex; align-items:center; justify-content:center; box-shadow:0 20px 40px -18px rgba(15,30,61,.6); }
#badge { width:76px; height:76px; border-radius:50%; background:#17A589; color:#fff; font-family:'Jakarta'; font-weight:700; font-size:40px; display:flex; align-items:center; justify-content:center; box-shadow:0 0 0 6px #fff; }
.card { width:620px; border-radius:36px; background:#fff; box-shadow:0 40px 90px -30px rgba(15,30,61,.35), 0 0 0 1px rgba(15,30,61,.06); padding:30px; }
.card img { width:560px; height:580px; object-fit:cover; border-radius:24px; display:block; }
.card .n { font-family:'Jakarta'; font-weight:700; font-size:44px; color:#0F1E3D; margin-top:24px; white-space:nowrap; }
.card .p { font-family:'Jakarta'; font-weight:700; font-size:40px; color:#0E6B5E; margin-top:6px; }
.card .b { margin-top:22px; border-radius:18px; background:#0F1E3D; color:#fff; font-family:'Jakarta'; font-weight:700; font-size:38px; text-align:center; padding:22px 0; }
#sheet { width:1080px; height:1240px; border-radius:56px 56px 0 0; background:#0F1E3D; }
.row { font-family:'Jakarta'; font-weight:700; font-size:44px; color:#fff; white-space:nowrap; display:flex; justify-content:space-between; width:900px; }
.row span { color:#8FB8C9; font-weight:500; }
.ok { font-family:'Jakarta'; font-weight:700; font-size:38px; color:#7EE2C8; white-space:nowrap; }
.pay { border-radius:20px; border:3px solid #2B4A7A; color:#fff; font-family:'Jakarta'; font-weight:700; font-size:40px; padding:20px 40px; }
#place { width:900px; border-radius:24px; background:#17A589; color:#fff; font-family:'Jakarta'; font-weight:700; font-size:48px; text-align:center; padding:30px 0; }
#done { width:900px; border-radius:24px; background:#fff; color:#0F1E3D; font-family:'Jakarta'; font-weight:700; font-size:48px; text-align:center; padding:30px 0; }
#ph { width:520px; height:1060px; border-radius:72px; overflow:hidden; box-shadow:0 0 0 10px #0B1222, 0 0 0 12px #3A4560; background:#fff; }
#isl3 { width:150px; height:44px; border-radius:22px; background:#0B1222; left:185px; top:22px; }
#ph img { position:absolute; left:0; top:62px; width:520px; }
#purl { font-family:'Jakarta'; font-weight:700; font-size:42px; color:#0F1E3D; white-space:nowrap; }
#endbg { width:1080px; height:1920px; background:#0F1E3D; }
#eH { font-size:120px; color:#fff; line-height:.95; white-space:nowrap; }
#eH em { font-style:normal; color:#17A589; }
#eW { border-radius:999px; background:#17A589; color:#fff; font-family:'Jakarta'; font-weight:700; font-size:48px; padding:28px 50px; white-space:nowrap; }
#eU { font-family:'Jakarta'; font-weight:500; font-size:38px; color:#8FB8C9; white-space:nowrap; }
#eB { font-family:'Jakarta'; font-weight:700; font-size:30px; letter-spacing:.3em; color:#8FB8C9; white-space:nowrap; }
"""
BAGSVG = '<svg width="74" height="74" viewBox="0 0 24 24"><path fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M5 8h14l-1 12H6L5 8zM9 8V6a3 3 0 0 1 6 0v2"/></svg>'
BODY15 = f"""<div class="abs" id="hk1">THE PROBLEM</div><div class="abs syne" id="hk2">Make buying<br>easy.</div>
""" + ''.join(f'<div class="abs card" id="cd{k}"><img src="assets/p-{f}.jpg"><div class="n">{n}</div><div class="p">GH₵ {p}</div><div class="b" id="qb{k}">Quick Add</div></div>' for k, (f, n, p) in enumerate(PRODS)) + f"""
<div class="abs" id="sheet"></div>
<div class="abs syne" id="ck" style="font-size:96px;color:#fff">Checkout</div>
<div class="abs row" id="r0">{len(PRODS)} items<span>GH₵ {sum(p for _, _, p in PRODS):,}</span></div>
<div class="abs pay" id="pm">MoMo</div><div class="abs pay" id="pc">Card</div>
<div class="abs ok" id="o1">✓ Secure checkout</div>
<div class="abs ok" id="o2">✓ Works on any phone</div>
<div class="abs" id="place">Place order</div><div class="abs" id="done">✓ Order placed</div>
<div class="abs" id="ph"><img id="pimg" src="assets/st-sleek-m.jpg"><div class="abs" id="isl3"></div></div>
<div class="abs" id="purl">sleekconnectstore.com</div>
<div class="abs" id="endbg"></div>
<div class="abs syne" id="eH">Want a store<br><em>like this?</em></div>
<div class="abs" id="eW">WhatsApp +233 54 285 5399</div>
<div class="abs" id="eU">www.ecstasytechnologies.com</div>
<div class="abs" id="eB">BUILT BY ECSTASY TECHNOLOGIES</div>
<div class="abs" id="bag">{BAGSVG}</div><div class="abs" id="badge">0</div>
"""
JS15 = f"""
const NP = {len(PRODS)};
function prep() {{ fit($('hk2'), 940); fit($('eH'), 940); }}
const T = {{ hook: 0.1, p0: 1.6, pd: 1.05, sheet: 8.0, place: 9.6, done: 10.0, phone: 10.6, end: 12.4, dur: 16.5 }};
const EVENTS = [{{ t: 0.1, k: 'thump' }}];
for (let k = 0; k < NP; k++) {{ const a = T.p0 + k * T.pd; EVENTS.push({{ t: a, k: 'whoosh' }}, {{ t: a + 0.45, k: 'click' }}, {{ t: a + 0.85, k: 'blip' }}); }}
EVENTS.push({{ t: T.sheet, k: 'whoosh' }}, {{ t: T.sheet + 0.6, k: 'tick' }}, {{ t: T.sheet + 0.9, k: 'tick' }}, {{ t: T.place, k: 'click' }}, {{ t: T.done, k: 'chime' }}, {{ t: T.phone, k: 'whoosh' }}, {{ t: T.end, k: 'slam' }}, {{ t: T.end + 0.8, k: 'chord' }});
function inout(el, t, t0, t1, x, y, pop) {{ const k = pop ? POP(t - t0) : TYPE(t - t0), out = easeIn((t - t1 + 0.22) / 0.22);
  set(el, {{ x, y: y + (1 - k) * 40 - out * 30, o: vis(t, t0, t1 + 0.01) ? clamp((t - t0) / .15) * (1 - out) : 0 }}); }}
function cx(el) {{ return (W - el.offsetWidth) / 2; }}
const BX = 870, BY = 80;
function seek(t) {{
  reveal($('hk1'), t, T.hook, T.p0 + 0.1, 70, 760, 0.7);
  reveal($('hk2'), t, T.hook + 0.15, T.p0 + 0.1, 70, 840, 0.9);
  // product cards: slide in, press Quick Add, fly into the bag
  let count = 0;
  for (let k = 0; k < NP; k++) {{
    const a = T.p0 + k * T.pd, el = $('cd' + k), cw = 620, ch = el.offsetHeight;
    const kin = HEAVY(t - a), press = t > a + 0.45 && t < a + 0.6, fly = easeIn((t - a - 0.6) / 0.35);
    const x0 = (W - cw) / 2, y0 = 470;
    const x = lerp(x0 + (1 - kin) * 900, BX + 75 - cw * 0.05, fly), y = lerp(y0, BY + 75 - ch * 0.05, fly) - Math.sin(fly * Math.PI) * 200;
    el.style.transform = `translate(${{x}}px,${{y}}px) perspective(1600px) rotateY(${{(1 - kin) * -45}}deg) rotate(${{fly * 25}}deg) scale(${{lerp(1, 0.1, fly)}})`; el.style.transformOrigin = '0 0'; el.style.opacity = vis(t, a, a + 0.97) ? 1 : 0;
    $('qb' + k).style.background = press ? '#17A589' : '#0F1E3D'; $('qb' + k).style.transform = press ? 'scale(.96)' : '';
    if (t >= a + 0.95) count++;
  }}
  $('badge').textContent = count;
  {{ const show = t >= T.p0 - 0.2 && t < T.end; const bump = count > 0 ? POP(t - (T.p0 + (count - 1) * T.pd + 0.95)) : 1;
    set($('bag'), {{ x: BX, y: BY, s: show ? lerp(1.25, 1, clamp(bump)) : 0.001, o: show ? 1 : 0 }});
    set($('badge'), {{ x: BX + 100, y: BY - 26, s: show && count ? lerp(1.5, 1, clamp(bump)) : 0.001, o: show && count ? 1 : 0 }}); }}
  // checkout sheet
  {{ const k = HEAVY(t - T.sheet), out = easeIn((t - T.phone + 0.3) / 0.3); set($('sheet'), {{ x: 0, y: 680 + (1 - k) * 1300 + out * 1300, o: vis(t, T.sheet, T.phone + 0.01) ? 1 : 0 }}); }}
  const so = T.phone;
  inout($('ck'), t, T.sheet + 0.2, so, 90, 760);
  inout($('r0'), t, T.sheet + 0.35, so, 90, 920);
  inout($('pm'), t, T.sheet + 0.55, so, 90, 1030, true); inout($('pc'), t, T.sheet + 0.65, so, 330, 1030, true);
  if (t > T.sheet + 1.0) $('pm').style.background = '#17A589', $('pm').style.borderColor = '#17A589'; else $('pm').style.background = 'transparent', $('pm').style.borderColor = '#2B4A7A';
  inout($('o1'), t, T.sheet + 0.6, so, 90, 1190); inout($('o2'), t, T.sheet + 0.9, so, 90, 1260);
  inout($('place'), t, T.sheet + 0.9, T.done, 90, 1420, true);
  if (t > T.place && t < T.done) $('place').style.transform += ' scale(.96)';
  inout($('done'), t, T.done, so, 90, 1420, true);
  // the real site
  {{ const pk = EXPO((t - T.phone) / 1.0), out = easeIn((t - T.end + 0.25) / 0.25); $('ph').style.transform = `translate(280px,${{330 + (1 - pk) * 100}}px) perspective(2000px) rotateY(${{(1 - pk) * 35}}deg) scale(${{lerp(0.88, 1, pk)}})`; $('ph').style.transformOrigin = '50% 50%'; $('ph').style.opacity = vis(t, T.phone, T.end) ? clamp((t - T.phone) / .2) * (1 - out) : 0; }}
  $('pimg').style.transform = `translateY(${{-easeInOut((t - T.phone - 0.3) / 1.5) * 1300}}px)`;
  inout($('purl'), t, T.phone + 0.3, T.end, cx($('purl')), 1440);
  // end card
  {{ const k = easeOut((t - T.end) / 0.4); $('endbg').style.clipPath = `circle(${{k * 150}}% at ${{BX + 75}}px ${{BY + 75}}px)`; $('endbg').style.opacity = t >= T.end ? 1 : 0; }}
  reveal($('eH'), t, T.end + 0.25, 99, 70, 600, 0.9);
  inout($('eW'), t, T.end + 0.7, 99, 70, 960, true);
  inout($('eU'), t, T.end + 1.1, 99, 74, 1110);
  inout($('eB'), t, T.end + 1.4, 99, 74, 1500);
}}
"""
open('scene15.html', 'w').write(page('#F3F6F8', CSS15, BODY15, JS15, 16.5, "'800 40px Jakarta', '700 40px Jakarta', '500 40px Jakarta'"))
print('built 14,15')
