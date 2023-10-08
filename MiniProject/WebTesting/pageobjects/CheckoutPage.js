const { By, until } = require("selenium-webdriver");
const Page = require("./Page");

class CheckoutPage extends Page {
    constructor(driver){
        super(driver)
    }

    withoutRegisEl = By.css('#tamu-form-link')
    nameEl = By.css('#co_post_nama')
    emailEl = By.css('#co_post_email')
    phoneEl= By.css('#co_post_telp')
    provinceEl = By.css('#mdl_addr_prov option[value="6"]')
    cityEl = By.css('#mdl_addr_kota option[value="155"]')
    subdistrictEl = By.css('#mdl_addr_kec option[value="2124"]')
    postalCodeEl = By.css('#mdl_addr_kode_pos')
    addresEl = By.css('#mdl_addr_alamat')
    applyBtnEl = By.css('#btn-terapkan')
    courierel = By.css('#list_group_item_kurir > div > div.col-md-9 > label > span')
    continueCOEl = By.css('#btn-lanjut')
    


    async openPage() {
        await this.openUrl('checkout')
    }

    async clickWithoutRegis() {
        await this.driver.findElement(this.withoutRegisEl).click()
        await this.driver.sleep(2000)
    }

    async inputData1(name, email, phoneNum) {
        await this.driver.findElement(this.nameEl).sendKeys(name)
        await this.driver.findElement(this.emailEl).sendKeys(email)
        await this.driver.findElement(this.phoneEl).sendKeys(phoneNum)
    }

    async inputData2(postalCode, addres) {
        await this.driver.findElement(By.css('#frm_grp_alamat_btn > div > div > button.btn.btn-alamat.btn-block')).click()
        await this.driver.wait(until.elementLocated(this.provinceEl),2000).click()
        await this.driver.wait(until.elementLocated(this.cityEl),2000).click()
        await this.driver.sleep(2000)
        await this.driver.findElement(this.subdistrictEl).click()
        await this.driver.findElement(this.postalCodeEl).sendKeys(postalCode)
        await this.driver.findElement(this.addresEl).sendKeys(addres)
        await this.driver.findElement(this.applyBtnEl).click()
        await this.driver.sleep(2000)
    }

    async selectCourirer() {
        await this.driver.findElement(this.courierel).click()
    }

    async continueToPayment() {
        await this.driver.findElement(this.continueCOEl).click()
    }

}

module.exports = CheckoutPage