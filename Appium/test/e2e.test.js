const { remote } = require('webdriverio')
const path = require('path')
const { expect } = require('chai')
const LoginPage = require('../pageobjects/LoginPage')
const setupDriver = require('../utils/setupDriver')

describe('e2e Testing Saucedemo App', function() {

    /** @type {WebdriverIO.Browser} */ let driver

    before(async function () {
        driver = await setupDriver()
    })

    it('Aplikasi Berjalan dengan lancar', async function (){
        // Login
        await driver.$('~open menu').click()
        await driver.$('~menu item log in').click()
        await driver.$('~Username input field').setValue('bob@example.com')
        await driver.$('~Password input field').setValue('10203040')
        await driver.$('~Login button').click()
        // Add To Cart
        await driver.$('(//android.view.ViewGroup[@content-desc="store item"])[1]').click()
        await driver.$('~counter plus button').click()
        await driver.$('~counter minus button').click()
        await driver.$('~Add To Cart button').click()
        // Cart Page 
        await driver.$('~cart badge').click()
        await driver.$('~Proceed To Checkout button').click()
        // Checkout Data Page
        await driver.$('~Full Name* input field').setValue('Alexandre Christie')
        await driver.$('~Address Line 1* input field').setValue('Jl. Bambang No.21')
        await driver.$('~Address Line 2 input field').setValue('Jl. Ketapang No.112')
        await driver.$('~City* input field').setValue('Konoha')
        await driver.touchPerform([
            { action: 'press', options : {x: 200, y: 1000}},
            { action: 'wait', options : {ms: 500}},
            { action: 'moveTo', options : {x: 200, y: 500}},
            { action: 'release'},
        ])
        await driver.$('~State/Region input field').setValue('East Blue')
        await driver.$('~Zip Code* input field').setValue('15671')
        await driver.$('~Country* input field').setValue('Wano')
        await driver.$('~To Payment button').click()
        // Payment Page
        await driver.$('~Full Name* input field').setValue('Alexandre Christie')
        await driver.$('~Card Number* input field').setValue('325812657568789')
        await driver.touchPerform([
            { action: 'press', options : {x: 200, y: 1000}},
            { action: 'wait', options : {ms: 500}},
            { action: 'moveTo', options : {x: 200, y: 500}},
            { action: 'release'},
        ])
        await driver.$('~Expiration Date* input field').setValue('0325')
        await driver.$('~Security Code* input field').setValue('123')
        await driver.$('~Review Order button').click()
        // Review Order Page
        await driver.touchPerform([
            { action: 'press', options : {x: 200, y: 1000}},
            { action: 'wait', options : {ms: 500}},
            { action: 'moveTo', options : {x: 200, y: 500}},
            { action: 'release'},
        ])
        await driver.$('~Place Order button').click()
        // Checkout Complete Page
        await driver.$('~Continue Shopping button').click()
        // Logout
        await driver.pause(2000)
        await driver.$('~open menu').click()
        await driver.$('~menu item log out').click()
        await driver.$('id=android:id/button1').click()
        await driver.$('id=android:id/button1').click()
        await driver.pause(2000)
        await driver.deleteSession()
    })
})