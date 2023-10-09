const { expect } = require('chai')
const setupDriver = require('../utils/setupDriver')
const LoginPage = require('../pageobject/LoginPage')
const KatalogPage = require('../pageobject/KatalogPage')
const DetailProductPage = require('../pageobject/DetailProductPage')
const CheckoutPage = require('../pageobject/CheckoutPage')
const AccountPage = require('../pageobject/AccountPage')

describe('E2E Checkout testing', function() {
    /** @type {WebdriverIO.Browser} */ let driver
    /** @type {LoginPage} */ let loginPage
    /** @type {KatalogPage} */ let katalogPage
    /** @type {DetailProductPage} */ let detailProductPage
    /** @type {CheckoutPage} */ let checkoutPage
    /** @type {AccountPage} */ let accountPage

    before(async function() {
        driver = await setupDriver()
        loginPage = new LoginPage(driver)
        katalogPage = new KatalogPage(driver)
        detailProductPage = new DetailProductPage(driver)
        checkoutPage = new CheckoutPage(driver)
        accountPage = new AccountPage(driver)
    })

    describe('Open Application and Login', function() {
        it('Completed Login and Back To Main Menu', async function() {
            //Login
            await loginPage.skipWelcomePage()
            await loginPage.openLoginPage()
            await loginPage.loginProcess('alex@mail.com', 'alex123456')
            const text = await driver.$('android.widget.TextView').getText()
            expect(text).to.equal('My Account')
            await loginPage.backNav()
            await loginPage.touchPage(600, 700)
        })

        describe('Select the Product You Want to Buy', function() {
            it('Go to the Selected Product Detail Page', async function() {
                //Main Menu
                await katalogPage.scrollPage(1250, 100)
                await katalogPage.selectProduct()
                const text = await driver.$('android.widget.TextView').getText()
                expect(text).to.equal('Product')
            })
        })

        describe('Choose Color and Number of Products', function() {
            it('Quantity Product equal 1 and Go to Checkout Page', async function() {
                // Detail Product
                await detailProductPage.selectColor()
                await detailProductPage.selectType()
                await detailProductPage.scrollPage(500, 200)
                await detailProductPage.plusQty()
                const qty = await driver.$('id=com.studiobluelime.ecommerceapp:id/pv_txt_quantity').getText()
                expect(qty).to.equal('1')
                await detailProductPage.checkoutBtn()
                const text = await driver.$('android.widget.TextView').getText()
                expect(text).to.equal('Check Out')
            })
        })

        describe('Fill All Data and Select a Payment Method', function() {
            it('Checkout Successful and Go to Order Placed Page', async function() {
                //Checkout Page
                await checkoutPage.scrollPage(700, 300)
                await checkoutPage.inputData1('Jl. Portgas D Ace No.22 Rt.45 Rw.03', 'White House', '275323')
                await checkoutPage.inputData2('Fuusha', 'East Blue', 'One Piece')
                await checkoutPage.scrollPage(1000, 200)
                const itemName = await driver.$('id=com.studiobluelime.ecommerceapp:id/textname').getText()
                expect(itemName).to.equal('Note 9 Pro')
                await checkoutPage.checkoutBtn()
                await checkoutPage.paymentProcess()
                const text = await driver.$('android.widget.TextView').getText()
                expect(text).to.equal('Order Placed')
            })
        })

        describe('Check the Order and Logout', function() {
            it('Checkout Success and Back To Login Page', async function() {
                // My Orders Page
                await accountPage.backNav()
                await accountPage.openAccountMenu()
                await accountPage.logout()
                const text = await driver.$('android.widget.TextView').getText()
                expect(text).to.equal('Login')
            })
        })

        after(async function() {
            await driver.pause(2000)
            await driver.deleteSession()  
        })
    })
})



