const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  const consoleLogs = [];
  const errors = [];
  page.on("console", (msg) => consoleLogs.push(`[${msg.type()}] ${msg.text()}`));
  page.on("pageerror", (err) => errors.push(err.toString()));

  console.log("Navigating to http://localhost:5173...");
  await page.goto("http://localhost:5173", { waitUntil: "networkidle", timeout: 30000 });

  // Wait for preloader to disappear
  await page.waitForFunction(() => !document.querySelector(".preloader-root") && !document.querySelector("#preloader"), { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(2000);

  console.log("Preloader complete. Initial state inspection:");
  const initialSTCount = await page.evaluate(() => {
    return window.ScrollTrigger ? window.ScrollTrigger.getAll().length : "no ScrollTrigger global";
  });
  console.log("Initial ScrollTriggers:", initialSTCount);

  // Measure total height
  const pageHeight = await page.evaluate(() => document.body.scrollHeight);
  console.log("Page total scroll height:", pageHeight);

  // Perform multiple passes of scrolling forward and backward
  console.log("Starting scroll stress test...");
  for (let pass = 0; pass < 5; pass++) {
    console.log(`Pass ${pass + 1}/5: scrolling down...`);
    for (let pos = 0; pos <= pageHeight; pos += 400) {
      await page.evaluate((y) => window.scrollTo(0, y), pos);
      await page.waitForTimeout(40);
    }
    console.log(`Pass ${pass + 1}/5: scrolling up...`);
    for (let pos = pageHeight; pos >= 0; pos -= 400) {
      await page.evaluate((y) => window.scrollTo(0, y), pos);
      await page.waitForTimeout(40);
    }
  }

  // Check state of sections
  const sectionsData = await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll("section, main > div, main > section"));
    return sections.map((s, idx) => {
      const rect = s.getBoundingClientRect();
      const compStyle = window.getComputedStyle(s);
      return {
        idx,
        id: s.id,
        className: s.className.substring(0, 40),
        top: rect.top,
        height: rect.height,
        display: compStyle.display,
        visibility: compStyle.visibility,
        opacity: compStyle.opacity,
        transform: compStyle.transform,
      };
    });
  });

  console.log("Sections inspection:", JSON.stringify(sectionsData, null, 2));
  console.log("Errors:", errors);

  await page.screenshot({ path: "scratch/stress-test-result.png", fullPage: false });
  await browser.close();
  console.log("Done test.");
})();
