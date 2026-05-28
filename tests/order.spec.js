const { test } = require('@playwright/test');

const { LoginPage } = require('../Pages/Loginpage');
const { ProductsPage } = require('../Pages/ProductsPage');
const { CartPage } = require('../Pages/CartPage');
const { PaymentPage } = require('../Pages/PaymentPage');
const data = require('../Utils/testData');

let productsPage;
let cartPage;
let paymentPage;

test.beforeEach(async ({ page }) =>
{
    await page.goto("https://automationexercise.com/");

    const loginPage = new LoginPage(page);

    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    paymentPage = new PaymentPage(page);

    await loginPage.login(data.email,data.password);
});
test('Order flow test', async ({ page }) =>
{

  await productsPage.openPoloProducts();
   await productsPage.addAllProducts();
    await productsPage.goToCart();
     await cartPage.removeProduct("Blue Top");
    await cartPage.proceedToCheckout();
     await cartPage.validateAddress();  
 await cartPage.placeOrder();
  await paymentPage.makePayment(data);
   await paymentPage.validateOrder();
});