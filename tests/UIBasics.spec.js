const {test, expect}= require('@playwright/test');

test('First Playwright test', async ({browser}) => 
{
const context=await browser.newContext();
const page= await context.newPage();
const userName= page.locator("#username");
const documentLink= page.locator('[href="https://rahulshettyacademy.com/documents-request"]');
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
console.log(await page.title());    
await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
await userName.fill("rahulshettyacademy1");
await page.locator("[type='password']").fill("Learning@830$3mK2");
await page.locator("#signInBtn").click();
console.log(await page.locator("[style*='block']").textContent());
await expect(page.locator("[style*='block']")).toContainText('Incorrect');
await userName.fill("");
await userName.fill("rahulshettyacademy");
const dropdown=page.locator("select.form-control");
await dropdown.selectOption("consult");
await page.locator(".radiotextsty").last().click();
await page.locator("#okayBtn").click();
expect(page.locator(".radiotextsty").last()).toBeChecked();
await page.locator("#terms").click();
expect(page.locator("#terms")).toBeChecked();
await page.locator("#terms").uncheck();
expect( await page.locator("#terms").isChecked()).toBeFalsy();
//await page.pause();
await expect(documentLink).toHaveAttribute('class', 'blinkingText');
await expect(page.locator).toHaveAttribute
await page.locator("#signInBtn").click();
console.log(await page.locator(".card-body a").nth(1).textContent());
console.log(await page.locator(".card-body a").allTextContents());
//await page.locator(".card-body a").first().waitFor();

//const titles = await page.locator(".card-body a").allTextContents();
//console.log(titles);


});