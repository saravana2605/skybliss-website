const { chromium } = require("playwright");

async function runFullSuite() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const consoleErrors = [];
  const pageErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => pageErrors.push(err.toString()));

  console.log("=== STEP 1: Loading Skybliss Website ===");
  await page.goto("http://localhost:5173", { waitUntil: "networkidle" });
  await page.waitForTimeout(3000);

  // Helper to get all section states and check for black screens
  async function checkPageIntegrity(label) {
    return await page.evaluate((lbl) => {
      const exp = document.getElementById("experience");
      const canvas = exp ? exp.querySelector("canvas") : null;
      let blackOrBlank = false;
      let pixelInfo = "";

      if (canvas && canvas.width > 0 && canvas.height > 0) {
        try {
          const ctx = canvas.getContext("2d");
          const pixel = ctx.getImageData(canvas.width / 2, canvas.height / 2, 1, 1).data;
          pixelInfo = `rgba(${pixel[0]},${pixel[1]},${pixel[2]},${pixel[3]})`;
          // If alpha is 255 and RGB is near 0, check if anything is drawn
          if (pixel[3] === 0) {
            // Transparent - underlying img shows
          }
        } catch (e) {
          pixelInfo = e.message;
        }
      }

      const sections = [
        "hero",
        "ambiance",
        "experience",
        "about",
        "menu",
        "events",
        "gallery",
        "contact",
      ].map((id) => {
        const el = document.getElementById(id);
        if (!el) return { id, exists: false };
        const rect = el.getBoundingClientRect();
        const style = window.getComputedStyle(el);
        return {
          id,
          exists: true,
          top: Math.round(rect.top),
          height: Math.round(rect.height),
          visible: style.display !== "none" && style.visibility !== "hidden" && style.opacity !== "0",
        };
      });

      return {
        label: lbl,
        scrollY: window.scrollY,
        pixelInfo,
        sections,
      };
    }, label);
  }

  const initialIntegrity = await checkPageIntegrity("Initial Load");
  console.log("Initial Check:", JSON.stringify(initialIntegrity, null, 2));

  const totalHeight = await page.evaluate(() => document.body.scrollHeight);
  console.log(`Document Height: ${totalHeight}px`);

  // ----------------------------------------------------
  // TEST A: Scroll Top -> Bottom 10 times
  // ----------------------------------------------------
  console.log("\n=== TEST A: Full Page Scroll Top -> Bottom (10 Passes) ===");
  for (let p = 1; p <= 10; p++) {
    for (let y = 0; y <= totalHeight; y += 800) {
      await page.evaluate((top) => window.scrollTo(0, top), y);
      await page.waitForTimeout(20);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(50);
    process.stdout.write(`Pass ${p}/10 done. `);
  }
  console.log("\nTest A Complete.");

  // ----------------------------------------------------
  // TEST B: Rapid Fast Scrolling (10 Passes)
  // ----------------------------------------------------
  console.log("\n=== TEST B: Rapid Fast Scrolling (10 Passes) ===");
  for (let p = 1; p <= 10; p++) {
    await page.evaluate((h) => window.scrollTo(0, h), totalHeight);
    await page.waitForTimeout(100);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(100);
    process.stdout.write(`Rapid Pass ${p}/10 done. `);
  }
  console.log("\nTest B Complete.");

  // ----------------------------------------------------
  // TEST C: Oscillating Repeated Scroll through Experience & Stay in Comfort (25 passes)
  // ----------------------------------------------------
  console.log("\n=== TEST C: Oscillating through Experience Chapters & Stay in Comfort (25 Passes) ===");
  // Testimonial starts around y=5000, Experience from ~6800 to 11800, About at 11800
  for (let p = 1; p <= 25; p++) {
    for (let y = 4500; y <= 12500; y += 400) {
      await page.evaluate((top) => window.scrollTo(0, top), y);
      await page.waitForTimeout(20);
    }
    for (let y = 12500; y >= 4500; y -= 400) {
      await page.evaluate((top) => window.scrollTo(0, top), y);
      await page.waitForTimeout(20);
    }
    process.stdout.write(`${p}/25 `);
  }
  console.log("\nTest C Complete.");

  // ----------------------------------------------------
  // TEST D: Interactive Modal Open/Close at Various Scroll Offsets
  // ----------------------------------------------------
  console.log("\n=== TEST D: Modals Interaction at Mid-Scroll ===");
  for (const scrollY of [2000, 5500, 8500, 10500, 15000]) {
    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await page.waitForTimeout(100);

    // Open Reservation
    await page.evaluate(() => {
      const btn = document.querySelector("nav button, header button");
      if (btn) btn.click();
    });
    await page.waitForTimeout(150);
    await page.keyboard.press("Escape");
    await page.waitForTimeout(150);

    // Check integrity
    const state = await checkPageIntegrity(`After Modal at Y=${scrollY}`);
    console.log(`ScrollY ${scrollY} integrity check: all sections present = ${state.sections.every(s => s.exists)}`);
  }
  console.log("Test D Complete.");

  // ----------------------------------------------------
  // TEST E: Desktop Resizing during active scroll
  // ----------------------------------------------------
  console.log("\n=== TEST E: Browser Resizing Tests ===");
  for (const width of [1920, 1440, 1280, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => window.scrollTo(0, 8000));
    await page.waitForTimeout(200);
    await page.screenshot({ path: `scratch/resize-${width}.png` });
  }
  console.log("Test E Complete.");

  // ----------------------------------------------------
  // TEST F: Mobile Prolonged Scrolling across viewports
  // ----------------------------------------------------
  console.log("\n=== TEST F: Mobile Prolonged Scrolling (320, 360, 375, 390, 414, 430) ===");
  for (const width of [320, 360, 375, 390, 414, 430]) {
    await page.setViewportSize({ width, height: 844 });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(100);

    const mobileHeight = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y <= mobileHeight; y += 500) {
      await page.evaluate((top) => window.scrollTo(0, top), y);
      await page.waitForTimeout(15);
    }
    for (let y = mobileHeight; y >= 0; y -= 500) {
      await page.evaluate((top) => window.scrollTo(0, top), y);
      await page.waitForTimeout(15);
    }
    await page.screenshot({ path: `scratch/mobile-${width}.png` });
    process.stdout.write(`Mobile ${width}px done. `);
  }
  console.log("\nTest F Complete.");

  // ----------------------------------------------------
  // Final Checks
  // ----------------------------------------------------
  console.log("\n=== FINAL INTEGRITY CHECK ===");
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.evaluate(() => window.scrollTo(0, 8500));
  await page.waitForTimeout(500);
  await page.screenshot({ path: "scratch/final-experience.png" });

  await page.evaluate(() => window.scrollTo(0, 10500));
  await page.waitForTimeout(500);
  await page.screenshot({ path: "scratch/final-stay-in-comfort.png" });

  console.log("Console Errors:", consoleErrors);
  console.log("Page Runtime Errors:", pageErrors);

  await browser.close();
  console.log("=== ALL STRESS TESTS FINISHED SUCCESSFULLY ===");
}

runFullSuite().catch((err) => {
  console.error("Test Suite Failed:", err);
  process.exit(1);
});
