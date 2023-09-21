const { By } = require("selenium-webdriver")
const Page = require("./Page")

class LoginPage extends Page {
    // initialization
    constructor(driver){
        super(driver)
    }

    // element locators
    usernameEl = By.css('#user-name')
    passwordEl = By.css('#password')
    loginBtnEl = By.css('#login-button')
    errorEl = By.css('h3[data-test="error"]')

    // page action
    async openPage () {
        await this.openUrl()
    }

    async loginProcess (username, password) {
        await this.driver.findElement(this.usernameEl).sendKeys(username)
        await this.driver.findElement(this.passwordEl).sendKeys(password)
        await this.driver.findElement(this.loginBtnEl).click()
    }

    async errMassage (){
        const massage = await this.driver.findElement(this.errorEl).getText()
        return massage
    }
}

module.exports = LoginPage