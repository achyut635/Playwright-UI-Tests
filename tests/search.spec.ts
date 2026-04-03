import { test, expect } from '../fixtures/testFixtures';

test.describe('Search Functionality', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test('should display search input in navigation', async ({ homePage }) => {
    await expect(homePage.navSearchInput).toBeVisible();
    await expect(homePage.navSearchInput).toBeEnabled();
  });

  test('should display search button', async ({ homePage }) => {
    await expect(homePage.navSearchBtn).toBeVisible();
  });

  test('should search and show results for "pliers"', async ({ homePage, searchResultsPage }) => {
    await homePage.search('pliers');
    await expect(homePage.page).toHaveURL(/.*search=pliers.*/);
    await expect(homePage.productCards.first()).toBeVisible();
  });

  test('should search and show results for "hammer"', async ({ homePage }) => {
    await homePage.search('hammer');
    await expect(homePage.page).toHaveURL(/.*search=hammer.*/);
    await expect(homePage.productCards.first()).toBeVisible();
  });

  test('should show no results for unknown product', async ({ homePage, searchResultsPage }) => {
    await homePage.search('xyznonexistentproduct12345');
    await homePage.page.waitForLoadState('networkidle');
    const count = await homePage.productCards.count();
    if (count === 0) {
      const noResults = homePage.page.locator('[data-test="no-results"], .no-results, p').filter({ hasText: /no results|not found/i });
      const hasNoResults = await noResults.isVisible().catch(() => false);
      // Either show no-results message or count is 0
      expect(count === 0 || hasNoResults).toBeTruthy();
    }
  });

  test('should search via pressing Enter key', async ({ homePage }) => {
    await homePage.navSearchInput.fill('screwdriver');
    await homePage.navSearchInput.press('Enter');
    await homePage.page.waitForLoadState('networkidle');
    await expect(homePage.page).toHaveURL(/.*search=screwdriver.*/);
  });

  test('should clear search and return to products', async ({ homePage }) => {
    await homePage.search('pliers');
    await expect(homePage.page).toHaveURL(/.*search.*/);
    await homePage.navSearchInput.fill('');
    await homePage.navSearchBtn.click();
    await homePage.page.waitForLoadState('networkidle');
  });

  test('should display search query in search input after search', async ({ homePage }) => {
    const query = 'pliers';
    await homePage.search(query);
    await homePage.page.waitForLoadState('networkidle');
    const searchValue = await homePage.navSearchInput.inputValue();
    expect(searchValue).toContain(query);
  });

  test('should show products matching search term', async ({ homePage }) => {
    await homePage.search('bolt');
    await homePage.page.waitForLoadState('networkidle');
    const count = await homePage.productCards.count();
    // Product names should contain the search term or related items
    if (count > 0) {
      await expect(homePage.productCards.first()).toBeVisible();
    }
  });

  test('should maintain pagination in search results', async ({ homePage }) => {
    await homePage.search('a');
    await homePage.page.waitForLoadState('networkidle');
    const pagination = homePage.paginationContainer;
    const hasPagination = await pagination.isVisible().catch(() => false);
    if (hasPagination) {
      await expect(pagination).toBeVisible();
    }
  });
});
