import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  readonly productGrid: Locator;
  readonly productCards: Locator;
  readonly productImages: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;
  readonly sortDropdown: Locator;
  readonly categoryCheckboxes: Locator;
  readonly brandCheckboxes: Locator;
  readonly priceRangeMin: Locator;
  readonly priceRangeMax: Locator;
  readonly searchResultCount: Locator;
  readonly paginationItems: Locator;
  readonly activePageItem: Locator;
  readonly filterApplyBtn: Locator;
  readonly filterResetBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.productGrid        = page.locator('[data-test="product_overview"]');
    this.productCards       = page.locator('[data-test="product"]');
    this.productImages      = page.locator('[data-test="product"] img');
    this.productNames       = page.locator('[data-test="product-name"]');
    this.productPrices      = page.locator('[data-test="product-price"]');
    this.sortDropdown       = page.locator('[data-test="sort"]');
    this.categoryCheckboxes = page.locator('[data-test="category-filter"] input[type="checkbox"]');
    this.brandCheckboxes    = page.locator('[data-test="brand-filter"] input[type="checkbox"]');
    this.priceRangeMin      = page.locator('[data-test="price-filter-min"]');
    this.priceRangeMax      = page.locator('[data-test="price-filter-max"]');
    this.searchResultCount  = page.locator('[data-test="search-results-count"]');
    this.paginationItems    = page.locator('[data-test="pagination"] .page-item');
    this.activePageItem     = page.locator('[data-test="pagination"] .page-item.active');
    this.filterApplyBtn     = page.locator('[data-test="filter-apply"]');
    this.filterResetBtn     = page.locator('[data-test="filter-reset"]');
  }

  async goto() {
    await this.navigate('/');
    await this.waitForPageLoad();
  }

  async assertAllElements() {
    await expect(this.productGrid).toBeVisible();
    await expect(this.productCards.first()).toBeVisible();
    await expect(this.productNames.first()).toBeVisible();
    await expect(this.productPrices.first()).toBeVisible();
    await expect(this.sortDropdown).toBeVisible();
    await expect(this.paginationItems.first()).toBeVisible();
  }

  async assertProductImagesLoaded() {
    const images = await this.productImages.all();
    for (const img of images) {
      await expect(img).toBeVisible();
      const src = await img.getAttribute('src');
      expect(src).not.toBeNull();
    }
  }

  async sortBy(value: string) {
    await this.sortDropdown.selectOption(value);
    await this.waitForPageLoad();
  }

  async applyCategoryFilter(index: number = 0) {
    await this.categoryCheckboxes.nth(index).click();
    await this.waitForPageLoad();
  }

  async applyBrandFilter(index: number = 0) {
    await this.brandCheckboxes.nth(index).click();
    await this.waitForPageLoad();
  }

  async clickProductByIndex(index: number = 0) {
    await this.productCards.nth(index).click();
    await this.waitForPageLoad();
  }

  async getProductCount(): Promise<number> {
    return this.productCards.count();
  }

  async getPricesAsNumbers(): Promise<number[]> {
    const priceTexts = await this.productPrices.allTextContents();
    return priceTexts.map(p => parseFloat(p.replace(/[^0-9.]/g, '')));
  }
}
