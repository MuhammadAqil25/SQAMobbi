const Page = require("./Page");
const { By, until } = require("selenium-webdriver")

class CartPage extends Page {
    constructor(driver){
        super(driver)
    }

    plusBtnEl = By.css('.sp-plus')
    minusBtnEl = By.css('.sp-minus')
    deleteItemBtnEl = By.css('#frm_show > div > div.col-md-8.table-responsive > table > tbody > tr > td:nth-child(4) > a > i')
    deleteCartBtnEl = By.css('#btn-keranjang > a.btn.btn-danger.pull-left')
    continueShopEl = By.css('#btn-keranjang > a.btn.btn-warning.pull-left')
    coBtnEl = By.css('#checkout_do')
    voucherBtnEl = By.css('#disc_code > div > table > tbody > tr:nth-child(3) > td:nth-child(2) > button')
    inputVoucherEl = By.css('#kode_voucher')
    useVoucherEl = By.css('#disc_code > div > table > tbody > tr:nth-child(3) > td:nth-child(1) > a')
    alertVoucherEl = By.css('#show-voucher-v1 > div:nth-child(2) > div > div > div')

    async openPage(){
        await this.openUrl('keranjang')
    }

    async clickPlusButton() {
        await this.driver.findElement(this.plusBtnEl).click()
    }

    async clickMinusButton() {
        await this.driver.findElement(this.minusBtnEl).click()
    }

    async clickDeleteItemButton() {
        await this.driver.findElement(this.deleteItemBtnEl).click()
    }

    async clickDeleteCartButton() {
        await this.driver.findElement(this.deleteCartBtnEl).click()
    }

    async clickContinueShop() {
        await this.driver.findElement(this.continueShopEl).click()
    }

    async clickCheckout() {
        await this.driver.findElement(this.coBtnEl).click()
    }

    async clickViewVoucher() {
        await this.driver.findElement(this.voucherBtnEl).click()
    }

    async voucherModals() {
        const modals = this.driver.findElement(By.css('#modal-voucher > div > div > div.modal-header > h5'))
        await this.driver.wait(until.elementIsVisible(modals), 3000)
        return modals
    }

    async inputVoucherProcess(keys) {
        await this.driver.findElement(this.inputVoucherEl).sendKeys(keys)
        await this.scrollPage(200)
        await this.driver.findElement(this.useVoucherEl).click()
    }
    
    async alertVoucher() {
        const alert = await this.driver.findElement(this.alertVoucherEl)
        await this.driver.wait(until.elementIsVisible(alert), 300)
        return alert
    }

}

module.exports = CartPage