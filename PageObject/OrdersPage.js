const { expect } = require('@playwright/test');
class OrdersPage
{
  constructor(page)
  { this.page=page; 
this.orderBtn=page.locator("button[routerlink*=orders]");
this.rows=page.locator(".table-bordered tbody tr");
this.orderDetails=page.locator(".col-text")
}
async verifyOrder(orderId) {
await this.orderBtn.click();
await this.page.locator("tbody").waitFor();
const orderIdCount= await this.rows.count();
for (let i=0; i< orderIdCount; ++i)
{
    const orderDetails= await this.rows.nth(i).locator("th").textContent();
    if (orderId.includes(orderDetails))
    {
        await this.rows.nth(i).locator("text=View").click() ; 
        break;

    }
}
const ordId= await this.orderDetails.textContent();
await expect (orderId.includes(ordId)).toBeTruthy();
}}
module.exports={OrdersPage}