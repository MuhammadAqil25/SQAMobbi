const chai = require('chai')
const { WebDriver, By } = require('selenium-webdriver')
const setupDriver = require('../../utils/SetupDriver')
const PreviewPage = require('../../pageobjects/PreviewPage')
const DetailProductPage = require('../../pageobjects/DetailProductPage')
const CartPage = require('../../pageobjects/CartPage')
const CheckoutPage = require('../../pageobjects/CheckoutPage')

const expect = chai.expect

describe('Mizan Store Preview Page', function() {
    /** @type {WebDriver} */let driver
    /** @type {DetailProductPage} */ let detailProductPage
    /** @type {CartPage} */ let cartPage
    /** @type {CheckoutPage} */ let checkoutPage
    /** @type {PreviewPage} */ let previewPage

    before(async function() {
        driver = await setupDriver()
        detailProductPage = new DetailProductPage(driver)
        cartPage = new CartPage(driver)
        checkoutPage = new CheckoutPage(driver)
        previewPage = new PreviewPage(driver)
        await driver.manage().window().maximize()
        await detailProductPage.openPage()
        await detailProductPage.clickBuy(72498)
        await cartPage.clickCheckout()
        await checkoutPage.clickWithoutRegis()
        await checkoutPage.inputData1('abc', 'abc@mail.com', '087672634567')
        await checkoutPage.inputData2('20345', 'Jl. Danau Indah 58692 No.01842, RT.05482/RW.3492')
        await checkoutPage.selectCourirer()
        await checkoutPage.continueToPayment()
    })

    describe('Click on Pilih Pembayaran', function() {
        it('Go to Patment Method Page', async function() {
            await previewPage.openPage()
            await previewPage.scrollPage(400)
            await previewPage.clickSelectPayment()
            const url = await driver.getCurrentUrl()
            expect(url).to.equal('https://mizanstore.com/checkout/pilih_pembayaran')
        })
    })

    describe('Click on Ubah Alamat', function() {
        it('Go back to Checkout Page', async function() {
            await previewPage.openPage()
            await previewPage.scrollPage(400)
            await previewPage.clickAddresChange()
            const url = await driver.getCurrentUrl()
            expect(url).to.equal('https://mizanstore.com/cart_order/checkout/index')
        })
    })

    after(async function() {
        await new Promise(done => setTimeout(done, 3000))
        await driver.close()
    })
})
