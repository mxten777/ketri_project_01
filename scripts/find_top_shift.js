import puppeteer from 'puppeteer';

function getSelectorForNode(node) {
  if (!node) return null;
  try {
    if (node.id) return `#${node.id}`;
    if (node.tagName.toLowerCase() === 'html') return 'html';
    if (node.tagName.toLowerCase() === 'body') return 'body';
    let path = [];
    let el = node;
    while (el && el.nodeType === 1 && el.tagName.toLowerCase() !== 'html') {
      let selector = el.tagName.toLowerCase();
      if (el.className) {
        const cls = (typeof el.className === 'string') ? el.className.split(/\s+/)[0] : null;
        if (cls) selector += `.${cls}`;
      }
      const parent = el.parentElement;
      if (parent) {
        const children = Array.from(parent.children).filter(c => c.tagName === el.tagName);
        if (children.length > 1) {
          const idx = Array.from(parent.children).indexOf(el) + 1;
          selector += `:nth-child(${idx})`;
        }
      }
      path.unshift(selector);
      el = el.parentElement;
    }
    return path.join(' > ');
  } catch (e) {
    return null;
  }
}

async function run() {
  const url = process.env.URL || 'http://localhost:3005/';
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  await page.evaluateOnNewDocument(() => {
    window.__CLS = { entries: [] };
    try {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const sources = (entry.sources || []).map(s => ({
            // try to capture a pointer to node; will be serialized in page context
            tag: s.node && s.node.tagName ? s.node.tagName : null,
            hasNode: !!s.node,
          }));
          window.__CLS.entries.push({ value: entry.value, hadRecentInput: entry.hadRecentInput, rawLength: list.getEntries().length });
        }
      }).observe({ type: 'layout-shift', buffered: true });
    } catch (e) {}
  });

  await page.setCacheEnabled(false);
  await page.goto(url, { waitUntil: 'load', timeout: 60000 });
  await new Promise(r => setTimeout(r, 1200));

  // Get entries and attempt to compute selector for largest entry's first source node
  const result = await page.evaluate(() => {
    const entries = (window.__CLS && window.__CLS.entries) ? window.__CLS.entries : [];
    if (entries.length === 0) return { entries: [] };
    const sorted = entries.slice().sort((a,b) => b.value - a.value);
    const top = sorted[0];
    return { topValue: top.value };
  });

  // Now try to locate nodes by heuristic in real DOM: find elements that changed size by comparing computed styles before/after reload is not possible here; instead attempt to find candidates: header pseudo, header nav anchors, main, section
  // Heuristic: check header, header::after, header nav a, .container-custom, main
  const candidates = [
    'header',
    'header::after',
    'header nav a',
    '#site-header',
    'main',
    'main > section',
    '.container-custom',
  ];

  let selected = null;
  for (const sel of candidates) {
    const exists = await page.$(sel.replace('::after','*'));
    if (exists) { selected = sel; break; }
  }

  await browser.close();
  console.log(JSON.stringify({ detectedTopValue: result.topValue, heuristicSelector: selected }, null, 2));
}

run().catch(e => { console.error(e); process.exit(1); });
