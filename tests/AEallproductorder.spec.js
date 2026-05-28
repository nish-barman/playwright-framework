const {test, expect}= require('@playwright/test');

test('First Playwright test', async ({page}) => 
{

 await page.goto("https://automationexercise.com/");   
await page.getByRole("link",{name: 'login'}).click();
await page.locator("[data-qa='login-email']").fill("nishbarman4u2@gmail.com");
await page.locator("[name='password']").fill("Nish@135");
await page.locator("[data-qa='login-button']").click();
await page.getByRole("link",{name: 'products'}).click();
await page.locator("a[href='/brand_products/Polo']").click();
const products =await page.locator(".single-products");
const productsCount=await products.count();
console.log(productsCount);

for (let i=0; i < productsCount; ++i)
  {
  
    await products.nth(i).locator(".btn.btn-default.add-to-cart").first().click();
    await page.locator(".btn.btn-success.close-modal").click();

    }
//await product.locator(".btn.btn-default.add-to-cart").click();
await page.locator("a[href='/view_cart']").first().click();
const removeProduct = page.locator("tr").filter({ hasText: "Blue Top" });
await removeProduct.locator(".fa.fa-times").click();
await page.locator(".btn.btn-default.check_out").click();
//await expect(page.locator(".cart_description")).toContainText("Pure Cotton V-Neck T-Shirt");
await expect(page.locator("#address_delivery")).toContainText("Bangalore Karnataka 560076");
await expect(page.locator("#address_invoice")).toContainText("Nishant");
await page.locator(".btn.btn-default.check_out").click();
await page.locator("[data-qa='name-on-card']").fill("Nishant");
await page.locator(".form-control.card-number").fill("112233445566");
await page.locator(".form-control.card-cvc").fill("311")
await page.locator("[data-qa='expiry-month']").fill("04");
await page.locator("[data-qa='expiry-year']").fill("2029");
await page.locator("[data-qa='pay-button']").click();
await expect(page.locator("p:has-text('Congratulations! Your order has been confirmed!')")).toBeVisible();
})
