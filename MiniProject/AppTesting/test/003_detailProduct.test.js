const { expect } = require("chai")
const setupDriver = require("../utils/setupDriver")
const KatalogPage = require("../pageobject/KatalogPage")
const DetailProductPage = require("../pageobject/DetailProductPage")
const LoginPage = require("../pageobject/LoginPage")

describe('Detail Product Page Testing', function() {

    /** @type {WebdriverIO.Browser} */ let driver
    /** @type {LoginPage} */ let loginPage
    /** @type {KatalogPage} */ let katalogPage
    /** @type {DetailProductPage} */ let detailProductPage

    before(async function() {
        driver = await setupDriver()
        loginPage = new LoginPage(driver)
        katalogPage = new KatalogPage(driver)
        detailProductPage = new DetailProductPage(driver)
        await loginPage.skipWelcomePage()
        await loginPage.openLoginPage()
        await loginPage.loginProcess('alex@mail.com', 'alex123456')
        await loginPage.backNav()
        await loginPage.touchPage(600, 700)
        await katalogPage.scrollPage(1250, 100)
        await katalogPage.selectProduct()
        await detailProductPage.scrollPage(1000, 600)
    })

    //Negatif
    describe('Plus Minus Button Quantity', function() {
        it('Quantity Plus 1', async function() {
            await detailProductPage.plusQty()
            const qty = await detailProductPage.getQtyText()
            expect(qty).to.equal('1')
        })
        it('Quantity Minus 1', async function() {
            await detailProductPage.minusQty()
            const qty = await detailProductPage.getQtyText()
            expect(qty).to.equal('0')
        })
    })

    describe('Add To Cart and Buy Now Without Choosing Color And Adding Quantity', function() {
        it('Show Alert at Bottom Page', async function() {
            await detailProductPage.addToCart()
            const alert1 = await detailProductPage.getAlertText()
            await detailProductPage.checkoutBtn()
            await driver.pause(2000)
            const alert2 = await detailProductPage.getAlertText()
            expect(alert1).to.equal('Select Color')
            expect(alert2).to.equal('Select Color')
        })
    })

    describe('Add To Cart and Buy Now Without Choosing Type And Adding Quantity', function() {
        it('Show Alert at Bottom Page', async function() {
            await detailProductPage.selectColor()
            await detailProductPage.addToCart()
            const alert1 = await detailProductPage.getAlertText()
            await driver.pause(2000)
            await detailProductPage.checkoutBtn()
            const alert2 = await detailProductPage.getAlertText()
            expect(alert1).to.equal('Select Size')
            expect(alert2).to.equal('Select Size')
        })
    })

    describe('Add To Cart and Buy Now without Adding Quantity', function() {
        it('Show Alert at Bottom Page', async function() {
            await detailProductPage.selectType()
            await detailProductPage.addToCart()
            const alert1 = await detailProductPage.getAlertText()
            await driver.pause(2000)
            await detailProductPage.checkoutBtn()
            const alert2 = await detailProductPage.getAlertText()
            expect(alert1).to.equal('Select Number Of Quantity')
            expect(alert2).to.equal('Select Number Of Quantity')
        })
    })

    //Positif
    describe('Add To Cart and Buy Now', function() {
        it('Go To Cart Page', async function() {
            await detailProductPage.plusQty()
            await detailProductPage.addToCart()
            await detailProductPage.cartNav()
            const text =  await driver.$('id=com.studiobluelime.ecommerceapp:id/shopingcart_productname').getText()
            await detailProductPage.backNav()
            expect(text).to.equal('Note 9 Pro (Black) [128gb]')
        })
        it('Go To Checkout Page', async function() {
            await detailProductPage.checkoutBtn()
            const text =  await driver.$('id=com.studiobluelime.ecommerceapp:id/textView_ct').getText()
            expect(text).to.equal('Customer Details')
        })
    })

    afterEach(async function() {
        await driver.pause(3000)
    })

    after(async function() {
        await driver.pause(2000)
        await driver.deleteSession()
    })
})