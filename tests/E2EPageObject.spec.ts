//const {test, expect}= require('@playwright/test');
import { test, expect } from '@playwright/test';
import {LoginPage} from '../PageObject_ts/LoginPage';
import {DashboardPage} from '../PageObject_ts/DashboardPage';
import {OrdersPage} from '../PageObject_ts/OrdersPage';
import {CheckoutPage} from '../PageObject_ts/CheckoutPage';
//const { DashboardPage } = require('../PageObject/DashboardPage');
//const { CheckoutPage } = require('../PageObject/CheckoutPage');
//const { OrdersPage } = require('../PageObject/OrdersPage');
test('First Playwright test', async ({browser}) => 
{
const context=await browser.newContext();
const page= await context.newPage();
const username= 'nishbarman4u6@gmail.com';
const password='Nishu@135';

const loginPage=new LoginPage(page);
await loginPage.goTo();
await loginPage.validLogin(username,password);
console.log(await page.title());    
const productName='ZARA COAT 3';

const dashboardPage=new DashboardPage(page);
await dashboardPage.searchProduct(productName);

const checkoutPage = new CheckoutPage(page);

await checkoutPage.goToCart();
await checkoutPage.verifyProduct(productName);
await checkoutPage.fillDetails(username);

const orderId = await checkoutPage.placeOrder();
console.log(orderId);
const ordersPage = new OrdersPage(page);
if (orderId !== null) {
  await ordersPage.verifyOrder(orderId);
}

});