const fs = require('fs');
const path = require('path');

function parseReport(filePath) {
  try {
    const report = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const audits = report.audits;
    return {
      file: path.basename(filePath),
      TTFB: audits['server-response-time']?.numericValue?.toFixed(2) || 'N/A',
      FCP: audits['first-contentful-paint']?.numericValue?.toFixed(2) || 'N/A',
      LCP: audits['largest-contentful-paint']?.numericValue?.toFixed(2) || 'N/A',
      TTI: audits['interactive']?.numericValue?.toFixed(2) || 'N/A',
      TBT: audits['total-blocking-time']?.numericValue?.toFixed(2) || 'N/A',
      CLS: audits['cumulative-layout-shift']?.numericValue?.toFixed(3) || 'N/A',
      Score: report.categories?.performance?.score ? (report.categories.performance.score * 100).toFixed(0) : 'N/A',
    };
  } catch (error) {
    console.error(`Error parsing ${filePath}:`, error.message);
    return null;
  }
}

const resultsDir = path.join(__dirname, 'results');

if (!fs.existsSync(resultsDir)) {
  console.log('No results directory found.');
  process.exit(0);
}

const files = fs.readdirSync(resultsDir).filter(f => f.endsWith('.json'));

if (files.length === 0) {
  console.log('No JSON files found in results directory.');
  process.exit(0);
}

console.log('Performance Metrics Summary:');
console.table(files.map(f => parseReport(path.join(resultsDir, f))).filter(Boolean));
