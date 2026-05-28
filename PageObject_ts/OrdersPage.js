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
exports.OrdersPage = void 0;
const test_1 = require("@playwright/test");
//const { expect } = require('@playwright/test');
class OrdersPage {
    constructor(page) {
        this.page = page;
        this.orderBtn = page.locator("button[routerlink*=orders]");
        this.rows = page.locator(".table-bordered tbody tr");
        this.orderDetails = page.locator(".col-text");
    }
    verifyOrder(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.orderBtn.click();
            yield this.page.locator("tbody").waitFor();
            const orderIdCount = yield this.rows.count();
            for (let i = 0; i < orderIdCount; ++i) {
                let orderDetails;
                orderDetails = yield this.rows.nth(i).locator("th").textContent();
                if (orderId.includes(orderDetails)) {
                    yield this.rows.nth(i).locator("text=View").click();
                    break;
                }
            }
            let ordId;
            ordId = yield this.orderDetails.textContent();
            yield (0, test_1.expect)(orderId.includes(ordId)).toBeTruthy();
        });
    }
}
exports.OrdersPage = OrdersPage;
//module.exports={OrdersPage}
