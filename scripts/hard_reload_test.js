import puppeteer from 'puppeteer';

async function run() {
  const url = process.env.URL || 'http://localhost:3005/';
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  // Install PerformanceObserver on every new document to capture layout-shift entries
  await page.evaluateOnNewDocument(() => {
    window.__CLS = { entries: [] };
    try {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          window.__CLS.entries.push({
            value: entry.value,
            hadRecentInput: entry.hadRecentInput,
            sources: entry.sources ? entry.sources.map(s => ({node: s.node && s.node.tagName, previousRect: s.previousRect, currentRect: s.currentRect})) : undefined,
          });
        }
      }).observe({ type: 'layout-shift', buffered: true });
    } catch (e) {
      // ignore
    }
  });

  const results = [];

  // capture console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      page.__consoleErrors = page.__consoleErrors || [];
      page.__consoleErrors.push(msg.text());
    }
  });
  page.on('pageerror', err => {
    page.__pageErrors = page.__pageErrors || [];
    page.__pageErrors.push(err.message);
  });

  for (let i = 1; i <= 5; i++) {
    // simulate hard reload by disabling cache and navigating
    await page.setCacheEnabled(false);

    // record scroll before navigation (0 for new page)
    const beforeScroll = await page.evaluate(() => window.scrollY || 0).catch(() => 0);

    // navigate / reload
    try {
      if (i === 1) {
        await page.goto(url, { waitUntil: 'load', timeout: 60000 });
      } else {
        await page.reload({ waitUntil: 'load', timeout: 60000 });
      }
    } catch (e) {
      // navigation error
    }

    // give some time for potential layout shifts and scripts
    await new Promise((r) => setTimeout(r, 1200));

    // collect data
    const clsEntries = await page.evaluate(() => (window.__CLS && window.__CLS.entries) || []);
    const afterScroll = await page.evaluate(() => window.scrollY || 0);
    const consoleErrors = page.__consoleErrors || [];
    const pageErrors = page.__pageErrors || [];

    const hadJump = beforeScroll !== afterScroll;
    const hadCLS = clsEntries.length > 0 && clsEntries.some(e => !e.hadRecentInput && e.value > 0);

    results.push({
      run: i,
      hadJump: hadJump ? 'Yes' : 'No',
      hadCLS: hadCLS ? 'Yes' : 'No',
      clsCount: clsEntries.length,
      consoleErrors: consoleErrors.concat(pageErrors),
    });

    // clear captured errors for next run
    page.__consoleErrors = [];
    page.__pageErrors = [];
  }

  await browser.close();
  console.log(JSON.stringify(results, null, 2));
}

run().catch(err => { console.error(err); process.exit(1); });
