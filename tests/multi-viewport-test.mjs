import { chromium } from 'playwright';

async function testAllResolutions() {
  const browser = await chromium.launch();
  const testResolutions = [
    { name: 'Mobile Ultra-Compact (320x568)', width: 320, height: 568 },
    { name: 'Mobile Standard (375x667)', width: 375, height: 667 },
    { name: 'Mobile Large / Phablet (414x896)', width: 414, height: 896 },
    { name: 'Tablet Portrait (768x1024)', width: 768, height: 1024 },
    { name: 'Tablet Landscape / Netbook (1024x768)', width: 1024, height: 768 },
    { name: 'Desktop Standard (1440x900)', width: 1440, height: 900 },
    { name: 'Desktop Full HD (1920x1080)', width: 1920, height: 1080 }
  ];

  console.log("Testing universal responsive layout across 7 device viewports...");
  const errors = [];

  for (const res of testResolutions) {
    const page = await browser.newPage({ viewport: { width: res.width, height: res.height } });
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

    // 1. Verify 0 horizontal scroll overflow
    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    // 2. Check key layout elements are visible and properly placed
    const headerVisible = await page.isVisible('header');
    const heroVisible = await page.isVisible('h1');
    const mapVisible = await page.isVisible('.leaflet-container');

    console.log(`Resolution ${res.name} (${res.width}px): Overflow=${hasOverflow ? "FAIL" : "PASS"} | Header=${headerVisible} | Hero=${heroVisible} | Map=${mapVisible}`);

    if (hasOverflow) {
      errors.push(`[OVERFLOW] ${res.name}: scrollWidth exceeds viewport width`);
    }

    await page.close();
  }

  await browser.close();

  if (errors.length > 0) {
    console.error("FAILED RESOLUTION CHECKS:", errors);
    process.exit(1);
  } else {
    console.log("ALL 7 RESOLUTIONS PASSED WITH 0 OVERFLOWS!");
  }
}

testAllResolutions().catch(err => {
  console.error(err);
  process.exit(1);
});
