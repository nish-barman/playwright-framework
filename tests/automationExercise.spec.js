const {test, expect}= require('@playwright/test');

test('First Playwright test', async ({page}) => 
{

 await page.goto("https://automationexercise.com/");   
await page.getByRole("link",{name: 'login'}).click();
await page.getByPlaceholder("Name").fill("Nishant");
await page.locator("[data-qa='signup-email']").fill("nishbarman4u3@gmail.com");
await page.locator("[data-qa='signup-button']").click();
await page.locator("[value='Mr']").click();
await page.locator("#password").fill("Nish@135");
await page.locator("#days").selectOption("1");
await page.locator("#months").selectOption("6");
await page.locator("#years").selectOption("1992");
await page.locator("#optin").click();
await page.locator("#first_name").fill("Nishant");
await page.locator("#last_name").fill("Nishant");
await page.locator("#company").fill("Cerillion");
await page.locator("#address1").fill("ABC");
await page.locator("#country").selectOption("India");
await page.locator("#state").fill("Karnataka");
await page.locator("#city").fill("Bangalore");
await page.locator("#zipcode").fill("560076");
await page.locator("#mobile_number").fill("7062372272");
await page.locator("[data-qa='create-account']").click();
await expect(page.locator(".col-sm-9"))
  .toContainText("Congratulations! Your new account has been successfully created!");
await page.locator("[data-qa='continue-button']").click();  
await page.getByRole("link",{name: 'products'}).click();
await page.locator("a[href='#Men'] i.fa-plus").click();
await page.locator("a[href='/category_products/3']").click();
 const product=await page.locator(".single-products").filter({ hasText: "Pure Cotton V-Neck T-Shirt" });
 await product.locator(".btn.btn-default.add-to-cart").click();
 await page.locator("a[href='/view_cart']").click();
})
