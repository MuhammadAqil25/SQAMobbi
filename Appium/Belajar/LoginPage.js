class LoginPage {
    constructor(driver){
        this.driver = driver
    }

    emailEl = '~input-email'
    passwordEl = '~input-password'
    loginEl =  '~button-LOGIN'

    async loginProcess(email, password) {
        await this.driver.$(this.emailEl).setValue(email)
        await this.driver.$(this.passwordEl).setValue(password)
        await this.driver.$(this.loginEl).click()
    }
}

module.exports = LoginPage