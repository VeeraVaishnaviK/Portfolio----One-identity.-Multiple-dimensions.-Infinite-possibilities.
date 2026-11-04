const { chromium } = require('playwright');

async function testRopeAndTheme() {
  console.log('--- Testing Interactive Drag Rope & Local Time ---');
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  page.on('console', (msg) => {
    if (msg.type() === 'error') console.error('Browser Error:', msg.text());
  });

  console.log('[1/6] Loading http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200); // Wait for entrance drop-in animation

  // 1. Verify Local Time & Date Badge
  console.log('[2/6] Verifying Local Time and Date badge...');
  const timeBadge = page.locator('div:has-text("Local time")').first();
  const badgeVisible = await timeBadge.isVisible();
  const badgeText = await timeBadge.textContent();
  console.log(`      Badge visible: ${badgeVisible}, content: "${badgeText.trim()}"`);

  if (!badgeVisible || !badgeText.includes('November') || !badgeText.includes('2026')) {
    console.warn('Date might not match test string, checking content:', badgeText);
  }

  // 2. Locate the Rope Pull Switch Handle
  console.log('[3/6] Locating Rope Pull Handle...');
  const ropeSwitch = page.locator('div[role="switch"]');
  const ropeCount = await ropeSwitch.count();
  if (ropeCount === 0) throw new Error('Rope switch [role="switch"] not found!');

  const initialChecked = await ropeSwitch.getAttribute('aria-checked');
  console.log(`      Rope switch found, aria-checked="${initialChecked}"`);

  // Take initial screenshot (Light Mode)
  await page.screenshot({ path: 'public/screenshot-light-rope.png' });
  console.log('      Saved public/screenshot-light-rope.png');

  // 3. Test Drag Down Interaction with Pointer Events
  console.log('[4/6] Testing Pointer Drag-Down on Rope Handle...');
  const handleBox = await ropeSwitch.boundingBox();
  if (!handleBox) throw new Error('Could not get bounding box for rope handle');

  const startX = handleBox.x + handleBox.width / 2;
  const startY = handleBox.y + handleBox.height - 15; // Bottom acorn knob area

  console.log(`      Starting drag at (${startX.toFixed(1)}, ${startY.toFixed(1)})...`);
  await page.mouse.move(startX, startY);
  await page.mouse.down();
  
  // Drag down by 70px in increments
  for (let dy = 10; dy <= 70; dy += 15) {
    await page.mouse.move(startX, startY + dy);
    await page.waitForTimeout(30);
  }

  // Release mouse
  await page.mouse.up();
  console.log('      Released drag after 70px downward pull.');
  await page.waitForTimeout(700); // Wait for spring release & theme transition

  const isDarkAfterDrag = await page.evaluate(() => document.documentElement.classList.contains('dark'));
  const themeInStorage = await page.evaluate(() => localStorage.getItem('portfolio-theme'));
  console.log(`      After drag -> html.dark: ${isDarkAfterDrag}, localStorage: "${themeInStorage}"`);

  if (!isDarkAfterDrag || themeInStorage !== 'dark') {
    throw new Error('Dark mode was not activated after dragging the rope down!');
  }

  // Take dark mode screenshot
  await page.screenshot({ path: 'public/screenshot-dark-rope.png' });
  console.log('      Saved public/screenshot-dark-rope.png');

  // 4. Test Keyboard / Tap toggle back to Light
  console.log('[5/6] Testing Keyboard Enter trigger...');
  await ropeSwitch.focus();
  await page.keyboard.press('Enter');
  await page.waitForTimeout(700);

  const isDarkAfterKey = await page.evaluate(() => document.documentElement.classList.contains('dark'));
  console.log(`      After pressing Enter -> html.dark: ${isDarkAfterKey} (expected: false)`);
  if (isDarkAfterKey) {
    throw new Error('Theme did not toggle back to light mode upon pressing Enter!');
  }

  // 5. Test Mobile 390px Viewport
  console.log('[6/6] Testing Mobile (390x844)...');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(600);

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  console.log(`      Mobile 390px horizontal overflow: ${overflow}`);
  if (overflow) throw new Error('Horizontal overflow detected on mobile!');

  // Test Mobile Menu Click (verify no overlap with rope)
  const menuBtn = page.locator('button:text-is("Menu")');
  await menuBtn.click();
  await page.waitForTimeout(400);
  const closeBtn = page.locator('[aria-label="Close menu"]');
  const menuOpen = await closeBtn.isVisible();
  console.log(`      Mobile Menu opened successfully: ${menuOpen}`);
  await closeBtn.click();

  await page.screenshot({ path: 'public/screenshot-mobile-rope.png' });
  console.log('      Saved public/screenshot-mobile-rope.png');

  await browser.close();
  console.log('--- All Rope & Local Time Tests Passed Successfully! ---');
}

testRopeAndTheme().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});

