import { Page, Locator } from '@playwright/test';
export class LoginPage{
    page: Page;
  loginbutton: Locator;
    userName: Locator;
    password: Locator;

    constructor(page: Page) 
    {
        this.page=page;
        this.loginbutton=page.locator("#login");
        this.userName= page.locator("#userEmail");
        this.password=page.locator("#userPassword");
    }
async goTo()
{
    await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
}
    async validLogin(username: string, password: string)
    {
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.loginbutton.click();
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(".card-body b").first().waitFor();
    }
}
