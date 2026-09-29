const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/google-chrome' });
  const viewports = [
    { name: 'Mobile 320px', width: 320, height: 600 },
    { name: 'Mobile 375px', width: 375, height: 812 },
    { name: 'Mobile 414px', width: 414, height: 896 },
    { name: 'Desktop 1440px', width: 1440, height: 900 },
  ];

  let errorsFound = 0;

  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.goto('http://localhost:5173/#contact', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Scroll to contact section
    await page.evaluate(() => {
      document.getElementById('contact')?.scrollIntoView();
    });
    await page.waitForTimeout(600);

    // Check horizontal overflow
    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

    if (hasOverflow) {
      console.error(`[${vp.name}] OVERFLOW DETECTED: scrollWidth > clientWidth`);
      errorsFound++;
    } else {
      console.log(`[${vp.name}] No horizontal overflow.`);
    }

    if (consoleErrors.length > 0) {
      console.error(`[${vp.name}] Console errors:`, consoleErrors);
      errorsFound++;
    }

    // Verify the links on one viewport
    if (vp.name === 'Desktop 1440px') {
      const links = await page.evaluate(() => {
        const contactSec = document.getElementById('contact');
        if (!contactSec) return [];
        const anchors = Array.from(contactSec.querySelectorAll('a'));
        return anchors.map(a => ({
          href: a.href,
          text: a.innerText.replace(/\s+/g, ' ').trim(),
          ariaLabel: a.getAttribute('aria-label')
        }));
      });

      console.log('\nContact links verified:');
      links.forEach((l, i) => console.log(`  ${i + 1}. [${l.text || l.ariaLabel}] -> ${l.href}`));

      const hasCall = links.some(l => l.href.startsWith('tel:+919585225420'));
      const hasWA = links.some(l => l.href.includes('wa.me/919843614081'));
      const hasEmail = links.some(l => l.href.includes('mailto:skyblissresto@gmail.com'));
      const hasMaps = links.some(l => l.href.includes('google.com/maps'));
      const hasInsta = links.some(l => l.href.includes('instagram.com/skybliss2024'));

      if (!hasCall || !hasWA || !hasEmail || !hasMaps || !hasInsta) {
        console.error('Missing expected contact action link! (Call, WhatsApp, Email, Maps, Instagram)');
        errorsFound++;
      } else {
        console.log('All 5 action targets (Call, WhatsApp, Email, Maps, Instagram) successfully verified.');
      }
    }

    await page.close();
  }

  await browser.close();
  if (errorsFound > 0) {
    console.error(`\nFAILED with ${errorsFound} errors`);
    process.exit(1);
  } else {
    console.log('\nALL CONTACT/LOCATION TESTS PASSED PERFECTLY!');
  }
})();
