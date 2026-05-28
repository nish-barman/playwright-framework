const {test, expect}= require('@playwright/test');

test('First Playwright test', async ({page}) => 
{

 await page.goto("https://rahulshettyacademy.com/AutomationPractice/");   
 await expect(page.locator("#displayed-text")).toBeVisible();
  await page.locator("#hide-textbox").click();
await expect(page.locator("#displayed-text")).toBeHidden();
page.on('dialog', dialog => dialog.accept());
await page.locator("#confirmbtn").click();
await page.locator("#mousehover").hover();
const framesPage=page.frameLocator("#courses-iframe");
await framesPage.locator("li a[href*='lifetime-access']:visible").click();
const textCheck=await framesPage.locator("div.text h2").textContent();
console.log(textCheck.split(" ")[1]);

});

test ("Screenshot", async ({page}) => 
{
     await page.goto("https://rahulshettyacademy.com/AutomationPractice/");   
 await expect(page.locator("#displayed-text")).toBeVisible();
  await page.locator("#displayed-text").screenshot({path: 'PartialScreenshot.png'})
  await page.locator("#hide-textbox").click();
  await page.screenshot({path: 'screenshot.png'});
await expect(page.locator("#displayed-text")).toBeHidden();
});

//test.only("visual",async ({page}) => 
//{
 //await page.goto("https://google.com");
 //expect(await page.screenshot()).toMatchSnapshot('landing.png'); 
//})