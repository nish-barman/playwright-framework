const {test, expect}= require('@playwright/test');

test('First Playwright test', async ({browser}) => 
{
const context=await browser.newContext();
const page= await context.newPage();
const userName= page.locator("#username");
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
const documentLink= page.locator('[href="https://rahulshettyacademy.com/documents-request"]');
const [newpage]=await Promise.all(
[context.waitForEvent('page'),
documentLink.click(),
])
const text = await newpage.locator(".red").textContent();
const arrayText=text.split("@");
const domain=arrayText[1].split(" ")[0]
console.log(domain);
await userName.fill(domain);
//await page.pause();
console.log(await userName.inputValue());

});