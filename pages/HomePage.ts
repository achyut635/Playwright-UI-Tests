import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly heroSection: Locator;
  readonly productGrid: Locator;
  readonly productCards: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;
  readonly addToCartBtns: Locator;
  readonly sortDropdown: Locator;
  readonly paginationContainer: Locator;
  readonly paginationNext: Locator;
  readonly paginationPrev: Locator;
  readonly categoryFilter: Locator;
  readonly brandFilter: Locator;
  readonly priceFilter: Locator;
  readonly filterSection: Locator;

  constructor(page: Page) {
    super(page);
    this.heroSection         = page.locator('.hero, [data-test="hero"], .banner').first();
    this.productGrid         = page.locator('[data-test="product_overview"]');
    this.productCards        = page.locator('[data-test="product"]');
    this.productNames        = page.locator('[data-test="product-name"]');
    this.productPrices       = page.locator('[data-test="product-price"]');
    this.addToCartBtns       = page.locator('[data-test="add-to-cart"]');
    this.sortDropdown        = page.locator('[data-test="sort"]');
    this.paginationContainer = page.locator('[data-test="pagination"]');
    this.paginationNext      = page.locator('[data-test="pagination"] .page-item:last-child .page-link');
    this.paginationPrev      = page.locator('[data-test="pagination"] .page-item:first-child .page-link');
    this.categoryFilter      = page.locator('[data-test="category-filter"]');
    this.brandFilter         = page.locator('[data-test="brand-filter"]');
    this.priceFilter         = page.locator('[data-test="price-filter"]');
    this.filterSection       = page.locator('.sidebar, [data-test="filter"]').first();
  }

  async goto() {
    await this.navigate('/');
    await this.waitForPageLoad();
  }

  async assertAllElements() {
    await expect(this.page).toHaveTitle(/.*Practice Software Testing.*/i);
    await this.assertNavBarVisible();
    await expect(this.productGrid).toBeVisible();
    await expect(this.productCards.first()).toBeVisible();
    await expect(this.productNames.first()).toBeVisible();
    await expect(this.productPrices.first()).toBeVisible();
    await expect(this.sortDropdown).toBeVisible();
    await expect(this.paginationContainer).toBeVisible();
  }

  async assertProductCount(minCount: number = 1) {
    const count = await this.productCards.count();
    expect(count).toBeGreaterThanOrEqual(minCount);
  }

  async sortBy(option: string) {
    await this.sortDropdown.selectOption(option);
    await this.waitForPageLoad();
  }

  async clickProduct(index: number = 0) {
    await this.productCards.nth(index).click();
  }

  async getProductName(index: number = 0): Promise<string> {
    return (await this.productNames.nth(index).textContent()) ?? '';
  }

  async getProductPrice(index: number = 0): Promise<string> {
    return (await this.productPrices.nth(index).textContent()) ?? '';
  }

  async addFirstProductToCart() {
    await this.addToCartBtns.first().click();
  }

  async goToNextPage() {
    await this.paginationNext.click();
    await this.waitForPageLoad();
  }
}
