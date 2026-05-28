const { expect } = require('@playwright/test');
class PaymentPage{
    constructor(page)
     {
        this.page=page;
        this.name=page.locator("[data-qa='name-on-card']");
        this.cardNumber=page.locator(".form-control.card-number");
        this.cvc=page.locator(".form-control.card-cvc");
        this.month=page.locator("[data-qa='expiry-month']");
        this.year=page.locator("[data-qa='expiry-year']");
        this.payBtn=page.locator("[data-qa='pay-button']");

    }
 async makePayment(data)
 {
   await this.name.fill(data.cardName);
await this.cardNumber.fill(data.cardNumber);
await this.cvc.fill(data.cvc)
await this.month.fill(data.month);
await this.year.fill(data.year);
await this.payBtn.click();

 }

  async validateOrder()
  {
await expect(this.page.locator("p:has-text('Congratulations! Your order has been confirmed!')")).toBeVisible();
  }




}
module.exports={PaymentPage}