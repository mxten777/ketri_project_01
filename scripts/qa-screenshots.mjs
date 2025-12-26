import { chromium } from 'playwright';
import fs from 'fs';

const BASE = process.env.BASE_URL || 'http://localhost:5173';
const OUT_DIR = 'qa';

async function ensureOut() {
  try {
    await fs.promises.mkdir(OUT_DIR, { recursive: true });
  } catch (e) {
    // ignore
  }
}

async function capture(page, name) {
  const p = `${OUT_DIR}/${name}`;
  await page.screenshot({ path: p, fullPage: false });
  console.log('Saved', p);
}

async function run() {
  await ensureOut();
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // 1) Home - top
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await capture(page, '01_home_top.png');

  // 1b) Home - scroll ~250px
  await page.evaluate(() => window.scrollTo(0, 250));
  await page.waitForTimeout(500);
  await capture(page, '02_home_scroll.png');

  // 2) Service - industrial-health (representative)
  await page.goto(`${BASE}/services/industrial-health`, { waitUntil: 'networkidle' });
  await capture(page, '03_service_anchor_before.png');
  // try clicking anchor in sidebar
  const anchor = await page.$('a[href="#service-process"]');
  if (anchor) {
    await anchor.click();
    await page.waitForTimeout(600);
  }
  await capture(page, '04_service_anchor_after.png');

  // 3) About greeting
  await page.goto(`${BASE}/about/greeting`, { waitUntil: 'networkidle' });
  await capture(page, '05_about_top.png');

  // 3b) Notice list
  await page.goto(`${BASE}/board/notice`, { waitUntil: 'networkidle' });
  await capture(page, '06_notice_top.png');

  // 3c) Inquiry (best-effort)
  try {
    await page.goto(`${BASE}/inquiry`, { waitUntil: 'networkidle' });
  } catch (e) {
    // ignore if not present
  }
  await capture(page, '07_inquiry_top.png');

  // 4) Hero-less page - try /terms
  try {
    await page.goto(`${BASE}/terms`, { waitUntil: 'networkidle' });
    await capture(page, '08_nohero_top.png');
  } catch (e) {
    console.log('Skipping terms capture - page may not exist');
  }

  await browser.close();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
