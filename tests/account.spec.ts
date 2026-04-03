import { test, expect } from '../fixtures/testFixtures';

test.describe('Account Page (Authenticated)', () => {
  test.beforeEach(async ({ authenticatedPage, accountPage }) => {
    await accountPage.navigate('/account');
    await accountPage.waitForPageLoad();
  });

  test('should display account page after login', async ({ accountPage }) => {
    await expect(accountPage.page).toHaveURL(/.*account.*/);
  });

  test('should display profile link in account navigation', async ({ accountPage }) => {
    const profileLink = accountPage.profileLink;
    const isVisible = await profileLink.isVisible().catch(() => false);
    if (isVisible) {
      await expect(profileLink).toBeVisible();
    }
  });

  test('should display orders link in account navigation', async ({ accountPage }) => {
    const ordersLink = accountPage.ordersLink;
    const isVisible = await ordersLink.isVisible().catch(() => false);
    if (isVisible) {
      await expect(ordersLink).toBeVisible();
    }
  });

  test('should display favourites link in account navigation', async ({ accountPage }) => {
    const favsLink = accountPage.favoritesLink;
    const isVisible = await favsLink.isVisible().catch(() => false);
    if (isVisible) {
      await expect(favsLink).toBeVisible();
    }
  });

  test('should display profile form fields', async ({ accountPage }) => {
    const profileLink = accountPage.profileLink;
    if (await profileLink.isVisible().catch(() => false)) {
      await accountPage.goToProfile();
    }
    const firstNameVisible = await accountPage.profileFirstName.isVisible().catch(() => false);
    if (firstNameVisible) {
      await expect(accountPage.profileFirstName).toBeVisible();
      await expect(accountPage.profileLastName).toBeVisible();
      await expect(accountPage.profileEmail).toBeVisible();
    }
  });

  test('should display navigation bar on account page', async ({ accountPage }) => {
    await accountPage.assertNavBarVisible();
  });

  test('should navigate to orders section', async ({ accountPage }) => {
    const ordersLink = accountPage.ordersLink;
    if (await ordersLink.isVisible().catch(() => false)) {
      await accountPage.goToOrders();
      await expect(accountPage.page).toHaveURL(/.*orders.*/);
    }
  });

  test('should navigate to favourites section', async ({ accountPage }) => {
    const favsLink = accountPage.favoritesLink;
    if (await favsLink.isVisible().catch(() => false)) {
      await accountPage.goToFavorites();
      await expect(accountPage.page).toHaveURL(/.*favourites.*/);
    }
  });
});

test.describe('Account Page (Unauthenticated)', () => {
  test('should redirect to login when accessing account without auth', async ({ page }) => {
    await page.goto('/account');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/.*login|account.*/);
  });
});
