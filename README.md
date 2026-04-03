# Playwright POM Framework — practicesoftwaretesting.com

A production-grade Playwright automation framework using the **Page Object Model** pattern for [practicesoftwaretesting.com](https://practicesoftwaretesting.com).

## Features

- **Page Object Model** — clean separation of locators and test logic
- **TypeScript** — fully typed with IntelliSense support
- **Allure Reports** — rich reporting with categories, steps, and screenshots
- **Screenshot on Failure** — automatic screenshots on test failure
- **Video Recording** — recorded on first retry
- **Custom Dashboard** — standalone HTML dashboard showing pass/fail/skip by suite and browser
- **Multi-browser** — Chromium, Firefox, WebKit, Mobile Chrome
- **Fixtures** — reusable page object fixtures with authenticated sessions

---

## Project Structure

```
├── pages/                   # Page Object Model classes
│   ├── BasePage.ts          # Shared nav & utility methods
│   ├── HomePage.ts
│   ├── LoginPage.ts
│   ├── RegisterPage.ts
│   ├── ProductsPage.ts
│   ├── ProductDetailPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   ├── ContactPage.ts
│   ├── AccountPage.ts
│   └── SearchResultsPage.ts
├── tests/                   # Test specs (one per page/feature)
│   ├── home.spec.ts
│   ├── login.spec.ts
│   ├── register.spec.ts
│   ├── products.spec.ts
│   ├── productDetail.spec.ts
│   ├── cart.spec.ts
│   ├── checkout.spec.ts
│   ├── contact.spec.ts
│   ├── search.spec.ts
│   └── account.spec.ts
├── fixtures/
│   └── testFixtures.ts      # Extended test with all POM fixtures
├── utils/
│   ├── testHelper.ts        # Shared helpers & test data
│   └── allureHelper.ts      # Allure annotation helpers
├── dashboard/               # Dashboard source (HTML/CSS/JS)
├── scripts/
│   └── generate-dashboard.js
├── playwright.config.ts
└── package.json
```

---

## Setup

```bash
npm install
npx playwright install
```

---

## Running Tests

```bash
# All tests (headless)
npm test

# Headed mode
npm run test:headed

# Debug mode
npm run test:debug

# Single spec
npx playwright test tests/login.spec.ts

# Specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

---

## Reports

### Playwright HTML Report
```bash
npm run test:report
```

### Allure Report
```bash
npm run allure:generate   # generate report
npm run allure:open       # open in browser
npm run allure:serve      # serve live from results
```

### Custom Dashboard
```bash
npm run dashboard         # generate dashboard-report/index.html
```

Or run everything at once:
```bash
npm run full-run
```

---

## Screenshots & Videos

- **Screenshots**: automatically saved to `test-results/` on failure
- **Videos**: captured on first retry, saved to `test-results/`
- **Traces**: captured on first retry for debugging in Playwright Trace Viewer

---

## Test Credentials

| Role      | Email                                        | Password  |
|-----------|----------------------------------------------|-----------|
| Customer  | customer@practicesoftwaretesting.com         | welcome01 |
| Admin     | admin@practicesoftwaretesting.com            | welcome01 |
| Customer2 | customer2@practicesoftwaretesting.com        | welcome01 |

---

## Configuration

Key settings in `playwright.config.ts`:

| Setting        | Value                                    |
|----------------|------------------------------------------|
| Base URL       | https://practicesoftwaretesting.com      |
| Screenshot     | on failure                               |
| Video          | on first retry                           |
| Trace          | on first retry                           |
| Timeout        | 60s per test                             |
| Action timeout | 15s                                      |
| Retries (CI)   | 2                                        |
