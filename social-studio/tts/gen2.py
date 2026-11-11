import wave, re, json
from piper import PiperVoice, SynthesisConfig
LINES = {
 'ryan': [
  ('sc1','This is how {Ecstasy Technologies} built an online store.'),
  ('sc2','Customers search, browse fifteen categories, and tap quick add.'),
  ('sc3','Then they pay with MoMo or card, on any phone.'),
  ('sc4','Need a store? WhatsApp, {Ecstasy Technologies}, now.'),
  ('sb1','Make buying easy.'),
  ('sb2','Here, {Ecstasy Technologies} built a store where customers find, add, and pay.'),
  ('sb3','Pay with MoMo or card.'),
  ('sb4','Sleek Connect Store, built by {Ecstasy Technologies}.'),
  ('sb5','Need a store? Message us on WhatsApp.'),
 ],
 'jenny': [
  ('m1a','How do you sell a gown made to measure, online?'),
  ('m1b','Customers browse and turn every design.'),
  ('m1c','They send measurements and photos.'),
  ('m1d','And book a fitting.'),
  ('m1e','Or send a photo of their own design.'),
  ('m1f','Built by {Ecstasy Technologies}, in Ghana.'),
  ('m2a','Made to measure, made simple.'),
  ('m2b','Browse. Turn. Order. {Ecstasy Technologies} built the whole flow.'),
  ('m2c','Pick a design. Send your measurements. They stitch it to fit.'),
  ('m2d','Built by {Ecstasy Technologies}, in Ghana.'),
 ]}
MODEL = {'ryan': ('en_US-ryan-high.onnx', 1.04, 1.28), 'jenny': ('en_GB-jenny_dioco-medium.onnx', 1.10, 1.22)}
def seg(v, text, scale, path):
    with wave.open(path, 'wb') as w: v.synthesize_wav(text, w, syn_config=SynthesisConfig(length_scale=scale))
    with wave.open(path) as w: return w.getparams(), w.readframes(w.getnframes())
out = {}
for voice, lines in LINES.items():
    model, base, brand = MODEL[voice]; v = PiperVoice.load(model)
    for key, text in lines:
        parts = [p for p in re.split(r'(\{[^}]+\})', text) if re.search(r'\w', p)]
        frames = b''; params = None
        for p in parts:
            isb = p.startswith('{'); t = p.strip('{} ')
            params, fr = seg(v, t.strip(), brand if isb else base, f'vo/_tmp.wav')
            sil = bytes(int(params.framerate * 0.14) * params.sampwidth)
            frames += (sil if isb and frames else b'') + fr + (sil if isb else b'')
        with wave.open(f'vo/{key}.wav', 'wb') as w:
            w.setparams(params); w.writeframes(frames)
        out[key] = round(len(frames) / params.sampwidth / params.framerate, 2); print(key, out[key], text)
json.dump(out, open('vo/durations.json', 'w'))
