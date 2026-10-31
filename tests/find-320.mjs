import { chromium } from 'playwright';

async function find320Overflow() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 320, height: 568 } });
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
          className: el.className,
          right: rect.right,
          width: rect.width,
          outerHTML: el.outerHTML.slice(0, 100)
        });
      }
    });
    return list;
  });

  console.log("320px Offenders:", offenders);
  await browser.close();
}

find320Overflow().catch(console.error);
