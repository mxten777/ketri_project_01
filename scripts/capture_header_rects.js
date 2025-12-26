import puppeteer from 'puppeteer';

async function capture(url, vp) {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport(vp);
  await page.goto(url, { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(500);
  const rect = await page.evaluate(() => {
    const h = document.querySelector('#site-header');
    if (!h) return null;
    const r = h.getBoundingClientRect();
    const computed = window.getComputedStyle(h);
    return {
      height: r.height,
      top: r.top,
      bottom: r.bottom,
      computedPaddingTop: computed.paddingTop,
      computedPaddingBottom: computed.paddingBottom,
      inlineStyleHeight: h.style.height || null,
    };
  });
  await browser.close();
  return rect;
}

(async function run(){
  const url = process.env.URL || 'http://localhost:3008/';
  const viewports = [
    { name: 'desktop', width: 1280, height: 800 },
    { name: 'tablet', width: 900, height: 800 },
    { name: 'mobile', width: 375, height: 812 },
  ];

  const out = {};
  for (const vp of viewports) {
    const rect = await capture(url, { width: vp.width, height: vp.height });
    out[vp.name] = rect;
  }

  console.log(JSON.stringify(out, null, 2));
})();
