/* eslint-env node */
import puppeteer from 'puppeteer';

async function runViewportTest(page, url) {
  // Install PerformanceObserver on every new document to capture layout-shift entries
  // Capture richer details (timestamp, selector, outerHTML snippet) to help identify culprits
  await page.evaluateOnNewDocument(() => {
    window.__CLS = { entries: [] };
    try {
      const getSelector = (el) => {
        if (!el || !el.tagName) return null;
        if (el.id) return `#${el.id}`;
        const parts = [];
        let node = el;
        while (node && node.nodeType === 1 && node.tagName.toLowerCase() !== 'html') {
          let part = node.tagName.toLowerCase();
          if (node.className && typeof node.className === 'string') {
            const cls = node.className.split(/\s+/).filter(Boolean)[0];
            if (cls) part += `.${cls}`;
          }
          parts.unshift(part);
          node = node.parentElement;
        }
        return parts.length ? parts.join(' > ') : el.tagName.toLowerCase();
      };

      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const ts = Math.round(performance.timeOrigin + entry.startTime);
          window.__CLS.entries.push({
            value: entry.value,
            hadRecentInput: entry.hadRecentInput,
            timestamp: ts,
            sources: entry.sources ? entry.sources.map(s => {
              const node = s.node;
              let selector = null;
              let outer = null;
              try {
                selector = getSelector(node);
                if (node && node.outerHTML) outer = node.outerHTML.slice(0, 300);
              } catch (e) {
                /* ignore */
              }
              return {
                nodeTag: node && node.tagName,
                selector,
                outerHTMLSnippet: outer,
                previousRect: s.previousRect,
                currentRect: s.currentRect,
              };
            }) : undefined,
          });
        }
      }).observe({ type: 'layout-shift', buffered: true });
    } catch (e) {
      // ignore
    }
  });

  const results = [];
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
    await page.setCacheEnabled(false);
    const beforeScroll = await page.evaluate(() => window.scrollY || 0).catch(() => 0);
    try {
      if (i === 1) {
        await page.goto(url, { waitUntil: 'load', timeout: 60000 });
      } else {
        await page.reload({ waitUntil: 'load', timeout: 60000 });
      }
    } catch (e) {
      // ignore
    }
    await new Promise((r) => setTimeout(r, 1200));
    const clsEntries = await page.evaluate(() => (window.__CLS && window.__CLS.entries) || []);
    const afterScroll = await page.evaluate(() => window.scrollY || 0);
    const consoleErrors = page.__consoleErrors || [];
    const pageErrors = page.__pageErrors || [];
    const hadJump = beforeScroll !== afterScroll;

    const hasRealCLS = clsEntries.length > 0 && clsEntries.some(e => !e.hadRecentInput && e.value > 0);
    const cumulativeScore = clsEntries.reduce((acc, e) => {
      if (e && !e.hadRecentInput && typeof e.value === 'number') return acc + e.value;
      return acc;
    }, 0);

    const topShifts = (clsEntries || []).filter(e => e && !e.hadRecentInput && e.value > 0)
      .sort((a, b) => b.value - a.value)
      .slice(0, 3)
      .map(e => ({ value: e.value, timestamp: e.timestamp || null, sources: e.sources || [] }));

    results.push({
      run: i,
      hadJump: hadJump ? 'Yes' : 'No',
      hadCLS: hasRealCLS ? 'Yes' : 'No',
      clsCount: clsEntries.length,
      cumulativeScore,
      topShifts,
      consoleErrors: consoleErrors.concat(pageErrors),
    });
    page.__consoleErrors = [];
    page.__pageErrors = [];
  }
  return results;
}

async function run() {
  const url = process.env.URL || 'http://localhost:3005/';
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });

  const viewports = [
    { name: 'desktop', width: 1280, height: 800 },
    { name: 'tablet', width: 900, height: 800 },
    { name: 'mobile', width: 375, height: 812 },
  ];

  const summary = {};

  for (const vp of viewports) {
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height });
    const results = await runViewportTest(page, url);
    summary[vp.name] = results;
    await page.close();
  }

  await browser.close();
  console.log(JSON.stringify(summary, null, 2));
}

run().catch(err => { console.error(err); process.exitCode = 1; });
