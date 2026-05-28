const { test } = require('@playwright/test');

const { LoginPage } =
require('../Pages/LoginPage');

const { ProductsPage } =
require('../Pages/ProductsPage');

const { CartPage } =
require('../Pages/CartPage');

const { PaymentPage } =
require('../Pages/PaymentPage');

const data =
require('../Utils/testData');

test('Search product and place order', async ({ page }) =>
{
    await page.goto("https://automationexercise.com/");

    const loginPage =
        new LoginPage(page);

    const productsPage =
        new ProductsPage(page);

    const cartPage =
        new CartPage(page);

    const paymentPage =
        new PaymentPage(page);

    // Login

    await loginPage.login(
        data.email,
        data.password
    );

    // Search Product

    await productsPage.searchProduct(
        "Sleeveless Dress"
    );

    // Open Product Details

    await productsPage.openProductDetails(3);

    // Validate Product Details

    await productsPage.validateProductDetails(
        "Sleeveless Dress",
        "1000"
    );

    // Update Quantity

    await productsPage.updateQuantity(3);

    // Add To Cart

    await productsPage.addToCart();

    // Go To Cart

    await productsPage.goToCart();

    // Checkout

    await cartPage.proceedToCheckout();

    // Validate Product

    await cartPage.validateProduct(
        "Sleeveless Dress"
    );

    // Validate Address

    await cartPage.validateAddress(
        data.address,
        data.name
    );

    // Validate Total

    await cartPage.validateTotal(
        3,
        "3000"
    );

    // Place Order

    await cartPage.placeOrder();

    // Payment

    await paymentPage.makePayment(data);

    // Final Validation

    await paymentPage.validateOrder();
});