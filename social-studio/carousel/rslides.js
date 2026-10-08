const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox', '--force-color-profile=srgb', '--allow-file-access-from-files'] });
  for (const fmt of ['tt', 'ig']) {
    const H = fmt === 'tt' ? 1920 : 1350;
    const p = await b.newPage({ viewport: { width: 1080, height: H } });
    for (let n = 1; n <= 5; n++) {
      await p.goto('file://' + path.join(__dirname, 'slides.html') + `?fmt=${fmt}&n=${n}`);
      await p.waitForFunction('window.__ready === true', { timeout: 20000 });
      await p.screenshot({ path: path.join(__dirname, 'out', `carousel-${fmt}-${n}.png`) });
    }
    await p.close();
  }
  await b.close();
})();
