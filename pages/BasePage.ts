import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly navBrand: Locator;
  readonly navHome: Locator;
  readonly navCategories: Locator;
  readonly navContact: Locator;
  readonly navSignIn: Locator;
  readonly navCart: Locator;
  readonly navLanguage: Locator;
  readonly navSearchInput: Locator;
  readonly navSearchBtn: Locator;
  readonly footerCopyright: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navBrand       = page.locator('[data-test="nav-logo"]');
    this.navHome        = page.locator('[data-test="nav-home"]');
    this.navCategories  = page.locator('[data-test="nav-categories"]');
    this.navContact     = page.locator('[data-test="nav-contact"]');
    this.navSignIn      = page.locator('[data-test="nav-sign-in"]');
    this.navCart        = page.locator('[data-test="nav-cart"]');
    this.navLanguage    = page.locator('[data-test="language-select"]');
    this.navSearchInput = page.locator('[data-test="search-query"]');
    this.navSearchBtn   = page.locator('[data-test="search-submit"]');
    this.footerCopyright = page.locator('footer .copyright, footer p').first();
  }

  async navigate(path: string = '/') {
    await this.page.goto(path);
  }

  async assertNavBarVisible() {
    await expect(this.navBrand).toBeVisible();
    await expect(this.navHome).toBeVisible();
    await expect(this.navContact).toBeVisible();
    await expect(this.navCart).toBeVisible();
  }

  async search(query: string) {
    await this.navSearchInput.fill(query);
    await this.navSearchBtn.click();
  }

  async goToCart() {
    await this.navCart.click();
  }

  async goToSignIn() {
    await this.navSignIn.click();
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({
      path: `screenshots/${name}-${Date.now()}.png`,
      fullPage: true,
    });
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }
}
