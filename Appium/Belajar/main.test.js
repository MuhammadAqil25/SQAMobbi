const { remote } = require('webdriverio')
const path = require('path')
const chai = require('chai')
const LoginPage = require('../pageobjects/LoginPage')

const expect = chai.expect

const options = {
    hostname : '127.0.0.1',
    port : 4723,
    logLevel : 'error',
    capabilities : {
        'platformName' : 'Android',
        'appium:automationName' : 'UIAutomator2',
        'appium:deviceName' : 'emulator-5554',
        'appium:app' : path.join(process.cwd(), 'app/dummy.apk'),
        'appium:appActivity' : '.MainActivity'
    }
}

describe('Login Page Testing', function () {
    /** @type {WebdriverIO.Browser} */ let driver
    /** @type {LoginPage} */ let loginPage

    before(async function() {
        driver = await remote(options)
        loginPage = new LoginPage(driver)
        await driver.$('~Login').click()
    })

    // describe('Input Correct Email and Password', function(){
    //     it('Get Success Notification', async function(){
    //         await loginPage.loginProcess("alex@test.com", "12345678") 
    //         // const massage = await driver.$('~android:id/alertTitle')
    //         // await massage.waitForDisplayed()
    //         // const successMassage = await massage.getValue()
    //         // expect(successMassage).to.equal('Success')
    //     })
    // })

    describe('Blank the input of username and password', function(){
        it('Show alert under the username & password', async function(){
            await loginPage.loginProcess("", "")
            const massage = await driver.$('.android.widget.TextView').getValue()
            expect(massage).to.equal('Please enter a valid email address')
        })
    })

    describe('Blank the input of username', function(){
        it('Show alert under the username', async function(){  
            await loginPage.loginProcess("", "12345678")
            const massage = await driver.$('.android.widget.TextView').getValue()
            expect(massage).to.equal('Please enter a valid email address')
        })
    })

    // describe('Blank the input of password', function(){
    //     it('Show alert under the password', async function(){ 
    //         await loginPage.loginProcess("alex@test.com", "")
    //         const massage = await driver.$('.android.widget.TextView').getValue()
    //         expect(massage).to.equal('Please enter a valid email address')
    //     })
    // })

    after(async function() {
        await driver.pause(2000)
        await driver.deleteSession()
    })
})