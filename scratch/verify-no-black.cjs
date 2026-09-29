const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  const errors = [];
  page.on("pageerror", (err) => errors.push(err.toString()));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });

  console.log("Loading page at http://localhost:5173...");
  await page.goto("http://localhost:5173", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  // Check pin-spacers order on load
  const initialSpacers = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".pin-spacer")).map((ps, i) => ({
      i,
      childId: ps.firstElementChild ? ps.firstElementChild.id : "none",
      top: ps.getBoundingClientRect().top,
      height: ps.offsetHeight
    }));
  });
  console.log("Initial Pin-spacers:", initialSpacers);

  // Measure every section's visual state during progressive scroll
  const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
  console.log(`Scroll Height: ${scrollHeight}px`);

  let blackScreenDetections = 0;

  for (let y = 0; y <= scrollHeight; y += 300) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(30);

    const check = await page.evaluate(() => {
      // Find what element is currently occupying the center of the viewport
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const elem = document.elementFromPoint(cx, cy);

      const exp = document.getElementById("experience");
      const expRect = exp ? exp.getBoundingClientRect() : null;
      const isExpInView = expRect && expRect.top < window.innerHeight && expRect.bottom > 0;

      let expImagesState = [];
      if (exp) {
        const imgs = Array.from(exp.querySelectorAll("img"));
        expImagesState = imgs.map((im) => ({
          src: im.src.split("/").pop(),
          opacity: window.getComputedStyle(im).opacity,
          zIndex: window.getComputedStyle(im).zIndex,
          naturalWidth: im.naturalWidth,
          complete: im.complete
        }));
      }

      return {
        centerElemTag: elem ? elem.tagName : null,
        centerElemClass: elem ? elem.className.toString().substring(0, 30) : null,
        isExpInView,
        expImagesState
      };
    });

    if (check.isExpInView) {
      // Verify that at least one image in experience has opacity > 0 and naturalWidth > 0
      const visibleImgs = check.expImagesState.filter(im => parseFloat(im.opacity) > 0 && im.naturalWidth > 0);
      if (visibleImgs.length === 0) {
        console.error(`🚨 POTENTIAL BLACK SCREEN AT SCROLL ${y}: no visible image with naturalWidth > 0!`, check);
        blackScreenDetections++;
      }
    }
  }

  console.log(`Black Screen Detections during complete scroll: ${blackScreenDetections}`);
  console.log(`Errors:`, errors);

  await browser.close();
})();
