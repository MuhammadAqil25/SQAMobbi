class KatalogPage {
    constructor(driver) { 
        this.driver = driver
    }

    get sortBtn (){ return this.driver.$('~sort button') }
    get nameDesc (){ return this.driver.$('~nameDesc')}
    get nameAsc (){ return this.driver.$('~nameAsc') }
    get priceDesc (){ return this.driver.$('~priceDesc') }
    get priceAsc (){ return this.driver.$('~priceAsc') }

    async sortNameAsc(){
        await this.sortBtn.click()
        const options = await this.nameAsc
        await options.waitForExist()
        await options.click()
    }

    async sortNameDesc(){
        await this.sortBtn.click()
        const options = await this.nameDesc
        await options.waitForExist()
        await options.click()
    }

    async sortPriceAsc(){
        await this.sortBtn.click()
        const options = await this.priceAsc
        await options.waitForExist()
        await options.click()
    }

    async sortPriceDesc(){
        await this.sortBtn.click()
        const options = await this.priceDesc
        await options.waitForExist()
        await options.click()
    }

    async getNameText(index) {
        return (await this.driver.$(`(//android.widget.TextView[@content-desc="store item text"])[${index}]`).getText())
         
    }

    async getPriceText(index) {
        return (await this.driver.$(`(//android.widget.TextView[@content-desc="store item price"])[${index}]`).getText())
    }

    async clickProduct(index) {
        await this.driver.$(`(//android.view.ViewGroup[@content-desc="store item"])[${index}]`).click()
    }
}

module.exports = KatalogPage