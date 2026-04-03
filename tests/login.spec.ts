import { test, expect } from '../fixtures/testFixtures';

test.describe('Login Page', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('should load login page with correct URL', async ({ loginPage }) => {
    await expect(loginPage.page).toHaveURL(/.*login.*/);
  });

  test('should display all login form elements', async ({ loginPage }) => {
    await loginPage.assertAllElements();
  });

  test('should display email input field', async ({ loginPage }) => {
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.emailInput).toBeEnabled();
  });

  test('should display password input field', async ({ loginPage }) => {
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeEnabled();
    const type = await loginPage.passwordInput.getAttribute('type');
    expect(type).toBe('password');
  });

  test('should display login button', async ({ loginPage }) => {
    await expect(loginPage.loginBtn).toBeVisible();
    await expect(loginPage.loginBtn).toBeEnabled();
  });

  test('should display register link', async ({ loginPage }) => {
    await expect(loginPage.registerLink).toBeVisible();
  });

  test('should display forgot password link', async ({ loginPage }) => {
    await expect(loginPage.forgotPasswordLink).toBeVisible();
  });

  test('should display login form', async ({ loginPage }) => {
    await expect(loginPage.loginForm).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ loginPage }) => {
    await loginPage.login('invalid@test.com', 'wrongpassword');
    await loginPage.assertLoginError();
  });

  test('should show error for empty email', async ({ loginPage }) => {
    await loginPage.login('', 'password123');
    const error = loginPage.errorMessage;
    await expect(error).toBeVisible();
  });

  test('should show error for empty password', async ({ loginPage }) => {
    await loginPage.login('test@test.com', '');
    await expect(loginPage.page).toHaveURL(/.*login.*/);
  });

  test('should successfully login with valid credentials', async ({ loginPage }) => {
    await loginPage.login('customer@practicesoftwaretesting.com', 'welcome01');
    await loginPage.assertSuccessfulLogin();
  });

  test('should navigate to register page via register link', async ({ loginPage }) => {
    await loginPage.registerLink.click();
    await expect(loginPage.page).toHaveURL(/.*register.*/);
  });

  test('should display navigation bar', async ({ loginPage }) => {
    await loginPage.assertNavBarVisible();
  });

  test('should accept email input', async ({ loginPage }) => {
    await loginPage.emailInput.fill('test@example.com');
    await expect(loginPage.emailInput).toHaveValue('test@example.com');
  });

  test('should accept password input', async ({ loginPage }) => {
    await loginPage.passwordInput.fill('testpassword');
    await expect(loginPage.passwordInput).toHaveValue('testpassword');
  });
});
