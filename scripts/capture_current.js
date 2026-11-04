const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  await page.screenshot({ path: 'scripts/current_hero_screenshot.png' });
  console.log('Saved scripts/current_hero_screenshot.png');

  // Also toggle dark mode if lamp exists
  const lampSwitch = await page.$('[role="switch"]');
  if (lampSwitch) {
    console.log('Found lamp switch, toggling to dark mode...');
    await lampSwitch.click();
    await page.waitForTimeout(800);
    await page.screenshot({ path: 'scripts/current_dark_screenshot.png' });
    console.log('Saved scripts/current_dark_screenshot.png');
  } else {
    console.log('Lamp switch not found!');
  }

  await browser.close();
})();

