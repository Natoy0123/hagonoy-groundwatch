import { chromium } from 'playwright';

async function auditSite() {
  console.log("Starting Playwright audit on http://localhost:5173/ ...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const consoleErrors = [];
  const networkFailures = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('requestfailed', req => {
    networkFailures.push(`${req.method()} ${req.url()} - ${req.failure()?.errorText || 'Failed'}`);
  });

  page.on('response', res => {
    if (res.status() >= 400) {
      networkFailures.push(`HTTP ${res.status()} - ${res.url()}`);
    }
  });

  try {
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 15000 });
  } catch (e) {
    console.error("Navigation error:", e.message);
  }

  // 1. Audit Page Title and Meta
  const title = await page.title();
  console.log("PAGE TITLE:", title);

  // 2. Audit Sections Presence
  const sections = ['#overview', '#causes-effects', '#hazard-map', '#estimator', '#mitigation', '#community-report', '#references'];
  const missingSections = [];
  for (const s of sections) {
    const el = await page.$(s);
    if (!el) missingSections.push(s);
  }
  console.log("MISSING SECTIONS:", missingSections.length === 0 ? "None (All 7 Present)" : missingSections);

  // 3. Audit Leaflet Map
  const mapEl = await page.$('.leaflet-container');
  const markers = await page.$$('.custom-div-icon');
  const polygon = await page.$('.leaflet-overlay-pane path');
  console.log("MAP AUDIT:", {
    containerExists: !!mapEl,
    markerCount: markers.length,
    polygonExists: !!polygon
  });

  // 4. Test Barangay Selector Interaction
  let sectorNavTested = false;
  try {
    const brgyBtn = await page.$('button:has-text("Brgy. Tibaguin")');
    if (brgyBtn) {
      await brgyBtn.click();
      await page.waitForTimeout(500);
      const activeText = await page.innerText('text=Barangay Tibaguin');
      sectorNavTested = !!activeText;
    }
  } catch (e) {
    console.error("Sector nav error:", e.message);
  }
  console.log("SECTOR NAV INTERACTION:", sectorNavTested ? "PASSED" : "FAILED");

  // 5. Test Aquifer Simulator Interaction
  let simulatorTested = false;
  try {
    const slider = await page.$('input[type="range"]');
    if (slider) {
      await slider.fill('40');
      await page.waitForTimeout(300);
      simulatorTested = true;
    }
  } catch (e) {
    console.error("Simulator error:", e.message);
  }
  console.log("SIMULATOR INTERACTION:", simulatorTested ? "PASSED" : "FAILED");

  // 6. Test Quiz Interaction
  let quizTested = false;
  try {
    const quizTab = await page.$('button:has-text("Subsidence Literacy Quiz")');
    if (quizTab) {
      await quizTab.click();
      await page.waitForTimeout(300);
      const optionA = await page.$('button:has-text("A.")');
      if (optionA) {
        await optionA.click();
        quizTested = true;
      }
    }
  } catch (e) {
    console.error("Quiz error:", e.message);
  }
  console.log("QUIZ INTERACTION:", quizTested ? "PASSED" : "FAILED");

  // 7. Test Report Modal Trigger
  let modalTested = false;
  try {
    const reportBtn = await page.$('button:has-text("Report Sinking Issue")');
    if (reportBtn) {
      await reportBtn.click();
      await page.waitForTimeout(400);
      const modalHeader = await page.$('text=Community Sinking & Tidal Inundation Report');
      modalTested = !!modalHeader;
      // Close modal
      const closeBtn = await page.$('button:has-text("✕")');
      if (closeBtn) await closeBtn.click();
    }
  } catch (e) {
    console.error("Modal error:", e.message);
  }
  console.log("REPORT MODAL INTERACTION:", modalTested ? "PASSED" : "FAILED");

  // 8. Test GeoJSON File Availability
  let geojsonValid = false;
  try {
    const res = await page.request.get('http://localhost:5173/hagonoy-subsidence-map.geojson');
    geojsonValid = res.status() === 200;
  } catch (e) {
    console.error("GeoJSON error:", e.message);
  }
  console.log("GEOJSON ASSET ACCESSIBLE:", geojsonValid ? "HTTP 200 OK" : "FAILED");

  // 9. Take Fullpage Screenshot
  await page.screenshot({ path: 'audit-screenshot.png', fullPage: true });
  console.log("SCREENSHOT SAVED: audit-screenshot.png");

  console.log("CONSOLE ERRORS (" + consoleErrors.length + "):", consoleErrors);
  console.log("NETWORK FAILURES (" + networkFailures.length + "):", networkFailures);

  await browser.close();
}

auditSite().catch(err => {
  console.error("Fatal audit error:", err);
  process.exit(1);
});
