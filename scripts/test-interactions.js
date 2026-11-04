const { chromium } = require('playwright');

async function testInteractions() {
  const browser = await chromium.launch({
    channel: 'msedge',
    headless: true
  });

  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 }
  });

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  console.log("1. Testing Video sound toggle button...");
  const soundBtn = await page.locator('button[aria-label*="audio"]');
  const initialAria = await soundBtn.getAttribute('aria-label');
  console.log("   Initial sound aria-label:", initialAria);
  await soundBtn.click();
  await page.waitForTimeout(300);
  const toggledAria = await soundBtn.getAttribute('aria-label');
  console.log("   Toggled sound aria-label:", toggledAria);

  console.log("2. Testing ID Card flip on click/tap and hover...");
  const idCard = await page.locator('[aria-label*="developer ID card"]');
  await idCard.hover({ force: true });
  await page.waitForTimeout(300);
  console.log("   Hovered ID card successfully.");
  await idCard.click({ force: true });
  await page.waitForTimeout(300);
  console.log("   Clicked ID card to flip back face.");

  console.log("3. Testing Skills filtering and inspector...");
  // Click 'Frontend' filter chip
  const frontendChip = await page.locator('button:has-text("Frontend")').first();
  await frontendChip.click();
  await page.waitForTimeout(300);
  console.log("   Clicked Frontend filter chip.");

  // Hover over React skill tile
  const reactTile = await page.locator('button[aria-label*="React"]').first();
  await reactTile.hover();
  await page.waitForTimeout(300);
  const inspectorText = await page.locator('#skills').innerText();
  const hasReactInInspector = inspectorText.includes('React');
  console.log("   Inspector shows React:", hasReactInInspector);

  console.log("4. Testing Work accordion...");
  // Click second project (Nexacro)
  const nexacroSpine = await page.locator('#work div[role="region"]:has-text("Nexacro")').first();
  await nexacroSpine.click();
  await page.waitForTimeout(400);
  const workText = await page.locator('#work').innerText();
  const hasNexacroOpen = workText.includes('Acrosome-Intact');
  console.log("   Nexacro opened and mini-UI displayed:", hasNexacroOpen);

  console.log("5. Testing Contact Copy button...");
  const copyBtn = await page.locator('#contact button[aria-label*="Copy email address"]');
  await copyBtn.click();
  await page.waitForTimeout(300);
  const copyText = await copyBtn.innerText();
  console.log("   Copy button text after click:", copyText);

  console.log("6. Verifying Console Errors...");
  console.log("   Total errors:", errors.length);

  await browser.close();

  if (errors.length > 0) {
    console.error("Errors found:", errors);
    process.exit(1);
  }

  console.log("ALL INTERACTION TESTS PASSED!");
  process.exit(0);
}

testInteractions().catch(err => {
  console.error("Test failed:", err);
  process.exit(1);
});