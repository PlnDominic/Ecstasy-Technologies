import json, math, random, wave, struct

SR = 48000
import os
CFG = os.environ.get('CFG', '1')
DUR = {'1': 15.0, '2': 18.0, '3': 20.0, '4': 22.0}[CFG]
N = int(SR * DUR)
L = [0.0] * N
R = [0.0] * N
random.seed(7)
ev = json.load(open({'1': 'events.json', '2': 'events2.json', '3': 'events3.json', '4': 'events4.json'}[CFG]))


def add(t0, samples, gain=1.0, pan=0.0):
    i0 = int(t0 * SR)
    gl, gr = gain * (1 - max(0, pan)), gain * (1 + min(0, pan))
    for k, v in enumerate(samples):
        i = i0 + k
        if 0 <= i < N:
            L[i] += v * gl
            R[i] += v * gr


def thump(d=0.45, f0=110, f1=42):
    out, ph = [], 0.0
    for k in range(int(d * SR)):
        t = k / SR
        f = f1 + (f0 - f1) * math.exp(-t * 28)
        ph += 2 * math.pi * f / SR
        out.append(math.sin(ph) * math.exp(-t * 9))
    return out


def whoosh(d=0.42):
    out, lp, bp = [], 0.0, 0.0
    n = int(d * SR)
    for k in range(n):
        x = k / n
        env = math.sin(math.pi * x) ** 2
        cut = 0.02 + 0.25 * x            # rising filter sweep
        lp += cut * (random.uniform(-1, 1) - lp)
        bp += 0.5 * (lp - bp)
        out.append((lp - bp * 0.3) * env * 2.2)
    return out


def tick(f=2400, d=0.05):
    return [math.sin(2 * math.pi * f * k / SR) * math.exp(-k / SR * 90) for k in range(int(d * SR))]


def slam():
    a = thump(0.5, 140, 48)
    b = tick(1800, 0.06)
    return [a[k] + (b[k] * 0.35 if k < len(b) else 0) for k in range(len(a))]


def riser(d=0.5):
    out, lp = [], 0.0
    n = int(d * SR)
    for k in range(n):
        x = k / n
        lp += (0.05 + 0.4 * x) * (random.uniform(-1, 1) - lp)
        out.append(lp * x ** 2 * 1.6)
    return out


def chord(d=2.4, freqs=(220.0, 277.18, 329.63, 440.0, 554.37)):
    out = []
    for k in range(int(d * SR)):
        t = k / SR
        env = min(1, t / 0.04) * math.exp(-t * 1.4)
        v = sum(math.sin(2 * math.pi * f * t) * (0.6 if i else 1) + 0.15 * math.sin(4 * math.pi * f * t)
                for i, f in enumerate(freqs))
        out.append(v / len(freqs) * env)
    return out


def key():
    return [random.uniform(-1, 1) * math.exp(-k / SR * 400) * 0.5 + math.sin(2 * math.pi * 3200 * k / SR) * math.exp(-k / SR * 300) * 0.3 for k in range(int(0.02 * SR))]


def send():
    out, ph = [], 0.0
    for k in range(int(0.22 * SR)):
        t = k / SR
        f = 500 + 900 * min(1, t / 0.12)
        ph += 2 * math.pi * f / SR
        out.append(math.sin(ph) * math.exp(-t * 16) * min(1, t / 0.005))
    return out


def recv():
    out = []
    for k in range(int(0.35 * SR)):
        t = k / SR
        f = 880 if t < 0.09 else 1175
        env = math.exp(-(t % 0.09 if t < 0.09 else t - 0.09) * 18) * min(1, (t % 0.09) / 0.004 if t < 0.09 else 1)
        out.append(math.sin(2 * math.pi * f * t) * env * 0.8)
    return out


def scratch():
    out, lp = [], 0.0
    n = int(0.18 * SR)
    for k in range(n):
        x = k / n
        lp += 0.35 * (random.uniform(-1, 1) - lp)
        out.append(lp * math.sin(math.pi * x) * (0.6 + 0.4 * math.sin(2 * math.pi * 38 * k / SR)) * 1.4)
    return out


def blip():
    return [math.sin(2 * math.pi * 1320 * k / SR) * math.exp(-k / SR * 40) * min(1, k / (0.003 * SR)) for k in range(int(0.12 * SR))]


