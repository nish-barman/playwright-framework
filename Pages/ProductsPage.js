
const { expect } = require('@playwright/test');
class ProductsPage{
    constructor(page)
    {
        this.page=page;
        this.productLink=page.getByRole("link",{name: 'products'});
        this.poloBrand=page.locator("a[href='/brand_products/Polo']");
        this.products =page.locator(".single-products")
        this.closeModal=page.locator(".btn.btn-success.close-modal");
        this.cartLink=page.locator("a[href='/view_cart']");
        //this.cartLink = page.locator("a[href='/view_cart']").last();
        this.searchBox=page.locator("#search_product");
        this.quantity=page.locator("#quantity");
        this.addToCartBtn= page.locator(".btn.btn-default.cart");

this.searchBtn=page.locator("#submit_search");  
    }

 //async openPoloProducts()
   // {
       // await this.productLink.click();
        //await this.poloBrand.click();
    //}
    async openBrandProducts(brandName)
{
    await this.productLink.click();

    await this.page
      .locator(`a[href='/brand_products/${brandName}']`)
      .click();
}

async searchProduct(productName)
{
   await this.productLink.click();

   await this.searchBox.fill(productName);

   await this.searchBtn.click();
}
async openProductDetails(productId)
{
   await this.page
    .locator(`a[href='/product_details/${productId}']`)
    .first()
    .click();
}
async validateProductDetails(name,price)
{
   await expect(
      this.page.locator("h2")
      .filter({ hasText:name })
      .first()
   ).toBeVisible();

   await expect(
      this.page.locator("span")
      .filter({ hasText:`Rs. ${price}` })
      .first()
   ).toBeVisible();
}
async updateQuantity(count)
{
   await this.quantity.fill(count.toString());
}
async addToCart()
{
   await this.addToCartBtn.click();
}
 async addAllProducts()
     {
      const count = await this.products.count();
      console.log(count);
      for (let i=0; i < count; ++i)
    {
  
    await this.products.nth(i).locator(".btn.btn-default.add-to-cart").first().click();
    await this.closeModal.click();

    }
     }

 async goToCart()
 {
    await this.cartLink.first().click();
 }


    }



module.exports={ProductsPage}