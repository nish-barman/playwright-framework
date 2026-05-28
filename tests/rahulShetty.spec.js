const {test, expect}= require('@playwright/test');

test('First Playwright test', async ({browser}) => 
{
const context=await browser.newContext();
const page= await context.newPage();
const userEmail= page.locator("#userEmail");
const userPwd=page.locator("#userPassword");
const login=page.locator("#login");
await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
console.log(await page.title());    
await expect(page).toHaveTitle("Let's Shop");
await page.locator(".text-reset").click();
await page.locator("#firstName").fill("Nishant");
await page.locator("#lastName").fill("Barman");
await userEmail.fill("nishbarman4u6@gmail.com");
await page.locator("#userMobile").fill("7062372272");
//await page.locator("[formcontrolname='occupation']").click();
await page.locator("[formcontrolname='occupation']")
  .selectOption("1: Doctor");
//await page.locator('option[value="1: Doctor"]').click();
await page.locator("[value='Male']").click();
await userPwd.fill("Nishu@135");
await page.locator("#confirmPassword").fill("Nishu@135");
await page.locator("[type='checkbox']").click();
await login.click();
console.log(await page.locator(".headcolor").textContent());
await expect(page.locator(".headcolor")).toContainText('Account');
await page.locator(".btn.btn-primary").click();
await userEmail.fill("nishbarman4u6@gmail.com");
await userPwd.fill("Nishu@135");
await login.click();
//await expect(page.locator(".card-body b").nth(0)).toContainText('ADIDAS ORIGINAL');
//console.log(await page.locator(".card-body b").nth(0).textContent());
//await expect(page.locator(".card-body b")).toContainText('ADIDAS');
//await expect(locator).toContainText('ADIDAS ORIGINAL');
await page.waitForLoadState('networkidle');
console.log(await page.locator(".card-body b").allTextContents());

//await page.locator(".card-body a").first().waitFor();

//const titles = await page.locator(".card-body a").allTextContents();
//console.log(titles);


});