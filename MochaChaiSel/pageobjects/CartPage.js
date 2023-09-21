const Page = require("./Page");

class CartPage extends Page {
    constructor (driver){
        super(driver)
    }

    async openPage () {
        await this.openUrl('/cart.html')
    }
    

}

module.exports = CartPage