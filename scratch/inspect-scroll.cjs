const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  page.on("console", (msg) => console.log(`[Browser ${msg.type()}]: ${msg.text()}`));
  page.on("pageerror", (err) => console.error(`[Browser Error]:`, err));

  await page.goto("http://localhost:5173", { waitUntil: "networkidle" });
  await page.waitForTimeout(3000);

  // Let's inspect the 3 pinned sections:
  // Hero, Testimonial (ambiance), ScrollSection (experience)
  console.log("Inspecting ScrollTriggers and Pin Spacers...");
  const pinInfo = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".pin-spacer")).map((ps, i) => {
      const child = ps.firstElementChild;
      return {
        i,
        spacerHeight: ps.offsetHeight,
        childId: child ? child.id : null,
        childHeight: child ? child.offsetHeight : null,
        childTransform: child ? window.getComputedStyle(child).transform : null
      };
    });
  });
  console.log("Pin Info:", pinInfo);

  // Scroll systematically through ScrollSection (y from 5000 to 12500)
  for (let y = 5000; y <= 12500; y += 500) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(100);

    const status = await page.evaluate(() => {
      const exp = document.getElementById("experience");
      const canvas = exp ? exp.querySelector("canvas") : null;
      const h2 = exp ? exp.querySelector("h2") : null;
      const subtitle = exp ? exp.querySelector("p") : null;
      const expRect = exp ? exp.getBoundingClientRect() : null;

      // Check canvas pixel color at center
      let pixelColor = "no context";
      if (canvas) {
        try {
          const ctx = canvas.getContext("2d");
          const pixel = ctx.getImageData(canvas.width / 2, canvas.height / 2, 1, 1).data;
          pixelColor = `rgba(${pixel[0]},${pixel[1]},${pixel[2]},${pixel[3]})`;
        } catch (e) {
          pixelColor = e.message;
        }
      }

      return {
        scrollY: window.scrollY,
        expTop: expRect ? expRect.top : null,
        expBottom: expRect ? expRect.bottom : null,
        h2Text: h2 ? h2.innerText.replace(/\n/g, " ") : null,
        canvasW: canvas ? canvas.width : null,
        canvasH: canvas ? canvas.height : null,
        centerPixel: pixelColor
      };
    });

    console.log(`ScrollY ${y}:`, status);
    if (y % 1000 === 0) {
      await page.screenshot({ path: `scratch/scroll-${y}.png` });
    }
  }

  await browser.close();
})();
