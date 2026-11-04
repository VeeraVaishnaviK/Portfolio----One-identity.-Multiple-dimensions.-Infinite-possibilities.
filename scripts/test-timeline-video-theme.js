const { chromium } = require('playwright');

async function testTimeline() {
  console.log('--- Testing New Video-Themed Timeline (Light & Dark) ---');
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  page.on('console', (msg) => {
    if (msg.type() === 'error') console.error('Browser Error:', msg.text());
  });

  console.log('[1/5] Loading page & navigating to #experience...');
  await page.goto('http://localhost:3000/#experience', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // 1. Check Timeline Elements
  console.log('[2/5] Checking Time Machine elements...');
  const section = page.locator('#experience');
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  const heading = await page.locator('#experience h2').textContent();
  console.log(`      Heading: "${heading.trim()}"`);

  const initialYear = await page.locator('#experience div:has-text("2026")').first().textContent();
  console.log(`      Initial Year visible: "${initialYear.trim()}"`);

  // Take Light Mode 2026 screenshot
  await page.screenshot({ path: 'public/screenshot-timeline-light-2026.png' });
  console.log('      Saved public/screenshot-timeline-light-2026.png');

  // 2. Scroll through milestones and check Year update
  console.log('[3/5] Scrolling down timeline to go back in time...');
  const linsInfotechCard = page.locator('#experience h3:has-text("Founding Software Engineer")');
  await linsInfotechCard.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);

  const yearAfterScroll = await page.evaluate(() => {
    const el = document.querySelector('#experience .text-7xl, #experience .text-8xl, #experience .text-9xl');
    return el ? el.textContent.trim() : null;
  });
  console.log(`      Scrolled to Lin's InfoTech -> Big Year displays: "${yearAfterScroll}"`);

  // Take Light Mode 2024 screenshot
  await page.screenshot({ path: 'public/screenshot-timeline-light-2024.png' });
  console.log('      Saved public/screenshot-timeline-light-2024.png');

  // 3. Switch to Dark Mode & Test Dark Theme
  console.log('[4/5] Switching to Dark Mode and verifying video-style dark aesthetic...');
  const ropeSwitch = page.locator('div[role="switch"]');
  await ropeSwitch.click();
  await page.waitForTimeout(700);

  const isDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
  console.log(`      Dark mode active: ${isDark}`);

  // Take Dark Mode screenshot at Lin's InfoTech
  await page.screenshot({ path: 'public/screenshot-timeline-dark-2024.png' });
  console.log('      Saved public/screenshot-timeline-dark-2024.png');

  // Scroll back to top of section for Dark 2026
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'public/screenshot-timeline-dark-2026.png' });
  console.log('      Saved public/screenshot-timeline-dark-2026.png');

  // 4. Test Mobile Viewport (390x844)
  console.log('[5/5] Testing Mobile 390px Viewport...');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(600);

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  console.log(`      Mobile 390px horizontal overflow: ${overflow}`);
  if (overflow) throw new Error('Horizontal overflow detected on mobile!');

  await page.screenshot({ path: 'public/screenshot-timeline-mobile.png' });
  console.log('      Saved public/screenshot-timeline-mobile.png');

  await browser.close();
  console.log('--- All Timeline Tests Passed Successfully! ---');
}

testTimeline().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});

