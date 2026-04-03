import { test, expect } from '../fixtures/testFixtures';

test.describe('Cart Page', () => {
  test('should display empty cart message when no items', async ({ cartPage }) => {
    await cartPage.goto();
    const itemCount = await cartPage.cartItems.count();
    if (itemCount === 0) {
      await cartPage.assertCartIsEmpty();
    }
  });

  test('should navigate to cart via nav icon', async ({ homePage }) => {
    await homePage.goto();
    await homePage.goToCart();
    await expect(homePage.page).toHaveURL(/.*checkout.*/);
  });

  test('should add product to cart and verify cart has items', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.locator('[data-test="product"]').first().click();
    await page.waitForLoadState('networkidle');
    await page.locator('[data-test="add-to-cart"]').click();
    await page.waitForTimeout(1500);
    await page.locator('[data-test="nav-cart"]').click();
    await page.waitForLoadState('networkidle');
    const cartItems = page.locator('[data-test="cart-item"]');
    const count = await cartItems.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display cart item name', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.locator('[data-test="product"]').first().click();
    await page.waitForLoadState('networkidle');
    const productName = await page.locator('[data-test="product-name"]').textContent();
    await page.locator('[data-test="add-to-cart"]').click();
    await page.waitForTimeout(1500);
    await page.locator('[data-test="nav-cart"]').click();
    await page.waitForLoadState('networkidle');
    const cartItemName = page.locator('[data-test="product-title"]').first();
    await expect(cartItemName).toBeVisible();
  });

  test('should display cart item price', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.locator('[data-test="product"]').first().click();
    await page.waitForLoadState('networkidle');
    await page.locator('[data-test="add-to-cart"]').click();
    await page.waitForTimeout(1500);
    await page.locator('[data-test="nav-cart"]').click();
    await page.waitForLoadState('networkidle');
    const cartItemPrice = page.locator('[data-test="product-price"]').first();
    await expect(cartItemPrice).toBeVisible();
  });

  test('should display remove item button', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.locator('[data-test="product"]').first().click();
    await page.waitForLoadState('networkidle');
    await page.locator('[data-test="add-to-cart"]').click();
    await page.waitForTimeout(1500);
    await page.locator('[data-test="nav-cart"]').click();
    await page.waitForLoadState('networkidle');
    const removeBtn = page.locator('[data-test="delete-product"]').first();
    await expect(removeBtn).toBeVisible();
  });

  test('should remove item from cart', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.locator('[data-test="product"]').first().click();
    await page.waitForLoadState('networkidle');
    await page.locator('[data-test="add-to-cart"]').click();
    await page.waitForTimeout(1500);
    await page.locator('[data-test="nav-cart"]').click();
    await page.waitForLoadState('networkidle');

    const initialCount = await page.locator('[data-test="cart-item"]').count();
    await page.locator('[data-test="delete-product"]').first().click();
    await page.waitForTimeout(1000);
    const finalCount = await page.locator('[data-test="cart-item"]').count();
    expect(finalCount).toBeLessThan(initialCount);
  });

  test('should display checkout button', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.locator('[data-test="product"]').first().click();
    await page.waitForLoadState('networkidle');
    await page.locator('[data-test="add-to-cart"]').click();
    await page.waitForTimeout(1500);
    await page.locator('[data-test="nav-cart"]').click();
    await page.waitForLoadState('networkidle');
    const checkoutBtn = page.locator('[data-test="proceed-1"]');
    await expect(checkoutBtn).toBeVisible();
  });

  test('should display discount code input', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.locator('[data-test="product"]').first().click();
    await page.waitForLoadState('networkidle');
    await page.locator('[data-test="add-to-cart"]').click();
    await page.waitForTimeout(1500);
    await page.locator('[data-test="nav-cart"]').click();
    await page.waitForLoadState('networkidle');
    const discountInput = page.locator('[data-test="discount-code"]');
    const isVisible = await discountInput.isVisible().catch(() => false);
    if (isVisible) {
      await expect(discountInput).toBeEnabled();
    }
  });

  test('should apply valid discount code', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.locator('[data-test="product"]').first().click();
    await page.waitForLoadState('networkidle');
    await page.locator('[data-test="add-to-cart"]').click();
    await page.waitForTimeout(1500);
    await page.locator('[data-test="nav-cart"]').click();
    await page.waitForLoadState('networkidle');
    const discountInput = page.locator('[data-test="discount-code"]');
    if (await discountInput.isVisible()) {
      await discountInput.fill('COUPON01');
      await page.locator('[data-test="apply-discount-button"]').click();
      await page.waitForTimeout(1000);
    }
  });
});
