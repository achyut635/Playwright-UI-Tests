import { Page, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

export const TEST_USERS = {
  customer: {
    email: 'customer@practicesoftwaretesting.com',
    password: 'welcome01',
  },
  admin: {
    email: 'admin@practicesoftwaretesting.com',
    password: 'welcome01',
  },
  customer2: {
    email: 'customer2@practicesoftwaretesting.com',
    password: 'welcome01',
  },
};

export const BASE_URL = 'https://practicesoftwaretesting.com';

export async function takeScreenshotOnFailure(page: Page, testName: string) {
  const screenshotDir = path.join(process.cwd(), 'screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }
  const sanitizedName = testName.replace(/[^a-zA-Z0-9-_]/g, '_');
  const screenshotPath = path.join(screenshotDir, `${sanitizedName}-${Date.now()}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: true });
  return screenshotPath;
}

export async function waitForNetworkIdle(page: Page, timeout: number = 5000) {
  await page.waitForLoadState('networkidle', { timeout });
}

export function generateRandomEmail(): string {
  const timestamp = Date.now();
  return `test_${timestamp}@example.com`;
}

export function generateRandomString(length: number = 8): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function assertPageTitle(page: Page, expectedTitle: string | RegExp) {
  await expect(page).toHaveTitle(expectedTitle);
}

export async function assertPageUrl(page: Page, expectedUrl: string | RegExp) {
  await expect(page).toHaveURL(expectedUrl);
}

export async function scrollToBottom(page: Page) {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);
}

export async function scrollToTop(page: Page) {
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
}

export async function isElementInViewport(page: Page, selector: string): Promise<boolean> {
  return page.evaluate((sel) => {
    const element = document.querySelector(sel);
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }, selector);
}

export const TEST_DATA = {
  validContact: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    subject: 'Webmaster',
    message: 'This is a test message for automated testing purposes.',
  },
  validAddress: {
    firstName: 'Jane',
    lastName: 'Smith',
    address: '123 Test Street',
    city: 'Test City',
    state: 'Test State',
    country: 'US',
    postcode: '12345',
  },
  validRegistration: {
    firstName: 'Test',
    lastName: 'User',
    dob: '1990-01-01',
    address: '456 Register Ave',
    postcode: '67890',
    city: 'Register City',
    state: 'Register State',
    country: 'US',
    phone: '+1234567890',
    email: generateRandomEmail(),
    password: 'SecurePass123!',
  },
};
