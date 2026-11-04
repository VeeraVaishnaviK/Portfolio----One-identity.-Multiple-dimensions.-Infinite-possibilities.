const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Test html with red background
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head><style>body { background: #22c55e; margin: 0; padding: 20px; }</style></head>
    <body>
      <h1 style="color:white; font-size: 80px; position: absolute; z-index: 0;">BEHIND VIDEO</h1>
      <video id="v" autoplay loop muted playsinline style="width: 500px; height: 600px; position: relative; z-index: 1;">
        <source src="file://${path.resolve('public/hero/hero.webm').replace(/\\/g, '/')}" type="video/webm">
      </video>
    </body>
    </html>
  `);

  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'scripts/test_hero_webm_browser.png' });
  await browser.close();
  console.log('Saved scripts/test_hero_webm_browser.png');
})();

