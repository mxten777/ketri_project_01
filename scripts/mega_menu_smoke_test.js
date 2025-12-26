#!/usr/bin/env node
// Smoke test for Phase-2 Mega Menu using curl.exe on Windows
// Usage: BASE_URL=http://localhost:3004 node scripts/mega_menu_smoke_test.js

const { spawnSync } = require('child_process');

// Prefer environment BASE_URL, otherwise use provided arg, otherwise default to localhost:3004
const argBase = process.argv[2];
const BASE = process.env.BASE_URL || argBase || 'http://localhost:3004';

const targets = ['/', '/about/greeting'];

function runCurl(url) {
  // Use platform-appropriate null device
  const nullDev = process.platform === 'win32' ? 'NUL' : '/dev/null';
  const args = ['-sS', '-o', nullDev, '-w', '%{http_code}', url];
  const res = spawnSync('curl.exe', args, { encoding: 'utf8' });
  // If curl.exe not found, try curl (some systems)
  if (res.error && res.error.code === 'ENOENT') {
    const alt = spawnSync('curl', args, { encoding: 'utf8' });
    return { result: alt, used: 'curl' };
  }
  return { result: res, used: 'curl.exe' };
}

console.log(`Running mega menu smoke test against ${BASE}`);

let failed = false;

for (const path of targets) {
  const url = new URL(path, BASE).toString();
  const { result, used } = runCurl(url);
  const curlExit = result.status != null ? result.status : (result.error ? result.error.code : '??');
  const stdout = (result.stdout || '').toString().trim();
  const stderr = (result.stderr || '').toString().trim();
  const statusCode = parseInt(stdout, 10) || 0;

  if (result.error) {
    console.error(`${url} -> ERROR running ${used}: ${result.error.message}`);
    console.error(`curl exit: ${curlExit} status: ${stdout || 'none'} stderr: ${stderr}`);
    failed = true;
    continue;
  }

  // Print outcome
  console.log(`${url} -> HTTP ${statusCode} (curl exit ${curlExit})`);

  if (curlExit !== 0 || statusCode < 200 || statusCode > 399) {
    console.error(`ERROR: ${url} failed (curl exit ${curlExit}, status ${statusCode})`);
    failed = true;
  }
}

if (failed) {
  console.error('\nSMOKE TEST FAILED');
  process.exit(2);
}

console.log('\nSMOKE TEST PASSED');
process.exit(0);
