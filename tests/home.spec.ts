import { test, expect } from '../fixtures/testFixtures';

test.describe('Home Page', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test('should load home page with correct title', async ({ homePage }) => {
    await expect(homePage.page).toHaveTitle(/.*Practice Software Testing.*/i);
  });

  test('should display navigation bar with all elements', async ({ homePage }) => {
    await homePage.assertNavBarVisible();
    await expect(homePage.navHome).toBeVisible();
    await expect(homePage.navCategories).toBeVisible();
    await expect(homePage.navContact).toBeVisible();
    await expect(homePage.navSignIn).toBeVisible();
    await expect(homePage.navCart).toBeVisible();
  });

  test('should display search bar in navigation', async ({ homePage }) => {
    await expect(homePage.navSearchInput).toBeVisible();
    await expect(homePage.navSearchBtn).toBeVisible();
  });

  test('should display product grid with products', async ({ homePage }) => {
    await homePage.assertAllElements();
    await homePage.assertProductCount(1);
  });

  test('should display product names and prices', async ({ homePage }) => {
    await expect(homePage.productNames.first()).toBeVisible();
    await expect(homePage.productPrices.first()).toBeVisible();
    const productName = await homePage.getProductName(0);
    expect(productName.trim().length).toBeGreaterThan(0);
    const productPrice = await homePage.getProductPrice(0);
    expect(productPrice.trim().length).toBeGreaterThan(0);
  });

  test('should display sort dropdown', async ({ homePage }) => {
    await expect(homePage.sortDropdown).toBeVisible();
  });

  test('should display pagination', async ({ homePage }) => {
    await expect(homePage.paginationContainer).toBeVisible();
  });

  test('should sort products by name A-Z', async ({ homePage }) => {
    await homePage.sortBy('name,asc');
    await expect(homePage.productCards.first()).toBeVisible();
  });

  test('should sort products by name Z-A', async ({ homePage }) => {
    await homePage.sortBy('name,desc');
    await expect(homePage.productCards.first()).toBeVisible();
  });

  test('should sort products by price low to high', async ({ homePage }) => {
    await homePage.sortBy('price,asc');
    await expect(homePage.productCards.first()).toBeVisible();
  });

  test('should sort products by price high to low', async ({ homePage }) => {
    await homePage.sortBy('price,desc');
    await expect(homePage.productCards.first()).toBeVisible();
  });

  test('should navigate to next page via pagination', async ({ homePage }) => {
    await homePage.goToNextPage();
    await expect(homePage.productCards.first()).toBeVisible();
  });

  test('should navigate to product detail page when clicking a product', async ({ homePage }) => {
    await homePage.clickProduct(0);
    await expect(homePage.page).not.toHaveURL('/');
  });

  test('should perform a search from navigation bar', async ({ homePage }) => {
    await homePage.search('pliers');
    await expect(homePage.page).toHaveURL(/.*search.*/);
    await expect(homePage.productCards.first()).toBeVisible();
  });

  test('should navigate to cart when clicking cart icon', async ({ homePage }) => {
    await homePage.goToCart();
    await expect(homePage.page).toHaveURL(/.*checkout.*/);
  });

  test('should navigate to sign in when clicking sign in', async ({ homePage }) => {
    await homePage.goToSignIn();
    await expect(homePage.page).toHaveURL(/.*login.*/);
  });

  test('should show language selector in nav', async ({ homePage }) => {
    await expect(homePage.navLanguage).toBeVisible();
  });
});
