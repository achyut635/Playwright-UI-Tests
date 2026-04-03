#!/usr/bin/env node
/**
 * Generates the test dashboard by copying the dashboard files to the output folder
 * and optionally opening it in the browser.
 */

const fs   = require('fs');
const path = require('path');

const SRC_DIR  = path.join(__dirname, '..', 'dashboard');
const DEST_DIR = path.join(__dirname, '..', 'dashboard-report');

// Ensure destination exists
if (!fs.existsSync(DEST_DIR)) {
  fs.mkdirSync(DEST_DIR, { recursive: true });
}

// Copy all dashboard files
['index.html', 'styles.css', 'dashboard.js'].forEach(file => {
  const src  = path.join(SRC_DIR, file);
  const dest = path.join(DEST_DIR, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`✓ Copied ${file}`);
  }
});

// Copy results.json from test-results into dashboard-report/test-results/
const resultsDir  = path.join(DEST_DIR, 'test-results');
const resultsSrc  = path.join(__dirname, '..', 'test-results', 'results.json');
const resultsDest = path.join(resultsDir, 'results.json');

if (!fs.existsSync(resultsDir)) {
  fs.mkdirSync(resultsDir, { recursive: true });
}

if (fs.existsSync(resultsSrc)) {
  fs.copyFileSync(resultsSrc, resultsDest);
  const data = JSON.parse(fs.readFileSync(resultsSrc, 'utf8'));
  printSummary(data);
} else {
  console.warn('\n⚠  test-results/results.json not found. Run tests first with: npm test');
  console.log('📊 Dashboard will show demo data until tests are run.\n');
}

console.log(`\n✅ Dashboard generated at: ${DEST_DIR}/index.html`);
console.log('   Open with: open dashboard-report/index.html\n');

function printSummary(data) {
  let passed = 0, failed = 0, skipped = 0;

  function walkSuites(suites) {
    (suites || []).forEach(suite => {
      (suite.specs || []).forEach(spec => {
        (spec.tests || []).forEach(test => {
          const result = (test.results || [])[0] || {};
          const status = result.status || test.status || 'skipped';
          if (status === 'passed') passed++;
          else if (status === 'failed' || status === 'timedOut') failed++;
          else skipped++;
        });
      });
      if (suite.suites) walkSuites(suite.suites);
    });
  }

  walkSuites(data.suites || []);

  const total   = passed + failed + skipped;
  const rate    = total ? Math.round(passed / total * 100) : 0;

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  Test Run Summary');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`  Total:   ${total}`);
  console.log(`  ✅ Passed:  ${passed}`);
  console.log(`  ❌ Failed:  ${failed}`);
  console.log(`  ⏭  Skipped: ${skipped}`);
  console.log(`  📈 Pass Rate: ${rate}%`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}
