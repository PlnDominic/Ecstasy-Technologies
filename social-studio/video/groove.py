# Synthesised grooves. STYLE=afro (112 BPM log-drum + shaker) or lofi (82 BPM dusty keys + soft kick).
import math, random, wave, struct, array, os
SR = 48000
STYLE = os.environ.get('STYLE', 'afro'); DUR = float(os.environ.get('DUR', '15')); OUT = os.environ.get('OUT', 'groove.wav')
N = int(SR * DUR); L = array.array('d', bytes(8 * N)); R = array.array('d', bytes(8 * N)); random.seed(5)
BPM = 112 if STYLE == 'afro' else 82; B = 60 / BPM
mtof = lambda m: 440 * 2 ** ((m - 69) / 12)
def put(i, v, pan=0.0):
    if 0 <= i < N: L[i] += v * (1 - max(0, pan)); R[i] += v * (1 + min(0, pan))
def kick(t0, g):
    ph = 0
    for k in range(int(0.35 * SR)):
        t = k / SR; f = 45 + 110 * math.exp(-t * 30); ph += 2 * math.pi * f / SR; put(int(t0 * SR) + k, math.sin(ph) * math.exp(-t * 9) * g)
def noise(t0, d, g, decay, hp=0.0, pan=0.0):
    y = 0; px = 0
    for k in range(int(d * SR)):
        x = random.uniform(-1, 1); v = x - hp * px; px = x; put(int(t0 * SR) + k, v * math.exp(-k / SR * decay) * g, pan)
def tone(t0, d, f0, g, f1=None, harm=1, decay=4.0, pan=0.0, att=0.004):
    ph = 0
    for k in range(int(d * SR)):
        t = k / SR; f = f0 if f1 is None else f1 + (f0 - f1) * math.exp(-t * 18); ph += 2 * math.pi * f / SR
        v = sum(math.sin(ph * h) / h for h in range(1, harm + 1)); put(int(t0 * SR) + k, v * min(1, t / att) * math.exp(-t * decay) * g, pan)
bars = int(DUR / (4 * B)) + 1
if STYLE == 'afro':
    prog = [(45, [57, 60, 64]), (41, [57, 60, 65]), (43, [55, 59, 62]), (40, [56, 59, 64])]
    for b in range(bars):
        t = b * 4 * B; root, ch = prog[b % 4]
        for q in range(4): kick(t + q * B, 0.55)
        for e in range(16): noise(t + e * B / 4, 0.06, 0.05 if e % 2 else 0.08, 60, hp=0.95, pan=0.3)
        for s in (1, 3): noise(t + s * B, 0.18, 0.22, 22, hp=0.5)
        for pos in (0, 1.5, 2.75, 3.25):   # log drum
            tone(t + pos * B, 0.5, mtof(root + 12) * 1.5, 0.35, f1=mtof(root + 12), harm=2, decay=6)
        for pos in (0.5, 2.5):               # off-beat chord stabs
            for m in ch: tone(t + pos * B, 0.3, mtof(m), 0.06, harm=4, decay=9, pan=-0.25)
else:
    prog = [(41, [53, 57, 60, 64]), (43, [55, 59, 62, 65]), (40, [52, 55, 59, 62]), (45, [57, 60, 64, 67])]
    for b in range(bars):
        t = b * 4 * B; root, ch = prog[b % 4]
        for q in (0, 2.5): kick(t + q * B, 0.45)
        for s in (1, 3): noise(t + s * B, 0.22, 0.14, 16, hp=0.3)
        for e in range(8): noise(t + e * B / 2 + (0.02 if e % 2 else 0), 0.05, 0.035, 70, hp=0.97, pan=0.25)
        for m in ch: tone(t, 4 * B, mtof(m), 0.07, harm=3, decay=0.6, pan=-0.15, att=0.03)
        tone(t, 2 * B, mtof(root), 0.25, harm=1, decay=1.2); tone(t + 2 * B, 2 * B, mtof(root + 7), 0.2, harm=1, decay=1.2)
    for i in range(N): n = random.uniform(-1, 1) * 0.004; L[i] += n; R[i] += n   # vinyl hiss
peak = max(max(map(abs, L)), max(map(abs, R)))
with wave.open(OUT, 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); fr = bytearray()
    for i in range(N):
        fade = min(1, (DUR - i / SR) / 0.8, i / SR / 0.05)
        fr += struct.pack('<hh', int(math.tanh(L[i] / peak * 1.2) * 0.85 * fade * 32000), int(math.tanh(R[i] / peak * 1.2) * 0.85 * fade * 32000))
    w.writeframes(bytes(fr))
print(STYLE, 'peak', round(peak, 3))
