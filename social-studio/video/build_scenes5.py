# scene18: Michelle Mayyers Skincare & Spa (plum + pink, solid colours), 22s
import json
src = open('build_scenes2.py').read()
exec(src[:src.index("# ---------------- scene11")])

CSS18 = """
.sans { font-family:'Jakarta'; }
#tag { font-family:'Jakarta'; font-weight:700; font-size:28px; letter-spacing:.36em; color:#F2198C; white-space:nowrap; }
#hook { font-family:'Jakarta'; font-weight:800; font-size:104px; line-height:1.0; letter-spacing:-.04em; color:#FFF4F9; white-space:nowrap; }
#hook em { font-style:normal; color:#F2198C; }
#phone { width:580px; height:1180px; border-radius:76px; background:#fff; overflow:hidden; box-shadow:0 0 0 10px #0A0509, 0 0 0 12px #5A3550; }
#phone img { position:absolute; left:0; top:62px; width:580px; }
#isl { width:160px; height:46px; border-radius:23px; background:#0A0509; left:210px; top:22px; }
#ring { border-radius:20px; box-shadow:0 0 0 6px #F2198C; width:200px; height:84px; }
#cap { background:#F2198C; color:#fff; border-radius:999px; font-family:'Jakarta'; font-weight:800; font-size:56px; letter-spacing:-.02em; padding:26px 58px; white-space:nowrap; }
#eB { font-family:'Jakarta'; font-weight:700; font-size:30px; letter-spacing:.34em; color:#F2198C; white-space:nowrap; }
#eH { font-family:'Jakarta'; font-weight:800; font-size:128px; line-height:1.0; letter-spacing:-.045em; color:#FFF4F9; white-space:nowrap; text-align:center; }
#eH em { font-style:normal; color:#F2198C; }
#eC { font-family:'Play', serif; font-style:italic; font-size:50px; color:#FFF4F9; white-space:nowrap; }
#eW { background:#F2198C; color:#fff; border-radius:999px; font-family:'Jakarta'; font-weight:800; font-size:50px; padding:28px 54px; white-space:nowrap; }
#eU { font-family:'Jakarta'; font-weight:500; font-size:36px; color:#C9A6BB; white-space:nowrap; }
#eLogo { width:520px; background:#FFF4F9; border-radius:24px; padding:16px; }
"""
BODY18 = """<div class="abs" id="tag">ECSTASY TECHNOLOGIES</div>
<div class="abs" id="hook">How does a spa<br>get clients <em>to book?</em></div>
<div class="abs" id="phone"><img id="pimg" src="assets/mm/long.jpg"><div class="abs" id="isl"></div><div class="abs" id="ring"></div></div>
<div class="abs" id="cap">x</div>
<img class="abs" id="eLogo" src="assets/logo.png">
<div class="abs" id="eB">WEBSITE BUILT BY</div><div class="abs" id="eH">Ecstasy<br>Technologies<em>.</em></div>
<div class="abs" id="eC">for Michelle Mayyers Skincare &amp; Spa</div>
<div class="abs" id="eW">WhatsApp +233 54 285 5399</div><div class="abs" id="eU">www.ecstasytechnologies.com</div>
"""
JS18 = """
function prep() { fit($('hook'), 940); fit($('eH'), 940); fit($('eC'), 940); fit($('eW'), 940); fit($('eU'), 940); }
const T = { hook: 0.2, phone: 3.2, cap1: 3.9, cap2: 8.4, cap3: 11.2, end: 14.7, dur: 22.6 };
const K = 580 / 390;        // phone px per css px
const SC = [0, 3350, 3600, 2330];   // scroll targets (css px): hero, services, services (button), package
const BTN = { x: 200, y: 4053 };    // first "Book Now" button on the page (css px)
const CAPS = [['Every treatment, with its price', T.cap1, T.cap2], ['A Book Now on every one', T.cap2, T.cap3], ['A signature package', T.cap3, T.end - 0.2]];
const EVENTS = [{ t: 0.2, k: 'swell' }, { t: 0.5, k: 'pluck' }, { t: T.phone - 0.1, k: 'whoosh' }, { t: T.phone + 0.2, k: 'slam' },
  { t: 4.4, k: 'whoosh' }, { t: T.cap1, k: 'pluck' }, { t: T.cap2, k: 'chime' }, { t: T.cap2 + 0.6, k: 'click' }, { t: 10.4, k: 'whoosh' }, { t: T.cap3, k: 'pluck' },
  { t: T.end - 0.1, k: 'whoosh' }, { t: T.end + 0.3, k: 'chord' }, { t: T.end + 1.6, k: 'tick' }, { t: T.end + 3.0, k: 'tick' }];
function cx(el) { return (W - el.offsetWidth) / 2; }
function scrollAt(t) {
  const e = (a, b, p, q) => lerp(p, q, easeInOut((t - a) / (b - a)));
  if (t < 4.4) return SC[0];
  if (t < 6.6) return e(4.4, 6.6, SC[0], SC[1]);
  if (t < 8.4) return SC[1];
  if (t < 10.4) return e(8.4, 10.4, SC[1], SC[2]);
  if (t < 10.8) return SC[2];
  return e(10.8, 12.2, SC[2], SC[3]);
}
function seek(t) {
  reveal($('tag'), t, T.hook, T.end, 90, 120, 0.8);
  reveal($('hook'), t, T.hook + 0.2, T.phone, 90, 560, 1.0);
  {
    const pk = EXPO((t - T.phone) / 1.2), out = easeInOut((t - T.end + 0.5) / 0.5), S = scrollAt(t);
    $('phone').style.transform = `translate(250px,${540 + (1 - pk) * 140 + out * 1300}px) perspective(2000px) rotateY(${(1 - pk) * -36}deg) rotateX(${(1 - pk) * 10}deg) scale(${lerp(0.86, 1, pk)})`;
    $('phone').style.transformOrigin = '50% 50%'; $('phone').style.opacity = vis(t, T.phone, T.end + 0.6) ? clamp((t - T.phone) / .25) : 0;
    $('pimg').style.transform = `translateY(${-S * K}px)`;
    // ring around the first Book Now while the second caption is on
    const by = 62 + (BTN.y - S) * K, bx = BTN.x * K, ron = t >= T.cap2 + 0.5 && t < T.cap3;
    const rk = POP((t - T.cap2 - 0.5) / 1);
    $('ring').style.transform = `translate(${bx - 100}px,${by - 42}px) scale(${lerp(1.4, 1, clamp(rk))})`; $('ring').style.transformOrigin = '50% 50%'; $('ring').style.opacity = ron ? 1 : 0;
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
open('scene18.html', 'w').write(page('#170D15', CSS18, BODY18, JS18, 22.6, "'800 40px Jakarta', '700 40px Jakarta', '500 40px Jakarta', 'italic 40px Play'"))
print('built 18')
