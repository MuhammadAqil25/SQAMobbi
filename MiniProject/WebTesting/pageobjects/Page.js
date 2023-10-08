const { WebDriver, By } = require("selenium-webdriver");

class Page {
    constructor (driver){
        /** @type {WebDriver} */this.driver = driver
    }

    async openUrl(path = '/') {
        await this.driver.get('https://mizanstore.com/' + path)
    }

    async scrollPage(top) {
        await this.driver.executeScript(function() {
            window.scrollTo({
                top: top,
                behavior: 'smooth'
            })
        })
    }

    async getTextByCss(selector){
        return await this.driver.findElement(By.css(selector)).getText()
    }

    async getAttributeByCss(selector, attribute){
        return await this.driver.findElement(By.css(selector)).getAttribute(attribute)
    }
}

module.exports = Page