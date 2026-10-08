const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');

const OUT = path.join(__dirname, 'captures');
const DESKTOP = [
  ['kings-towers', 'https://www.kingstowers-hotel.com/'],
  ['solani', 'https://www.solaniconstruction.com/'],
  ['lavimac', 'https://lavimacroyalhotel.com'],
  ['persis', 'https://www.persisluxury.com'],
  ['gusty', 'https://www.gustywomenfoundation.org/'],
  ['thrive', 'https://www.thriveedu-africa.com/'],
  ['nhyiraba-hms', 'https://nhyiraba-hms.vercel.app'],
  ['moldgold', 'https://moldgold-school.vercel.app'],
  ['dropship', 'https://local-drop-shipping.vercel.app/'],
  ['clems', 'https://clems-akinaabi.vercel.app/'],
  ['hotel-ms', 'https://mikjane-hotel-system-management-software.vercel.app/landing'],
  ['aspee', 'https://aspee-pharma.vercel.app/overview'],
];
const MOBILE = [
  ['cassvo-appstore', 'https://apps.apple.com/us/app/cassvo/id6793166872'],
];

async function shoot(browser, name, url, viewport, dpr) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: dpr, ignoreHTTPSErrors: true,
    userAgent: viewport.width < 600
      ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
      : undefined });
  const page = await ctx.newPage();
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 }).catch(() => {});
    await page.waitForTimeout(2500);
    // trigger lazy content / scroll-reveal animations
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < Math.min(h, 6000); y += 400) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await page.waitForTimeout(150);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1200);
    await page.screenshot({ path: path.join(OUT, `${name}.png`), fullPage: true });
    console.log('ok', name, h);
  } catch (e) {
    console.log('FAIL', name, e.message.split('\n')[0]);
  }
  await ctx.close();
}

(async () => {
  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--no-sandbox', '--ignore-certificate-errors'],
  });
  await Promise.all(DESKTOP.map(([n, u]) => shoot(browser, n, u, { width: 1440, height: 900 }, 1)));
  for (const [n, u] of MOBILE) await shoot(browser, n, u, { width: 390, height: 844 }, 3);
  await browser.close();
})();