def click():
    return [random.uniform(-1, 1) * math.exp(-k / SR * 250) * 0.6 + math.sin(2 * math.pi * 1900 * k / SR) * math.exp(-k / SR * 160) * 0.5 for k in range(int(0.05 * SR))]


def thunk():
    out, ph = [], 0.0
    for k in range(int(0.3 * SR)):
        t = k / SR
        ph += 2 * math.pi * (90 + 120 * math.exp(-t * 40)) / SR
        out.append(math.sin(ph) * math.exp(-t * 18) + random.uniform(-1, 1) * math.exp(-t * 120) * 0.3)
    return out


def chime(f=1318.5):
    out = []
    for k in range(int(1.4 * SR)):
        t = k / SR
        env = math.exp(-t * 3.2) * min(1, t / 0.004)
        out.append((math.sin(2 * math.pi * f * t) + 0.5 * math.sin(2 * math.pi * f * 1.5 * t) * math.exp(-t * 5)
                    + 0.25 * math.sin(2 * math.pi * f * 2 * t) * math.exp(-t * 7)) * env * 0.6)
    return out


def buzz():
    return [(1 if math.sin(2 * math.pi * 100 * k / SR) > 0 else -1) * 0.25 * math.exp(-k / SR * 30) * (0.5 + 0.5 * random.random()) for k in range(int(0.12 * SR))]


def swell(d=2.0):
    out = []
    n = int(d * SR)
    for k in range(n):
        t = k / SR
        x = k / n
        env = math.sin(math.pi * x) ** 2
        out.append((math.sin(2 * math.pi * 293.7 * t) + math.sin(2 * math.pi * 440 * t) * 0.7 + math.sin(2 * math.pi * 587.3 * t) * 0.4) * env * 0.35)
    return out


def pluck(f=880.0):
    out = []
    for k in range(int(0.5 * SR)):
        t = k / SR
        out.append((math.sin(2 * math.pi * f * t) + 0.3 * math.sin(4 * math.pi * f * t)) * math.exp(-t * 9) * min(1, t / 0.003) * 0.6)
    return out


GEN = {'click': (click, 0.35), 'thunk': (thunk, 0.45), 'chime': (chime, 0.20), 'buzz': (buzz, 0.20), 'swell': (swell, 0.30), 'pluck': (pluck, 0.16), 'scratch': (scratch, 0.22), 'blip': (blip, 0.16), 'key': (key, 0.18), 'send': (send, 0.30), 'recv': (recv, 0.28), 'reveal': (whoosh, 0.22),'thump': (thump, 0.55), 'whoosh': (whoosh, 0.35), 'slam': (slam, 0.5),
       'tick': (tick, 0.10), 'riser_end': (riser, 0.3), 'chord': (chord, 0.45)}
cache = {}
for e in ev:
    fn, g = GEN[e['k']]
    if e['k'] not in cache or e['k'] in ('whoosh', 'riser_end', 'reveal', 'key', 'scratch'):
        cache[e['k']] = fn()
    if e['k'] == 'chime':
        CH = [1174.7, 1318.5, 1480.0, 1760.0, 1174.7, 1318.5]
        cache['chime'] = chime(CH[sum(1 for x in ev if x['k'] == 'chime' and x['t'] < e['t']) % len(CH)])
    pan = random.uniform(-0.35, 0.35) if e['k'] in ('tick', 'key', 'blip', 'pluck') else 0.0
    add(e['t'], cache[e['k']], g, pan)

# fade out tail + soft limiter
peak = max(max(abs(x) for x in L), max(abs(x) for x in R))
norm = 0.89 / peak if peak > 0.89 else 1.0
with wave.open({'1': 'sfx.wav', '2': 'sfx2.wav', '3': 'sfx3.wav', '4': 'sfx4.wav'}[CFG], 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    fr = bytearray()
    for k in range(N):
        fade = min(1, (DUR - k / SR) / 0.25)
        a = math.tanh(L[k] * norm * 1.1) * fade
        b = math.tanh(R[k] * norm * 1.1) * fade
        fr += struct.pack('<hh', int(a * 32000), int(b * 32000))
    w.writeframes(bytes(fr))
print('events', len(ev), 'peak', round(peak, 3))
