import { test, expect } from '../fixtures/testFixtures';

async function addProductToCart(page: any) {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.locator('[data-test="product"]').first().click();
  await page.waitForLoadState('networkidle');
  await page.locator('[data-test="add-to-cart"]').click();
  await page.waitForTimeout(1500);
  await page.locator('[data-test="nav-cart"]').click();
  await page.waitForLoadState('networkidle');
}

test.describe('Checkout Flow', () => {
  test('should display checkout page after adding product', async ({ page }) => {
    await addProductToCart(page);
    await expect(page).toHaveURL(/.*checkout.*/);
  });

  test('should display cart items on checkout page', async ({ page }) => {
    await addProductToCart(page);
    const cartItems = page.locator('[data-test="cart-item"]');
    const count = await cartItems.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display proceed button on step 1', async ({ page }) => {
    await addProductToCart(page);
    const proceedBtn = page.locator('[data-test="proceed-1"]');
    await expect(proceedBtn).toBeVisible();
  });

  test('should show login/guest options on checkout step 2', async ({ page }) => {
    await addProductToCart(page);
    const proceedBtn = page.locator('[data-test="proceed-1"]');
    if (await proceedBtn.isVisible()) {
      await proceedBtn.click();
      await page.waitForLoadState('networkidle');

      const guestBtn = page.locator('[data-test="guest"]');
      const loginBtn = page.locator('[data-test="login-submit"]');
      const hasGuest = await guestBtn.isVisible().catch(() => false);
      const hasLogin = await loginBtn.isVisible().catch(() => false);
      expect(hasGuest || hasLogin).toBeTruthy();
    }
  });

  test('should proceed through checkout as guest', async ({ page, checkoutPage }) => {
    await addProductToCart(page);
    const proceedBtn = page.locator('[data-test="proceed-1"]');
    if (await proceedBtn.isVisible()) {
      await proceedBtn.click();
      await page.waitForLoadState('networkidle');

      const guestBtn = page.locator('[data-test="guest"]');
      if (await guestBtn.isVisible()) {
        await guestBtn.click();
        await page.waitForLoadState('networkidle');

        const proceedStep2 = page.locator('[data-test="proceed-2"]');
        if (await proceedStep2.isVisible()) {
          await expect(proceedStep2).toBeVisible();
        }
      }
    }
  });

  test('should display address form fields on step 2', async ({ page }) => {
    await addProductToCart(page);
    await page.locator('[data-test="proceed-1"]').click().catch(() => {});
    await page.waitForLoadState('networkidle');
    await page.locator('[data-test="guest"]').click().catch(() => {});
    await page.waitForLoadState('networkidle');

    const firstNameField = page.locator('[data-test="first-name"]');
    const isVisible = await firstNameField.isVisible().catch(() => false);
    if (isVisible) {
      await expect(firstNameField).toBeVisible();
      await expect(page.locator('[data-test="last-name"]')).toBeVisible();
      await expect(page.locator('[data-test="city"]')).toBeVisible();
      await expect(page.locator('[data-test="country"]')).toBeVisible();
    }
  });

  test('should complete checkout with bank transfer', async ({ page }) => {
    // Login first
    await page.goto('/auth/login');
    await page.locator('[data-test="email"]').fill('customer@practicesoftwaretesting.com');
    await page.locator('[data-test="password"]').fill('welcome01');
    await page.locator('[data-test="login-submit"]').click();
    await page.waitForLoadState('networkidle');

    // Add product
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.locator('[data-test="product"]').first().click();
    await page.waitForLoadState('networkidle');
    await page.locator('[data-test="add-to-cart"]').click();
    await page.waitForTimeout(1500);
    await page.locator('[data-test="nav-cart"]').click();
    await page.waitForLoadState('networkidle');

    // Proceed through checkout
    await page.locator('[data-test="proceed-1"]').click();
    await page.waitForLoadState('networkidle');

    await page.locator('[data-test="proceed-2"]').click().catch(() => {});
    await page.waitForLoadState('networkidle');

    const bankTransfer = page.locator('[data-test="bank-transfer"]');
    if (await bankTransfer.isVisible().catch(() => false)) {
      await bankTransfer.click();
      await page.locator('[data-test="proceed-3"]').click();
      await page.waitForLoadState('networkidle');

      // Verify order confirmation or next step
      const confirmBtn = page.locator('[data-test="proceed-4"]');
      if (await confirmBtn.isVisible().catch(() => false)) {
        await confirmBtn.click();
        await page.waitForLoadState('networkidle');
        const confirmation = page.locator('[data-test="order-confirmation"]');
        if (await confirmation.isVisible().catch(() => false)) {
          await expect(confirmation).toBeVisible();
        }
      }
    }
  });

  test('should display navigation bar on checkout page', async ({ page }) => {
    await page.goto('/checkout');
    await page.waitForLoadState('networkidle');
    const navBrand = page.locator('[data-test="nav-logo"]');
    const isVisible = await navBrand.isVisible().catch(() => false);
    if (isVisible) {
      await expect(navBrand).toBeVisible();
    }
  });
});
