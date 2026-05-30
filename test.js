const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  await page.goto('http://localhost:3000/products');
  await page.waitForSelector('[data-testid="add-to-cart-btn"]');
  let cartText = await page.$eval('[data-testid="cart-count"]', el => el.textContent);
  console.log('Before click:', cartText);
  await page.click('[data-testid="add-to-cart-btn"]');
  cartText = await page.$eval('[data-testid="cart-count"]', el => el.textContent);
  console.log('After click:', cartText);
  await browser.close();
})();
