import { test, expect } from '@playwright/test';


test('regression test', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'tag', description: '@regression' });

  await page.goto('https://bank.gov.ua');
  
  await page.click("//a[@href='/ua/uah']");
  await page.click("//html/body/main/div/div[6]/div[1]/div/div[2]/div[2]/a");
  await page.click("//a[@href='/ua/uah/investment-coins/souvenier-coins']");
  
  await page.fill("//html/body/main/div/div/div/section/div[1]/div[2]/form/div[1]/div/input", 'Новорічна іграшка');
  await page.keyboard.down('Enter');
  await page.waitForTimeout(3000);
  
  // await page.getByPlaceholder("//div[@class='search-form__input-wrapper']//input[1]").fill('Iphone');
  // await page.fill("//div[@class='pr Header_search__l09mi']//input", 'Iphone');
  // // await page.keyboard.up('Enter');
  // await page.waitForTimeout(5000);

  const msg = await page.locator("//html/body/main/div/div/div/section/div[2]/div/div[2]/div[1]/div[1]/b[2]").textContent();
  if (!msg || msg == "0 результати") {
      console.log("Монетки 'Новорічна іграшка' немає");
  } else if (msg == "1 результати") {
      console.log("1 результати");
  } else {
    console.log("Результ: ", msg);
  }
    // console.log("msg is " + msg);
    // expect(msg?.includes("0 результати")).toBeTruthy();

  // await page.waitForTimeout(10000);
});