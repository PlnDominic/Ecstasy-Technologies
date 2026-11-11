# scene16: Mave "type behind the gown" (white, multiply). scene17: Mave black + gold arch gallery.
import json
src = open('build_scenes2.py').read()
exec(src[:src.index("# ---------------- scene11")])

M = 'assets/mave/'
# ---------------- scene16 : 20s ----------------
GOWNS = [('RUBY', 'The Ruby Kente Mermaid', 'GHS 4,000', M + 'ruby-kente-mermaid.png', '#8E1B2B'),
         ('COCOA', 'The Cocoa Kente Gown', 'GHS 4,500', M + 'cocoa-kente-gown.png', '#3E2A1F'),
         ('IVORY', 'The Ivory Ombré Drape', 'GHS 3,000', M + 'ivory-ombre-drape.png', '#B08D57')]
CSS16 = """
.syne { font-family:'Syne'; font-weight:800; letter-spacing:-.04em; text-transform:uppercase; line-height:.86; white-space:nowrap; }
.serif { font-family:'Liberation Serif','DejaVu Serif',serif; } .fg { font-family:'Figtree'; font-weight:700; }
.gimg { height:1260px; display:block; mix-blend-mode:multiply; }
#hook { color:#0B0B0B; }
.cap1 { font-size:62px; font-style:italic; color:#0B0B0B; white-space:nowrap; }
.cap2 { font-size:34px; letter-spacing:.28em; color:#B08D57; white-space:nowrap; }
#count { font-size:26px; letter-spacing:.34em; color:#0B0B0B; white-space:nowrap; }
.rule { background:#0B0B0B; height:2px; }
#own1 { font-size:150px; font-style:italic; color:#0B0B0B; line-height:1; white-space:nowrap; }
#own2 { font-size:50px; color:#0B0B0B; line-height:1.25; white-space:nowrap; }
#own2 b { color:#B08D57; font-weight:700; }
#eB { font-size:30px; letter-spacing:.32em; color:#B08D57; white-space:nowrap; }
#eH { font-size:96px; font-style:italic; color:#0B0B0B; white-space:nowrap; text-align:center; line-height:1.05; }
#eW { font-size:52px; color:#0B0B0B; white-space:nowrap; }
#eU { font-size:36px; font-weight:500; color:#6B6B6B; white-space:nowrap; font-family:'Figtree'; }
#eLogo { width:240px; }
"""
BODY16 = """<div class="abs syne" id="h1" style="font-size:230px">Sewn</div><div class="abs syne" id="h2" style="font-size:150px">for your</div><div class="abs syne" id="h3" style="font-size:230px">body.</div>
<div class="abs gimg" id="hg0"><img class="gimg" src="assets/mave/hf0030.png" style="height:1180px"></div>
""" + ''.join(f'<div class="abs syne" id="gt{k}" style="color:{c};font-size:360px">{w}</div><div class="abs gimg" id="gg{k}"><img class="gimg" src="{p}"></div><div class="abs serif cap1" id="gn{k}">{n}</div><div class="abs fg cap2" id="gp{k}">{pr}</div>' for k, (w, n, pr, p, c) in enumerate(GOWNS)) + """
<div class="abs fg" id="count">01 / 04</div><div class="abs rule" id="cr"></div>
<div class="abs serif" id="own1">Your own<br>design?</div><div class="abs fg" id="own2">Send us a <b>photo</b> of the style<br>you have in mind.</div>
<img class="abs" id="eLogo" src="assets/mave/logo.png">
<div class="abs fg" id="eB">MAVE COLLECTION</div><div class="abs serif" id="eH">Made to measure,<br>beautifully online.</div>
<div class="abs fg" id="eW">Website by Ecstasy Technologies</div><div class="abs fg" id="eU">WhatsApp +233 54 285 5399  ·  www.ecstasytechnologies.com</div>
"""
JS16 = f"""
const G = {json.dumps([[g[0], g[1], g[2]] for g in GOWNS])};
function prep() {{ ['gt0','gt1','gt2'].forEach(id => fit($(id), 1010)); fit($('h2'), 1000); fit($('h1'), 1000); fit($('h3'), 1000); fit($('own1'), 940); fit($('own2'), 940); fit($('eH'), 940); fit($('eU'), 980); fit($('eW'), 940); }}
const T = {{ hook: 0.2, b: [3.4, 7.0, 10.6], bl: 3.6, own: 14.2, end: 16.4, dur: 20.0 }};
const BT = [T.b[0], T.b[1], T.b[2], T.own];
const EVENTS = [{{ t: 0.2, k: 'swell' }}, {{ t: 1.0, k: 'chord' }}];
BT.slice(0, 3).forEach(t => EVENTS.push({{ t: t - 0.1, k: 'whoosh' }}, {{ t: t + 0.4, k: 'pluck' }}));
EVENTS.push({{ t: T.own - 0.1, k: 'whoosh' }}, {{ t: T.own + 0.5, k: 'click' }}, {{ t: T.end - 0.1, k: 'whoosh' }}, {{ t: T.end + 0.3, k: 'chord' }}, {{ t: T.end + 1.6, k: 'tick' }});
function cx(el) {{ return (W - el.offsetWidth) / 2; }}
function seek(t) {{
  // hook, three stacked words
  reveal($('h1'), t, T.hook, T.b[0], 70, 130, 0.9); reveal($('h2'), t, T.hook + 0.18, T.b[0], 74, 380, 0.9); reveal($('h3'), t, T.hook + 0.36, T.b[0], 70, 560, 0.9);
  {{ const k = EXPO((t - 1.3) / 1.3), out = easeInOut((t - T.b[0] + 0.5) / 0.5), z = 1 + 0.04 * clamp((t - 1.3) / 2);
    const g = $('hg0'); g.style.transform = `translate(${{(W - 760) / 2}}px,${{760 + (1 - k) * 160 - out * 200}}px) scale(${{z * lerp(1.08, 1, k)}})`; g.style.clipPath = `inset(${{(1 - k) * 100}}% 0 ${{out * 100}}% 0)`; g.style.opacity = vis(t, 1.3, T.b[0] + 0.6) ? 1 : 0; g.style.transformOrigin = '50% 100%'; }}
  // gowns with giant type behind them
  GOWNS_N = 3;
  for (let k = 0; k < 3; k++) {{
    const a = BT[k], b = BT[k + 1], on = vis(t, a, b + 0.7), kin = EXPO((t - a) / 1.1), out = easeInOut((t - b + 0.1) / 0.6);
    const gt = $('gt' + k), gg = $('gg' + k), w = gg.offsetWidth || 780;
    const drift = lerp(90, -120, clamp((t - a) / (b - a)));
    gt.style.transform = `translate(${{(W - gt.offsetWidth) / 2 + drift}}px,${{430 + (1 - kin) * 60}}px)`; gt.style.opacity = on ? clamp((t - a) / 0.4) * (1 - out) : 0;
    const z = 1 + 0.05 * clamp((t - a) / (b - a));
    gg.style.transform = `translate(${{(W - 781) / 2}}px,${{300 + (1 - kin) * 200 - out * 200}}px) scale(${{z * lerp(1.1, 1, kin)}})`; gg.style.transformOrigin = '50% 100%';
    gg.style.clipPath = `inset(${{(1 - kin) * 100}}% 0 ${{out * 100}}% 0)`; gg.style.opacity = on ? 1 : 0;
    reveal($('gn' + k), t, a + 0.7, b, 70, 1660, 0.8); reveal($('gp' + k), t, a + 0.95, b, 72, 1740, 0.8);
  }}
  {{ const on = t >= T.b[0] && t < T.own + 0.2; const n = t < T.b[1] ? 1 : t < T.b[2] ? 2 : 3; $('count').textContent = '0' + n + ' / 04';
    reveal($('count'), t, T.b[0] + 0.1, T.own, 70, 70, 0.6); $('cr').style.width = (940 * easeOut((t - T.b[0]) / 0.8)) + 'px'; set($('cr'), {{ x: 70, y: 124, o: on ? 1 : 0 }}); }}
  // your own design
  reveal($('own1'), t, T.own, T.end, 70, 420, 1.0); reveal($('own2'), t, T.own + 0.55, T.end, 76, 880, 0.9);
  // end
  reveal($('eLogo'), t, T.end, 99, cx($('eLogo')), 330, 0.9);
  reveal($('eB'), t, T.end + 0.3, 99, cx($('eB')), 640, 0.8); reveal($('eH'), t, T.end + 0.5, 99, cx($('eH')), 720, 1.0);
  reveal($('eW'), t, T.end + 1.3, 99, cx($('eW')), 1180, 0.8); reveal($('eU'), t, T.end + 1.6, 99, cx($('eU')), 1290, 0.8);
}}
"""
JS16 = JS16.replace("  GOWNS_N = 3;\n", "")
open('scene16.html', 'w').write(page('#FFFFFF', CSS16, BODY16, JS16, 20, "'800 40px Syne', '700 40px Figtree', 'italic 40px \"Liberation Serif\"'"))

