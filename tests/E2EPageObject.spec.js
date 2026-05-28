"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
//const {test, expect}= require('@playwright/test');
const test_1 = require("@playwright/test");
const LoginPage_1 = require("../PageObject_ts/LoginPage");
const DashboardPage_1 = require("../PageObject_ts/DashboardPage");
const OrdersPage_1 = require("../PageObject_ts/OrdersPage");
const CheckoutPage_1 = require("../PageObject_ts/CheckoutPage");
//const { DashboardPage } = require('../PageObject/DashboardPage');
//const { CheckoutPage } = require('../PageObject/CheckoutPage');
//const { OrdersPage } = require('../PageObject/OrdersPage');
(0, test_1.test)('First Playwright test', (_a) => __awaiter(void 0, [_a], void 0, function* ({ browser }) {
    const context = yield browser.newContext();
    const page = yield context.newPage();
    const username = 'nishbarman4u6@gmail.com';
    const password = 'Nishu@135';
    const loginPage = new LoginPage_1.LoginPage(page);
    yield loginPage.goTo();
    yield loginPage.validLogin(username, password);
    console.log(yield page.title());
    const productName = 'ZARA COAT 3';
    const dashboardPage = new DashboardPage_1.DashboardPage(page);
    yield dashboardPage.searchProduct(productName);
    const checkoutPage = new CheckoutPage_1.CheckoutPage(page);
    yield checkoutPage.goToCart();
    yield checkoutPage.verifyProduct(productName);
    yield checkoutPage.fillDetails(username);
    const orderId = yield checkoutPage.placeOrder();
    console.log(orderId);
    const ordersPage = new OrdersPage_1.OrdersPage(page);
    if (orderId !== null) {
        yield ordersPage.verifyOrder(orderId);
    }
}));
