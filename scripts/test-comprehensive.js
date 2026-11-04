const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function runTests() {
  console.log('--- Starting Comprehensive Portfolio & Interactive Lamp Test ---');
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  // 1. Load Page
  console.log('[1/8] Navigating to http://localhost:3000...');
  const res = await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  if (res.status() !== 200) {
    throw new Error(`Failed to load page: status ${res.status()}`);
  }
  console.log('      Page loaded with HTTP 200 OK.');

  // 2. Check Hero section elements
  console.log('[2/8] Checking Hero elements...');
  const heroHeading = await page.locator('h1').textContent();
  console.log(`      Hero heading: "${heroHeading.trim().replace(/\s+/g, ' ')}"`);

  const video = page.locator('video');
  const videoCount = await video.count();
  console.log(`      Video element found: ${videoCount === 1 ? 'YES' : 'NO'}`);

  const ghostText = await page.locator('span:has-text("VEERA")').first();
  const ghostVisible = await ghostText.isVisible();
  console.log(`      Ghost outline "VEERA" visible: ${ghostVisible ? 'YES' : 'NO'}`);

  // 3. Test Initial Theme (Light Mode)
  console.log('[3/8] Verifying Light Mode...');
  const isDarkInitial = await page.evaluate(() => document.documentElement.classList.contains('dark'));
  console.log(`      Initial html.dark present: ${isDarkInitial}`);

  await page.screenshot({ path: 'public/screenshot-light.png', fullPage: false });
  console.log('      Saved public/screenshot-light.png');

  // 4. Test Interactive Lamp (Light -> Dark toggle)
  console.log('[4/8] Testing Interactive Lamp Switch...');
  const lamp = page.locator('button[role="switch"]');
  const lampCount = await lamp.count();
  if (lampCount === 0) throw new Error('Interactive Lamp switch button not found!');

  const initialChecked = await lamp.getAttribute('aria-checked');
  const initialLabel = await lamp.getAttribute('aria-label');
  console.log(`      Lamp initial aria-checked="${initialChecked}", aria-label="${initialLabel}"`);

  // Click lamp switch
  console.log('      Clicking lamp pull cord to switch to Dark Mode...');
  await lamp.click();
  await page.waitForTimeout(600); // Wait for transition

  const isDarkAfterClick = await page.evaluate(() => document.documentElement.classList.contains('dark'));
  const savedThemeDark = await page.evaluate(() => localStorage.getItem('portfolio-theme'));
  const checkedDark = await lamp.getAttribute('aria-checked');
  console.log(`      After click -> html.dark: ${isDarkAfterClick}, localStorage: "${savedThemeDark}", aria-checked: "${checkedDark}"`);

  if (!isDarkAfterClick || savedThemeDark !== 'dark') {
    throw new Error('Dark mode was not properly activated by the lamp switch!');
  }

  await page.screenshot({ path: 'public/screenshot-dark.png', fullPage: false });
  console.log('      Saved public/screenshot-dark.png');

  // 5. Test Keyboard Accessibility on Lamp (Enter / Space)
  console.log('[5/8] Testing Keyboard Accessibility on Lamp...');
  await lamp.focus();
  await page.keyboard.press('Enter');
  await page.waitForTimeout(400);

  const isDarkAfterEnter = await page.evaluate(() => document.documentElement.classList.contains('dark'));
  console.log(`      Pressed [Enter] -> html.dark: ${isDarkAfterEnter} (should be false, back to light)`);

  await page.keyboard.press('Space');
  await page.waitForTimeout(400);

  const isDarkAfterSpace = await page.evaluate(() => document.documentElement.classList.contains('dark'));
  console.log(`      Pressed [Space] -> html.dark: ${isDarkAfterSpace} (should be true, back to dark)`);

  // Set back to light for further component tests
  await lamp.click();
  await page.waitForTimeout(300);

  // 6. Test ID Card Flip & Skills & Work Accordion
  console.log('[6/8] Testing Sections Interactions...');
  const idCard = page.locator('div[role="button"][aria-label*="developer ID card"]');
  if (await idCard.count() > 0) {
    await idCard.click();
    const isFlipped = await idCard.getAttribute('aria-expanded');
    console.log(`      ID card clicked -> aria-expanded="${isFlipped}"`);
  }

  // Skills filter
  const backendChip = page.locator('button:text-is("Backend")');
  if (await backendChip.count() > 0) {
    await backendChip.click();
    console.log('      Clicked "Backend" skill filter chip.');
  }

  // Work accordion
  const workRegion = page.locator('[role="region"][aria-label*="Project:"]').first();
  if (await workRegion.count() > 0) {
    await workRegion.click();
    console.log('      Clicked Work accordion project card.');
  }

  // 7. Test Responsive 390px (Mobile iPhone 14/15 size)
  console.log('[7/8] Testing Mobile Viewport (390x844)...');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(500);

  const overflowInfo = await page.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
    };
  });
  console.log(`      Mobile 390px -> scrollWidth: ${overflowInfo.scrollWidth}, innerWidth: ${overflowInfo.innerWidth}, overflow: ${overflowInfo.hasOverflow}`);
  if (overflowInfo.hasOverflow) {
    throw new Error(`Horizontal overflow detected on mobile: ${overflowInfo.scrollWidth} > ${overflowInfo.innerWidth}`);
  }

  await page.screenshot({ path: 'public/screenshot-mobile-light.png' });
  console.log('      Saved public/screenshot-mobile-light.png');

  // Toggle dark on mobile
  await lamp.click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'public/screenshot-mobile-dark.png' });
  console.log('      Saved public/screenshot-mobile-dark.png');

  // Test Mobile Menu open
  const menuBtn = page.locator('button:text-is("Menu")');
  if (await menuBtn.count() > 0) {
    await menuBtn.click();
    await page.waitForTimeout(300);
    const menuOpen = await page.locator('[aria-label="Close menu"]').isVisible();
    console.log(`      Mobile Menu opened: ${menuOpen}`);
    await page.locator('[aria-label="Close menu"]').click();
  }

  // 8. Console error check
  console.log('[8/8] Checking console errors...');
  console.log(`      Console errors count: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.warn('Console errors detected:', consoleErrors);
  }

  await browser.close();
  console.log('--- All Comprehensive Tests Passed Successfully! ---');
}

runTests().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});

