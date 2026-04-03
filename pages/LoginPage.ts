import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginBtn: Locator;
  readonly registerLink: Locator;
  readonly forgotPasswordLink: Locator;
  readonly errorMessage: Locator;
  readonly loginForm: Locator;
  readonly pageHeading: Locator;
  readonly emailLabel: Locator;
  readonly passwordLabel: Locator;
  readonly rememberMe: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput        = page.locator('[data-test="email"]');
    this.passwordInput     = page.locator('[data-test="password"]');
    this.loginBtn          = page.locator('[data-test="login-submit"]');
    this.registerLink      = page.locator('[data-test="register-link"]');
    this.forgotPasswordLink = page.locator('[data-test="forgot-password-link"]');
    this.errorMessage      = page.locator('[data-test="login-error"]');
    this.loginForm         = page.locator('form');
    this.pageHeading       = page.locator('h3, h2, h1').first();
    this.emailLabel        = page.locator('label[for="email"], label').filter({ hasText: /email/i }).first();
    this.passwordLabel     = page.locator('label[for="password"], label').filter({ hasText: /password/i }).first();
    this.rememberMe        = page.locator('[data-test="remember-me"], [type="checkbox"]').first();
  }

  async goto() {
    await this.navigate('/auth/login');
    await this.waitForPageLoad();
  }

  async assertAllElements() {
    await expect(this.page).toHaveURL(/.*login.*/);
    await this.assertNavBarVisible();
    await expect(this.loginForm).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginBtn).toBeVisible();
    await expect(this.registerLink).toBeVisible();
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
    await this.waitForPageLoad();
  }

  async assertLoginError() {
    await expect(this.errorMessage).toBeVisible();
  }

  async assertSuccessfulLogin() {
    await expect(this.page).not.toHaveURL(/.*login.*/);
  }
}
