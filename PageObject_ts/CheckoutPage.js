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
exports.CheckoutPage = void 0;
const test_1 = require("@playwright/test");
//const { expect } = require('@playwright/test');
class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.cart = page.locator("[routerlink*='cart']");
        this.cartItem = page.locator("div li");
        this.checkoutBtn = page.locator("text=Checkout");
        this.dropdown = page.locator(".input.ddl").last();
        this.cvv = page.locator("text=CVV Code").locator("..").locator("input");
        this.country = page.locator("[placeholder*=Country]");
        this.submitBtn = page.locator(".action__submit");
        this.successMsg = page.locator(".hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
    }
    goToCart() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.cart.click();
            yield this.cartItem.first().waitFor();
        });
    }
    verifyProduct() {
        return __awaiter(this, void 0, void 0, function* () {
            //const bool=page.locator("h3:has-text('ZARA COAT 3')").isVisible();
            //expect(bool).toBeTruthy();
            yield (0, test_1.expect)(this.page.locator('h3:has-text("ZARA COAT 3")')).toBeVisible();
        });
    }
    fillDetails(username) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkoutBtn.click();
            yield this.dropdown.selectOption("27");
            yield this.cvv.fill("123");
            yield this.country.pressSequentially("ind");
            const options = this.page.locator(".ta-results");
            yield options.waitFor();
            const optionsCount = yield options.locator("button").count();
            for (let i = 0; i < optionsCount; ++i) {
                const text = yield options.locator("button").nth(i).textContent();
                if (text === " India") {
                    yield options.locator("button").nth(i).click();
                    break;
                }
            }
            yield (0, test_1.expect)(this.page.locator(".user__name [type=text]").first()).toHaveText(username);
        });
    }
    placeOrder() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.submitBtn.click();
            yield (0, test_1.expect)(this.successMsg).toHaveText(" Thankyou for the order. ");
            return yield this.orderId.textContent();
        });
    }
}
exports.CheckoutPage = CheckoutPage;
//module.exports = { CheckoutPage };
