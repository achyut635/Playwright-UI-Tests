/**
 * Playwright Test Dashboard
 * Reads from ../test-results/results.json (Playwright JSON reporter output)
 */

(function () {
  'use strict';

  // ── State ───────────────────────────────────────────────────────────────────
  let allTests = [];
  let activeFilter = 'all';
  let searchQuery = '';

  // ── Bootstrap ───────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('footer-date').textContent = new Date().toLocaleString();
    loadResults();
    attachEventListeners();
  });

  // ── Load results.json ────────────────────────────────────────────────────────
  async function loadResults() {
    try {
      const res = await fetch('../test-results/results.json');
      if (!res.ok) throw new Error('results.json not found');
      const data = await res.json();
      processResults(data);
    } catch (err) {
      // Show demo data if no results file yet
      renderDemoData();
      console.warn('Could not load results.json — showing demo data.', err.message);
    }
  }

  // ── Process Playwright JSON output ──────────────────────────────────────────
  function processResults(data) {
    const tests = [];

    // Handle Playwright's JSON reporter format
    const suites = data.suites || [];
    walkSuites(suites, null, tests);

    // Metadata
    const startTime = data.startTime ? new Date(data.startTime) : new Date();
    const duration = data.stats
      ? formatDuration(data.stats.duration)
      : '–';

    document.getElementById('run-date').textContent = startTime.toLocaleString();
    document.getElementById('run-duration').textContent = 'Duration: ' + duration;

    allTests = tests;
    render(tests);
  }

  function walkSuites(suites, parentTitle, out) {
    suites.forEach(suite => {
      const title = parentTitle
        ? `${parentTitle} › ${suite.title}`
        : suite.title;

      (suite.specs || []).forEach(spec => {
        (spec.tests || []).forEach(test => {
          const result = (test.results || [])[0] || {};
          const status = normaliseStatus(result.status || test.status);
          out.push({
            name: spec.title,
            suite: suite.title || 'Unknown',
            fullSuite: title,
            browser: (test.projectName || '').replace('Desktop ', '').replace('Mobile ', 'Mobile/') || 'chromium',
            status,
            duration: result.duration || 0,
            error: extractError(result),
          });
        });
      });

      if (suite.suites) walkSuites(suite.suites, title, out);
    });
  }

  function normaliseStatus(s) {
    if (!s) return 'skipped';
    const map = { passed: 'passed', failed: 'failed', timedOut: 'failed', interrupted: 'failed', skipped: 'skipped', pending: 'skipped' };
    return map[s] || 'skipped';
  }

  function extractError(result) {
    if (!result.error) return '';
    return result.error.message || JSON.stringify(result.error);
  }

  // ── Render ───────────────────────────────────────────────────────────────────
  function render(tests) {
    const passed  = tests.filter(t => t.status === 'passed').length;
    const failed  = tests.filter(t => t.status === 'failed').length;
    const skipped = tests.filter(t => t.status === 'skipped').length;
    const total   = tests.length;
    const rate    = total ? Math.round((passed / total) * 100) : 0;

    // Summary cards
    document.getElementById('total-tests').textContent  = total;
    document.getElementById('passed-tests').textContent = passed;
    document.getElementById('failed-tests').textContent = failed;
    document.getElementById('skipped-tests').textContent = skipped;
    document.getElementById('pass-rate').textContent    = rate + '%';

    // Progress bar
    const pPassed  = total ? (passed  / total * 100) : 0;
    const pFailed  = total ? (failed  / total * 100) : 0;
    const pSkipped = total ? (skipped / total * 100) : 0;
    document.getElementById('progress-passed').style.width  = pPassed  + '%';
    document.getElementById('progress-failed').style.width  = pFailed  + '%';
    document.getElementById('progress-skipped').style.width = pSkipped + '%';

    // Suite chart
    renderSuiteChart(tests);

    // Browser chart
    renderBrowserChart(tests);

    // Table
    renderTable(tests);

    // Failed details
    renderFailedSection(tests.filter(t => t.status === 'failed'));
  }

  function renderSuiteChart(tests) {
    const suiteMap = {};
    tests.forEach(t => {
      if (!suiteMap[t.suite]) suiteMap[t.suite] = { passed: 0, failed: 0, skipped: 0 };
      suiteMap[t.suite][t.status]++;
    });

    const container = document.getElementById('suite-chart');
    container.innerHTML = '';

    Object.entries(suiteMap).slice(0, 10).forEach(([suite, counts]) => {
      const total = counts.passed + counts.failed + counts.skipped || 1;
      const row = document.createElement('div');
      row.className = 'suite-row';
      row.innerHTML = `
        <span class="suite-name" title="${esc(suite)}">${esc(suite)}</span>
        <div class="suite-bar-wrap">
          <div class="suite-bar-pass" style="width:${counts.passed/total*100}%"></div>
          <div class="suite-bar-fail" style="width:${counts.failed/total*100}%"></div>
          <div class="suite-bar-skip" style="width:${counts.skipped/total*100}%"></div>
        </div>
        <span class="suite-count">${counts.passed}/${counts.passed+counts.failed+counts.skipped}</span>
      `;
      container.appendChild(row);
    });
    if (!Object.keys(suiteMap).length) container.innerHTML = '<p style="color:var(--color-muted);font-size:0.85rem">No data yet.</p>';
  }

  function renderBrowserChart(tests) {
    const browserMap = {};
    tests.forEach(t => {
      if (!browserMap[t.browser]) browserMap[t.browser] = { passed: 0, failed: 0, skipped: 0 };
      browserMap[t.browser][t.status]++;
    });

    const container = document.getElementById('browser-chart');
    container.innerHTML = '';

    Object.entries(browserMap).forEach(([browser, counts]) => {
      const total = counts.passed + counts.failed + counts.skipped || 1;
      const row = document.createElement('div');
      row.className = 'suite-row';
      row.innerHTML = `
        <span class="suite-name">${esc(browser)}</span>
        <div class="suite-bar-wrap">
          <div class="suite-bar-pass" style="width:${counts.passed/total*100}%"></div>
          <div class="suite-bar-fail" style="width:${counts.failed/total*100}%"></div>
          <div class="suite-bar-skip" style="width:${counts.skipped/total*100}%"></div>
        </div>
        <span class="suite-count">${counts.passed}/${counts.passed+counts.failed+counts.skipped}</span>
      `;
      container.appendChild(row);
    });
    if (!Object.keys(browserMap).length) container.innerHTML = '<p style="color:var(--color-muted);font-size:0.85rem">No data yet.</p>';
  }

  function renderTable(tests) {
    const filtered = applyFilters(tests);
    const tbody = document.getElementById('results-body');
    tbody.innerHTML = '';

    if (!filtered.length) {
      tbody.innerHTML = '<tr><td colspan="6" class="loading">No tests match current filter.</td></tr>';
      return;
    }

    filtered.forEach(t => {
      const tr = document.createElement('tr');
      tr.dataset.status = t.status;
      tr.innerHTML = `
        <td><span class="status-badge status-badge--${t.status}">${statusIcon(t.status)} ${t.status}</span></td>
        <td class="test-name">${esc(t.name)}</td>
        <td><span class="suite-tag">${esc(t.suite)}</span></td>
        <td>${esc(t.browser)}</td>
        <td class="duration">${formatDuration(t.duration)}</td>
        <td>${t.error ? `<span class="error-snippet" title="${esc(t.error)}">${esc(t.error.substring(0, 80))}…</span>` : '–'}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  function renderFailedSection(failedTests) {
    const section = document.getElementById('failed-section');
    const list    = document.getElementById('failed-list');

    if (!failedTests.length) {
      section.style.display = 'none';
      return;
    }

    section.style.display = 'block';
    list.innerHTML = '';

    failedTests.forEach(t => {
      const card = document.createElement('div');
      card.className = 'failed-card';
      card.innerHTML = `
        <div class="failed-card-header">
          <span class="failed-card-title">❌ ${esc(t.name)}</span>
          <span class="failed-card-suite">${esc(t.suite)} | ${esc(t.browser)}</span>
        </div>
        <div class="failed-card-body">
          <div class="error-block">${esc(t.error || 'No error message captured.')}</div>
        </div>
      `;
      list.appendChild(card);
    });
  }

  // ── Filters ──────────────────────────────────────────────────────────────────
  function applyFilters(tests) {
    return tests.filter(t => {
      const matchStatus = activeFilter === 'all' || t.status === activeFilter;
      const matchSearch = !searchQuery || t.name.toLowerCase().includes(searchQuery) || t.suite.toLowerCase().includes(searchQuery);
      return matchStatus && matchSearch;
    });
  }

  function attachEventListeners() {
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.dataset.filter;
        renderTable(allTests);
      });
    });

    // Search input
    document.getElementById('filter-input').addEventListener('input', e => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderTable(allTests);
    });
  }

  // ── Demo data (shown before first test run) ───────────────────────────────
  function renderDemoData() {
    const demo = [
      { name: 'should load home page with correct title', suite: 'Home Page', browser: 'chromium', status: 'passed', duration: 1250, error: '' },
      { name: 'should display navigation bar', suite: 'Home Page', browser: 'chromium', status: 'passed', duration: 890, error: '' },
      { name: 'should display product grid', suite: 'Products Page', browser: 'chromium', status: 'passed', duration: 2100, error: '' },
      { name: 'should sort products by price', suite: 'Products Page', browser: 'chromium', status: 'passed', duration: 3200, error: '' },
      { name: 'should load login page', suite: 'Login Page', browser: 'chromium', status: 'passed', duration: 950, error: '' },
      { name: 'should show error for invalid credentials', suite: 'Login Page', browser: 'chromium', status: 'passed', duration: 2300, error: '' },
      { name: 'should submit valid contact form', suite: 'Contact Page', browser: 'chromium', status: 'passed', duration: 4100, error: '' },
      { name: 'should add product to cart', suite: 'Cart Page', browser: 'chromium', status: 'passed', duration: 5200, error: '' },
      { name: 'should display product name', suite: 'Product Detail Page', browser: 'firefox', status: 'passed', duration: 1800, error: '' },
      { name: 'should increase quantity', suite: 'Product Detail Page', browser: 'firefox', status: 'failed', duration: 3500, error: 'TimeoutError: Waiting for locator("[data-test=\\"increase-quantity\\"]") to be visible.' },
      { name: 'should register new user', suite: 'Register Page', browser: 'webkit', status: 'failed', duration: 6200, error: 'AssertionError: Expected URL to not contain /auth/register' },
      { name: 'should display account page', suite: 'Account Page', browser: 'webkit', status: 'skipped', duration: 0, error: '' },
    ];

    document.getElementById('run-date').textContent = new Date().toLocaleString() + ' (demo)';
    document.getElementById('run-duration').textContent = 'Duration: 42s';

    allTests = demo;
    render(demo);
  }

  // ── Helpers ──────────────────────────────────────────────────────────────────
  function formatDuration(ms) {
    if (!ms || ms === 0) return '–';
    if (ms < 1000) return ms + 'ms';
    return (ms / 1000).toFixed(1) + 's';
  }

  function statusIcon(status) {
    return { passed: '✓', failed: '✗', skipped: '⊘' }[status] || '?';
  }

  function esc(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
})();
