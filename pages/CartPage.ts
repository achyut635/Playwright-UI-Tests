import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly cartTable: Locator;
  readonly cartItems: Locator;
  readonly productNameCells: Locator;
  readonly productPriceCells: Locator;
  readonly productQtyCells: Locator;
  readonly productTotalCells: Locator;
  readonly removeItemBtns: Locator;
  readonly qtyInputs: Locator;
  readonly subtotalLabel: Locator;
  readonly totalLabel: Locator;
  readonly checkoutBtn: Locator;
  readonly continueShoppingBtn: Locator;
  readonly emptyCartMessage: Locator;
  readonly discountInput: Locator;
  readonly discountApplyBtn: Locator;
  readonly discountMessage: Locator;
  readonly cartTitle: Locator;
  readonly proceedBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.cartTable           = page.locator('[data-test="cart-table"], table').first();
    this.cartItems           = page.locator('[data-test="cart-item"]');
    this.productNameCells    = page.locator('[data-test="product-title"]');
    this.productPriceCells   = page.locator('[data-test="product-price"]');
    this.productQtyCells     = page.locator('[data-test="product-quantity"]');
    this.productTotalCells   = page.locator('[data-test="line-price"]');
    this.removeItemBtns      = page.locator('[data-test="delete-product"]');
    this.qtyInputs           = page.locator('[data-test="product-quantity"] input');
    this.subtotalLabel       = page.locator('[data-test="cart-subtotal"]');
    this.totalLabel          = page.locator('[data-test="cart-total"]');
    this.checkoutBtn         = page.locator('[data-test="proceed-1"]');
    this.continueShoppingBtn = page.locator('[data-test="continue-shopping"]');
    this.emptyCartMessage    = page.locator('[data-test="cart-empty"], .cart-empty, .empty-cart');
    this.discountInput       = page.locator('[data-test="discount-code"]');
    this.discountApplyBtn    = page.locator('[data-test="apply-discount-button"]');
    this.discountMessage     = page.locator('[data-test="discount-applied"]');
    this.cartTitle           = page.locator('h1, h2, h3').filter({ hasText: /cart/i }).first();
    this.proceedBtn          = page.locator('[data-test="proceed-1"]');
  }

  async goto() {
    await this.navigate('/checkout');
    await this.waitForPageLoad();
  }

  async assertAllElements() {
    await expect(this.page).toHaveURL(/.*checkout.*/);
    await this.assertNavBarVisible();
  }

  async assertCartHasItems() {
    const count = await this.cartItems.count();
    expect(count).toBeGreaterThan(0);
  }

  async assertCartIsEmpty() {
    await expect(this.emptyCartMessage).toBeVisible();
  }

  async removeFirstItem() {
    await this.removeItemBtns.first().click();
    await this.waitForPageLoad();
  }

  async getCartItemCount(): Promise<number> {
    return this.cartItems.count();
  }

  async applyDiscount(code: string) {
    await this.discountInput.fill(code);
    await this.discountApplyBtn.click();
    await this.waitForPageLoad();
  }

  async proceedToCheckout() {
    await this.proceedBtn.click();
    await this.waitForPageLoad();
  }

  async getTotalPrice(): Promise<string> {
    return (await this.totalLabel.textContent()) ?? '';
  }
}
