const {test, expect}= require('@playwright/test');

test('First Playwright test', async ({page}) => 
{

    const monthNumber="6";
    const date="15";
    const year="2027";
    const expectedList=[monthNumber,date,year];

await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
await page.locator(".react-date-picker__calendar-button").click();
await page.locator(".react-calendar__navigation__label").click();
await page.locator(".react-calendar__navigation__label").click();
await page.getByText(year).click();
await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber-1)).click();
await page.locator("//abbr[text()='"+date+"']").click();
//await page.locator("//abbr[text()='"+date+"']")
const inputs= page.locator("..react-date-picker__inputGroup")
for (let i=0; i<expectedList; i++)
{
   await expect (inputs.nth(i).toHavevalue(expectedList[i]));
        
    
}

});