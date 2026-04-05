import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly navBrand: Locator;
  readonly navSignIn: Locator;
  readonly navCart: Locator;
  readonly navSearchInput: Locator;
  readonly navSearchBtn: Locator;

  constructor(page: Page) {
    this.page         = page;
    this.navBrand     = page.locator('#nav-logo');
    this.navSignIn    = page.locator('#nav-link-accountList');
    this.navCart      = page.locator('#nav-cart');
    this.navSearchInput = page.locator('#twotabsearchtextbox');
    this.navSearchBtn   = page.locator('#nav-search-submit-button');
  }

  async navigate(path: string = '/') {
    await this.page.goto(path);
  }

  async assertNavBarVisible() {
    await expect(this.navBrand).toBeVisible();
    await expect(this.navSearchInput).toBeVisible();
    await expect(this.navCart).toBeVisible();
    await expect(this.navSignIn).toBeVisible();
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded');
  }
}
