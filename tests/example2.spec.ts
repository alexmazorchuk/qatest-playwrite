import { test, expect } from '@playwright/test';


test('regression2 test', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'tag', description: '@regression2' });


  await page.goto('https://bank.gov.ua');
  
  await page.click("//a[@href='/ua/markets']");
  await page.click("//a[@href='/ua/markets/interest-rates']");
  await page.waitForTimeout(3000);
  
  await page.isVisible("//div[@id='container-846']/div[1]/div[2]/div[1]/div[2]/div[1]");



});
