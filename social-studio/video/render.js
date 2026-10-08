// usage: node render.js <v|h> <sheet|full>
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');
const fs = require('fs');

const fmt = process.argv[2] || 'v';
const mode = process.argv[3] || 'sheet';
const scene = process.argv[4] || 'scene';
const START = parseInt(process.argv[5] || '0', 10);
const FPS = 30;
const W = fmt === 'v' ? 1080 : 1920, H = fmt === 'v' ? 1920 : 1080;
const SHEET_T = scene === 'scene4' ? [0.5, 1.7, 2.2, 3.0, 3.9, 5.0, 5.9, 6.8, 7.7, 9.0, 10.5, 12.0, 13.6, 15.0, 15.8, 17.4, 18.6, 21.5] : scene === 'scene3' ? [0.6, 1.8, 3.4, 4.3, 5.6, 6.6, 7.2, 7.8, 9.0, 11.2, 12.5, 13.6, 14.9, 15.7, 17.0, 19.5] : scene === 'scene2' ? [0.4, 1.3, 2.0, 3.0, 4.5, 6.3, 7.5, 9.5, 10.6, 12.0, 13.4, 14.4, 15.4, 16.2, 17.0, 17.9] : [0.5, 1.6, 2.5, 3.6, 5.0, 6.2, 7.8, 9.4, 10.6, 11.7, 12.5, 13.3, 14.0, 14.9];

(async () => {
  const outDir = path.join(__dirname, (scene === 'scene' ? '' : scene.replace('scene', 's') + '-') + (mode === 'full' ? `frames-${fmt}` : `sheet-${fmt}`));
  if (!START) fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--no-sandbox', '--force-color-profile=srgb', '--allow-file-access-from-files'],
  });
  const page = await browser.newPage({ viewport: { width: W, height: H } });
  await page.goto('file://' + path.join(__dirname, scene + '.html') + '?fmt=' + fmt, { waitUntil: 'load' });
  await page.waitForFunction('window.__ready === true', { timeout: 30000 });
  if (fmt === 'v' && mode === 'full') {
    fs.writeFileSync(path.join(__dirname, scene === 'scene' ? 'events.json' : 'events' + scene.replace('scene', '') + '.json'), JSON.stringify(await page.evaluate('window.__events')));
  }
  const dur = await page.evaluate('window.__duration');
  const times = mode === 'full' ? Array.from({ length: Math.round(dur * FPS) }, (_, i) => i / FPS) : SHEET_T;
  for (let i = START; i < times.length; i++) {
    await page.evaluate(t => window.__seek(t), times[i]);
    await page.screenshot({ path: path.join(outDir, String(i).padStart(5, '0') + '.png') });
    if (mode === 'full' && i % 60 === 0) console.log(fmt, i, '/', times.length);
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
