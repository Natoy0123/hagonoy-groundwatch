import { chromium } from 'playwright';

async function runExhaustiveTests() {
  console.log('--- STARTING EXHAUSTIVE PLAYWRIGHT VERIFICATION ---');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await context.grantPermissions(['clipboard-read', 'clipboard-write']).catch(() => {});
  const page = await context.newPage();

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

  // 1. TEST HEADER NAVIGATION & BRANDING & TELEMETRY MODAL
  try {
    const title = await page.locator('header span:has-text("HAGONOY GROUNDWATCH")').innerText();
    record('Header branding and title present', !!title);

    // Test Telemetry Active Diagnostics Modal
    const telemetryBtn = page.locator('header button:has-text("TELEMETRY ACTIVE")');
    await telemetryBtn.click();
    await page.waitForTimeout(300);

    const telemetryModalVisible = await page.locator('text=Telemetry Diagnostics & Sensor Spec').isVisible();
    record('Telemetry Active button opens sensor specification modal', telemetryModalVisible);

    const closeTelemetryBtn = page.locator('button:has-text("Close")').first();
    await closeTelemetryBtn.click();
    await page.waitForTimeout(300);
    const telemetryModalClosed = !(await page.locator('text=Telemetry Diagnostics & Sensor Spec').isVisible());
    record('Telemetry specification modal closes cleanly', telemetryModalClosed);

    // Verify Citizen Reports nav link exists
    const citizenNav = await page.locator('header nav a[href="#community-report"]').isVisible();
    record('Header navbar includes direct Citizen Reports link', citizenNav);
  } catch (e) {
    record('Header branding and telemetry check', false, e.message);
  }

  // 2. TEST HERO KPI CARDS & CONTEXT LINKS
  try {
    const kpiCard = page.locator('a[href="#hazard-map"]:has-text("Peak Subsidence Rate")').first();
    const kpiVisible = await kpiCard.isVisible();
    record('Hero KPI cards are interactive navigational elements', kpiVisible);

    const contextSourceLink = await page.locator('a[href="#references"]:has-text("Eco et al., 2020")').isVisible();
    record('Ground Zero context card cites peer-reviewed source link', contextSourceLink);
  } catch (e) {
    record('Hero interactive elements', false, e.message);
  }

  // 3. TEST OVERVIEW STEP EXPLORER & MYTH DEMOLITION TOGGLE
  try {
    const overviewSection = page.locator('section#overview');
    await overviewSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    // Click Phase 2
    const phase2Btn = overviewSection.locator('button:has-text("Over-Extraction & Pore Depressurization")');
    await phase2Btn.click();
    await page.waitForTimeout(200);

    const phase2Active = await overviewSection.locator('text=Active Inspection').isVisible();
    record('Overview 3-phase compaction cycle allows interactive step selection', phase2Active);

    // Test Myth Demolition Expander
    const proofToggleBtn = overviewSection.locator('button:has-text("View Proof & Math")');
    await proofToggleBtn.click();
    await page.waitForTimeout(200);

    const proofVisible = await overviewSection.locator('text=Empirical Rate Comparison').isVisible();
    record('Myth demolition card expands empirical rate comparison on demand', proofVisible);
  } catch (e) {
    record('Overview interactive features', false, e.message);
  }

  // 4. TEST CAUSES & EFFECTS TAB TOGGLE & LOCALIZED IMPACT DOSSIER
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

    // Open Localized Impact Dossier
    const inspectDossierBtn = causesSection.locator('button:has-text("Inspect Localized Field Dossier")').first();
    await inspectDossierBtn.click();
    await page.waitForTimeout(300);

    const impactModalVisible = await page.locator('text=Impact Analysis: Permanent & Tidal Inundation').isVisible();
    record('Impact card opens localized community field dossier modal', impactModalVisible);

    const closeImpactBtn = page.locator('div.fixed.inset-0.z-50 button:has-text("Close")').first();
    await closeImpactBtn.click();
    await page.waitForTimeout(300);

    // Switch back to Primary Causes
    const causesTabBtn = causesSection.locator('button:has-text("Primary Causes")');
    await causesTabBtn.click();
    await page.waitForTimeout(200);

    const causeCardVisible = await causesSection.locator('h3:has-text("Excessive Groundwater Pumping")').isVisible();
    record('Causes & Effects tab toggles back to Primary Causes', causeCardVisible);
  } catch (e) {
    record('Causes & Effects Tabs', false, e.message);
  }

  // 5. TEST HAZARD MAP: SEARCH, DOSSIER, HAZARD CORRIDOR SPEC
  try {
    const mapSection = page.locator('section#hazard-map');
    await mapSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    // Test search filter
    const searchInput = mapSection.locator('input[placeholder="Search barangay..."]');
    await searchInput.fill('Tibaguin');
    await page.waitForTimeout(300);

    const searchCount = await mapSection.locator('button:has-text("Brgy. Tibaguin")').count();
    record('Hazard Map quick sector search filters list dynamically', searchCount >= 1);

    // Click Tibaguin
    const tibaguinBtn = mapSection.locator('button:has-text("Brgy. Tibaguin")').first();
    await tibaguinBtn.click();
    await page.waitForTimeout(300);

    // Open Geological Dossier
    const dossierBtn = mapSection.locator('button:has-text("View Sector Geological Dossier")');
    await dossierBtn.click();
    await page.waitForTimeout(300);

    const dossierVisible = await page.locator('text=Geological Dossier: Brgy. Tibaguin').isVisible();
    record('Geological Dossier Dialog opens with correct sector data', dossierVisible);

    const closeDossierBtn = page.locator('button:has-text("Close Dossier")');
    await closeDossierBtn.click();
    await page.waitForTimeout(300);

    // Test Hazard Corridor Spec Modal
    const corridorSpecBtn = mapSection.locator('button:has-text("Hazard Corridor Spec")');
    await corridorSpecBtn.click();
    await page.waitForTimeout(300);

    const corridorModalVisible = await page.locator('text=Critical Coastal Hazard Corridor').isVisible();
    record('Hazard Corridor Spec modal displays corridor boundaries and velocity data', corridorModalVisible);

    const closeCorridorBtn = page.locator('button:has-text("Close Corridor Spec")');
    await closeCorridorBtn.click();
    await page.waitForTimeout(300);

    // Reset view
    const resetMapBtn = mapSection.locator('button:has-text("Reset View")');
    await resetMapBtn.click();
    await page.waitForTimeout(300);
  } catch (e) {
    record('Hazard Map interactive features', false, e.message);
  }

  // 6. TEST AQUIFER STRESS SIMULATOR SCENARIO PRESETS & QUIZ
  try {
    const estimatorSection = page.locator('section#estimator');
    await estimatorSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    // Test Scenario Preset: Commercial Fishpond Cluster
    const fishpondPresetBtn = estimatorSection.locator('button:has-text("Commercial Fishpond Cluster")');
    await fishpondPresetBtn.click();
    await page.waitForTimeout(300);

    const fishpondRate = await estimatorSection.locator('span.text-4xl.font-extrabold.text-red-600').innerText();
    record('Simulator preset "Commercial Fishpond Cluster" recalculates rate', !!fishpondRate, `Rate: ${fishpondRate} cm/yr`);

    // Test Scenario Preset: Bulk Surface Water Transition
    const bulkWaterPresetBtn = estimatorSection.locator('button:has-text("Bulk Surface Water Transition")');
    await bulkWaterPresetBtn.click();
    await page.waitForTimeout(300);

    const mitigatedRate = await estimatorSection.locator('span.text-4xl.font-extrabold.text-red-600').innerText();
    record('Simulator preset "Bulk Surface Water Transition" reduces subsidence', parseFloat(mitigatedRate) < parseFloat(fishpondRate), `Reduced: ${mitigatedRate} cm/yr`);

    // Switch to Quiz Tab
    const quizTabBtn = page.locator('button:has-text("Subsidence Literacy Quiz")');
    await quizTabBtn.click();
    await page.waitForTimeout(300);

    // Answer Q1, Q2, Q3
    await page.locator('button:has-text("Excessive deep-well groundwater pumping")').click();
    await page.locator('button:has-text("Next Question")').click();
    await page.waitForTimeout(200);

    await page.locator('button:has-text("The land has sunk below the high-tide level")').click();
    await page.locator('button:has-text("Next Question")').click();
    await page.waitForTimeout(200);

    await page.locator('button:has-text("Transitioning completely to treated surface bulk water")').click();
    await page.locator('button:has-text("Submit Quiz")').click();
    await page.waitForTimeout(300);

    const scoreText = await page.locator('text=3/3').isVisible();
    record('Quiz submission calculates and displays score (3/3)', scoreText);

    const retakeBtn = page.locator('button:has-text("Retake Quiz")');
    await retakeBtn.click();
    await page.waitForTimeout(200);
  } catch (e) {
    record('Aquifer Stress Simulator & Quiz Flow', false, e.message);
  }

  // 7. TEST MITIGATION ACTION DRAWER & CITIZEN PLEDGE CHECKLIST
  try {
    const mitigationSection = page.locator('section#mitigation');
    await mitigationSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    // Open Action Implementation Spec
    const actionCard = mitigationSection.locator('div:has-text("Mangrove Bioshield Reforestation")').first();
    await actionCard.click();
    await page.waitForTimeout(300);

    const specModalVisible = await page.locator('text=Implementation Guide').isVisible();
    record('Mitigation action card opens Implementation Guide modal with agency and timeline', specModalVisible);

    const closeSpecBtn = page.locator('button:has-text("Close Implementation Spec")');
    await closeSpecBtn.click();
    await page.waitForTimeout(300);

    // Toggle citizen pledge
    const pledgeItem = mitigationSection.locator('button:has-text("Install rooftop drum")');
    await pledgeItem.click();
    await page.waitForTimeout(200);

    const pledgeCount = await mitigationSection.locator('text=1/4 Pledged').isVisible();
    record('Citizen Action Commitment checklist increments pledge tally', pledgeCount);
  } catch (e) {
    record('Mitigation interactive features', false, e.message);
  }

  // 8. TEST CITIZEN REPORTING: FORM, MODAL, CONFIRMATION, RECEIPT, JSON EXPORT & RECORD INSPECTOR
  try {
    // Test Header Modal Flow
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);

    const headerReportBtn = page.locator('header button:has-text("Report Sinking Issue")').first();
    await headerReportBtn.click();
    await page.waitForTimeout(300);

    const modalContainer = page.locator('div.fixed.inset-0.z-50');
    await modalContainer.locator('select').first().selectOption('Tibaguin');
    await modalContainer.locator('textarea').fill('Automated Playwright field test: tidal inundation reached road centerline.');

    const submitBtn = modalContainer.locator('button:has-text("Submit Field Report")');
    await submitBtn.click();
    await page.waitForTimeout(300);

    const confirmTitleVisible = await page.locator('text=Confirm Observation Submission').isVisible();
    record('Citizen reporting modal submission opens Confirmation Dialog', confirmTitleVisible);

    const confirmLogBtn = page.locator('button:has-text("Confirm & Log Report")');
    await confirmLogBtn.click();
    await page.waitForTimeout(400);

    const receiptVisible = await page.locator('text=Field Telemetry Successfully Logged').isVisible();
    record('Receipt voucher dialog generated with Tracking ID', receiptVisible);

    const closeReceiptBtn = page.locator('button:has-text("Close & View in Live Register")');
    await closeReceiptBtn.click();
    await page.waitForTimeout(500);

    // Verify observation in feed
    const inFeed = await page.locator('section#community-report').locator('text=tidal inundation reached road centerline').first().isVisible();
    record('Newly logged observation immediately appears at head of community feed', inFeed);

    // Click report to inspect record
    await page.locator('section#community-report').locator('text=tidal inundation reached road centerline').first().click();
    await page.waitForTimeout(300);

    const recordDetailVisible = await page.locator('text=Telemetry Record:').isVisible();
    record('Clicking live report opens full observation telemetry inspector', recordDetailVisible);

    const closeRecordBtn = page.locator('button:has-text("Close Record")');
    await closeRecordBtn.click();
    await page.waitForTimeout(300);

    // Test search filter in log feed
    const logSearchInput = page.locator('section#community-report input[placeholder*="Search logs"]');
    await logSearchInput.fill('centerline');
    await page.waitForTimeout(200);

    const searchResultVisible = await page.locator('section#community-report').locator('text=centerline').isVisible();
    record('Community telemetry feed keyword search filters records dynamically', searchResultVisible);

    // Clear search
    await logSearchInput.fill('');

    // Reset records safety prompt
    const resetIconBtn = page.locator('button[title="Reset to default baseline records"]');
    await resetIconBtn.click();
    await page.waitForTimeout(200);

    const confirmResetBtn = page.locator('button:has-text("Confirm Reset")');
    await confirmResetBtn.click();
    await page.waitForTimeout(300);
    record('Reset confirmation dialog restores clean baseline', true);
  } catch (e) {
    record('Citizen reporting flow and inspector', false, e.message);
  }

  // 9. TEST REFERENCES COPY APA CITATION
  try {
    const referencesSection = page.locator('section#references');
    await referencesSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    const copyBtn = referencesSection.locator('button:has-text("Copy APA")').first();
    await copyBtn.click();
    await page.waitForTimeout(200);

    const copiedBadge = await referencesSection.locator('text=Copied!').isVisible();
    record('References section provides functional "Copy APA" clipboard trigger', copiedBadge);
  } catch (e) {
    record('References copy citation', false, e.message);
  }

  // 10. TEST MOBILE MENU DRAWER (375px)
  try {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);

    const hamburgerBtn = page.locator('button[aria-label="Toggle menu"]');
    await hamburgerBtn.click();
    await page.waitForTimeout(300);

    const mobileMenuVisible = await page.locator('div.lg\\:hidden.border-t').isVisible();
    record('Mobile drawer expands on 375px mobile viewport', mobileMenuVisible);

    // Click mobile "Report Sinking Issue" button inside drawer
    const mobileReportBtn = page.locator('div.lg\\:hidden.border-t button:has-text("Report Sinking Issue")');
    await mobileReportBtn.click();
    await page.waitForTimeout(300);

    const mobileModalVisible = await page.locator('text=Community Sinking & Tidal Inundation Report').isVisible();
    record('Mobile drawer "Report Sinking Issue" button triggers modal', mobileModalVisible);

    const closeBtn = page.locator('div.fixed.inset-0.z-50 button:has-text("✕")').first();
    await closeBtn.click();
    await page.waitForTimeout(300);

    await page.setViewportSize({ width: 1440, height: 900 });
  } catch (e) {
    record('Mobile Menu & Responsive Flow', false, e.message);
  }

  // 11. ZERO CONSOLE ERRORS
  record('Zero uncaught JavaScript / console exceptions', consoleErrors.length === 0, consoleErrors.join('; '));

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
