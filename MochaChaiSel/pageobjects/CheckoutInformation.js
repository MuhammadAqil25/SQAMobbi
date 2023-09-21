const { By } = require("selenium-webdriver");
const Page = require("./Page");

class CheckoutInformation extends Page {
    constructor (driver){
        super(driver)
    }

    firstNameEl = By.id('first-name')
    lastNameEl  = By.id('last-name')
    postalCodeEl = By.id('postal-code')
    coBtn = By.css('.cart_button')
    errorEl = By.css('h3[data-test="error"]')


    async openPage () {
        await this.openUrl('/checkout-step-one.html')
    }

    async yourInformation(firstName, lastName, postalCode){
        await this.driver.findElement(this.firstNameEl).sendKeys(firstName)
        await this.driver.findElement(this.lastNameEl).sendKeys(lastName)
        await this.driver.findElement(this.postalCodeEl).sendKeys(postalCode)
        await this.driver.findElement(this.coBtn).click()
    }
   
    async errMassage() {
        const massage = await this.driver.findElement(this.errorEl).getText()
        return massage
    }
}

module.exports = CheckoutInformation