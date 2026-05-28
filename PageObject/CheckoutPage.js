const { expect } = require('@playwright/test');
class CheckoutPage{
constructor(page)
{
      this.page=page;
   this.cart=page.locator("[routerlink*='cart']");
   this.cartItem=page.locator("div li");
   this.checkoutBtn=page.locator("text=Checkout")
   this.dropdown=page.locator(".input.ddl").last()
   this.cvv=page.locator("text=CVV Code").locator("..").locator("input")
   this.country=page.locator("[placeholder*=Country]")
   this.submitBtn=page.locator(".action__submit")
   this.successMsg=page.locator(".hero-primary")
   this.orderId=page.locator(".em-spacer-1 .ng-star-inserted");
}

async goToCart() {
    await this.cart.click();
    await this.cartItem.first().waitFor();
}

async verifyProduct()
{
    //const bool=page.locator("h3:has-text('ZARA COAT 3')").isVisible();
//expect(bool).toBeTruthy();
await expect(this.page.locator('h3:has-text("ZARA COAT 3")')).toBeVisible();
}

 async fillDetails(username) {
        await this.checkoutBtn.click();
        await this.dropdown.selectOption("27");
        await this.cvv.fill("123");

        await this.country.pressSequentially("ind");
        const options= this.page.locator(".ta-results");
        await options.waitFor();

        const optionsCount= await options.locator("button").count();
  for (let i=0; i < optionsCount; ++i)
  {
    const text= await options.locator("button").nth(i).textContent();
    if (text === " India")
    {
       await options.locator("button").nth(i).click();
       break; 
    }
  }

    await expect(this.page.locator(".user__name [type=text]").first()).toHaveText(username);
    }



   async placeOrder() {
        await this.submitBtn.click();
        await expect(this.successMsg).toHaveText(" Thankyou for the order. ");
        return await this.orderId.textContent();
    }
}

  


module.exports = { CheckoutPage };