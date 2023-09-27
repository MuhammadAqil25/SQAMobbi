const { remote } = require('webdriverio')
const path = require('path')
const chai = require('chai')
const LoginPage = require('../pageobjects/LoginPage')

const expect = chai.expect

const options = {
    hostname : '0.0.0.0',
    port : 4723,
    logLevel : 'debug',
    capabilities : {
        'platformName' : 'Android',
        'appium:automationName' : 'UiAutomator2',
        'appium:deviceName' : 'emulator-5554',
        'appium:app' : path.join(process.cwd(), 'app/dummy.apk'),
        'appium:appActivity' : '.MainActivity'
    }
}

describe('Login Page Testing', function () {
    /** @type {webdriverio} */ let driver
    /** @type {LoginPage} */ let loginPage

    beforeEach(async function() {
        driver = await remote(options)
        loginPage = new LoginPage(driver)
        await driver.$('~Login').click() 
    })

    describe('Input Correct Email and Password', function(){
        it('Get Success Notification', async function(){ 
            await loginPage.loginProcess("alex@test.com", "12345678") 

            // const massage = await driver.$('').getValue()
            // await driver.waitForDisplayed(massage)
            // expect(massage).to.equal('Success')
        })
    })

    describe('Blank the input of username and password', function(){
        it('Show alert under the username & password', async function(){  
            await loginPage.loginProcess("", "")

            // const massage = await driver.$('').getValue()
            // await driver.waitForDisplayed(massage)
            // expect(massage).to.equal('Please enter a valid email address')
        })
    })

    describe('Blank the input of username', function(){
        it('Show alert under the username', async function(){  
            await loginPage.loginProcess("", "12345678")

            // const massage = await driver.$('').getValue()
            // await driver.waitForDisplayed(massage)
            // expect(massage).to.equal('Please enter a valid email address')
        })
    })

    describe('Blank the input of password', function(){
        it('Show alert under the password', async function(){  
            await loginPage.loginProcess("alex@test.com", "")

            // const massage = await driver.$('').getValue()
            // await driver.waitForDisplayed(massage)
            // expect(massage).to.equal('Please enter a valid email address')
        })
    })

    afterEach(async function() {
        await driver.pause(2000)
        await driver.deleteSession()
    })
})