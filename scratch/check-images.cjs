const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const networkRequests = [];
  page.on("requestfailed", (req) => {
    networkRequests.push({ url: req.url(), status: "FAILED", failure: req.failure() });
  });
  page.on("response", (res) => {
    if (res.status() >= 400) {
      networkRequests.push({ url: res.url(), status: res.status() });
    }
  });

  await page.goto("http://localhost:5173", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  // Scroll through entire page to trigger lazy loading of all images
  const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y <= scrollHeight; y += 400) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(50);
  }

  console.log("Failed Network Requests:", networkRequests);

  // Check all images in the DOM:
  const imgStats = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll("img"));
    return imgs.map((img) => ({
      src: img.src,
      currentSrc: img.currentSrc,
      complete: img.complete,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      alt: img.alt,
      visible: img.offsetWidth > 0 && img.offsetHeight > 0,
      opacity: window.getComputedStyle(img).opacity,
      display: window.getComputedStyle(img).display,
    }));
  });

  console.log("Total DOM Images:", imgStats.length);
  const brokenImgs = imgStats.filter((im) => !im.complete || im.naturalWidth === 0);
  console.log("Broken DOM Images:", brokenImgs);

  await browser.close();
})();
