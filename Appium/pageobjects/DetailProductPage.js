class DetailProductPage {
    constructor(driver){
        this.driver = driver
    }

    get notification() { return this.driver.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView')}
    get clsModalBtn() { return this.driver.$('~Close Modal button')}
    get plusBtn() { return this.driver.$('~counter plus button')}
    get minusBtn() { return this.driver.$('~counter minus button')}
    get amountCount() { return this.driver.$('//android.view.ViewGroup[@content-desc="counter amount"]/android.widget.TextView')}
    get addProduct() {return this.driver.$('~Add To Cart button')}
    get cartAmount() { return this.driver.$('//android.view.ViewGroup[@content-desc="cart badge"]/android.widget.TextView')}

    async clickStar(index) {
        await this.driver.$(`//android.view.ViewGroup[@content-desc="review star ${index}"]/android.widget.TextView`).click()
    }

    async getNotificationText() {
        const notif = await this.notification
        await notif.waitForExist()
        await notif.getText()
        return notif
    }

    async closeModal() {
        await this.clsModalBtn.click()
    }

    async plusCounter(){
        await this.plusBtn.click()
        const amountCounter = parseInt(await this.amountCount.getText())
        return amountCounter
    }

    async minusCounter(){
        await this.minusBtn.click()
        const amountCounter = parseInt(await this.amountCount.getText())
        return amountCounter
    }

    async addToCart() {
        await this.addProduct.click()
        const amountCounter = parseInt(await this.cartAmount.getText())
        return amountCounter
    }

}

module.exports = DetailProductPage