import { test, expect } from '@playwright/test';


test('regression3 test', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'tag', description: '@regression3' });

    const { chromium } = require('playwright');
    (async () => {
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
            version: '99.0.4844.51' // Укажите нужную версию здесь
        });
    })();

  await page.goto('https://bank.gov.ua');
  
  if ( await page.isVisible("//i[@class='fa fa-bars']") ) {
    await page.tap("a#menu-drawer-toggle");
    await page.click("(//a[@href='/ua/markets'])[2]");  

  } else {
    await page.click("//a[@href='/ua/markets']");
  }
  
  await page.click("//div[@id='container-767']/div[1]/div[2]/div[1]/div[1]/div[3]/div[1]/a[1]");
  await page.waitForTimeout(1000);

  const today = new Date();
  let yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate() + 1;
  let thisDay = dd + '.' + mm + '.' + yyyy;
  let linktableCurse = `https://bank.gov.ua/ua/markets/exchangerates?date=${thisDay}&period=daily`;

  await page.fill("input#date", thisDay);
  await page.keyboard.down('Enter');
  await page.waitForTimeout(3000);

  let msg = await page.locator("span#exchangeDate").textContent();
  if (msg == thisDay) {
    console.log("Результ: ", msg);
  } else {
    console.log(`Результ ${thisDay} не знайдено! ${linktableCurse}`);
    expect(msg?.includes(thisDay)).toBeTruthy();
  }

});
