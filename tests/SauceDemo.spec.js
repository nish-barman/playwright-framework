const {test, expect}= require('@playwright/test');

test('First Playwright test', async ({page}) => 
{

 await page.goto("https://www.saucedemo.com/");   
 await expect(page.locator(".login_logo")).toBeVisible();
 await page.locator("#user-name").fill("standard_user");
 await page.locator("#password").fill("secret_sauce");
 await page.locator("#login-button").click();
//console.log(await page.title());    
 await page.waitForLoadState('networkidle');
 await page.locator(".select_container").click();
 await page.locator(".product_sort_container")
  .selectOption("lohi");
  const actualPrices = await page.locator(".inventory_item_price")
    .allTextContents();
console.log(actualPrices);
const expectedPrices =
 [...actualPrices].sort((a,b) => a-b);
 expect(actualPrices).toEqual(expectedPrices);


 const product=await page.locator(".inventory_item").filter({ hasText: "Sauce Labs Onesie" });
await product.locator("#add-to-cart-sauce-labs-onesie").click();
await page.locator(".shopping_cart_link").click();
await page.locator("[data-test='checkout']").click();
await page.getByPlaceholder("First Name").fill("Nishant");
await page.getByPlaceholder("Last Name").fill("Nishu");
await page.locator("[name='postalCode']").fill("560076");
//await page.waitForTimeout(3000);
await page.locator("#continue").click();
await expect(
 page.locator("[data-test='total-info-label']")
).toContainText("Price Total");
await page.locator("#finish").click();
page.getByText("Sauce Labs Onesie")

await expect(page.locator(".complete-header"))
  .toHaveText("Thank you for your order!");
//await page.waitForTimeout(2000);
await page.locator("#back-to-products").click();
const products =await page.locator(".inventory_item");
const productsCount=await products.count();
console.log(productsCount);

for (let i=0; i < productsCount; ++i)
  {
    await products.nth(i).getByRole('button', { name: 'Add to cart' }).click();

    }
    await page.locator(".shopping_cart_link").click();
await page.locator("[data-test='checkout']").click();
await page.getByPlaceholder("First Name").fill("Nishant");
await page.getByPlaceholder("Last Name").fill("Nishu");
await page.locator("[name='postalCode']").fill("560076");
//await page.waitForTimeout(3000);  
await page.locator("#continue").click();
await page.locator("#finish").click();
await expect(page.locator(".complete-header"))
  .toHaveText("Thank you for your order!");
})
