# scene23..25 (W48): GIMS, Septer-M, The Verified Plug.
src = open('build_scenes2.py').read()
exec(src[:src.index("# ---------------- scene11")])
import json

TEMPLATE_CSS = """
#tag { font-family:'Jakarta'; font-weight:700; font-size:28px; letter-spacing:.36em; color:%(ACC)s; white-space:nowrap; }
#hook { font-family:'Jakarta'; font-weight:800; font-size:104px; line-height:1.0; letter-spacing:-.04em; color:%(INK)s; white-space:nowrap; }
#hook em { font-style:normal; color:%(ACC)s; }
#phone { width:580px; height:1180px; border-radius:76px; background:#fff; overflow:hidden; box-shadow:0 0 0 10px %(FRAME)s, 0 0 0 12px %(FRAME2)s; }
#phone img { position:absolute; left:0; top:62px; width:580px; }
#isl { width:160px; height:46px; border-radius:23px; background:%(FRAME)s; left:210px; top:22px; }
#cap { background:%(ACC)s; color:%(ACCTXT)s; border-radius:999px; font-family:'Jakarta'; font-weight:800; font-size:56px; letter-spacing:-.02em; padding:26px 58px; white-space:nowrap; }
#eB { font-family:'Jakarta'; font-weight:700; font-size:30px; letter-spacing:.34em; color:%(ACC)s; white-space:nowrap; }
#eH { font-family:'Jakarta'; font-weight:800; font-size:128px; line-height:1.0; letter-spacing:-.045em; color:%(INK)s; white-space:nowrap; text-align:center; }
#eH em { font-style:normal; color:%(ACC)s; }
#eC { font-family:'Jakarta'; font-weight:600; font-size:50px; color:%(INK)s; white-space:nowrap; }
#eW { background:%(ACC)s; color:%(ACCTXT)s; border-radius:999px; font-family:'Jakarta'; font-weight:800; font-size:50px; padding:28px 54px; white-space:nowrap; }
#eU { font-family:'Jakarta'; font-weight:500; font-size:36px; color:%(MUTED)s; white-space:nowrap; }
#eLogo { width:520px; background:#FFFFFF; border-radius:24px; padding:16px; }
"""
BODY = """<div class="abs" id="tag">ECSTASY TECHNOLOGIES</div>
<div class="abs" id="hook">%(HOOK)s</div>
<div class="abs" id="phone"><img id="pimg" src="assets/%(DIR)s/long.jpg"><div class="abs" id="isl"></div></div>
<div class="abs" id="cap">x</div>
<img class="abs" id="eLogo" src="assets/logo.png">
<div class="abs" id="eB">WEBSITE BUILT BY</div><div class="abs" id="eH">Ecstasy<br>Technologies<em>.</em></div>
<div class="abs" id="eC">for %(CLIENT)s</div>
<div class="abs" id="eW">WhatsApp +233 54 285 5399</div><div class="abs" id="eU">www.ecstasytechnologies.com</div>
"""
JS = """
function prep() { fit($('hook'), 940); fit($('eH'), 940); fit($('eC'), 940); fit($('eW'), 940); fit($('eU'), 940); }
const T = %(T)s;
const K = 580 / 390;
const SC = %(SC)s;
const CAPS = %(CAPS)s.map((c, i) => [c, [T.c1, T.c2, T.c3][i], [T.c2, T.c3, T.end - 0.2][i]]);
const EVENTS = [{ t: 0.2, k: 'swell' }, { t: 0.5, k: 'pluck' }, { t: T.phone - 0.1, k: 'whoosh' }, { t: T.phone + 0.2, k: 'slam' },
  { t: T.c1 + 0.5, k: 'whoosh' }, { t: T.c1, k: 'pluck' }, { t: T.c2, k: 'chime' }, { t: T.c2 + 0.6, k: 'click' }, { t: T.c3 - 0.4, k: 'whoosh' }, { t: T.c3, k: 'pluck' },
  { t: T.end - 0.1, k: 'whoosh' }, { t: T.end + 0.3, k: 'chord' }, { t: T.end + 1.6, k: 'tick' }, { t: T.end + 3.0, k: 'tick' }];
function cx(el) { return (W - el.offsetWidth) / 2; }
function scrollAt(t) {
  const e = (a, b, p, q) => lerp(p, q, easeInOut((t - a) / (b - a)));
  const a1 = T.c1 + 0.5, a2 = T.c2 - 0.3, a3 = T.c3 - 0.4;
  if (t < a1) return SC[0];
  if (t < a1 + 1.7) return e(a1, a1 + 1.7, SC[0], SC[1]);
  if (t < a2) return SC[1];
  if (t < a2 + 1.6) return e(a2, a2 + 1.6, SC[1], SC[2]);
  if (t < a3) return SC[2];
  if (t < a3 + 1.4) return e(a3, a3 + 1.4, SC[2], SC[3]);
  return SC[3];
}
function seek(t) {
  reveal($('tag'), t, T.hook, T.end, 90, 120, 0.8);
  reveal($('hook'), t, T.hook + 0.2, T.phone, 90, 560, 1.0);
  {
    const pk = EXPO((t - T.phone) / 1.2), out = easeInOut((t - T.end + 0.5) / 0.5), S = scrollAt(t);
    $('phone').style.transform = `translate(250px,${540 + (1 - pk) * 140 + out * 1300}px) perspective(2000px) rotateY(${(1 - pk) * -36}deg) rotateX(${(1 - pk) * 10}deg) scale(${lerp(0.86, 1, pk)})`;
    $('phone').style.transformOrigin = '50% 50%'; $('phone').style.opacity = vis(t, T.phone, T.end + 0.6) ? clamp((t - T.phone) / .25) : 0;
    $('pimg').style.transform = `translateY(${-S * K}px)`;
  }
  CAPS.forEach(([txt, a, b], i) => { const el = $('cap'); if (t >= a - 0.01 && t < b) { el.textContent = txt; fit(el, 940); reveal(el, t, a, b, (W - el.offsetWidth) / 2, 1770, 0.7); } });
  if (t < CAPS[0][1] || t >= CAPS[2][2]) $('cap').style.opacity = 0;
  const E = T.end;
  reveal($('eLogo'), t, E, 99, cx($('eLogo')), 230, 0.9);
  reveal($('eB'), t, E + 0.3, 99, cx($('eB')), 600, 0.8); reveal($('eH'), t, E + 0.5, 99, cx($('eH')), 670, 1.0);
  reveal($('eC'), t, E + 1.2, 99, cx($('eC')), 1010, 0.8);
  reveal($('eW'), t, E + 1.8, 99, cx($('eW')), 1180, 0.8); reveal($('eU'), t, E + 2.1, 99, cx($('eU')), 1310, 0.8);
}
"""
FL = "'800 40px Jakarta', '700 40px Jakarta', '600 40px Jakarta', '500 40px Jakarta'"
VID = {
 23: dict(DIR='gm', BG='#101012', INK='#F4F4F5', ACC='#FF7A00', ACCTXT='#1A0E00', MUTED='#A8A8AD', FRAME='#000000', FRAME2='#5A4224',
   HOOK="Want to train<br>for mining? Is it<br><em>easy to apply?</em>", CLIENT='Global Institute of Mines and Safety',
   T=dict(hook=0.2, phone=3.2, c1=3.9, c2=8.7, c3=11.6, end=14.8, dur=22.4), SC=[0,1000,3500,4100],
   CAPS=["A clear promise, up top", "Programs, clearly listed", "Apply online in one form"]),
 24: dict(DIR='sp', BG='#FBF7F4', INK='#151515', ACC='#F25C1B', ACCTXT='#FFFFFF', MUTED='#7A6C62', FRAME='#151515', FRAME2='#C9BEB5',
   HOOK="Selling skincare<br>online? Make it<br><em>easy to add.</em>", CLIENT='Septer-M',
   T=dict(hook=0.2, phone=3.2, c1=3.9, c2=8.8, c3=12.2, end=15.0, dur=22.6), SC=[0,1100,2260,3030],
   CAPS=["Honest formulas, one tap to shop", "Shop by category", "Prices, ratings, Quick add"]),
 25: dict(DIR='pl', BG='#F3EEE6', INK='#1C2433', ACC='#1F2A44', ACCTXT='#FFFFFF', MUTED='#6B7280', FRAME='#1C2433', FRAME2='#B9B2A5',
   HOOK="Importing a car?<br>Can you <em>see<br>every step?</em>", CLIENT='The Verified Plug',
   T=dict(hook=0.2, phone=3.2, c1=3.9, c2=8.8, c3=11.8, end=15.0, dur=22.6), SC=[0,850,1550,3000],
   CAPS=["Verified suppliers, clear pricing", "What they source, by pre-order", "Source. Ship. Arrive."]),
}
for n, c in VID.items():
    css = TEMPLATE_CSS % c
    body = BODY % c
    js = JS.replace('%(T)s', json.dumps(c['T'])).replace('%(SC)s', json.dumps(c['SC'])).replace('%(CAPS)s', json.dumps(c['CAPS']))
    open(f'scene{n}.html', 'w').write(page(c['BG'], css, body, js, c['T']['dur'], FL))
    print('built', n)
