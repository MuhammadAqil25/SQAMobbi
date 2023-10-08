const Page = require("./Page");
const { By } = require("selenium-webdriver")

class DetailProductPage extends Page {
    constructor(driver){
        super(driver)
    }

    readmoreEl = By.css('#form_add_cart > div > div > div.col-lg-8.col-md-7 > div > p > a')
    plusBtnEl = By.css('.sp-plus')
    minusBtnEl = By.css('.sp-minus')
    amountEl = By.css('.quntity-input')
    specProductEl = By.css('#tb-3')
    reviewCsEl = By.css('#tb-1')
    buyBtnEl = By.css('#klikbeli_72498')

    async openPage(){
        await this.openUrl('paket_andre_-_happy_72498')
    }

    async clickReadmore(){
        await this.driver.findElement(this.readmoreEl).click()
    }

    async clickPlusButton() {
        await this.driver.findElement(this.plusBtnEl).click()
    }

    async clickMinusButton() {
        await this.driver.findElement(this.minusBtnEl).click()
    }

    async selectThumbImage(index) {
        await this.driver.findElement(By.css(`#product-thumbs > a:nth-child(${index})`)).click()
    }

    async clickSpecProduct() {
        await this.driver.findElement(this.specProductEl).click()
    }

    async clickReviewCs() {
        await this.driver.findElement(this.reviewCsEl).click()
    }

    async clickBuy(id) {
        await this.driver.findElement(By.css(`#klikbeli_${id}`) || this.buyBtnEl).click()
    }
}

module.exports = DetailProductPage