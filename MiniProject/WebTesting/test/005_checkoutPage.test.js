const chai = require('chai')
const { WebDriver, By, until } = require('selenium-webdriver')
const setupDriver = require('../utils/SetupDriver')
const DetailProductPage = require('../pageobjects/DetailProductPage')
const CartPage = require('../pageobjects/CartPage')
const CheckoutPage = require('../pageobjects/CheckoutPage')

const expect = chai.expect

describe('Mizan Store Detail Product Page', function() {
    /** @type {WebDriver} */let driver
    /** @type {DetailProductPage} */ let detailProductPage
    /** @type {CartPage} */ let cartPage
    /** @type {CheckoutPage} */ let checkoutPage

    before(async function() {
        driver = await setupDriver()
        detailProductPage = new DetailProductPage(driver)
        cartPage = new CartPage(driver)
        checkoutPage = new CheckoutPage(driver)
        await driver.manage().window().maximize()
        await detailProductPage.openPage()
        await detailProductPage.clickBuy()
        await cartPage.clickCheckout()
    })
    //Negatif
    describe('does not fill in the entire input', function() {
        it('displays an alert after the input box', async function() {
            await checkoutPage.openPage()
            await checkoutPage.clickWithoutRegis()
            await checkoutPage.inputData1('', '', '')
            await checkoutPage.continueToPayment()
            const alert = await driver.findElement(By.css('#co_post_nama-error'))
            await driver.wait(until.elementIsVisible(alert), 3000)
            const alertText = await alert.getText()
            expect(alertText).to.equal('This field is required.')
        })
    })
    
    describe('does not fill in name input', function() {
        it('displays an alert after the name box', async function() {
            await checkoutPage.openPage()
            await checkoutPage.clickWithoutRegis()
            await checkoutPage.inputData1('', 'abc@mail.com', '087672634567')
            await checkoutPage.continueToPayment()
            const alert = await driver.findElement(By.css('#co_post_nama-error'))
            await driver.wait(until.elementIsVisible(alert), 3000)
            const alertText = await alert.getText()
            expect(alertText).to.equal('This field is required.')
        })
    })
    
    describe('does not fill in email input', function() {
        it('displays an alert after the email box', async function() {
            await checkoutPage.openPage()
            await checkoutPage.clickWithoutRegis()
            await checkoutPage.inputData1('abc', '', '087672634567')
            await checkoutPage.continueToPayment()
            const alert = await driver.findElement(By.css('#co_post_email-error'))
            await driver.wait(until.elementIsVisible(alert), 3000)
            const alertText = await alert.getText()
            expect(alertText).to.equal('This field is required.')
        })
    })
    
    
    describe('does not fill in telp input', function() {
        it('displays an alert after the telp box', async function() {
            await checkoutPage.openPage()
            await checkoutPage.clickWithoutRegis()
            await checkoutPage.inputData1('abc', 'abc@mail.com', '')
            await checkoutPage.continueToPayment()
            const alert = await driver.findElement(By.css('#co_post_telp-error'))
            await driver.wait(until.elementIsVisible(alert), 3000)
            const alertText = await alert.getText()
            expect(alertText).to.equal('This field is required.')
        })
    })
    
    describe('does not fill in postal code input', function() {
        it('displays an alert after the postal code box', async function() {
            await checkoutPage.openPage()
            await checkoutPage.clickWithoutRegis()
            await checkoutPage.inputData1('abc', 'abc@mail.com', '087672634567')
            await checkoutPage.inputData2('', 'Jl. Danau Indah 58692 No.01842, RT.05482/RW.3492')
            const alert = await driver.findElement(By.css('#mdl_addr_kode_pos-error'))
            await driver.wait(until.elementIsVisible(alert), 3000)
            const alertText = await alert.getText()
            expect(alertText).to.equal('This field is required.')
        })
    })
    
    describe('does not fill in addres input', function() {
        it('displays an alert after the addres box', async function() {
            await checkoutPage.openPage()
            await checkoutPage.clickWithoutRegis()
            await checkoutPage.inputData1('abc', 'abc@mail.com', '087672634567')
            await checkoutPage.inputData2('20345', '')
            const alert = await driver.findElement(By.css('#mdl_addr_alamat-error'))
            await driver.wait(until.elementIsVisible(alert), 3000)
            const alertText = await alert.getText()
            expect(alertText).to.equal('This field is required.')
        })
    })
    
    describe('does not fill in courier', function() {
        it('displays an alert after the courier', async function() {
            await checkoutPage.openPage()
            await checkoutPage.clickWithoutRegis()
            await checkoutPage.inputData1('abc', 'abc@mail.com', '087672634567')
            await checkoutPage.inputData2('20345', 'Jl. Danau Indah 58692 No.01842, RT.05482/RW.3492')
            await checkoutPage.continueToPayment()
            const alert = await driver.findElement(By.css('body > div.wrapper.push-wrapper > div > div.container > div:nth-child(2) > div > div.msg > div'))
            await driver.wait(until.elementIsVisible(alert), 3000)
            const alertText = await alert.getText()
            expect(alertText).to.include('Kurir belum dipilih')
        })
    })
    
    // Positif
    describe('Fill all The Entire Input', function() {
        it('Go To Preview Order Page', async function() {
            await checkoutPage.openPage()
            await checkoutPage.clickWithoutRegis()
            await checkoutPage.inputData1('abc', 'abc@mail.com', '087672634567')
            await checkoutPage.inputData2('20345', 'Jl. Danau Indah 58692 No.01842, RT.05482/RW.3492')
            await checkoutPage.selectCourirer()
            await checkoutPage.continueToPayment()
            const url = await driver.getCurrentUrl()
            expect(url).to.equal('https://mizanstore.com/checkout/order_preview')
        })
    })

    after(async function() {
        await new Promise(done => setTimeout(done, 3000))
        await driver.close()
    })
})
