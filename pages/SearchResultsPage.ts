import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class SearchResultsPage extends BasePage {
  readonly searchQuery: Locator;
  readonly searchResults: Locator;
  readonly resultCount: Locator;
  readonly productCards: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;
  readonly noResultsMessage: Locator;
  readonly sortDropdown: Locator;
  readonly paginationContainer: Locator;

  constructor(page: Page) {
    super(page);
    this.searchQuery        = page.locator('[data-test="search-query"]');
    this.searchResults      = page.locator('[data-test="search-results"]');
    this.resultCount        = page.locator('[data-test="search-results-count"]');
    this.productCards       = page.locator('[data-test="product"]');
    this.productNames       = page.locator('[data-test="product-name"]');
    this.productPrices      = page.locator('[data-test="product-price"]');
    this.noResultsMessage   = page.locator('[data-test="no-results"]');
    this.sortDropdown       = page.locator('[data-test="sort"]');
    this.paginationContainer = page.locator('[data-test="pagination"]');
  }

  async searchFor(query: string) {
    await this.page.goto(`/search?q=${query}`);
    await this.waitForPageLoad();
  }

  async assertSearchResultsVisible() {
    await expect(this.productCards.first()).toBeVisible();
  }

  async assertNoResults() {
    await expect(this.noResultsMessage).toBeVisible();
  }

  async getResultCount(): Promise<number> {
    return this.productCards.count();
  }

  async assertResultsContainQuery(query: string) {
    const names = await this.productNames.allTextContents();
    const hasMatch = names.some(name =>
      name.toLowerCase().includes(query.toLowerCase())
    );
    expect(hasMatch).toBeTruthy();
  }
}
