#!/usr/bin/env node
// Simple smoke test for Phase-2 Mega Menu basic availability
// Usage: node scripts/mega_menu_smoke_test.js [BASE_URL]

const BASE = process.argv[2] || process.env.BASE_URL || 'http://localhost:5173';
const fetch = global.fetch || require('node-fetch');

(async () => {
  const targets = ['/', '/about/greeting'];
  let failed = false;

  console.log(`Running mega menu smoke test against ${BASE}`);

  for (const path of targets) {
    const url = new URL(path, BASE).toString();
    try {
      const res = await fetch(url, { method: 'GET' });
      console.log(`${url} -> ${res.status} ${res.statusText}`);
      if (res.status !== 200) {
        console.error(`ERROR: ${url} returned ${res.status}`);
        failed = true;
      }
    } catch (err) {
      console.error(`ERROR: Failed to fetch ${url}:`, err.message || err);
      failed = true;
    }
  }

  // Fetch index.html and ensure there is at least one script tag (bundle served)
  try {
    const indexUrl = new URL('/index.html', BASE).toString();
    const r = await fetch(indexUrl);
    const text = await r.text();
    const hasRoot = /<div[^>]+id=["']root["']/i.test(text) || /<div[^>]+id=["']app["']/i.test(text);
    const scriptMatch = text.match(/<script[^>]+src=["']([^"']+)["']/i);
    if (!hasRoot) console.warn('WARN: index.html does not contain obvious app root id');
    if (!scriptMatch) {
      console.error('ERROR: index.html has no script tag (bundle not found)');
      failed = true;
    } else {
      const scriptUrl = new URL(scriptMatch[1], BASE).toString();
      try {
        const sr = await fetch(scriptUrl, { method: 'GET' });
        console.log(`Bundle ${scriptUrl} -> ${sr.status}`);
        if (sr.status !== 200) {
          console.error(`ERROR: bundle ${scriptUrl} returned ${sr.status}`);
          failed = true;
        }
      } catch (err) {
        console.error(`ERROR: Failed to fetch bundle ${scriptUrl}:`, err.message || err);
        failed = true;
      }
    }
  } catch (err) {
    console.error('ERROR fetching index.html:', err.message || err);
    failed = true;
  }

  if (failed) {
    console.error('\nSMOKE TEST FAILED');
    process.exit(2);
  }

  console.log('\nSMOKE TEST PASSED');
  process.exit(0);
})();
