class CartPage {
    constructor(driver){
        this.driver = driver
    }

    get toCart() { return this.driver.$('~cart badge')}
    get title() { return this.driver.$('//android.view.ViewGroup[@content-desc="container header"]/android.widget.TextView')}
    get plusBtn() { return this.driver.$('~counter plus button')}
    get minusBtn() { return this.driver.$('~counter minus button')}
    get amountCount() { return this.driver.$('//android.view.ViewGroup[@content-desc="counter amount"]/android.widget.TextView')}
    get totalItem() { return this.driver.$('~total number')}
    get productPrice() { return this.driver.$('~product price')}
    get totalPrice() { return this.driver.$('~total price')}


    async goToPage() {
        await this.toCart.click()
        await this.driver.pause(1000)
        const title = await this.title.getText()
        return title
    }

    async plusAmount(){
        await this.plusBtn.click()
    }

    async minusAmount(){
        await this.minusBtn.click()
    }

    async getTotalItem() {
        const totalItems = parseInt(await this.totalItem.getText())
        return totalItems
    }

    async getCounterAmount(){
        await this.driver.pause(1000)
        const amountCounter = parseInt(await this.amountCount.getText())
        return amountCounter
    }

    async getPriceProduct(){
        await this.driver.pause(1000)
        const productPrice = await this.productPrice.getText()
        console.log(productPrice)
        return productPrice
    }

    async getTotalPrice(){
        await this.driver.pause(1000)
        const totalPrice = await this.totalPrice.getText()
        console.log(totalPrice)
        return totalPrice
    }
}

module.exports = CartPage