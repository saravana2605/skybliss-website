const { spawn } = require("child_process");
const { chromium } = require("playwright");

async function run() {
  console.log("Starting vite preview server...");
  const preview = spawn("npx", ["vite", "preview", "--port", "4173", "--host", "127.0.0.1"], {
    stdio: ["ignore", "pipe", "pipe"],
  });

  preview.stdout.on("data", (d) => {
    // console.log("[vite stdout]", d.toString().trim());
  });
  preview.stderr.on("data", (d) => {
    console.error("[vite stderr]", d.toString().trim());
  });

  // wait until port 4173 is reachable
  const startTime = Date.now();
  let reachable = false;
  while (Date.now() - startTime < 15000) {
    try {
      const res = await fetch("http://127.0.0.1:4173/");
      if (res.ok) {
        reachable = true;
        break;
      }
    } catch (e) {
      await new Promise((r) => setTimeout(r, 400));
    }
  }

  if (!reachable) {
    preview.kill();
    throw new Error("Vite preview failed to start in 15s");
  }
  console.log("Vite preview is running on http://127.0.0.1:4173/");

  const browser = await chromium.launch({
    executablePath: "/usr/bin/google-chrome",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  const consoleErrors = [];
  const networkErrors = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });

  page.on("requestfailed", (req) => {
    networkErrors.push(`${req.method()} ${req.url()} - ${req.failure()?.errorText}`);
  });

  page.on("response", (res) => {
    if (res.status() >= 400) {
      networkErrors.push(`${res.status()} ${res.url()}`);
    }
  });

  console.log("Navigating to http://127.0.0.1:4173/...");
  await page.goto("http://127.0.0.1:4173/", { waitUntil: "domcontentloaded", timeout: 30000 });

  const title = await page.title();
  console.log("Page title:", title);

  // Wait for preloader to finish (timeout 30s)
  console.log("Waiting for preloader to complete...");
  try {
    await page.waitForFunction(() => !document.querySelector(".preloader-root"), { timeout: 25000 });
    console.log("Preloader completed successfully!");
  } catch (e) {
    console.log("Preloader wait note:", e.message);
  }

  await page.waitForTimeout(2000);

  // Screenshot Hero
  await page.screenshot({ path: "test-hero.png" });
  console.log("Captured test-hero.png");

  // Verify Skybliss copy
  const pageText = await page.evaluate(() => document.body.innerText);
  const skyblissCount = (pageText.match(/Skybliss/gi) || []).length;
  console.log(`Skybliss brand mentions: ${skyblissCount}`);

  if (pageText.includes("Meridian")) {
    console.error("WARNING: Found Meridian mentions in page text!");
  } else {
    console.log("VERIFIED: Zero Meridian mentions found!");
  }

  // Test Reservation Modal
  const bookBtn = await page.$("button:has-text('Book a Table'), a:has-text('Book a Table'), button:has-text('Reserve Table')");
  if (bookBtn) {
    console.log("Clicking 'Book a Table' button...");
    await bookBtn.click();
    await page.waitForTimeout(800);
    const modalVisible = await page.evaluate(() => {
      const modal = document.querySelector("input[name='name'], input[placeholder*='name' i]");
      return !!modal;
    });
    console.log("Reservation modal opened:", modalVisible);
    await page.screenshot({ path: "test-reservation-modal.png" });

    // Close modal by clicking backdrop or close button
    const closeBtn = await page.$("button[aria-label='Close'], button:has-text('✕'), button:has-text('×')");
    if (closeBtn) {
      await closeBtn.click();
      await page.waitForTimeout(500);
    }
  }

  // Test Menu Modal
  const menuBtn = await page.$("button:has-text('Explore Menu'), button:has-text('View Menu'), button:has-text('Menu')");
  if (menuBtn) {
    console.log("Clicking 'Menu' button...");
    await menuBtn.click();
    await page.waitForTimeout(800);
    const menuVisible = await page.evaluate(() => {
      return document.body.innerText.includes("COCKTAILS") || document.body.innerText.includes("Starters") || document.body.innerText.includes("Signature");
    });
    console.log("Menu modal opened:", menuVisible);
    await page.screenshot({ path: "test-menu-modal.png" });

    const closeBtn = await page.$("button[aria-label='Close'], button:has-text('✕'), button:has-text('×')");
    if (closeBtn) {
      await closeBtn.click();
      await page.waitForTimeout(500);
    }
  }

  // Test smooth scroll to Gallery and Footer
  console.log("Scrolling through sections...");
  await page.evaluate(() => {
    const gallery = document.getElementById("gallery");
    if (gallery) gallery.scrollIntoView({ behavior: "instant" });
  });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: "test-gallery.png" });

  await page.evaluate(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" });
  });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: "test-footer.png" });

  // Test Mobile Viewport
  console.log("Testing mobile viewport (390 x 844)...");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(1000);

  const overflow = await page.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
    };
  });
  console.log("Mobile overflow check:", overflow);
  await page.screenshot({ path: "test-mobile.png" });

  // Mobile menu test
  const menuToggle = await page.$("button[aria-label='Toggle Menu'], button[aria-label='Open Menu']");
  if (menuToggle) {
    await menuToggle.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: "test-mobile-menu.png" });
  }

  await browser.close();
  preview.kill();

  console.log("--- RESULTS SUMMARY ---");
  console.log("Console Errors:", consoleErrors);
  console.log("Network / 404 Errors:", networkErrors);
}

run().catch((e) => {
  console.error("Test failed:", e);
  process.exit(1);
});
