const Page = require("./Page");
const { By, until } = require("selenium-webdriver")

class LoginPage extends Page {
    constructor(driver){
        super(driver)
    }

    emailEl = By.css('#form_login_member > div:nth-child(2) > input[type=text]')
    passwordEl = By.css('#form_login_member > div:nth-child(3) > input[type=password]')
    loginBtnEl = By.css('#form_login_member > div:nth-child(4) > button')
    alertEmailEl = By.css('#form_login_member > div:nth-child(2) > label > div')
    alertpassEl = By.css('#form_login_member > div:nth-child(3) > label > div')
    topAlertEl = By.css('body > div.wrapper.push-wrapper > div > div:nth-child(1) > div > div')

    async openPage(){
        await this.openUrl('customer/login')
    }

    async loginProcess(email, password) {
        await this.driver.findElement(this.emailEl).sendKeys(email)
        await this.driver.findElement(this.passwordEl).sendKeys(password)
    }

    async clickLoginBtn() {
        await this.driver.findElement(this.loginBtnEl).click()
    }

    async alertEmail() {
        return await this.driver.findElement(this.alertEmailEl).getText()
    }

    async alertPassword() {
        return await this.driver.findElement(this.alertpassEl).getText()
    }

    async topAlert() {
        return await this.driver.findElement(this.topAlertEl).getText()
    }

}

module.exports = LoginPage