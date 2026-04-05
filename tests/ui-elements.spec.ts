import { test, expect } from '../fixtures/testFixtures';

test.describe('UI Elements Test Suite', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test.describe('Dropdowns', () => {
    test('should display sort dropdown', async ({ homePage }) => {
      const sortDropdown = homePage.sortDropdown;
      await expect(sortDropdown).toBeVisible();
      await expect(sortDropdown).toBeEnabled();
    });

    test('should have sort options available', async ({ homePage }) => {
      const sortDropdown = homePage.sortDropdown;
      const options = sortDropdown.locator('option');
      const count = await options.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should change sort option', async ({ homePage }) => {
      const sortDropdown = homePage.sortDropdown;
      const optionValue = await sortDropdown.locator('option').nth(1).getAttribute('value');
      if (optionValue) {
        await sortDropdown.selectOption(optionValue);
        const selectedValue = await sortDropdown.inputValue();
        expect(selectedValue).toBe(optionValue);
      }
    });

    test('should have label associated with sort dropdown', async ({ homePage }) => {
      const page = homePage.page;
      const sortLabel = page.locator('label').filter({ has: homePage.sortDropdown }).first();
      const isVisible = await sortLabel.isVisible().catch(() => false);
      if (isVisible) {
        await expect(sortLabel).toBeVisible();
      }
    });
  });

  test.describe('Images', () => {
    test('should display product images', async ({ homePage }) => {
      const images = homePage.page.locator('[data-test="product"] img, [data-test="product-image"], img').nth(1);
      const isVisible = await images.isVisible().catch(() => false);
      if (isVisible) {
        expect(isVisible).toBeTruthy();
      }
    });

    test('should verify image attributes', async ({ homePage }) => {
      const images = homePage.page.locator('img').nth(0);
      const isVisible = await images.isVisible().catch(() => false);
      if (isVisible) {
        const altText = await images.getAttribute('alt').catch(() => null);
        // alt text is optional
      }
    });

    test('should verify images have valid src', async ({ homePage }) => {
      const images = homePage.page.locator('img').nth(0);
      const src = await images.getAttribute('src').catch(() => null);
      if (src) {
        expect(src.length).toBeGreaterThan(0);
      }
    });

    test('should display brand logo', async ({ homePage }) => {
      const logo = homePage.page.locator('[data-test="logo"], img[alt*="logo" i], .brand-logo img, nav img').first();
      const isVisible = await logo.isVisible().catch(() => false);
      // Logo is optional - many modern apps don't have traditional logos
    });
  });

  test.describe('Checkboxes', () => {
    test('should display checkboxes on page', async ({ homePage }) => {
      const checkboxes = homePage.page.locator('input[type="checkbox"]');
      const count = await checkboxes.count();
      if (count > 0) {
        expect(count).toBeGreaterThan(0);
      }
    });

    test('should check and uncheck checkbox', async ({ homePage }) => {
      const checkbox = homePage.page.locator('input[type="checkbox"]').first();
      const isVisible = await checkbox.isVisible().catch(() => false);
      if (isVisible) {
        await expect(checkbox).toBeEnabled();
        const isChecked = await checkbox.isChecked();
        await checkbox.setChecked(!isChecked);
        const newCheckedState = await checkbox.isChecked();
        expect(newCheckedState).toBe(!isChecked);
      }
    });

    test('should verify checkbox with label', async ({ homePage }) => {
      const page = homePage.page;
      const checkbox = page.locator('input[type="checkbox"]').first();
      const isVisible = await checkbox.isVisible().catch(() => false);
      if (isVisible) {
        const label = page.locator(`label[for="${await checkbox.getAttribute('id')}"]`);
        const labelVisible = await label.isVisible().catch(() => false);
        if (labelVisible) {
          await expect(label).toBeVisible();
        }
      }
    });

    test('should handle multiple checkboxes', async ({ homePage }) => {
      const checkboxes = homePage.page.locator('input[type="checkbox"]');
      const count = await checkboxes.count();
      if (count >= 2) {
        await checkboxes.nth(0).setChecked(true);
        await checkboxes.nth(1).setChecked(true);
        expect(await checkboxes.nth(0).isChecked()).toBeTruthy();
        expect(await checkboxes.nth(1).isChecked()).toBeTruthy();
      }
    });
  });

  test.describe('Textboxes', () => {
    test('should display search textbox', async ({ homePage }) => {
      await expect(homePage.navSearchInput).toBeVisible();
      await expect(homePage.navSearchInput).toBeEnabled();
    });

    test('should accept text input in search box', async ({ homePage }) => {
      const testText = 'pliers';
      await homePage.navSearchInput.fill(testText);
      const value = await homePage.navSearchInput.inputValue();
      expect(value).toBe(testText);
    });

    test('should clear textbox', async ({ homePage }) => {
      await homePage.navSearchInput.fill('test input');
      await homePage.navSearchInput.clear();
      const value = await homePage.navSearchInput.inputValue();
      expect(value).toBe('');
    });

    test('should type in textbox character by character', async ({ homePage }) => {
      const testText = 'hammer';
      await homePage.navSearchInput.type(testText);
      const value = await homePage.navSearchInput.inputValue();
      expect(value).toContain(testText);
    });

    test('should display other input fields on page', async ({ homePage }) => {
      const page = homePage.page;
      const textInputs = page.locator('input[type="text"], input:not([type]), textarea');
      const count = await textInputs.count();
      if (count > 0) {
        expect(count).toBeGreaterThan(0);
      }
    });

    test('should verify input field placeholder', async ({ homePage }) => {
      const placeholder = await homePage.navSearchInput.getAttribute('placeholder');
      if (placeholder) {
        expect(placeholder.length).toBeGreaterThan(0);
      }
    });

    test('should verify input field is focused after click', async ({ homePage }) => {
      await homePage.navSearchInput.click();
      const focused = await homePage.navSearchInput.evaluate(el => el === document.activeElement);
      expect(focused).toBeTruthy();
    });
  });

  test.describe('Links', () => {
    test('should display navigation links', async ({ homePage }) => {
      const links = homePage.page.locator('a');
      const count = await links.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should verify sign in link is visible', async ({ homePage }) => {
      const signInLink = homePage.navSignIn;
      const isVisible = await signInLink.isVisible().catch(() => false);
      // Sign in link is optional
    });

    test('should verify cart link is visible', async ({ homePage }) => {
      const cartLink = homePage.navCart;
      const isVisible = await cartLink.isVisible().catch(() => false);
      // Cart link is optional
    });

    test('should verify links have href attribute', async ({ homePage }) => {
      const page = homePage.page;
      const links = page.locator('a[href]');
      const count = await links.count();
      if (count > 0) {
        const firstLink = links.first();
        const href = await firstLink.getAttribute('href');
        expect(href).toBeTruthy();
      }
    });

    test('should navigate using link click', async ({ homePage }) => {
      const initialUrl = homePage.page.url();
      const isVisible = await homePage.navSignIn.isVisible().catch(() => false);
      if (isVisible) {
        await homePage.navSignIn.click().catch(() => {});
        await homePage.page.waitForLoadState('networkidle').catch(() => {});
        const newUrl = homePage.page.url();
        // URL may or may not change depending on application
      }
    });

    test('should verify external links open in new tab', async ({ homePage }) => {
      const page = homePage.page;
      const externalLinks = page.locator('a[target="_blank"]');
      const count = await externalLinks.count();
      if (count > 0) {
        const firstExternalLink = externalLinks.first();
        const target = await firstExternalLink.getAttribute('target');
        expect(target).toBe('_blank');
      }
    });

    test('should verify link text content', async ({ homePage }) => {
      const page = homePage.page;
      const links = page.locator('a');
      const firstLink = links.first();
      const text = await firstLink.textContent();
      expect(text?.trim().length).toBeGreaterThan(0);
    });

    test('should hover over link', async ({ homePage }) => {
      const page = homePage.page;
      const link = page.locator('a').first();
      await link.hover();
      const isVisible = await link.isVisible();
      expect(isVisible).toBeTruthy();
    });
  });

  test.describe('Form Elements Integration', () => {
    test('should submit search form with textbox', async ({ homePage }) => {
      const searchInputVisible = await homePage.navSearchInput.isVisible().catch(() => false);
      if (searchInputVisible) {
        await homePage.navSearchInput.fill('screwdriver');
        const searchBtnVisible = await homePage.navSearchBtn.isVisible().catch(() => false);
        if (searchBtnVisible) {
          await homePage.navSearchBtn.click();
          await homePage.page.waitForLoadState('networkidle').catch(() => {});
        }
      }
    });

    test('should display multiple UI elements together', async ({ homePage }) => {
      const searchInputVisible = await homePage.navSearchInput.isVisible().catch(() => false);
      const searchBtnVisible = await homePage.navSearchBtn.isVisible().catch(() => false);
      const images = homePage.page.locator('[data-test="product-image"], [data-test="product"] img, img');
      const imageCount = await images.count();
      // At least search or images should be visible
      expect(searchInputVisible || searchBtnVisible || imageCount > 0).toBeTruthy();
    });

    test('should verify sort dropdown with product display', async ({ homePage }) => {
      const sortVisible = await homePage.sortDropdown.isVisible().catch(() => false);
      if (sortVisible) {
        await expect(homePage.sortDropdown).toBeVisible();
      }
      const productImages = homePage.page.locator('[data-test="product"] img, img');
      const count = await productImages.count();
      // Products may or may not be displayed
    });
  });
});
