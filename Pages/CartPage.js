const { expect } = require('@playwright/test');
class CartPage{
    constructor(page)
     {
        this.page=page;
        this.checkoutBtn=page.locator(".btn.btn-default.check_out");
    }
 async removeProduct(productName)
 {
   const product =
     this.page.locator("tr")
       .filter({ hasText: productName });

   await product.locator(".fa.fa-times").click();
 }
    
 async proceedToCheckout()
 {
   await this.checkoutBtn.click();
 }

async validateAddress(address,name)
{
   await expect(
      this.page.locator("#address_delivery")
   ).toContainText(address);

   await expect(
      this.page.locator("#address_invoice")
   ).toContainText(name);
}
async validateProduct(productName)
{
   await expect(
      this.page.locator(".cart_description")
   ).toContainText(productName);
}
async validateTotal(productId,total)
{
   await expect(
      this.page.locator(`#product-${productId} .cart_total_price`)
   ).toContainText(total);
}
  async placeOrder()
{
  await this.checkoutBtn.click(); 
}
 }
module.exports={CartPage}