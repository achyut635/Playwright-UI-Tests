import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductDetailPage extends BasePage {
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly productDescription: Locator;
  readonly productImage: Locator;
  readonly productCategory: Locator;
  readonly productBrand: Locator;
  readonly quantityInput: Locator;
  readonly increaseQtyBtn: Locator;
  readonly decreaseQtyBtn: Locator;
  readonly addToCartBtn: Locator;
  readonly addToFavouritesBtn: Locator;
  readonly productGallery: Locator;
  readonly relatedProducts: Locator;
  readonly reviewSection: Locator;
  readonly reviewForm: Locator;
  readonly reviewName: Locator;
  readonly reviewMessage: Locator;
  readonly reviewRating: Locator;
  readonly submitReviewBtn: Locator;
  readonly stockBadge: Locator;
  readonly breadcrumb: Locator;

  constructor(page: Page) {
    super(page);
    this.productName        = page.locator('[data-test="product-name"]');
    this.productPrice       = page.locator('[data-test="unit-price"]');
    this.productDescription = page.locator('[data-test="product-description"]');
    this.productImage       = page.locator('[data-test="product-image"] img, .product-image img').first();
    this.productCategory    = page.locator('[data-test="product-category"]');
    this.productBrand       = page.locator('[data-test="product-brand"]');
    this.quantityInput      = page.locator('[data-test="quantity"]');
    this.increaseQtyBtn     = page.locator('[data-test="increase-quantity"]');
    this.decreaseQtyBtn     = page.locator('[data-test="decrease-quantity"]');
    this.addToCartBtn       = page.locator('[data-test="add-to-cart"]');
    this.addToFavouritesBtn = page.locator('[data-test="add-to-favourites"]');
    this.productGallery     = page.locator('.product-gallery, [data-test="product-gallery"]');
    this.relatedProducts    = page.locator('[data-test="related-products"]');
    this.reviewSection      = page.locator('[data-test="reviews"]');
    this.reviewForm         = page.locator('[data-test="review-form"]');
    this.reviewName         = page.locator('[data-test="review-author"]');
    this.reviewMessage      = page.locator('[data-test="review-message"]');
    this.reviewRating       = page.locator('[data-test="review-rating"]');
    this.submitReviewBtn    = page.locator('[data-test="review-submit"]');
    this.stockBadge         = page.locator('[data-test="product-status"]');
    this.breadcrumb         = page.locator('.breadcrumb, nav[aria-label="breadcrumb"]');
  }

  async assertAllElements() {
    await expect(this.productName).toBeVisible();
    await expect(this.productPrice).toBeVisible();
    await expect(this.productDescription).toBeVisible();
    await expect(this.productImage).toBeVisible();
    await expect(this.quantityInput).toBeVisible();
    await expect(this.addToCartBtn).toBeVisible();
  }

  async assertProductDetails() {
    const name = await this.productName.textContent();
    expect(name?.trim().length).toBeGreaterThan(0);

    const price = await this.productPrice.textContent();
    expect(price?.trim().length).toBeGreaterThan(0);
  }

  async setQuantity(value: number) {
    await this.quantityInput.clear();
    await this.quantityInput.fill(String(value));
  }

  async increaseQuantity(times: number = 1) {
    for (let i = 0; i < times; i++) {
      await this.increaseQtyBtn.click();
    }
  }

  async decreaseQuantity(times: number = 1) {
    for (let i = 0; i < times; i++) {
      await this.decreaseQtyBtn.click();
    }
  }

  async addToCart() {
    await this.addToCartBtn.click();
  }

  async getProductName(): Promise<string> {
    return (await this.productName.textContent()) ?? '';
  }

  async getProductPrice(): Promise<string> {
    return (await this.productPrice.textContent()) ?? '';
  }

  async submitReview(data: { name: string; message: string; rating: string }) {
    await this.reviewName.fill(data.name);
    await this.reviewMessage.fill(data.message);
    await this.reviewRating.selectOption(data.rating);
    await this.submitReviewBtn.click();
  }
}
