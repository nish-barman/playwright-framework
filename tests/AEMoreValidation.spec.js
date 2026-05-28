const {test, expect}= require('@playwright/test');

test('First Playwright test', async ({page}) => 
{

 await page.goto("https://automationexercise.com/");   
await page.getByRole("link",{name: 'login'}).click();
await page.locator("[data-qa='login-email']").fill("nishbarman4u2@gmail.com");
await page.locator("[name='password']").fill("Nish@135");
await page.locator("[data-qa='login-button']").click();
await page.getByRole("link",{name: 'products'}).click();
await page.locator("#search_product").fill("Sleeveless Dress");
await page.locator("#submit_search").click();
await expect(page.locator("p").filter({ hasText: "Sleeveless Dress" }).first()).toBeVisible();
await page.locator("a[href='/product_details/3']").first().click();
await expect(page.locator("h2").filter({ hasText: "Sleeveless Dress" }).first()).toBeVisible();
await expect(page.locator("span").filter({ hasText: "Rs. 1000" }).first()).toBeVisible();
await page.locator("#quantity").fill("3");
await page.locator(".btn.btn-default.cart").click();
await page.locator("a[href='/view_cart']").first().click();

await page.locator(".btn.btn-default.check_out").click();
await expect(page.locator(".cart_description")).toContainText("Sleeveless Dress");
await expect(page.locator("#address_delivery")).toContainText("Bangalore Karnataka 560076");
await expect(page.locator("#address_invoice")).toContainText("Nishant");
await expect(page.locator("#product-3 .cart_total_price")).toContainText("3000");
await page.locator(".btn.btn-default.check_out").click();
await page.locator("[data-qa='name-on-card']").fill("Nishant");
await page.locator(".form-control.card-number").fill("112233445566");
await page.locator(".form-control.card-cvc").fill("311")
await page.locator("[data-qa='expiry-month']").fill("04");
await page.locator("[data-qa='expiry-year']").fill("2029");
await page.locator("[data-qa='pay-button']").click();
await expect(page.locator("p:has-text('Congratulations! Your order has been confirmed!')")).toBeVisible();
})
