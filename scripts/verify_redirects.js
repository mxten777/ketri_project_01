#!/usr/bin/env node
// Verify redirects from redirects/redirects.csv
// Usage: node scripts/verify_redirects.js --in redirects/redirects.csv --out redirects/verify_results.csv --sample 20

const fs = require('fs');
const path = require('path');

const argv = require('minimist')(process.argv.slice(2));
const input = argv.in || argv.i || 'redirects/redirects.csv';
const out = argv.out || argv.o || 'redirects/verify_results.csv';
const sampleSize = parseInt(argv.sample || argv.s || '20', 10);

async function fetchWithTimeout(url, timeout = 15000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, { method: 'GET', redirect: 'manual', signal: controller.signal });
    clearTimeout(id);
    return res;
  } catch (e) {
    clearTimeout(id);
    throw e;
  }
}

(async () => {
  if (!fs.existsSync(input)) {
    console.error('Input file not found:', input);
    process.exit(1);
  }

  const raw = fs.readFileSync(input, 'utf8');
  const lines = raw.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const entries = [];
  for (const line of lines) {
    if (line.startsWith('#')) continue;
    // CSV line: old_url,new_url,notes
    const parts = line.split(',');
    if (parts.length < 2) continue;
    const oldUrl = parts[0].trim();
    const newUrl = parts[1].trim();
    // Skip wildcard placeholders
    if (oldUrl.includes('{') || newUrl.includes('{')) continue;
    entries.push({ oldUrl, newUrl, raw: line });
  }

  if (entries.length === 0) {
    console.log('No concrete entries to verify.');
    process.exit(0);
  }

  // sample
  const shuffled = entries.sort(() => 0.5 - Math.random());
  const sample = shuffled.slice(0, Math.min(sampleSize, entries.length));

  console.log(`Verifying ${sample.length} redirects (from ${entries.length} total entries)...`);

  const results = [];
  for (const e of sample) {
    const { oldUrl, newUrl } = e;
    console.log('\nChecking:', oldUrl);
    try {
      const res = await fetchWithTimeout(oldUrl, 15000);
      const status = res.status;
      const location = res.headers.get('location') || '';
      const ok = (status >= 300 && status < 400 && location && (location === newUrl || location.includes(new URL(newUrl).hostname))) || (status >= 200 && status < 300 && oldUrl === newUrl);
      console.log(`Status: ${status} Location: ${location} OK: ${ok}`);
      results.push({ oldUrl, newUrl, status, location, ok });
    } catch (err) {
      console.warn('Error:', err.message);
      results.push({ oldUrl, newUrl, status: 'ERROR', location: '', ok: false, error: err.message });
    }
  }

  // write CSV
  const outPath = path.resolve(out);
  const header = 'old_url,new_url,status,location,ok,error\n';
  const rows = results.map(r => {
    return `${r.oldUrl.replace(/,/g,'')},${r.newUrl.replace(/,/g,'')},${r.status},"${(r.location||'').replace(/"/g,'""')}",${r.ok},"${(r.error||'').replace(/"/g,'""')}"\n`;
  }).join('');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, header + rows, 'utf8');
  console.log(`\nWrote results to ${outPath}`);
})();
