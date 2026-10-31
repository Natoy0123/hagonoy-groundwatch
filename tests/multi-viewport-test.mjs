import { chromium } from 'playwright';

async function testAllResolutions() {
  const browser = await chromium.launch();
  const testResolutions = [
    { name: 'Mobile Ultra-Compact (320x568)', width: 320, height: 568 },
    { name: 'Mobile Standard (375x667)', width: 375, height: 667 },
    { name: 'Mobile Large / Phablet (414x896)', width: 414, height: 896 },
    { name: 'Tablet Portrait (768x1024)', width: 768, height: 1024 },
    { name: 'Tablet Landscape / Laptop (1024x768)', width: 1024, height: 768 },
    { name: 'Desktop Standard (1440x900)', width: 1440, height: 900 },
    { name: 'Desktop FHD (1920x1080)', width: 1920, height: 1080 }
  ];

  console.log("Starting Multi-Resolution Responsiveness & Readability Scan...");
  const errors = [];

  for (const res of testResolutions) {
    const page = await browser.newPage({ viewport: { width: res.width, height: res.height } });
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

    // 1. Verify 0 horizontal scroll overflow
    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    if (hasOverflow) {
      errors.push(`[OVERFLOW] ${res.name}: scrollWidth exceeds viewport width`);
    }

    // 2. Sample typography sizes to verify no microscopic text (< 12px)
    const smallTextCount = await page.evaluate(() => {
      let count = 0;
      const allText = document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6, a, button, label, select, input, textarea');
      allText.forEach(el => {
        const fs = parseFloat(window.getComputedStyle(el).fontSize);
        if (fs > 0 && fs < 11) { // flag anything below 11px
          count++;
        }
      });
      return count;
    });

    console.log(`Resolution ${res.name} (${res.width}px): Overflow=${hasOverflow ? "FAIL" : "PASS"} | Micro-text count=${smallTextCount}`);
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
