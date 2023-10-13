const { expect } = require("chai")
const setupDriver = require("../../utils/setupDriver")
const LoginPage = require("../../pageobject/LoginPage")

describe('Login Page Testing', function() {

    /** @type {WebdriverIO.Browser} */ let driver
    /** @type {LoginPage} */ let loginPage

    before(async function() {
        driver = await setupDriver()
        loginPage = new LoginPage(driver)
        await loginPage.skipWelcomePage()
        await loginPage.openLoginPage()
    })


    describe('Login Without Input Email and Password', function() {
        it('Show Alert at the Bottom Page', async function() {
            await loginPage.loginProcess('', '')
            const alertText = await loginPage.getAlertText()
            expect(alertText).to.equal('Please Enter Correct Email ID')
        })
    })

    describe('Login Without Input Email', function() {
        it('Show Alert at the Bottom Page', async function() {
            await loginPage.loginProcess('', 'alex123456')
            const alertText = await loginPage.getAlertText()
            expect(alertText).to.equal('Please Enter Correct Email ID')
        })
    })

    describe('Login Without Input Password', function() {
        it('Show Alert at the Bottom Page', async function() {
            await loginPage.loginProcess('alex@mail.com', '')
            const alertText = await loginPage.getAlertText()
            expect(alertText).to.equal('Please Enter Password')
        })
    })

    describe('Login Entered The Wrong Email', function() {
        it('Show Alert at the Bottom Page', async function() {
            await loginPage.loginProcess('alexxx@mail.com', 'alex123456')
            const alertText = await loginPage.getAlertText()
            expect(alertText).to.equal('Invalid Username Or Password')
        })
    })

    describe('Login Entered The Wrong Password', function() {
        it('Show Alert at the Bottom Page', async function() {
            await loginPage.loginProcess('alex@mail.com', 'alex1234567')
            const alertText = await loginPage.getAlertText()
            expect(alertText).to.equal('Invalid Username Or Password')
        })
    })

    describe('Click Show Password Button', function() {
        it('Show The Password At The Input Box', async function() {
            await loginPage.loginProcess('', 'alex1234567')
            await loginPage.showPass()
            const passAttribute = await loginPage.getPassAtt()
            expect(passAttribute).to.equal('false')
        })
    })

    describe('Login With Correct Email and Password', function() {
        it('Go To My Account Page', async function() {
            await loginPage.loginProcess('alex@mail.com', 'alex123456')
            const text = await driver.$('android.widget.TextView').getText()
            expect(text).to.equal('My Account')
        })
    })

    after(async function() {
        await driver.pause(2000)
        await driver.deleteSession()
    })
})