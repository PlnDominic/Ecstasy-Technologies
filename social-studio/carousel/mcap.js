const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const SITES = [['persis','https://www.persisluxury.com'],['solani','https://www.solaniconstruction.com/'],['gusty','https://www.gustywomenfoundation.org/'],['kings','https://www.kingstowers-hotel.com/']];
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox','--ignore-certificate-errors'] });
  await Promise.all(SITES.map(async ([n,u]) => {
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, ignoreHTTPSErrors: true,
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1' });
    const p = await ctx.newPage();
    try {
      await p.goto(u, { waitUntil: 'networkidle', timeout: 45000 }).catch(()=>{});
      await p.waitForTimeout(2500);
      for (let y = 0; y < 6000; y += 300) { await p.evaluate(yy => window.scrollTo(0, yy), y); await p.waitForTimeout(120); }
      await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(1200);
      await p.screenshot({ path: `cap/${n}.png`, fullPage: true });
      console.log('ok', n);
    } catch (e) { console.log('FAIL', n, e.message.split('\n')[0]); }
    await ctx.close();
  }));
  await b.close();
})();
