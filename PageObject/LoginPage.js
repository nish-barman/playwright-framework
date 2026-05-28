class LoginPage{
    constructor(page)
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
    async validLogin(username,password)
    {
        await this.userName.type(username);
        await this.password.type(password);
        await this.loginbutton.click();
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(".card-body b").first().waitFor();
    }
}
module.exports={LoginPage}