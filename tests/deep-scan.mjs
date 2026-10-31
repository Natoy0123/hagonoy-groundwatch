import { chromium } from 'playwright';

async function deepScan() {
  const browser = await chromium.launch({ headless: true });
  const viewports = [
    { name: 'Mobile (375px)', width: 375, height: 667 },
    { name: 'Tablet (768px)', width: 768, height: 1024 },
    { name: 'Desktop (1440px)', width: 1440, height: 900 }
  ];

  const results = {
    overflows: [],
    brokenAnchors: [],
    unlabeledButtons: [],
    contrastWarnings: [],
    consoleLogs: []
  };

  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    
    page.on('console', msg => {
      if (msg.type() === 'error' || msg.type() === 'warning') {
        results.consoleLogs.push(`[${vp.name}] ${msg.type()}: ${msg.text()}`);
      }
    });

    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

    // Check horizontal overflow
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    if (hasHorizontalOverflow) {
      results.overflows.push(vp.name);
    }

    // Check all anchor links exist
    if (vp.name === 'Desktop (1440px)') {
      const links = await page.$$eval('a[href^="#"]', els => els.map(e => e.getAttribute('href')));
      for (const href of new Set(links)) {
        if (href === '#' || href === '#!') continue;
        const target = await page.$(href);
        if (!target) {
          results.brokenAnchors.push(href);
        }
      }

      // Check buttons without aria-label or visible text
      const badButtons = await page.$$eval('button', btns => {
        return btns
          .filter(b => !b.innerText.trim() && !b.getAttribute('aria-label') && !b.getAttribute('title'))
          .map(b => b.outerHTML.slice(0, 80));
      });
      results.unlabeledButtons.push(...badButtons);
    }

    await page.close();
  }

  await browser.close();
  console.log(JSON.stringify(results, null, 2));
}

deepScan().catch(err => {
  console.error("Deep scan failed:", err);
  process.exit(1);
});
