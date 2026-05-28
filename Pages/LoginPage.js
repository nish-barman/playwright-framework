
class LoginPage{
    constructor(page)
    {
        this.page=page;
        this.loginLink=page.getByRole("link",{name: 'login'});
        this.email=page.locator("[data-qa='login-email']");
        this.password=page.locator("[name='password']");
        this.loginButton=page.locator("[data-qa='login-button']");
    }

    async login(userEmail,userPassword)
    {

await this.loginLink.click();
await this.email.fill(userEmail);
await this.password.fill(userPassword);
await this.loginButton.click();
    }
}
module.exports={LoginPage}