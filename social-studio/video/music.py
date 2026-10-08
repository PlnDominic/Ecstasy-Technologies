# Low, warm theme in A minor at 75 BPM: one bar = 3.2s = one scene beat.
import math, random, wave, struct, array

SR = 48000
import os
CFG = os.environ.get('CFG', '1')
DUR = {'1': 15.0, '2': 18.0, '3': 20.0}[CFG]
N = int(SR * DUR)
L = array.array('d', bytes(8 * N))
R = array.array('d', bytes(8 * N))
random.seed(11)

BEAT = {'1': 0.8, '2': 1.0, '3': 0.6}[CFG]
KICK0, KEND = {'1': (2.2, 12.8), '2': (1.0, 15.6), '3': (8.0, 16.3)}[CFG]
ARP0 = 8.0 if CFG == '3' else 0.0
OUT = {'1': 'music.wav', '2': 'music2.wav', '3': 'music3.wav'}[CFG]
mtof = lambda m: 440.0 * 2 ** ((m - 69) / 12)

# (start, end, pad notes, bass root)
SECTIONS = [
    (0.0, 2.2, [45, 52, 55, 60], None),          # intro: Am7, pad only
    (2.2, 5.4, [45, 52, 55, 59, 60], 33),        # Am9   (Websites)
    (5.4, 8.6, [41, 48, 52, 57], 29),            # Fmaj7 (Business software)
    (8.6, 11.2, [48, 52, 55, 62], 36),           # Cadd9 (Mobile apps)
    (11.2, 12.8, [43, 50, 57, 59], 31),          # Gsus/add (grid)
    (12.8, 15.0, [45, 52, 57, 61, 59], 33),      # A add9 resolve (end card)
]
if CFG == '3':
    SECTIONS = [
        (0.0, 6.9, [45, 52, 55, 60], 33),         # pain: Am, sparse (no kick/arp)
        (6.9, 8.0, [40, 47, 52, 56], 28),         # turn: E (tension → resolve)
        (8.0, 10.4, [41, 48, 52, 57], 29),        # Get found: Fmaj7
        (10.4, 12.8, [48, 52, 55, 62], 36),       # Get organised: Cadd9
        (12.8, 15.2, [43, 50, 57, 59], 31),       # Get booked: G
        (15.2, 16.3, [41, 48, 53, 57], 29),       # already looking: F
        (16.3, 20.0, [45, 52, 57, 61, 59], 33),   # end card: A add9 lift
    ]
if CFG == '2':
    SECTIONS = [
        (0.0, 1.0, [45, 52, 55, 60], None),
        (1.0, 5.0, [45, 52, 55, 59, 60], 33),
        (5.0, 9.0, [41, 48, 52, 57], 29),
        (9.0, 13.0, [48, 52, 55, 62], 36),
        (13.0, 15.6, [43, 50, 57, 59], 31),
        (15.6, 18.0, [45, 52, 57, 61, 59], 33),
    ]


def add_note(t0, t1, f, gain, att, rel, harmonics, pan=0.0, detune=0.0, bright=1.0):
    i0, i1 = int(t0 * SR), min(N, int((t1 + rel) * SR))
    gl, gr = gain * (1 - max(0, pan)), gain * (1 + min(0, pan))
    hs = [(h, (1 / h) * math.exp(-(h - 1) / (2.2 * bright))) for h in range(1, harmonics + 1)]
    norm = 1 / sum(a for _, a in hs)
    w = 2 * math.pi * f / SR
    w2 = 2 * math.pi * f * (1 + detune) / SR
    for i in range(i0, i1):
        t = (i - i0) / SR
        env = min(1.0, t / att) if att > 0 else 1.0
        if i / SR > t1:
            env *= max(0.0, 1 - (i / SR - t1) / rel)
        if env <= 0:
            continue
        k = i - i0
        v = 0.0
        for h, a in hs:
            v += a * (math.sin(w * h * k) + (math.sin(w2 * h * k) if detune else 0))
        v *= norm * env * (0.5 if detune else 1)
        L[i] += v * gl
        R[i] += v * gr


for s, e, pad, root in SECTIONS:
    # pad: soft, low-passed (few harmonics), slightly detuned for width
    for j, m in enumerate(pad):
        add_note(s, e, mtof(m), 0.16, 0.7, 0.9, 5, pan=(j - len(pad) / 2) * 0.12, detune=0.0025, bright=0.7)
    if root is not None:
        # sub bass: pure-ish sine, sustained per bar
        add_note(s, e - 0.05, mtof(root), 0.42, 0.05, 0.3, 2, bright=0.4)
        # plucked arpeggio on eighths, one octave above the pad, very soft
        tones = sorted(set(m + 12 for m in pad))
        pattern = [0, 2, 1, 3, 2, 1, 3, 2]
        n_eighths = int(round((e - s) / (BEAT / 2)))
        for q in range(n_eighths):
            t = s + q * BEAT / 2
            if t >= KEND:
                break
            if t < ARP0:
                continue
            m = tones[pattern[q % len(pattern)] % len(tones)]
            f = mtof(m)
            i0 = int(t * SR)
            d = int(0.45 * SR)
            pan = 0.25 if q % 2 else -0.25
            for k in range(d):
                i = i0 + k
                if i >= N:
                    break
                tt = k / SR
                env = math.exp(-tt * 7.5) * min(1, tt / 0.004)
                v = (math.sin(2 * math.pi * f * tt) + 0.25 * math.sin(4 * math.pi * f * tt)) * env * 0.07
                L[i] += v * (1 - max(0, pan))
                R[i] += v * (1 + min(0, pan))

# soft kick on every beat from the first cut until the end card
t = KICK0
while t < KEND - 1e-6:
    i0 = int(t * SR)
    ph = 0.0
    for k in range(int(0.35 * SR)):
        tt = k / SR
        f = 45 + 70 * math.exp(-tt * 35)
        ph += 2 * math.pi * f / SR
        v = math.sin(ph) * math.exp(-tt * 11) * 0.30
        L[i0 + k] += v
        R[i0 + k] += v
    t += BEAT

# gentle one-pole low-pass over the whole bus to keep it dark
for buf in (L, R):
    y = 0.0
    a = 1 - math.exp(-2 * math.pi * 1800 / SR)
    for i in range(N):
        y += a * (buf[i] - y)
        buf[i] = y

peak = max(max(abs(x) for x in L), max(abs(x) for x in R))
with wave.open(OUT, 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    fr = bytearray()
    for i in range(N):
        fade = min(1, (DUR - i / SR) / 0.6)
        fr += struct.pack('<hh', int(L[i] / peak * 0.9 * fade * 32000), int(R[i] / peak * 0.9 * fade * 32000))
    w.writeframes(bytes(fr))
print('music peak', round(peak, 3))
