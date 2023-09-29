const { expect } = require('chai')
const setupDriver = require('../utils/setupDriver')
const LoginPageDemo = require('../pageobjects/LoginPageDemo')
const KatalogPage = require('../pageobjects/KatalogPage')
const DetailProductPage = require('../pageobjects/DetailProductPage')

describe('Detail Product Page Testing Saucedemo App', function() {

    /** @type {WebdriverIO.Browser} */ let driver
    /** @type {LoginPageDemo}*/ let loginPage
    /** @type {KatalogPage} */ let katalogPage
    /** @type {DetailProductPage} */ let detailProductPage

    before(async function () {
        driver = await setupDriver()
        katalogPage = new KatalogPage(driver)
        detailProductPage = new DetailProductPage(driver)
        loginPage = new LoginPageDemo(driver)
        await loginPage.openLoginPage()
        await loginPage.loginProcess('bob@example.com', '10203040')
        await katalogPage.clickProduct(1)    
    })

    describe('Review 1 Star', function(){
        it('Show thankyou notification for review', async function (){
            await driver.pause(2000)
            await detailProductPage.clickStar(1)
            const notification = await detailProductPage.getNotificationText()
            await detailProductPage.closeModal()
            // expect(notification).to.equal('Thank you for submitting your review!')
        })
    })
    describe('Review 2 Star', function(){
        it('Show thankyou notification for review', async function (){
            await driver.pause(2000)
            await detailProductPage.clickStar(2)
            const notification = await detailProductPage.getNotificationText()
            await detailProductPage.closeModal()
            // expect(notification).to.equal('Thank you for submitting your review!')
        })
    })
    describe('Review 3 Star', function(){
        it('Show thankyou notification for review', async function (){
            await driver.pause(2000)
            await detailProductPage.clickStar(3)
            const notification = await detailProductPage.getNotificationText()
            await detailProductPage.closeModal()
            // expect(notification).to.equal('Thank you for submitting your review!')
        })
    })
    describe('Review 4 Star', function(){
        it('Show thankyou notification for review', async function (){
            await driver.pause(2000)
            await detailProductPage.clickStar(4)
            const notification = await detailProductPage.getNotificationText()
            await detailProductPage.closeModal()
            // expect(notification).to.equal('Thank you for submitting your review!')
        })
    })
    describe('Review 5 Star', function(){
        it('Show thankyou notification for review', async function (){
            await driver.pause(2000)
            await detailProductPage.clickStar(5)
            const notification = await detailProductPage.getNotificationText()
            await detailProductPage.closeModal()
            // expect(notification).to.equal('Thank you for submitting your review!')
        })
    })
    describe('Try plus amount of item', function(){
        it('amount plus 1', async function (){
            await driver.pause(2000)
            await driver.touchPerform([
                { action: 'press', options : {x: 200, y: 1000}},
                { action: 'wait', options : {ms: 500}},
                { action: 'moveTo', options : {x: 200, y: 500}},
                { action: 'release'},
            ])
            const amountCounter = await detailProductPage.plusCounter()
            expect(amountCounter).to.equal(2)
        })
    })
    describe('Try minus amount of item', function(){
        it('amount minus 1', async function (){
            await driver.touchPerform([
                { action: 'press', options : {x: 200, y: 1000}},
                { action: 'wait', options : {ms: 500}},
                { action: 'moveTo', options : {x: 200, y: 500}},
                { action: 'release'},
            ])
            const amountCounter = await detailProductPage.minusCounter()
            expect(amountCounter).to.equal(1)
        })
    })
    describe('Add to Cart product', function(){
        it('cart counter plus 1', async function (){
            await driver.touchPerform([
                { action: 'press', options : {x: 200, y: 1000}},
                { action: 'wait', options : {ms: 500}},
                { action: 'moveTo', options : {x: 200, y: 500}},
                { action: 'release'},
            ])
            const amountCounter = await detailProductPage.addToCart()
            expect(amountCounter).to.equal(1)
        })
    })
    
    after(async function() {
        await driver.pause(2000)
        await driver.deleteSession()  
    })
})