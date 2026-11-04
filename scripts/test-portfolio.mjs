import { chromium } from "playwright";

async function runTests() {
  console.log("=== STARTING PORTFOLIO VERIFICATION TESTS ===");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const consoleErrors = [];
  page.on("pageerror", (err) => {
    consoleErrors.push(`[PageError] ${err.message}`);
  });
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(`[ConsoleError] ${msg.text()}`);
    }
  });

  // 1. Desktop Test at 1440x900
  console.log("\n1. Testing Desktop Viewport (1440x900)...");
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("http://localhost:3005", { waitUntil: "networkidle" });

  const desktopScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  const desktopInnerWidth = await page.evaluate(() => window.innerWidth);
  console.log(`Desktop Width check: scrollWidth=${desktopScrollWidth}, innerWidth=${desktopInnerWidth}`);
  if (desktopScrollWidth !== desktopInnerWidth) {
    console.error(`❌ DESKTOP HORIZONTAL OVERFLOW DETECTED: ${desktopScrollWidth} > ${desktopInnerWidth}`);
  } else {
    console.log("✅ Zero horizontal overflow on Desktop (1440px)!");
  }

  await page.screenshot({ path: "screenshot-1440x900.png", fullPage: false });
  console.log("Saved screenshot-1440x900.png");

  // 2. Mobile Test at 390x844
  console.log("\n2. Testing Mobile Viewport (390x844)...");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload({ waitUntil: "networkidle" });

  const mobileScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  const mobileInnerWidth = await page.evaluate(() => window.innerWidth);
  console.log(`Mobile Width check: scrollWidth=${mobileScrollWidth}, innerWidth=${mobileInnerWidth}`);
  if (mobileScrollWidth !== mobileInnerWidth) {
    console.error(`❌ MOBILE HORIZONTAL OVERFLOW DETECTED: ${mobileScrollWidth} > ${mobileInnerWidth}`);
  } else {
    console.log("✅ Zero horizontal overflow on Mobile (390px)!");
  }

  await page.screenshot({ path: "screenshot-390x844.png", fullPage: false });
  console.log("Saved screenshot-390x844.png");

  // 3. Test Interactive Elements on Desktop
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.reload({ waitUntil: "networkidle" });

  console.log("\n3. Testing ID Card Flip Interaction...");
  const idCard = page.locator('[aria-label*="developer ID card" i], [aria-label*="Developer ID Card" i]').first();
  const cardVisible = await idCard.isVisible();
  console.log(`ID Card visible: ${cardVisible}`);
  if (cardVisible) {
    // Click with force: true since card has physics sway animation
    await idCard.click({ force: true });
    await page.waitForTimeout(600);
    const flippedState = await idCard.getAttribute("aria-expanded");
    console.log(`Card flipped state after click: ${flippedState}`);
    
    // Also test keyboard flip (Enter key)
    await idCard.focus();
    await page.keyboard.press("Enter");
    await page.waitForTimeout(600);
    const keyboardFlipped = await idCard.getAttribute("aria-expanded");
    console.log(`Card flipped state after Enter key: ${keyboardFlipped}`);
  }

  console.log("\n4. Testing Sound Toggle Button...");
  const soundBtn = page.locator('button[aria-label*="audio" i], button[aria-label*="sound" i]').first();
  if (await soundBtn.isVisible()) {
    const labelBefore = await soundBtn.getAttribute("aria-label");
    await soundBtn.click();
    await page.waitForTimeout(300);
    const labelAfter = await soundBtn.getAttribute("aria-label");
    console.log(`Sound button toggled from "${labelBefore}" to "${labelAfter}"`);
  }

  console.log("\n5. Testing Achievements Section & Cards...");
  await page.locator("#achievements").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1600);
  const cards = page.locator('#achievements [class*="rounded-[28px]"]');
  const count = await cards.count();
  console.log(`Found ${count} achievement cards.`);

  console.log("\n6. Testing Email Copy Interaction...");
  const copyBtn = page.locator('button:has-text("Copy")').first();
  if (await copyBtn.isVisible()) {
    await copyBtn.click();
    await page.waitForTimeout(300);
    const textAfter = await copyBtn.innerText();
    console.log(`Copy button state: "${textAfter}"`);
  }

  console.log("\n7. Checking Console Errors...");
  if (consoleErrors.length === 0) {
    console.log("✅ Zero runtime console errors!");
  } else {
    console.log("Console errors/warnings captured:", consoleErrors);
  }

  await browser.close();
  console.log("\n=== ALL PLAYWRIGHT QUALITY TESTS COMPLETE ===");
}

runTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
