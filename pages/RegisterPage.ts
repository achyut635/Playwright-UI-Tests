import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class RegisterPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly dobInput: Locator;
  readonly addressInput: Locator;
  readonly postcodeInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly countrySelect: Locator;
  readonly phoneInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly registerBtn: Locator;
  readonly registerForm: Locator;
  readonly pageHeading: Locator;
  readonly loginLink: Locator;
  readonly errorMessages: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput  = page.locator('[data-test="first-name"]');
    this.lastNameInput   = page.locator('[data-test="last-name"]');
    this.dobInput        = page.locator('[data-test="dob"]');
    this.addressInput    = page.locator('[data-test="address"]');
    this.postcodeInput   = page.locator('[data-test="postcode"]');
    this.cityInput       = page.locator('[data-test="city"]');
    this.stateInput      = page.locator('[data-test="state"]');
    this.countrySelect   = page.locator('[data-test="country"]');
    this.phoneInput      = page.locator('[data-test="phone"]');
    this.emailInput      = page.locator('[data-test="email"]');
    this.passwordInput   = page.locator('[data-test="password"]');
    this.registerBtn     = page.locator('[data-test="register-submit"]');
    this.registerForm    = page.locator('form');
    this.pageHeading     = page.locator('h3, h2, h1').first();
    this.loginLink       = page.locator('[data-test="login-link"]');
    this.errorMessages   = page.locator('.alert-danger, [data-test="error"]');
    this.successMessage  = page.locator('.alert-success, [data-test="success"]');
  }

  async goto() {
    await this.navigate('/auth/register');
    await this.waitForPageLoad();
  }

  async assertAllElements() {
    await expect(this.page).toHaveURL(/.*register.*/);
    await this.assertNavBarVisible();
    await expect(this.registerForm).toBeVisible();
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.registerBtn).toBeVisible();
  }

  async fillRegistrationForm(data: {
    firstName: string;
    lastName: string;
    dob: string;
    address: string;
    postcode: string;
    city: string;
    state: string;
    country: string;
    phone: string;
    email: string;
    password: string;
  }) {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.dobInput.fill(data.dob);
    await this.addressInput.fill(data.address);
    await this.postcodeInput.fill(data.postcode);
    await this.cityInput.fill(data.city);
    await this.stateInput.fill(data.state);
    await this.countrySelect.selectOption(data.country);
    await this.phoneInput.fill(data.phone);
    await this.emailInput.fill(data.email);
    await this.passwordInput.fill(data.password);
  }

  async submit() {
    await this.registerBtn.click();
    await this.waitForPageLoad();
  }
}
