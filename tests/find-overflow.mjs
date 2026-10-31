import { chromium } from 'playwright';

async function findOverflow() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 768, height: 1024 } });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  const offenders = await page.evaluate(() => {
    const docWidth = window.innerWidth;
    const elements = document.querySelectorAll('*');
    const list = [];
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.right > docWidth + 1) {
        list.push({
          tag: el.tagName,
          id: el.id,
          className: el.className,
          right: rect.right,
          width: rect.width,
          outerHTML: el.outerHTML.slice(0, 100)
        });
      }
    });
    return list;
  });

  console.log("Offenders count:", offenders.length);
  console.log("Top offenders:", offenders.slice(0, 5));
  await browser.close();
}

findOverflow().catch(console.error);
