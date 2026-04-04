import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';

test.describe('Amazon Smoke Tests', () => {
  test('1. Open the website', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/amazon\.com/);
    await expect(page).toHaveTitle(/Amazon/i);
  });

  test('2. Assert permanent elements on home page', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.assertAllElements();
  });

  test('3. Navigate to cart and assert checkout button', async ({ page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);

    // Search and add first result to cart
    await homePage.goto();
    await homePage.searchFor('notebook');
    await page.locator('[data-component-type="s-search-result"] h2 a').first().click();
    await page.waitForLoadState('domcontentloaded');
    await page.locator('#add-to-cart-button').click();
    await page.waitForLoadState('domcontentloaded');

    // Navigate to cart and assert checkout button
    await cartPage.goto();
    await cartPage.assertCheckoutButton();
  });
});
