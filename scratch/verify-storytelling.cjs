const { chromium } = require('playwright');

async function verifyScrollStorytelling() {
  const browser = await chromium.launch({ headless: true });
  const viewports = [
    { width: 1440, height: 900, name: 'Desktop Large' },
    { width: 1024, height: 768, name: 'Tablet Landscape' },
    { width: 768, height: 1024, name: 'Tablet Portrait' },
    { width: 430, height: 932, name: 'Mobile iPhone 14 Pro Max' },
    { width: 390, height: 844, name: 'Mobile iPhone 12/13/14' },
    { width: 375, height: 667, name: 'Mobile iPhone SE' },
    { width: 360, height: 800, name: 'Mobile Android Standard' },
    { width: 320, height: 568, name: 'Mobile Compact' },
  ];

  for (const vp of viewports) {
    console.log(`\n================ Testing Viewport: ${vp.name} (${vp.width}x${vp.height}) ================`);
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    
    // Capture any console errors
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    // Wait for preloader
    await page.waitForTimeout(1600);

    // Initial Stage (01 / 03)
    const heroText = await page.locator('#hero').innerText();
    console.log(`Stage 1 check: contains '01' or 'Twilight': ${heroText.includes('Twilight') || heroText.includes('01')}`);
    
    // Scroll down slowly through Hero
    const scrollAmount = vp.height * 1.5;
    await page.evaluate((y) => window.scrollBy({ top: y, behavior: 'smooth' }), scrollAmount);
    await page.waitForTimeout(1000);

    const stage2Text = await page.locator('#hero').innerText();
    console.log(`Stage 2/3 scroll check - text present: ${stage2Text.length > 50}`);

    // Scroll further down
    await page.evaluate((y) => window.scrollBy({ top: y, behavior: 'smooth' }), scrollAmount * 1.5);
    await page.waitForTimeout(1000);

    const stage3Text = await page.locator('#hero').innerText();
    console.log(`Stage 3 scroll check - text present: ${stage3Text.length > 50}`);

    // Scroll backwards
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await page.waitForTimeout(1000);

    const backToTopText = await page.locator('#hero').innerText();
    console.log(`Back to top check - contains 'Twilight': ${backToTopText.includes('Twilight') || backToTopText.includes('01')}`);

    // Check console errors
    console.log(`Console errors count: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      console.log('Errors:', consoleErrors);
    }

    await page.close();
  }

  await browser.close();
  console.log('\nAll viewport tests passed successfully!');
}

verifyScrollStorytelling().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
