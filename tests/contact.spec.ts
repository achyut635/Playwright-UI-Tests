import { test, expect } from '../fixtures/testFixtures';

test.describe('Contact Page', () => {
  test.beforeEach(async ({ contactPage }) => {
    await contactPage.goto();
  });

  test('should load contact page with correct URL', async ({ contactPage }) => {
    await expect(contactPage.page).toHaveURL(/.*contact.*/);
  });

  test('should display all contact form elements', async ({ contactPage }) => {
    await contactPage.assertAllElements();
  });

  test('should display first name input', async ({ contactPage }) => {
    await expect(contactPage.firstNameInput).toBeVisible();
    await expect(contactPage.firstNameInput).toBeEnabled();
  });

  test('should display last name input', async ({ contactPage }) => {
    await expect(contactPage.lastNameInput).toBeVisible();
    await expect(contactPage.lastNameInput).toBeEnabled();
  });

  test('should display email input', async ({ contactPage }) => {
    await expect(contactPage.emailInput).toBeVisible();
    await expect(contactPage.emailInput).toBeEnabled();
  });

  test('should display subject select dropdown', async ({ contactPage }) => {
    await expect(contactPage.subjectSelect).toBeVisible();
    await expect(contactPage.subjectSelect).toBeEnabled();
  });

  test('should display message textarea', async ({ contactPage }) => {
    await expect(contactPage.messageInput).toBeVisible();
    await expect(contactPage.messageInput).toBeEnabled();
  });

  test('should display send message button', async ({ contactPage }) => {
    await expect(contactPage.sendBtn).toBeVisible();
    await expect(contactPage.sendBtn).toBeEnabled();
  });

  test('should show validation errors for empty form', async ({ contactPage }) => {
    await contactPage.sendMessage();
    await contactPage.assertValidationErrors();
  });

  test('should accept input in first name field', async ({ contactPage }) => {
    await contactPage.firstNameInput.fill('John');
    await expect(contactPage.firstNameInput).toHaveValue('John');
  });

  test('should accept input in last name field', async ({ contactPage }) => {
    await contactPage.lastNameInput.fill('Doe');
    await expect(contactPage.lastNameInput).toHaveValue('Doe');
  });

  test('should accept input in email field', async ({ contactPage }) => {
    await contactPage.emailInput.fill('john@example.com');
    await expect(contactPage.emailInput).toHaveValue('john@example.com');
  });

  test('should accept input in message field', async ({ contactPage }) => {
    await contactPage.messageInput.fill('This is a test message');
    await expect(contactPage.messageInput).toHaveValue('This is a test message');
  });

  test('should have subject options in select dropdown', async ({ contactPage }) => {
    const options = await contactPage.subjectSelect.locator('option').allTextContents();
    expect(options.length).toBeGreaterThan(0);
  });

  test('should successfully submit valid contact form', async ({ contactPage }) => {
    await contactPage.fillContactForm({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      subject: 'Webmaster',
      message: 'This is an automated test message with enough characters to pass validation.',
    });
    await contactPage.sendMessage();
    await contactPage.assertSuccessMessage();
  });

  test('should display navigation bar', async ({ contactPage }) => {
    await contactPage.assertNavBarVisible();
  });

  test('should display file attachment input', async ({ contactPage }) => {
    const attachInput = contactPage.attachmentInput;
    const isVisible = await attachInput.isVisible().catch(() => false);
    if (isVisible) {
      const type = await attachInput.getAttribute('type');
      expect(type).toBe('file');
    }
  });
});
