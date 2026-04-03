import { test, expect } from '../fixtures/testFixtures';
import { generateRandomEmail } from '../utils/testHelper';

test.describe('Register Page', () => {
  test.beforeEach(async ({ registerPage }) => {
    await registerPage.goto();
  });

  test('should load register page with correct URL', async ({ registerPage }) => {
    await expect(registerPage.page).toHaveURL(/.*register.*/);
  });

  test('should display all registration form elements', async ({ registerPage }) => {
    await registerPage.assertAllElements();
  });

  test('should display first name input', async ({ registerPage }) => {
    await expect(registerPage.firstNameInput).toBeVisible();
    await expect(registerPage.firstNameInput).toBeEnabled();
  });

  test('should display last name input', async ({ registerPage }) => {
    await expect(registerPage.lastNameInput).toBeVisible();
    await expect(registerPage.lastNameInput).toBeEnabled();
  });

  test('should display date of birth input', async ({ registerPage }) => {
    await expect(registerPage.dobInput).toBeVisible();
  });

  test('should display address input', async ({ registerPage }) => {
    await expect(registerPage.addressInput).toBeVisible();
  });

  test('should display postcode input', async ({ registerPage }) => {
    await expect(registerPage.postcodeInput).toBeVisible();
  });

  test('should display city input', async ({ registerPage }) => {
    await expect(registerPage.cityInput).toBeVisible();
  });

  test('should display state input', async ({ registerPage }) => {
    await expect(registerPage.stateInput).toBeVisible();
  });

  test('should display country select', async ({ registerPage }) => {
    await expect(registerPage.countrySelect).toBeVisible();
  });

  test('should display phone input', async ({ registerPage }) => {
    await expect(registerPage.phoneInput).toBeVisible();
  });

  test('should display email input', async ({ registerPage }) => {
    await expect(registerPage.emailInput).toBeVisible();
  });

  test('should display password input of type password', async ({ registerPage }) => {
    await expect(registerPage.passwordInput).toBeVisible();
    const type = await registerPage.passwordInput.getAttribute('type');
    expect(type).toBe('password');
  });

  test('should display register button', async ({ registerPage }) => {
    await expect(registerPage.registerBtn).toBeVisible();
    await expect(registerPage.registerBtn).toBeEnabled();
  });

  test('should show validation errors for empty form submission', async ({ registerPage }) => {
    await registerPage.submit();
    await expect(registerPage.errorMessages.first()).toBeVisible();
  });

  test('should successfully register a new user', async ({ registerPage }) => {
    const uniqueEmail = generateRandomEmail();
    await registerPage.fillRegistrationForm({
      firstName: 'Test',
      lastName: 'User',
      dob: '1990-01-15',
      address: '123 Test Street',
      postcode: '12345',
      city: 'Test City',
      state: 'Test State',
      country: 'US',
      phone: '+1234567890',
      email: uniqueEmail,
      password: 'SecurePass123!',
    });
    await registerPage.submit();
    // After successful registration, should redirect to login or show success
    const currentUrl = registerPage.page.url();
    expect(currentUrl).not.toContain('/auth/register');
  });

  test('should display navigation bar', async ({ registerPage }) => {
    await registerPage.assertNavBarVisible();
  });

  test('should display login link', async ({ registerPage }) => {
    await expect(registerPage.loginLink).toBeVisible();
  });

  test('should navigate to login from register page', async ({ registerPage }) => {
    await registerPage.loginLink.click();
    await expect(registerPage.page).toHaveURL(/.*login.*/);
  });
});
