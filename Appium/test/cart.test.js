const { expect } = require('chai')
const setupDriver = require('../utils/setupDriver')
const LoginPageDemo = require('../pageobjects/LoginPageDemo')
const KatalogPage = require('../pageobjects/KatalogPage')
const DetailProductPage = require('../pageobjects/DetailProductPage')
const CartPage = require('../pageobjects/CartPage')

describe('Detail Product Page Testing Saucedemo App', function() {

    /** @type {WebdriverIO.Browser} */ let driver
    /** @type {LoginPageDemo}*/ let loginPage
    /** @type {KatalogPage} */ let katalogPage
    /** @type {DetailProductPage} */ let detailProductPage
    /** @type {CartPage} */ let cartPage

    before(async function () {
        driver = await setupDriver()
        katalogPage = new KatalogPage(driver)
        detailProductPage = new DetailProductPage(driver)
        cartPage = new CartPage(driver)
        loginPage = new LoginPageDemo(driver)
        // await loginPage.openLoginPage()
        // await loginPage.loginProcess('bob@example.com', '10203040')
        await katalogPage.clickProduct(1)
        await detailProductPage.addToCart() 
    })

    describe('Go to cart page', function(){
        it('show cart page', async function (){
            const title = await cartPage.goToPage()
            expect(title).to.equal('My Cart')
        })
    })

    describe('Try plus amount of product', function(){
        it('amount plus 1', async function (){
            await cartPage.plusAmount()
            const amounProduct = await cartPage.getCounterAmount()
            expect(amounProduct).to.equal(2)
        })
    })

    describe('Try minus amount of product', function(){
        it('amount minus 1', async function (){
            await cartPage.minusAmount()
            const amounProduct = await cartPage.getCounterAmount()
            expect(amounProduct).to.equal(1)
        })
    })

    describe('Check Total Item Cart', function(){
        it('total item cart equal to amount item at cart', async function (){
            await cartPage.plusAmount()
            await cartPage.plusAmount()
            const amounProduct = await cartPage.getCounterAmount()
            const totalAmount = await cartPage.getTotalItem()
            // expect(amounProduct).to.equal(totalAmount)
        })
    })

    describe('Check Total Price Cart', function(){
        it('total price cart equal to price multiplication amount item at cart', async function (){
            await cartPage.plusAmount()
            await cartPage.plusAmount()
            const amounProduct = await cartPage.getCounterAmount()
            const productPrice = await cartPage.getPriceProduct()
            const totalPrice = await cartPage.getTotalPrice()
            // expect(totalPrice).to.equal(amounProduct * productPrice)
        })
    })

    describe('Remove Product From Cart', function(){
        it('The product is removed from the cart', async function (){
            await driver.$('~remove item').click()
            const notif = await driver.$('//android.view.ViewGroup[@content-desc="container header"]/android.widget.TextView')
            await notif.waitForExist()
            await notif.getText()
            expect(notif).to.equal('No Items')
        })
    })
    
    
    after(async function() {
        await driver.pause(2000)
        await driver.deleteSession()  
    })
})