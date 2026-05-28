// Import the Before function
const { Before,After, BeforeStep } = require('@cucumber/cucumber');
const {chromium,test, expect}= require('@playwright/test');


Before(async function () {
               this.browser= await chromium.launch({
               headless: false });
this.context=await this.browser.newContext();
this.page= await this.context.newPage();
})



BeforeStep(function() {
    });
After(async function ({ result }) {
  if (result.status === 'FAILED') {
    await this.page.screenshot({
      path: `screenshot-${Date.now()}.png`
    });
  }
});   