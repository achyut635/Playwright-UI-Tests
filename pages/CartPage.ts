import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly checkoutBtn: Locator;
  readonly emptyCartMessage: Locator;
  readonly cartItems: Locator;

  constructor(page: Page) {
    super(page);
    this.checkoutBtn      = page.locator('[name="proceedToRetailCheckout"]');
    this.emptyCartMessage = page.locator('.sc-your-amazon-cart-is-empty, [data-test="empty-cart"]');
    this.cartItems        = page.locator('.sc-list-item-content, [data-test="cart-item"]');
  }

  async goto() {
    await this.navigate('/checkout');
    await this.waitForPageLoad();
  }

  async assertCheckoutButton() {
    await expect(this.checkoutBtn).toBeVisible();
    await expect(this.checkoutBtn).toBeEnabled();
  }

  async assertCartIsEmpty() {
    await expect(this.emptyCartMessage).toBeVisible();
  }
}
