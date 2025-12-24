#!/usr/bin/env node
// Usage: node scripts/crawl_board.js --base https://www.kesri.co.kr --board /board/notice --out redirects/notice_urls.csv --max 50

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

async function crawlBoard({ base, boardPath, out, maxPages = 50 }) {
  const url = base.replace(/\/$/, '') + boardPath;
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36');

  const collected = new Set();

  for (let p = 1; p <= maxPages; p++) {
    const pageUrl = boardPath.includes('?') ? `${url}&page=${p}` : `${url}?page=${p}`;
    console.log(`Visiting ${pageUrl}`);
    try {
      await page.goto(pageUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    } catch (e) {
      console.warn(`Failed to load ${pageUrl}: ${e.message}`);
      break;
    }

    // Extract anchor hrefs that look like post links
    const links = await page.$$eval('a', anchors => anchors.map(a => a.href));
    let foundOnPage = 0;
    for (const l of links) {
      try {
        const u = new URL(l);
        if (/\/board\/(notice|qna|free|free-list)\/\d+/i.test(u.pathname)) {
          collected.add(u.href);
          foundOnPage++;
        }
      } catch (e) {
        // ignore
      }
    }

    console.log(`Found ${foundOnPage} post links on page ${p}. Total collected: ${collected.size}`);

    // Heuristic: stop if no post links found on this page
    if (foundOnPage === 0) {
      // try to detect "다음" pagination link and continue; if absent, break
      const nextExists = await page.$$eval('a', anchors => anchors.some(a => /다음|Next|>/i.test(a.textContent || '')));
      if (!nextExists) break;
    }
  }

  await browser.close();

  // Write CSV
  const outPath = path.resolve(out);
  const csv = Array.from(collected).map(u => `${u}\n`).join('');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, csv, 'utf8');
  console.log(`Wrote ${collected.size} URLs to ${outPath}`);
  return outPath;
}

// Simple CLI
(async () => {
  const argv = require('minimist')(process.argv.slice(2));
  const base = argv.base || argv.b || 'https://www.kesri.co.kr';
  const board = argv.board || argv.path || '/board/notice';
  const out = argv.out || argv.o || `redirects/${board.replace(/[^a-z0-9]/gi,'_')}_urls.csv`;
  const max = parseInt(argv.max || argv.m || '50', 10);
  try {
    await crawlBoard({ base, boardPath: board, out, maxPages: max });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
