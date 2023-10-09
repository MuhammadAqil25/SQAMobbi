const Page = require("./Page")


class LoginPage extends Page {
    constructor (driver) {
        super(driver)
    }

    get loginMenuEl() {return this.driver.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout[2]/androidx.drawerlayout.widget.DrawerLayout/android.widget.FrameLayout/androidx.recyclerview.widget.RecyclerView/androidx.appcompat.widget.LinearLayoutCompat[4]')}
    get usernameEl() {return this.driver.$('id=com.studiobluelime.ecommerceapp:id/et_login_username')}
    get passwordEl() {return this.driver.$('id=com.studiobluelime.ecommerceapp:id/et_login_password')}
    get loginBtnEl() {return this.driver.$('id=com.studiobluelime.ecommerceapp:id/btn_login')}
    get alertEl() {return this.driver.$('id=com.studiobluelime.ecommerceapp:id/snackbar_text')}
    get showPassEl() { return this.driver.$('~Show password')}

    
    async openLoginPage() {
        await this.burgerNav()
        const loginMenu = await this.loginMenuEl
        await loginMenu.waitForDisplayed({timeout: 3000})
        await loginMenu.click()
        await this.driver.pause(2000)
    }

    async loginProcess(email, password){
        await this.usernameEl.setValue(email)
        await this.passwordEl.setValue(password)
        await this.loginBtnEl.click()
        await this.driver.pause(2000)
    }

    async getAlertText() {
        const alert = await this.alertEl
        await alert.waitForDisplayed({timeout : 3000})
        const alertText = await alert.getText()
        return alertText
    }

    async getPassAtt() {
        await this.driver.pause(2000)
        const passAttribute = await this.passwordEl.getAttribute('password')
        return passAttribute
    }

    async showPass() {
        await this.showPassEl.click()
    }
}

module.exports = LoginPage