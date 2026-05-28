const {chromium, expect}= require('@playwright/test');
const {When,Then,Given,setDefaultTimeout,BeforeStep,AfterStep ,Status}= require('@cucumber/cucumber');
setDefaultTimeout(60 * 1000); // 60 seconds


         Given('a login to Ecommerce application with {string} and {string}', async function (username, password) {
           // Write code here that turns the phrase above into concrete actions

const userEmail= this.page.locator("#userEmail");
const userPwd=this.page.locator("#userPassword");
const login=this.page.locator("#login");
//console.log("Before navigation:", await this.page.url());
await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
//console.log("After navigation:", await this.page.url());
console.log(await this.page.title());    
await userEmail.fill("nishbarman4u6@gmail.com");
await userPwd.fill("Nishu@135");
await login.click();
const productName='ZARA COAT 4';
const products=this.page.locator(".card-body");
//await this.page.waitForLoadState('networkidle');
await this.page.locator(".card-body b").first().waitFor();
         });


         When('add {string} to cart', async function (string) {
             const products = this.page.locator(".card-body"); 
  const productName = string; 
const titles= await this.page.locator(".card-body b").allTextContents();
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

         });


         Then('verify {string} is displayed in cart', async function (string) {
           // Write code here that turns the phrase above into concrete actions
await this.page.locator("[routerlink*='cart']").click();
await this.page.locator("div li").first().waitFor();
const bool=await this.page.locator("h3:has-text('ZARA COAT 4')").isVisible();
expect(bool).toBeTruthy();
         });


         When('enter the valid details and place the order', async function () {
           // Write code here that turns the phrase above into concrete actions
await this.page.locator("text=Checkout").click();
await this.page.locator(".input.ddl").last().selectOption("27");
  await this.page.locator("text=CVV Code").locator("..").locator("input").fill("123");
  await this.page.locator("[placeholder*=Country]").pressSequentially("ind");
  const options= this.page.locator(".ta-results");
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
 await expect(this.page.locator(".user__name [type=text]").first()).toHaveText("nishbarman4u6@gmail.com");
 await this.page.locator(".action__submit").click();
 await expect (this.page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")
 //onst orderid=await this.page.locator(".em-spacer-1 .ng-star-inserted").textContent();
 this.orderid=await this.page.locator(".em-spacer-1 .ng-star-inserted").textContent();
 console.log(this.orderid);
         });



         Then('verify order is present in order history', async function () {
           // Write code here that turns the phrase above into concrete actions
await this.page.locator("button[routerlink*=orders]").click();
await this.page.locator("tbody").waitFor();
const rows = this.page.locator(".table-bordered tbody tr");
const orderIdCount= await rows.count();
for (let i=0; i< orderIdCount; ++i)
{
    const orderDetails= await rows.nth(i).locator("th").textContent();
    if (this.orderid.includes(orderDetails))
    {
        await rows.nth(i).locator("text=View").click() ; 
        break;

    }
}
const ordId= await this.page.locator(".col-text").textContent();
expect (this.orderid.includes(ordId)).toBeTruthy();
         });