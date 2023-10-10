const chai = require('chai')
const { WebDriver, By } = require('selenium-webdriver')
const setupDriver = require('../utils/SetupDriver')
const LoginPage = require('../pageobjects/LoginPage')

const expect = chai.expect

describe('Mizan Store Login Page', function() {
    /** @type {WebDriver} */ let driver
    /** @type {LoginPage} */ let loginPage

    before(async function() {
        driver = await setupDriver()
        loginPage = new LoginPage(driver)
        await driver.manage().window().maximize()
        await loginPage.openPage()
    })

    describe('Login without input email and password', function() {
        it('Show Alert at Top Input Email and Password Box', async function() {
            await loginPage.openPage()
            await loginPage.loginProcess('', '')
            await loginPage.clickLoginBtn()
            const alertText = await loginPage.alertEmail()
            expect(alertText).to.include('The Email Customer field is required.')
        })
    })

    describe('Login without input email', function() {
        it('Show Alert at Top Input Email Box', async function() {
            await loginPage.openPage()
            await loginPage.loginProcess('', 'alex123456')
            await loginPage.clickLoginBtn()
            const alertText = await loginPage.alertEmail()
            expect(alertText).to.include('The Email Customer field is required.')
        })
    })

    describe('Login without input password', function() {
        it('Show Alert at Top Input Password Box', async function() {
            await loginPage.openPage()
            await loginPage.loginProcess('aqilcihara@gmail.com', '')
            await loginPage.clickLoginBtn()
            const alertText = await loginPage.alertPassword()
            expect(alertText).to.include('The Password Customer field is required.')
        })
    })

    describe('Login with wrong email', function() {
        it('Show Alert at Top Page', async function() {
            await loginPage.openPage()
            await loginPage.loginProcess('blackowl@gmail.com', 'alex123456')
            await loginPage.clickLoginBtn()
            const alertText = await loginPage.topAlert()
            expect(alertText).to.include('Email Belum Pernah Di Registrasi')
        })
    })

    describe('Login with wrong password', function() {
        it('Show Alert at Top Page', async function() {
            await loginPage.openPage()
            await loginPage.loginProcess('aqilcihara@gmail.com', 'alexandrechristie123')
            await loginPage.clickLoginBtn()
            const alertText = await loginPage.topAlert()
            expect(alertText).to.include('Email Atau Password Salah')
        })
    })

    describe('Login with correct email and password', function() {
        it('Go to Account Page', async function() {
            await loginPage.openPage()
            await loginPage.loginProcess('aqilcihara@gmail.com', 'alex123456')
            await loginPage.clickLoginBtn()
            const text = await driver.findElement(By.css('body > div.wrapper.push-wrapper > div.container > div > div.col-md-3 > div > h4')).getText()
            expect(text).to.include('Menu Account')
            
        })
    })

    after(async function() {
        await new Promise(done => setTimeout(done, 3000))
        await driver.close()
    })
})
