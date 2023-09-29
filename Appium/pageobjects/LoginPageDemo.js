class LoginPageDemo {
    constructor(driver){
        this.driver = driver
    }

    get openMenu () { return this.driver.$('~open menu')}
    get menuLogin () { return this.driver.$('~menu item log in')}
    get usernameEl () { return this.driver.$('~Username input field')} 
    get passwordEl () { return this.driver.$('~Password input field')} 
    get btnLoginEl () { return this.driver.$('~Login button')}

    async openLoginPage() {
        await this.openMenu.click()
        await this.menuLogin.click()
    }

    async loginProcess(username, password) {
        await this.usernameEl.setValue(username)
        await this.passwordEl.setValue(password)
        await this.btnLoginEl.click()
    }
}

module.exports = LoginPageDemo