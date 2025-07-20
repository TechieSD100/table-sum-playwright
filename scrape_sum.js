// scrape_sum.js
const { chromium } = require('playwright');

const urls = [
  "https://sanand0.github.io/tdsdata/js_table/?seed=62",
  "https://sanand0.github.io/tdsdata/js_table/?seed=63",
  "https://sanand0.github.io/tdsdata/js_table/?seed=64",
  "https://sanand0.github.io/tdsdata/js_table/?seed=65",
  "https://sanand0.github.io/tdsdata/js_table/?seed=66",
  "https://sanand0.github.io/tdsdata/js_table/?seed=67",
  "https://sanand0.github.io/tdsdata/js_table/?seed=68",
  "https://sanand0.github.io/tdsdata/js_table/?seed=69",
  "https://sanand0.github.io/tdsdata/js_table/?seed=70",
  "https://sanand0.github.io/tdsdata/js_table/?seed=71"
];

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  let totalSum = 0;

  for (const url of urls) {
    await page.goto(url);
    await page.waitForSelector('table');

    const numbers = await page.$$eval('table td', tds =>
      tds.map(td => parseFloat(td.textContent.replace(/[^0-9.\-]/g, ''))).filter(n => !isNaN(n))
    );

    totalSum += numbers.reduce((a, b) => a + b, 0);
  }

  console.log("TOTAL SUM ACROSS ALL TABLES:", totalSum);
  await browser.close();
})();
