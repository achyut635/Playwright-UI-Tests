import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccountPage extends BasePage {
  readonly pageHeading: Locator;
  readonly navMenu: Locator;
  readonly profileLink: Locator;
  readonly favoritesLink: Locator;
  readonly ordersLink: Locator;
  readonly messagesLink: Locator;
  readonly invoicesLink: Locator;
  readonly logoutBtn: Locator;

  // Profile section
  readonly profileFirstName: Locator;
  readonly profileLastName: Locator;
  readonly profileEmail: Locator;
  readonly profileDob: Locator;
  readonly profilePhone: Locator;
  readonly profileAddress: Locator;
  readonly profileCity: Locator;
  readonly profileState: Locator;
  readonly profileCountry: Locator;
  readonly profilePostcode: Locator;
  readonly profileUpdateBtn: Locator;
  readonly profileCurrentPassword: Locator;
  readonly profileNewPassword: Locator;
  readonly changePasswordBtn: Locator;

  // Orders section
  readonly ordersTable: Locator;
  readonly orderRows: Locator;

  // Favorites section
  readonly favoriteItems: Locator;
  readonly removeFromFavoritesBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading       = page.locator('h1, h2, h3').first();
    this.navMenu           = page.locator('[data-test="account-nav"]');
    this.profileLink       = page.locator('[data-test="nav-profile"]');
    this.favoritesLink     = page.locator('[data-test="nav-favourites"]');
    this.ordersLink        = page.locator('[data-test="nav-orders"]');
    this.messagesLink      = page.locator('[data-test="nav-messages"]');
    this.invoicesLink      = page.locator('[data-test="nav-invoices"]');
    this.logoutBtn         = page.locator('[data-test="nav-sign-in"]');

    // Profile
    this.profileFirstName     = page.locator('[data-test="first-name"]');
    this.profileLastName      = page.locator('[data-test="last-name"]');
    this.profileEmail         = page.locator('[data-test="email"]');
    this.profileDob           = page.locator('[data-test="dob"]');
    this.profilePhone         = page.locator('[data-test="phone"]');
    this.profileAddress       = page.locator('[data-test="address"]');
    this.profileCity          = page.locator('[data-test="city"]');
    this.profileState         = page.locator('[data-test="state"]');
    this.profileCountry       = page.locator('[data-test="country"]');
    this.profilePostcode      = page.locator('[data-test="postcode"]');
    this.profileUpdateBtn     = page.locator('[data-test="update-profile-submit"]');
    this.profileCurrentPassword = page.locator('[data-test="current-password"]');
    this.profileNewPassword   = page.locator('[data-test="new-password"]');
    this.changePasswordBtn    = page.locator('[data-test="change-password-submit"]');

    // Orders
    this.ordersTable = page.locator('[data-test="orders-table"]');
    this.orderRows   = page.locator('[data-test="order-row"]');

    // Favorites
    this.favoriteItems          = page.locator('[data-test="favourite-item"]');
    this.removeFromFavoritesBtn = page.locator('[data-test="remove-favourite"]');
  }

  async goto() {
    await this.navigate('/account');
    await this.waitForPageLoad();
  }

  async assertProfilePage() {
    await expect(this.profileFirstName).toBeVisible();
    await expect(this.profileLastName).toBeVisible();
    await expect(this.profileEmail).toBeVisible();
    await expect(this.profileUpdateBtn).toBeVisible();
  }

  async goToOrders() {
    await this.ordersLink.click();
    await this.waitForPageLoad();
  }

  async goToFavorites() {
    await this.favoritesLink.click();
    await this.waitForPageLoad();
  }

  async goToProfile() {
    await this.profileLink.click();
    await this.waitForPageLoad();
  }

  async updateProfile(data: {
    firstName: string;
    lastName: string;
    dob: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    postcode: string;
  }) {
    await this.profileFirstName.fill(data.firstName);
    await this.profileLastName.fill(data.lastName);
    await this.profileDob.fill(data.dob);
    await this.profilePhone.fill(data.phone);
    await this.profileAddress.fill(data.address);
    await this.profileCity.fill(data.city);
    await this.profileState.fill(data.state);
    await this.profilePostcode.fill(data.postcode);
    await this.profileUpdateBtn.click();
    await this.waitForPageLoad();
  }
}
