const Page = require("./Page");

class CheckoutPage extends Page {
    constructor(driver) {
        super(driver)
    }

    get addresEl() {return this.driver.$('id=com.studiobluelime.ecommerceapp:id/co_address')}
    get landmarkEl() {return this.driver.$('id=com.studiobluelime.ecommerceapp:id/co_landmark')}
    get pincodeEl() {return this.driver.$('id=com.studiobluelime.ecommerceapp:id/co_pincode')}
    get cityEl() {return this.driver.$('id=com.studiobluelime.ecommerceapp:id/co_city')}
    get stateEl() {return this.driver.$('id=com.studiobluelime.ecommerceapp:id/co_state')}
    get countryEl() {return this.driver.$('id=com.studiobluelime.ecommerceapp:id/co_country')}
    get payBtnEl() {return this.driver.$('id=com.studiobluelime.ecommerceapp:id/co_btn_paymoney')}
    get payMethodEl() {return this.driver.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/androidx.appcompat.widget.LinearLayoutCompat/android.widget.FrameLayout/android.widget.ListView/android.widget.CheckedTextView[3]')}
    get alertEl() {return this.driver.$('id=com.studiobluelime.ecommerceapp:id/snackbar_text')}
    get inputCouponEl() {return this.driver.$('id=com.studiobluelime.ecommerceapp:id/co_applycouponcode')}
    get applyCouponEl() {return this.driver.$('id=com.studiobluelime.ecommerceapp:id/co_btn_applycouponcode')}

    async inputData1(addres, landmark, pincode) {
        await this.addresEl.setValue(addres)
        await this.landmarkEl.setValue(landmark)
        await this.pincodeEl.setValue(pincode)
    }

    async inputData2(city, state, country) {
        await this.cityEl.setValue(city)
        await this.stateEl.setValue(state)
        await this.countryEl.setValue(country)
    }

    async checkoutBtn() {
        await this.payBtnEl.click()
    }

    async paymentProcess() {
        const paymentMethod = await this.payMethodEl
        await paymentMethod.waitForDisplayed({timeout: 3000})
        await paymentMethod.click()
        await this.driver.pause(4000)
    }

    async getAlertText() {
        const alert = await this.alertEl
        await alert.waitForDisplayed({timeout : 3000})
        const alertText = await alert.getText()
        return alertText
    }

    async couponProcess(key) {
        await await this.inputCouponEl.setValue(key)
        await this.applyCouponEl.click()
    }

}

module.exports = CheckoutPage