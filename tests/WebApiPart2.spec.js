const {test, expect}= require('@playwright/test');
let webContext;

test.beforeAll(async({browser})=>
{
const context= await browser.newContext();
const page= await context.newPage();
const userEmail= page.locator("#userEmail");

const userPwd=page.locator("#userPassword");
const login=page.locator("#login");
await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
console.log(await page.title());    
await userEmail.fill("nishbarman4u6@gmail.com");
await userPwd.fill("Nishu@135");
await login.click();
await page.locator(".card-body b").first().waitFor();
await context.storageState({path:'state.json'});
webContext= await browser.newContext({storageState:'state.json'})
})
test('@API Web API Part2', async () => 
{
const page= await webContext.newPage();
await page.goto("https://rahulshettyacademy.com/client");



//await page.waitForLoadState('networkidle');

const productName='ZARA COAT 3';
const products=page.locator(".card-body");
const titles= await page.locator(".card-body b").allTextContents();
console.log(titles);
const count=await products.count();
for (let i=0; i < count; ++i)
{
    if (await products.nth(i).locator("b").textContent()===productName)
    {
      await products.nth(i).locator("text= Add To Cart").click() ;      
      break;
      
    }
}
await page.locator("[routerlink*='cart']").click();
await page.locator("div li").first().waitFor();
const bool=page.locator("h3:has-text('ZARA COAT 3')").isVisible();
expect(bool).toBeTruthy();
await page.locator("text=Checkout").click();
await page.locator(".input.ddl").last().selectOption("27");
  await page.locator("text=CVV Code").locator("..").locator("input").fill("123");
  await page.locator("[placeholder*=Country]").pressSequentially("ind");
  const options= page.locator(".ta-results");
  await options.waitFor();
  const optionsCount= await options.locator("button").count();
  for (let i=0; i < optionsCount; ++i)
  {
    const text= await options.locator("button").nth(i).textContent();
    if (text === " India")
    {
       await options.locator("button").nth(i).click();
       break; 
    }
  }
 await expect(page.locator(".user__name [type=text]").first()).toHaveText("nishbarman4u6@gmail.com");
 await page.locator(".action__submit").click();
 await expect (page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")
 const orderid=await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
 console.log(orderid);
await page.locator("button[routerlink*=orders]").click();
await page.locator("tbody").waitFor();
const rows = page.locator(".table-bordered tbody tr");
const orderIdCount= await rows.count();
for (let i=0; i< orderIdCount; ++i)
{
    const orderDetails= await rows.nth(i).locator("th").textContent();
    if (orderid.includes(orderDetails))
    {
        await rows.nth(i).locator("text=View").click() ; 
        break;

    }
}
const ordId= await page.locator(".col-text").textContent();
expect (orderid.includes(ordId)).toBeTruthy();
});