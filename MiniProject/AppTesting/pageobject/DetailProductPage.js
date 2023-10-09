const Page = require("./Page");

class DetailProductPage extends Page {
    constructor(driver) {
        super(driver)
    }

    get colorEl() {return this.driver.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout[2]/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout/android.widget.ScrollView/android.widget.LinearLayout/android.widget.FrameLayout[2]/android.widget.LinearLayout/androidx.recyclerview.widget.RecyclerView[1]/android.widget.FrameLayout')}
    get typeEl() {return this.driver.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout[2]/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout/android.widget.ScrollView/android.widget.LinearLayout/android.widget.FrameLayout[2]/android.widget.LinearLayout/androidx.recyclerview.widget.RecyclerView[2]/android.widget.LinearLayout[1]')}
    get plusBtnEl() {return this.driver.$('id=com.studiobluelime.ecommerceapp:id/btn_qnt_increment')}
    get minusBtnEl() {return this.driver.$('id=com.studiobluelime.ecommerceapp:id/btn_qnt_decrement')}
    get coBtnEl() {return this.driver.$('id=com.studiobluelime.ecommerceapp:id/pv_btn_checkout')}
    get addToCartEl() { return this.driver.$('id=com.studiobluelime.ecommerceapp:id/pv_fab_addtocart')}
    get alertEl() {return this.driver.$('id=com.studiobluelime.ecommerceapp:id/snackbar_text')}
    get qtyEl() { return this.driver.$('id=com.studiobluelime.ecommerceapp:id/pv_txt_quantity')}

    async selectColor() {
        await this.colorEl.click()
    }

    async selectType() {
        await this.typeEl.click()
    }

    async plusQty() {
        await this.plusBtnEl.click()
    }

    async minusQty() {
        await this.minusBtnEl.click()
    }

    async checkoutBtn() {
        await this.coBtnEl.click()
    }

    async addToCart() {
        await this.addToCartEl.click()
    }

    async getAlertText() {
        const alert = await this.alertEl
        await alert.waitForDisplayed({timeout : 3000})
        const alertText = await alert.getText()
        return alertText
    }

    async getQtyText() {
        const qty = await this.qtyEl.getText()
        return qty
    }
}

module.exports = DetailProductPage