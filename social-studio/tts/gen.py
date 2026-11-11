import wave, sys, json
from piper import PiperVoice, SynthesisConfig
LINES = {
 'ryan': [
  ('sc1','This is how your online store gets built.'),
  ('sc2','Free delivery in Accra. MoMo and card checkout.'),
  ('sc3',"And it's live, on every phone. Sleek Connect Store."),
  ('sc4','Want a store like this? WhatsApp Ecstasy Technologies.'),
  ('sb1','Your shop never closes.'),
  ('sb2','Add to bag. Pay with MoMo or card.'),
  ('sb3','Free delivery in Accra.'),
  ('sb4','Every product is checked for authenticity.'),
  ('sb5','Built by Ecstasy Technologies.'),
  ('sb6','Want a store like this? WhatsApp us.'),
 ],
 'jenny': [
  ('m1a','Sewn for your body.'),
  ('m1b','Designs made to measure, in Accra.'),
  ('m1c','Kente prints and beaded detail.'),
  ('m1d','Fitted to your measurements.'),
  ('m1e','Have your own design? Send us a photo.'),
  ('m1f','Website by Ecstasy Technologies.'),
  ('m2a','Sewn for your body.'),
  ('m2b','Three gowns, each made to measure in Accra.'),
  ('m2c','Pick a design. Send your measurements. We stitch it to fit.'),
  ('m2d','Website by Ecstasy Technologies.'),
 ]}
MODEL = {'ryan': 'en_US-ryan-high.onnx', 'jenny': 'en_GB-jenny_dioco-medium.onnx'}
out = {}
for voice, lines in LINES.items():
    v = PiperVoice.load(MODEL[voice])
    for key, text in lines:
        path = f'vo/{key}.wav'
        with wave.open(path, 'wb') as w:
            v.synthesize_wav(text, w, syn_config=SynthesisConfig(length_scale=(1.08 if voice == 'jenny' else 1.0)))
        with wave.open(path) as w: d = w.getnframes() / w.getframerate()
        out[key] = round(d, 2); print(key, round(d, 2), text)
json.dump(out, open('vo/durations.json', 'w'))
