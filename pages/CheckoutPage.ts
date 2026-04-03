import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  // Step 1 - Login/Guest
  readonly loginTab: Locator;
  readonly guestTab: Locator;
  readonly checkoutEmail: Locator;
  readonly checkoutPassword: Locator;
  readonly checkoutLoginBtn: Locator;
  readonly proceedStep1Btn: Locator;

  // Step 2 - Address
  readonly addressFirstName: Locator;
  readonly addressLastName: Locator;
  readonly addressStreet: Locator;
  readonly addressCity: Locator;
  readonly addressState: Locator;
  readonly addressCountry: Locator;
  readonly addressPostcode: Locator;
  readonly proceedStep2Btn: Locator;

  // Step 3 - Billing
  readonly paymentMethod: Locator;
  readonly bankTransferOption: Locator;
  readonly cashOnDeliveryOption: Locator;
  readonly creditCardOption: Locator;
  readonly buyNowPayLaterOption: Locator;
  readonly giftCardOption: Locator;
  readonly proceedStep3Btn: Locator;

  // Step 4 - Confirmation
  readonly orderConfirmationMsg: Locator;
  readonly orderNumber: Locator;
  readonly orderSummaryItems: Locator;

  // Stepper
  readonly stepperItems: Locator;
  readonly activeStep: Locator;

  constructor(page: Page) {
    super(page);
    // Step 1
    this.loginTab          = page.locator('[data-test="checkout-login-tab"]');
    this.guestTab          = page.locator('[data-test="guest"]');
    this.checkoutEmail     = page.locator('[data-test="email"]');
    this.checkoutPassword  = page.locator('[data-test="password"]');
    this.checkoutLoginBtn  = page.locator('[data-test="login-submit"]');
    this.proceedStep1Btn   = page.locator('[data-test="proceed-1"]');

    // Step 2
    this.addressFirstName  = page.locator('[data-test="first-name"]');
    this.addressLastName   = page.locator('[data-test="last-name"]');
    this.addressStreet     = page.locator('[data-test="address"]');
    this.addressCity       = page.locator('[data-test="city"]');
    this.addressState      = page.locator('[data-test="state"]');
    this.addressCountry    = page.locator('[data-test="country"]');
    this.addressPostcode   = page.locator('[data-test="postcode"]');
    this.proceedStep2Btn   = page.locator('[data-test="proceed-2"]');

    // Step 3
    this.paymentMethod         = page.locator('[data-test="payment-method"]');
    this.bankTransferOption    = page.locator('[data-test="bank-transfer"]');
    this.cashOnDeliveryOption  = page.locator('[data-test="cash-on-delivery"]');
    this.creditCardOption      = page.locator('[data-test="credit-card"]');
    this.buyNowPayLaterOption  = page.locator('[data-test="buy-now-pay-later"]');
    this.giftCardOption        = page.locator('[data-test="gift-card"]');
    this.proceedStep3Btn       = page.locator('[data-test="proceed-3"]');

    // Step 4
    this.orderConfirmationMsg  = page.locator('[data-test="order-confirmation"]');
    this.orderNumber           = page.locator('[data-test="order-id"]');
    this.orderSummaryItems     = page.locator('[data-test="order-item"]');

    // Stepper
    this.stepperItems  = page.locator('.step, .stepper-item');
    this.activeStep    = page.locator('.step.active, .stepper-item.active');
  }

  async goto() {
    await this.navigate('/checkout');
    await this.waitForPageLoad();
  }

  async assertStep1Elements() {
    await expect(this.page).toHaveURL(/.*checkout.*/);
    await this.assertNavBarVisible();
  }

  async proceedAsGuest() {
    await this.guestTab.click();
    await this.proceedStep1Btn.click();
    await this.waitForPageLoad();
  }

  async loginForCheckout(email: string, password: string) {
    await this.checkoutEmail.fill(email);
    await this.checkoutPassword.fill(password);
    await this.checkoutLoginBtn.click();
    await this.waitForPageLoad();
  }

  async fillAddressDetails(data: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postcode: string;
  }) {
    await this.addressFirstName.fill(data.firstName);
    await this.addressLastName.fill(data.lastName);
    await this.addressStreet.fill(data.address);
    await this.addressCity.fill(data.city);
    await this.addressState.fill(data.state);
    await this.addressCountry.selectOption(data.country);
    await this.addressPostcode.fill(data.postcode);
    await this.proceedStep2Btn.click();
    await this.waitForPageLoad();
  }

  async selectBankTransfer() {
    await this.bankTransferOption.click();
    await this.proceedStep3Btn.click();
    await this.waitForPageLoad();
  }

  async assertOrderConfirmation() {
    await expect(this.orderConfirmationMsg).toBeVisible();
  }
}
