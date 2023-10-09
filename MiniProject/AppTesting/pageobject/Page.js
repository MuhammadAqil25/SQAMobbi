class Page {
    constructor (driver){
        /** @type {WebdriverIO.Browser} */this.driver = driver
    }

    get burgerBtnEl() {return this.driver.$('~App')}
    get backBtnEl() {return this.driver.$('~Navigate up')}
    get cartBtnEl() {return this.driver.$('~Cart')}

    async skipWelcomePage() {
        await this.driver.$('id=com.studiobluelime.ecommerceapp:id/btn_skip').click()
    }

    async scrollPage(y1, y2) {
        await this.driver.touchPerform([
            { action: 'press', options : {x: 200, y: y1}},
            { action: 'wait', options : {ms: 500}},
            { action: 'moveTo', options : {x: 200, y: y2}},
            { action: 'release'},
        ])
    }

    async touchPage(x, y){
        await this.driver.touchPerform([
            { action: 'press', options : {x: x, y: y}},
            { action: 'release'},
        ])
    }

    async backNav() {
        await this.backBtnEl.click()
    }

    async burgerNav() {
        await this.burgerBtnEl.click()
    }

    async cartNav() {
        await this.cartBtnEl.click()
    }

}

module.exports = Page