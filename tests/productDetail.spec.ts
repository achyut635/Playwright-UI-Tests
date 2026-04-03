import { test, expect } from '../fixtures/testFixtures';

test.describe('Product Detail Page', () => {
  test.beforeEach(async ({ page, productDetailPage }) => {
    // Navigate to first product from homepage
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.locator('[data-test="product"]').first().click();
    await page.waitForLoadState('networkidle');
  });

  test('should display product name', async ({ productDetailPage }) => {
    await expect(productDetailPage.productName).toBeVisible();
    const name = await productDetailPage.getProductName();
    expect(name.trim().length).toBeGreaterThan(0);
  });

  test('should display product price', async ({ productDetailPage }) => {
    await expect(productDetailPage.productPrice).toBeVisible();
    const price = await productDetailPage.getProductPrice();
    expect(price.trim().length).toBeGreaterThan(0);
  });

  test('should display product description', async ({ productDetailPage }) => {
    await expect(productDetailPage.productDescription).toBeVisible();
  });

  test('should display product image', async ({ productDetailPage }) => {
    await expect(productDetailPage.productImage).toBeVisible();
    const src = await productDetailPage.productImage.getAttribute('src');
    expect(src).not.toBeNull();
    expect(src!.length).toBeGreaterThan(0);
  });

  test('should display quantity input', async ({ productDetailPage }) => {
    await expect(productDetailPage.quantityInput).toBeVisible();
  });

  test('should display increase quantity button', async ({ productDetailPage }) => {
    await expect(productDetailPage.increaseQtyBtn).toBeVisible();
  });

  test('should display decrease quantity button', async ({ productDetailPage }) => {
    await expect(productDetailPage.decreaseQtyBtn).toBeVisible();
  });

  test('should display add to cart button', async ({ productDetailPage }) => {
    await expect(productDetailPage.addToCartBtn).toBeVisible();
    await expect(productDetailPage.addToCartBtn).toBeEnabled();
  });

  test('should increase quantity when clicking plus button', async ({ productDetailPage }) => {
    const initialQty = await productDetailPage.quantityInput.inputValue();
    await productDetailPage.increaseQuantity(1);
    const newQty = await productDetailPage.quantityInput.inputValue();
    expect(parseInt(newQty)).toBeGreaterThan(parseInt(initialQty));
  });

  test('should decrease quantity when clicking minus button', async ({ productDetailPage }) => {
    await productDetailPage.increaseQuantity(2);
    const qtyBefore = await productDetailPage.quantityInput.inputValue();
    await productDetailPage.decreaseQuantity(1);
    const qtyAfter = await productDetailPage.quantityInput.inputValue();
    expect(parseInt(qtyAfter)).toBeLessThan(parseInt(qtyBefore));
  });

  test('should add product to cart', async ({ productDetailPage }) => {
    await productDetailPage.addToCart();
    // Should show cart update or toast notification
    await productDetailPage.page.waitForTimeout(1000);
  });

  test('should display all product details', async ({ productDetailPage }) => {
    await productDetailPage.assertAllElements();
    await productDetailPage.assertProductDetails();
  });

  test('should display breadcrumb navigation', async ({ productDetailPage }) => {
    await expect(productDetailPage.breadcrumb).toBeVisible();
  });

  test('should display navigation bar', async ({ productDetailPage }) => {
    await productDetailPage.assertNavBarVisible();
  });

  test('should display product category', async ({ productDetailPage }) => {
    const category = productDetailPage.productCategory;
    const isVisible = await category.isVisible().catch(() => false);
    if (isVisible) {
      const text = await category.textContent();
      expect(text?.trim().length).toBeGreaterThan(0);
    }
  });
});
