const { expect } = require("chai")
const setupDriver = require("../utils/setupDriver")
const LoginPage = require("../pageobject/LoginPage")
const KatalogPage = require("../pageobject/KatalogPage")
const DetailProductPage = require("../pageobject/DetailProductPage")
const CartPage = require("../pageobject/CartPage")

describe('Cart Page Testing', function() {

    /** @type {WebdriverIO.Browser} */ let driver
    /** @type {LoginPage} */ let loginPage
    /** @type {KatalogPage} */ let katalogPage
    /** @type {DetailProductPage} */ let detailProductPage
    /** @type {CartPage} */ let cartPage

    before(async function() {
        driver = await setupDriver()
        loginPage = new LoginPage(driver)
        katalogPage = new KatalogPage(driver)
        detailProductPage = new DetailProductPage(driver)
        cartPage = new CartPage(driver)
        await loginPage.skipWelcomePage()
        await loginPage.openLoginPage()
        await loginPage.loginProcess('alex@mail.com', 'alex123456')
        await loginPage.backNav()
        await loginPage.touchPage(600, 700)
        await katalogPage.scrollPage(1250, 100)
    })

    beforeEach(async function() {
        await katalogPage.selectProduct()
        await detailProductPage.scrollPage(1000, 600)
        await detailProductPage.selectColor()
        await detailProductPage.selectType()
        await detailProductPage.plusQty()
        await detailProductPage.addToCart()
        await detailProductPage.cartNav()
    })

    describe('Remove All Product From Cart', function() {
        it('Remove All Products From The Cart', async function() {
            await cartPage.removeAllProducts()
            await driver.pause(4000)
            await detailProductPage.cartNav()
            const alert = await driver.$('/hierarchy/android.widget.Toast')
            await alert.waitForExist()
            const alertText = await alert.getText()
            await detailProductPage.backNav()
            expect(alertText).to.equal('Cart Is Empty')
        })
    })

    describe('Remove Product From Cart', function() {
        it('Remove Product From The Cart', async function() {
            await cartPage.removeProduct()
            await cartPage.backNav()
            await detailProductPage.cartNav()
            const alert = await driver.$('/hierarchy/android.widget.Toast')
            await alert.waitForExist()
            const alertText = await alert.getText()
            await detailProductPage.backNav()
            expect(alertText).to.equal('Cart Is Empty')
        })
    })

    describe('Checkout Product From Cart', function() {
        it('Remove Product From The Cart', async function() {
            await cartPage.checkout()
            const text = await driver.$('android.widget.TextView').getText()
            expect(text).to.equal('Check Out')
        })
    })

    after(async function() {
        await driver.pause(2000)
        await driver.deleteSession()
    })
})