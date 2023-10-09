const { expect } = require("chai")
const setupDriver = require("../utils/setupDriver")
const LoginPage = require("../pageobject/LoginPage")
const KatalogPage = require("../pageobject/KatalogPage")
const DetailProductPage = require("../pageobject/DetailProductPage")
const CheckoutPage = require("../pageobject/CheckoutPage")

describe('Checkout Page Testing', function() {

    /** @type {WebdriverIO.Browser} */ let driver
    /** @type {LoginPage} */ let loginPage
    /** @type {KatalogPage} */ let katalogPage
    /** @type {DetailProductPage} */ let detailProductPage
    /** @type {CheckoutPage} */ let checkoutPage

    before(async function() {
        driver = await setupDriver()
        loginPage = new LoginPage(driver)
        katalogPage = new KatalogPage(driver)
        detailProductPage = new DetailProductPage(driver)
        checkoutPage = new CheckoutPage(driver)
        await loginPage.skipWelcomePage()
        await loginPage.openLoginPage()
        await loginPage.loginProcess('alex@mail.com', 'alex123456')
        await loginPage.backNav()
        await loginPage.touchPage(600, 700)
        await katalogPage.scrollPage(1250, 100)
        await katalogPage.selectProduct()
        await detailProductPage.scrollPage(1000, 600)
        await detailProductPage.selectColor()
        await detailProductPage.selectType()
        await detailProductPage.plusQty()
        await detailProductPage.checkoutBtn()
    })
    //negatif
    describe('Checkout Without Input Address', function() {
        it('Show Alert at the Bottom Page', async function() {
            await checkoutPage.scrollPage(700, 300)
            await checkoutPage.inputData1('', 'White House', '275323')
            await checkoutPage.inputData2('Fuusha', 'East Blue', 'One Piece')
            await checkoutPage.scrollPage(1000, 200)
            await checkoutPage.checkoutBtn()
            const alertText = await checkoutPage.getAlertText()
            expect(alertText).to.equal('Please Enter Your Address')
        })
    })

    describe('Checkout Without Input Landmark', function() {
        it('Show Alert at the Bottom Page', async function() {
            await checkoutPage.scrollPage(700, 300)
            await checkoutPage.inputData1('Jl. Portgas D Ace No.22 Rt.45 Rw.03', '', '275323')
            await checkoutPage.inputData2('Fuusha', 'East Blue', 'One Piece')
            await checkoutPage.scrollPage(1000, 200)
            await checkoutPage.checkoutBtn()
            const alertText = await checkoutPage.getAlertText()
            expect(alertText).to.equal('Please Enter Landmark')
        })
    })

    describe('Checkout Without Input Pin Code', function() {
        it('Show Alert at the Bottom Page', async function() {
            await checkoutPage.scrollPage(700, 300)
            await checkoutPage.inputData1('Jl. Portgas D Ace No.22 Rt.45 Rw.03', 'White House', '')
            await checkoutPage.inputData2('Fuusha', 'East Blue', 'One Piece')
            await checkoutPage.scrollPage(1000, 200)
            await checkoutPage.checkoutBtn()
            const alertText = await checkoutPage.getAlertText()
            expect(alertText).to.equal('Please Enter 6 Digit Pincode')
        })
    })

    describe('Checkout With Input Pin Code Less Than 6', function() {
        it('Show Alert at the Bottom Page', async function() {
            await checkoutPage.scrollPage(700, 300)
            await checkoutPage.inputData1('Jl. Portgas D Ace No.22 Rt.45 Rw.03', 'White House', '27532')
            await checkoutPage.inputData2('Fuusha', 'East Blue', 'One Piece')
            await checkoutPage.scrollPage(1000, 200)
            await checkoutPage.checkoutBtn()
            const alertText = await checkoutPage.getAlertText()
            expect(alertText).to.equal('Please Enter 6 Digit Pincode')
        })
    })

    describe('Checkout Without Input City', function() {
        it('Show Alert at the Bottom Page', async function() {
            await checkoutPage.scrollPage(700, 300)
            await checkoutPage.inputData1('Jl. Portgas D Ace No.22 Rt.45 Rw.03', 'White House', '275323')
            await checkoutPage.inputData2('', 'East Blue', 'One Piece')
            await checkoutPage.scrollPage(1000, 200)
            await checkoutPage.checkoutBtn()
            const alertText = await checkoutPage.getAlertText()
            expect(alertText).to.equal('Please Enter City Name')
        })
    })

    describe('Checkout Without Input State', function() {
        it('Show Alert at the Bottom Page', async function() {
            await checkoutPage.scrollPage(700, 300)
            await checkoutPage.inputData1('Jl. Portgas D Ace No.22 Rt.45 Rw.03', 'White House', '275323')
            await checkoutPage.inputData2('Fuusha', '', 'One Piece')
            await checkoutPage.scrollPage(1000, 200)
            await checkoutPage.checkoutBtn()
            const alertText = await checkoutPage.getAlertText()
            expect(alertText).to.equal('Please Enter State Name')
        })
    })

    describe('Checkout Without Input Country', function() {
        it('Show Alert at the Bottom Page', async function() {
            await checkoutPage.scrollPage(700, 300)
            await checkoutPage.inputData1('Jl. Portgas D Ace No.22 Rt.45 Rw.03', 'White House', '275323')
            await checkoutPage.inputData2('Fuusha', 'East Blue', '')
            await checkoutPage.scrollPage(1000, 200)
            await checkoutPage.checkoutBtn()
            const alertText = await checkoutPage.getAlertText()
            expect(alertText).to.equal('Please Enter Country Name')
        })
    }) 

    describe('Input Wrong Coupon Code', function() {
        it('Show Alert Under the Input Coupon', async function() {
            await checkoutPage.scrollPage(700, 300)
            await checkoutPage.inputData1('', '', '')
            await checkoutPage.inputData2('', '', '')
            await checkoutPage.scrollPage(1000, 200)
            await checkoutPage.couponProcess('alex44')
            const alert = await driver.$('id=com.studiobluelime.ecommerceapp:id/txtcouponcodestatus')
            await alert.waitForDisplayed()
            const alertText = await alert.getText()
            expect(alertText).to.equal('Wrong Coupon Code')
        })
    })

    //positive
    describe('Fill All Data and Select a Payment Method', function() {
        it('Checkout Successful and Go to Order Placed Page', async function() {
            await checkoutPage.scrollPage(700, 300)
            await checkoutPage.inputData1('Jl. Portgas D Ace No.22 Rt.45 Rw.03', 'White House', '275323')
            await checkoutPage.inputData2('Fuusha', 'East Blue', 'One Piece')
            await checkoutPage.scrollPage(1000, 200)
            await checkoutPage.checkoutBtn()
            await checkoutPage.paymentProcess()
            const text = await driver.$('android.widget.TextView').getText()
            expect(text).to.equal('Order Placed')
        })
    })

    afterEach(async function() {
        await checkoutPage.scrollPage(200, 1250)
    })

    after(async function() {
        await driver.pause(2000)
        await driver.deleteSession()
    })
})