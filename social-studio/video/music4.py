# "The shop that never sleeps": music-box lullaby in D major, 100 BPM, bars of 2.4s.
import math, random, wave, struct, array

SR = 48000
DUR = 22.0
N = int(SR * DUR)
L = array.array('d', bytes(8 * N))
R = array.array('d', bytes(8 * N))
random.seed(4)
BEAT = 0.6
BAR = 2.4
mtof = lambda m: 440.0 * 2 ** ((m - 69) / 12)

# one chord per bar (pad voicing, bass root)
CHORDS = [
    ([50, 57, 62, 66], 38),   # 0 D      shop closes
    ([47, 54, 59, 62], 35),   # 1 Bm     customers awake
    ([43, 50, 55, 59], 31),   # 2 G      never closes
    ([45, 52, 57, 61], 33),   # 3 A      pull back
    ([50, 57, 62, 66], 38),   # 4 D      skyline
    ([47, 54, 59, 62], 35),   # 5 Bm
    ([43, 50, 55, 59], 31),   # 6 G      dawn
    ([50, 57, 62, 66, 64], 38),  # 7 D(add9) end card
    ([50, 57, 62, 66, 64], 38),  # 8
    ([50, 57, 62, 66, 64], 38),  # 9 (tail)
]
# music-box melody: (bar, beat offset in beats, midi, length in beats)
MEL = []
motif_a = [(0, 66, 1), (1, 69, 1), (2, 74, 1.5), (3.5, 73, .5)]
motif_b = [(0, 71, 1), (1, 69, 1), (2, 66, 1.5), (3.5, 64, .5)]
motif_c = [(0, 67, 1), (1, 71, 1), (2, 74, 1), (3, 71, 1)]
motif_d = [(0, 69, 1.5), (1.5, 73, .5), (2, 76, 2)]
for bar, mot in [(1, motif_a), (2, motif_c), (3, motif_d), (4, motif_a), (5, motif_b), (6, motif_c)]:
    for off, m, ln in mot:
        MEL.append((bar * BAR + off * BEAT, m, ln * BEAT))
# end card: rising D arpeggio, then a held high note
for i, m in enumerate([62, 66, 69, 74, 78]):
    MEL.append((7 * BAR + 0.15 + i * 0.3, m, 1.2))


def add(i0, samples, gl=1.0, gr=1.0):
    for k, v in enumerate(samples):
        i = i0 + k
        if 0 <= i < N:
            L[i] += v * gl
            R[i] += v * gr


def pad_note(t0, t1, f, gain, pan):
    i0, i1 = int(t0 * SR), min(N, int((t1 + 1.2) * SR))
    gl, gr = gain * (1 - max(0, pan)), gain * (1 + min(0, pan))
    w1, w2 = 2 * math.pi * f / SR, 2 * math.pi * f * 1.003 / SR
    for i in range(i0, i1):
        t = (i - i0) / SR
        env = min(1.0, t / 0.9)
        if i / SR > t1:
            env *= max(0.0, 1 - (i / SR - t1) / 1.2)
        k = i - i0
        v = (math.sin(w1 * k) + math.sin(w2 * k) + 0.3 * math.sin(2 * w1 * k) + 0.12 * math.sin(3 * w2 * k)) * 0.42 * env
        L[i] += v * gl
        R[i] += v * gr


def bell(f, d):
    out = []
    n = int((d + 1.6) * SR)
    for k in range(n):
        t = k / SR
        env = math.exp(-t * 2.6) * min(1, t / 0.003)
        v = (math.sin(2 * math.pi * f * t) + 0.35 * math.sin(2 * math.pi * f * 2.0 * t) * math.exp(-t * 6)
             + 0.18 * math.sin(2 * math.pi * f * 3.01 * t) * math.exp(-t * 9))
        out.append(v * env)
    return out


# pads + bass
for b, (pad, root) in enumerate(CHORDS):
    s, e = b * BAR, min(DUR, (b + 1) * BAR)
    for j, m in enumerate(pad):
        pad_note(s, e, mtof(m), 0.10, (j - len(pad) / 2) * 0.15)
    if b >= 3:  # bass enters with the pull-back
        i0 = int(s * SR)
        f = mtof(root)
        for k in range(int((e - s) * SR)):
            t = k / SR
            env = min(1, t / 0.03) * (0.75 + 0.25 * math.exp(-t * 3))
            L[i0 + k] += math.sin(2 * math.pi * f * t) * env * 0.30
            R[i0 + k] += math.sin(2 * math.pi * f * t) * env * 0.30

# melody (music box), panned slightly right
for t0, m, ln in MEL:
    add(int(t0 * SR), bell(mtof(m), ln), 0.16 * 0.85, 0.16)

# crickets during the night street (very soft, low-passed later)
t = 0.3
while t < 7.4:
    f = 3600 + random.uniform(-200, 200)
    i0 = int(t * SR)
    pan = random.uniform(-0.6, 0.6)
    for burst in range(3):
        b0 = i0 + int(burst * 0.045 * SR)
        for k in range(int(0.03 * SR)):
            v = math.sin(2 * math.pi * f * k / SR) * math.sin(math.pi * k / (0.03 * SR)) * 0.022
            if b0 + k < N:
                L[b0 + k] += v * (1 - max(0, pan))
                R[b0 + k] += v * (1 + min(0, pan))
    t += random.uniform(0.35, 0.8)

# soft heartbeat-like kick + shaker from the skyline to the end card
t = 7.2
while t < 16.8 - 1e-6:
    i0 = int(t * SR)
    ph = 0.0
    for k in range(int(0.3 * SR)):
        tt = k / SR
        f = 48 + 60 * math.exp(-tt * 32)
        ph += 2 * math.pi * f / SR
        v = math.sin(ph) * math.exp(-tt * 12) * 0.34
        L[i0 + k] += v
        R[i0 + k] += v
    s0 = int((t + BEAT / 2) * SR)
    lp = 0.0
    for k in range(int(0.06 * SR)):
        lp += 0.5 * (random.uniform(-1, 1) - lp)
        v = lp * math.exp(-k / SR * 60) * 0.05
        if s0 + k < N:
            L[s0 + k] += v * 0.8
            R[s0 + k] += v
    t += BEAT

# keep it warm: one-pole low-pass
for buf in (L, R):
    y = 0.0
    a = 1 - math.exp(-2 * math.pi * 3200 / SR)
    for i in range(N):
        y += a * (buf[i] - y)
        buf[i] = y

peak = max(max(abs(x) for x in L), max(abs(x) for x in R))
with wave.open('music4.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    fr = bytearray()
    for i in range(N):
        fade = min(1, (DUR - i / SR) / 1.0) * min(1, i / (0.4 * SR))
        fr += struct.pack('<hh', int(L[i] / peak * 0.9 * fade * 32000), int(R[i] / peak * 0.9 * fade * 32000))
    w.writeframes(bytes(fr))
print('music4 peak', round(peak, 3))
