const { chromium } = require('playwright');

const VIEWPORTS = [
  { name: 'Mobile 320px (iPhone SE narrow)', width: 320, height: 568 },
  { name: 'Mobile 360px (Android compact)', width: 360, height: 740 },
  { name: 'Mobile 375px (iPhone standard)', width: 375, height: 667 },
  { name: 'Mobile 390px (iPhone 13/14)', width: 390, height: 844 },
  { name: 'Mobile 414px (iPhone Plus/XR)', width: 414, height: 896 },
  { name: 'Mobile 430px (iPhone 14 Pro Max)', width: 430, height: 932 },
  { name: 'Desktop 1366px (HD Laptop)', width: 1366, height: 768 },
  { name: 'Desktop 1440px (MacBook Pro)', width: 1440, height: 900 },
  { name: 'Desktop 1920px (FHD Monitor)', width: 1920, height: 1080 },
];

async function runTests() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  let totalTests = 0;
  let passedTests = 0;
  const failures = [];

  function assert(condition, message) {
    totalTests++;
    if (condition) {
      passedTests++;
      console.log(`  ✓ ${message}`);
    } else {
      failures.push(message);
      console.error(`  ✗ FAIL: ${message}`);
    }
  }

  try {
    for (const vp of VIEWPORTS) {
      console.log(`\n========================================`);
      console.log(`Testing Viewport: ${vp.name} (${vp.width}x${vp.height})`);
      console.log(`========================================`);

      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
      });
      const page = await context.newPage();

      const consoleErrors = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });
      page.on('pageerror', (err) => {
        consoleErrors.push(err.message);
      });

      await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000); // Allow preloader to finish

      // 1. Check Console Errors
      assert(consoleErrors.length === 0, `Zero console errors on load (errors: ${consoleErrors.join(', ')})`);

      // 2. Check Favicon
      const faviconHref = await page.evaluate(() => {
        const icon = document.querySelector('link[rel="icon"]');
        return icon ? icon.getAttribute('href') : null;
      });
      assert(faviconHref === '/favicon.png', `Primary favicon points to /favicon.png (actual: ${faviconHref})`);

      // 3. Check Horizontal Scroll / Viewport Overflow
      const overflow = await page.evaluate(() => {
        const docW = document.documentElement.scrollWidth;
        const winW = window.innerWidth;
        const bodyW = document.body.scrollWidth;
        return { docW, winW, bodyW, hasOverflow: docW > winW || bodyW > winW };
      });
      assert(!overflow.hasOverflow, `No horizontal overflow at top (docW: ${overflow.docW}, winW: ${overflow.winW})`);

      // Rapid scroll down & up test (verifying no blank/black lockup)
      for (let i = 0; i <= 5; i++) {
        await page.evaluate((step) => window.scrollTo(0, (document.body.scrollHeight * step) / 5), i);
        await page.waitForTimeout(150);
      }
      for (let i = 5; i >= 0; i--) {
        await page.evaluate((step) => window.scrollTo(0, (document.body.scrollHeight * step) / 5), i);
        await page.waitForTimeout(150);
      }
      const bottomOverflow = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
      assert(bottomOverflow, `No horizontal overflow after rapid bidirectional scroll`);

      // 4. CloudMaSa Footer Branding Verification
      const footerSection = page.locator('footer');
      await footerSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);

      const cloudmasaLink = page.locator('footer a[href="https://cloudmasa.com/"]');
      const hasCloudmasaLink = await cloudmasaLink.isVisible();
      assert(hasCloudmasaLink, `CloudMaSa logo link is visible and targets https://cloudmasa.com/`);

      const cloudmasaImg = page.locator('footer img[alt="CloudMaSa"]');
      const hasCloudmasaImg = await cloudmasaImg.isVisible();
      assert(hasCloudmasaImg, `CloudMaSa logo image is visible in footer`);

      const cloudmasaImgBox = await cloudmasaImg.boundingBox();
      const isCloudmasaProminent = cloudmasaImgBox && cloudmasaImgBox.height >= 28 && cloudmasaImgBox.width >= 50;
      assert(isCloudmasaProminent, `CloudMaSa logo has prominent size (h: ${cloudmasaImgBox?.height}px, w: ${cloudmasaImgBox?.width}px)`);

      const builtByText = await page.locator('footer').getByText('Built by').first().isVisible();
      assert(builtByText, `'Built by' header text is visible in footer`);

      // 5. Mobile Navigation Menu Test (on mobile viewports)
      if (vp.width < 768) {
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(300);

        const menuBtn = page.locator('button[aria-label="Toggle navigation menu"]');
        if (await menuBtn.isVisible()) {
          await menuBtn.click();
          await page.waitForTimeout(400);

          const drawerNavLinks = page.locator('div.fixed.inset-0 button:has-text("Experience")');
          const isDrawerOpen = await drawerNavLinks.isVisible();
          assert(isDrawerOpen, `Mobile drawer opens and displays navigation links`);

          // Click a link in drawer
          await drawerNavLinks.click();
          await page.waitForTimeout(600);

          // Verify drawer closed
          const drawerStillVisible = await page.locator('div.fixed.inset-0.z-40').isVisible();
          assert(!drawerStillVisible, `Mobile drawer closes after clicking section link`);
        }
      }

      // 6. Form Validation & WhatsApp Pre-Book Functionality Test
      const contactSection = page.locator('#contact');
      if (await contactSection.isVisible()) {
        await contactSection.scrollIntoViewIfNeeded();
        await page.waitForTimeout(300);

        const submitBtn = page.locator('#reservation form button[type="submit"]');
        if (await submitBtn.isVisible()) {
          await page.fill('#res-name', '');
          await page.fill('#res-phone', '');
          await page.fill('#res-date', '');

          await submitBtn.click();
          await page.waitForTimeout(300);

          const nameErr = await page.locator('text=Please enter your name.').isVisible();
          const phoneErr = await page.locator('text=Please enter a valid 10-digit mobile number.').isVisible();
          const dateErr = await page.locator('text=Please select a date.').isVisible();

          assert(nameErr, `Empty Name shows validation error`);
          assert(phoneErr, `Empty Phone shows validation error`);
          assert(dateErr, `Empty Date shows validation error`);

          // Test invalid phone
          await page.fill('#res-phone', '1234567890');
          await submitBtn.click();
          await page.waitForTimeout(300);
          const invalidPhoneErr = await page.locator('text=Please enter a valid 10-digit mobile number.').isVisible();
          assert(invalidPhoneErr, `Phone starting with '1' is rejected with valid error message`);

          // Test valid form
          await page.fill('#res-name', 'Test Customer');
          await page.fill('#res-phone', '9876543210');
          await page.fill('#res-date', '2026-10-15');
          await page.waitForTimeout(300);

          // Real-time error clearance check
          const nameErrAfter = await page.locator('text=Please enter your name.').isVisible();
          const phoneErrAfter = await page.locator('text=Please enter a valid 10-digit mobile number.').isVisible();
          assert(!nameErrAfter, `Name error is cleared in real-time once filled`);
          assert(!phoneErrAfter, `Phone error is cleared in real-time once valid number entered`);

          // Intercept window.open / WhatsApp submission
          const [popup] = await Promise.all([
            page.waitForEvent('popup', { timeout: 3000 }).catch(() => null),
            submitBtn.click(),
          ]);

          const readyMsg = await page.locator('text=Request Ready').isVisible();
          assert(readyMsg, `Reservation form enters 'Request Ready' state upon valid submit`);

          const waBtn = page.locator('a[href*="wa.me/919843614081"]');
          const hasWaLink = (await waBtn.count()) > 0;
          assert(hasWaLink, `WhatsApp submission button contains target number +91 98436 14081`);

          const modifyBtn = page.locator('button:has-text("Modify Reservation Details")');
          if (await modifyBtn.isVisible()) {
            await modifyBtn.click();
            await page.waitForTimeout(300);
          }
        }
      }

      // 7. Reservation Modal test
      const navBookBtn = page.locator('nav button:has-text("Book")').first();
      if (await navBookBtn.isVisible()) {
        await navBookBtn.click();
        await page.waitForTimeout(500);

        const modalInput = page.locator('#modal-name');
        const modalVisible = await modalInput.isVisible();
        assert(modalVisible, `Reservation modal opens when Book a Table CTA is clicked`);

        const closeBtn = page.locator('button[aria-label="Close Reservation Modal"]');
        if (await closeBtn.isVisible()) {
          await closeBtn.click({ force: true });
          await modalInput.waitFor({ state: 'hidden', timeout: 3000 }).catch(() => {});
          const isClosed = await modalInput.isHidden();
          assert(isClosed, `Reservation modal closes smoothly when clicking close button`);
        }
      }

      // 8. Gallery Lightbox & Filtering test
      const gallerySection = page.locator('#gallery');
      if (await gallerySection.isVisible()) {
        await gallerySection.scrollIntoViewIfNeeded();
        await page.waitForTimeout(400);

        // Test Category filtering
        const diningTab = page.locator('#gallery button:has-text("Rooftop & Dining")');
        if (await diningTab.isVisible()) {
          await diningTab.click();
          await page.waitForTimeout(300);
          const diningCard = page.locator('#gallery .grid > div.cursor-pointer').first();
          assert(await diningCard.isVisible(), `Dining gallery cards visible under 'Rooftop & Dining' tab`);
        }

        const roomTab = page.locator('#gallery button:has-text("Hospitality & Suites")');
        if (await roomTab.isVisible()) {
          await roomTab.click();
          await page.waitForTimeout(300);
          const roomCard = page.locator('#gallery .grid > div.cursor-pointer').first();
          assert(await roomCard.isVisible(), `Room gallery cards visible under 'Hospitality & Suites' tab`);
        }

        // Test Lightbox open/close
        const allTab = page.locator('#gallery button:has-text("All")');
        if (await allTab.isVisible()) {
          await allTab.click();
          await page.waitForTimeout(300);
        }

        const galleryCard = page.locator('#gallery .grid > div.cursor-pointer').first();
        if (await galleryCard.isVisible()) {
          await galleryCard.click();
          await page.waitForTimeout(500);

          const lightboxClose = page.locator('button[aria-label="Close Lightbox"]');
          const isLightboxOpen = await lightboxClose.isVisible();
          assert(isLightboxOpen, `Gallery lightbox opens on clicking a gallery item`);

          if (isLightboxOpen) {
            await lightboxClose.click({ force: true });
            const lightboxBackdrop = page.locator('.cursor-zoom-out');
            await lightboxBackdrop.waitFor({ state: 'hidden', timeout: 3000 }).catch(() => {});
            const isLightboxClosed = await lightboxBackdrop.isHidden();
            assert(isLightboxClosed, `Gallery lightbox closes on clicking close button`);
          }
        }
      }

      await context.close();
    }

    console.log(`\n========================================`);
    console.log(`TEST SUMMARY:`);
    console.log(`Total assertions: ${totalTests}`);
    console.log(`Passed: ${passedTests}`);
    console.log(`Failed: ${failures.length}`);
    console.log(`========================================\n`);

    if (failures.length > 0) {
      console.error('FAILURES LIST:');
      failures.forEach((f, idx) => console.error(`${idx + 1}. ${f}`));
      process.exit(1);
    } else {
      console.log('ALL TESTS PASSED PERFECTLY!');
      process.exit(0);
    }
  } catch (err) {
    console.error('Fatal error during test execution:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runTests();
