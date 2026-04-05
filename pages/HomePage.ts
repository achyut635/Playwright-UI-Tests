import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly departmentsBtn: Locator;
  readonly returnsPoliciesLink: Locator;

  constructor(page: Page) {
    super(page);
    this.departmentsBtn       = page.locator('#nav-hamburger-menu');
    this.returnsPoliciesLink  = page.locator('#nav-global-location-popover-link');
  }

  async goto() {
    await this.navigate('/');
    await this.waitForPageLoad();
  }

  async assertAllElements() {
    await expect(this.page).toHaveTitle(/Amazon/i);
    await this.assertNavBarVisible();
    await expect(this.departmentsBtn).toBeVisible();
    await expect(this.navSearchInput).toBeVisible();
    await expect(this.navSearchBtn).toBeVisible();
  }

  async searchFor(query: string) {
    await this.navSearchInput.fill(query);
    await this.navSearchBtn.click();
    await this.waitForPageLoad();
  }
}
