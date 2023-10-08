const chai = require('chai')
const { WebDriver, By } = require('selenium-webdriver')
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

    describe('Dashboard Page', function() {
        it('Go to Product Detail', async function() {
            await dashboardPage.openPage()
            await dashboardPage.bukuTerbaru(1)
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
            await cartPage.clickCheckout()
            const url = await driver.getCurrentUrl()
            const qty = await cartPage.getTextByCss('#rb_item')
            expect(url).to.equal('https://mizanstore.com/checkout')
            expect(qty).to.equal('1')
        })
    })

    describe('Checkout Page', function() {
        it('Fill All the Data and Go To Preview Page', async function() {
            await checkoutPage.clickWithoutRegis()
            await checkoutPage.inputData1('abc', 'abc@mail.com', '087672634567')
            await checkoutPage.inputData2('20345', 'Jl. Danau Indah 58692 No.01842, RT.05482/RW.3492')
            await checkoutPage.selectCourirer()
            await checkoutPage.continueToPayment()
            const url = await driver.getCurrentUrl()
            expect(url).to.equal('https://mizanstore.com/checkout/order_preview')
        })
    })

    describe('Preview Page', function() {
        it('Check Name, Grand Total and Go To Payment Page', async function() {
            const productName = await previewPage.getTextByCss('td[data-title="Product Name"] > a')
            const grandTotal = await previewPage.getTextByCss('table.table-bordered > tbody > tr:nth-child(4) > td > span > span.pull-right > em')
            expect(productName).to.include('Percy Jackson and the Olympians')
            expect(grandTotal).to.equal('78.150')
            await previewPage.clickSelectPayment()
            const url = await driver.getCurrentUrl()
            expect(url).to.equal('https://mizanstore.com/checkout/pilih_pembayaran')  
        })
    })

    after(async function() {
        await new Promise(done => setTimeout(done, 3000))
        await driver.close()
    })
})
