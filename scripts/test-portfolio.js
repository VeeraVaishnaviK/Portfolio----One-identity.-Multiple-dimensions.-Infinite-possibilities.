const { chromium } = require('playwright');
const fs = require('fs');

async function testPortfolio() {
  console.log("Launching Chromium...");
  const browser = await chromium.launch({
    channel: 'msedge', // use system msedge or chrome
    headless: true
  });

  const consoleErrors = [];

  // 1. DESKTOP TEST: 1440 x 900
  console.log("Testing Desktop Viewport (1440x900)...");
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1
  });
  const desktopPage = await desktopContext.newPage();

  desktopPage.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(`[Desktop Console Error] ${msg.text()}`);
    }
  });

  await desktopPage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(1500);

  // Check overflow
  const desktopOverflow = await desktopPage.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      hasOverflow: document.documentElement.scrollWidth > window.innerWidth
    };
  });
  console.log("Desktop Overflow Check:", desktopOverflow);

  // Take screenshot
  await desktopPage.screenshot({ path: 'public/screenshot-desktop.png', fullPage: false });
  console.log("Saved public/screenshot-desktop.png");

  // 2. MOBILE TEST: 390 x 844
  console.log("Testing Mobile Viewport (390x844)...");
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true
  });
  const mobilePage = await mobileContext.newPage();

  mobilePage.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(`[Mobile Console Error] ${msg.text()}`);
    }
  });

  await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1500);

  // Check overflow
  const mobileOverflow = await mobilePage.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      hasOverflow: document.documentElement.scrollWidth > window.innerWidth
    };
  });
  console.log("Mobile Overflow Check:", mobileOverflow);

  // Take screenshot
  await mobilePage.screenshot({ path: 'public/screenshot-mobile.png', fullPage: false });
  console.log("Saved public/screenshot-mobile.png");

  // Test interactive elements on Desktop
  console.log("Testing interactive elements...");
  // Video element check
  const videoExists = await desktopPage.evaluate(() => {
    const v = document.querySelector('video');
    return v !== null && v.querySelectorAll('source').length >= 2;
  });
  console.log("Video element verified with 2 sources:", videoExists);

  // ID Card element check
  const idCardExists = await desktopPage.evaluate(() => {
    return document.querySelector('[aria-label*="developer ID card"]') !== null;
  });
  console.log("ID Card element verified:", idCardExists);

  // Skills Inspector check
  const inspectorExists = await desktopPage.evaluate(() => {
    return document.querySelector('#skills') !== null;
  });
  console.log("Skills section verified:", inspectorExists);

  // Work accordion check
  const workExists = await desktopPage.evaluate(() => {
    return document.querySelector('#work') !== null;
  });
  console.log("Work section verified:", workExists);

  // Achievements section check
  const achievementsExists = await desktopPage.evaluate(() => {
    return document.querySelector('#achievements') !== null;
  });
  console.log("Achievements section verified:", achievementsExists);

  console.log("Console errors detected:", consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.log("Errors:", consoleErrors);
  }

  await browser.close();

  const success = !desktopOverflow.hasOverflow && !mobileOverflow.hasOverflow && consoleErrors.length === 0;
  console.log("ALL QUALITY CHECKS PASSED:", success);
  process.exit(success ? 0 : 1);
}

testPortfolio().catch(err => {
  console.error("Test failed:", err);
  process.exit(1);
});
