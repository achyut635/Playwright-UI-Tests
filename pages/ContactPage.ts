import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ContactPage extends BasePage {
  readonly pageHeading: Locator;
  readonly contactForm: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly subjectSelect: Locator;
  readonly messageInput: Locator;
  readonly attachmentInput: Locator;
  readonly sendBtn: Locator;
  readonly successMessage: Locator;
  readonly errorMessages: Locator;
  readonly firstNameError: Locator;
  readonly lastNameError: Locator;
  readonly emailError: Locator;
  readonly subjectError: Locator;
  readonly messageError: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading    = page.locator('h3, h2, h1').first();
    this.contactForm    = page.locator('form');
    this.firstNameInput = page.locator('[data-test="first-name"]');
    this.lastNameInput  = page.locator('[data-test="last-name"]');
    this.emailInput     = page.locator('[data-test="email"]');
    this.subjectSelect  = page.locator('[data-test="subject"]');
    this.messageInput   = page.locator('[data-test="message"]');
    this.attachmentInput = page.locator('[data-test="attachment"]');
    this.sendBtn        = page.locator('[data-test="contact-submit"]');
    this.successMessage = page.locator('[data-test="contact-success"], .alert-success');
    this.errorMessages  = page.locator('.alert-danger, .invalid-feedback');
    this.firstNameError = page.locator('[data-test="first-name-error"]');
    this.lastNameError  = page.locator('[data-test="last-name-error"]');
    this.emailError     = page.locator('[data-test="email-error"]');
    this.subjectError   = page.locator('[data-test="subject-error"]');
    this.messageError   = page.locator('[data-test="message-error"]');
  }

  async goto() {
    await this.navigate('/contact');
    await this.waitForPageLoad();
  }

  async assertAllElements() {
    await expect(this.page).toHaveURL(/.*contact.*/);
    await this.assertNavBarVisible();
    await expect(this.contactForm).toBeVisible();
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.subjectSelect).toBeVisible();
    await expect(this.messageInput).toBeVisible();
    await expect(this.sendBtn).toBeVisible();
  }

  async fillContactForm(data: {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
  }) {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.emailInput.fill(data.email);
    await this.subjectSelect.selectOption(data.subject);
    await this.messageInput.fill(data.message);
  }

  async sendMessage() {
    await this.sendBtn.click();
    await this.waitForPageLoad();
  }

  async assertSuccessMessage() {
    await expect(this.successMessage).toBeVisible();
  }

  async assertValidationErrors() {
    await expect(this.errorMessages.first()).toBeVisible();
  }
}
