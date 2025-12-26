#!/usr/bin/env node
// Simple smoke test for Phase-2 Mega Menu basic availability
// Usage: node scripts/mega_menu_smoke_test.js [BASE_URL]

// Determine base URL: prefer process.env.BASE_URL; otherwise use 127.0.0.1 with PORT (avoid localhost)
const argBase = process.argv[2];
const envBase = process.env.BASE_URL;
const port = process.env.PORT || process.argv[3] || '3004';
const BASE = envBase || (argBase ? argBase : `http://127.0.0.1:${port}`);

// Ensure fetch is available in Node; prefer global fetch, fall back to undici
let fetchFn;
if (typeof globalThis.fetch === 'function') {
  fetchFn = globalThis.fetch.bind(globalThis);
} else {
  try {
    // minimal dependency: undici is commonly available in Node 18+ environments
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { fetch: undiciFetch } = require('undici');
    fetchFn = undiciFetch;
  } catch (e) {
    try {
      // fallback to node-fetch if undici not available
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      fetchFn = require('node-fetch');
    } catch (err) {
      console.error('No fetch implementation available. Install undici or node-fetch.');
      process.exit(2);
    }
  }
}

const fetch = fetchFn;

(async () => {
  const targets = ['/', '/about/greeting'];
  let failed = false;

  console.log(`Running mega menu smoke test against ${BASE}`);

  for (const path of targets) {
    const url = new URL(path, BASE).toString();
    try {
      const res = await fetch(url, { method: 'GET' });
      console.log(`${url} -> ${res.status} ${res.statusText || ''}`);
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
      console.warn('WARN: index.html has no script tag (bundle not found)');
      // treat as warning only
    } else {
      const scriptUrl = new URL(scriptMatch[1], BASE).toString();
      try {
        const sr = await fetch(scriptUrl, { method: 'GET' });
        console.log(`Bundle ${scriptUrl} -> ${sr.status}`);
        if (sr.status !== 200) {
          console.warn(`WARN: bundle ${scriptUrl} returned ${sr.status}`);
          // do not mark as failed
        }
      } catch (err) {
        console.warn(`WARN: Failed to fetch bundle ${scriptUrl}:`, err.message || err);
        // do not mark as failed for bundle fetch
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
