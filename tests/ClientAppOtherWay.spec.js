const {test, expect}= require('@playwright/test');

test('First Playwright test', async ({browser}) => 
{
const context=await browser.newContext();
const page= await context.newPage();
await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
console.log(await page.title());    
await page.getByPlaceholder("email@example.com").fill("nishbarman4u6@gmail.com");
await page.getByPlaceholder("enter your passsword").fill("Nishu@135");
await page.getByRole("button", {name: 'Login'}).click();
const productName='ZARA COAT 3';
const products=page.locator(".card-body");
await page.waitForLoadState('networkidle');
await page.locator(".card-body b").first().waitFor();
await page.locator(".card-body").filter({ hasText: 'ZARA COAT 3' })
.getByRole("button", {name: "Add To Cart"}).click();
await page.getByRole("listitem").getByRole("button", {name: 'Cart'}).click();
await page.locator("div li").first().waitFor();
await page.getByText("ZARA COAT 3");
await page.getByRole("button",{name:'Checkout'}).click();
await page.locator(".input.ddl").last().selectOption("27");
await page.locator("text=CVV Code").locator("..").locator("input").fill("123");
await page.getByPlaceholder("Select Country").pressSequentially("ind");
await page.getByRole("button",{name: 'India'}).nth(1).click();
await page.getByText("PLACE ORDER").click();
await expect(page.getByText("Thankyou for the order.")).toBeVisible();

});