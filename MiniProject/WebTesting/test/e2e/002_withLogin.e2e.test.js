const chai = require('chai')
const { WebDriver, By, until } = require('selenium-webdriver')
const setupDriver = require('../../utils/SetupDriver')
const DasboardPage = require('../../pageobjects/DashboardPage')
const DetailProductPage = require('../../pageobjects/DetailProductPage')
const CartPage = require('../../pageobjects/CartPage')
const CheckoutPage = require('../../pageobjects/CheckoutPage')
const PreviewPage = require('../../pageobjects/PreviewPage')

const expect = chai.expect

describe('Mizan Store Detail Product Page', function() {
    /** @type {WebDriver} */let driver
    /** @type {DasboardPage} */ let dashboardPage
    /** @type {DetailProductPage} */ let detailProductPage
    /** @type {CartPage} */ let cartPage
    /** @type {CheckoutPage} */ let checkoutPage
    /** @type {PreviewPage} */ let previewPage

    before(async function() {
        driver = await setupDriver()
        dashboardPage = new DasboardPage(driver)
        detailProductPage = new DetailProductPage(driver)
        cartPage = new CartPage(driver)
        checkoutPage = new CheckoutPage(driver)
        previewPage = new PreviewPage(driver)
        await driver.manage().window().maximize()
    })

    describe('Login Process', function() {
        it('Go to Dashboard Page', async function() {
            await dashboardPage.openPage()
            await driver.findElement(By.css('#login_do')).click()
            const email =  await driver.findElement(By.css('#Array > div:nth-child(1) > input'))
            await driver.wait(until.elementIsVisible(email), 3000)
            await email.sendKeys('aqilcihara@gmail.com')
            await driver.findElement(By.css('#Array > div:nth-child(2) > input')).sendKeys('alex123456')
            await driver.findElement(By.css('#Array > span')).click()
            await driver.findElement(By.css('#header > nav > div > div > div.logo > a')).click()
            const url = await driver.getCurrentUrl()
            expect(url).to.equal('https://mizanstore.com/')
        })
    })

    describe('Dashboard Page', function() {
        it('Go to Product Detail', async function() {
            await dashboardPage.bukuTerbaru(2)
            const url = await driver.getCurrentUrl()
            expect(url).to.equal('https://mizanstore.com/percy_jackson_and_the_72513')
        })
    })

    describe('Detail Product Page', function() {
        it('Go to Cart Page and Amount equal 2', async function() {
            await detailProductPage.clickPlusButton()
            await detailProductPage.clickBuy(72513)
            const url = await driver.getCurrentUrl()
            const qty = await cartPage.getAttributeByCss('.quntity-input', 'value')
            expect(url).to.equal('https://mizanstore.com/keranjang')
            expect(qty).to.equal('2')
        })
    })

    describe('Cart Page', function() {
        it('Go to Checkout Page and Amount equal 1', async function() {
            await cartPage.clickMinusButton()
            const qty = await cartPage.getAttributeByCss('#qty_cf9cf2aab38a5b43cf9daff032f0eaab', 'value')
            await cartPage.clickCheckout()
            const url = await driver.getCurrentUrl()
            expect(url).to.equal('https://mizanstore.com/checkout')
            expect(qty).to.equal('1')
        })
    })

    describe('Checkout Page', function() {
        it('Fill All the Data and Go To Preview Page', async function() {
            await driver.sleep(5000)
            await checkoutPage.selectCourirer()
            await checkoutPage.continueToPayment()
            const url = await driver.getCurrentUrl()
            expect(url).to.equal('https://mizanstore.com/checkout/order_preview')
        })
    })

    describe('Preview Page', function() {
        it('Check Name, Grand Total and Go To Payment Page', async function() {
            await driver.sleep(5000)
            const productName = await previewPage.getTextByCss('body > div.wrapper.push-wrapper > div.shop-cart > div > div:nth-child(2) > div:nth-child(1) > div > table > tbody > tr.cart_item > td:nth-child(1) > a')
            const grandTotal = await previewPage.getTextByCss('table.table-bordered > tbody > tr:nth-child(4) > td > span > span.pull-right > em')
            await previewPage.clickSelectPayment()
            const url = await driver.getCurrentUrl()
            expect(productName).to.include('Percy Jackson and the Olympians')
            expect(grandTotal).to.equal('91.150')
            expect(url).to.equal('https://mizanstore.com/checkout/pilih_pembayaran')  
        })
    })

    after(async function() {
        await new Promise(done => setTimeout(done, 3000))
        await driver.close()
    })
})
