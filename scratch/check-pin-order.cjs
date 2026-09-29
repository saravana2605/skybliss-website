const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  await page.goto("http://localhost:5173");
  
  // Check state BEFORE preloader finishes (at 500ms)
  await page.waitForTimeout(500);
  const beforePreloader = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".pin-spacer")).map((ps, i) => ({
      i,
      height: ps.offsetHeight,
      top: ps.getBoundingClientRect().top,
      childId: ps.firstElementChild ? ps.firstElementChild.id : "none"
    }));
  });
  console.log("Pin-spacers BEFORE preloader done:", beforePreloader);

  // Wait for preloader to finish (at 3000ms)
  await page.waitForTimeout(3000);
  const afterPreloader = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".pin-spacer")).map((ps, i) => ({
      i,
      height: ps.offsetHeight,
      top: ps.getBoundingClientRect().top,
      childId: ps.firstElementChild ? ps.firstElementChild.id : "none"
    }));
  });
  console.log("Pin-spacers AFTER preloader done:", afterPreloader);

  await browser.close();
})();
