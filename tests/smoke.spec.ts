import { test, expect } from '../fixtures/testFixtures';

test.describe('Smoke Test', () => {
  test('1. Open the website', async ({ homePage }) => {
    await homePage.goto();
    await expect(homePage.page).toHaveURL(/practicesoftwaretesting\.com/);
    await expect(homePage.page).toHaveTitle(/.*Practice Software Testing.*/i);
  });

  test('2. Assert all elements', async ({ homePage }) => {
    await homePage.goto();
    await homePage.assertAllElements();
  });

  test('3. Exit the site', async ({ homePage }) => {
    await homePage.goto();
    await homePage.page.goto('about:blank');
    await expect(homePage.page).toHaveURL('about:blank');
  });
});
