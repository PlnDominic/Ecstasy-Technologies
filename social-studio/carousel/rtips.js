const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path'); const fs=require('fs');
const CL = process.argv[2] || 'school'; const OUT = process.argv[3] || 'out/tips';
(async () => {
  fs.mkdirSync(path.join(__dirname, OUT), { recursive: true });
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome', args: ['--no-sandbox', '--force-color-profile=srgb', '--allow-file-access-from-files'] });
  for (const fmt of ['tt', 'ig']) {
    const p = await b.newPage({ viewport: { width: 1080, height: fmt === 'tt' ? 1920 : 1350 } });
    for (let n = 1; n <= 5; n++) {
      await p.goto('file://' + path.join(__dirname, 'tips.html') + `?c=${CL}&fmt=${fmt}&n=${n}`);
      await p.waitForFunction('window.__ready === true', { timeout: 20000 });
      await p.screenshot({ path: path.join(__dirname, OUT, `${CL}-${fmt}-${n}.png`) });
    }
    await p.close();
  }
  await b.close();
})();
