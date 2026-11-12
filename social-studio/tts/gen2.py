import wave, re, json
from piper import PiperVoice, SynthesisConfig
LINES = {
 'jenny': [
  ('mm1','How does a spa get clients to book online?'),
  ('mm2','Here, {Ecstasy Technologies} built a site that shows every treatment and its price.'),
  ('mm3','With a Book Now button on every one.'),
  ('mm4','Plus a signature package, and a luxury look on every phone.'),
  ('mm5','Michelle Mayers Skincare and Spa, built by {Ecstasy Technologies}.'),
  ('mm6','Need a website? Message us on WhatsApp.'),
  ('sc1','Hard to buy? You lose the sale. Here is how {Ecstasy Technologies} fixes that.'),
  ('sc2','Customers search, browse fifteen categories, and tap quick add.'),
  ('sc3','Then they pay with MoMo or card, on any phone.'),
  ('sc4','Need a store? Message {Ecstasy Technologies}. It takes one message.'),
  ('sb1','Make buying easy.'),
  ('sb2','Here, {Ecstasy Technologies} built a store where customers find, add, and pay.'),
  ('sb3','Pay with MoMo or card.'),
  ('sb4','Sleek Connect Store, built by {Ecstasy Technologies}.'),
  ('sb5','Message us on WhatsApp.'),
  ('m1a','How do you sell a gown made to measure, online?'),
  ('m1b','Customers browse and turn every design.'),
  ('m1c','They send measurements and photos.'),
  ('m1d','And book a fitting.'),
  ('m1e','Or send a photo of their own design.'),
  ('m1f','Taking orders in DMs? Let {Ecstasy Technologies} build yours.'),
  ('m2a',"Still taking orders in DMs? There's an easier way."),
  ('m2b','Browse. Turn. Order. {Ecstasy Technologies} built the whole flow.'),
  ('m2c','Pick a design. Send your measurements. They stitch it to fit.'),
  ('m2d','Tired of DMs? Let {Ecstasy Technologies} build it.'),
 ]}
MODEL = {'ryan': ('en_US-ryan-high.onnx', 1.04, 1.28), 'jenny': ('en_GB-jenny_dioco-medium.onnx', 1.10, 1.14)}
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
