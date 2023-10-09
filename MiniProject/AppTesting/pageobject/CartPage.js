const Page = require("./Page")


class CartPage extends Page {
    constructor (driver) {
        super(driver)
    }

    get removeEl() {return this.driver.$('id=com.studiobluelime.ecommerceapp:id/shopingcart_product_button_remove')}
    get removeAllEl() {return this.driver.$('~Delete')}
    get yesRemoveAll() {return this.driver.$('id=android:id/button1')}
    get checkoutEl() {return this.driver.$('id=com.studiobluelime.ecommerceapp:id/sc_btn_checkout')}
    
    async removeProduct() {
        await this.removeEl.click()
    }

    async removeAllProducts() {
        await this.removeAllEl.click()
        const deleteAll = await this.yesRemoveAll
        await deleteAll.waitForDisplayed()
        await deleteAll.click()
    }

    async checkout() {
        await this.checkoutEl.click()
    }

    
}

module.exports = CartPage