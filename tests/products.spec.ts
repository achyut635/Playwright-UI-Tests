import { test, expect } from '../fixtures/testFixtures';

test.describe('Products Page', () => {
  test.beforeEach(async ({ productsPage }) => {
    await productsPage.goto();
  });

  test('should display product grid', async ({ productsPage }) => {
    await expect(productsPage.productGrid).toBeVisible();
  });

  test('should display product cards', async ({ productsPage }) => {
    await expect(productsPage.productCards.first()).toBeVisible();
    const count = await productsPage.getProductCount();
    expect(count).toBeGreaterThan(0);
  });

  test('should display product names', async ({ productsPage }) => {
    await expect(productsPage.productNames.first()).toBeVisible();
    const names = await productsPage.productNames.allTextContents();
    names.forEach(name => expect(name.trim().length).toBeGreaterThan(0));
  });

  test('should display product prices', async ({ productsPage }) => {
    await expect(productsPage.productPrices.first()).toBeVisible();
    const prices = await productsPage.productPrices.allTextContents();
    prices.forEach(price => expect(price.trim().length).toBeGreaterThan(0));
  });

  test('should display product images', async ({ productsPage }) => {
    await productsPage.assertProductImagesLoaded();
  });

  test('should display sort dropdown with options', async ({ productsPage }) => {
    await expect(productsPage.sortDropdown).toBeVisible();
    await expect(productsPage.sortDropdown).toBeEnabled();
  });

  test('should sort products by name ascending', async ({ productsPage }) => {
    await productsPage.sortBy('name,asc');
    const names = await productsPage.productNames.allTextContents();
    const sorted = [...names].sort((a, b) => a.localeCompare(b));
    expect(names[0]).toBe(sorted[0]);
  });

  test('should sort products by price ascending', async ({ productsPage }) => {
    await productsPage.sortBy('price,asc');
    const prices = await productsPage.getPricesAsNumbers();
    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
    }
  });

  test('should sort products by price descending', async ({ productsPage }) => {
    await productsPage.sortBy('price,desc');
    const prices = await productsPage.getPricesAsNumbers();
    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1]);
    }
  });

  test('should display pagination controls', async ({ productsPage }) => {
    await expect(productsPage.paginationItems.first()).toBeVisible();
  });

  test('should display filter sidebar', async ({ productsPage }) => {
    await expect(productsPage.categoryCheckboxes.first()).toBeVisible();
  });

  test('should filter products by category', async ({ productsPage }) => {
    const initialCount = await productsPage.getProductCount();
    await productsPage.applyCategoryFilter(0);
    const filteredCount = await productsPage.getProductCount();
    expect(filteredCount).toBeGreaterThan(0);
    expect(filteredCount).toBeLessThanOrEqual(initialCount);
  });

  test('should navigate to product detail when clicking product', async ({ productsPage }) => {
    await productsPage.clickProductByIndex(0);
    await expect(productsPage.page).toHaveURL(/.*product.*/);
  });

  test('should display navigation bar on products page', async ({ productsPage }) => {
    await productsPage.assertNavBarVisible();
  });
});
