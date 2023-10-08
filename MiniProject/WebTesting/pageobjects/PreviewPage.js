const { By } = require("selenium-webdriver");
const Page = require("./Page");

class PreviewPage extends Page {
    constructor(driver){
        super(driver)
    }

    addresChangeEl = By.css('body > div.wrapper.push-wrapper > div.shop-cart > div > div:nth-child(3) > div > div:nth-child(1) > a')
    selPaymentEl = By.css('body > div.wrapper.push-wrapper > div.shop-cart > div > div:nth-child(3) > div > div:nth-child(2) > a')

    async openPage() {
        await this.openUrl('checkout/order_preview')
    }

    async clickAddresChange() {
        await this.driver.findElement(this.addresChangeEl).click()
    }

    async clickSelectPayment() {
        await this.driver.findElement(this.selPaymentEl).click()
    }

}

module.exports = PreviewPage