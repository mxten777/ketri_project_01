import puppeteer from 'puppeteer';

async function run() {
  const url = process.env.URL || 'http://localhost:3005/';
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  await page.evaluateOnNewDocument(() => {
    window.__CLS = { entries: [] };
    try {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          window.__CLS.entries.push({ value: entry.value, hadRecentInput: entry.hadRecentInput, sources: (entry.sources || []).map(s => ({node: s.node && s.node.tagName, previousRect: s.previousRect, currentRect: s.currentRect})) });
        }
      }).observe({ type: 'layout-shift', buffered: true });
    } catch (e) {}
  });

  await page.setCacheEnabled(false);
  await page.goto(url, { waitUntil: 'load', timeout: 60000 });
  await new Promise(r => setTimeout(r, 1500));

  const entries = await page.evaluate(() => {
    const raw = (window.__CLS && window.__CLS.entries) ? window.__CLS.entries : [];
    return raw.map(e => ({
      value: e.value,
      hadRecentInput: e.hadRecentInput,
      sources: (e.sources || []).map(s => {
        try {
          const node = s.node;
          if (!node) return { node: null };
          return {
            tag: node.tagName,
            id: node.id || null,
            className: node.className || null,
            rect: node.getBoundingClientRect ? { top: node.getBoundingClientRect().top, left: node.getBoundingClientRect().left, width: node.getBoundingClientRect().width, height: node.getBoundingClientRect().height } : null,
          };
        } catch (err) {
          return { node: null };
        }
      })
    }));
  });
  console.log(JSON.stringify(entries, null, 2));

  await browser.close();
}

run().catch(e => { console.error(e); process.exit(1); });
