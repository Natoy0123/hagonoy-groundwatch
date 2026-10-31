import { chromium } from 'playwright';

async function runExhaustiveTests() {
  console.log('--- STARTING EXHAUSTIVE PLAYWRIGHT VERIFICATION ---');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', (err) => {
    consoleErrors.push(err.message);
  });

  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  console.log('✓ Page loaded successfully.');

  const results = [];

  function record(name, passed, detail = '') {
    results.push({ name, passed, detail });
    console.log(`[${passed ? 'PASS' : 'FAIL'}] ${name}${detail ? ` - ${detail}` : ''}`);
  }

  // 1. TEST HEADER NAVIGATION & BRANDING
  try {
    const title = await page.locator('header span:has-text("HAGONOY GROUNDWATCH")').innerText();
    record('Header branding and title present', !!title);

    const telemetryStrip = await page.locator('text=TELEMETRY ACTIVE').innerText();
    record('Telemetry active status bar rendered', !!telemetryStrip);
  } catch (e) {
    record('Header branding check', false, e.message);
  }

  // 2. TEST HAZARD MAP SECTOR GEOLOGICAL DOSSIER DIALOG
  try {
    const mapSection = page.locator('section#hazard-map');
    await mapSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    // Select Brgy. Tibaguin in quick selector
    const tibaguinBtn = mapSection.locator('button:has-text("Brgy. Tibaguin")').first();
    await tibaguinBtn.click();
    await page.waitForTimeout(300);

    const dossierBtn = mapSection.locator('button:has-text("View Sector Geological Dossier")');
    await dossierBtn.click();
    await page.waitForTimeout(300);

    const dossierVisible = await page.locator('text=Geological Dossier: Brgy. Tibaguin').isVisible();
    record('Geological Dossier Dialog opens with correct sector data', dossierVisible);

    // Close dossier
    const closeDossierBtn = page.locator('button:has-text("Close Dossier")');
    await closeDossierBtn.click();
    await page.waitForTimeout(300);
    const dossierClosed = !(await page.locator('text=Geological Dossier: Brgy. Tibaguin').isVisible());
    record('Geological Dossier Dialog closes cleanly', dossierClosed);
  } catch (e) {
    record('Geological Dossier Dialog', false, e.message);
  }

  // 3. TEST HEADER MODAL: "Report Sinking Issue" -> FORM -> CONFIRMATION DIALOG -> RECEIPT DIALOG -> FEED UPDATE
  try {
    // Scroll to top
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);

    // Click header button
    const headerReportBtn = page.locator('header button:has-text("Report Sinking Issue")').first();
    await headerReportBtn.click();
    await page.waitForTimeout(300);

    const modalTitleVisible = await page.locator('text=Community Sinking & Tidal Inundation Report').isVisible();
    record('Header "Report Sinking Issue" button opens modal', modalTitleVisible);

    // Fill form inside modal
    const modalContainer = page.locator('div.fixed.inset-0.z-50');
    await modalContainer.locator('select').first().selectOption('Tibaguin');
    await modalContainer.locator('textarea').fill('Test observation from header modal: high tide flood reached doorway.');

    // Click submit in modal
    const submitBtn = modalContainer.locator('button:has-text("Submit Field Report")');
    await submitBtn.click();
    await page.waitForTimeout(300);

    // Verify Confirmation Dialog appears OVER modal
    const confirmTitleVisible = await page.locator('text=Confirm Observation Submission').isVisible();
    record('Confirmation Dialog appears on modal submission', confirmTitleVisible);

    const confirmSector = await page.locator('text=Brgy. Tibaguin').first().isVisible();
    record('Confirmation Dialog accurately reflects selected sector', confirmSector);

    // Test Back to Edit
    const backBtn = page.locator('button:has-text("Back to Edit")');
    await backBtn.click();
    await page.waitForTimeout(300);
    const confirmClosed = !(await page.locator('text=Confirm Observation Submission').isVisible());
    const textPreserved = (await modalContainer.locator('textarea').inputValue()).includes('Test observation from header modal');
    record('Confirmation Dialog "Back to Edit" returns to form and preserves input', confirmClosed && textPreserved);

    // Submit again and confirm
    await submitBtn.click();
    await page.waitForTimeout(300);
    const confirmSubmitBtn = page.locator('button:has-text("Confirm & Log Report")');
    await confirmSubmitBtn.click();
    await page.waitForTimeout(400);

    // Verify Receipt Dialog appears
    const receiptVisible = await page.locator('text=Field Telemetry Successfully Logged').isVisible();
    record('Receipt Dialog appears after confirming report', receiptVisible);

    const refCodeVisible = await page.locator('text=Telemetry Reference ID').isVisible();
    record('Receipt Dialog displays generated Telemetry Reference ID', refCodeVisible);

    // Close Receipt Dialog
    const closeReceiptBtn = page.locator('button:has-text("Close & View in Live Register")');
    await closeReceiptBtn.click();
    await page.waitForTimeout(500);

    // Verify Modal is now closed
    const modalClosed = !(await page.locator('text=Community Sinking & Tidal Inundation Report').isVisible());
    record('Modal closes after completing receipt flow', modalClosed);

    // Verify newly logged report is now visible in the live feed
    const feedHasNewReport = await page.locator('section#community-report').locator('text=Test observation from header modal').first().isVisible();
    record('Live Community Feed immediately displays the newly submitted observation', feedHasNewReport);
  } catch (e) {
    record('Header Modal & Confirmation Flow', false, e.message);
  }

  // 4. TEST HERO BUTTON: "Log Sinking / Flood Incident"
  try {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);

    const heroReportBtn = page.locator('button:has-text("Log Sinking / Flood Incident")').first();
    await heroReportBtn.click();
    await page.waitForTimeout(300);

    const heroModalVisible = await page.locator('text=Community Sinking & Tidal Inundation Report').isVisible();
    record('Hero "Log Sinking / Flood Incident" button opens modal', heroModalVisible);

    // Close with '✕' button
    const closeXBtn = page.locator('div.fixed.inset-0.z-50 button:has-text("✕")').first();
    await closeXBtn.click();
    await page.waitForTimeout(300);
    const heroModalClosed = !(await page.locator('text=Community Sinking & Tidal Inundation Report').isVisible());
    record('Modal closes when clicking "✕" button', heroModalClosed);
  } catch (e) {
    record('Hero Report Button', false, e.message);
  }

  // 5. TEST IN-PAGE REPORTING FORM & VALIDATION
  try {
    const inPageSection = page.locator('section#community-report');
    await inPageSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    // Test empty submission validation
    const inPageTextarea = inPageSection.locator('textarea');
    await inPageTextarea.fill('   ');
    const inPageSubmitBtn = inPageSection.locator('button:has-text("Submit Field Report")');
    await inPageSubmitBtn.click();
    await page.waitForTimeout(200);

    const validationAlert = await inPageSection.locator('text=Please enter a description of the observed sinking or flood incident.').isVisible();
    record('Validation warning displayed on empty/whitespace submission', validationAlert);

    // Now fill valid data in-page
    await inPageTextarea.fill('In-page direct submission test: crack observed on seawall foundation.');
    await inPageSubmitBtn.click();
    await page.waitForTimeout(300);

    const inPageConfirmVisible = await page.locator('text=Confirm Observation Submission').isVisible();
    record('In-page submission triggers Confirmation Dialog', inPageConfirmVisible);

    const confirmLogBtn = page.locator('button:has-text("Confirm & Log Report")');
    await confirmLogBtn.click();
    await page.waitForTimeout(400);

    const inPageReceiptVisible = await page.locator('text=Field Telemetry Successfully Logged').isVisible();
    record('In-page flow displays Receipt Dialog', inPageReceiptVisible);

    const inPageCloseReceipt = page.locator('button:has-text("Close & View in Live Register")');
    await inPageCloseReceipt.click();
    await page.waitForTimeout(400);

    const inPageReportInFeed = await page.locator('section#community-report').locator('text=In-page direct submission test').first().isVisible();
    record('In-page observation is rendered in the live feed', inPageReportInFeed);
  } catch (e) {
    record('In-page reporting & validation flow', false, e.message);
  }

  // 6. TEST RESET CONFIRMATION DIALOG
  try {
    const resetIconBtn = page.locator('button[title="Reset to default baseline records"]');
    await resetIconBtn.click();
    await page.waitForTimeout(300);

    const resetDialogVisible = await page.locator('text=Reset Telemetry Records?').isVisible();
    record('Reset Confirmation Dialog opens upon clicking reset button', resetDialogVisible);

    // Cancel reset
    const cancelResetBtn = page.locator('button:has-text("Cancel")');
    await cancelResetBtn.click();
    await page.waitForTimeout(300);
    const resetDialogClosed = !(await page.locator('text=Reset Telemetry Records?').isVisible());
    record('Reset Confirmation Dialog cancels without resetting data', resetDialogClosed);

    // Open again and confirm reset
    await resetIconBtn.click();
    await page.waitForTimeout(200);
    const confirmResetBtn = page.locator('button:has-text("Confirm Reset")');
    await confirmResetBtn.click();
    await page.waitForTimeout(300);

    // Count should be 3 (baseline count)
    const countBadge = await page.locator('section#community-report span.bg-cyan-50').innerText();
    record('Confirming reset restores baseline record count (3)', countBadge.trim() === '3', `Count: ${countBadge.trim()}`);
  } catch (e) {
    record('Reset Confirmation Dialog Flow', false, e.message);
  }

  // 7. TEST AQUIFER STRESS SIMULATOR & QUIZ
  try {
    const estimatorSection = page.locator('section#estimator');
    await estimatorSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    // Check Simulator outputs
    const calcRate = await estimatorSection.locator('span.text-4xl.font-extrabold.text-red-600').innerText();
    record('Simulator calculated annual subsidence rate rendered', !!calcRate, `Rate: ${calcRate} cm/yr`);

    // Switch to Quiz Tab
    const quizTabBtn = page.locator('button:has-text("Subsidence Literacy Quiz")');
    await quizTabBtn.click();
    await page.waitForTimeout(300);

    const quizVisible = await page.locator('text=Question 1 of 3').isVisible();
    record('Quiz Tab switches cleanly and displays Question 1', quizVisible);

    // Answer Q1
    await page.locator('button:has-text("Excessive deep-well groundwater pumping")').click();
    await page.locator('button:has-text("Next Question")').click();
    await page.waitForTimeout(200);

    // Answer Q2
    await page.locator('button:has-text("The land has sunk below the high-tide level")').click();
    await page.locator('button:has-text("Next Question")').click();
    await page.waitForTimeout(200);

    // Answer Q3
    await page.locator('button:has-text("Transitioning completely to treated surface bulk water")').click();
    await page.locator('button:has-text("Submit Quiz")').click();
    await page.waitForTimeout(300);

    // Check Results
    const scoreText = await page.locator('text=3/3').isVisible();
    record('Quiz submission calculates and displays score (3/3)', scoreText);

    // Retake Quiz
    const retakeBtn = page.locator('button:has-text("Retake Quiz")');
    await retakeBtn.click();
    await page.waitForTimeout(200);
    const backToQ1 = await page.locator('text=Question 1 of 3').isVisible();
    record('Retake Quiz resets state back to Question 1', backToQ1);
  } catch (e) {
    record('Aquifer Stress Simulator & Quiz Flow', false, e.message);
  }

  // 8. TEST CAUSES & EFFECTS TAB TOGGLE
  try {
    const causesSection = page.locator('section#causes-effects');
    await causesSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    // Switch to Community Impact tab
    const effectsTabBtn = causesSection.locator('button:has-text("Community Impact")');
    await effectsTabBtn.click();
    await page.waitForTimeout(200);

    const effectCardVisible = await causesSection.locator('text=Permanent & Tidal Inundation').isVisible();
    record('Causes & Effects tab toggles to Community Impact', effectCardVisible);

    // Switch back to Primary Causes
    const causesTabBtn = causesSection.locator('button:has-text("Primary Causes")');
    await causesTabBtn.click();
    await page.waitForTimeout(200);

    const causeCardVisible = await causesSection.locator('h3:has-text("Excessive Groundwater Pumping")').isVisible();
    record('Causes & Effects tab toggles back to Primary Causes', causeCardVisible);
  } catch (e) {
    record('Causes & Effects Tabs', false, e.message);
  }

  // 9. TEST MOBILE MENU & RESPONSIVE DRAWER
  try {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);

    const hamburgerBtn = page.locator('button[aria-label="Toggle menu"]');
    await hamburgerBtn.click();
    await page.waitForTimeout(300);

    const mobileMenuVisible = await page.locator('div.lg\\:hidden.border-t').isVisible();
    record('Mobile hamburger menu expands correctly on 375px viewport', mobileMenuVisible);

    // Click mobile "Report Sinking Issue" button inside drawer
    const mobileReportBtn = page.locator('div.lg\\:hidden.border-t button:has-text("Report Sinking Issue")');
    await mobileReportBtn.click();
    await page.waitForTimeout(300);

    const mobileModalVisible = await page.locator('text=Community Sinking & Tidal Inundation Report').isVisible();
    record('Mobile drawer "Report Sinking Issue" button triggers modal', mobileModalVisible);

    // Close modal
    const closeBtn = page.locator('div.fixed.inset-0.z-50 button:has-text("✕")').first();
    await closeBtn.click();
    await page.waitForTimeout(300);

    // Reset viewport back to desktop
    await page.setViewportSize({ width: 1440, height: 900 });
  } catch (e) {
    record('Mobile Menu & Responsive Flow', false, e.message);
  }

  // 10. CONSOLE ERRORS CHECK
  record('Zero uncaught JavaScript / console errors detected', consoleErrors.length === 0, consoleErrors.join('; '));

  console.log('\n--- EXHAUSTIVE TEST RESULTS SUMMARY ---');
  let passCount = 0;
  let failCount = 0;
  for (const r of results) {
    if (r.passed) passCount++;
    else failCount++;
  }
  console.log(`TOTAL TESTS: ${results.length} | PASSED: ${passCount} | FAILED: ${failCount}`);

  await browser.close();

  if (failCount > 0) {
    process.exit(1);
  }
}

runExhaustiveTests().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
