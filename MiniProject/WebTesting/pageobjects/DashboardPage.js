const { By } = require("selenium-webdriver");
const Page = require("./Page");

class DashboardPage extends Page {
    constructor(driver){
        super(driver)
    }

    navBarsEl = [
        By.xpath('//*[@id="header"]/nav/div/div/div[4]/ul/li[0]/a'),
        By.xpath('//*[@id="header"]/nav/div/div/div[4]/ul/li[1]/a'),
        By.xpath('//*[@id="header"]/nav/div/div/div[4]/ul/li[2]/a'),
        By.xpath('//*[@id="header"]/nav/div/div/div[4]/ul/li[3]/a'),
        By.xpath('//*[@id="header"]/nav/div/div/div[4]/ul/li[4]/a')
    ]
    searchBarEl = By.css('#kata_pencarian_xx')
    searcgBtnEl = By.css('#form_pencarian_xx > div > div > button')

    async openPage() {
        await this.openUrl()
    }

    async clickNavBar(number) {
        await this.driver.findElement(this.navBarsEl[number]).click()
    }

    async searchProcess(key) {
        await this.driver.findElement(this.searchBarEl).sendKeys(key)
        await this.driver.findElement(this.searcgBtnEl).click()
    }

    async specialProduct(number) {
        await this.driver.actions().scroll(10, 10, 0, 200).perform()    
        await this.driver.findElement(By.css(`#shop-collection-content-x > div > div:nth-child(${number})`)).click()
    }

    async bukuTerbaru(number) {
        await this.driver.actions().scroll(10, 10, 0, 1000).perform()
        await this.driver.sleep(2000)    
        await this.driver.findElement(By.xpath(`/html/body/div[1]/section[1]/div/div[4]/div/div/div/div/div[${number}]`)).click()
    }

    async bukuTerlaris(number) {
        await this.driver.actions().scroll(10, 10, 0, 1900).perform()
        await this.driver.sleep(2000)    
        await this.driver.findElement(By.xpath(`/html/body/div[1]/section[1]/div/div[6]/div/div/div/div/div[${number}]`)).click()
    }

    async Al_Quran(number) {
        await this.driver.actions().scroll(10, 10, 0, 2500).perform()
        await this.driver.sleep(2000)    
        await this.driver.findElement(By.xpath(`/html/body/div[1]/section[1]/div/div[8]/div/div/div/div/div[${number}]`)).click()
    }
}

module.exports = DashboardPage