# ---------------- scene17 : black + gold arch gallery, 16s ----------------
CSS17 = """
.serif { font-family:'Liberation Serif','DejaVu Serif',serif; } .fg { font-family:'Figtree'; font-weight:700; }
.arch { width:300px; height:1000px; border-radius:150px 150px 0 0; background:#F2EBDD; box-shadow:0 0 0 2px #C9A86A; overflow:hidden; }
.arch img { position:absolute; left:-30px; top:110px; width:360px; mix-blend-mode:multiply; }
.big { width:620px; height:1000px; border-radius:310px 310px 0 0; background:#F2EBDD; box-shadow:0 0 0 2px #C9A86A; overflow:hidden; }
.big img { position:absolute; left:-25px; top:110px; width:670px; mix-blend-mode:multiply; }
.nm { font-size:28px; letter-spacing:.26em; color:#C9A86A; white-space:nowrap; text-transform:uppercase; }
#k { font-size:30px; letter-spacing:.4em; color:#C9A86A; white-space:nowrap; }
#t1 { font-size:132px; font-style:italic; color:#F2EBDD; line-height:1.0; white-space:nowrap; }
#t1 em { color:#C9A86A; }
.step { font-size:72px; font-style:italic; color:#F2EBDD; white-space:nowrap; line-height:1.0; } .step em { color:#C9A86A; font-style:normal; font-family:'Figtree'; font-weight:700; font-size:30px; letter-spacing:.3em; display:inline-block; width:110px; vertical-align:middle; }
.line { background:#C9A86A; height:2px; }
#eB { font-size:30px; letter-spacing:.34em; color:#C9A86A; white-space:nowrap; }
#eH { font-size:104px; font-style:italic; color:#F2EBDD; line-height:1.04; white-space:nowrap; text-align:center; }
#eW { font-size:50px; color:#F2EBDD; white-space:nowrap; }
#eU { font-size:34px; font-weight:500; color:#9A8F7C; white-space:nowrap; font-family:'Figtree'; }
#eLogo { width:210px; border-radius:50%; background:#F2EBDD; padding:8px; }
"""
ARCH = [(M + 'ruby-kente-mermaid.png', 'Ruby'), (M + 'cocoa-kente-gown.png', 'Cocoa'), (M + 'ivory-ombre-drape.png', 'Ivory')]
BODY17 = """<div class="abs fg" id="k">MAVE COLLECTION</div><div class="abs serif" id="t1">Sewn<br>for <em>your</em><br>body.</div>
""" + ''.join(f'<div class="abs arch" id="a{k}"><img src="{p}"></div><div class="abs fg nm" id="an{k}">{n}</div>' for k, (p, n) in enumerate(ARCH)) + """
<div class="abs big" id="big">""" + ''.join(f'<img class="bf" src="assets/mave/hf{n}.png">' for n in ('0001', '0010', '0020', '0030', '0040', '0050', '0060')) + """</div>
<div class="abs line" id="ln"></div>
<div class="abs serif step" id="s0"><em>01</em>Pick a design.</div><div class="abs serif step" id="s1"><em>02</em>Send your measurements.</div><div class="abs serif step" id="s2"><em>03</em>We stitch it to fit.</div>
<img class="abs" id="eLogo" src="assets/mave/logo.png">
<div class="abs fg" id="eB">MAVE COLLECTION</div><div class="abs serif" id="eH">Your brand,<br>beautifully online.</div>
<div class="abs fg" id="eW">Website by Ecstasy Technologies</div><div class="abs fg" id="eU">WhatsApp +233 54 285 5399  ·  www.ecstasytechnologies.com</div>
"""
JS17 = f"""
function prep() {{ fit($('t1'), 940); ['s0','s1','s2','eH'].forEach(id => fit($(id), 940)); fit($('eU'), 980); fit($('eW'), 940); }}
const T = {{ t1: 0.2, arch: 2.9, big: 8.2, steps: 8.9, end: 12.6, dur: 16.0 }};
const EVENTS = [{{ t: 0.2, k: 'chord' }}, {{ t: 0.5, k: 'swell' }}];
[0, 1, 2].forEach(i => EVENTS.push({{ t: T.arch + i * 0.45, k: 'pluck' }}));
EVENTS.push({{ t: T.big - 0.1, k: 'whoosh' }}); [0, 1, 2].forEach(i => EVENTS.push({{ t: T.steps + i * 0.9, k: 'chime' }}));
EVENTS.push({{ t: T.end - 0.1, k: 'whoosh' }}, {{ t: T.end + 0.3, k: 'chord' }}, {{ t: T.end + 1.6, k: 'tick' }});
function cx(el) {{ return (W - el.offsetWidth) / 2; }}
function seek(t) {{
  reveal($('k'), t, T.t1, T.arch, 90, 640, 0.8); reveal($('t1'), t, T.t1 + 0.3, T.arch, 90, 720, 1.2);
  // three arches rise in staggered
  [0, 1, 2].forEach(i => {{ const a = T.arch + i * 0.45, k = EXPO((t - a) / 1.2), out = easeInOut((t - T.big + 0.1) / 0.6), on = vis(t, a, T.big + 0.7);
    const el = $('a' + i); el.style.transform = `translate(${{60 + i * 330}}px,${{340 + (1 - k) * 900 + out * 1000}}px)`; el.style.opacity = on ? 1 : 0;
    el.querySelector('img').style.transform = `scale(${{1 + 0.07 * clamp((t - a) / 4)}})`; el.querySelector('img').style.transformOrigin = '50% 30%';
    reveal($('an' + i), t, a + 0.7, T.big, 60 + i * 330 + 150 - $('an' + i).offsetWidth / 2, 1390, 0.7); }});
  // single big arch turning
  {{ const k = EXPO((t - T.big) / 1.2), out = easeInOut((t - T.end + 0.5) / 0.5), n = 7;
    const e = $('big'); e.style.transform = `translate(${{(W - 620) / 2}}px,${{260 + (1 - k) * 800 + out * 900}}px)`; e.style.opacity = vis(t, T.big, T.end + 0.6) ? 1 : 0;
    const idx = Math.min(n - 1, Math.floor(clamp((t - T.big - 0.4) / 3.6) * n)); e.querySelectorAll('.bf').forEach((im, j) => im.style.opacity = j === idx ? 1 : 0); }}
  {{ const lk = easeOut((t - T.steps) / 0.7); $('ln').style.width = (200 * lk) + 'px'; set($('ln'), {{ x: 70, y: 1330, o: vis(t, T.steps, T.end) ? 1 : 0 }}); }}
  [0, 1, 2].forEach(i => reveal($('s' + i), t, T.steps + 0.1 + i * 0.9, T.end, 70, 1380 + i * 125, 0.9));
  // end
  reveal($('eLogo'), t, T.end, 99, cx($('eLogo')), 380, 0.9); reveal($('eB'), t, T.end + 0.3, 99, cx($('eB')), 650, 0.8); reveal($('eH'), t, T.end + 0.5, 99, cx($('eH')), 740, 1.0);
  reveal($('eW'), t, T.end + 1.3, 99, cx($('eW')), 1160, 0.8); reveal($('eU'), t, T.end + 1.6, 99, cx($('eU')), 1270, 0.8);
}}
"""
open('scene17.html', 'w').write(page('#0B0B0B', CSS17, BODY17, JS17, 16, "'700 40px Figtree', 'italic 40px \"Liberation Serif\"', '40px \"Liberation Serif\"'"))
print('built 16,17')
