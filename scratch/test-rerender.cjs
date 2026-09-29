const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  await page.goto("http://localhost:5173", { waitUntil: "networkidle" });
  await page.waitForTimeout(3000);

  console.log("=== Testing Modal Open / State changes during scroll ===");
  // Scroll to experience section (scrollY ~ 8500)
  await page.evaluate(() => window.scrollTo(0, 8500));
  await page.waitForTimeout(500);

  let expBoxBefore = await page.evaluate(() => {
    const el = document.getElementById("experience");
    return el ? el.getBoundingClientRect() : null;
  });
  console.log("Experience rect before opening modal:", expBoxBefore);

  // Open reservation modal (causes App to re-render: setReservationOpen(true))
  await page.evaluate(() => {
    const btn = document.querySelector("nav button, header button");
    if (btn) btn.click();
  });
  await page.waitForTimeout(500);

  let expBoxAfter = await page.evaluate(() => {
    const el = document.getElementById("experience");
    return el ? el.getBoundingClientRect() : null;
  });
  console.log("Experience rect after opening modal:", expBoxAfter);

  // Close modal
  await page.keyboard.press("Escape");
  await page.waitForTimeout(500);

  let expBoxAfterClose = await page.evaluate(() => {
    const el = document.getElementById("experience");
    return el ? el.getBoundingClientRect() : null;
  });
  console.log("Experience rect after closing modal:", expBoxAfterClose);

  // Take screenshot
  await page.screenshot({ path: "scratch/after-modal-experience.png" });

  await browser.close();
})();
