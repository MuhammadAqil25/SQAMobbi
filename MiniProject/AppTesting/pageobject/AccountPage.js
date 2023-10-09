const Page = require("./Page");

class AccountPage extends Page {
    constructor(driver){
        super(driver)
    }

    get accMenuEl() {return this.driver.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout[2]/androidx.drawerlayout.widget.DrawerLayout/android.widget.FrameLayout/androidx.recyclerview.widget.RecyclerView/androidx.appcompat.widget.LinearLayoutCompat[4]')}
    get burgerBtnEl() {return this.driver.$('~App')}
    get myDetailBtnEl() {return this.driver.$('id=com.studiobluelime.ecommerceapp:id/btn_mydetails')}
    get myOrderBtnEl() {return this.driver.$('id=com.studiobluelime.ecommerceapp:id/btn_myorders')}
    get productReturnBtnEl() { return this.driver.$('id=com.studiobluelime.ecommerceapp:id/btn_product_return_request')}
    get trackOrderBtnEl() {return this.driver.$('id=com.studiobluelime.ecommerceapp:id/btn_trackmyorders')}
    get changePassBtnEl() {return this.driver.$('id=com.studiobluelime.ecommerceapp:id/btn_chg_password')}
    get logoutBtnEl() {return this.driver.$('id=com.studiobluelime.ecommerceapp:id/btn_logout')}
    
    async openAccountMenu() {
        await this.burgerBtnEl.click()
        const accountMenu = await this.accMenuEl
        await accountMenu.waitForDisplayed({timeout: 3000})
        await accountMenu.click()
        await this.driver.pause(2000)
    }

    async myDetails() {
        await this.myDetailBtnEl.click()
    }

    async myOrders() {
        await this.myOrderBtnEl.click()
    }

    async productReturns() {
        await this.productReturnBtnEl.click()
    }

    async trackOrder() {
        await this.trackOrderBtnEl.click()
    }

    async changePass() {
        await this.changePassBtnEl.click()
    }

    async logout() {
        await this.logoutBtnEl.click()
    }
}

module.exports = AccountPage