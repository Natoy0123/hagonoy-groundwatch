import { chromium } from 'playwright';

async function testDialogs() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  // 1. Test Geological Dossier Dialog
  const dossierBtn = await page.$('button:has-text("View Sector Geological Dossier")');
  let dossierPassed = false;
  if (dossierBtn) {
    await dossierBtn.click();
    await page.waitForTimeout(300);
    const dossierTitle = await page.innerText('text=Geological Dossier: Brgy. Pugad');
    dossierPassed = !!dossierTitle;
    const closeBtn = await page.$('button:has-text("Close Dossier")');
    if (closeBtn) await closeBtn.click();
  }
  console.log("DOSSIER DIALOG:", dossierPassed ? "PASSED" : "FAILED");

  // 2. Test Community Report Confirmation & Receipt Flow
  let submitFlowPassed = false;
  const textarea = await page.$('textarea');
  if (textarea) {
    await textarea.fill('Playwright test observation: high tide at 10 AM.');
    const submitBtn = await page.$('button:has-text("Submit Field Report")');
    if (submitBtn) {
      await submitBtn.click();
      await page.waitForTimeout(300);
      const confirmDialog = await page.$('text=Confirm Observation Submission');
      if (confirmDialog) {
        const confirmBtn = await page.$('button:has-text("Confirm & Log Report")');
        if (confirmBtn) {
          await confirmBtn.click();
          await page.waitForTimeout(400);
          const receiptDialog = await page.$('text=Field Telemetry Successfully Logged');
          submitFlowPassed = !!receiptDialog;
          const closeReceipt = await page.$('button:has-text("Close & View in Live Register")');
          if (closeReceipt) await closeReceipt.click();
        }
      }
    }
  }
  console.log("CONFIRMATION & RECEIPT DIALOG FLOW:", submitFlowPassed ? "PASSED" : "FAILED");

  await browser.close();
}

testDialogs().catch(console.error);
