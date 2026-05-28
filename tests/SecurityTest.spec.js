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
await userEmail.fill("nishbarman4u6@gmail.com");
await userPwd.fill("Nishu@135");
await login.click();
await page.locator("button[routerlink*=orders]").click();
await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    route=> route.continue({url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=69c41ec5f86ba51a652968f6"})
)
await page.locator("button:has-text('View')").first().click() ; 
console.log(await page.locator(".blink_me").textContent());
//await page.pause();
      

});

