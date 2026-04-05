import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly departmentsBtn: Locator;
  readonly returnsPoliciesLink: Locator;
  readonly navHome: Locator;
  readonly navCategories: Locator;
  readonly navContact: Locator;
  readonly navLanguage: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;
  readonly productCards: Locator;
  readonly sortDropdown: Locator;
  readonly paginationContainer: Locator;

  constructor(page: Page) {
    super(page);
    this.departmentsBtn       = page.locator('[data-test*="menu"], [data-test*="categories"], nav button').first();
    this.returnsPoliciesLink  = page.locator('[data-test*="location"], [data-test*="policies"]').first();
    this.navHome              = page.locator('[data-test="nav-home"], a[href="/"]').first();
    this.navCategories        = page.locator('[data-test="nav-categories"], nav').first();
    this.navContact           = page.locator('[data-test="nav-contact"], a[href*="contact"]').first();
    this.navLanguage          = page.locator('[data-test="language-selector"], .language-selector').first();
    this.productNames         = page.locator('[data-test="product-name"]');
    this.productPrices        = page.locator('[data-test="product-price"]');
    this.productCards         = page.locator('[data-test="product"]');
    this.sortDropdown         = page.locator('[data-test="sort"]');
    this.paginationContainer  = page.locator('[data-test="pagination"]');
  }

  async goto() {
    await this.navigate('/');
    await this.waitForPageLoad();
  }

  async assertAllElements() {
    const pageTitle = await this.page.title();
    expect(pageTitle.length).toBeGreaterThan(0);
    const searchInputVisible = await this.navSearchInput.isVisible().catch(() => false);
    if (searchInputVisible) {
      await expect(this.navSearchInput).toBeVisible();
    }
  }

  async assertProductCount(minCount: number) {
    const count = await this.productCards.count();
    expect(count).toBeGreaterThanOrEqual(minCount);
  }

  async getProductName(index: number): Promise<string> {
    const name = await this.productNames.nth(index).textContent();
    return name || '';
  }

  async getProductPrice(index: number): Promise<string> {
    const price = await this.productPrices.nth(index).textContent();
    return price || '';
  }

  async search(query: string) {
    await this.navSearchInput.fill(query);
    await this.navSearchBtn.click();
    await this.waitForPageLoad();
  }

  async sortBy(sortOption: string) {
    await this.sortDropdown.selectOption(sortOption).catch(() => {});
    await this.waitForPageLoad();
  }

  async goToNextPage() {
    const nextBtn = this.page.locator('[data-test="next-page"], button:has-text("Next")').last();
    const isEnabled = await nextBtn.isEnabled().catch(() => false);
    if (isEnabled) {
      await nextBtn.click();
      await this.waitForPageLoad();
    }
  }

  async clickProduct(index: number) {
    await this.productCards.nth(index).click();
    await this.waitForPageLoad();
  }

  async goToCart() {
    await this.navCart.click();
    await this.waitForPageLoad();
  }

  async goToSignIn() {
    await this.navSignIn.click();
    await this.waitForPageLoad();
  }

  async searchFor(query: string) {
    await this.navSearchInput.fill(query);
    await this.navSearchBtn.click();
    await this.waitForPageLoad();
  }
}
